import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function OtherProfile() {
  const { data } = useProfile();
  if (!data.otherProfile) return null;
  return (
    <section className="py-24 bg-[#F7F5F0] border-t border-[#161616]/5 px-6 flex flex-col items-center text-center">
       <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#777777] mb-8">The Other Me</span>
       <motion.a href={`https://instagram.com/${data.otherProfile}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-[#161616]/10 hover:border-[#161616] transition-colors" data-cursor="hover">
          <div className="w-10 h-10 rounded-full bg-[#161616]/5 overflow-hidden flex items-center justify-center">
             <span className="font-display text-lg text-[#161616] uppercase">{data.otherProfile.charAt(0)}</span>
          </div>
          <span className="font-sans text-sm tracking-wide text-[#161616]">@{data.otherProfile} ↗</span>
       </motion.a>
    </section>
  );
}
