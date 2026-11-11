'use client';
import { FadeUp } from '../../common/Reveal';
import styles from './style.module.scss';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Sobre: só a foto e um parágrafo, com espaço à volta.
export default function About() {
  return (
    <section id="sobre" className={styles.about}>
      <FadeUp className={styles.photo}>
        <img src={`${BASE}/images/sobre/rafael.webp`} alt="Rafael Vaz, de óculos escuros, em frente a uma parede de azulejos verdes" width="920" height="1150" loading="lazy" decoding="async" />
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
