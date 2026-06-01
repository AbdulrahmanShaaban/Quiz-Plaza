"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useAuthStore } from "@/lib/store/authStore";

const schema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    clearError();
    try {
      await login(values);
      const redirect = searchParams.get("redirect") ?? "/dashboard";
      router.push(redirect);
    } catch {
      // error shown from store
    }
  };

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <motion.div variants={staggerItem} className="space-y-2">
        <Label htmlFor="email" className="font-heading tracking-wide text-primary text-lg">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="ninja@example.com" 
          {...register("email")} 
          className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm"
        />
        {errors.email && <p className="text-sm text-secondary font-sans font-bold">{errors.email.message}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-2">
        <Label htmlFor="password" className="font-heading tracking-wide text-primary text-lg">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          {...register("password")} 
          className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm"
        />
        {errors.password && (
          <p className="text-sm text-secondary font-sans font-bold">{errors.password.message}</p>
        )}
      </motion.div>

      {error && (
        <motion.p variants={staggerItem} className="text-sm text-secondary font-sans font-bold text-center">
          {error}
        </motion.p>
      )}

      <motion.div variants={staggerItem} className="pt-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 bg-secondary text-white font-heading tracking-widest text-2xl rounded-xl shadow-[0_4px_0_#9d1c35] hover:shadow-[0_2px_0_#9d1c35] hover:translate-y-[2px] transition-all disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </motion.button>
      </motion.div>

      <motion.p variants={staggerItem} className="text-center text-sm font-sans font-bold text-text/70 mt-4">
        No account?{" "}
        <Link href="/auth/register" className="text-secondary hover:text-primary transition-colors underline decoration-secondary decoration-2 underline-offset-4">
          Register here
        </Link>
      </motion.p>
    </motion.form>
  );
}
