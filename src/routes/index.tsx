import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ParticlesBg } from "@/components/ParticlesBg";
import { ConfettiBlast } from "@/components/ConfettiBlast";
import { PageWrap } from "@/components/PageWrap";
import { SITE_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday 💕 — A Magical Surprise" },
      { name: "description", content: "A love-filled birthday wonderland built with stars, hearts, and our song." },
      { property: "og:title", content: "Happy Birthday 💕" },
      { property: "og:description", content: "A magical birthday surprise made with love." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setConfetti(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageWrap>
      <ConfettiBlast trigger={confetti} pieces={400} duration={6000} />
      <div className="absolute inset-0 -z-10">
        <ParticlesBg variant="hearts" />
      </div>

      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-cursive text-2xl md:text-3xl"
          style={{ color: "var(--rose-deep)" }}
        >
          Today the whole universe celebrates
        </motion.p>

        <motion.h1
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
          className="font-script text-shimmer animate-pulse-glow text-7xl md:text-9xl lg:text-[10rem] leading-none mt-4"
        >
          {SITE_CONFIG.girlfriendName}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="font-cursive text-3xl md:text-5xl mt-2"
          style={{ color: "var(--primary)" }}
        >
          ✨ Happy Birthday, my love ✨
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="glass-card rounded-3xl p-8 md:p-10 mt-12 max-w-xl"
        >
          <p className="font-serif-romantic italic text-lg md:text-xl leading-relaxed">
            From the moment you stepped into my world, every ordinary day became
            a fairytale. Today is yours — and so is every tomorrow. I built this
            little corner of the internet to remind you how endlessly,
            ridiculously, magically loved you are. 💕
          </p>
          <p className="mt-4 font-cursive text-2xl" style={{ color: "var(--secondary)" }}>
            — Forever yours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
          }}
          className="absolute bottom-4 flex flex-col items-center font-cursive text-lg"
          style={{ color: "var(--rose-deep)" }}
        >
          scroll for more magic
          <span className="text-3xl mt-1">↓</span>
        </motion.div>
      </section>

      <section className="mt-20 max-w-4xl mx-auto grid md:grid-cols-3 gap-6 relative z-10">
        {[
          { icon: "📷", title: "Memories", text: "Every smile, frozen in time", to: "/memories" },
          { icon: "💌", title: "A Letter", text: "Words from my heart to yours", to: "/letter" },
          { icon: "🎂", title: "Make a Wish", text: "Blow out the candles, my love", to: "/wishes" },
        ].map((c, i) => (
          <motion.a
            key={c.title}
            href={c.to}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="glass-card rounded-3xl p-8 text-center interactive"
          >
            <div className="text-5xl mb-3">{c.icon}</div>
            <h3 className="font-script text-3xl" style={{ color: "var(--primary)" }}>
              {c.title}
            </h3>
            <p className="font-serif-romantic mt-2 italic">{c.text}</p>
          </motion.a>
        ))}
      </section>
    </PageWrap>
  );
}
