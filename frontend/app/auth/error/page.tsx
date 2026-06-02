import { Suspense } from "react";
import OAuthErrorContent from "./OAuthErrorContent";

export default function OAuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-heading text-primary mb-2">Authentication Failed</h1>
          <p className="font-sans font-bold text-text/70">Loading...</p>
        </div>
      </div>
    }>
      <OAuthErrorContent />
    </Suspense>
  );
}
