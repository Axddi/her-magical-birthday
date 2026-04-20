import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { useMusic } from "@/lib/music-store";
import { SITE_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/song")({
  head: () => ({
    meta: [
      { title: "Our Song 🎵" },
      { name: "description", content: "The song that's always been ours." },
      { property: "og:title", content: "Our Song" },
      { property: "og:description", content: "The song that's always been ours." },
    ],
  }),
  component: SongPage,
});

function SongPage() {
  const { isPlaying, currentTime, toggle } = useMusic();
  const [bars] = useState(() => Array.from({ length: 32 }, (_, i) => i));

  const activeLyricIdx = useMemo(() => {
    const lyrics = SITE_CONFIG.lyrics;
    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) idx = i;
    }
    return idx;
  }, [currentTime]);

  return (
    <PageWrap>
      {/* Pulsing gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={
          isPlaying
            ? { opacity: [0.6, 1, 0.6] }
            : { opacity: 0.5 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #FF6B9D 0%, transparent 50%), radial-gradient(circle at 70% 80%, #C44B8A 0%, transparent 50%), radial-gradient(circle at 50% 50%, #FFD700 0%, transparent 60%)",
        }}
      />

      <header className="text-center mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-cursive text-2xl"
          style={{ color: "var(--rose-deep)" }}
        >
          Here's a song that reminds me of you
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-shimmer text-6xl md:text-8xl mt-2"
        >
          Pal Pal
        </motion.h1>
        <p className="font-serif-romantic italic mt-1 text-lg">— By Talwinder</p>
      </header>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Vinyl */}
        <div className="flex justify-center">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { rotate: { duration: 6, repeat: Infinity, ease: "linear" } }
                : { duration: 0.5 }
            }
            className="relative size-72 md:size-96 rounded-full interactive"
            style={{
              background:
                "radial-gradient(circle, #1a0a14 25%, #2a0f1f 26%, #1a0a14 35%, #2a0f1f 36%, #1a0a14 45%, #2a0f1f 46%, #1a0a14 60%, #2a0f1f 61%, #1a0a14 100%)",
              boxShadow: "0 0 60px var(--primary), inset 0 0 40px rgba(0,0,0,0.6)",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 md:size-40 rounded-full flex items-center justify-center"
              style={{ background: "var(--gradient-rose)" }}
            >
              <span className="font-script text-white text-2xl md:text-3xl text-center px-4 leading-tight">
                {SITE_CONFIG.girlfriendName} ♥
              </span>
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full"
              style={{ background: "white" }}
            />
          </motion.button>
        </div>

        {/* Lyrics + visualizer */}
        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-6 md:p-8 min-h-[280px] flex flex-col justify-center">
            <div className="space-y-3 text-center">
              {SITE_CONFIG.lyrics.map((line, i) => (
                <motion.p
                  key={i}
                  animate={{
                    opacity: i === activeLyricIdx ? 1 : 0.35,
                    scale: i === activeLyricIdx ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`font-cursive text-2xl md:text-3xl ${
                    i === activeLyricIdx ? "text-shimmer" : ""
                  }`}
                  style={{
                    color: i === activeLyricIdx ? undefined : "var(--rose-deep)",
                  }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Visualizer */}
          <div className="flex items-end justify-center gap-1 h-24">
            {bars.map((b) => (
              <motion.div
                key={b}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${20 + ((b * 13) % 60)}%`,
                          `${30 + ((b * 7) % 70)}%`,
                          `${15 + ((b * 19) % 80)}%`,
                        ],
                      }
                    : { height: "10%" }
                }
                transition={{
                  duration: 0.6 + (b % 5) * 0.1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="w-2 rounded-full"
                style={{
                  background: "var(--gradient-rose)",
                  boxShadow: "0 0 8px var(--primary)",
                }}
              />
            ))}
          </div>

          <p className="font-serif-romantic italic text-center text-lg">
            "{SITE_CONFIG.songMessage}"
          </p>
        </div>
      </div>

      <NoteWhenSilent />
    </PageWrap>
  );
}

function NoteWhenSilent() {
  const { isReady } = useMusic();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(!isReady), 1200);
    return () => clearTimeout(t);
  }, [isReady]);
  if (!show) return null;
  return
}
