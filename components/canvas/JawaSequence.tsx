"use client";

import { useEffect, useRef, useCallback } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const FRAME_BASE = "/jawa-frames/ezgif-frame-";
const CRITICAL_FRAMES = 20; // Frames to fully preload before allowing scroll

function frameSrc(index: number): string {
  return `${FRAME_BASE}${String(index).padStart(3, "0")}.jpg`;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface JawaSequenceProps {
  /** Framer Motion MotionValue from useScroll – zero React re-renders on change */
  scrollYProgress: MotionValue<number>;
  /** Called once frame 1 is painted to the canvas and critical frames are loaded */
  onFirstFrameReady?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function JawaSequence({
  scrollYProgress,
  onFirstFrameReady,
}: JawaSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Sparse array: index i holds frame (i+1).jpg
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const firstFrameReadyFiredRef = useRef(false);

  // ── Cover-fit draw ──────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (w === 0 || h === 0) return;

    // Only resize the backing store when dimensions actually changed
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ── Find nearest loaded frame (never leave canvas blank) ─────────────────
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Walk backward to find the closest already-loaded frame
      for (let fallback = index - 1; fallback >= 0; fallback--) {
        const candidate = imagesRef.current[fallback];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
    }

    // ── Failsafe Render: If no frame at all is found, show a debug state ─────
    if (!img || !img.complete || img.naturalWidth === 0) {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "white";
      ctx.font = "16px Space Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`FRAME MISSING: ${index + 1}`, w / 2, h / 2);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    // Object-fit: cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW = w, drawH = h, offsetX = 0, offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawH = h;
      drawW = h * imgAspect;
      offsetX = (w - drawW) / 2;
    } else {
      drawW = w;
      drawH = w / imgAspect;
      offsetY = (h - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── RAF-throttled render loop ───────────────────────────────────────────────
  const scheduleRender = useCallback(
    (index: number) => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        drawFrame(index);
      });
    },
    [drawFrame]
  );

  // ── Frame loading ───────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const loadImage = (frameNum: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = frameSrc(frameNum);
        
        // DEBUG: Image Path Logging
        console.log("Trying to load:", img.src);

        const done = () => {
          if (!mounted) return;
          imagesRef.current[frameNum - 1] = img;
          loadedCountRef.current += 1;

          const pct = Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100);
          window.dispatchEvent(
            new CustomEvent("frameLoadProgress", { detail: { progress: pct } })
          );
          resolve();
        };

        img.onload = () => {
          // Paint frame 1 immediately once it lands
          if (frameNum === 1 && mounted) {
            imagesRef.current[0] = img;
            scheduleRender(0);
          }
          done();
        };
        
        img.onerror = () => {
          // DEBUG: Image Error Logging
          console.error("Failed to load frame:", frameNum, img.src);
          done(); // Count failures so progress always reaches 100%
        };
      });

    // ── Phase 1: load first CRITICAL_FRAMES with Promise.all ────────────────
    const criticalLoad = async () => {
      const criticalPromises: Promise<void>[] = [];
      for (let i = 1; i <= CRITICAL_FRAMES; i++) {
        criticalPromises.push(loadImage(i));
      }
      await Promise.all(criticalPromises);

      if (!mounted) return;

      // Paint frame 1 → now fire the "ready" callback so Preloader can exit
      drawFrame(0);
      if (!firstFrameReadyFiredRef.current) {
        firstFrameReadyFiredRef.current = true;
        onFirstFrameReady?.();
      }

      // ── Phase 2: load remaining frames in background batches ──────────────
      const BATCH = 20;
      let start = CRITICAL_FRAMES + 1;

      const loadNextBatch = () => {
        if (!mounted || start > TOTAL_FRAMES) return;
        const end = Math.min(start + BATCH - 1, TOTAL_FRAMES);
        const batch: Promise<void>[] = [];
        for (let i = start; i <= end; i++) batch.push(loadImage(i));
        Promise.all(batch).then(loadNextBatch);
        start = end + 1;
      };

      loadNextBatch();
    };

    criticalLoad();

    return () => {
      mounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Listen to scroll MotionValue – ZERO React re-renders ───────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0→1 to frame index 0→239
    const index = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    
    // DEBUG: Scroll Sync Logging
    console.log("Current Scroll Progress:", latest, "Calculated Frame Index:", index);

    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;
    scheduleRender(index);
  });

  // ── Handle window resize ────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => scheduleRender(currentFrameRef.current);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [scheduleRender]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Jawa 42 Bobber 360° rotation sequence"
      data-cursor-bike="true"
      style={{ imageRendering: "auto" }}
    />
  );
}
