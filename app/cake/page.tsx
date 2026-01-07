// app/cake/page.tsx
// HALAMAN INTERACTIVE CAKE - NYALAIN & TIUP LILIN

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Candle from "@/components/Candle";
import CustomCursor from "@/components/CustomCursor";
import { CONTENT } from "@/config/content";

export default function CakePage() {
  const router = useRouter();
  const [candles, setCandles] = useState<boolean[]>([]);
  const [allLit, setAllLit] = useState(false);
  const [cursorMode, setCursorMode] = useState<"lighter" | "blower" | null>(
    "lighter"
  );

  // Initialize candles
  useEffect(() => {
    const initialCandles = Array(CONTENT.cake.candleCount).fill(false);
    setCandles(initialCandles);
  }, []);

  // Check if all candles are lit
  useEffect(() => {
    if (candles.length > 0 && candles.every((lit) => lit)) {
      if (!allLit) {
        setAllLit(true);
        // Delay sebelum ganti mode ke blower
        setTimeout(() => {
          setCursorMode("blower");
        }, 1000); // DELAY SEBELUM BISA TIUP - ganti angka
      }
    }
  }, [candles, allLit]);

  // Light candle
  const lightCandle = (index: number) => {
    if (!allLit && !candles[index]) {
      const newCandles = [...candles];
      newCandles[index] = true;
      setCandles(newCandles);
    }
  };

  // Blow candle
  const blowCandle = (index: number) => {
    if (allLit && candles[index]) {
      const newCandles = [...candles];
      newCandles[index] = false;
      setCandles(newCandles);

      // Check if all blown out
      if (newCandles.every((lit) => !lit)) {
        setTimeout(() => {
          createConfetti();
          setTimeout(() => {
            router.push("/gemini");
          }, 2000); // DELAY SEBELUM KE GEMINI - ganti angka
        }, 500);
      }
    }
  };

  // Confetti effect
  const createConfetti = () => {
    const colors = ["#ff69b4", "#ff1493", "#ffc0cb", "#ff6ec7"];

    for (let i = 0; i < 100; i++) {
      // JUMLAH CONFETTI - ganti angka
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.zIndex = "9999";
      confetti.style.pointerEvents = "none";

      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) rotate(${
              Math.random() * 720
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 3000, // DURASI JATUH CONFETTI - ganti angka
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
      );

      animation.onfinish = () => confetti.remove();
    }
  };

  return (
    <div
      className="
      min-h-screen 
      flex flex-col items-center justify-center
      bg-linear-to-br from-pink-300 via-pink-200 to-pink-400  /* WARNA BACKGROUND */
      relative
      overflow-hidden
    "
    >
      {/* Custom Cursor */}
      <CustomCursor
        emoji={cursorMode === "lighter" ? "🔥" : undefined}
        imageUrl={
          cursorMode === "blower"
            ? "https://res.cloudinary.com/dxkpluqoo/image/upload/v1767709478/IMG-20260101-WA0015_2_nmauhj.jpg"
            : undefined
        }
        isActive={cursorMode !== null}
      />

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="
          text-white 
          text-5xl                    /* UKURAN JUDUL - ganti angka */
          font-bold 
          mb-32
          drop-shadow-lg
          text-center
          relative
          z-30
        "
      >
        {CONTENT.cake.title}
      </motion.h1>

      {/* Cake Design dengan Lilin */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          type: "spring",
          bounce: 0.5,
        }}
        className="relative mb-6 flex flex-col items-center"
      >
        {/* Candles - Positioned on top of cake */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="
            flex 
            gap-8
            absolute
            -top-16
            z-20
          "
        >
          {candles.map((isLit, index) => (
            <Candle
              key={index}
              isLit={isLit}
              onHover={() => {
                if (cursorMode === "lighter") {
                  lightCandle(index);
                } else if (cursorMode === "blower") {
                  blowCandle(index);
                }
              }}
            />
          ))}
        </motion.div>

        {/* Plate */}
        <div
          className="
          w-96 h-3
          bg-linear-to-b from-gray-200 to-gray-300
          rounded-full
          shadow-xl
          absolute -bottom-2
          z-0
        "
        />

        <div className="relative z-10">
          {/* Tier 1 (Bawah) */}
          <div
            className="
            w-80 h-20
            bg-linear-to-br from-pink-200 via-pink-300 to-pink-400
            rounded-t-3xl rounded-b-lg
            shadow-2xl
            relative
            border-t-4 border-x-4 border-pink-400
            overflow-hidden
          "
          >
            {/* Frosting decoration top */}
            <div className="absolute -top-3 left-0 right-0 flex justify-around px-2">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-white rounded-b-full shadow-md"
                  style={{ marginLeft: i === 0 ? "-2px" : "0" }}
                />
              ))}
            </div>

            {/* Sprinkles */}
            <div className="absolute inset-0 flex flex-wrap gap-1 p-3 justify-center items-center">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-2.5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: [
                      "#ff1493",
                      "#ffd700",
                      "#00bfff",
                      "#7cfc00",
                      "#ff69b4",
                    ][i % 5],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Side cream texture */}
            <div className="absolute bottom-0 inset-x-0 h-2 bg-pink-500/30" />
          </div>

          {/* Tier 2 (Tengah) */}
          <div
            className="
            w-60 h-16
            bg-linear-to-br from-pink-300 via-pink-400 to-pink-500
            rounded-t-2xl rounded-b-lg
            shadow-xl
            relative
            mx-auto
            -mt-1
            border-t-4 border-x-4 border-pink-500
            overflow-hidden
          "
          >
            {/* Frosting decoration top */}
            <div className="absolute -top-2.5 left-0 right-0 flex justify-around px-2">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-white rounded-b-full shadow-md"
                />
              ))}
            </div>

            {/* Decorative dots */}
            <div className="absolute inset-0 flex items-center justify-around px-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-yellow-300 rounded-full shadow"
                />
              ))}
            </div>

            {/* Side cream texture */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-pink-600/30" />
          </div>

          {/* Tier 3 (Atas) - Tempat Lilin */}
          <div
            className="
            w-44 h-12
            bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600
            rounded-t-2xl rounded-b-lg
            shadow-lg
            relative
            mx-auto
            -mt-1
            border-t-4 border-x-4 border-pink-600
            overflow-hidden
          "
          >
            {/* Frosting decoration top */}
            <div className="absolute -top-2 left-0 right-0 flex justify-around px-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-3.5 bg-white rounded-b-full shadow-md"
                />
              ))}
            </div>

            {/* Ribbon */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-2.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 border-y border-yellow-500 shadow" />

            {/* Ribbon bow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-yellow-400 rotate-45 border border-yellow-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="
          text-white 
          text-xl                     /* UKURAN TEXT - ganti angka */
          font-semibold
          drop-shadow-md
          text-center
          px-4
        "
      >
        {allLit ? CONTENT.cake.instructionBlow : CONTENT.cake.instructionLight}
      </motion.p>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Balloons (Optional) */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 text-6xl"
        >
          🎈
        </motion.div>

        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 text-6xl"
        >
          🎈
        </motion.div>

        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 text-6xl"
        >
          🎈
        </motion.div>
      </div>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. JUMLAH LILIN: Edit config/content.ts → cake.candleCount
// 2. WARNA BACKGROUND: Ganti from-pink-XXX via-pink-XXX to-pink-XXX (line 106)
// 3. JARAK LILIN: Ganti gap-8 (line 147)
// 4. UKURAN KUE: Ganti text-9xl (line 177)
// 5. DELAY TIUP: Ganti setTimeout delay di line 34
// 6. JUMLAH CONFETTI: Ganti angka di line 75
// 7. EMOJI CURSOR: Ganti emoji di line 115
// 8. DECORASI: Tambah/kurangi balon di bagian Decorative Elements
