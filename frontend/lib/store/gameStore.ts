import { create } from "zustand";
import { getSocket } from "@/lib/socket";
import type { RoomPlayer } from "@/types/room";
import type {
  FinalResultPlayer,
  GameOverEvent,
  GameStartedEvent,
  NewQuestionEvent,
  PlayerAnsweredEvent,
  PlayerJoinedEvent,
  QuestionPayload,
  QuestionResultEvent,
  StartGameSocketPayload,
  SubmitAnswerPayload,
  JoinRoomSocketPayload,
} from "@/types/game";

export type GamePhase = "idle" | "waiting" | "playing" | "revealing" | "finished";

interface GameState {
  roomCode: string | null;
  phase: GamePhase;
  players: RoomPlayer[];
  hostId: string | null;
  currentQuestion: QuestionPayload | null;
  questionIndex: number;
  totalQuestions: number;
  correctAnswer: number | null;
  answeredUserIds: Set<string>;
  hasSubmittedAnswer: boolean;
  selectedAnswerIndex: number | null;
  finalResults: FinalResultPlayer[];
  lastQuestionScores: Array<{ userId: string; points: number }>;
  error: string | null;

  resetGame: () => void;
  setRoomCode: (code: string) => void;
  setHostId: (hostId: string) => void;
  setPlayers: (players: RoomPlayer[]) => void;
  setPhase: (phase: GamePhase) => void;
  setError: (error: string | null) => void;

  joinRoomSocket: (payload: JoinRoomSocketPayload) => void;
  startGameSocket: (payload: StartGameSocketPayload) => void;
  submitAnswerSocket: (payload: SubmitAnswerPayload) => void;
  registerSocketListeners: () => () => void;
}

const initialState = {
  roomCode: null,
  phase: "idle" as GamePhase,
  players: [] as RoomPlayer[],
  hostId: null as string | null,
  currentQuestion: null as QuestionPayload | null,
  questionIndex: 0,
  totalQuestions: 0,
  correctAnswer: null as number | null,
  answeredUserIds: new Set<string>(),
  hasSubmittedAnswer: false,
  selectedAnswerIndex: null as number | null,
  finalResults: [] as FinalResultPlayer[],
  lastQuestionScores: [] as Array<{ userId: string; points: number }>,
  error: null as string | null,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  resetGame: () => set({ ...initialState, answeredUserIds: new Set<string>() }),

  setRoomCode: (code) => set({ roomCode: code }),
  setHostId: (hostId) => set({ hostId }),
  setPlayers: (players) => set({ players }),
  setPhase: (phase) => set({ phase }),
  setError: (error) => set({ error }),

  joinRoomSocket: (payload) => {
    getSocket()?.emit("join_room", payload);
  },

  startGameSocket: (payload) => {
    getSocket()?.emit("start_game", payload);
  },

  submitAnswerSocket: (payload) => {
    const { hasSubmittedAnswer } = get();
    if (hasSubmittedAnswer) return;

    set({
      hasSubmittedAnswer: true,
      selectedAnswerIndex: payload.answerIndex,
    });
    getSocket()?.emit("submit_answer", payload);
  },

  registerSocketListeners: () => {
    const socket = getSocket();
    if (!socket) return () => undefined;

    const onPlayerJoined = (data: PlayerJoinedEvent) => {
      const mappedPlayers = data.players.map((p) => ({
        userId: String(p.userId),
        name: p.name,
        avatar: p.avatar,
        score: p.score,
      }));
      
      set((state) => {
        const newPlayers = mappedPlayers.filter(p => !state.players.find(existing => existing.userId === p.userId));
        return {
          players: [...state.players, ...newPlayers],
          phase: "waiting",
        };
      });
    };

    const onGameStarted = (data: GameStartedEvent) => {
      set({
        phase: "playing",
        currentQuestion: data.firstQuestion,
        questionIndex: 0,
        totalQuestions: data.totalQuestions,
        correctAnswer: null,
        answeredUserIds: new Set<string>(),
        hasSubmittedAnswer: false,
        selectedAnswerIndex: null,
        lastQuestionScores: [],
      });
    };

    const onNewQuestion = (data: NewQuestionEvent) => {
      set({
        phase: "playing",
        currentQuestion: data.question,
        questionIndex: data.questionIndex,
        totalQuestions: data.totalQuestions,
        correctAnswer: null,
        answeredUserIds: new Set<string>(),
        hasSubmittedAnswer: false,
        selectedAnswerIndex: null,
        lastQuestionScores: [],
      });
    };

    const onPlayerAnswered = (data: PlayerAnsweredEvent) => {
      const next = new Set(get().answeredUserIds);
      next.add(data.userId);
      set({ answeredUserIds: next });
    };

    const onQuestionResult = (data: QuestionResultEvent) => {
      const scoreMap = new Map(data.scores.map((s) => [s.userId, s.points]));

      set((state) => ({
        phase: "revealing",
        correctAnswer: data.correctAnswer,
        lastQuestionScores: data.scores,
        players: state.players.map((p) => ({
          ...p,
          score: scoreMap.get(p.userId) ?? p.score,
        })),
      }));
    };

    const onGameOver = (data: GameOverEvent) => {
      set({
        phase: "finished",
        finalResults: data.finalResults,
      });
    };

    const onSocketError = (data: { message: string }) => {
      set({ error: data.message });
    };

    socket.on("player_joined", onPlayerJoined);
    socket.on("game_started", onGameStarted);
    socket.on("new_question", onNewQuestion);
    socket.on("player_answered", onPlayerAnswered);
    socket.on("question_result", onQuestionResult);
    socket.on("game_over", onGameOver);
    socket.on("error", onSocketError);

    return () => {
      socket.off("player_joined", onPlayerJoined);
      socket.off("game_started", onGameStarted);
      socket.off("new_question", onNewQuestion);
      socket.off("player_answered", onPlayerAnswered);
      socket.off("question_result", onQuestionResult);
      socket.off("game_over", onGameOver);
      socket.off("error", onSocketError);
    };
  },
}));
