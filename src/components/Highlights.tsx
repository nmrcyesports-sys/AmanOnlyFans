import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Highlights() {
  const { data } = useProfile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Auto-advance or close after 5 seconds
  useEffect(() => {
    if (activeIndex === null) return;
    const timer = setTimeout(() => {
      if (data.highlights && activeIndex < data.highlights.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(null);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, data.highlights]);

  if (!data.highlights || data.highlights.length === 0) return null;

  return (
    <section className="py-24 bg-[#FFFFFF] border-t border-[#161616]/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#777777] mb-16">HIGHLIGHTS</div>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
          {data.highlights.map((h, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="flex flex-col items-center gap-4 snap-start shrink-0 cursor-pointer"
              onClick={() => setActiveIndex(i)}
              data-cursor="view"
            >
               <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#161616]/20 to-[#161616]/60 hover:scale-105 transition-transform">
                 <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-100">
                   {h.coverImage && <img src={h.coverImage} className="w-full h-full object-cover" />}
                 </div>
               </div>
               <span className="text-xs font-sans tracking-widest text-[#161616]">{h.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && data.highlights[activeIndex] && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[999] bg-[#161616] flex items-center justify-center"
          >
            {/* Background blur */}
            <div className="absolute inset-0 opacity-30">
              <img src={data.highlights[activeIndex].coverImage} className="w-full h-full object-cover blur-2xl" />
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-8 right-8 z-50 text-white p-4 font-sans text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
            >
              CLOSE
            </button>

            {/* Story Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md aspect-[9/16] bg-black md:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="absolute top-4 left-4 right-4 flex gap-2 z-20">
                {data.highlights.map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: i < activeIndex ? '100%' : '0%' }}
                      animate={{ width: i === activeIndex ? '100%' : (i < activeIndex ? '100%' : '0%') }}
                      transition={{ duration: i === activeIndex ? 5 : 0, ease: "linear" }}
                      className="h-full bg-white"
                    />
                  </div>
                ))}
              </div>

              {/* User Info */}
              <div className="absolute top-8 left-4 z-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <img src={data.profileImage} className="w-full h-full object-cover" />
                </div>
                <span className="text-white text-xs font-sans font-medium tracking-wide drop-shadow-md">
                  {data.username}
                </span>
                <span className="text-white/70 text-[10px] font-sans tracking-widest uppercase drop-shadow-md">
                  {data.highlights[activeIndex].title}
                </span>
              </div>

              {/* Navigation Click Areas */}
              <div 
                className="absolute inset-y-0 left-0 w-1/3 z-10" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeIndex > 0) setActiveIndex(activeIndex - 1);
                }}
              />
              <div 
                className="absolute inset-y-0 right-0 w-1/3 z-10" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeIndex < data.highlights!.length - 1) setActiveIndex(activeIndex + 1);
                  else setActiveIndex(null);
                }}
              />

              {/* Main Image */}
              <img 
                src={data.highlights[activeIndex].coverImage} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
