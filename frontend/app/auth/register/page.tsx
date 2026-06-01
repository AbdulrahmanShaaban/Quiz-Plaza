import RegisterForm from "@/components/auth/RegisterForm";
import PageTransition from "@/components/motion/PageTransition";
import Ninja from "@/components/characters/Ninja";

export default function RegisterPage() {
  return (
    <PageTransition className="flex flex-1 items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      <div className="relative w-full max-w-md mt-16">
        {/* Ninja sitting on top of the card */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-10">
          <Ninja className="w-20 h-24 drop-shadow-xl" />
        </div>
        
        {/* White Card */}
        <div className="bg-card rounded-3xl shadow-lg border-2 border-border p-8 pt-12 relative z-0">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-heading tracking-wide text-primary mb-2">Create Account</h1>
            <p className="text-text/70 font-sans">Join Quiz Plaza and start playing.</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </PageTransition>
  );
}
