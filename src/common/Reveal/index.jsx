'use client';
import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { y: '105%' },
  show: (i) => ({ y: '0%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: i } }),
};

// Linhas que sobem de dentro de uma máscara. O título inteiro dispara de uma vez
// (ao entrar no ecrã, ou logo ao carregar com `onLoad`) e as linhas seguem em cascata.
export function RevealLines({ lines, as = 'h2', className, style, delay = 0, onLoad = false }) {
  const Tag = motion[as];
  const trigger = onLoad
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } };
  return (
    <Tag className={className} style={style} aria-label={lines.join(' ')} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
          <motion.span style={{ display: 'block' }} variants={lineVariants} custom={delay + i * 0.08}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Bloco que aparece com uma subida curta e fade.
export function FadeUp({ children, className, style, delay = 0, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </M>
  );
}
