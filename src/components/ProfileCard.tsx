import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useProfile } from '../context/ProfileContext';
import { useRef } from 'react';

export default function ProfileCard() {
  const { data } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="profile-card" className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full flex justify-center" ref={containerRef}>
      <motion.div 
        style={{ y, opacity }}
        className="w-full max-w-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border border-white/20 p-1">
            <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src={data.profileImage} 
                alt={data.username} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl mb-2">{data.displayName}</h2>
            <div className="flex items-center gap-3 mb-6 text-white/60">
              <span className="font-mono">@{data.username}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="text-sm uppercase tracking-wider">{data.category}</span>
            </div>

            <div className="flex gap-8 md:gap-12 w-full justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl md:text-4xl font-display mb-1">{data.posts}</span>
                <span className="text-xs uppercase tracking-widest text-white/50">Posts</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl md:text-4xl font-display mb-1">{data.followers.toLocaleString()}</span>
                <span className="text-xs uppercase tracking-widest text-white/50">Followers</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl md:text-4xl font-display mb-1">{data.following.toLocaleString()}</span>
                <span className="text-xs uppercase tracking-widest text-white/50">Following</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
