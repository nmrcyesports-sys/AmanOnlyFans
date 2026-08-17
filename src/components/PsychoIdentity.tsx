import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function PsychoIdentity() {
  const { data } = useProfile();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="py-32 md:py-48 bg-[#F7F5F0] overflow-hidden flex flex-col justify-center border-y border-[#161616]/5">
       <motion.div style={{ x: x1 }} className="whitespace-nowrap flex items-center gap-16 mb-4">
         <h2 className="text-[25vw] md:text-[20vw] font-display text-[#161616] leading-none tracking-tighter pr-16">{data.displayName}</h2>
         <h2 className="text-[25vw] md:text-[20vw] font-display text-[#161616]/10 leading-none tracking-tighter">{data.displayName}</h2>
       </motion.div>
       <motion.div style={{ x: x2 }} className="whitespace-nowrap flex items-center gap-16">
         <h2 className="text-[25vw] md:text-[20vw] font-display text-[#161616]/10 leading-none tracking-tighter pr-16">{data.displayName}</h2>
         <h2 className="text-[25vw] md:text-[20vw] font-display text-[#161616]/5 leading-none tracking-tighter">{data.displayName}</h2>
       </motion.div>
       <div className="text-center mt-16">
         <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#777777]">A DIGITAL IDENTITY</span>
       </div>
    </section>
  );
}
