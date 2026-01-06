// app/things/page.tsx
// HALAMAN "THINGS YOU LOVE" - FOLDER INTERAKTIF

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Folder from "@/components/Folder";
import { CONTENT } from "@/config/content";

export default function ThingsPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/cake");
  };

  return (
    <div
      className="
      min-h-screen 
      bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400  /* WARNA BACKGROUND */
      py-12                           /* PADDING ATAS BAWAH - ganti angka */
      px-6                            /* PADDING KIRI KANAN - ganti angka */
      overflow-y-auto
    "
    >
      <div
        className="
        max-w-6xl                     /* MAX WIDTH CONTAINER - ganti: max-w-5xl, max-w-7xl */
        mx-auto
      "
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
          }}
          className="
            text-white 
            text-5xl                  /* UKURAN JUDUL - ganti angka */
            font-bold 
            text-center 
            mb-12                     /* MARGIN BAWAH - ganti angka */
            drop-shadow-lg
          "
        >
          {CONTENT.things.title}
        </motion.h1>

        {/* Folders Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            grid 
            grid-cols-1               /* 1 KOLOM DI MOBILE */
            md:grid-cols-2            /* 2 KOLOM DI TABLET - ganti angka */
            lg:grid-cols-3            /* 3 KOLOM DI DESKTOP - ganti angka */
            gap-6                     /* JARAK ANTAR FOLDER - ganti angka */
            mb-12
          "
        >
          {CONTENT.things.folders.map((folder, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1 /* DELAY MUNCUL BERURUTAN - ganti angka */,
                duration: 0.5,
              }}
            >
              <Folder
                icon={folder.icon}
                title={folder.title}
                items={folder.items}
                isLetter={folder.isLetter}
                letter={folder.letter}
                onClick={() => {
                  // Jika folder Foto (index 2), navigasi ke /photos
                  if (index === 2) {
                    router.push("/photos");
                  } else {
                    router.push(`/things/${index}`);
                  }
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            onClick={handleContinue}
            whileHover={{
              scale: 1.05 /* HOVER SCALE - ganti angka */,
              boxShadow: "0 20px 40px rgba(255, 105, 180, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              bg-gradient-to-r from-pink-500 to-pink-600  /* WARNA TOMBOL */
              text-white 
              font-bold 
              text-lg                 /* UKURAN TEXT - ganti angka */
              px-12                   /* PADDING KIRI KANAN - ganti angka */
              py-4                    /* PADDING ATAS BAWAH - ganti angka */
              rounded-full            /* ROUNDED - ganti: rounded-2xl untuk kotak */
              shadow-xl shadow-pink-400/50
              hover:shadow-2xl hover:shadow-pink-500/60
              transition-all duration-300
            "
          >
            Lanjut ke Kejutan Berikutnya 🎂
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA BACKGROUND: Ganti from-pink-XXX via-pink-XXX to-pink-XXX (line 19)
// 2. JUMLAH KOLOM:
//    - Mobile: grid-cols-1 (line 63)
//    - Tablet: md:grid-cols-2 (line 64)
//    - Desktop: lg:grid-cols-3 (line 65)
// 3. JARAK FOLDER: Ganti gap-6 (line 66)
// 4. DELAY MUNCUL: Ganti index * 0.1 (line 75)
// 5. UKURAN JUDUL: Ganti text-5xl (line 42)
// 6. WARNA TOMBOL: Ganti from-pink-XXX to-pink-XXX (line 110)
// 7. UKURAN TOMBOL: Ganti px-12 py-4 (line 114-115)
// 8. BENTUK TOMBOL: Ganti rounded-full jadi rounded-2xl untuk kotak
