import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'open' | 'explore'>('default');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest('[data-cursor]');
      if (hoverTarget) setCursorState(hoverTarget.getAttribute('data-cursor') as any);
      else if (target.closest('button') || target.closest('a')) setCursorState('hover');
      else setCursorState('default');
    };
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const variants = {
    default: { x: mousePosition.x - 6, y: mousePosition.y - 6, width: 12, height: 12, backgroundColor: 'rgba(22, 22, 22, 1)', mixBlendMode: 'normal' as const },
    hover: { x: mousePosition.x - 24, y: mousePosition.y - 24, width: 48, height: 48, backgroundColor: 'rgba(22, 22, 22, 0.05)', border: '1px solid rgba(22,22,22,0.2)' },
    view: { x: mousePosition.x - 40, y: mousePosition.y - 40, width: 80, height: 80, backgroundColor: 'rgba(22, 22, 22, 1)', color: '#F7F5F0' },
    open: { x: mousePosition.x - 40, y: mousePosition.y - 40, width: 80, height: 80, backgroundColor: 'rgba(77, 124, 254, 1)', color: '#FFFFFF' }
  };

  const getLabel = () => {
    if (cursorState === 'view') return 'VIEW';
    if (cursorState === 'open') return 'OPEN ↗';
    return '';
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[200] flex items-center justify-center overflow-hidden"
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
    >
      {(cursorState === 'view' || cursorState === 'open') && (
        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] font-sans font-medium tracking-widest uppercase whitespace-nowrap">
          {getLabel()}
        </motion.span>
      )}
    </motion.div>
  );
}
