'use client';
import { cloneElement, useEffect, useRef } from 'react';
import gsap from 'gsap';

// O elemento segue o cursor enquanto está por cima e volta ao sítio com um ressalto elástico.
// `strength`: quanto do desvio do cursor o elemento acompanha (0 a 1).
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return cloneElement(children, { ref });
}
