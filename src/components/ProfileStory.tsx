import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function ProfileStory() {
  const { data } = useProfile();
  return (
    <section id="profile" className="py-24 md:py-40 bg-[#FFFFFF] px-6">
      <div className="max-w-7xl mx-auto">
         <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#777777] mb-16 md:mb-24">PROFILE / 01</div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0" data-cursor="view">
               <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover rounded-[2rem] grayscale contrast-125 hover:scale-[1.02] transition-transform duration-1000 shadow-2xl" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} className="flex flex-col">
               <h3 className="text-4xl md:text-6xl font-display text-[#161616] mb-8 tracking-tight">ABOUT AMAN</h3>
               <p className="text-lg md:text-xl font-serif text-[#777777] leading-relaxed mb-12">
                 Aman, known online as {data.username}, presents a public-facing {data.category.toLowerCase()} under the identity {data.displayName}.
               </p>

               <div className="flex flex-col gap-6 border-t border-[#161616]/10 pt-8">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#161616]/5 pb-6 gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Display Name</span>
                    <span className="text-xl font-display text-[#161616] tracking-tight">{data.displayName}</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#161616]/5 pb-6 gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Username</span>
                    <span className="text-xl font-display text-[#161616] tracking-tight">{data.username}</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#161616]/5 pb-6 gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Category</span>
                    <span className="text-xl font-display text-[#161616] tracking-tight">{data.category}</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Location</span>
                    <span className="text-xl font-display text-[#161616] tracking-tight">{data.location}</span>
                 </div>
               </div>
            </motion.div>
         </div>
      </div>
    </section>
  );
}
