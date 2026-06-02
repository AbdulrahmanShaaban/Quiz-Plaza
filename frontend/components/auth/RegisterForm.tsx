"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values: FormValues) => {
    clearError();
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch {
      return;
    }
    router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);
  };

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <motion.div variants={staggerItem} className="space-y-1">
        <Label htmlFor="name" className="font-heading tracking-wide text-primary text-lg">Name</Label>
        <Input 
          id="name" 
          placeholder="Ninja Name" 
          {...register("name")} 
          className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm"
        />
        {errors.name && <p className="text-sm text-secondary font-sans font-bold">{errors.name.message}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-1">
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

      <motion.div variants={staggerItem} className="space-y-1">
        <Label htmlFor="password" className="font-heading tracking-wide text-primary text-lg">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-secondary font-sans font-bold">{errors.password.message}</p>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-1">
        <Label htmlFor="confirmPassword" className="font-heading tracking-wide text-primary text-lg">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-secondary font-sans font-bold">{errors.confirmPassword.message}</p>
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
          {isLoading ? "Creating..." : "Create Account"}
        </motion.button>
      </motion.div>

      <motion.div variants={staggerItem} className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/30"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text/50 font-sans font-bold">Or continue with</span>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/google`}
          className="flex-1 h-12 bg-white border-2 border-border rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-sans font-bold text-text">Google</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/github`}
          className="flex-1 h-12 bg-white border-2 border-border rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="font-sans font-bold text-text">GitHub</span>
        </motion.button>
      </motion.div>

      <motion.p variants={staggerItem} className="text-center text-sm font-sans font-bold text-text/70 mt-2">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-secondary hover:text-primary transition-colors underline decoration-secondary decoration-2 underline-offset-4">
          Sign in
        </Link>
      </motion.p>
    </motion.form>
  );
}