'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealLines } from '../../common/Reveal';
import styles from './style.module.scss';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Ao sair do ecrã, o título sobe um pouco mais devagar e desvanece.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className={styles.hero}>
      <motion.div style={{ y, opacity }} className={styles.titleWrap}>
        <RevealLines
          as="h1"
          onLoad
          delay={0.15}
          className={`display ${styles.title}`}
          lines={['UX/UI Designer', 'focado em', 'Design Systems']}
        />
      </motion.div>

      <motion.div
        className={styles.bottom}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <p>
          Três anos a desenhar produtos digitais
          <br />
          para desporto, e-commerce e retalho.
        </p>
        <p className={styles.scroll}>(Scroll)</p>
      </motion.div>
    </section>
  );
}
