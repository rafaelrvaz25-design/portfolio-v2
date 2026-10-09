'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, animate,
} from 'framer-motion';
import { projects } from '../../data/projects';
import Placeholder from '../../common/Placeholder';
import { FadeUp } from '../../common/Reveal';
import { scrollToY } from '../SmoothScroll';
import styles from './style.module.scss';

const n = projects.length;
const pad = (i) => String(i + 1).padStart(2, '0');
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- Um cartão do palco (desktop) ---------- */
function Card({ project, index, pos, mode, tilt, vh, hover }) {
  // hover: índice do projeto em destaque na vista geral (-1 = nenhum)
  const y = useTransform([pos, mode], ([p, m]) => (index - p) * vh * lerp(0.82, 0.36, m) - vh * lerp(0.08, 0, m));
  const scale = useTransform([mode, hover], ([m, h]) => lerp(1, 0.66, m) * (h === index ? 1.04 : 1));
  const rotateX = useTransform([mode, tilt], ([m, t]) => lerp(0, 24, m) + t);
  const opacity = useTransform([pos, mode, hover], ([p, m, h]) => {
    if (h >= 0) return h === index ? 1 : 0.35;
    return Math.max(0, 1 - Math.abs(index - p) * lerp(0.55, 0.35, m));
  });

  return (
    <div className={styles.cardSlot}>
      <motion.div style={{ y, scale, rotateX, opacity }} className={styles.card}>
        <Link href={`/projetos/${project.slug}`} className={styles.cardLink} tabIndex={-1} aria-hidden="true">
          <div className={styles.frame} style={{ backgroundColor: project.color }}>
            <Placeholder label={`Capa · ${project.title}`} color="transparent" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

/* ---------- Palco fixo com scroll entre projetos (desktop) ---------- */
function Stage() {
  const section = useRef(null);
  const [vh, setVh] = useState(900);
  const [active, setActive] = useState(0);
  const [overview, setOverview] = useState(false);
  const hover = useMotionValue(-1);
  const setHovered = (i) => hover.set(i === null ? -1 : i);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress, scrollY } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // A secção tem n + 0,5 ecrãs: cada projeto ocupa um ecrã de scroll e o último fica meio ecrã parado.
  const hold = n > 1 ? (n - 1) / (n - 0.5) : 1;
  const pos = useSpring(useTransform(scrollYProgress, [0, hold], [0, n - 1], { clamp: true }), { stiffness: 120, damping: 24, mass: 0.6 });

  // Inclinação ligeira que acompanha a velocidade do scroll.
  const velocity = useVelocity(scrollY);
  const tilt = useSpring(useTransform(velocity, [-2500, 0, 2500], [-9, 0, 9], { clamp: true }), { stiffness: 140, damping: 30 });

  // 0 = um projeto de cada vez, 1 = vista geral (hover nos pontos).
  const mode = useMotionValue(0);
  useEffect(() => {
    const c = animate(mode, overview ? 1 : 0, { duration: 0.9, ease: [0.76, 0, 0.24, 1] });
    return c.stop;
  }, [overview, mode]);

  useEffect(() => pos.on('change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v))))), [pos]);

  const goTo = (i) => {
    const el = section.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + i * window.innerHeight);
  };

  const project = projects[active];

  return (
    <div ref={section} className={styles.track} style={{ height: `${(n + 0.5) * 100}vh` }}>
      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <span className="label">Projetos selecionados</span>
          <span className="label">({pad(n - 1)})</span>
        </div>

        <div className={styles.cards}>
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} pos={pos} mode={mode} tilt={tilt} vh={vh} hover={hover} />
          ))}
        </div>

        {/* Título do projeto ativo */}
        <div className={styles.info}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: overview ? 0 : 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <p className={styles.counter}>{pad(active)} / {pad(n - 1)}</p>
              <Link href={`/projetos/${project.slug}`} className={styles.titleLink}>
                <h3 className={`display ${styles.title}`}>{project.title}</h3>
                <span className={styles.meta}>
                  {[project.tag, project.client, project.year].filter(Boolean).join(' · ')}
                  <span className={styles.cta}>Ver case study →</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pontos laterais: hover abre a vista geral */}
        <nav
          className={`${styles.rail} ${overview ? styles.railOpen : ''}`}
          aria-label="Projetos"
          onMouseEnter={() => setOverview(true)}
          onMouseLeave={() => { setOverview(false); setHovered(null); }}
          onFocus={() => setOverview(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setOverview(false); setHovered(null); } }}
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={`${styles.railItem} ${i === active ? styles.railActive : ''}`}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onClick={() => { setOverview(false); goTo(i); }}
              aria-current={i === active ? 'true' : undefined}
            >
              <span className={styles.railLabel}>{p.title}</span>
              <span className={styles.railDot} />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ---------- Lista simples (telemóvel e tablet) ---------- */
function List() {
  return (
    <div className={styles.list}>
      <div className={styles.listHead}>
        <span className="label">Projetos selecionados</span>
        <span className="label">({pad(n - 1)})</span>
      </div>
      {projects.map((p, i) => (
        <FadeUp key={p.slug}>
          <Link href={`/projetos/${p.slug}`} className={styles.listItem}>
            <div className={styles.frame} style={{ backgroundColor: p.color }}>
              <Placeholder label={`Capa · ${p.title}`} color="transparent" />
            </div>
            <p className={styles.counter}>{pad(i)} / {pad(n - 1)}</p>
            <h3 className={`display ${styles.title}`}>{p.title}</h3>
            <span className={styles.meta}>{[p.tag, p.client].filter(Boolean).join(' · ')}</span>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
}

export default function Work() {
  return (
    <section id="projetos" className={styles.work}>
      <div className={styles.desktop}><Stage /></div>
      <div className={styles.mobile}><List /></div>
    </section>
  );
}
