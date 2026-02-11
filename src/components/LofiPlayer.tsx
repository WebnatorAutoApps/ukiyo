"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const LOFI_AUDIO_URL = "/audio/White_snow_chill_days.mp3";

export default function LofiPlayer() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const syncPlayState = useCallback(() => {
    if (audioRef.current) {
      setIsPlaying(!audioRef.current.paused);
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(LOFI_AUDIO_URL);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "none";

    audio.addEventListener("play", syncPlayState);
    audio.addEventListener("pause", syncPlayState);
    audio.addEventListener("ended", syncPlayState);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("play", syncPlayState);
      audio.removeEventListener("pause", syncPlayState);
      audio.removeEventListener("ended", syncPlayState);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncPlayState]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked by browser — state stays synced via event listeners
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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
              <p className="text-xs font-bold text-foreground font-heading">{t.lofiPlayer.title}</p>
              <p className="text-xs text-text-secondary">{t.lofiPlayer.subtitle}</p>
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
              aria-label={isPlaying ? t.lofiPlayer.pause : t.lofiPlayer.play}
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

          {/* Volume slider */}
          <div className="flex items-center gap-2 mt-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5D5068" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
              {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-soft-wood/50 accent-ukiyo-navy"
              aria-label={t.lofiPlayer.volume}
            />
          </div>
        </div>
      )}

      {/* Toggle button - vintage radio style */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-wood-light border-2 border-soft-wood shadow-cozy-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label={isExpanded ? t.lofiPlayer.close : t.lofiPlayer.open}
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
