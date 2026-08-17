import React from 'react';
import { useProfile } from '../context/ProfileContext';

export default function Footer() {
  const { data } = useProfile();
  return (
    <footer className="py-12 bg-[#161616] text-[#FFFFFF] px-6 border-t border-[#FFFFFF]/10">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-sans tracking-[0.2em] text-[#FFFFFF]/40">
          <div>© 2026 {data.displayName}. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
             <a href="#" className="hover:text-[#FFFFFF] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#FFFFFF] transition-colors">Terms</a>
             <a href="/admin" className="hover:text-[#FFFFFF] transition-colors">Admin</a>
          </div>
       </div>
    </footer>
  );
}
