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

      <motion.p variants={staggerItem} className="text-center text-sm font-sans font-bold text-text/70 mt-2">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-secondary hover:text-primary transition-colors underline decoration-secondary decoration-2 underline-offset-4">
          Sign in
        </Link>
      </motion.p>
    </motion.form>
  );
}