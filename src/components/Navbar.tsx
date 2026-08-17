import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProfile } from '../context/ProfileContext';

export default function Navbar() {
  const { data } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROFILE', href: '#profile' },
    { label: 'STORY', href: '#story' },
    { label: 'VISUALS', href: '#visuals' },
    { label: 'SOCIAL', href: '#social' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-3rem)] max-w-5xl rounded-full px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-[#FFFFFF]/90 backdrop-blur-md shadow-[0_10px_40px_rgba(22,22,22,0.05)] border border-[#161616]/10 md:scale-[0.98]' : 'bg-transparent'}`}
      >
        <a href="#hero" onDoubleClick={() => window.location.href = '/admin'} className="font-display font-bold text-xl tracking-tight text-[#161616] select-none" data-cursor="hover">AMAN</a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="text-xs font-sans uppercase tracking-[0.2em] text-[#777777] hover:text-[#161616] transition-colors" data-cursor="hover">{link.label}</a>
          ))}
        </div>

        <a href={`https://instagram.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="hidden md:block text-xs font-sans uppercase tracking-[0.2em] text-[#161616] hover:text-[#4D7CFE] transition-colors" data-cursor="open">INSTAGRAM ↗</a>

        <button className="md:hidden text-[#161616] p-2" onClick={() => setMobileMenu(true)}>
           <span className="block w-5 h-[1px] bg-[#161616] mb-1.5" />
           <span className="block w-5 h-[1px] bg-[#161616]" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#F7F5F0] z-[60] flex flex-col items-center justify-center"
          >
            <button className="absolute top-10 right-8 text-[#161616] p-4 text-xs font-sans tracking-[0.2em] uppercase" onClick={() => setMobileMenu(false)}>CLOSE</button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label} href={link.href} onClick={() => setMobileMenu(false)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                  className="font-display text-4xl tracking-tight text-[#161616]"
                >{link.label}</motion.a>
              ))}
              <motion.a href={`https://instagram.com/${data.username}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-xs font-sans tracking-[0.2em] uppercase text-[#4D7CFE]">INSTAGRAM ↗</motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
