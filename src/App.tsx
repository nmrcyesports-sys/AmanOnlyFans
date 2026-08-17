import React, { useEffect, useState } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import { motion, AnimatePresence } from 'motion/react';

function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-[#161616] flex items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-display text-4xl tracking-widest"
        >
          AMAN
        </motion.h1>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <ProfileProvider>
      <Cursor />
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        {path === '/admin' ? <Admin /> : <Home />}
      </div>
    </ProfileProvider>
  );
}
