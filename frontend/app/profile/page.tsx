"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PageTransition from "@/components/motion/PageTransition";
import Avatar from "@/components/shared/Avatar";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/store/authStore";
import { Gamepad2, Target, Trophy } from "lucide-react";
import type { User } from "@/types/auth";

const schema = z.object({
  name: z.string().min(2).max(50),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, isLoading, setUser } = useAuthStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: user ? { name: user.name } : undefined,
  });

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    setError(null);
    try {
      const { data } = await api.put<{ user: User }>("/api/users/profile", values);
      setUser(data.user);
      setMessage("Profile updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await api.post<{ user: User }>("/api/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(data.user);
      setMessage("Avatar updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <PageTransition className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <Card className="mb-6 border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>Upload a profile image (max 5MB)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.03 }}>
            <Avatar src={user.avatar} name={user.name} size="lg" />
          </motion.div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
          <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Change avatar"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6 border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle>Display name</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            {message && <p className="text-sm text-success">{message}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-lg font-semibold">Your stats</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Games" value={user.stats.gamesPlayed} icon={Gamepad2} />
        <StatsCard title="Wins" value={user.stats.wins} icon={Trophy} accent="accent" />
        <StatsCard title="Best score" value={user.stats.bestScore} icon={Target} accent="success" />
      </div>
    </PageTransition>
  );
}
