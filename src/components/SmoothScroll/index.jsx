'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Uma única instância de scroll suave para todo o site.
// Fica disponível em window.__scroll para os links internos (scrollTo).
export default function SmoothScroll() {
  const pathname = usePathname();

  // Só a página inicial usa scroll suave (o palco de projetos precisa dele para as paragens).
  // Nos case studies o scroll é o nativo do browser: mais leve e mais direto para ler.
  // lerp mais alto = menos inércia: a página pára quase logo que o gesto acaba.
  useEffect(() => {
    if (!pathname || pathname.includes('/projetos')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let instance;
    let cancelled = false;
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      if (cancelled) return;
      instance = new LocomotiveScroll({ lenisOptions: { lerp: 0.2, wheelMultiplier: 1 } });
      window.__scroll = instance;
    })();
    return () => {
      cancelled = true;
      instance && instance.destroy();
      window.__scroll = undefined;
    };
  }, [pathname]);

  // Ao mudar de página: vai para a âncora, se houver, ou para o topo.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    requestAnimationFrame(() => {
      if (target) scrollToElement(target, true);
      else window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}

// Enquanto um link interno leva a página até uma secção, as paragens dos projetos não travam o percurso.
export function scrollToElement(el, immediate = false) {
  if (!el) return;
  clearTimeout(window.__navTimer);
  window.__navigating = true;
  const done = () => {
    clearTimeout(window.__navTimer);
    window.__navTimer = setTimeout(() => { window.__navigating = false; }, 200);
  };
  if (window.__scroll) {
    window.__scroll.scrollTo(el, { immediate, duration: 1.2, onComplete: done });
    window.__navTimer = setTimeout(() => { window.__navigating = false; }, 2000); // segurança
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
    window.__navTimer = setTimeout(() => { window.__navigating = false; }, immediate ? 200 : 1400);
  }
}

export function scrollToY(y, options = {}) {
  const { duration = 1.2, lock = false, onComplete } = options;
  if (window.__scroll) window.__scroll.scrollTo(y, { duration, lock, onComplete });
  else { window.scrollTo({ top: y, behavior: 'smooth' }); onComplete && setTimeout(onComplete, duration * 1000); }
}
