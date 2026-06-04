import type { Metadata } from "next";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiz Plaza",
  description: "Battle your friends in real-time quiz combat",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
