import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { PageWrap } from "@/components/PageWrap";
import { ParticlesBg } from "@/components/ParticlesBg";
import { SITE_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Love Letter for You 💌" },
      { name: "description", content: "A handwritten love letter, just for you." },
      { property: "og:title", content: "A Love Letter for You" },
      { property: "og:description", content: "A handwritten love letter, just for you." },
    ],
  }),
  component: Letter,
});

const LETTER_TEXT = `My dearest Iram,

Somewhere between all the chaos and calm, between the laughter and the silent fights, we built something that quietly became my whole world.

We’ve seen days that tested us, and nights that held us together — and somehow, through everything, we stayed. Every battle we conquered wasn’t just a moment… it was a step, a milestone, a story only we understand.

And now look at you — 21 on 21.
Not just growing older, but becoming someone so beautiful, so strong, so full of life… a woman in the making, and already someone I admire more than I can ever say.

You didn’t just enter my life — you changed its colours.
From something quiet and dull…
to something alive.
Red, pink, green — every shade of happiness I didn’t even know I was missing.
You turned ordinary days into celebrations, and my world into something that feels like confetti in slow motion.

I love you — in ways words will always fall short of.
To the moon and back, and still not enough.

On your birthday, I don’t just wish you happiness —
I wish you a life filled with success, with luxury, with peace that stays.
I wish for every dream you carry to find its way to you.
And for every step you take forward… I hope I’m right there, beside you, always.

Happy Birthday, my Iru.
You are, and always will be, my favourite part of this life.

I love you.
Forever yours,
Aadi💕`;

function Letter() {
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState("");
  const particles = useMemo(() => <ParticlesBg variant="petals" />, []);
useEffect(() => {
  if (!opened) return;

  let i = 0;
  let rafId: number;

  const type = () => {
    i++;
    setTyped(LETTER_TEXT.slice(0, i));

    if (i < LETTER_TEXT.length) {
      rafId = requestAnimationFrame(type);
    }
  };

  rafId = requestAnimationFrame(type);

  return () => cancelAnimationFrame(rafId);
}, [opened]);

  return (
    <PageWrap>
      <div className="absolute inset-0 -z-10">
        {particles}
      </div>
      <header className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-shimmer text-6xl md:text-8xl"
        >
          A Letter for You
        </motion.h1>
      </header>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, y: -40, scale: 0.8 }}
              className="relative w-[320px] h-[220px] md:w-[420px] md:h-[280px] interactive"
              aria-label="Open letter"
            >
              <div
                className="absolute inset-0 rounded-md shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)",
                  boxShadow: "var(--shadow-glow-pink)",
                }}
              />
              {/* envelope flap */}
              <div
                className="absolute top-0 left-0 w-full h-1/2"
                style={{
                  background: "linear-gradient(135deg, #FF6B9D 0%, #C44B8A 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
              {/* wax seal */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 md:size-20 rounded-full flex items-center justify-center font-script text-3xl text-white shadow-xl"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #FFD700, #C44B8A)",
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.6), inset -4px -4px 8px rgba(0,0,0,0.3)",
                }}
              >
                ♥
              </motion.div>
              <p className="absolute -bottom-10 left-0 right-0 text-center font-cursive text-xl" style={{ color: "var(--rose-deep)" }}>
                click to open 💕
              </p>
            </motion.button>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, scale: 0.85, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              className="paper-texture rounded-md p-8 md:p-14 max-w-2xl w-full relative shadow-2xl"
              style={{
                boxShadow: "var(--shadow-petal)",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 36px, color-mix(in oklab, var(--primary) 15%, transparent) 37px)",
              }}
            >
              <pre
                className="whitespace-pre-wrap font-cursive text-2xl md:text-3xl leading-[2.25rem] md:leading-[2.5rem]"
                style={{ color: "var(--foreground)", fontFamily: "var(--font-cursive)" }}
              >
                {typed}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block"
                >
                  |
                </motion.span>
              </pre>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </PageWrap>
  );
}
