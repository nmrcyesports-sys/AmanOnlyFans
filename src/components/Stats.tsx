import React from 'react';
import { motion, useInView } from 'motion/react';
import { useProfile } from '../context/ProfileContext';
import { useRef, useState, useEffect } from 'react';

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const timer = setInterval(() => {
        start += Math.ceil(value / 40);
        if (start >= value) { setCount(value); clearInterval(timer); }
        else setCount(start);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [inView, value]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const { data } = useProfile();
  return (
    <section className="w-full border-y border-[#161616]/10 py-16 md:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#161616]/10 text-center">
         <div className="flex flex-col items-center pt-8 md:pt-0">
            <span className="text-6xl md:text-8xl font-display text-[#161616] tracking-tighter"><Counter value={data.posts} /></span>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#777777] mt-4">POSTS</span>
         </div>
         <div className="flex flex-col items-center pt-8 md:pt-0">
            <span className="text-6xl md:text-8xl font-display text-[#161616] tracking-tighter"><Counter value={data.followers} /></span>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#777777] mt-4">FOLLOWERS</span>
         </div>
         <div className="flex flex-col items-center pt-8 md:pt-0">
            <span className="text-6xl md:text-8xl font-display text-[#161616] tracking-tighter"><Counter value={data.following} /></span>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#777777] mt-4">FOLLOWING</span>
         </div>
      </div>
    </section>
  );
}
