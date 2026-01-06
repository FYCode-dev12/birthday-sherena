// components/GameCard.tsx
// KOMPONEN KARTU UNTUK GAME MATCHING

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GameCardProps {
  content: string; // Bisa emoji atau URL gambar
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

// Helper function untuk cek apakah string adalah URL
const isImageUrl = (str: string): boolean => {
  return (
    str.startsWith("http://") ||
    str.startsWith("https://") ||
    str.startsWith("/")
  );
};

export default function GameCard({
  content,
  isFlipped,
  isMatched,
  onClick,
}: GameCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: isMatched ? 1 : 1.05 }} // HOVER EFFECT - ganti angka
      whileTap={{ scale: isMatched ? 1 : 0.95 }} // TAP EFFECT - ganti angka
      className="
        aspect-square                 /* RASIO 1:1 (kotak) */
        cursor-pointer
        relative
        transition-all duration-300
      "
      style={{
        transformStyle: "preserve-3d",
        opacity: isMatched ? 0.5 : 1, // Kartu yang sudah match jadi transparan
      }}
    >
      {/* Card Container dengan Flip Animation */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6, // DURASI FLIP - ganti angka untuk lebih cepat/lambat
          type: "spring", // TIPE ANIMASI
          stiffness: 200, // KEKAKUAN SPRING - lebih tinggi = lebih cepat
        }}
        className="
          w-full h-full
          relative
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* CARD FRONT (Belakang - tertutup) */}
        <div
          className="
            absolute inset-0
            bg-linear-to-br from-pink-400 to-pink-600  /* WARNA BELAKANG KARTU */
            rounded-2xl               /* ROUNDED CORNER - ganti angka */
            shadow-lg shadow-pink-300/30
            flex items-center justify-center
            text-5xl                  /* UKURAN EMOJI - ganti angka */
          "
          style={{ backfaceVisibility: "hidden" }}
        >
          💗 {/* EMOJI BELAKANG KARTU - ganti emoji */}
        </div>

        {/* CARD BACK (Depan - terbuka) */}
        <div
          className="
            absolute inset-0
            bg-white                  /* WARNA DEPAN KARTU */
            rounded-2xl
            shadow-lg shadow-pink-300/30
            flex items-center justify-center
            overflow-hidden           /* PENTING untuk gambar */
            p-2                       /* PADDING untuk gambar */
          "
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {isImageUrl(content) ? (
            /* TAMPILKAN GAMBAR */
            <div className="relative w-full h-full">
              <Image
                src={content}
                alt="Card image"
                fill
                className="object-cover rounded-xl" /* object-cover agar gambar penuh */
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          ) : (
            /* TAMPILKAN EMOJI */
            <span className="text-6xl">{content}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA KARTU: Ganti from-pink-400 to-pink-600 (warna belakang)
// 2. UKURAN EMOJI: Ganti text-6xl untuk emoji
// 3. ROUNDED: Ganti rounded-2xl untuk sudut lebih/kurang rounded
// 4. DURASI FLIP: Ganti duration: 0.6
// 5. HOVER SCALE: Ganti scale: 1.05
// 6. EMOJI BELAKANG: Ganti emoji di card front
// 7. GAMBAR: Komponen otomatis deteksi URL dan tampilkan gambar
// 8. OBJECT FIT: Ganti object-cover jadi object-contain untuk gambar utuh tanpa crop
