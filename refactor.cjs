const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');
const pagesDir = path.join(__dirname, 'src/pages');

// 1. Delete Highlights.tsx
if (fs.existsSync(path.join(componentsDir, 'Highlights.tsx'))) {
    fs.unlinkSync(path.join(componentsDir, 'Highlights.tsx'));
}

// 2. Rewrite Home.tsx
const homePath = path.join(pagesDir, 'Home.tsx');
let homeContent = fs.readFileSync(homePath, 'utf8');
homeContent = homeContent.replace(/import Highlights from '\.\.\/components\/Highlights';\n/g, '');
homeContent = homeContent.replace(/<Highlights \/>\n\s*/g, '');
homeContent = homeContent.replace(/bg-\[#050505\]/g, 'bg-[#fcfcfc]');
homeContent = homeContent.replace(/text-white/g, 'text-black');
homeContent = homeContent.replace(/selection:bg-white/g, 'selection:bg-black');
homeContent = homeContent.replace(/selection:text-black/g, 'selection:text-white');
fs.writeFileSync(homePath, homeContent);

// 3. Rewrite Gallery.tsx
const galleryPath = path.join(componentsDir, 'Gallery.tsx');
const newGallery = `import React, { useState } from 'react';
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
            alt={\`Gallery \${selectedIndex + 1}\`}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(galleryPath, newGallery);

// 4. Update index.css
const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace('--color-background: #050505;', '--color-background: #fcfcfc;');
cssContent = cssContent.replace('--color-surface: #111318;', '--color-surface: #f5f5f5;');
cssContent = cssContent.replace('--color-foreground: #f5f5f5;', '--color-foreground: #050505;');
cssContent = cssContent.replace('--color-muted: #9a9a9a;', '--color-muted: #666666;');
cssContent = cssContent.replace('--color-accent: #ffffff;', '--color-accent: #000000;');
cssContent = cssContent.replace('background: rgba(255, 255, 255, 0.2);', 'background: rgba(0, 0, 0, 0.2);');
cssContent = cssContent.replace('color: #fff;', 'color: #000;');
fs.writeFileSync(cssPath, cssContent);

// 5. General Replacements for other components
const filesToUpdate = [
  'Hero.tsx', 'Navbar.tsx', 'Cursor.tsx', 'Brand.tsx', 'BehindProfile.tsx',
  'Identity.tsx', 'Stats.tsx', 'InstagramFeed.tsx', 'Vibe.tsx', 'Location.tsx',
  'OtherSide.tsx', 'FinalCTA.tsx', 'Footer.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (file === 'Cursor.tsx') {
    content = content.replace(/rgba\(255, 255, 255, 1\)/g, 'rgba(0, 0, 0, 1)');
    content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, 'rgba(0, 0, 0, 0.05)');
    content = content.replace(/rgba\(255,255,255,0\.5\)/g, 'rgba(0,0,0,0.2)');
    content = content.replace(/color: '#000'/g, "color: '#fff'");
    content = content.replace(/text-black/g, "text-white");
  } else if (file === 'Location.tsx') {
    content = content.replace(/stroke="white"/g, 'stroke="black"');
    content = content.replace(/bg-\[#030303\]/g, 'bg-[#fcfcfc]');
  } else if (file === 'OtherSide.tsx') {
     content = content.replace(/bg-white/g, 'bg-[#f5f5f5]');
     // The mix-blend-multiply grain is fine
  } else {
    // Colors
    content = content.replace(/bg-\[#050505\]/g, 'bg-[#fcfcfc]');
    content = content.replace(/bg-\[#020202\]/g, 'bg-[#f5f5f5]');
    content = content.replace(/bg-\[#111318\]\/50/g, 'bg-[#f0f0f0]/50');
    
    // Invert buttons
    content = content.replace(/bg-white text-\[#050505\]/g, 'bg-black text-white');
    content = content.replace(/bg-white text-black/g, 'bg-black text-white');
    
    // Replace white utility classes with black
    content = content.replace(/bg-white/g, 'bg-black');
    content = content.replace(/text-white/g, 'text-black');
    content = content.replace(/border-white/g, 'border-black');
    content = content.replace(/from-white/g, 'from-black');
    content = content.replace(/rgba\(255,255,255,/g, 'rgba(0,0,0,');
  }
  
  fs.writeFileSync(filePath, content);
});

console.log("Refactoring complete.");
