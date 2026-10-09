'use client';
import { useEffect, useState } from 'react';
import { RevealLines, FadeUp } from '../../common/Reveal';
import { person } from '../../data/projects';
import styles from './style.module.scss';

function useLisbonTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Lisbon' }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Contact() {
  const time = useLisbonTime();
  return (
    <section id="contacto" className={styles.contact}>
      <span className="label">Contacto</span>
      <RevealLines className={`display ${styles.title}`} lines={['Vamos', 'falar.']} />

      <FadeUp>
        <a className={styles.email} href={`mailto:${person.email}`}>
          {person.email}
          <span aria-hidden="true">↗</span>
        </a>
      </FadeUp>

      <div className={styles.footer}>
        <div>
          <span className="label">Redes</span>
          <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div>
          <span className="label">Hora em Lisboa</span>
          <span>{time}</span>
        </div>
        <div>
          <span className="label">Versão</span>
          <span>Alpha · 2026</span>
        </div>
        <div className={styles.copy}>© 2026 Rafael Vaz</div>
      </div>
    </section>
  );
}
