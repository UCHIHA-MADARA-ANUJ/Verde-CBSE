"use client";

import { cn } from "../lib/utils";

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "green" | "cyan" | "purple";
  as?: "h1" | "h2" | "h3" | "span" | "p";
  pulse?: boolean;
}

export default function NeonText({
  children,
  className,
  color = "green",
  as: Tag = "span",
  pulse = false,
}: NeonTextProps) {
  const colorMap = {
    green: "text-neon",
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
  };

  return (
    <Tag
      className={cn(
        colorMap[color],
        pulse && "animate-neon-pulse",
        className
      )}
    >
      {children}
    </Tag>
  );
}
