// components/PinPad.tsx
// KOMPONEN KEYPAD UNTUK INPUT PIN

"use client";

import { motion } from "framer-motion";
import { Check, Delete } from "lucide-react";

interface PinPadProps {
  onNumberClick: (num: number) => void;
  onClear: () => void;
  onCheck: () => void;
}

export default function PinPad({
  onNumberClick,
  onClear,
  onCheck,
}: PinPadProps) {
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      className="
      grid grid-cols-3 gap-4 
      max-w-62.5 mx-auto
    "
    >
      {/* Tombol 1-9 */}
      {buttons.map((num) => (
        <motion.button
          key={num}
          onClick={() => onNumberClick(num)}
          whileHover={{ scale: 1.1 }} // GANTI angka untuk hover effect lebih besar/kecil
          whileTap={{ scale: 0.95 }} // GANTI angka untuk tap effect
          className="
            w-17.5 h-17.5 rounded-full             
            bg-linear-to-br from-pink-400 to-pink-600
            text-white text-2xl font-bold
            shadow-lg shadow-pink-300/50
            hover:shadow-xl hover:shadow-pink-400/60
            transition-all duration-300
          "
        >
          {num}
        </motion.button>
      ))}

      {/* Tombol Clear (⌫) */}
      <motion.button
        onClick={onClear}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="
          w-17.5 h-17.5
          rounded-full
          bg-linear-to-br from-pink-400 to-pink-600
          text-white text-2xl font-bold
          shadow-lg shadow-pink-300/50
          hover:shadow-xl hover:shadow-pink-400/60
          transition-all duration-300
          flex items-center justify-center
        "
      >
        <Delete size={34} />
      </motion.button>

      {/* Tombol 0 */}
      <motion.button
        onClick={() => onNumberClick(0)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="
          w-17.5 h-17.5
          rounded-full
          bg-linear-to-br from-pink-400 to-pink-600
          text-white text-2xl font-bold
          shadow-lg shadow-pink-300/50
          hover:shadow-xl hover:shadow-pink-400/60
          transition-all duration-300
        "
      >
        0
      </motion.button>

      {/* Tombol Check (✓) */}
      <motion.button
        onClick={onCheck}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="
          w-17.5 h-17.5
          rounded-full
          bg-linear-to-br from-pink-400 to-pink-600
          text-white text-2xl font-bold
          shadow-lg shadow-pink-300/50
          hover:shadow-xl hover:shadow-pink-400/60
          transition-all duration-300
          flex items-center justify-center
        "
      >
        <Check size={32} strokeWidth={3} />
      </motion.button>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. Ukuran tombol: ganti w-17.5 h-17.5 (line 26, 49, 67, 85)
// 2. Warna: ganti from-pink-XXX to-pink-XXX
// 3. Bentuk: ganti rounded-full jadi rounded-lg untuk kotak
// 4. Hover scale: ganti angka di whileHover={{ scale: 1.1 }}
// 5. Shadow: ganti shadow-lg jadi shadow-xl untuk bayangan lebih besar
