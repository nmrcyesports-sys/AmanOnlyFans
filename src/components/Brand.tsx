import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Brand() {
  const { data } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="vibe" ref={containerRef} className="py-32 md:py-48 overflow-hidden w-full flex flex-col justify-center items-center bg-[#fcfcfc] relative min-h-screen">
      
      {/* Background Animated Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden opacity-20">
        <motion.h1 style={{ y: y1 }} className="text-[20vw] font-display leading-[0.8] whitespace-nowrap text-black/5 blur-sm select-none">
          {data.displayName}
        </motion.h1>
        <motion.h1 style={{ y: y2 }} className="text-[20vw] font-display leading-[0.8] whitespace-nowrap text-black/10 blur-[2px] select-none">
          {data.displayName}
        </motion.h1>
        <motion.h1 style={{ y: y3 }} className="text-[20vw] font-display leading-[0.8] whitespace-nowrap text-black/5 blur-md select-none">
          {data.displayName}
        </motion.h1>
      </div>

      {/* Main Foreground Typography */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h2 className="text-[15vw] md:text-[18vw] leading-none font-display tracking-tighter text-black drop-shadow-[0_0_50px_rgba(0,0,0,0.1)]">
          {data.displayName}
        </h2>
        
        <div className="mt-8 text-xs md:text-sm tracking-[0.4em] uppercase text-black/50 flex items-center gap-4">
          <span>AMAN</span>
          <span className="w-1 h-1 bg-black/30 rounded-full" />
          <span className="font-mono">@{data.username}</span>
        </div>
      </motion.div>
      
    </section>
  );
}
