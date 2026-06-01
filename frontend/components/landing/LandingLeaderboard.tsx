import api from "@/lib/axios";
import LandingLeaderboardClient from "@/components/landing/LandingLeaderboardClient";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  stats: {
    totalScore: number;
    gamesPlayed: number;
    wins: number;
    bestScore: number;
  };
}

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const { data } = await api.get<{ leaderboard: LeaderboardEntry[] }>("/api/users/leaderboard");
    return data.leaderboard;
  } catch {
    return [];
  }
}

export default async function LandingLeaderboard() {
  const leaderboard = await getLeaderboard();
  return <LandingLeaderboardClient leaderboard={leaderboard} />;
}
