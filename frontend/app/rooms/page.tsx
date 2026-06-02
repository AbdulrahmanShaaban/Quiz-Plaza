"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/motion/PageTransition";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import RoomCard from "@/components/rooms/RoomCard";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import type { PublicRoomListItem, PublicRoomsResponse } from "@/types/room";
import { useAuthStore } from "@/lib/store/authStore";
import Panda from "@/components/characters/Panda";
import { motion } from "framer-motion";

export default function RoomsPage() {
  const { isAuthenticated } = useAuthStore();
  const [rooms, setRooms] = useState<PublicRoomListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get<PublicRoomsResponse>("/api/rooms");
        setRooms(data.rooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <PageTransition className="mx-auto max-w-6xl px-4 py-8 relative">
        {/* Floating Panda mascot */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -right-4 top-0 hidden lg:block z-0 opacity-50"
        >
          <Panda className="w-24 h-24" />
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="mb-8 bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10"
        >
          <div>
            <h1 className="text-4xl font-heading text-primary mb-2 tracking-wide">Public Rooms</h1>
            <p className="text-text/70 font-sans text-lg font-bold">Join an open lobby or create your own</p>
          </div>
          {isAuthenticated && <CreateRoomModal />}
        </motion.div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        )}

        {error && <p className="text-destructive font-sans relative z-10">{error}</p>}

        {!loading && !error && rooms.length === 0 && (
          <p className="text-center text-text/70 font-sans text-lg font-bold py-12 relative z-10">No public rooms waiting. Create one!</p>
        )}

        {!loading && rooms.length > 0 && (
          <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {rooms.map((room) => (
              <StaggerItem key={room._id}>
                <RoomCard room={room} />
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </PageTransition>
    </div>
  );
}
