import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/lib/music-store";
import { SITE_CONFIG } from "@/lib/config";

export function MusicPlayer() {
  const { init, toggle, isPlaying, isReady, hasInteracted } = useMusic();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      {/* First-tap nudge */}
      <AnimatePresence>
        {!hasInteracted && isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-28 right-6 z-40 glass-card rounded-2xl px-4 py-3 max-w-[220px] text-sm font-cursive text-lg"
            style={{ color: "var(--rose-deep)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎶</span>
              <span>Tap to play our song ↓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        className="fixed bottom-6 right-6 z-40 group interactive"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div
          className="relative size-16 rounded-full flex items-center justify-center text-white shadow-2xl"
          style={{
            background: "var(--gradient-rose)",
            boxShadow: "var(--shadow-glow-pink)",
          }}
        >
          {/* spinning ring when playing */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{ borderColor: "var(--gold)" }}
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-2xl relative z-10">
            {isPlaying ? "⏸" : "▶"}
          </span>
        </div>

        {/* Title ticker on hover/playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 glass-card rounded-full px-4 py-2 whitespace-nowrap overflow-hidden"
            >
              <div className="font-cursive text-sm" style={{ color: "var(--rose-deep)" }}>
                ♪ {SITE_CONFIG.songTitle} — {SITE_CONFIG.songArtist}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
