import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { ParticlesBg } from "@/components/ParticlesBg";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Our Beautiful Memories 📷" },
      { name: "description", content: "A gallery of every magical moment we've shared." },
      { property: "og:title", content: "Our Beautiful Memories" },
      { property: "og:description", content: "A gallery of every magical moment we've shared." },
    ],
  }),
  component: Memories,
});

// TODO: Replace each `src` with a real photo of you two!
const photos = [
  { id: 1, src: "https://picsum.photos/seed/love1/600/800", caption: "The day everything changed" },
  { id: 2, src: "https://picsum.photos/seed/love2/600/600", caption: "Your laugh, my favorite sound" },
  { id: 3, src: "https://picsum.photos/seed/love3/600/900", caption: "Sunsets are better with you" },
  { id: 4, src: "https://picsum.photos/seed/love4/600/700", caption: "Coffee dates forever" },
  { id: 5, src: "https://picsum.photos/seed/love5/600/800", caption: "Adventures with my muse" },
  { id: 6, src: "https://picsum.photos/seed/love6/600/650", caption: "That one rainy afternoon" },
  { id: 7, src: "https://picsum.photos/seed/love7/600/850", caption: "Dancing in the kitchen" },
  { id: 8, src: "https://picsum.photos/seed/love8/600/750", caption: "Stars couldn't compare" },
  { id: 9, src: "https://picsum.photos/seed/love9/600/700", caption: "My favorite human" },
];

function Memories() {
  return (
    <PageWrap>
      <div className="absolute inset-0 -z-10 opacity-60">
        <ParticlesBg variant="hearts" />
      </div>

      <header className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-shimmer text-6xl md:text-8xl"
        >
          Our Beautiful Memories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-serif-romantic italic text-xl mt-3"
          style={{ color: "var(--rose-deep)" }}
        >
          every frame, a little forever
        </motion.p>
      </header>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {photos.map((p, i) => (
          <PolaroidCard key={p.id} photo={p} index={i} />
        ))}
      </div>
    </PageWrap>
  );
}

function PolaroidCard({
  photo,
  index,
}: {
  photo: { id: number; src: string; caption: string };
  index: number;
}) {
  const [liked, setLiked] = useState(false);
  const [caption, setCaption] = useState(photo.caption);
  const rotation = (((photo.id * 53) % 7) - 3) * 0.8; // pseudo-random -2.4..2.4 deg

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        delay: index * 0.08,
      }}
      whileHover={{ scale: 1.04, rotate: 0, y: -6, zIndex: 5 }}
      className="mb-6 break-inside-avoid bg-white p-3 pb-4 rounded-md shadow-lg interactive relative"
      style={{ boxShadow: "var(--shadow-petal)" }}
    >
      <div className="overflow-hidden rounded-sm relative group">
        {/* TODO: Replace src with a real photo of you two */}
        <motion.img
          src={photo.src}
          alt={caption}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: "inset 0 0 30px var(--primary)" }}
        />
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-2 right-2 size-10 rounded-full glass-card flex items-center justify-center interactive"
          aria-label="Like photo"
        >
          <motion.span
            key={liked ? "on" : "off"}
            initial={{ scale: 0.5 }}
            animate={{ scale: liked ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.4 }}
            className="text-xl"
          >
            {liked ? "❤️" : "🤍"}
          </motion.span>
        </button>
      </div>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="block w-full mt-3 px-2 py-1 text-center font-cursive text-xl bg-transparent outline-none focus:bg-pink-50 rounded interactive"
        style={{ color: "var(--rose-deep)" }}
      />
    </motion.div>
  );
}
