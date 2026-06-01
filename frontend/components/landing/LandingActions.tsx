"use client";

import Link from "next/link";
import { Gamepad2, Trophy, Users } from "lucide-react";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import JoinRoomModal from "@/components/rooms/JoinRoomModal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/authStore";

export default function LandingActions() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-4 px-4 pb-16">
      {isAuthenticated ? (
        <CreateRoomModal
          trigger={
            <Button size="lg" className="min-w-[160px] bg-primary hover:bg-primary/90">
              <Gamepad2 className="size-4" />
              Create room
            </Button>
          }
        />
      ) : (
        <Link href="/auth/login?redirect=/dashboard">
          <Button size="lg" className="min-w-[160px] bg-primary hover:bg-primary/90">
            <Gamepad2 className="size-4" />
            Create room
          </Button>
        </Link>
      )}
      <JoinRoomModal
        trigger={
          <Button
            size="lg"
            variant="outline"
            className="min-w-[160px] border-accent text-accent hover:bg-accent/10"
          >
            <Users className="size-4" />
            Join room
          </Button>
        }
      />
      <Link href="/rooms">
        <Button size="lg" variant="secondary" className="min-w-[160px]">
          <Trophy className="size-4" />
          Browse rooms
        </Button>
      </Link>
    </section>
  );
}
