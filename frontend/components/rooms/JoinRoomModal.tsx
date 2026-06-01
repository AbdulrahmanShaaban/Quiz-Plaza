"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";

const schema = z.object({
  code: z
    .string()
    .length(6, "Room code must be 6 digits")
    .regex(/^\d+$/, "Room code must be numeric"),
});

type FormValues = z.infer<typeof schema>;

interface JoinRoomModalProps {
  trigger?: React.ReactNode;
}

export default function JoinRoomModal({ trigger }: JoinRoomModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ code }: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await api.get(`/api/rooms/${code}`);
      setOpen(false);
      router.push(`/rooms/${code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Room not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Join room</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join with code</DialogTitle>
          <DialogDescription>Enter the 6-digit room code from your host.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Room code</Label>
            <Input
              id="code"
              maxLength={6}
              placeholder="123456"
              className="font-mono text-center text-lg tracking-widest"
              {...register("code")}
            />
            {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Checking…" : "Join lobby"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
