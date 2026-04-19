"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shouldSkipPreloader =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)").matches;

    if (shouldSkipPreloader) {
      const frameId = requestAnimationFrame(() => {
        setIsLoading(false);
      });

      return () => cancelAnimationFrame(frameId);
    }

    // Hide scrollbar while loading
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 350);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    
    // Safety fallback
    const fallback = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] bg-[#040508] flex items-center justify-center flex-col"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border border-white/5 border-t-blue-500/80 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            />
            {/* Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="absolute w-16 h-16 rounded-full border border-white/10 border-b-purple-500/80"
            />
             {/* Core Core */}
             <motion.div
               animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.4, 1, 0.4] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
             />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[11px] tracking-[0.45em] text-white/50 font-medium uppercase text-center"
          >
             Loading Assets
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
