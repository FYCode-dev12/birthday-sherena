// app/finale/page.tsx
// HALAMAN FINALE - INTERACTIVE PARTICLE EXPERIENCE

"use client";

import { useEffect } from "react";

export default function FinalePage() {
  useEffect(() => {
    // Redirect to the HTML file
    window.location.href = "/index-gemini.html";
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading finale experience...</div>
    </div>
  );
}
