'use client';
import { useState } from 'react';
import Link from 'next/link';
import Hero from '../Hero';
import Work from '../Work';
import About from '../About';
import Contact from '../Contact';
import LogoMaterial3D from '../LogoMaterial3D';
import styles from './style.module.scss';

const NAMES = { cromado: 'Cromado itálico', prata: 'Prata', vidro: 'Vidro' };

// Homepage de teste: igual à versão 1, mas com o novo Rv. no material escolhido,
// e uma barra para trocar de material e ver a versão estática (a que aparece em computadores lentos).
export default function LogoTest({ variant }) {
  const [forceStatic, setForceStatic] = useState(false);
  const [status, setStatus] = useState(null);

  const statusText = !status
    ? 'A medir o desempenho…'
    : status.mode === '3d'
      ? `3D em tempo real${status.fps ? ` · ${status.fps} fps` : ''}`
      : `Imagem estática · ${status.reason}${status.fps ? ` (${status.fps} fps)` : ''}`;

  return (
    <main>
      <Hero renderLogo={(cls) => (
        <LogoMaterial3D variant={variant} forceStatic={forceStatic} className={cls} onStatus={setStatus} />
      )} />
      <Work />
      <About />
      <Contact />

      <div className={styles.bar} role="region" aria-label="Teste do logo">
        <span className={styles.label}>Teste de logo</span>
        <nav className={styles.tabs}>
          {Object.entries(NAMES).map(([key, name]) => (
            <Link key={key} href={`/teste-logo/${key}/`} className={`${styles.tab} ${key === variant ? styles.active : ''}`} aria-current={key === variant ? 'page' : undefined}>
              {name}
            </Link>
          ))}
        </nav>
        <button type="button" className={styles.toggle} onClick={() => { setStatus(null); setForceStatic((v) => !v); }}>
          {forceStatic ? 'Ver em 3D' : 'Ver estático'}
        </button>
        <span className={styles.status} aria-live="polite">{statusText}</span>
      </div>
    </main>
  );
}
