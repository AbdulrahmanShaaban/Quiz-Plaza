import { Document } from 'mongoose';

// Extend Express User to match Mongoose IUser
// This resolves the conflict between Passport's Express.User and our Mongoose IUser
declare global {
  namespace Express {
    interface User {
      _id: any;
      name: string;
      email: string;
      password?: string;
      avatar: string;
      role: "player" | "admin";
      isVerified: boolean;
      verificationCode?: string;
      verificationExpires?: Date;
      provider?: "local" | "google" | "github";
      googleId?: string;
      githubId?: string;
      stats: {
        gamesPlayed: number;
        wins: number;
        totalScore: number;
        bestScore: number;
      };
      createdAt: Date;
      updatedAt: Date;
      comparePassword(candidatePassword: string): Promise<boolean>;
    }
    
    interface Request {
      user?: Express.User;
    }
  }
}

export {};
