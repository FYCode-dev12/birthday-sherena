// components/FloatingEmojis.tsx
// KOMPONEN UNTUK ANIMASI EMOJI MENGAMBANG DI BACKGROUND

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

// Array emoji yang akan mengambang
const FLOATING_EMOJIS = ["✨", "🌸", "💫", "🎀", "🦋", "🌼", "💝", "🎈"];

export default function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEmoji =
        FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)];

      const newEmoji: FloatingEmoji = {
        id: Date.now() + Math.random(),
        emoji: randomEmoji,
        left: Math.random() * 100, // Posisi horizontal random
        size: Math.random() * 25 + 20, // Ukuran 20-45px
        duration: Math.random() * 4 + 4, // Durasi 4-8 detik
        delay: Math.random() * 0.5, // Delay 0-0.5 detik
      };

      setEmojis((prev) => [...prev, newEmoji]);

      // Hapus emoji setelah animasi selesai
      setTimeout(() => {
        setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, (newEmoji.duration + newEmoji.delay) * 1000);
    }, 800); // Buat emoji baru setiap 0.8 detik - GANTI ANGKA untuk lebih banyak/sedikit

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            initial={{
              y: "100vh",
              opacity: 0,
              rotate: 0,
              x: 0,
            }}
            animate={{
              y: "-100px",
              opacity: [0, 0.7, 0.7, 0], // Fade in, stay, fade out
              rotate: [0, 180, 360], // Rotasi 360 derajat
              x: [0, 30, -30, 0], // Bergerak kiri-kanan (zigzag)
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: emoji.duration,
              delay: emoji.delay,
              ease: "easeInOut",
              x: {
                duration: emoji.duration / 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              position: "absolute",
              left: `${emoji.left}%`,
              fontSize: `${emoji.size}px`,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))", // Bayangan halus
            }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. Ganti emoji di FLOATING_EMOJIS (line 18)
// 2. Ganti interval (line 44) untuk lebih banyak/sedikit emoji
// 3. Ganti size range (line 32) untuk ukuran emoji
// 4. Ganti duration (line 33) untuk kecepatan naik
// 5. Ganti opacity array (line 61) untuk efek fade
// 6. Ganti x array (line 63) untuk pola gerakan kiri-kanan
