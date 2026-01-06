// app/game/page.tsx
// HALAMAN GAME MATCHING CARDS

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameCard from "@/components/GameCard";
import FloatingEmojis from "@/components/FloatingEmojis";
import { CONTENT, GAME_EMOJIS } from "@/config/content";

interface Card {
  id: number;
  content: string; // Bisa emoji atau URL gambar
  isFlipped: boolean;
  isMatched: boolean;
}

export default function GamePage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [canFlip, setCanFlip] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Inisialisasi kartu saat pertama load
  useEffect(() => {
    initializeGame();
  }, []);

  // Shuffle array
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Inisialisasi game
  const initializeGame = () => {
    // Buat pasangan kartu (setiap content ada 2)
    const cardPairs = [...GAME_EMOJIS, ...GAME_EMOJIS];
    const shuffled = shuffle(cardPairs);

    const initialCards: Card[] = shuffled.map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(initialCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setCanFlip(true);
  };

  // Handle klik kartu
  const handleCardClick = (id: number) => {
    // Cek apakah boleh flip
    if (!canFlip || flippedCards.length >= 2) return;

    // Cek apakah kartu sudah diflip atau sudah matched
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip kartu
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Jika sudah 2 kartu diflip, cek match
    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      checkMatch(newFlippedCards);
    }
  };

  // Cek apakah 2 kartu match
  const checkMatch = (flippedIds: number[]) => {
    const [firstId, secondId] = flippedIds;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (firstCard && secondCard && firstCard.content === secondCard.content) {
      // MATCH! 🎉
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          )
        );
        setFlippedCards([]);
        setCanFlip(true);

        const newMatchedPairs = matchedPairs + 1;
        setMatchedPairs(newMatchedPairs);

        // Cek apakah semua sudah match
        if (newMatchedPairs === GAME_EMOJIS.length) {
          setTimeout(() => {
            setShowSuccessModal(true);
          }, 500);
        }
      }, 800); // DELAY untuk lihat kartu sebelum matched - ganti angka
    } else {
      // TIDAK MATCH ❌
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          )
        );
        setFlippedCards([]);
        setCanFlip(true);
      }, 1000); // DELAY sebelum flip balik - ganti angka
    }
  };

  return (
    <div
      className="
      min-h-screen 
      flex flex-col items-center justify-center
      bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400  /* WARNA BACKGROUND */
      p-6
      relative                  /* PENTING untuk floating emojis */
    "
    >
      {/* Floating Emojis Background */}
      <FloatingEmojis />

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          text-white 
          text-4xl                    /* UKURAN JUDUL - ganti angka */
          font-bold 
          mb-8
          text-center
          drop-shadow-lg
        "
      >
        {CONTENT.game.title}
      </motion.h1>

      {/* Cards Grid */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="
          grid 
          grid-cols-4               /* JUMLAH KOLOM - ganti angka (misal: 5 untuk 5 kolom) */
          gap-4                     /* JARAK ANTAR KARTU - ganti angka */
          max-w-2xl                 /* MAX WIDTH - ganti: max-w-xl, max-w-3xl, dst */
          w-full
          relative                  /* Z-index lebih tinggi dari floating emojis */
          z-10
        "
      >
        {cards.map((card) => (
          <GameCard
            key={card.id}
            content={card.content}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </motion.div>

      {/* Progress Indicator (Optional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="
          mt-8 
          text-white 
          text-lg
          font-semibold
          drop-shadow
        "
      >
        Matched: {matchedPairs} / {GAME_EMOJIS.length}
      </motion.div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            fixed inset-0 
            bg-black/50                /* OVERLAY GELAP */
            flex items-center justify-center
            z-50
            p-4
          "
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              bg-white
              rounded-3xl               /* ROUNDED CORNER */
              p-8
              max-w-md
              w-full
              shadow-2xl
              text-center
            "
          >
            {/* Emoji Celebration */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>

            {/* Success Message */}
            <h2
              className="
              text-2xl 
              font-bold 
              text-pink-600           /* WARNA JUDUL */
              mb-4
            "
            >
              Selamat!
            </h2>

            <p
              className="
              text-gray-700           /* WARNA TEKS */
              mb-6
              text-lg
            "
            >
              {CONTENT.game.successMessage}
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/things")}
              className="
                bg-gradient-to-r from-pink-400 to-pink-600  /* WARNA BUTTON */
                text-white
                px-8
                py-3
                rounded-full           /* ROUNDED BUTTON */
                font-semibold
                text-lg
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              Lanjut 💖
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA BACKGROUND: Ganti from-pink-XXX via-pink-XXX to-pink-XXX (line 139)
// 2. JUMLAH KOLOM: Ganti grid-cols-4 (line 162)
//    - grid-cols-3 untuk 3 kolom
//    - grid-cols-5 untuk 5 kolom
// 3. JARAK KARTU: Ganti gap-4 (line 163)
// 4. UKURAN GRID: Ganti max-w-2xl (line 164)
// 5. DELAY MATCH: Ganti 800 di line 110
// 6. DELAY FLIP BALIK: Ganti 1000 di line 122
// 7. EMOJI GAME: Edit di config/content.ts bagian GAME_EMOJIS
