"use client";

import { motion } from "framer-motion";
import { Copy, Play } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import PageTransition from "@/components/motion/PageTransition";
import { slideInBottom } from "@/lib/motion-variants";
import Avatar from "@/components/shared/Avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/store/authStore";
import { useGameStore } from "@/lib/store/gameStore";
import type { Room } from "@/types/room";
import type { RoomPlayer } from "@/types/room";
import Panda from "@/components/characters/Panda";
import EditRoomSettingsModal from "@/components/rooms/EditRoomSettingsModal";

function mapPlayers(room: Room): RoomPlayer[] {
  return room.players.map((p) => {
    const user = typeof p.user === "object" ? p.user : null;
    return {
      userId: user?._id ?? String(p.user),
      name: user?.name ?? "Player",
      avatar: user?.avatar ?? "",
      score: p.score,
    };
  });
}

export default function WaitingRoomPage() {
  const params = useParams();
  const code = params.code as string;
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    players,
    setRoomCode,
    setHostId,
    setPlayers,
    joinRoomSocket,
    startGameSocket,
    registerSocketListeners,
    error: socketError,
  } = useGameStore();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const hostId =
    room && typeof room.host === "object" ? room.host._id : room?.host?.toString();
  const isHost = Boolean(user && hostId && user._id === hostId);

  const loadRoom = useCallback(async () => {
    try {
      const { data } = await api.get<{ room: Room }>(`/api/rooms/${code}`);
      setRoom(data.room);
      setPlayers(mapPlayers(data.room));
      const h = typeof data.room.host === "object" ? data.room.host._id : data.room.host;
      setHostId(String(h));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Room not found");
    } finally {
      setLoading(false);
    }
  }, [code, setPlayers, setHostId]);

  useEffect(() => {
    setRoomCode(code);
    loadRoom();
  }, [code, setRoomCode, loadRoom]);

  useEffect(() => {
    if (!user) return;
    joinRoomSocket({ code, userId: user._id });
    const cleanup = registerSocketListeners();

    const socket = (async () => {
      const { getSocket } = await import("@/lib/socket");
      return getSocket();
    })();

    socket.then((s) => {
      s?.on("game_started", () => {
        router.push(`/game/${code}`);
      });
      s?.on("room_updated", (data: { category: string; difficulty: string; questionsCount: number; isPublic: boolean }) => {
        setRoom((prev) => prev ? { ...prev, ...data } as Room : null);
      });
      s?.on("room_closed", () => {
        router.push("/rooms");
      });
    });

    return cleanup;
  }, [code, user, joinRoomSocket, registerSocketListeners, router]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStart = () => {
    startGameSocket({ code });
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="mx-auto max-w-2xl p-6">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
        <PageTransition className="mx-auto max-w-lg p-8 text-center">
          <p className="text-destructive font-sans font-bold">{error ?? "Room not found"}</p>
          <Button className="mt-4" onClick={() => router.push("/rooms")}>
            Back to rooms
          </Button>
        </PageTransition>
      </div>
    );
  }

  const displayPlayers = players.length > 0 ? players : mapPlayers(room);
  const uniquePlayers = Array.from(
    new Map(displayPlayers.map(p => [p.userId, p])).values()
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <PageTransition className="mx-auto max-w-2xl px-4 py-8 relative">
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
          className="relative z-10"
        >
          <Card className="border-2 border-border bg-white rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-4xl font-heading text-primary tracking-wide">Waiting Room</CardTitle>
              <CardDescription className="font-sans font-bold text-text/70 text-lg">Share the code with friends to join</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <span className="font-numbers text-5xl font-bold tracking-[0.3em] text-primary">{code}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCode}
                  aria-label="Copy code"
                  className="p-2 rounded-xl hover:bg-accent/20 transition-colors"
                >
                  <Copy className="size-6 text-accent" />
                </motion.button>
              </div>
              {copied && <p className="text-center text-sm text-success font-sans font-bold">Copied!</p>}

              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="capitalize border-accent text-accent font-sans font-bold">{room.category}</Badge>
                <Badge variant="outline" className="capitalize border-accent text-accent font-sans font-bold">{room.difficulty}</Badge>
                <Badge variant="outline" className="border-accent text-accent font-sans font-bold">{room.questionsCount} questions</Badge>
                {isHost && (
                  <EditRoomSettingsModal
                    roomCode={code}
                    currentSettings={{
                      category: room.category,
                      difficulty: room.difficulty,
                      questionsCount: room.questionsCount,
                      isPublic: room.isPublic,
                    }}
                    onUpdate={(settings) => {
                      setRoom((prev) => prev ? { ...prev, ...settings } as Room : null);
                    }}
                  />
                )}
              </div>

              <div>
                <h3 className="mb-3 text-lg font-heading text-primary tracking-wide">
                  Players ({uniquePlayers.length})
                </h3>
                <ul className="space-y-2">
                  {uniquePlayers.map((player, i) => (
                    <motion.li
                      key={`${player.userId}-${i}`}
                      variants={slideInBottom}
                      initial="hidden"
                      animate="visible"
                      layout
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 rounded-xl border-2 border-border bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Avatar src={player.avatar} name={player.name} size="sm" />
                      <span className="font-sans font-bold text-text">{player.name}</span>
                      {player.userId === hostId && (
                        <Badge className="ml-auto bg-accent/20 text-accent font-sans font-bold border-accent">Host</Badge>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {(socketError || error) && (
                <p className="text-sm text-destructive text-center font-sans font-bold">{socketError ?? error}</p>
              )}

              {isHost ? (
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-4 bg-secondary text-white font-heading tracking-widest text-2xl rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uniquePlayers.length < 2}
                    onClick={handleStart}
                  >
                    <Play className="size-5 inline mr-2" />
                    Start Game
                  </motion.button>
                </motion.div>
              ) : (
                <p className="text-center text-lg text-text/70 font-sans font-bold">Waiting for host to start…</p>
              )}

              {isHost && uniquePlayers.length < 2 && (
                <p className="text-center text-sm text-text/70 font-sans font-bold">Need at least 2 players</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </PageTransition>
    </div>
  );
}
