'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './style.module.scss';

const EASE = [0.76, 0, 0.24, 1];
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Área de trabalho em destaque no hero. A primeira área é a de repouso: depois de
// carregar, passa uma vez pelas outras e volta a ela, onde fica (assim nada se mexe mais
// do que uns segundos, WCAG 2.2.2). O fundo verde acompanha a largura de cada palavra.
// Pausa fora do ecrã, com a página escondida e com o rato em cima; com "reduzir
// movimento" fica fixa na primeira área.
export default function RotatingArea({ areas, interval = 2400, startDelay = 3000 }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [widths, setWidths] = useState([]);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const box = useRef(null);
  const sizers = useRef([]);

  // mede a largura de cada área (depois de a Mattone carregar e sempre que o ecrã muda)
  useIsoLayoutEffect(() => {
    const measure = () => setWidths(sizers.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [areas]);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === 'visible' && el.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const [done, setDone] = useState(false); // já deu a volta e voltou à primeira área
  const running = !reduce && !paused && visible && !done && areas.length > 1;
  const first = useRef(true);
  useEffect(() => {
    if (!running) return undefined;
    const wait = first.current ? startDelay : interval;
    first.current = false;
    const t = setTimeout(() => {
      const next = (i + 1) % areas.length;
      setI(next);
      if (next === 0) setDone(true);
    }, wait);
    return () => clearTimeout(t);
  }, [running, i, areas.length, interval, startDelay]);

  const w = widths[i];

  return (
    <span
      className={styles.areaLine}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* a largura vai por CSS (com transição): aplica-se logo no primeiro desenho,
          mesmo enquanto o título ainda está a entrar */}
      <span ref={box} className={styles.area} style={w ? { width: w } : undefined}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={areas[i]}
            className={w ? styles.areaWord : styles.areaWordStatic}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-105%' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {areas[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* medidas: invisíveis, com o mesmo tipo de letra e espaçamento */}
      <span className={styles.areaSizers} aria-hidden="true">
        {areas.map((a, k) => (
          <span key={a} ref={(el) => { sizers.current[k] = el; }} className={styles.areaSizer}>{a}</span>
        ))}
      </span>
    </span>
  );
}
