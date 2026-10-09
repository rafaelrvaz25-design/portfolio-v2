'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './style.module.scss';
import Placeholder from '../../common/Placeholder';
import Rounded from '../../common/RoundedButton';

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
};

const slideUp = {
  initial: { y: '100%' },
  enter: (i) => ({ y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.02 * i } }),
};

function Figure({ caption, color }) {
  return (
    <motion.figure className={styles.figure} {...reveal}>
      <div className={styles.frame} style={{ backgroundColor: color }}>
        <Placeholder label="Imagem por enviar" color="transparent" />
      </div>
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

export default function CaseStudy({ project, study, number, next }) {
  useEffect(() => {
    let scroll;
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scroll = new LocomotiveScroll();
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    })();
    return () => scroll && scroll.destroy();
  }, []);

  const words = study.headline.split(' ');

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/#projetos" className={styles.back}>← Todos os projetos</Link>
          <p className={styles.kicker}>{number} · {project.tag}</p>
          <h1>
            {words.map((word, i) => (
              <span key={i} className={styles.mask}>
                <motion.span variants={slideUp} custom={i} initial="initial" animate="enter">{word}</motion.span>
              </span>
            ))}
          </h1>
          <dl className={styles.facts}>
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className={f.pending ? styles.pending : undefined}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className={styles.cover}>
        <div className={styles.coverFrame} style={{ backgroundColor: project.color }}>
          <Placeholder label={`Capa · ${project.title}`} color="transparent" />
        </div>
      </div>

      {study.impact && (
        <motion.section className={styles.impact} {...reveal}>
          <p className={styles.sectionLabel}>Impacto</p>
          <p className={styles.impactText}>{study.impact}</p>
        </motion.section>
      )}

      {study.sections.map((section, i) => (
        <section key={section.title} className={styles.section}>
          <motion.div className={styles.sectionGrid} {...reveal}>
            <div className={styles.sectionHead}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2>{section.title}</h2>
            </div>
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: section.html }} />
          </motion.div>
          {(project.images[section.title] || []).map((caption) => (
            <Figure key={caption} caption={caption} color={project.color} />
          ))}
        </section>
      ))}

      <section className={styles.next}>
        <p className={styles.sectionLabel}>Próximo projeto</p>
        <Link href={`/projetos/${next.slug}`} className={styles.nextLink}>
          <h2>{next.title}</h2>
          <span>{next.tag}</span>
        </Link>
        <div className={styles.nextFoot}>
          <Link href="/">
            <Rounded backgroundColor="#334BD3">
              <p>Voltar ao início</p>
            </Rounded>
          </Link>
          <p>© 2026 Rafael Vaz</p>
        </div>
      </section>
    </main>
  );
}
