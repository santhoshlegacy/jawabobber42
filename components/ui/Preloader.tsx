"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  /** Called AFTER the exit animation fully completes */
  onComplete: () => void;
}

const SIMULATED_DURATION_MS = 2500; 

export default function Preloader({ onComplete }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [eventProgress, setEventProgress] = useState(0);

  useEffect(() => {
    const handleFrameEvent = (e: Event) => {
      const progress = (e as CustomEvent<{ progress: number }>).detail.progress;
      setEventProgress(progress);
    };
    window.addEventListener("frameLoadProgress", handleFrameEvent);

    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - (startTimeRef.current ?? now);
      const timerPct = Math.min((elapsed / SIMULATED_DURATION_MS) * 100, 100);

      // Blend simulated progress and real event progress
      // This ensures the bar moves even if events are sparse, 
      // but only hits 100 when both are ready.
      const pct = Math.min(timerPct, eventProgress > 0 ? eventProgress : timerPct);

      setDisplayProgress(Math.round(pct));

      if (pct >= 100 && !completedRef.current) {
        completedRef.current = true;
        setTimeout(() => setIsExiting(true), 400);
        return; 
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("frameLoadProgress", handleFrameEvent);
    };
  }, [eventProgress]);

  const statusText =
    displayProgress < 25
      ? "Initialising render engine..."
      : displayProgress < 55
        ? "Pre-caching frames..."
        : displayProgress < 85
          ? "Calibrating sequence..."
          : "Launching experience...";

  const formattedProgress = String(displayProgress).padStart(2, "0");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Corner brackets - Elite version */}
          <div className="absolute top-12 left-12 w-12 h-12 border-l border-t border-[#c9a84c]/20" />
          <div className="absolute top-12 right-12 w-12 h-12 border-r border-t border-[#c9a84c]/20" />
          <div className="absolute bottom-12 left-12 w-12 h-12 border-l border-b border-[#c9a84c]/20" />
          <div className="absolute bottom-12 right-12 w-12 h-12 border-r border-b border-[#c9a84c]/20" />

          {/* Logo */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[#c9a84c] text-[10px] tracking-[0.8em] uppercase mb-8 opacity-50">
              The Legend Awakens
            </p>
            <h1
              className="text-[clamp(64px,10vw,120px)] leading-none tracking-tight uppercase text-white font-heading"
            >
              JAWA 42
            </h1>
            <h2
              className="text-[clamp(32px,5vw,60px)] leading-none tracking-[0.2em] uppercase text-[#c9a84c] font-heading -mt-2"
            >
              BOBBER
            </h2>
          </motion.div>

          {/* Counter + bar */}
          <motion.div
            className="w-80 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="mb-12 flex items-end justify-center gap-1 tabular-nums">
              <span
                className="text-[120px] leading-[0.8] text-white font-heading"
              >
                {formattedProgress}
              </span>
              <span
                className="text-[40px] leading-none text-[#c9a84c] mb-2 font-heading"
              >
                %
              </span>
            </div>

            {/* Progress track - Elite Thin Line */}
            <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#c9a84c]"
                animate={{ width: `${displayProgress}%` }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>

            <p className="mt-8 font-mono text-zinc-600 text-[9px] tracking-[0.4em] uppercase">
              {statusText}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
