// components/FloatingHearts.tsx
// KOMPONEN INI UNTUK ANIMASI HATI MENGAMBANG

"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 15, // Ukuran 15-35px
        duration: Math.random() * 3 + 3, // Durasi 3-6 detik
      };

      setHearts(prev => [...prev, newHeart]);

      // Hapus heart setelah animasi selesai
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 500); // Buat heart baru setiap 0.5 detik - GANTI ANGKA INI untuk lebih banyak/sedikit

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '100vh', opacity: 0, rotate: 0 }}
            animate={{ 
              y: '-100px', 
              opacity: [0, 0.6, 0], // GANTI untuk opacity: 0 = transparan, 1 = solid
              rotate: 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
            }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. Ganti emoji 💕 dengan emoji lain (line 54)
// 2. Ganti interval (line 29) untuk lebih banyak/sedikit hati
// 3. Ganti size range (line 19) untuk ukuran hati
// 4. Ganti duration (line 20) untuk kecepatan naik