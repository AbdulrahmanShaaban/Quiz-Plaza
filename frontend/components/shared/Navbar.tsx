"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Avatar from "@/components/shared/Avatar";
import Ninja from "@/components/characters/Ninja";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/rooms", label: "Rooms" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b-2 border-secondary shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={isAuthenticated ? "/" : "/"} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Scaled down ninja for the navbar */}
            <Ninja className="w-10 h-12" />
          </motion.div>
          <span className="text-2xl font-heading tracking-wide text-primary mt-1">
            Quiz Plaza
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isAuthenticated &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-sans font-medium transition-colors relative",
                  pathname === link.href ? "text-secondary" : "text-text/70 hover:text-primary"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full"
                  />
                )}
              </Link>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-sans font-medium text-secondary hover:bg-secondary/10 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 font-heading tracking-wide text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-secondary text-white font-heading tracking-wide rounded-xl shadow-[0_3px_0_#9d1c35] hover:translate-y-[1px] hover:shadow-[0_2px_0_#9d1c35] transition-all"
                >
                  Sign up
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-primary p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t-2 border-secondary/20 bg-card overflow-hidden"
        >
          <div className="flex flex-col p-4 gap-2">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "p-3 rounded-xl font-sans font-medium",
                      pathname === link.href ? "bg-secondary/10 text-secondary" : "text-text/70"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <button 
                  onClick={handleLogout}
                  className="p-3 text-left rounded-xl font-sans font-medium text-secondary flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <div className="p-3 rounded-xl font-heading text-lg text-primary text-center bg-primary/5">
                    Login
                  </div>
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <div className="p-3 rounded-xl font-heading text-lg text-white text-center bg-secondary shadow-[0_3px_0_#9d1c35]">
                    Sign up
                  </div>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
