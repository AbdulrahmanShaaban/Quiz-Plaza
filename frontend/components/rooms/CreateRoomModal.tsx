"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import { useGameStore } from "@/lib/store/gameStore";
import { CATEGORIES, DIFFICULTIES, type CreateRoomResponse } from "@/types/room";

const schema = z.object({
  category: z.enum(CATEGORIES),
  difficulty: z.enum(DIFFICULTIES),
  questionsCount: z.number().int().min(5).max(20),
  isPublic: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface CreateRoomModalProps {
  trigger?: React.ReactNode;
}

export default function CreateRoomModal({ trigger }: CreateRoomModalProps) {
  const router = useRouter();
  const resetGame = useGameStore((s) => s.resetGame);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, register } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "technology",
      difficulty: "medium",
      questionsCount: 10,
      isPublic: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      resetGame();
      const { data } = await api.post<CreateRoomResponse>("/api/rooms", values);
      setOpen(false);
      router.push(`/rooms/${data.room.code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-secondary text-white font-heading tracking-widest text-xl rounded-xl shadow-[0_4px_0_#9d1c35] hover:shadow-[0_2px_0_#9d1c35] hover:translate-y-[2px] transition-all"
          >
            Create Room
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a room</DialogTitle>
          <DialogDescription>
            Questions are selected randomly from the database for your category and difficulty.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d} value={d} className="capitalize">
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="questionsCount">Questions (5–20)</Label>
            <Input
              id="questionsCount"
              type="number"
              min={5}
              max={20}
              {...register("questionsCount", { valueAsNumber: true })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isPublic")} className="rounded" />
            Public room (visible in browse list)
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating room…" : "Create & enter lobby"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
