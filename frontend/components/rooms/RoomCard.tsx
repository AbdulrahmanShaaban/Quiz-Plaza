"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PublicRoomListItem } from "@/types/room";

interface RoomCardProps {
  room: PublicRoomListItem;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="h-full border-2 border-border bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-numbers text-2xl tracking-wider text-primary">{room.code}</CardTitle>
            <Badge variant="outline" className="capitalize border-accent text-accent font-sans font-bold">
              {room.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-text/70 font-sans font-bold">
          <p className="capitalize">Category: {room.category}</p>
          <p>{room.questionsCount} questions</p>
          <p className="flex items-center gap-1">
            <Users className="size-4" />
            {room.playerCount} player{room.playerCount !== 1 ? "s" : ""}
          </p>
          <p>Host: {room.host.name}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/rooms/${room.code}`} className="w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-secondary text-white font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Join room
            </motion.button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
