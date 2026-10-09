'use client';
import Placeholder from '../../common/Placeholder';
import { RevealLines, FadeUp } from '../../common/Reveal';
import styles from './style.module.scss';

const experience = [
  {
    role: 'UX/UI Designer',
    company: 'Monday',
    period: 'Março de 2024 · Presente',
    text: 'Designer a tempo integral em vários clientes: Federação Portuguesa de Futebol, Perfumes & Companhia e Fujitsu, para o Pingo Doce.',
  },
  {
    role: 'Junior UX/UI Designer, estágio',
    company: 'Monday',
    period: 'Junho de 2023 · Março de 2024',
    text: 'Onde comecei, a construir as bases de design de produto que levaram ao cargo a tempo integral.',
  },
];

const skills = ['Design de Produto', 'UI Design', 'Design Systems', 'Design Tokens', 'Prototipagem', 'Colaboração Multidisciplinar'];

export default function About() {
  return (
    <section id="sobre" className={styles.about}>
      <div className={styles.head}>
        <span className="label">Sobre</span>
        <RevealLines
          className={`display ${styles.statement}`}
          lines={['Prefiro sistemas', 'que evoluem a', 'projetos fechados.']}
        />
      </div>

      <div className={styles.grid}>
        <FadeUp className={styles.photo}>
          <Placeholder label="A tua foto" color="#e4e4df" />
        </FadeUp>

        <div className={styles.body}>
          <FadeUp>
            <p className={styles.lede}>
              Sou UX/UI Designer na Monday, em Lisboa, com três anos de experiência em produtos digitais
              de desporto, e-commerce e retalho. Especializei-me na construção e evolução de Design Systems:
              componentes, Design Tokens e guidelines.
            </p>
            <p className={styles.text}>
              Interessa-me sobretudo continuar a acompanhar um produto depois do lançamento. Gosto mais de
              manter e fazer crescer um sistema do que de um projeto com início, meio e fim.
            </p>
          </FadeUp>

          <div className={styles.block}>
            <span className="label">Experiência</span>
            <ul className={styles.timeline}>
              {experience.map((e) => (
                <FadeUp as="li" key={e.role}>
                  <div className={styles.row}>
                    <strong>{e.role}</strong>
                    <span>{e.company}</span>
                  </div>
                  <p className={styles.period}>{e.period}</p>
                  <p className={styles.text}>{e.text}</p>
                </FadeUp>
              ))}
            </ul>
          </div>

          <FadeUp className={styles.block}>
            <span className="label">Competências</span>
            <ul className={styles.skills}>
              {skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
