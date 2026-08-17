import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function VisualStory() {
  const { data } = useProfile();
  return (
    <section id="visuals" className="py-24 md:py-40 bg-[#FFFFFF] px-6">
      <div className="max-w-7xl mx-auto">
         <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#777777] mb-16 md:mb-24">VISUALS / 02</div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
           <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-8 aspect-[4/5] rounded-[2rem] overflow-hidden relative group" data-cursor="view">
             <img src={data.profileImage} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-black/5" />
             <div className="absolute bottom-8 left-8 text-xs text-white font-sans uppercase tracking-[0.2em] mix-blend-difference">01 — MAIN</div>
           </motion.div>

           <div className="md:col-span-4 flex flex-col gap-6 md:gap-12 md:mt-48">
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-square rounded-[2rem] overflow-hidden relative bg-[#F7F5F0] border border-[#161616]/5 flex items-center justify-center group" data-cursor="view">
                {data.visuals?.[0] ? (
                   <>
                     <img src={data.visuals[0]} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-black/5" />
                   </>
                ) : (
                   <span className="text-[10px] uppercase tracking-[0.2em] text-[#777777]">ADD VISUAL</span>
                )}
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="aspect-[4/5] rounded-[2rem] overflow-hidden relative bg-[#F7F5F0] border border-[#161616]/5 flex items-center justify-center group" data-cursor="view">
                {data.visuals?.[1] ? (
                   <>
                     <img src={data.visuals[1]} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-black/5" />
                   </>
                ) : (
                   <span className="text-[10px] uppercase tracking-[0.2em] text-[#777777]">ADD VISUAL</span>
                )}
             </motion.div>
           </div>
         </div>
      </div>
    </section>
  );
}
