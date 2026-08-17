import React from 'react';
import { motion } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function InstagramFeed() {
  const { data } = useProfile();

  return (
    <section className="py-24 md:py-32 border-t border-black/10 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div>
            <h3 className="text-sm tracking-[0.3em] text-black/40 mb-4 text-center md:text-left">FROM INSTAGRAM</h3>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-2xl font-mono">@{data.username}</span>
              <span className="px-3 py-1 bg-black/10 rounded-full text-xs tracking-widest">{data.posts} POST</span>
            </div>
          </div>
          <a 
            href={`https://instagram.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="text-sm tracking-widest uppercase border-b border-black/30 pb-1 hover:border-black transition-colors"
          >
            VIEW ON INSTAGRAM ↗
          </a>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer"
          data-cursor="view"
          onClick={() => window.open(`https://instagram.com/${data.username}`, '_blank')}
        >
          <img 
            src={data.featuredPostImage} 
            alt="Featured Post" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
      </div>
    </section>
  );
}
