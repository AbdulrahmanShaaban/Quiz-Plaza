"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PageTransition from "@/components/motion/PageTransition";
import Avatar from "@/components/shared/Avatar";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/store/authStore";
import { Gamepad2, Target, Trophy } from "lucide-react";
import type { User } from "@/types/auth";
import Panda from "@/components/characters/Panda";

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
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="mx-auto max-w-2xl p-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

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
          className="mb-8 bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-border relative z-10"
        >
          <h1 className="text-4xl font-heading text-primary tracking-wide">Profile</h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="mb-6 relative z-10"
        >
          <Card className="border-2 border-border bg-white rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">Avatar</CardTitle>
              <CardDescription className="font-sans font-bold text-text/70">Upload a profile image (max 5MB)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar src={user.avatar} name={user.name} size="lg" />
              </motion.div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="px-6 py-3 bg-accent text-primary font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading…" : "Change avatar"}
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="mb-6 relative z-10"
        >
          <Card className="border-2 border-border bg-white rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">Display name</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans font-bold text-text">Name</Label>
                  <Input id="name" {...register("name")} className="border-2 rounded-xl" />
                  {errors.name && <p className="text-sm text-destructive font-sans font-bold">{errors.name.message}</p>}
                </div>
                {message && <p className="text-sm text-success font-sans font-bold">{message}</p>}
                {error && <p className="text-sm text-destructive font-sans font-bold">{error}</p>}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-secondary text-white font-heading tracking-widest text-xl rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving…" : "Save changes"}
                </motion.button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="mb-4 bg-white rounded-2xl p-6 shadow-md border-2 border-border relative z-10"
        >
          <h2 className="text-2xl font-heading text-primary tracking-wide">Your stats</h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-3 relative z-10">
          <StatsCard title="Games" value={user.stats.gamesPlayed} icon={Gamepad2} />
          <StatsCard title="Wins" value={user.stats.wins} icon={Trophy} />
          <StatsCard title="Best score" value={user.stats.bestScore} icon={Target} />
        </div>
      </PageTransition>
    </div>
  );
}
