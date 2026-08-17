import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function SocialConnect() {
  const { data } = useProfile();
  return (
    <section id="social" className="py-24 md:py-40 bg-[#161616] text-[#FFFFFF] px-6">
      <div className="max-w-7xl mx-auto">
         <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#FFFFFF]/40 mb-16 md:mb-24">SOCIAL / 03</div>
         <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <h2 className="text-4xl md:text-7xl font-display tracking-tighter leading-none max-w-xl">CONNECT &<br/><span className="text-[#FFFFFF]/40">COLLABORATE.</span></h2>
            <div className="flex flex-col gap-6 md:w-1/3">
               <a href={`https://instagram.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center pb-6 border-b border-[#FFFFFF]/10 hover:border-[#FFFFFF]/40 transition-colors" data-cursor="hover">
                  <span className="text-sm font-sans uppercase tracking-[0.2em]">Instagram</span>
                  <span className="text-[#FFFFFF]/40 group-hover:text-[#FFFFFF] transition-colors">↗</span>
               </a>
               <a href={`mailto:hello@${data.username.replace('@','')}.com`} className="group flex justify-between items-center pb-6 border-b border-[#FFFFFF]/10 hover:border-[#FFFFFF]/40 transition-colors" data-cursor="hover">
                  <span className="text-sm font-sans uppercase tracking-[0.2em]">Email</span>
                  <span className="text-[#FFFFFF]/40 group-hover:text-[#FFFFFF] transition-colors">↗</span>
               </a>
            </div>
         </div>
      </div>
    </section>
  );
}
