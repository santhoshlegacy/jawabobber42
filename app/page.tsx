"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// UI Components
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import { Header } from "@/components/layout/Header";
import JawaSequence from "@/components/canvas/JawaSequence";
import HeroHUD from "@/components/sections/HeroHUD";
import ExplodedHUD from "@/components/sections/ExplodedHUD";
import Gallery from "@/components/sections/Gallery";
import { HoverButton } from "@/components/ui/HoverButton";
import TestRideModal from "@/components/ui/TestRideModal";
import { cn } from "@/lib/utils";

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

export default function Page() {
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasTrackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const canvasScrollProgress = useTransform(scrollY, (y) => {
    const el = canvasTrackRef.current;
    if (!el) return 0;
    const start = el.offsetTop;
    const end = start + el.offsetHeight - window.innerHeight;
    if (end <= 0) return 0;
    return Math.min(Math.max((y - start) / end, 0), 1);
  });

  const [canvasProgress, setCanvasProgress] = useState(0);
  useMotionValueEvent(canvasScrollProgress, "change", (v) => {
    setCanvasProgress(v);
  });

  const showHeroHUD = canvasProgress < 0.1;
  const showExplodedHUD = canvasProgress >= 0.5 && canvasProgress < 0.9;
  const explodedProgress =
    canvasProgress >= 0.5 && canvasProgress < 0.9
      ? (canvasProgress - 0.5) / 0.4
      : 0;

  return (
    <main className="bg-black select-none">
      <Preloader onComplete={() => setIsReady(true)} />
      {isReady && <Header onOpenModal={() => setIsModalOpen(true)} />}

      {/* Hero Canvas Section */}
      <div ref={canvasTrackRef} className="relative h-[600vh]" style={{ position: "relative" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <JawaSequence scrollYProgress={canvasScrollProgress} />
          </div>

          {/* HUD overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HeroHUD visible={showHeroHUD} isReady={isReady} />
            <ExplodedHUD visible={showExplodedHUD} progress={explodedProgress} />
          </div>

          {/* Cinematic lighting overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-radial-gradient from-transparent via-black/20 to-black/60" />
          <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_20vw_rgba(0,0,0,0.8)]" />
        </div>
      </div>

      {/* Heritage Section */}
      <section id="heritage" className="relative bg-black min-h-screen flex items-center py-32 overflow-hidden">
        {/* Elite Background elements */}
        <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-[#c9a84c]/5 rounded-full blur-[15vw] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#c9a84c 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left Column: Heading */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-px bg-[#c9a84c]" />
                <p className="font-mono text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase">Engineering Art</p>
              </div>

              <h2 className="text-[clamp(64px,10vw,140px)] leading-[0.8] uppercase text-white font-heading mix-blend-difference">
                The Spirit<br />
                <span className="text-[#c9a84c]">Of Jawa</span>
              </h2>

              <motion.div
                className="mt-16 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <p className="text-zinc-500 font-mono text-xs leading-relaxed tracking-wider border-l-2 border-[#c9a84c]/20 pl-8">
                  Czech engineering soul reborn in Indian metal. The Jawa 42 Bobber
                  carries eight decades of racing DNA into a silhouette that turns
                  streets into runways. Every curve is deliberate.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column: Stats Mosaic */}
            <div id="specs" className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: "ENGINE", value: "342cc", sub: "Liquid Cooled" },
                { label: "POWER", value: "27.3", sub: "BHP Output" },
                { label: "TORQUE", value: "28Nm", sub: "Peak Torque" },
                { label: "FRAME", value: "STEEL", sub: "Duo-Cradle" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  data-cursor-hover="true"
                  className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-2xl overflow-hidden cursor-crosshair"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <p className="relative z-10 font-mono text-[#c9a84c]/40 text-[9px] tracking-[0.4em] uppercase mb-6">
                    {stat.label}
                  </p>
                  <p className="relative z-10 text-white text-4xl font-heading mb-1 transition-transform duration-500 group-hover:scale-110 origin-left">
                    {stat.value}
                  </p>
                  <p className="relative z-10 font-mono text-zinc-600 text-[9px] tracking-widest uppercase">
                    {stat.sub}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-black">
        <Gallery />
      </section>

      {/* CTA Section */}
      <section id="dealers" className="relative bg-black min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60vw] h-[60vw] rounded-full bg-[#c9a84c]/5 blur-[20vw] animate-pulse" />
        </div>

        <motion.div
          className="relative z-10 text-center px-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[#c9a84c] text-[10px] tracking-[1em] uppercase mb-16">
            The Legend Continues
          </p>

          <div className="mb-24">
            <h2 className="text-[clamp(80px,18vw,240px)] leading-[0.7] uppercase text-white font-heading mix-blend-difference">
              Own The<br />
              <span className="text-[#c9a84c]">Shadow</span>
            </h2>
          </div>

          {/* THE LUXURY CTA BUTTONS */}
          <div className="relative z-50 flex items-center justify-center gap-6 flex-wrap mt-8 pointer-events-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 text-black font-bold tracking-[0.2em] uppercase text-[10px] bg-[#c9a84c] hover:bg-[#e0c473] rounded-full transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
            >
              Book A Test Ride
            </button>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-10 py-4 text-[#888] font-bold tracking-[0.2em] uppercase text-[10px] bg-transparent border border-[#333] hover:border-[#c9a84c] hover:text-[#c9a84c] rounded-full transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
            >
              Find a Dealer
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="absolute bottom-16 flex flex-col items-center gap-6">
          <div className="w-16 h-px bg-white/10" />
          <p className="font-mono text-zinc-700 text-[8px] tracking-[0.8em] uppercase">
            Jawa Motorcycles · Crafted with soul
          </p>
        </div>
      </section>

      <TestRideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
