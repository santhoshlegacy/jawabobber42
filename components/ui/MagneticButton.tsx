"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "outline" | "fill" | "ghost";
  "data-cursor-hover"?: boolean;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "outline",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.4;
    const distY = (e.clientY - centerY) * 0.4;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center px-8 py-3.5",
    "font-mono text-xs tracking-[0.3em] uppercase",
    "transition-colors duration-300 will-change-transform no-select",
    variant === "outline" &&
      "border border-[#c9a84c]/60 text-[#c9a84c] hover:border-[#c9a84c] btn-fill",
    variant === "fill" &&
      "bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#b8860b]",
    variant === "ghost" && "text-[#f5f5f5]/60 hover:text-[#f5f5f5]",
    className
  );

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={baseClasses}
        data-cursor-hover="true"
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      data-cursor-hover="true"
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
