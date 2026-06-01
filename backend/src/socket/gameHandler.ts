import { Server, Socket } from "socket.io";
import Room, { IRoom } from "../models/Room.js";
import Question, { IQuestion } from "../models/Question.js";
import User from "../models/User.js";

// --------------- Game State Management ---------------

interface GameState {
  code: string;
  roomId: string;
  currentQuestionIndex: number;
  questionStartTime: number;
  questionsData: IQuestion[];
  playersAnswered: Set<string>; // userId
  playerAnswers: Record<string, number>; // userId -> answerIndex
  playerScores: Record<string, number>; // userId -> cumulative score
  timers: {
    questionTimer: NodeJS.Timeout | null;
    autoProgressTimer: NodeJS.Timeout | null;
  };
}

const activeGames = new Map<string, GameState>();

// --------------- Helpers ---------------

const calculateScore = (isCorrect: boolean, timeRemaining: number): number => {
  if (!isCorrect) return 0;
  if (timeRemaining > 10) return 100;
  if (timeRemaining > 5) return 75;
  if (timeRemaining > 0) return 50;
  return 0;
};

const clearGameTimers = (gameState: GameState): void => {
  if (gameState.timers.questionTimer) {
    clearTimeout(gameState.timers.questionTimer);
    gameState.timers.questionTimer = null;
  }
  if (gameState.timers.autoProgressTimer) {
    clearTimeout(gameState.timers.autoProgressTimer);
    gameState.timers.autoProgressTimer = null;
  }
};

const startQuestionTimer = (
  io: Server,
  gameState: GameState,
  allPlayersIds: string[]
): void => {
  const QUESTION_DURATION = 15000; // 15 seconds in milliseconds

  // Reset answered players for this question
  gameState.playersAnswered.clear();
  gameState.playerAnswers = {};

  // Emit new question to all players
  const currentQuestion = gameState.questionsData[gameState.currentQuestionIndex];
  io.to(gameState.code).emit("new_question", {
    question: {
      text: currentQuestion.text,
      options: currentQuestion.options,
      // Note: correctAnswer is NOT sent to client
    },
    questionIndex: gameState.currentQuestionIndex,
    totalQuestions: gameState.questionsData.length,
  });

  gameState.questionStartTime = Date.now();

  // Set question timer (auto-progress after 15s)
  gameState.timers.questionTimer = setTimeout(() => {
    handleQuestionTimeout(io, gameState, allPlayersIds);
  }, QUESTION_DURATION);
};

const handleQuestionTimeout = async (
  io: Server,
  gameState: GameState,
  allPlayersIds: string[]
): Promise<void> => {
  clearGameTimers(gameState);

  // Fetch a fresh copy of the room for reading player data
  const room = await Room.findById(gameState.roomId);
  if (!room) return;

  const currentQuestion = gameState.questionsData[gameState.currentQuestionIndex];
  const scores: Record<string, number> = {};

  // Calculate scores for all players
  for (const player of room.players) {
    const userId = player.user.toString();
    const answerIndex = gameState.playerAnswers[userId];

    if (answerIndex !== undefined) {
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      const timeRemaining = Math.max(0, 15 - (Date.now() - gameState.questionStartTime) / 1000);
      const points = calculateScore(isCorrect, timeRemaining);

      scores[userId] = points;
      gameState.playerScores[userId] = (gameState.playerScores[userId] ?? 0) + points;

      // NOTE: DB update for answered players was already done in submit_answer handler.
      // Do NOT push another DB update here to avoid double-counting.
    } else {
      // Player didn't answer — record in DB
      scores[userId] = 0;
      await Room.findOneAndUpdate(
        { _id: gameState.roomId, "players.user": userId },
        {
          $push: {
            "players.$.answers": {
              questionIndex: gameState.currentQuestionIndex,
              answerIndex: -1,
              timeRemaining: 0,
              isCorrect: false,
            },
          },
        },
        { returnDocument: "after" }
      );
    }
  }

  // Emit question results
  io.to(gameState.code).emit("question_result", {
    correctAnswer: currentQuestion.correctAnswer,
    scores: Object.entries(scores).map(([userId, points]) => ({
      userId,
      points,
    })),
  });

  // Auto-progress after 1.5 seconds (reduced from 3s)
  gameState.timers.autoProgressTimer = setTimeout(async () => {
    gameState.currentQuestionIndex++;

    if (gameState.currentQuestionIndex < gameState.questionsData.length) {
      // Next question
      startQuestionTimer(io, gameState, allPlayersIds);
    } else {
      // Game over
      await handleGameOver(io, gameState);
    }
  }, 500);
};

