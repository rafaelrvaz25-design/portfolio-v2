'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import { scrollToElement } from '../SmoothScroll';
import Magnetic from '../../common/Magnetic';
import RvMark from '../../common/RvMark';

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
      {/* Logo: com hover, o Rv. dá uma volta e o nome desliza para fora dele */}
      <Link href="/" className={styles.logo} onClick={onLogo} aria-label="Rafael Vaz, início">
        <RvMark className={styles.mark} title="" />
        <span className={styles.nameWrap} aria-hidden="true">
          <span className={styles.name}>Rafael Vaz</span>
        </span>
      </Link>

      <span className={styles.role}>UX/UI Designer, Lisboa</span>

      <nav className={styles.nav} aria-label="Principal">
        {links.map((l) => (
          <Magnetic key={l.id}>
            <Link href={`/#${l.id}`} onClick={(e) => onAnchor(e, l.id)} className={styles.link}>
              {l.label}
              <span className={styles.dot} aria-hidden="true" />
            </Link>
          </Magnetic>
        ))}
      </nav>
    </header>
  );
}
