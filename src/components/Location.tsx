import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Location() {
  const { data } = useProfile();

  return (
    <section className="py-32 relative flex flex-col items-center justify-center min-h-[60vh] border-y border-white/5 bg-[#fcfcfc] overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Abstract topography lines */}
          <path d="M-100,200 Q150,50 400,300 T900,100" fill="none" stroke="black" strokeWidth="1" opacity="0.5" />
          <path d="M-50,250 Q200,100 450,350 T950,150" fill="none" stroke="black" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-white/50 mb-8">Location / Identity</span>
        <h2 className="text-6xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter text-white font-display relative">
          {data.location.replace('📍', '').trim()}
          <span className="absolute -right-8 md:-right-16 top-0 md:top-8 text-3xl md:text-6xl">📍</span>
        </h2>
      </motion.div>
    </section>
  );
}
