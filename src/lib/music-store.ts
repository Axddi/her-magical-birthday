import { Howl } from "howler";
import { create } from "zustand";
import { SITE_CONFIG } from "./config";

type MusicState = {
  howl: Howl | null;
  isPlaying: boolean;
  isReady: boolean;
  hasInteracted: boolean;
  currentTime: number;
  duration: number;
  init: () => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  setTime: (t: number) => void;
};

let rafId: number | null = null;

export const useMusic = create<MusicState>((set, get) => ({
  howl: null,
  isPlaying: false,
  isReady: false,
  hasInteracted: false,
  currentTime: 0,
  duration: 0,

  init: () => {
    if (get().howl) return;
    const howl = new Howl({
      src: [SITE_CONFIG.songSrc],
      loop: true,
      volume: 0.55,
      html5: true,
      onload: () => set({ isReady: true, duration: howl.duration() }),
      onplay: () => {
        set({ isPlaying: true });
        const tick = () => {
          set({ currentTime: howl.seek() as number });
          rafId = requestAnimationFrame(tick);
        };
        tick();
      },
      onpause: () => {
        set({ isPlaying: false });
        if (rafId) cancelAnimationFrame(rafId);
      },
      onend: () => {
        set({ isPlaying: false });
        if (rafId) cancelAnimationFrame(rafId);
      },
      onloaderror: () => set({ isReady: false }),
    });
    set({ howl });
  },

  toggle: () => {
    const { howl, isPlaying } = get();
    if (!howl) return;
    set({ hasInteracted: true });
    if (isPlaying) howl.pause();
    else howl.play();
  },

  play: () => {
    const { howl } = get();
    if (!howl) return;
    set({ hasInteracted: true });
    howl.play();
  },

  pause: () => {
    get().howl?.pause();
  },

  setTime: (t) => {
    get().howl?.seek(t);
    set({ currentTime: t });
  },
}));
