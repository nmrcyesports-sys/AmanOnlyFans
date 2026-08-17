import React from 'react';
import { motion } from 'motion/react';

export default function FinalCTA() {
  return (
    <section className="py-32 md:py-48 bg-[#4D7CFE] text-[#FFFFFF] flex flex-col items-center text-center px-6 selection:bg-[#161616] selection:text-[#FFFFFF]">
       <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl font-serif italic mb-8">"Stay psycho."</h2>
          <p className="text-xl md:text-2xl font-sans font-light tracking-wide opacity-80 uppercase">Never compromise on your vision.</p>
       </motion.div>
    </section>
  );
}
