import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function OtherSide() {
  const { data } = useProfile();

  if (!data.otherAccount) return null;

  return (
    <section className="py-32 md:py-48 bg-[#f5f5f5] text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm tracking-[0.3em] text-black/40 mb-8 uppercase">The Other Me</span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif italic mb-12">
            {data.otherAccount}
          </h2>
          
          <a 
            href={`https://instagram.com/${data.otherAccount.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 text-sm tracking-widest uppercase pb-2 border-b border-black/20 hover:border-black transition-colors"
          >
            VISIT OTHER PROFILE 
            <motion.span 
              className="inline-block"
              whileHover={{ x: 5, y: -5 }}
              transition={{ type: "spring" }}
            >
              ↗
            </motion.span>
          </a>
        </motion.div>
      </div>
      
      {/* Grain overlay for white section */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
    </section>
  );
}
