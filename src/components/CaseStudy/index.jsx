'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './style.module.scss';
import Placeholder from '../../common/Placeholder';
import Button from '../../common/Button';

// Sem animações de entrada no scroll: o texto e as imagens estão sempre lá quando se chega a eles.
const reveal = {};

const slideUp = {
  initial: { y: '100%' },
  enter: (i) => ({ y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: 0.01 * i } }),
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

function Figure({ caption, color, src }) {
  if (src) {
    return (
      <motion.figure className={styles.figure} {...reveal}>
        <img className={styles.image} src={`${BASE}/${src.replace(/^\//, '')}`} alt={caption} loading="lazy" decoding="async" />
        <figcaption>{caption}</figcaption>
      </motion.figure>
    );
  }
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

      {study.sections.map((section, i) => {
        const [first, ...rest] = section.blocks;
        const lead = first && first.type === 'html' ? first : null;
        const after = lead ? rest : section.blocks;
        return (
          <section key={section.title} className={styles.section}>
            <motion.div className={styles.sectionGrid} {...reveal}>
              <div className={styles.sectionHead}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h2>{section.title}</h2>
              </div>
              {lead && <div className={styles.prose} dangerouslySetInnerHTML={{ __html: lead.html }} />}
            </motion.div>
            {after.map((block, j) =>
              block.type === 'figure' ? (
                <Figure key={j} caption={block.caption} src={block.src} />
              ) : (
                <motion.div key={j} className={`${styles.sectionGrid} ${styles.continued}`} {...reveal}>
                  <div aria-hidden="true" />
                  <div className={styles.prose} dangerouslySetInnerHTML={{ __html: block.html }} />
                </motion.div>
              )
            )}
            {(project.images?.[section.title] || []).map((caption) => (
              <Figure key={caption} caption={caption} color={project.color} />
            ))}
          </section>
        );
      })}

      <section className={styles.next}>
        <p className={styles.sectionLabel}>Próximo projeto</p>
        <Link href={`/projetos/${next.slug}`} className={styles.nextLink}>
          <h2>{next.title}</h2>
          <span>{next.tag}</span>
        </Link>
        <div className={styles.nextFoot}>
          <Button href="/" tone="dark">Voltar ao início</Button>
          <p>© 2026 Rafael Vaz</p>
        </div>
      </section>
    </main>
  );
}
