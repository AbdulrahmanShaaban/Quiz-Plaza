export type UserRole = "player" | "admin";

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  totalScore: number;
  bestScore: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  isVerified: boolean;
  stats: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface UpdateProfilePayload {
  name?: string;
}
