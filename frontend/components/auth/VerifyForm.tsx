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
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

type FormValues = z.infer<typeof schema>;

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";
  const { verifyEmail, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: emailFromQuery, code: "" },
  });

  const onSubmit = async (values: FormValues) => {
    clearError();
    try {
      await verifyEmail(values);
      router.push("/auth/login?verified=1");
    } catch {
      // error from store
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
          {...register("email")} 
          className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-12 bg-background font-sans shadow-sm"
        />
        {errors.email && <p className="text-sm text-secondary font-sans font-bold">{errors.email.message}</p>}
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-2">
        <Label htmlFor="code" className="font-heading tracking-wide text-primary text-lg">6-Digit Code</Label>
        <Input
          id="code"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          {...register("code")}
          className="rounded-xl border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary h-14 bg-background font-sans shadow-sm tracking-[0.4em] text-center text-2xl"
        />
        {errors.code && <p className="text-sm text-secondary font-sans font-bold">{errors.code.message}</p>}
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
          {isLoading ? "Verifying..." : "Verify Email"}
        </motion.button>
      </motion.div>

      <motion.p variants={staggerItem} className="text-center text-sm font-sans font-bold text-text/70 mt-4">
        <Link href="/auth/login" className="text-secondary hover:text-primary transition-colors underline decoration-secondary decoration-2 underline-offset-4">
          Back to login
        </Link>
      </motion.p>
    </motion.form>
  );
}
