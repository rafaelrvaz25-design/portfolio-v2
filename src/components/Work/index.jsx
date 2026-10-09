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

  // Paragens: quando o scroll pára dentro do palco, encaixa num projeto.
  // - gesto curto: volta ao projeto onde estava
  // - gesto médio: avança/recua só um projeto
  // - gesto rápido: pára no primeiro projeto por que passou (nunca salta um projeto)
  // Antes do primeiro e depois do último, o scroll fica livre para entrar e sair da secção.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let idle = true;
    let y0 = 0;
    let timer;
    let snapping = false;
    const eps = 4;

    const stops = () => {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      return projects.map((_, i) => top + i * window.innerHeight);
    };

    const settle = () => {
      idle = true;
      if (!section.current || section.current.offsetParent === null) return; // escondido (telemóvel)
      const y = window.scrollY;
      const S = stops();
      const first = S[0];
      const last = S[S.length - 1];
      const dir = Math.sign(y - y0);
      let target = null;

      // passou por cima de uma paragem? pára nela
      if (dir > 0) {
        const crossed = S.filter((s) => s > y0 + eps && s < y - eps);
        if (crossed.length) target = crossed[0];
      } else if (dir < 0) {
        const crossed = S.filter((s) => s < y0 - eps && s > y + eps);
        if (crossed.length) target = crossed[crossed.length - 1];
      }

      // ficou entre dois projetos: decide pelo tamanho do gesto
      if (target === null && y > first + eps && y < last - eps) {
        const from = S.reduce((a, b) => (Math.abs(b - y0) < Math.abs(a - y0) ? b : a));
        const idx = S.indexOf(from);
        const moved = Math.abs(y - y0) > window.innerHeight * 0.12;
        const next = Math.min(S.length - 1, Math.max(0, idx + (moved ? dir : 0)));
        target = S[next];
      }

      if (target !== null && Math.abs(target - y) > eps) snapTo(target, 0.9);
    };

    const snapTo = (target, duration) => {
      snapping = true;
      clearTimeout(timer);
      const done = () => { snapping = false; idle = true; };
      scrollToY(target, { duration, lock: true, onComplete: done });
      setTimeout(done, duration * 1000 + 400); // segurança, caso o onComplete não chegue
    };

    // o scroll suave acaba devagar (meio píxel de cada vez): esses restos não contam como movimento
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastY);
      lastY = y;
      if (snapping) return;
      if (window.__navigating) { clearTimeout(timer); idle = true; return; }
      if (idle) { y0 = y; idle = false; }

      // travão: se o gesto passa por cima de um projeto, pára nele logo ali
      if (section.current && section.current.offsetParent !== null) {
        const S = stops();
        const crossed = y > y0
          ? S.filter((s) => s > y0 + eps && s < y - eps)
          : S.filter((s) => s < y0 - eps && s > y + eps);
        if (crossed.length) {
          snapTo(y > y0 ? crossed[0] : crossed[crossed.length - 1], 0.6);
          return;
        }
      }

      if (delta < 2) return;
      clearTimeout(timer);
      timer = setTimeout(settle, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, []);

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
