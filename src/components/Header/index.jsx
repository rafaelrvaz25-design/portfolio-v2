'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import { scrollToElement } from '../SmoothScroll';

const links = [
  { label: 'Projetos', id: 'projetos' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Contacto', id: 'contacto' },
];

export default function Header() {
  const pathname = usePathname();

  // Na home, os links fazem scroll suave em vez de saltar.
  const onAnchor = (e, id) => {
    if (pathname !== '/') return;
    e.preventDefault();
    scrollToElement(document.getElementById(id));
    history.replaceState(null, '', `#${id}`);
  };

  const onLogo = (e) => {
    if (pathname !== '/') return;
    e.preventDefault();
    scrollToElement(document.body);
    history.replaceState(null, '', ' ');
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name} onClick={onLogo}>Rafael Vaz</Link>
      <span className={styles.role}>UX/UI Designer, Lisboa</span>
      <nav className={styles.nav} aria-label="Principal">
        {links.map((l) => (
          <Link key={l.id} href={`/#${l.id}`} onClick={(e) => onAnchor(e, l.id)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
