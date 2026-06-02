"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { CATEGORIES, DIFFICULTIES } from "@/types/room";
import { Settings } from "lucide-react";

const schema = z.object({
  category: z.enum(CATEGORIES),
  difficulty: z.enum(DIFFICULTIES),
  questionsCount: z.number().int().min(5).max(20),
  isPublic: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface EditRoomSettingsModalProps {
  trigger?: React.ReactNode;
  roomCode: string;
  currentSettings: {
    category: string;
    difficulty: string;
    questionsCount: number;
    isPublic: boolean;
  };
  onUpdate: (settings: FormValues) => void;
}

export default function EditRoomSettingsModal({ 
  trigger, 
  roomCode, 
  currentSettings, 
  onUpdate 
}: EditRoomSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, register } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: currentSettings.category as FormValues["category"],
      difficulty: currentSettings.difficulty as FormValues["difficulty"],
      questionsCount: currentSettings.questionsCount,
      isPublic: currentSettings.isPublic,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/api/rooms/${roomCode}`, values);
      setOpen(false);
      onUpdate(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update room settings");
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
            className="px-6 py-3 bg-accent text-primary font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Settings className="size-4" />
            Edit Settings
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Edit Room Settings</DialogTitle>
          <DialogDescription className="font-sans">
            Update the room settings. All players will see the changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-sans font-bold">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize font-sans">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans font-bold">Difficulty</Label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d} value={d} className="capitalize font-sans">
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="questionsCount" className="font-sans font-bold">Questions (5–20)</Label>
            <Input
              id="questionsCount"
              type="number"
              min={5}
              max={20}
              {...register("questionsCount", { valueAsNumber: true })}
              className="bg-white"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-sans">
            <input type="checkbox" {...register("isPublic")} className="rounded" />
            Public room (visible in browse list)
          </label>
          {error && <p className="text-sm text-destructive font-sans">{error}</p>}
          <Button type="submit" className="w-full bg-secondary text-white font-heading" disabled={loading}>
            {loading ? "Updating…" : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
