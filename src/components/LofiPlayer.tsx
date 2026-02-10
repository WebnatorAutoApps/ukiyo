"use client";

import { useState, useRef, useEffect } from "react";

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free lo-fi placeholder
    // Using a silent source since we can't bundle audio files
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Expanded player */}
      {isExpanded && (
        <div className="mb-3 rounded-2xl bg-wood-light border border-soft-wood/50 shadow-cozy-lg p-4 w-64">
          <div className="flex items-center gap-3 mb-3">
            {/* Vinyl disc */}
            <div className={`w-10 h-10 rounded-full bg-ukiyo-navy flex items-center justify-center ${isPlaying ? "vinyl-spin" : "vinyl-spin vinyl-spin-paused"}`}>
              <div className="w-3 h-3 rounded-full bg-soft-wood" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground font-heading">Ukiyo Lo-Fi Radio</p>
              <p className="text-xs text-text-secondary">Cozy beats para relajarte</p>
            </div>
          </div>

          {/* Fake equalizer bars */}
          <div className="flex items-end gap-1 h-6 mb-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isPlaying ? "bg-sakura-pink" : "bg-soft-wood/50"
                }`}
                style={{
                  height: isPlaying
                    ? `${Math.max(4, Math.sin(i * 0.8) * 16 + 12)}px`
                    : "4px",
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-ukiyo-navy text-white flex items-center justify-center hover:bg-primary-hover transition-colors"
              aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" rx="1" />
                  <rect x="9" y="2" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <polygon points="3,1 14,8 3,15" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Toggle button - vintage radio style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-wood-light border-2 border-soft-wood shadow-cozy-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label={isExpanded ? "Cerrar reproductor" : "Abrir reproductor lo-fi"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* Radio icon */}
          <rect x="3" y="8" width="18" height="13" rx="3" stroke="#5D5068" strokeWidth="1.5" />
          {/* Antenna */}
          <line x1="8" y1="8" x2="16" y2="2" stroke="#5D5068" strokeWidth="1.5" strokeLinecap="round" />
          {/* Speaker circle */}
          <circle cx="15" cy="15" r="3.5" stroke="#5D5068" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="1" fill="#5D5068" />
          {/* Dial lines */}
          <line x1="5" y1="12" x2="10" y2="12" stroke="#5D5068" strokeWidth="1" strokeLinecap="round" />
          <line x1="5" y1="14" x2="10" y2="14" stroke="#5D5068" strokeWidth="1" strokeLinecap="round" />
          <line x1="5" y1="16" x2="10" y2="16" stroke="#5D5068" strokeWidth="1" strokeLinecap="round" />
          {/* Music notes when playing */}
          {isPlaying && (
            <>
              <circle cx="20" cy="5" r="1.5" fill="#FFD1DC" className="animate-float" />
              <circle cx="22" cy="3" r="1" fill="#FFD1DC" className="animate-float" style={{ animationDelay: "0.5s" }} />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
