import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Vibe() {
  const { data } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const keywords = [
    data.displayName,
    "RAW",
    "UNFILTERED",
    "BOLD",
    "ORIGINAL",
    data.location
  ];

  return (
    <section ref={containerRef} className="py-32 md:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="text-sm tracking-[0.3em] text-black/40 mb-24 text-center md:text-left">THE VIBE</h3>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
          {keywords.map((word, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [100 - (i * 20), -100 + (i * 20)]);
            const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
            
            return (
              <motion.div
                key={i}
                style={{ y, opacity }}
                className="text-4xl md:text-7xl lg:text-8xl text-black/80 hover:text-black transition-colors"
              >
                {word}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-black/[0.02] rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
