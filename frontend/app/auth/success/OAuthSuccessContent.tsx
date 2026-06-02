"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const userParam = searchParams.get("user");
    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        setUser(user);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/auth/login?error=oauth_failed");
      }
    } else {
      router.push("/auth/login?error=no_user_data");
    }
  }, [searchParams, router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 font-sans font-bold text-text">Signing you in...</p>
      </div>
    </div>
  );
}
