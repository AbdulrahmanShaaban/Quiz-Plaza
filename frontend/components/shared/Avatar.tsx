import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

export default function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size === "lg" ? 56 : size === "md" ? 40 : 32}
        height={size === "lg" ? 56 : size === "md" ? 40 : 32}
        className={cn("rounded-full object-cover ring-2 ring-primary/40", sizeMap[size], className)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/20 font-semibold text-primary ring-2 ring-primary/30",
        sizeMap[size],
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
