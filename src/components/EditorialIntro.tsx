import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function EditorialIntro() {
  const { data } = useProfile();
  return (
    <section className="py-32 md:py-48 px-6 bg-[#F7F5F0] flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif italic text-[#161616] leading-[1.1] max-w-5xl mx-auto">
          “JUST BE YOURSELF.”
        </h2>
        <p className="mt-8 text-2xl md:text-4xl font-serif text-[#777777]">
          there is no one better.
        </p>
      </motion.div>

      <div className="mt-24 flex gap-8 md:gap-16 text-[10px] uppercase font-sans tracking-[0.3em] text-[#161616]/50">
         <span>{data.displayName === 'PSYCHO ⚡' ? 'AMAN' : 'AMAN'}</span>
         <span>{data.username}</span>
         <span>{data.location}</span>
      </div>
    </section>
  );
}
