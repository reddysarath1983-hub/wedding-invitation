"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  musicUrl?: string;
}

export function AudioPlayer({ musicUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicUrl) return;
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    const handleAutoplay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
      window.removeEventListener("click", handleAutoplay);
    };

    window.addEventListener("click", handleAutoplay, { once: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("click", handleAutoplay);
    };
  }, [musicUrl]);

  if (!musicUrl || hasError) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
        setHasError(true);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border ${
          isPlaying
            ? "bg-gradient-to-tr from-[#8b6508] via-[#c59b27] to-[#e5dec9] text-[#2b080c] border-[#c59b27] shadow-[#c59b27]/30 ring-2 ring-[#c59b27]/40 animate-pulse"
            : "bg-[#2b080c]/90 text-[#c59b27] border-[#c59b27]/60 backdrop-blur-md hover:bg-[#4a0e17]"
        }`}
        title={isPlaying ? "Mute Background Music" : "Play Wedding Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
