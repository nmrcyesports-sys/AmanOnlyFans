import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Identity() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const width1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const width2 = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-64 overflow-hidden w-full flex flex-col justify-center bg-[#fcfcfc]"
    >
      <div className="flex flex-col gap-8 md:gap-16 px-4 md:px-12 max-w-7xl mx-auto w-full">
        
        <div className="relative">
          <h2 className="text-5xl md:text-8xl lg:text-9xl leading-none text-black/10 font-display">
            JUST BE YOURSELF.
          </h2>
          <motion.div 
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap"
            style={{ width: width1 }}
          >
            <h2 className="text-5xl md:text-8xl lg:text-9xl leading-none text-black font-display">
              JUST BE YOURSELF.
            </h2>
          </motion.div>
        </div>
        
        <div className="relative self-end text-right">
          <h2 className="text-5xl md:text-8xl lg:text-9xl leading-none text-black/10 font-serif italic pr-2">
            THERE IS NO ONE BETTER.
          </h2>
          <motion.div 
            className="absolute top-0 right-0 overflow-hidden whitespace-nowrap flex justify-end"
            style={{ width: width2 }}
          >
            <h2 className="text-5xl md:text-8xl lg:text-9xl leading-none text-black font-serif italic pr-2">
              THERE IS NO ONE BETTER.
            </h2>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
