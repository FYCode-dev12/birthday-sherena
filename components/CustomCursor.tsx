// components/CustomCursor.tsx
// CUSTOM CURSOR UNTUK NYALAIN DAN TIUP LILIN

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  emoji?: string; // 🔥 untuk nyalain, 😗 untuk tiup (optional jika pakai image)
  imageUrl?: string; // URL gambar untuk cursor
  isActive: boolean;
}

export default function CustomCursor({
  emoji,
  imageUrl,
  isActive,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        animate={{
          x: position.x - 20, // OFFSET X - ganti angka untuk posisi
          y: position.y - 20, // OFFSET Y - ganti angka untuk posisi
        }}
        transition={{
          type: "spring",
          damping: 30, // DAMPING - lebih tinggi = lebih smooth
          stiffness: 300, // STIFFNESS - lebih tinggi = lebih cepat
        }}
        className="
          fixed 
          top-0 
          left-0
          pointer-events-none 
          z-[9999]
        "
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="cursor"
            className="w-16 h-16 object-contain" /* UKURAN GAMBAR CURSOR - ganti w-16 h-16 */
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          />
        ) : (
          <span className="text-4xl">
            {emoji}
          </span> /* UKURAN EMOJI - ganti text-4xl */
        )}
      </motion.div>
    </>
  );
}

// CARA CUSTOMIZE:
// 1. UKURAN CURSOR: Ganti text-4xl (line 61)
// 2. KECEPATAN FOLLOW: Ganti damping dan stiffness (line 53-54)
// 3. POSISI OFFSET: Ganti x: position.x - 20 (line 48-49)
