import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      const interactive =
        el.closest("a, button, [role='button'], input, textarea, .interactive");
      setIsPointer(!!interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        animate={{ x: pos.x - 12, y: pos.y - 12, scale: isPointer ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.4 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"
            fill="var(--primary)"
            stroke="white"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
          />
        </svg>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block size-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: isPointer ? 1.4 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </>
  );
}
