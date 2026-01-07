"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js and MediaPipe
const KineticParticles = dynamic(
  () => import("@/components/KineticParticles"),
  { ssr: false }
);

export default function GeminiPage() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <KineticParticles />
    </main>
  );
}
