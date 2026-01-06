// components/Folder.tsx
// KOMPONEN FOLDER INTERAKTIF UNTUK "THINGS YOU LOVE"

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FolderProps {
  icon: string;
  title: string;
  items?: string[];
  isLetter?: boolean;
  letter?: string;
  onClick?: () => void; // Fungsi untuk navigasi ke halaman detail
  expandable?: boolean; // Apakah bisa dibuka di tempat atau navigasi
}

export default function Folder({
  icon,
  title,
  items,
  isLetter,
  letter,
  onClick,
  expandable = false,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(); // Navigasi ke halaman detail
    } else if (expandable) {
      setIsOpen(!isOpen); // Toggle expand di tempat
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -10, // HOVER NAIK - ganti angka
        scale: 1.03, // HOVER SCALE - ganti angka
        boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="
        relative
        bg-linear-to-br from-white via-pink-50 to-white  /* GRADIENT BACKGROUND */
        rounded-3xl                   /* ROUNDED CORNER - ganti angka */
        p-6                           /* PADDING - ganti angka */
        cursor-pointer
        shadow-lg shadow-pink-200/40  /* SHADOW - ganti warna */
        hover:shadow-2xl
        transition-all duration-300
        border-2 border-pink-100      /* BORDER */
        overflow-hidden
      "
      onClick={handleClick}
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-pink-200/30 to-transparent rounded-bl-3xl" />

      {/* Icon & Title */}
      <div className="text-center relative z-10">
        {/* Icon with background */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="
            inline-flex items-center justify-center
            w-20 h-20                   /* UKURAN CONTAINER ICON */
            bg-linear-to-br from-pink-100 to-pink-200
            rounded-2xl
            text-5xl                    /* UKURAN ICON - ganti angka */
            mb-4
            shadow-md
          "
        >
          {icon}
        </motion.div>

        {/* Title with gradient */}
        <h3
          className="
          bg-linear-to-r from-pink-500 via-pink-600 to-pink-500  /* GRADIENT TEXT */
          bg-clip-text
          text-transparent
          text-xl                     /* UKURAN TITLE - ganti angka */
          font-bold 
          mb-2
          tracking-wide
        "
        >
          {title}
        </h3>

        {/* Subtitle hint */}
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs text-pink-400 font-medium"
          >
            Klik untuk membuka 💝
          </motion.p>
        )}
      </div>

      {/* Content (Expandable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4, // DURASI BUKA/TUTUP - ganti angka
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div
              className="
              mt-4 
              pt-4 
              border-t-2 border-pink-200  /* BORDER ATAS - ganti warna */
              text-gray-700
              text-left
              relative
            "
            >
              {/* Jika Surat */}
              {isLetter && letter && (
                <div
                  className="
                  whitespace-pre-line     /* BIAR ENTER JALAN */
                  leading-relaxed         /* LINE HEIGHT */
                  text-sm
                  bg-linear-to-br from-pink-50/50 to-transparent
                  p-4
                  rounded-xl
                  border border-pink-100
                "
                >
                  {letter}
                </div>
              )}

              {/* Jika List Items */}
              {!isLetter && items && (
                <ul className="space-y-3">
                  {" "}
                  {/* JARAK ANTAR ITEM - ganti angka */}
                  {items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.08, // DELAY MUNCUL - ganti angka
                        duration: 0.3,
                        type: "spring",
                      }}
                      className="
                        flex items-start gap-2
                        text-sm              /* UKURAN TEXT - ganti angka */
                        leading-relaxed
                        bg-white
                        p-3
                        rounded-lg
                        shadow-sm
                        border border-pink-100
                        hover:shadow-md
                        hover:border-pink-200
                        transition-all
                      "
                    >
                      <span className="text-pink-400 text-lg shrink-0">
                        ✦
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicator (Panah) dengan animasi */}
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
          y: isOpen ? 5 : 0,
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="
          text-center 
          text-pink-400 
          text-xl
          mt-4
          font-bold
        "
      >
        {isOpen ? "⬆" : "⬇"} {/* ICON PANAH - bisa ganti dengan emoji lain */}
      </motion.div>
    </motion.div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA: Ganti semua pink-XXX dengan warna lain
// 2. UKURAN ICON: Ganti text-6xl (line 48)
// 3. ROUNDED: Ganti rounded-3xl (line 31)
// 4. PADDING: Ganti p-8 (line 32)
// 5. HOVER NAIK: Ganti y: -10 (line 26)
// 6. DURASI ANIMASI: Ganti duration di berbagai tempat
// 7. DELAY MUNCUL ITEM: Ganti index * 0.1 (line 112)
