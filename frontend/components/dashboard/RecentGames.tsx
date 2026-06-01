"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecentGames() {
  return (
    <Card className="border-2 border-border bg-card rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-heading tracking-wide text-primary">Recent Games</CardTitle>
        <CardDescription className="text-text/70 font-sans text-base">Your latest multiplayer sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <StaggerList className="space-y-3">
          <StaggerItem>
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center bg-background/50 flex flex-col items-center">
              <p className="text-base text-text/70 font-sans mb-6">
                No games yet. Create or join a room to start playing!
              </p>
              <Link href="/rooms">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-secondary text-white font-heading tracking-widest text-xl rounded-xl shadow-[0_4px_0_#9d1c35] hover:shadow-[0_2px_0_#9d1c35] hover:translate-y-[2px] transition-all"
                >
                  Browse Rooms
                </motion.button>
              </Link>
            </div>
          </StaggerItem>
        </StaggerList>
      </CardContent>
    </Card>
  );
}