const handleGameOver = async (io: Server, gameState: GameState): Promise<void> => {
  clearGameTimers(gameState);

  // Fetch fresh room data with populated player info
  const room = await Room.findById(gameState.roomId).populate("players.user", "name avatar");
  if (!room) return;

  // Sort players by score (descending)
  const finalResults = room.players
    .map((player) => ({
      userId: player.user._id?.toString() ?? player.user.toString(),
      name: (player.user as any).name ?? "Player",
      avatar: (player.user as any).avatar ?? "",
      score: player.score,
      answers: player.answers,
    }))
    .sort((a, b) => b.score - a.score);

  // Update user stats in DB
  for (let i = 0; i < finalResults.length; i++) {
    const result = finalResults[i];
    const isWinner = i === 0; // First in sorted list

    try {
      await User.findByIdAndUpdate(
        result.userId,
        {
          $inc: {
            "stats.gamesPlayed": 1,
            "stats.totalScore": result.score,
            ...(isWinner && { "stats.wins": 1 }),
          },
          $max: {
            "stats.bestScore": result.score,
          },
        },
        { returnDocument: "after" }
      );
    } catch (error) {
      console.error(`Error updating user ${result.userId} stats:`, error);
    }
  }

  // Atomically update room status to "finished"
  await Room.findByIdAndUpdate(
    gameState.roomId,
    { $set: { status: "finished" } },
    { returnDocument: "after" }
  );

  // Emit game over with player name/avatar data
  io.to(gameState.code).emit("game_over", { finalResults });

  // Clean up active game
  activeGames.delete(gameState.code);
};

// --------------- Socket Event Handlers ---------------

