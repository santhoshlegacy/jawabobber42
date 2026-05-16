"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const springConfig = { stiffness: 300, damping: 30, mass: 1 };

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    data-cursor-hover="true"
    className="group relative h-5 flex items-center overflow-hidden font-mono text-[10px] tracking-[0.3em] uppercase whitespace-nowrap"
  >
    <div className="flex flex-col transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-1/2">
      <span className="text-zinc-500">{children}</span>
      <span className="text-[#c9a84c]">{children}</span>
    </div>
  </Link>
);

export function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-8 left-0 w-full z-[100] flex justify-center px-6 pointer-events-none">
      <motion.div
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", ...springConfig }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between gap-12",
          "px-8 py-3 backdrop-blur-xl border transition-all duration-500 ease-in-out",
          isScrolled 
            ? "rounded-2xl border-white/10 bg-black/60 shadow-2xl" 
            : "rounded-full border-white/5 bg-white/[0.02]"
        )}
      >
        <Link href="/" data-cursor-hover="true" className="flex items-center gap-4 shrink-0 group">
          <div className="relative w-2 h-2">
            <span className="absolute inset-0 bg-[#c9a84c] rounded-full group-hover:animate-ping opacity-75" />
            <span className="relative block w-2 h-2 bg-[#c9a84c] rounded-full" />
          </div>
          <span className="text-white text-xl tracking-[0.2em] font-heading pt-1">JAWA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {["Heritage", "Specs", "Gallery", "Dealers"].map((item) => (
            <AnimatedNavLink key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover="true"
            onClick={onOpenModal}
            transition={{ type: "spring", ...springConfig }}
            className="relative px-6 py-2 text-[9px] tracking-[0.2em] uppercase font-bold text-black bg-[#c9a84c] rounded-full overflow-hidden group"
          >
            <span className="relative z-10">Book Test Ride</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>
        </div>

        <button 
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          data-cursor-hover="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6 items-center">
                {["Heritage", "Specs", "Gallery", "Dealers"].map((item) => (
                  <Link 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    data-cursor-hover="true"
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs tracking-widest text-zinc-400 hover:text-[#c9a84c] uppercase transition-colors"
                  >
                    {item}
                  </Link>
                ))}
                <button 
                  data-cursor-hover="true"
                  onClick={() => { setIsOpen(false); onOpenModal(); }}
                  className="w-full py-4 text-[10px] tracking-widest uppercase font-bold text-black bg-[#c9a84c] rounded-xl"
                >
                  Book Test Ride
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
