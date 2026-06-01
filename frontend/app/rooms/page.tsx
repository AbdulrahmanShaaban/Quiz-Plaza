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
    <PageTransition className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Public rooms</h1>
          <p className="text-muted-foreground">Join an open lobby or create your own</p>
        </div>
        {isAuthenticated && <CreateRoomModal />}
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      )}

      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && rooms.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No public rooms waiting. Create one!</p>
      )}

      {!loading && rooms.length > 0 && (
        <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <StaggerItem key={room._id}>
              <RoomCard room={room} />
            </StaggerItem>
          ))}
        </StaggerList>
      )}
    </PageTransition>
  );
}
