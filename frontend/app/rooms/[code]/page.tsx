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
      <div className="mx-auto max-w-2xl p-6">
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <PageTransition className="mx-auto max-w-lg p-8 text-center">
        <p className="text-destructive">{error ?? "Room not found"}</p>
        <Button className="mt-4" onClick={() => router.push("/rooms")}>
          Back to rooms
        </Button>
      </PageTransition>
    );
  }

  const displayPlayers = players.length > 0 ? players : mapPlayers(room);
  const uniquePlayers = Array.from(
    new Map(displayPlayers.map(p => [p.userId, p])).values()
  );

  return (
    <PageTransition className="mx-auto max-w-2xl px-4 py-8">
      <Card className="border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle>Waiting room</CardTitle>
          <CardDescription>Share the code with friends to join</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-4xl font-bold tracking-[0.3em] text-primary">{code}</span>
            <Button variant="ghost" size="icon" onClick={copyCode} aria-label="Copy code">
              <Copy className="size-4" />
            </Button>
          </div>
          {copied && <p className="text-center text-sm text-success">Copied!</p>}

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="capitalize">{room.category}</Badge>
            <Badge variant="outline" className="capitalize">{room.difficulty}</Badge>
            <Badge variant="outline">{room.questionsCount} questions</Badge>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
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
                  className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2"
                >
                  <Avatar src={player.avatar} name={player.name} size="sm" />
                  <span className="font-medium">{player.name}</span>
                  {player.userId === hostId && (
                    <Badge className="ml-auto bg-accent/20 text-accent">Host</Badge>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {(socketError || error) && (
            <p className="text-sm text-destructive text-center">{socketError ?? error}</p>
          )}

          {isHost ? (
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button
                className="w-full"
                size="lg"
                disabled={uniquePlayers.length < 2}
                onClick={handleStart}
              >
                <Play className="size-4" />
                Start game
              </Button>
            </motion.div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Waiting for host to start…</p>
          )}

          {isHost && uniquePlayers.length < 2 && (
            <p className="text-center text-xs text-muted-foreground">Need at least 2 players</p>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
}
