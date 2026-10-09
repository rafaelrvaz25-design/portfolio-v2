'use client';
import Link from 'next/link';
import styles from './style.module.scss';
import Placeholder from '../../common/Placeholder';
import { RevealLines, FadeUp } from '../../common/Reveal';

function Figure({ caption, color }) {
  return (
    <FadeUp as="figure" className={styles.figure}>
      <div className={styles.frame} style={{ backgroundColor: color }}>
        <Placeholder label="Imagem por enviar" color="transparent" />
      </div>
      <figcaption>{caption}</figcaption>
    </FadeUp>
  );
}

// Parte o título do projeto em linhas curtas para o título gigante.
function titleLines(title) {
  const words = title.split(' ');
  if (words.length <= 2) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

export default function CaseStudy({ project, study, number, next }) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <Link href="/#projetos" className={styles.back}>← Todos os projetos</Link>
          <span className="label">{number} · {project.tag}</span>
        </div>

        <RevealLines as="h1" onLoad delay={0.2} className={`display ${styles.title}`} lines={titleLines(project.title)} />

        <FadeUp delay={0.5} className={styles.heroBottom}>
          <p className={styles.headline}>{study.headline}</p>
          <dl className={styles.facts}>
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </section>

      <FadeUp className={styles.cover}>
        <div className={styles.coverFrame} style={{ backgroundColor: project.color }}>
          <Placeholder label={`Capa · ${project.title}`} color="transparent" />
        </div>
      </FadeUp>

      {study.impact && (
        <section className={styles.impact}>
          <span className="label">Impacto</span>
          <FadeUp as="p" className={styles.impactText}>{study.impact}</FadeUp>
        </section>
      )}

      {study.sections.map((section, i) => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionHead}>
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
              <RevealLines className={`display ${styles.sectionTitle}`} lines={[section.title]} />
            </div>
            <FadeUp className={styles.prose}>
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </FadeUp>
          </div>
          {(project.images[section.title] || []).map((caption) => (
            <Figure key={caption} caption={caption} color={project.color} />
          ))}
        </section>
      ))}

      <section className={styles.next}>
        <span className="label">Próximo projeto</span>
        <Link href={`/projetos/${next.slug}`} className={styles.nextLink}>
          <span className={`display ${styles.nextTitle}`}>{next.title}</span>
          <span className={styles.nextMeta}>{next.tag} <span aria-hidden="true">→</span></span>
        </Link>
        <div className={styles.nextFoot}>
          <Link href="/" className={styles.homeLink}>Voltar ao início</Link>
          <span>© 2026 Rafael Vaz</span>
        </div>
      </section>
    </main>
  );
}
