'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import { scrollToElement } from '../SmoothScroll';
import Magnetic from '../../common/Magnetic';
import RvMark from '../../common/RvMark';
import Nav from './nav';

const links = [
  { label: 'Projetos', id: 'projetos' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Contacto', id: 'contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Assim que há scroll, os links recolhem e aparece o botão do menu.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Volta ao topo: o menu fecha
  useEffect(() => { if (!scrolled) setOpen(false); }, [scrolled]);
  useEffect(() => { setOpen(false); }, [pathname]);

  // Na home, os links fazem scroll suave em vez de saltar.
  const navigate = (e, href) => {
    setOpen(false);
    if (pathname !== '/') return;
    if (href === '/') {
      e.preventDefault();
      scrollToElement(document.body);
      history.replaceState(null, '', ' ');
    } else if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.slice(2);
      scrollToElement(document.getElementById(id));
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo: com hover, o nome sai de trás de uma máscara à direita do Rv. e volta a entrar nela */}
        <Link href="/" className={styles.logo} onClick={(e) => navigate(e, '/')} aria-label="Rafael Vaz, início">
          <RvMark className={styles.mark} title="" />
          <span className={styles.nameMask} aria-hidden="true">
            <span className={styles.name}>Rafael Vaz</span>
          </span>
        </Link>

        <span className={styles.role}>UX/UI Designer, Lisboa</span>

        <nav className={styles.nav} aria-label="Principal" aria-hidden={scrolled ? 'true' : undefined}>
          {links.map((l, i) => (
            <span key={l.id} className={styles.item} style={{ '--i': i }}>
              <Magnetic>
                <Link
                  href={`/#${l.id}`}
                  onClick={(e) => navigate(e, `/#${l.id}`)}
                  className={styles.link}
                  tabIndex={scrolled ? -1 : undefined}
                >
                  {l.label}
                  <span className={styles.dot} aria-hidden="true" />
                </Link>
              </Magnetic>
            </span>
          ))}
        </nav>
      </header>

      {/* Botão do menu: aparece quando os links recolhem */}
      <div className={`${styles.burgerWrap} ${scrolled || open ? styles.burgerShow : ''}`}>
        <Magnetic strength={0.3}>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            tabIndex={scrolled || open ? undefined : -1}
          >
            <span className={`${styles.lines} ${open ? styles.linesOpen : ''}`} />
          </button>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {open && <Nav onNavigate={navigate} />}
      </AnimatePresence>
    </>
  );
}