export const gameHandler = (io: Server, socket: Socket): void => {
  // Join room event
  socket.on("join_room", async (data: { code: string; userId: string }) => {
    try {
      const { code, userId } = data;

      const room = await Room.findOne({ code });

      if (!room) {
        socket.emit("error", { message: "Room not found." });
        return;
      }

      if (room.status !== "waiting") {
        socket.emit("error", { message: "Room is not in waiting state." });
        return;
      }

      // Check if player already in room
      const playerExists = room.players.some((p) => p.user.toString() === userId);

      if (!playerExists) {
        // Atomically add player to room
        await Room.findByIdAndUpdate(
          room._id,
          {
            $push: {
              players: {
                user: userId,
                score: 0,
                answers: [],
              },
            },
          },
          { returnDocument: "after" }
        );
      }

      // Join socket room
      socket.join(code);
      socket.data.roomCode = code;
      socket.data.userId = userId;

      // Fetch updated room with populated players
      const updatedRoom = await Room.findOne({ code }).populate("players.user", "name avatar");

      if (!updatedRoom) return;

      io.to(code).emit("player_joined", {
        players: updatedRoom.players.map((p) => ({
          userId: p.user._id ?? p.user,
          name: (p.user as any).name,
          avatar: (p.user as any).avatar,
          score: p.score,
        })),
      });

      console.log(`User ${userId} joined room ${code}`);
    } catch (error) {
      console.error("Join room error:", error);
      socket.emit("error", { message: "Error joining room." });
    }
  });

  // Start game event
  socket.on("start_game", async (data: { code: string }) => {
    try {
      const { code } = data;
      const userId = socket.data.userId;

      const room = await Room.findOne({ code });

      if (!room) {
        socket.emit("error", { message: "Room not found." });
        return;
      }

      // Only host can start game
      if (room.host.toString() !== userId) {
        socket.emit("error", { message: "Only room host can start the game." });
        return;
      }

      if (room.players.length < 2) {
        socket.emit("error", { message: "Need at least 2 players to start." });
        return;
      }

      // Fetch questions
      const questions = (await Question.find({ _id: { $in: room.questions } })) as IQuestion[];

      if (questions.length === 0) {
        socket.emit("error", { message: "Questions not found." });
        return;
      }

      // Atomically update room status to "playing"
      await Room.findByIdAndUpdate(
        room._id,
        { $set: { status: "playing" } },
        { returnDocument: "after" }
      );

      // Build initial player scores map
      const playerScores: Record<string, number> = {};
      for (const player of room.players) {
        playerScores[player.user.toString()] = 0;
      }

      // Create game state
      const gameState: GameState = {
        code,
        roomId: room._id.toString(),
        currentQuestionIndex: 0,
        questionStartTime: Date.now(),
        questionsData: questions,
        playersAnswered: new Set(),
        playerAnswers: {},
        playerScores,
        timers: { questionTimer: null, autoProgressTimer: null },
      };

      activeGames.set(code, gameState);

      // Get all player IDs
      const allPlayersIds = room.players.map((p) => p.user.toString());

      // Emit game started
      io.to(code).emit("game_started", {
        firstQuestion: {
          text: questions[0].text,
          options: questions[0].options,
        },
        totalQuestions: questions.length,
      });

      // Start first question timer
      startQuestionTimer(io, gameState, allPlayersIds);

      console.log(`Game started in room ${code}`);
    } catch (error) {
      console.error("Start game error:", error);
      socket.emit("error", { message: "Error starting game." });
    }
  });

  // Submit answer event
  socket.on("submit_answer", async (data: { code: string; answerIndex: number; timeRemaining: number }) => {
    try {
      const { code, answerIndex, timeRemaining } = data;
      const userId = socket.data.userId;

      const gameState = activeGames.get(code);

      if (!gameState) {
        socket.emit("error", { message: "Game not found." });
        return;
      }

      // Check if already answered
      if (gameState.playersAnswered.has(userId)) {
        socket.emit("error", { message: "Already answered this question." });
        return;
      }

      // Store answer in game state (in-memory only for now)
      const currentQuestion = gameState.questionsData[gameState.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      const points = calculateScore(isCorrect, timeRemaining);

      gameState.playerAnswers[userId] = answerIndex;
      gameState.playersAnswered.add(userId);

      // Atomically update the player's score and answers in DB
      await Room.findOneAndUpdate(
        { _id: gameState.roomId, "players.user": userId },
        {
          $inc: { "players.$.score": points },
          $push: {
            "players.$.answers": {
              questionIndex: gameState.currentQuestionIndex,
              answerIndex,
              timeRemaining,
              isCorrect,
            },
          },
        },
        { returnDocument: "after" }
      );

      // Emit player answered
      io.to(code).emit("player_answered", { userId });

      console.log(`User ${userId} answered in room ${code}`);

      // Fetch fresh room to check player count
      const room = await Room.findById(gameState.roomId);
      if (!room) return;

      // Check if all players answered
      if (gameState.playersAnswered.size === room.players.length) {
        // All players answered, show results immediately
        clearGameTimers(gameState);
        handleQuestionTimeout(io, gameState, room.players.map((p) => p.user.toString()));
      }
    } catch (error) {
      console.error("Submit answer error:", error);
      socket.emit("error", { message: "Error submitting answer." });
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    const roomCode = socket.data.roomCode;

    if (roomCode) {
      const gameState = activeGames.get(roomCode);
      if (gameState) {
        clearGameTimers(gameState);
      }
    }
  });
};
