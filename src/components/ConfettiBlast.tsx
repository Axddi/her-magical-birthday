import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function ConfettiBlast({
  trigger = true,
  duration = 4500,
  pieces = 350,
}: {
  trigger?: boolean;
  duration?: number;
  pieces?: number;
}) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(trigger);

  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setActive(trigger);
    if (trigger) {
      const t = setTimeout(() => setActive(false), duration);
      return () => clearTimeout(t);
    }
  }, [trigger, duration]);

  if (!active || !size.w) return null;

  return (
    <ReactConfetti
      width={size.w}
      height={size.h}
      numberOfPieces={pieces}
      recycle={false}
      gravity={0.18}
      colors={["#FF6B9D", "#FFB3C6", "#C44B8A", "#FFD700", "#FFF0F5"]}
      drawShape={(ctx) => {
        // hearts!
        ctx.beginPath();
        const s = 6;
        ctx.moveTo(0, s);
        ctx.bezierCurveTo(-s * 1.2, -s * 0.4, -s * 1.6, s * 0.8, 0, s * 2);
        ctx.bezierCurveTo(s * 1.6, s * 0.8, s * 1.2, -s * 0.4, 0, s);
        ctx.closePath();
        ctx.fill();
      }}
      style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none" }}
    />
  );
}
