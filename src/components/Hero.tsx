import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Hero() {
  const { data } = useProfile();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] w-full bg-[#F7F5F0] overflow-hidden flex flex-col items-center justify-center pt-32 pb-16">
       {/* Entrance line */}
       <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="absolute top-0 left-0 w-full h-[1px] bg-[#161616]/10 origin-left" />

       {/* Giant Background Typography */}
       <motion.div
         style={{ y: bgY }}
         initial={{ y: '20%', opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
         className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
       >
         <h1 className="text-[25vw] md:text-[28vw] font-display text-[#161616]/[0.03] leading-none select-none tracking-tighter w-full text-center">
           AMAN
         </h1>
       </motion.div>

       {/* Main Composition */}
       <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-6">
          {/* Labels top */}
          <div className="w-full flex justify-between text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-[#777777] mb-8 md:mb-16">
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{data.category.toUpperCase()} / 2026</motion.span>
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>{data.location}</motion.span>
          </div>

          {/* Portrait */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[70vw] sm:w-[60vw] md:w-[400px] aspect-[3/4] group"
            data-cursor="view"
          >
             <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(22,22,22,0.15)] border border-[#FFFFFF] bg-white">
                <img src={data.profileImage} alt={data.username} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-[#161616]/5 pointer-events-none mix-blend-multiply" />
             </div>

             {/* Psycho Label Overlay */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               className="absolute -bottom-5 -right-5 md:-right-10 bg-[#161616] text-[#FFFFFF] px-8 py-4 rounded-full text-sm font-display tracking-widest shadow-xl border border-[#FFFFFF]/10"
             >
                {data.displayName}
             </motion.div>
          </motion.div>

          {/* Caption */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-12 text-[10px] font-sans tracking-[0.3em] text-[#777777] uppercase text-center">
             AMAN — {data.displayName}
          </motion.div>

          {/* Quote & CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-16 md:mt-24 flex flex-col items-center text-center">
             <h2 className="font-serif italic text-3xl md:text-5xl text-[#161616] mb-4">"Just be yourself"</h2>
             <h3 className="font-serif text-xl md:text-3xl text-[#777777] mb-12">'there is no one better'</h3>

             <div className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#161616]/40 mb-10">
               @{data.username.replace('@','')}
             </div>

             <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a href="#profile" className="w-full sm:w-auto px-10 py-5 bg-[#161616] text-[#FFFFFF] rounded-full text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[#4D7CFE] hover:scale-105 transition-all duration-500 shadow-xl" data-cursor="hover">EXPLORE PROFILE ↓</a>
                <a href={`https://instagram.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 text-[#161616] rounded-full text-[10px] font-sans tracking-[0.2em] uppercase border border-[#161616]/20 hover:border-[#161616] transition-colors duration-500 flex items-center justify-center gap-2" data-cursor="open">INSTAGRAM ↗</a>
             </div>
          </motion.div>
       </div>
    </section>
  );
}
