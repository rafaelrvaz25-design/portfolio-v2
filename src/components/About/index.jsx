'use client';
import Placeholder from '../../common/Placeholder';
import { FadeUp } from '../../common/Reveal';
import styles from './style.module.scss';

// Sobre: só a foto e um parágrafo, com espaço à volta.
export default function About() {
  return (
    <section id="sobre" className={styles.about}>
      <FadeUp className={styles.photo}>
        <Placeholder label="A tua foto" color="#e2e2e2" />
      </FadeUp>

      <div className={styles.text}>
        <span className="label">Sobre</span>
        <FadeUp as="p" className={styles.lede}>
          Sou UX/UI Designer na Monday, em Lisboa. Há três anos que desenho produtos digitais
          para desporto, e-commerce e retalho, e especializei-me em Design Systems: gosto de
          acompanhar um produto depois do lançamento e de o ver crescer.
        </FadeUp>
      </div>
    </section>
  );
}
