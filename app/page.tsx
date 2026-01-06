// app/page.tsx
// HALAMAN LOCK SCREEN - HALAMAN PERTAMA

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingHearts from "@/components/FloatingHearts";
import PinPad from "@/components/PinPad";
import { CONTENT } from "@/config/content";

export default function LockScreen() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // Fungsi tambah angka ke PIN
  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError(""); // Clear error saat input baru
    }
  };

  // Fungsi clear PIN
  const handleClear = () => {
    setPin("");
    setError("");
  };

  // Fungsi check PIN
  const handleCheck = () => {
    if (pin === CONTENT.pin) {
      // PIN BENAR - Pindah ke halaman game
      router.push("/game");
    } else {
      // PIN SALAH - Tampilkan error
      setError(CONTENT.lockScreen.errorMessage);
      setPin("");
    }
  };

  // Format display PIN (misal: 07-- atau 0701)
  const displayPin = pin.padEnd(4, "-");

  return (
    <div
      className="
      min-h-screen 
      flex items-center justify-center
      bg-linear-to-br from-pink-300 via-pink-200 to-pink-400  /* WARNA BACKGROUND */
      relative overflow-hidden
      p-4
    "
    >
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Lock Container - Landscape Layout */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.4,
        }}
        className="
          bg-white/95
          backdrop-blur-sm
          p-8
          rounded-[40px]
          shadow-2xl shadow-pink-400/40
          z-10
          max-w-5xl w-full mx-4
          flex flex-col lg:flex-row
          gap-8
          items-center
        "
      >
        {/* Left Side - Photo Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            flex-1 
            flex flex-col 
            items-center 
            justify-center
            space-y-4
          "
        >
          {/* Cute Decoration Stars */}
          <div className="text-6xl animate-bounce">✨</div>

          {/* Photo Placeholder with cute border */}
          <div
            className="
            w-64 h-64
            rounded-[30px]
            bg-linear-to-br from-pink-200 to-pink-300
            border-4 border-white
            shadow-xl shadow-pink-300/50
            flex items-center justify-center
            overflow-hidden
            relative
          "
          >
            {/* Decorative Stickers */}
            <div className="absolute top-2 right-2 text-4xl rotate-12">🎀</div>
            <div className="absolute bottom-2 left-2 text-3xl -rotate-12">
              💕
            </div>

            {/* Photo Content - ganti dengan img jika ada foto */}
            <div className="text-center p-6">
              <Image
                src="https://res.cloudinary.com/dxkpluqoo/image/upload/v1767708038/IMG-20251228-WA0008_2_pemk9v.jpg"
                alt="Sherena"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Cute Message */}
          <div className="text-center">
            <p className="text-pink-500 font-semibold text-lg">
              Happy Birthday!
            </p>
            <p className="text-pink-400 text-sm">Guess the special code 🎉</p>
          </div>
        </motion.div>

        {/* Right Side - PIN Pad Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 flex flex-col items-center space-y-6"
        >
          {/* Title */}
          <div className="text-center">
            <h1
              className="
              text-pink-500
              text-3xl lg:text-4xl
              font-bold 
              mb-2
            "
            >
              {CONTENT.lockScreen.title}
            </h1>

            {/* Subtitle */}
            <p
              className="
              text-pink-600 
              text-sm
            "
            >
              {CONTENT.lockScreen.subtitle}
            </p>
          </div>

          {/* PIN Display with cute styling */}
          <div
            className="
            bg-linear-to-r from-pink-100 to-pink-200
            border-3 border-pink-300
            rounded-3xl
            p-6
            text-center 
            min-w-70
            shadow-lg shadow-pink-200/50
          "
          >
            <div className="text-pink-400 text-xs mb-2 font-semibold">
              ENTER PIN
            </div>
            <div
              className="
              text-5xl
              font-bold 
              text-pink-500 
              tracking-[15px]
            "
            >
              {displayPin}
            </div>
          </div>

          {/* Pin Pad */}
          <PinPad
            onNumberClick={handleNumberClick}
            onClear={handleClear}
            onCheck={handleCheck}
          />

          {/* Error Message with cute emoji */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: error ? 1 : 0 }}
            className="
              text-pink-600 
              text-center 
              text-sm 
              min-h-5
              flex items-center gap-2
            "
          >
            {error && <span>❌</span>}
            {error}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA: Edit semua "pink-XXX" dengan warna lain
//    - pink-300 = terang, pink-600 = gelap
//    - Coba: blue-XXX, purple-XXX, rose-XXX
//
// 2. UKURAN: Ganti angka di p-X, text-Xxl, rounded-Xxl
//
// 3. ANIMASI: Edit di motion.div initial/animate/transition
//    - duration: kecepatan animasi
//    - bounce: efek bouncing
//
// 4. TEKS: Edit di config/content.ts (jangan di sini!)
