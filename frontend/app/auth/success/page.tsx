import { Suspense } from "react";
import OAuthSuccessContent from "./OAuthSuccessContent";

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 font-sans font-bold text-text">Signing you in...</p>
        </div>
      </div>
    }>
      <OAuthSuccessContent />
    </Suspense>
  );
}
