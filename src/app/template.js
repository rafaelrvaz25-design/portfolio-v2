'use client';
import { motion } from 'framer-motion';

// Transição de entrada em todas as páginas: uma cortina que sobe e o conteúdo que aparece.
export default function Template({ children }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'var(--dark)',
          transformOrigin: 'top', pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
