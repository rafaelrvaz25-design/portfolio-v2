'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealLines } from '../../common/Reveal';
import styles from './style.module.scss';
import LogoMaterial3D from '../LogoMaterial3D';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Ao sair do ecrã, o título sobe um pouco mais devagar e desvanece.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className={styles.hero}>
      {/* o novo Rv. em prata; em computadores lentos passa a imagem estática */}
      <LogoMaterial3D variant="prata" className={styles.logo3d} />
      <motion.div style={{ y, opacity }} className={styles.titleWrap}>
        <div className={styles.heading}>
          <RevealLines
            as="h1"
            onLoad
            delay={0.15}
            className={`display ${styles.title}`}
            lines={['UX/UI Designer']}
          />
          {/* proposta de valor: abrangente, sem depender de uma especialização */}
          <motion.p
            className={styles.statement}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            Desenho experiências digitais claras, consistentes e preparadas para evoluir.
          </motion.p>
        </div>
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
          para desporto, retalho, recrutamento e marcas.
        </p>
        <p className={styles.scroll}>(Scroll)</p>
      </motion.div>
    </section>
  );
}
