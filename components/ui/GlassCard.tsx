"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gold";
  animate?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  variant = "default",
  animate = false,
  delay = 0,
}: GlassCardProps) {
  const baseClasses = cn(
    variant === "default" ? "glass-card" : "glass-card-gold",
    "p-5",
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
