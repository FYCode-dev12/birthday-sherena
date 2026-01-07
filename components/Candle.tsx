// components/Candle.tsx
// KOMPONEN LILIN DENGAN API DAN ANIMASI NYALA

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CandleProps {
  isLit: boolean;
  onHover: () => void;
}

export default function Candle({ isLit, onHover }: CandleProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative inline-block" onMouseEnter={onHover}>
      {/* Flame (Api) */}
      {isLit && isMounted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.15, 1, 1.1, 1], // ANIMASI BERKEDIP - ganti array
            opacity: 1,
            y: [0, -2, 0, -1, 0], // ANIMASI NAIK TURUN
          }}
          transition={{
            duration: 0.6, // DURASI BERKEDIP - ganti angka
            repeat: Infinity, // REPEAT TERUS
            repeatType: "loop",
          }}
          className="
            absolute 
            -top-10                          /* POSISI API DI ATAS LILIN - ganti angka */
            left-1/2 
            -translate-x-1/2
            z-10
          "
        >
          {/* Api dengan Gradient yang lebih jelas */}
          <div className="relative w-6 h-10">
            {" "}
            {/* UKURAN API LEBIH BESAR */}
            {/* Bagian Putih (Inti) */}
            <div
              className="
              absolute 
              top-4
              left-1/2
              -translate-x-1/2
              w-2 h-3
              bg-white
              rounded-full
              blur-[1px]
            "
            />
            {/* Bagian Kuning (Dalam) */}
            <div
              className="
              absolute 
              inset-0
              bg-linear-to-t from-yellow-400 via-yellow-300 to-yellow-200
              rounded-full
              blur-[1px]
            "
            />
            {/* Bagian Orange (Tengah) */}
            <div
              className="
              absolute 
              inset-0
              bg-linear-to-t from-orange-500 via-orange-400 to-transparent
              rounded-full
              scale-125
              blur-[2px]
              opacity-80
            "
            />
            {/* Bagian Merah (Luar) */}
            <div
              className="
              absolute 
              inset-0
              bg-linear-to-t from-red-500 via-orange-500 to-transparent
              rounded-full
              scale-150
              blur-[3px]
              opacity-60
            "
            />
            {/* Cahaya Api (Glow Effect) - Lebih Terang */}
            <div
              className="
              absolute 
              -inset-3
              bg-yellow-400
              rounded-full
              blur-xl
              opacity-60
            "
            />
            {/* Extra Glow */}
            <div
              className="
              absolute 
              -inset-4
              bg-orange-400
              rounded-full
              blur-2xl
              opacity-40
            "
            />
          </div>
        </motion.div>
      )}

      {/* Sumbu Lilin */}
      <div
        className="
        absolute 
        -top-2                               /* POSISI SUMBU - ganti angka */
        left-1/2 
        -translate-x-1/2
        w-0.5                              /* LEBAR SUMBU - ganti angka */
        h-3                                  /* TINGGI SUMBU - ganti angka */
        bg-linear-to-b from-gray-800 to-gray-600
        rounded-full
      "
      />

      {/* Batang Lilin */}
      <div
        className="
        relative
        w-6                                  /* LEBAR LILIN - ganti angka */
        h-16                                 /* TINGGI LILIN - ganti angka */
        bg-linear-to-b from-pink-400 via-pink-500 to-pink-600  /* WARNA LILIN */
        rounded-t-lg                         /* ROUNDED ATAS */
        shadow-lg shadow-pink-300/50
      "
      >
        {/* Efek Lilin Meleleh (Optional) */}
        <div
          className="
          absolute 
          top-0 
          inset-x-0
          h-1
          bg-white/20
          rounded-t-lg
        "
        />
      </div>

      {/* Dasar Lilin */}
      <div
        className="
        w-7                                  /* LEBAR DASAR - sedikit lebih lebar dari batang */
        h-1
        bg-pink-700
        mx-auto
        rounded-b
      "
      />
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. UKURAN LILIN: Ganti w-6 h-16 (line 99)
// 2. WARNA LILIN: Ganti from-pink-XXX via-pink-XXX to-pink-XXX (line 100)
// 3. UKURAN API: Ganti w-4 h-6 (line 43)
// 4. POSISI API: Ganti -top-8 (line 36)
// 5. KECEPATAN BERKEDIP: Ganti duration: 0.5 (line 28)
// 6. ANIMASI BERKEDIP: Ganti array [1, 1.1, 1, 1.2, 1] (line 24)
