"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

interface ExplodedHUDProps {
  visible: boolean;
  progress: number;
}

const springConfig = { stiffness: 150, damping: 20 };

const specs = [
  {
    id: "engine",
    title: "Engine Core",
    subtitle: "342cc Liquid-Cooled",
    details: ["27.33 BHP Output", "28 Nm Peak Torque", "DOHC Technology"],
    position: "left-0 top-[15%]",
    dotX: "32%",
    dotY: "52%",
    delay: 0,
  },
  {
    id: "tank",
    title: "Fuel Tank",
    subtitle: "Teardrop Sculpted",
    details: ["14 Litre Capacity", "Heritage Badging", "Chrome Accents"],
    position: "right-0 top-[5%]",
    dotX: "56%",
    dotY: "38%",
    delay: 0.15,
  },
  {
    id: "exhaust",
    title: "Exhaust",
    subtitle: "Dual Drag Pipe",
    details: ["Stainless Steel", "Signature Rumble", "Heat Shielded"],
    position: "right-0 bottom-[10%]",
    dotX: "68%",
    dotY: "66%",
    delay: 0.3,
  },
];

export default function ExplodedHUD({ visible, progress }: ExplodedHUDProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full max-w-7xl mx-auto px-8 lg:px-12">
            {/* Design Text - Left Aligned */}
            <motion.div
              className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ...springConfig }}
            >
              <p className="font-mono text-[#c9a84c]/50 text-[10px] tracking-[0.5em] uppercase mb-4">
                Architecture
              </p>
              <h2 className="text-[clamp(40px,5vw,72px)] leading-[0.85] uppercase text-white font-heading">
                Form<br />
                <span className="text-[#c9a84c]">Follows</span><br />
                Soul
              </h2>
            </motion.div>

            {/* Glass Cards in relative container */}
            <div className="absolute inset-0 py-24">
              {specs.map((spec) => (
                <div
                  key={`card-${spec.id}`}
                  data-cursor-hover="true"
                  className={`absolute ${spec.position} pointer-events-auto cursor-none group/card`}
                >
                  <GlassCard variant="gold" animate delay={spec.delay} className="w-56 md:w-64 border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-[#c9a84c]/30 hover:bg-white/[0.05]">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shadow-[0_0_10px_#c9a84c]" />
                        <h3 className="text-white text-xl font-heading tracking-wide uppercase">
                          {spec.title}
                        </h3>
                      </div>
                      <div className="space-y-2 pl-4.5 border-l border-white/5">
                        <p className="font-mono text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase">
                          {spec.subtitle}
                        </p>
                        {spec.details.map((d) => (
                          <p key={d} className="font-mono text-zinc-500 text-[10px] tracking-wider leading-none">
                            {d}
                          </p>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Markers */}
          <div className="absolute inset-0">
             {specs.map((spec) => (
               <motion.div
                 key={`dot-${spec.id}`}
                 className="absolute w-2 h-2 rounded-full bg-[#c9a84c]"
                 style={{
                   left: spec.dotX,
                   top: spec.dotY,
                   transform: "translate(-50%, -50%)",
                 }}
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: spec.delay + 0.3, type: "spring", stiffness: 200 }}
               >
                 <div className="absolute inset-0 rounded-full bg-[#c9a84c] animate-ping opacity-30" />
               </motion.div>
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
