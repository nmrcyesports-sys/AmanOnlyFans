import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Gallery() {
  const { data } = useProfile();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!data.galleryImages || data.galleryImages.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-[100rem] mx-auto min-h-[80vh] flex flex-col items-center border-t border-black/5">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
         <h3 className="text-sm tracking-[0.4em] text-black/40 uppercase">Gallery</h3>
         
         <div className="relative w-full md:w-auto">
           <select 
             className="w-full appearance-none bg-black/5 border border-black/10 text-black px-8 py-4 rounded-full outline-none focus:border-black/30 transition-colors uppercase tracking-widest text-xs pr-12 cursor-pointer"
             value={selectedIndex}
             onChange={(e) => setSelectedIndex(Number(e.target.value))}
           >
             {data.galleryImages.map((_, i) => (
               <option key={i} value={i}>Photo {i + 1}</option>
             ))}
           </select>
           <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-black/50">
             ▼
           </div>
         </div>
      </div>

      <div className="w-full max-w-7xl flex-1 relative overflow-hidden rounded-3xl bg-black/5 min-h-[60vh] md:min-h-[70vh] flex items-center justify-center" data-cursor="view">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={data.galleryImages[selectedIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`Gallery ${selectedIndex + 1}`}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
