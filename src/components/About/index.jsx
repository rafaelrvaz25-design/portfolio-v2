'use client';
import { FadeUp } from '../../common/Reveal';
import styles from './style.module.scss';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Sobre: a foto e dois parágrafos curtos, que acrescentam ao hero em vez de o repetir.
export default function About() {
  return (
    <section id="sobre" className={styles.about}>
      <FadeUp className={styles.photo}>
        <img src={`${BASE}/images/sobre/rafael.webp`} alt="Rafael Vaz, de óculos escuros, em frente a uma parede de azulejos verdes" width="920" height="1150" loading="lazy" decoding="async" />
      </FadeUp>

      <div className={styles.text}>
        <h2 className="label">Sobre</h2>
        <FadeUp as="p" className={styles.lede}>
          Sou UX/UI Designer na Monday, em Lisboa. Já trabalhei em contextos muito diferentes,
          de um Design System para a Federação Portuguesa de Futebol a um self-checkout de
          supermercado, e começo sempre por perceber o que já funciona, o que falha e porquê.
        </FadeUp>
        <FadeUp as="p" className={styles.body}>
          Já resolvi problemas sozinho, como único designer ao lado de dois developers e com duas
          semanas de prazo, e em equipa, a apresentar e defender decisões junto do cliente. Gosto
          de decisões que se conseguem justificar e de acompanhar o que acontece depois da entrega:
          no Design System da FPF, continuei a manter e a evoluir a biblioteca durante mais um ano.
        </FadeUp>
      </div>
    </section>
  );
}
