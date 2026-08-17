import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function InstagramSection() {
  const { data } = useProfile();
  return (
    <section className="py-32 bg-[#F7F5F0] border-t border-[#161616]/5 px-6 flex flex-col items-center justify-center text-center">
       <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] text-white flex items-center justify-center text-3xl shadow-xl mb-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
       </div>
       <h3 className="text-4xl md:text-5xl font-display text-[#161616] tracking-tight mb-6">Explore the Feed</h3>
       <p className="text-[#777777] font-serif text-xl md:text-2xl mb-12 max-w-xl">
         Dive deeper into {data.username}'s world on Instagram. A curated collection of moments, thoughts, and aesthetics.
       </p>
       <a href={`https://instagram.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-[#161616] text-white rounded-full text-[10px] font-sans uppercase tracking-[0.2em] hover:bg-[#4D7CFE] hover:scale-105 transition-all duration-300 shadow-xl" data-cursor="hover">OPEN INSTAGRAM ↗</a>
    </section>
  );
}
