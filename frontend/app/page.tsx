"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import Ninja from "@/components/characters/Ninja";
import Panda from "@/components/characters/Panda";
import PageTransition from "@/components/motion/PageTransition";
import Avatar from "@/components/shared/Avatar";
import api from "@/lib/axios";
import { Trophy, Medal, Award } from "lucide-react";

// Village Skyline SVG with simple rooftops and a moon
const Skyline = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden h-32 opacity-20 pointer-events-none">
    <motion.div
      className="flex"
      animate={{ x: [0, "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ width: "200%" }}
    >
      <svg className="w-1/2 h-32" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none">
        <path d="M0,120 L0,80 L50,40 L100,80 L150,20 L220,90 L300,50 L400,100 L500,30 L600,90 L750,10 L850,80 L1000,40 L1150,90 L1250,50 L1440,100 L1440,120 Z" fill="currentColor"/>
      </svg>
      <svg className="w-1/2 h-32" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none">
        <path d="M0,120 L0,80 L50,40 L100,80 L150,20 L220,90 L300,50 L400,100 L500,30 L600,90 L750,10 L850,80 L1000,40 L1150,90 L1250,50 L1440,100 L1440,120 Z" fill="currentColor"/>
      </svg>
    </motion.div>
  </div>
);

// Cartoon SVG Icons
const HouseIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 5L5 25V55H55V25L30 5Z" fill="#FFE4E1" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 25L30 5L55 25" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="35" width="16" height="20" fill="#87CEEB" stroke="#E94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="12" y="20" width="10" height="10" fill="#FFFACD" stroke="#E94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="38" y="20" width="10" height="10" fill="#FFFACD" stroke="#E94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="43" r="1.5" fill="#E94560"/>
    <circle cx="32" cy="43" r="1.5" fill="#E94560"/>
  </svg>
);

const NinjasIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="30" r="12" fill="#FFE4E1" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 30C6 24 10 20 18 20C26 20 30 24 30 30" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15" cy="28" r="1.5" fill="#1A1A2E"/>
    <circle cx="21" cy="28" r="1.5" fill="#1A1A2E"/>
    <path d="M15 34Q18 37 21 34" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="42" cy="30" r="12" fill="#FFE4E1" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 30C30 24 34 20 42 20C50 20 54 24 54 30" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="39" cy="28" r="1.5" fill="#E94560"/>
    <circle cx="45" cy="28" r="1.5" fill="#E94560"/>
    <path d="M39 34Q42 37 45 34" stroke="#E94560" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 5L20 30H30L25 55L45 25H32L38 5Z" fill="#F5A623" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="20" r="2" fill="#1A1A2E"/>
    <circle cx="34" cy="20" r="2" fill="#1A1A2E"/>
    <path d="M28 26Q31 29 34 26" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GameControllerIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="15" width="50" height="35" rx="10" fill="#7B2FBE" stroke="#7B2FBE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15" cy="25" r="4" fill="#FFE4E1" stroke="#FFE4E1" strokeWidth="2"/>
    <circle cx="25" cy="25" r="4" fill="#FFE4E1" stroke="#FFE4E1" strokeWidth="2"/>
    <circle cx="35" cy="25" r="4" fill="#FFE4E1" stroke="#FFE4E1" strokeWidth="2"/>
    <circle cx="45" cy="25" r="4" fill="#FFE4E1" stroke="#FFE4E1" strokeWidth="2"/>
    <rect x="20" y="38" width="20" height="8" rx="4" fill="#FFE4E1" stroke="#FFE4E1" strokeWidth="2"/>
  </svg>
);

const NinjaStarIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 5L35 22L52 22L38 33L43 50L30 40L17 50L22 33L8 22L25 22L30 5Z" fill="#E94560" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="27" cy="28" r="2" fill="#FFE4E1"/>
    <circle cx="33" cy="28" r="2" fill="#FFE4E1"/>
    <path d="M27 34Q30 37 33 34" stroke="#FFE4E1" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ScrollIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="40" height="40" rx="5" fill="#FFFACD" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 15H50" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
    <path d="M10 45H50" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 25L25 30L20 35" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 25H40" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 30H38" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 35H36" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SoccerBallIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="22" fill="white" stroke="#1A1A2E" strokeWidth="3"/>
    <path d="M25 3L32 12L42 10L40 20L48 27L38 32L35 42L25 38L15 42L12 32L2 27L10 20L8 10L18 12L25 3Z" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="25" cy="25" r="6" fill="#1A1A2E"/>
  </svg>
);

const PizzaIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5L45 45H5L25 5Z" fill="#F5A623" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="25" r="3" fill="#E94560"/>
    <circle cx="30" cy="30" r="3" fill="#10B981"/>
    <circle cx="25" cy="35" r="3" fill="#7B2FBE"/>
    <path d="M18 20L17 18" stroke="#FFE4E1" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 22L33 20" stroke="#FFE4E1" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 40L27 38" stroke="#FFE4E1" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LaptopIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="10" width="40" height="28" rx="3" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="13" width="34" height="22" fill="#87CEEB" stroke="#87CEEB" strokeWidth="2"/>
    <path d="M12 18H20" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 22H18" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 26H16" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 42H48" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"/>
    <rect x="15" y="38" width="20" height="4" fill="#1A1A2E"/>
  </svg>
);

const ClapperboardIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="15" width="40" height="25" rx="2" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15L15 5L25 15L35 5L45 15" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
    <path d="M5 20H45" stroke="white" strokeWidth="2"/>
    <path d="M15 5V15" stroke="#1A1A2E" strokeWidth="2"/>
    <path d="M25 5V15" stroke="#1A1A2E" strokeWidth="2"/>
    <path d="M35 5V15" stroke="#1A1A2E" strokeWidth="2"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="22" fill="#87CEEB" stroke="#10B981" strokeWidth="3"/>
    <path d="M3 25H47" stroke="#10B981" strokeWidth="2"/>
    <path d="M25 3V47" stroke="#10B981" strokeWidth="2"/>
    <ellipse cx="25" cy="25" rx="10" ry="22" stroke="#10B981" strokeWidth="2"/>
    <path d="M12 15Q18 12 25 15Q32 18 38 15" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M12 35Q18 38 25 35Q32 32 38 35" stroke="#10B981" strokeWidth="2" fill="none"/>
  </svg>
);

const MusicNoteIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="15" cy="40" rx="8" ry="6" fill="#F472B6" stroke="#F472B6" strokeWidth="3"/>
    <ellipse cx="35" cy="35" rx="8" ry="6" fill="#F472B6" stroke="#F472B6" strokeWidth="3"/>
    <path d="M23 40V15L40 10V35" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="22" r="2" fill="white"/>
    <circle cx="37" cy="17" r="2" fill="white"/>
    <path d="M18 24Q20 26 22 24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M35 19Q37 21 39 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C8.268 2 2 8.268 2 16C2 22.986 6.732 28.868 13.252 30.5C14.096 30.656 14.384 30.128 14.384 29.672C14.384 29.252 14.368 28.044 14.36 26.628C9.836 27.572 8.848 24.468 8.848 24.468C8.076 22.508 6.984 21.98 6.984 21.98C5.468 21.012 7.096 21.032 7.096 21.032C8.768 21.148 9.656 22.748 9.656 22.748C11.144 25.244 13.508 24.5 14.416 24.064C14.572 23.02 15.008 22.28 15.484 21.856C11.976 21.428 8.292 20.044 8.292 14.5C8.292 12.836 8.876 11.472 9.828 10.4C9.652 9.972 9.14 8.416 9.952 6.312C9.952 6.312 11.236 5.912 14.348 7.888C15.536 7.512 16.824 7.324 18.104 7.316C19.384 7.324 20.672 7.512 21.86 7.888C24.972 5.912 26.252 6.312 26.252 6.312C27.068 8.416 26.556 9.972 26.38 10.4C27.336 11.472 27.916 12.836 27.916 14.5C27.916 20.06 24.224 21.424 20.704 21.844C21.304 22.368 21.848 23.4 21.848 25.008C21.848 27.316 21.828 29.18 21.828 29.672C21.828 30.132 22.112 30.664 22.972 30.5C29.484 28.864 34.212 22.984 34.212 16C34.212 8.268 27.944 2 20.212 2H16Z" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="28" height="28" rx="6" fill="white" stroke="#E94560" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="6" fill="none" stroke="#E94560" strokeWidth="2"/>
    <circle cx="24" cy="8" r="2" fill="#E94560"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="28" height="28" rx="6" fill="white" stroke="#1877F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 26V18H21L21.5 14H18V12.5C18 11.5 18.2 11 19.5 11H21.5V7H18.5C15.5 7 14 8.5 14 11.5V14H11V18H14V26H18Z" fill="#1877F2"/>
  </svg>
);

