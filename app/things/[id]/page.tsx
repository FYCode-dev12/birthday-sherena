// app/things/[id]/page.tsx
// HALAMAN DETAIL KATEGORI "THINGS YOU LOVE"

"use client";

import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CONTENT } from "@/config/content";

export default function ThingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const folder = CONTENT.things.folders[id];

  if (!folder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400 flex items-center justify-center">
        <div className="text-white text-2xl">Folder tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen 
      bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400
      py-12
      px-6
      overflow-y-auto
    "
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => router.push("/things")}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="
            mb-8
            flex items-center gap-2
            text-white
            font-semibold
            bg-white/20
            hover:bg-white/30
            px-6 py-3
            rounded-full
            backdrop-blur-sm
            transition-all
            shadow-lg
          "
        >
          <span className="text-xl">←</span>
          Kembali
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="
            bg-white
            rounded-3xl
            p-8
            shadow-2xl
            mb-8
            text-center
            border-2 border-pink-100
          "
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="
              inline-flex items-center justify-center
              w-24 h-24
              bg-gradient-to-br from-pink-100 to-pink-200
              rounded-3xl
              text-6xl
              mb-4
              shadow-lg
            "
          >
            {folder.icon}
          </motion.div>

          {/* Title */}
          <h1
            className="
            text-4xl
            font-bold
            bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500
            bg-clip-text
            text-transparent
            mb-2
          "
          >
            {folder.title}
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            bg-white
            rounded-3xl
            p-8
            shadow-2xl
            border-2 border-pink-100
          "
        >
          {/* Jika Surat */}
          {folder.isLetter && folder.letter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="
                whitespace-pre-line
                leading-relaxed
                text-gray-700
                text-base
                bg-gradient-to-br from-pink-50/50 to-transparent
                p-6
                rounded-2xl
                border border-pink-100
              "
            >
              {folder.letter}
            </motion.div>
          )}

          {/* Jika List Items */}
          {!folder.isLetter && folder.items && (
            <>
              <ul className="space-y-4 mb-6">
                {folder.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="
                      flex items-start gap-4
                      bg-gradient-to-r from-pink-50 to-transparent
                      p-5
                      rounded-2xl
                      shadow-sm
                      border border-pink-100
                      hover:shadow-lg
                      hover:border-pink-200
                      hover:scale-[1.02]
                      transition-all
                      group
                    "
                  >
                    <span
                      className="
                      text-pink-400 
                      text-2xl 
                      flex-shrink-0
                      group-hover:scale-125
                      transition-transform
                    "
                    >
                      ✦
                    </span>
                    <span className="text-gray-700 text-base leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* YouTube Embed jika ada youtubeUrl */}
              {folder.youtubeUrl && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="
                    w-full
                    max-w-3xl
                    mx-auto
                    rounded-2xl
                    overflow-hidden
                    shadow-2xl
                    border-4 border-pink-200
                    bg-gradient-to-br from-pink-50 to-white
                    p-4
                  "
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={folder.youtubeUrl}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex justify-between items-center gap-4"
        >
          {/* Previous Folder */}
          {id > 0 && (
            <motion.button
              onClick={() => {
                // Jika previous folder adalah Foto (index 2), ke /photos
                if (id - 1 === 2) {
                  router.push("/photos");
                } else {
                  router.push(`/things/${id - 1}`);
                }
              }}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2
                bg-white
                text-pink-600
                font-semibold
                px-6 py-3
                rounded-full
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              <span>←</span>
              Sebelumnya
            </motion.button>
          )}

          <div className="flex-1" />

          {/* Next Folder */}
          {id < CONTENT.things.folders.length - 1 && (
            <motion.button
              onClick={() => {
                // Jika next folder adalah Foto (index 2), ke /photos
                if (id + 1 === 2) {
                  router.push("/photos");
                } else {
                  router.push(`/things/${id + 1}`);
                }
              }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2
                bg-white
                text-pink-600
                font-semibold
                px-6 py-3
                rounded-full
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              Selanjutnya
              <span>→</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. WARNA: Ganti gradient pink
// 2. UKURAN: Ganti text size untuk title/content
// 3. ANIMASI: Adjust delay dan duration
// 4. SPACING: Ganti padding dan margin
