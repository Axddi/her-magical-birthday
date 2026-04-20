import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { ParticlesBg } from "@/components/ParticlesBg";
import { ConfettiBlast } from "@/components/ConfettiBlast";
import { SITE_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/wishes")({
  head: () => ({
    meta: [
      { title: "Make a Wish 🎂" },
      { name: "description", content: "Blow out the candles and make a birthday wish." },
      { property: "og:title", content: "Make a Wish" },
      { property: "og:description", content: "Blow out the candles and make a birthday wish." },
    ],
  }),
  component: Wishes,
});

const CANDLE_COUNT = 5;

function Wishes() {
  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(true));
  const allOut = lit.every((l) => !l);

  const blow = (i: number) =>
    setLit((prev) => prev.map((v, idx) => (idx === i ? false : v)));

  const reset = () => setLit(Array(CANDLE_COUNT).fill(true));

  return (
    <PageWrap>
      <div className="absolute inset-0 -z-10">
        <ParticlesBg variant="stars" />
      </div>
      <ConfettiBlast trigger={allOut} duration={6000} pieces={500} />

      <header className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-shimmer text-6xl md:text-8xl"
        >
          Make a Wish
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-cursive text-2xl mt-2"
          style={{ color: "var(--rose-deep)" }}
        >
          tap each candle to blow it out ✨
        </motion.p>
      </header>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <Cake lit={lit} onBlow={blow} />

        <AnimatePresence>
          {allOut && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="glass-card rounded-3xl px-8 py-6 mt-12 text-center"
            >
              <p className="font-script text-shimmer text-4xl md:text-5xl">
                Your wish is coming true ✨
              </p>
              <p className="font-serif-romantic italic mt-2 text-lg">
                I'll spend forever making sure of it.
              </p>
              <button
                onClick={reset}
                className="mt-4 px-5 py-2 rounded-full text-white font-cursive text-lg interactive"
                style={{ background: "var(--gradient-rose)" }}
              >
                Light them again 🕯️
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <Countdown target={SITE_CONFIG.nextBirthday} />
      </div>
    </PageWrap>
  );
}

function Cake({ lit, onBlow }: { lit: boolean[]; onBlow: (i: number) => void }) {
  return (
    <div className="relative w-full max-w-md aspect-[5/4] flex items-end justify-center">
      {/* Candles */}
      <div className="absolute bottom-[58%] left-0 right-0 flex justify-center gap-6 z-10">
        {lit.map((isLit, i) => (
          <button
            key={i}
            onClick={() => onBlow(i)}
            className="relative w-3 h-16 interactive"
            aria-label={`Candle ${i + 1}`}
          >
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: "repeating-linear-gradient(180deg, #FF6B9D 0 6px, #FFB3C6 6px 12px)",
              }}
            />
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -2, 0] }}
                  exit={{ scale: 0, opacity: 0, y: -20 }}
                  transition={{
                    scale: { type: "spring", stiffness: 200 },
                    y: { repeat: Infinity, duration: 0.8 },
                  }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-7 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at 50% 70%, #FFD700 0%, #FF6B9D 60%, transparent 100%)",
                    filter: "drop-shadow(0 0 12px #FFD700) drop-shadow(0 0 24px #FF6B9D)",
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* Cake tiers */}
      <div className="relative w-full">
        <div
          className="mx-auto w-3/4 h-16 rounded-t-2xl"
          style={{
            background: "linear-gradient(180deg, #FFB3C6, #FF6B9D)",
            boxShadow: "inset 0 -8px 0 #C44B8A, 0 10px 30px -10px var(--rose-deep)",
          }}
        />
        <div
          className="mx-auto w-full h-24 rounded-2xl mt-1"
          style={{
            background: "linear-gradient(180deg, #FF6B9D, #C44B8A)",
            boxShadow: "inset 0 -10px 0 #4A1235, 0 20px 40px -10px var(--rose-deep)",
          }}
        />
        {/* drips */}
        <svg className="absolute top-[3.7rem] left-0 w-full" height="22" viewBox="0 0 100 22" preserveAspectRatio="none">
          <path d="M0 0 Q 5 16 10 0 T 20 0 T 30 0 T 40 0 T 50 0 T 60 0 T 70 0 T 80 0 T 90 0 T 100 0 V 22 H 0 Z" fill="#FFD700" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

function Countdown({ target }: { target: string }) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetTime - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <div className="mt-16 w-full max-w-2xl glass-card rounded-3xl p-6 text-center">
      <p className="font-cursive text-2xl" style={{ color: "var(--rose-deep)" }}>
        until your next birthday 🎀
      </p>
      <div className="mt-4 flex justify-center gap-3 md:gap-6">
        {[
          { v: d, l: "days" },
          { v: h, l: "hrs" },
          { v: m, l: "min" },
          { v: s, l: "sec" },
        ].map((u) => (
          <div key={u.l} className="flex flex-col items-center min-w-[64px]">
            <div
              className="font-script text-4xl md:text-5xl text-shimmer"
              style={{ minWidth: "2ch" }}
            >
              {String(u.v).padStart(2, "0")}
            </div>
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--secondary)" }}>
              {u.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
