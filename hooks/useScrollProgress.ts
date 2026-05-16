"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}

export function useSectionScrollProgress(
  ref: React.RefObject<HTMLElement | null>
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (!ref.current) {
        raf = requestAnimationFrame(update);
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const totalHeight = ref.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = totalHeight > 0 ? scrolled / totalHeight : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  return progress;
}
