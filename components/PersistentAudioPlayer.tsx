"use client";

import { useEffect, useRef, useState } from "react";

export default function PersistentAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("audioMuted") === "true";
    }
    return false;
  });

  useEffect(() => {
    // Inisialisasi audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src =
        "https://res.cloudinary.com/dxkpluqoo/video/upload/v1767722195/The_1975_-_About_You_Official_cpwzsz.mp3";
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      // Tambahkan event listener untuk mendeteksi kapan audio bisa dimainkan
      audioRef.current.addEventListener("canplaythrough", () => {
        console.log("Audio ready to play");
      });

      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });
    }

    const audio = audioRef.current;

    // Load state dari localStorage
    const savedTime = localStorage.getItem("audioTime");
    const savedPlaying = localStorage.getItem("audioPlaying");
    const savedMuted = localStorage.getItem("audioMuted");

    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }

    if (savedMuted === "true") {
      audio.muted = true;
    }

    // Auto play dengan berbagai fallback
    const playAudio = async () => {
      // Jika sebelumnya di-pause manual, jangan auto-play
      if (savedPlaying === "false") {
        console.log("User previously paused, not auto-playing");
        return;
      }

      try {
        // Coba play langsung
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem("audioPlaying", "true");
        console.log("Audio playing successfully");
      } catch (error) {
        console.log("Autoplay blocked by browser:", error);

        // Fallback: Coba dengan mute dulu, lalu unmute
        try {
          audio.muted = true;
          await audio.play();
          setIsPlaying(true);

          // Unmute setelah delay singkat
          setTimeout(() => {
            audio.muted = false;
            setIsMuted(false);
          }, 100);

          localStorage.setItem("audioPlaying", "true");
          console.log("Audio playing with mute workaround");
        } catch (muteError) {
          console.log("Even muted autoplay blocked - user interaction needed");
          setIsPlaying(false);

          // Tambahkan click listener untuk auto-play on first interaction
          const handleFirstInteraction = async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              localStorage.setItem("audioPlaying", "true");
              document.removeEventListener("click", handleFirstInteraction);
              document.removeEventListener(
                "touchstart",
                handleFirstInteraction
              );
              console.log("Audio started after user interaction");
            } catch (e) {
              console.error("Play failed:", e);
            }
          };

          document.addEventListener("click", handleFirstInteraction, {
            once: true,
          });
          document.addEventListener("touchstart", handleFirstInteraction, {
            once: true,
          });
        }
      }
    };

    // Delay sedikit untuk memastikan audio sudah siap
    const playTimeout = setTimeout(() => {
      playAudio();
    }, 100);

    // Save current time setiap 1 detik
    const saveInterval = setInterval(() => {
      if (audio && !audio.paused) {
        localStorage.setItem("audioTime", audio.currentTime.toString());
      }
    }, 1000);

    // Cleanup
    return () => {
      clearTimeout(playTimeout);
      clearInterval(saveInterval);
      if (audio) {
        localStorage.setItem("audioTime", audio.currentTime.toString());
        localStorage.setItem("audioPlaying", audio.paused ? "false" : "true");
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("audioPlaying", "false");
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("audioPlaying", "true");
      } catch (error) {
        console.error("Play error:", error);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    localStorage.setItem("audioMuted", newMuted.toString());
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={togglePlay}
        className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md border-2 transition-all duration-300 ${
          isPlaying
            ? "bg-linear-to-r from-pink-500/30 to-purple-500/30 border-pink-400/50 hover:from-pink-500/40 hover:to-purple-500/40"
            : "bg-white/10 border-white/30 hover:bg-white/20"
        }`}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <div
          className={`p-2 rounded-full ${
            isPlaying ? "bg-pink-500" : "bg-white/20"
          }`}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        <div className="text-left pr-2">
          <div className="text-xs text-white/60 font-medium">
            {isPlaying ? "Now Playing" : "Music Paused"}
          </div>
          <div className="text-sm font-bold text-white">
            {isPlaying ? "About You" : "Click to Play"}
          </div>
        </div>
        {isPlaying && (
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        )}
      </button>

      <button
        onClick={toggleMute}
        className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md border-2 transition-all duration-300 ${
          isMuted
            ? "bg-linear-to-r from-red-500/30 to-orange-500/30 border-red-400/50 hover:from-red-500/40 hover:to-orange-500/40"
            : "bg-linear-to-r from-green-500/30 to-emerald-500/30 border-green-400/50 hover:from-green-500/40 hover:to-emerald-500/40"
        }`}
        title={isMuted ? "Unmute" : "Mute"}
      >
        <div
          className={`p-2 rounded-full ${
            isMuted ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </div>
        <div className="text-left pr-2">
          <div className="text-xs text-white/60 font-medium">Volume</div>
          <div className="text-sm font-bold text-white">
            {isMuted ? "Muted" : "Unmuted"}
          </div>
        </div>
      </button>
    </div>
  );
}
