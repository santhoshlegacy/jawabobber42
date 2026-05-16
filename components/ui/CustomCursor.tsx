"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isBike, setIsBike] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 450px at ${e.clientX}px ${e.clientY}px, rgba(201, 168, 76, 0.05), transparent 80%)`;
      }
    };

    const animate = () => {
      outerPosRef.current.x +=
        (posRef.current.x - outerPosRef.current.x) * 0.12;
      outerPosRef.current.y +=
        (posRef.current.y - outerPosRef.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPosRef.current.x}px`;
        outerRef.current.style.top = `${outerPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnterHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-bike]")) {
        setIsBike(true);
      }
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const onLeaveHover = () => {
      setIsHovering(false);
      setIsBike(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnterHover);
    document.addEventListener("mouseout", onLeaveHover);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnterHover);
      document.removeEventListener("mouseout", onLeaveHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lagging */}
      <div
        ref={outerRef}
        className={`cursor-outer ${isHovering || isBike ? "is-hovering" : ""}`}
        aria-hidden="true"
      >
        {isBike && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-[#c9a84c] tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            View
          </motion.span>
        )}
      </div>

      {/* Inner dot — instant */}
      <div
        ref={innerRef}
        className={`cursor-inner ${isHovering || isBike ? "is-hovering" : ""}`}
        aria-hidden="true"
      />

      {/* Reactive Spotlight — large radial gradient behind content */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-[-1]"
      />
    </>
  );
}
