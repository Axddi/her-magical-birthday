import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pt-24 pb-32 px-4 md:px-8"
    >
      {children}
    </motion.main>
  );
}
