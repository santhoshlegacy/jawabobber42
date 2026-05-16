"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { HoverButton } from "./HoverButton";

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestRideModal({ isOpen, onClose }: TestRideModalProps) {

  const contactMethods = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Join our community",
      desc: "Connect with other riders.",
      link: { name: "Join our Discord", href: "#" },
    },
    {
      icon: <X className="w-5 h-5" />,
      title: "Follow us on X",
      desc: "Get the latest updates.",
      link: { name: "Send us DMs", href: "#" },
    },
  ];

  const easing: [number, number, number, number] = [0.77, 0, 0.175, 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-[101] w-full max-w-6xl bg-[#0a0a0a] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col lg:flex-row overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.8, ease: easing }}
          >
            <button
              onClick={onClose}
              data-cursor-hover="true"
              className="absolute top-8 right-8 text-[#555] hover:text-[#c9a84c] transition-all duration-500 z-10 p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* LEFT SIDE - CONTEXT */}
            <div className="lg:w-[40%] p-10 lg:p-16 bg-[#111] border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="max-w-md">
                <p className="font-mono text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-6">Experience</p>
                <h3 className="text-[#f5f5f5] text-5xl lg:text-6xl leading-[0.9] tracking-tight uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                  The Spirit<br />Reborn
                </h3>
                <p className="mt-8 text-[#888] font-mono text-[11px] leading-relaxed tracking-wider">
                  Eight decades of racing DNA, precision-engineered for the modern asphalt. Book your pilot seat.
                </p>
              </div>
              <ul className="mt-16 gap-y-12 flex flex-col">
                {contactMethods.map((item, idx) => (
                  <li key={idx} className="group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#c9a84c] mb-6 bg-black/50 group-hover:border-[#c9a84c]/50 transition-colors duration-500">
                      {item.icon}
                    </div>
                    <h4 className="text-[#f5f5f5] text-sm font-bold font-mono uppercase tracking-widest mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[#666] font-mono text-[10px] uppercase tracking-widest">
                      {item.desc}
                    </p>
                    <a
                      href={item.link.href}
                      data-cursor-hover="true"
                      className="inline-flex items-center gap-2 text-[10px] text-[#c9a84c] hover:text-white transition-colors duration-500 font-mono uppercase tracking-[0.3em] mt-6"
                    >
                      {item.link.name}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="lg:w-[60%] p-10 lg:p-16 flex flex-col justify-center text-left">
              <div className="max-w-lg mb-12">
                <p className="text-[#c9a84c] font-mono text-[10px] tracking-[0.5em] uppercase mb-4 text-left">
                  Test Ride
                </p>
                <h3 className="text-[#f5f5f5] text-6xl lg:text-7xl leading-[0.8] tracking-tight uppercase text-left" style={{ fontFamily: "var(--font-heading)" }}>
                  Join The<br /><span className="text-[#c9a84c]">Shadow</span>
                </h3>
              </div>

              <div className="max-w-lg">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-10 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="block text-left font-mono text-[#555] group-focus-within:text-[#c9a84c] text-[10px] tracking-widest uppercase transition-colors duration-500">First name</label>
                      <input
                        type="text"
                        required
                        data-cursor-hover="true"
                        className="block w-full mt-4 pb-2 text-white font-mono text-xs bg-transparent outline-none border-b border-white/10 focus:border-[#c9a84c] transition-all duration-500 text-left"
                        placeholder="E.G. BOBBY"
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-left font-mono text-[#555] group-focus-within:text-[#c9a84c] text-[10px] tracking-widest uppercase transition-colors duration-500">Last name</label>
                      <input
                        type="text"
                        required
                        data-cursor-hover="true"
                        className="block w-full mt-4 pb-2 text-white font-mono text-xs bg-transparent outline-none border-b border-white/10 focus:border-[#c9a84c] transition-all duration-500 text-left"
                        placeholder="E.G. RAO"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block text-left font-mono text-[#555] group-focus-within:text-[#c9a84c] text-[10px] tracking-widest uppercase transition-colors duration-500">Email Address</label>
                    <input
                      type="email"
                      required
                      data-cursor-hover="true"
                      className="block w-full mt-4 pb-2 text-white font-mono text-xs bg-transparent outline-none border-b border-white/10 focus:border-[#c9a84c] transition-all duration-500 text-left"
                      placeholder="HELLO@EXAMPLE.COM"
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-left font-mono text-[#555] group-focus-within:text-[#c9a84c] text-[10px] tracking-widest uppercase transition-colors duration-500">Phone number</label>
                    <div className="flex items-end gap-4 mt-4 text-left">
                      <select className="pb-2 text-xs text-[#c9a84c] bg-transparent border-b border-white/10 outline-none cursor-pointer font-mono tracking-widest text-left">
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                      </select>
                      <input
                        type="tel"
                        required
                        data-cursor-hover="true"
                        className="block w-full pb-2 text-white font-mono text-xs bg-transparent outline-none border-b border-white/10 focus:border-[#c9a84c] transition-all duration-500 text-left"
                        placeholder="000 000 0000"
                      />
                    </div>
                  </div>

                  <div className="pt-8">
                    <HoverButton className="w-full py-6 text-xs bg-[#c9a84c] text-black border-none rounded-full">
                      Confirm Transmission
                    </HoverButton>
                  </div>
                </form>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}