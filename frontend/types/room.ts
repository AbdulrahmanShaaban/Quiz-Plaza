export const CATEGORIES = [
  "sports",
  "food",
  "technology",
  "movies",
  "geography",
  "music",
  "mixed",
] as const;

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type RoomStatus = "waiting" | "playing" | "finished";

export interface RoomPlayer {
  userId: string;
  name: string;
  avatar: string;
  score: number;
}

export interface RoomHost {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  code: string;
  host: string | RoomHost;
  players: Array<{
    user: string | { _id: string; name: string; avatar: string };
    score: number;
    answers: unknown[];
  }>;
  category: Category;
  difficulty: Difficulty;
  questionsCount: number;
  status: RoomStatus;
  isPublic: boolean;
  createdAt: string;
}

export interface PublicRoomListItem {
  _id: string;
  code: string;
  category: Category;
  difficulty: Difficulty;
  questionsCount: number;
  status: RoomStatus;
  host: RoomHost;
  playerCount: number;
}

export interface CreateRoomPayload {
  category: Category;
  difficulty: Difficulty;
  questionsCount: number;
  isPublic?: boolean;
}

export interface CreateRoomResponse {
  message: string;
  room: Room;
}

export interface PublicRoomsResponse {
  rooms: PublicRoomListItem[];
  total: number;
}

export interface JoinRoomPayload {
  code: string;
}
