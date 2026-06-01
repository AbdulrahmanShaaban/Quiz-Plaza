"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Ninja from "@/components/characters/Ninja";
import Panda from "@/components/characters/Panda";
import PageTransition from "@/components/motion/PageTransition";

// Village Skyline SVG with simple rooftops and a moon
const Skyline = () => (
  <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none">
    <path d="M0,120 L0,80 L50,40 L100,80 L150,20 L220,90 L300,50 L400,100 L500,30 L600,90 L750,10 L850,80 L1000,40 L1150,90 L1250,50 L1440,100 L1440,120 Z" fill="currentColor"/>
    <circle cx="1200" cy="40" r="20" fill="#F5A623" opacity="0.6" />
  </svg>
);

export default function HomePage() {
  return (
    <PageTransition className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full bg-primary text-white overflow-hidden py-24 flex flex-col items-center justify-center min-h-[70vh]">
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
            className="text-6xl md:text-8xl tracking-wider drop-shadow-md mb-4 text-white"
          >
            Quiz Plaza
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-lg"
          >
            Enter the ninja arena and battle your friends in real-time quiz combat!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/game/create" className="w-full sm:w-auto block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-heading text-2xl rounded-2xl shadow-[0_6px_0_#9d1c35] hover:shadow-[0_2px_0_#9d1c35] hover:translate-y-[4px] transition-all"
              >
                Create Room
              </motion.button>
            </Link>
            
            <Link href="/game/join" className="w-full sm:w-auto block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-primary font-heading text-2xl rounded-2xl shadow-[0_6px_0_#c07b0c] hover:shadow-[0_2px_0_#c07b0c] hover:translate-y-[4px] transition-all"
              >
                Join Room
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 top-20 hidden lg:block"
        >
          <Panda className="w-20 h-20 drop-shadow-md" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card p-8 rounded-3xl shadow-sm border-2 border-border flex flex-col items-center text-center transition-shadow"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-secondary text-3xl">⚡</span>
            </div>
            <h3 className="text-3xl text-primary mb-3">Lightning Fast</h3>
            <p className="text-text/70 text-lg">Real-time socket connections mean zero lag between questions.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card p-8 rounded-3xl shadow-sm border-2 border-border flex flex-col items-center text-center transition-shadow"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-accent text-3xl">🏆</span>
            </div>
            <h3 className="text-3xl text-primary mb-3">Climb the Ranks</h3>
            <p className="text-text/70 text-lg">Beat your friends and claim the ultimate ninja crown.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card p-8 rounded-3xl shadow-sm border-2 border-border flex flex-col items-center text-center transition-shadow"
          >
            <div className="w-16 h-16 bg-highlight/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-highlight text-3xl">🎨</span>
            </div>
            <h3 className="text-3xl text-primary mb-3">Custom Arenas</h3>
            <p className="text-text/70 text-lg">Create rooms with custom topics, timers, and rules.</p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
