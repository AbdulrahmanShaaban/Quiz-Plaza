"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message") || "Authentication failed";
    setTimeout(() => {
      router.push(`/auth/login?error=${encodeURIComponent(message)}`);
    }, 2000);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-heading text-primary mb-2">Authentication Failed</h1>
        <p className="font-sans font-bold text-text/70">Redirecting to login...</p>
      </div>
    </div>
  );
}
