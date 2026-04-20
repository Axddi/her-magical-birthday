import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesBg({ variant = "hearts" }: { variant?: "hearts" | "petals" | "stars" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  const shape =
    variant === "petals"
      ? { type: "circle" as const }
      : variant === "stars"
        ? { type: "star" as const, options: { star: { sides: 5 } } }
        : { type: "char" as const, options: { char: { value: ["♥", "♡"], font: "serif", weight: "400" } } };

  const colors =
    variant === "petals"
      ? ["#FFB3C6", "#FF6B9D", "#C44B8A"]
      : variant === "stars"
        ? ["#FFD700", "#FFB3C6", "#FF6B9D"]
        : ["#FF6B9D", "#FFB3C6", "#C44B8A"];

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: variant === "petals" ? 35 : 50, density: { enable: true } },
      color: { value: colors },
      shape,
      opacity: { value: { min: 0.3, max: 0.8 } },
      size: { value: { min: variant === "petals" ? 6 : 8, max: variant === "petals" ? 14 : 20 } },
      move: {
        enable: true,
        direction: variant === "petals" ? "bottom" : "top",
        speed: { min: 0.4, max: 1.6 },
        outModes: { default: "out" },
        straight: false,
      },
      rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 8 } },
      tilt: { enable: true, value: { min: 0, max: 360 }, animation: { enable: true, speed: 6 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id={`tsparticles-${variant}`}
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}
