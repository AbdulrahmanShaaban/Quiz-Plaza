"use client";

import { Gamepad2, Percent, Target, Trophy } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentGames from "@/components/dashboard/RecentGames";
import PageTransition from "@/components/motion/PageTransition";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import JoinRoomModal from "@/components/rooms/JoinRoomModal";
import Ninja from "@/components/characters/Ninja";
import Panda from "@/components/characters/Panda";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const { stats } = user;
  const winRate =
    stats.gamesPlayed > 0 ? `${Math.round((stats.wins / stats.gamesPlayed) * 100)}%` : "0%";

  return (
    <PageTransition className="mx-auto max-w-6xl px-4 py-8 sm:px-6 relative">
      {/* Floating Panda mascot in the corner */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 top-0 hidden lg:block z-0 opacity-50"
      >
        <Panda className="w-24 h-24" />
      </motion.div>

      {/* Welcome banner with waving Ninja */}
      <div className="mb-10 bg-card rounded-3xl p-6 md:p-8 shadow-sm border-2 border-border flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden z-10">
        <div className="bg-primary/5 rounded-full p-4 shrink-0">
          <motion.div
            animate={{ rotate: [0, 15, -5, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Ninja className="w-16 h-20 drop-shadow-md" />
          </motion.div>
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-heading text-primary mb-2 tracking-wide">Hey, {user.name}!</h1>
          <p className="text-text/70 font-sans text-lg font-bold">Ready for your next quiz battle?</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
          <CreateRoomModal />
          <JoinRoomModal />
          <Link href="/rooms">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-accent text-primary font-heading tracking-widest text-xl rounded-xl shadow-[0_4px_0_#c07b0c] hover:shadow-[0_2px_0_#c07b0c] hover:translate-y-[2px] transition-all"
            >
              Browse
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <StaggerList className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        <StaggerItem>
          <StatsCard title="Games Played" value={stats.gamesPlayed} icon={Gamepad2} />
        </StaggerItem>
        <StaggerItem>
          <StatsCard title="Victories" value={stats.wins} icon={Trophy} />
        </StaggerItem>
        <StaggerItem>
          <StatsCard title="High Score" value={stats.bestScore} icon={Target} />
        </StaggerItem>
        <StaggerItem>
          <StatsCard title="Win Rate" value={winRate} icon={Percent} />
        </StaggerItem>
      </StaggerList>

      <div className="relative z-10">
        <RecentGames />
      </div>
    </PageTransition>
  );
}