interface LeaderboardEntry {
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

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function StatItem({ icon, label, value, index }: StatItem & { index: number }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3, delay: index * 0.1 }
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      animate={controls}
      className="text-center"
    >
      <div className="mb-4">{icon}</div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-6xl md:text-7xl font-numbers font-bold mb-2"
      >
        {value}+
      </motion.div>
      <p className="text-xl text-white/80 font-sans font-bold">{label}</p>
    </motion.div>
  );
}

export default function HomePage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get<{ leaderboard: LeaderboardEntry[] }>("/api/users/leaderboard");
        setLeaderboard(data.leaderboard.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const techStack = [
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Framer Motion", logo: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
    { name: "TypeScript", logo: "https://go-skill-icons.vercel.app/api/icons?i=typescript" },
    { name: "React", logo: "https://go-skill-icons.vercel.app/api/icons?i=react" },
    { name: "Tailwind", logo: "https://go-skill-icons.vercel.app/api/icons?i=tailwindcss" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-accent" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-700" />;
    return <span className="w-6 h-6 flex items-center justify-center font-numbers font-bold text-text/70">{rank}</span>;
  };

  return (
    <PageTransition className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full bg-primary text-white overflow-hidden py-24 pb-0 flex flex-col items-center justify-center min-h-[70vh]">
        <Skyline />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <Ninja className="w-24 h-32 drop-shadow-2xl" />
          </motion.div>
          
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-6xl md:text-8xl tracking-wider drop-shadow-md mb-4 text-white font-heading"
          >
            Quiz Plaza
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-lg font-sans font-bold"
          >
            Enter the ninja arena and battle your friends in real-time quiz combat!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/rooms" className="w-full sm:w-auto block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-heading text-2xl rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Create Room
              </motion.button>
            </Link>
            
            <Link href="/rooms" className="w-full sm:w-auto block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-primary font-heading text-2xl rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Join Room
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="relative py-24 px-4 flex flex-col items-center bg-white">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 top-20 hidden lg:block z-0 opacity-50"
        >
          <Panda className="w-24 h-24 drop-shadow-md" />
        </motion.div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading text-primary tracking-wide text-center mb-12"
          >
            Top Ninjas
          </motion.h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-border/30 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-text/70 font-sans font-bold py-8">No leaderboard data available yet.</p>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 shadow-sm hover:shadow-md transition-all ${
                    index === 0 ? "bg-gradient-to-r from-accent/20 to-accent/5 border-accent" :
                    index === 1 ? "bg-gradient-to-r from-gray-200 to-gray-100 border-gray-300" :
                    index === 2 ? "bg-gradient-to-r from-amber-100 to-amber-50 border-amber-300" :
                    "bg-white border-border"
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <Avatar src={entry.avatar} name={entry.name} size="md" />
                  <div className="flex-1">
                    <p className="font-sans font-bold text-text text-lg">{entry.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-numbers font-bold text-2xl text-primary">{entry.stats.totalScore}</p>
                    <p className="text-xs text-text/50 font-sans">pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-heading text-primary tracking-wide text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <HouseIcon />,
                step: 1,
                title: "Create a Room",
                description: "Choose your category, difficulty and invite friends",
                accent: "#E94560"
              },
              {
                icon: <NinjasIcon />,
                step: 2,
                title: "Invite Friends",
                description: "Share the 6-digit room code with your friends",
                accent: "#F5A623"
              },
              {
                icon: <LightningIcon />,
                step: 3,
                title: "Battle Live",
                description: "Answer questions in real-time and climb the leaderboard",
                accent: "#7B2FBE"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg border-2 p-8 text-center relative"
                style={{ borderColor: item.accent }}
              >
                <div className="mb-4">{item.icon}</div>
                <div 
                  className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: item.accent }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-heading text-primary mb-3">{item.title}</h3>
                <p className="text-text/70 font-sans font-bold">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Counter Section */}
      <section className="py-24 px-4 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-heading text-white tracking-wide text-center mb-16"
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatItem icon={<GameControllerIcon />} label="Games Played" value={1200} index={0} />
            <StatItem icon={<NinjaStarIcon />} label="Ninjas Registered" value={500} index={1} />
            <StatItem icon={<ScrollIcon />} label="Questions Available" value={420} index={2} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-heading text-primary tracking-wide text-center mb-16"
          >
            Choose Your Arena
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Sports", icon: <SoccerBallIcon />, color: "#E94560", slug: "sports", rotate: 2 },
              { name: "Food", icon: <PizzaIcon />, color: "#F5A623", slug: "food", rotate: -2 },
              { name: "Technology", icon: <LaptopIcon />, color: "#7B2FBE", slug: "technology", rotate: 2 },
              { name: "Movies", icon: <ClapperboardIcon />, color: "#1A1A2E", slug: "movies", rotate: -2 },
              { name: "Geography", icon: <GlobeIcon />, color: "#10B981", slug: "geography", rotate: 2 },
              { name: "Music", icon: <MusicNoteIcon />, color: "#F472B6", slug: "music", rotate: -2 }
            ].map((category, index) => (
              <Link key={category.slug} href={`/rooms?category=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -6, rotate: category.rotate }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl p-8 text-center cursor-pointer shadow-lg"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="mb-4 flex justify-center">{category.icon}</div>
                  <h3 className="text-2xl font-heading text-white">{category.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-24 px-4 bg-primary text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <Panda className="w-32 h-32 drop-shadow-2xl" />
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-heading text-white tracking-wide mb-4"
            >
              Ready to Battle?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 font-sans font-bold mb-8"
            >
              Join thousands of ninjas competing right now
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/rooms">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-secondary text-white font-heading text-2xl rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Create Room
                </motion.button>
              </Link>
              <Link href="/rooms">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent text-primary font-heading text-2xl rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Rooms
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <Ninja className="w-32 h-32 drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-heading text-primary text-center mb-8"
          >
            Built With
          </motion.h2>
          <div className="bg-white rounded-2xl border-2 border-border shadow-md p-6 overflow-hidden">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
                <div key={`${tech.name}-${index}`} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-border/30 min-w-[100px]">
                  <img src={tech.logo} alt={tech.name} className="w-12 h-12 object-contain" />
                  <span className="font-sans font-semibold text-sm text-text/70">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Ninja className="w-8 h-8" />
                <h3 className="text-3xl font-heading text-primary">Quiz Plaza</h3>
              </div>
              <p className="text-black text-sm font-sans font-semibold">Battle your friends in real-time</p>
            </div>

            {/* Center Column */}
            <div className="text-center">
              <h4 className="text-xl font-heading text-primary mb-4">Navigation</h4>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="text-text/70 font-sans font-semibold hover:text-secondary transition-colors">
                  Dashboard
                </Link>
                <Link href="/rooms" className="text-text/70 font-sans font-semibold hover:text-secondary transition-colors">
                  Rooms
                </Link>
                <Link href="/profile" className="text-text/70 font-sans font-semibold hover:text-secondary transition-colors">
                  Profile
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="text-center md:text-right">
              <p className="text-text/70 font-sans font-semibold mb-4">
                Built with ❤️ by Abdelrahman Shaaban
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4">
                <motion.a
                  href="https://github.com/AbdulrahmanShaaban"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="transition-transform"
                >
                  <GitHubIcon />
                </motion.a>
                <motion.a
                  href="https://instagram.com/she3ba._"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="transition-transform"
                >
                  <InstagramIcon />
                </motion.a>
                <motion.a
                  href="https://facebook.com/AbdelrahmanShaabann"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="transition-transform"
                >
                  <FacebookIcon />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-black text-sm font-sans font-semibold">
              © 2026 Quiz Plaza. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
