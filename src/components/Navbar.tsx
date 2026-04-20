import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", icon: "✨" },
  { to: "/memories", label: "Memories", icon: "📷" },
  { to: "/letter", label: "Letter", icon: "💌" },
  { to: "/wishes", label: "Wishes", icon: "🎂" },
  { to: "/song", label: "Our Song", icon: "🎵" },
] as const;

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop pill nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-2 py-2 gap-1"
      >
        {links.map((l) => {
          const active = location.pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-5 py-2 rounded-full text-sm font-medium font-cursive text-lg transition-colors interactive"
              style={{ color: active ? "white" : "var(--rose-deep)" }}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-rose)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {l.icon} {l.label}
              </span>
            </Link>
          );
        })}
      </motion.nav>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className="glass-card size-12 rounded-full flex items-center justify-center interactive"
          aria-label="Menu"
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-20 right-4 z-50 glass-card rounded-3xl p-4 flex flex-col gap-2 min-w-[200px]"
          >
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-2xl font-cursive text-xl interactive"
                  style={{
                    background: active ? "var(--gradient-rose)" : "transparent",
                    color: active ? "white" : "var(--rose-deep)",
                  }}
                >
                  {l.icon} {l.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
