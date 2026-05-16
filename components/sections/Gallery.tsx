import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Gallery() {
  return (
    <section className="relative bg-[#0a0a0a]" id="gallery">
      {/* We use a separate component logic here to cleanly bind the ref */}
      <GalleryScroll />
    </section>
  );
}

function GalleryScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Maps vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={targetRef} className="relative w-full h-[300vh] bg-[#0a0a0a]" style={{ position: "relative" }}>
      {/* ADDED 'relative w-full' to permanently silence the Framer Motion warning */}
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        
        {/* 1. Cinematic Header - FIXED FOR MOBILE */}
        <div className="absolute top-24 md:top-32 left-0 w-full px-6 md:px-24 flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-6 z-10 pointer-events-none">
          <div>
            <p className="font-mono text-[#c9a84c] text-[8px] md:text-[10px] tracking-[0.4em] uppercase mb-2 md:mb-4">
              Visual Odyssey
            </p>
            <h2 className="text-5xl md:text-[clamp(52px,7vw,96px)] leading-none uppercase text-[#f5f5f5] m-0 tracking-tight" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              The Gallery
            </h2>
          </div>
          <p className="text-[#888] font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-left md:text-right mb-2">
            Pure Steel <br className="hidden md:block" /> <span className="text-[#f5f5f5]">Crafted for the bold.</span>
          </p>
        </div>

        {/* 2. The Animated Gallery Track - FIXED FOR MOBILE */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-6 md:px-24 mt-32 md:mt-20 w-max items-center">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="relative w-[85vw] md:w-[700px] h-[50vh] md:h-[55vh] bg-[#111] rounded-xl overflow-hidden group shrink-0 border border-[#222] shadow-2xl"
            >
              {/* Using your exact .jpeg extension */}
              <img 
                src={`/gallery/img-${item}.jpeg`} 
                alt={`Jawa Gallery ${item}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8 pointer-events-none">
                <span className="text-[#c9a84c] font-mono text-[8px] md:text-[10px] tracking-widest uppercase border border-[#c9a84c]/50 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-md bg-black/40">
                  View Full Detail
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
