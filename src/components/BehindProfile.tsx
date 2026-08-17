import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';
import { useRef } from 'react';

export default function BehindProfile() {
  const { data } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="profile" className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full flex justify-center border-t border-black/5" ref={containerRef}>
      <motion.div 
        style={{ y, opacity }}
        className="w-full max-w-4xl border border-black/10 bg-[#f0f0f0]/50 backdrop-blur-md p-8 md:p-16 flex flex-col md:flex-row gap-12 justify-between"
      >
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.4em] text-black/40 mb-12 uppercase">Behind The Profile</h2>
          
          <div className="space-y-8">
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-black/30 mb-2">Name</span>
              <span className="text-xl md:text-2xl font-light tracking-wide">{data.displayName === 'PSYCHO ⚡' ? 'AMAN' : 'AMAN'}</span>
            </div>
            
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-black/30 mb-2">Identity</span>
              <span className="text-xl md:text-2xl font-light tracking-wide">{data.displayName}</span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-black/30 mb-2">Location Label</span>
              <span className="text-xl md:text-2xl font-light tracking-wide">{data.location}</span>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-black/30 mb-2">Social</span>
              <a href={`https://instagram.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-mono text-black/80 hover:text-black transition-colors">
                @{data.username} ↗
              </a>
            </div>
          </div>
        </div>

        {/* Dedicated Portrait Showcase inside Behind Profile */}
        <div className="flex-1 relative group overflow-hidden border border-black/10" data-cursor="view">
          <img 
            src={data.profileImage} 
            alt="Portrait Showcase" 
            className="w-full h-full object-cover aspect-[3/4] grayscale group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-xs uppercase tracking-widest text-white bg-black/50 px-3 py-1 backdrop-blur-md">
              AMAN — {data.displayName}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
