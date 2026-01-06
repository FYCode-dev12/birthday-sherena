// app/photos/page.tsx
// HALAMAN GALERI FOTO KENANGAN

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PHOTO_GALLERY } from "@/config/content";
import FloatingEmojis from "@/components/FloatingEmojis";

export default function PhotosPage() {
  const router = useRouter();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handleBack = () => {
    router.push("/things");
  };

  return (
    <div
      className="
      min-h-screen 
      bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400
      py-12
      px-6
      overflow-y-auto
      relative
    "
    >
      {/* Floating Emojis Background */}
      <FloatingEmojis />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={handleBack}
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

        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="
            text-white 
            text-5xl
            font-bold 
            text-center 
            mb-4
            drop-shadow-lg
          "
        >
          {PHOTO_GALLERY.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            text-white/90
            text-xl
            text-center
            mb-12
            drop-shadow
          "
        >
          {PHOTO_GALLERY.subtitle}
        </motion.p>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            grid 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            mb-12
          "
        >
          {PHOTO_GALLERY.photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.05,
                rotate: Math.random() > 0.5 ? 2 : -2,
                zIndex: 10,
              }}
              className="
                relative
                aspect-square
                cursor-pointer
                rounded-2xl
                overflow-hidden
                shadow-xl
                bg-white
                p-2
              "
              onClick={() => setSelectedPhoto(index)}
            >
              {/* Photo */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="
                  absolute inset-0
                  bg-gradient-to-t from-black/70 via-black/20 to-transparent
                  flex items-end
                  p-4
                  m-2
                  rounded-xl
                "
              >
                <p className="text-white text-sm font-medium">
                  {photo.caption}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="
              fixed inset-0
              bg-black/90
              z-50
              flex items-center justify-center
              p-4
              cursor-pointer
            "
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                max-w-4xl
                w-full
                aspect-square
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-2xl
                cursor-default
              "
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="
                  absolute top-4 right-4
                  z-10
                  bg-white/90
                  hover:bg-white
                  text-pink-600
                  w-10 h-10
                  rounded-full
                  flex items-center justify-center
                  shadow-lg
                  text-2xl
                  font-bold
                  transition-all
                "
              >
                ×
              </button>

              {/* Large Photo */}
              <div className="relative w-full h-full p-4">
                <Image
                  src={PHOTO_GALLERY.photos[selectedPhoto].url}
                  alt={PHOTO_GALLERY.photos[selectedPhoto].caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>

              {/* Caption */}
              <div
                className="
                absolute bottom-0 left-0 right-0
                bg-gradient-to-t from-black/80 to-transparent
                p-6
                text-center
              "
              >
                <p className="text-white text-lg font-medium">
                  {PHOTO_GALLERY.photos[selectedPhoto].caption}
                </p>
              </div>

              {/* Navigation Arrows */}
              {selectedPhoto > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(selectedPhoto - 1);
                  }}
                  className="
                    absolute left-4 top-1/2 -translate-y-1/2
                    bg-white/90 hover:bg-white
                    text-pink-600
                    w-12 h-12
                    rounded-full
                    flex items-center justify-center
                    shadow-lg
                    text-2xl
                    font-bold
                    transition-all
                  "
                >
                  ←
                </button>
              )}

              {selectedPhoto < PHOTO_GALLERY.photos.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(selectedPhoto + 1);
                  }}
                  className="
                    absolute right-4 top-1/2 -translate-y-1/2
                    bg-white/90 hover:bg-white
                    text-pink-600
                    w-12 h-12
                    rounded-full
                    flex items-center justify-center
                    shadow-lg
                    text-2xl
                    font-bold
                    transition-all
                  "
                >
                  →
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// CARA CUSTOMIZE:
// 1. GRID: Ganti grid-cols untuk jumlah kolom
// 2. WARNA: Ganti gradient pink
// 3. SPACING: Ganti gap-4 untuk jarak antar foto
// 4. FOTO: Tambah foto di config/content.ts di PHOTO_GALLERY
// 5. ANIMASI: Adjust delay dan duration
