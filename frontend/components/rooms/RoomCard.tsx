"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { scaleOnHover } from "@/lib/motion-variants";
import type { PublicRoomListItem } from "@/types/room";

interface RoomCardProps {
  room: PublicRoomListItem;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div whileHover={scaleOnHover}>
      <Card className="h-full border-border/80 bg-card/80">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-mono text-lg tracking-wider">{room.code}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {room.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
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
            <Button className="w-full" variant="secondary">
              Join room
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
