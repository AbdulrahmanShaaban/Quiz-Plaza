export interface QuestionPayload {
  text: string;
  options: string[];
}

export interface NewQuestionEvent {
  question: QuestionPayload;
  questionIndex: number;
  totalQuestions: number;
}

export interface GameStartedEvent {
  firstQuestion: QuestionPayload;
  totalQuestions: number;
}

export interface QuestionScoreUpdate {
  userId: string;
  points: number;
}

export interface QuestionResultEvent {
  correctAnswer: number;
  scores: QuestionScoreUpdate[];
}

export interface PlayerAnswerRecord {
  questionIndex: number;
  answerIndex: number;
  timeRemaining: number;
  isCorrect: boolean;
}

export interface FinalResultPlayer {
  userId: string;
  name: string;
  avatar: string;
  score: number;
  answers: PlayerAnswerRecord[];
}

export interface GameOverEvent {
  finalResults: FinalResultPlayer[];
}

export interface PlayerJoinedEvent {
  players: Array<{
    userId: string;
    name: string;
    avatar: string;
    score: number;
  }>;
}

export interface PlayerAnsweredEvent {
  userId: string;
}

export interface SubmitAnswerPayload {
  code: string;
  answerIndex: number;
  timeRemaining: number;
}

export interface JoinRoomSocketPayload {
  code: string;
  userId: string;
}

export interface StartGameSocketPayload {
  code: string;
}

export interface SocketErrorEvent {
  message: string;
}

/** Client-side scoring tiers (mirrors backend logic). */
export function calculatePoints(isCorrect: boolean, timeRemaining: number): number {
  if (!isCorrect) return 0;
  if (timeRemaining > 10) return 100;
  if (timeRemaining > 5) return 75;
  if (timeRemaining > 0) return 50;
  return 0;
}

export const QUESTION_DURATION_SECONDS = 15;
