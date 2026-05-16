"use client";

import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

interface HeroHUDProps {
  visible: boolean;
  isReady: boolean;
}

const springConfig = { stiffness: 200, damping: 20, mass: 1 };
const transitionEase: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function HeroHUD({ visible: isVisible, isReady }: HeroHUDProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Top Label */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isReady ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, ...springConfig }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-[#c9a84c]/40" />
            <span className="font-mono text-[9px] tracking-[0.6em] text-[#c9a84c] uppercase">
              Est. 1929 // Heritage Reborn
            </span>
            <div className="h-px w-8 bg-[#c9a84c]/40" />
          </motion.div>

          {/* Main Titles */}
          <div className="flex flex-col items-center gap-0">
            <div className="overflow-hidden">
              <SplitText
                text="JAWA 42"
                delay={0.3}
                className="text-center text-[clamp(64px,12vw,180px)] font-heading leading-none tracking-tight text-white"
              />
            </div>
            <div className="overflow-hidden -mt-2">
              <SplitText
                text="BOBBER"
                delay={0.5}
                className="text-center text-[clamp(32px,6vw,90px)] font-heading leading-none tracking-[0.1em] text-[#c9a84c]"
              />
            </div>
          </div>

          {/* Specs Subtitle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isReady ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.2, ease: transitionEase }}
            className="mt-10 px-6 py-2 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-full"
          >
            <p className="font-mono text-zinc-500 text-[10px] tracking-[0.4em] uppercase">
              342cc · Liquid Cooled · Single Cylinder
            </p>
          </motion.div>

          {/* Side HUD Elements - Responsive Alignment */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between w-[calc(100%-6rem)] max-w-7xl mx-auto hidden lg:flex">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={isReady ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 1, ...springConfig }}
              className="flex flex-col gap-8"
            >
              {[
                { label: "ENGINE", val: "342cc" },
                { label: "POWER", val: "27.3bhp" },
                { label: "TORQUE", val: "28Nm" }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-[0.4em] text-[#c9a84c]/50">{stat.label}</span>
                  <span className="font-mono text-[11px] text-white/80">{stat.val}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={isReady ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 1.1, ...springConfig }}
              className="flex flex-col gap-8 text-right"
            >
              {[
                { label: "WEIGHT", val: "179kg" },
                { label: "FUEL", val: "14L" },
                { label: "FRAME", val: "DIAMOND" }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-[0.4em] text-[#c9a84c]/50">{stat.label}</span>
                  <span className="font-mono text-[11px] text-white/80">{stat.val}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Unified Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="font-mono text-[9px] tracking-[0.5em] text-zinc-500 uppercase">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a84c] to-transparent relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 48] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-4 bg-white/20 blur-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
