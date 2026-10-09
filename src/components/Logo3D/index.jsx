'use client';
import { useEffect, useRef, useState } from 'react';
import { logo3d as logo } from '../../data/logo3d';
import styles from './style.module.scss';

// O "Rv." em 3D, a flutuar dentro da secção onde está.
// - flutuação lenta e contínua
// - inclina-se na direção do cursor
// - parallax: sobe mais depressa do que o resto da secção quando se faz scroll
// Sem WebGL ou com "reduzir movimento" fica o logo em 2D, parado.
export default function Logo3D({ className }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFallback(true); return; }
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { SVGLoader } = await import('three/examples/jsm/loaders/SVGLoader.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true, alpha: true });
      } catch (e) { setFallback(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(30, 1, 1, 2000);
      camera.position.set(0, 0, 330);

      // geometria: cada letra extrudida, com bisel; o v e o ponto ligeiramente à frente
      // para as faces sobrepostas do R e do v não cintilarem
      const svg = `<svg xmlns="http://www.w3.org/2000/svg">${logo.parts.map((d) => `<path d="${d}"/>`).join('')}</svg>`;
      const data = new SVGLoader().parse(svg);
      const material = new THREE.MeshPhysicalMaterial({
        color: '#2a52f5', metalness: 0.1, roughness: 0.24,
        clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.75,
      });
      const group = new THREE.Group();
      data.paths.forEach((p, i) => {
        SVGLoader.createShapes(p).forEach((shape) => {
          const geo = new THREE.ExtrudeGeometry(shape, {
            depth: 22, bevelEnabled: true, bevelThickness: 4, bevelSize: 2.4, bevelSegments: 6, curveSegments: 18,
          });
          const mesh = new THREE.Mesh(geo, material);
          mesh.position.z = i * 0.6;
          group.add(mesh);
        });
      });
      group.scale.set(1, -1, 1); // o SVG tem o y para baixo
      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      group.position.sub(center);
      const pivot = new THREE.Group();
      pivot.add(group);
      scene.add(pivot);

      const key = new THREE.DirectionalLight('#ffffff', 1.6);
      key.position.set(200, 300, 400);
      scene.add(key, new THREE.AmbientLight('#ffffff', 0.25));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = wrap.current;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap.current);

      // cursor e scroll
      const pointer = { x: 0, y: 0 };
      const onPointer = (e) => {
        pointer.x = (e.clientX / innerWidth) * 2 - 1;
        pointer.y = (e.clientY / innerHeight) * 2 - 1;
      };
      addEventListener('pointermove', onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(wrap.current);

      const rot = { x: 0, y: 0 };
      const clock = new THREE.Clock();
      let raf;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime();
        rot.x += (pointer.y * 0.35 - rot.x) * 0.05;
        rot.y += (pointer.x * 0.55 - rot.y) * 0.05;
        pivot.rotation.set(rot.x + Math.sin(t * 0.7) * 0.08, rot.y + Math.sin(t * 0.45) * 0.25 - 0.25, Math.sin(t * 0.6) * 0.05);
        pivot.position.y = Math.sin(t * 1.1) * 6;
        // parallax: o logo sobe à frente da página (até 40% do ecrã a mais)
        const rect = wrap.current.parentElement.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        wrap.current.style.transform = `translate3d(0, ${-progress * 40}vh, 0)`;
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        removeEventListener('pointermove', onPointer);
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
        material.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div ref={wrap} className={`${styles.wrap} ${className || ''}`} aria-hidden="true">
      {fallback ? (
        <svg className={styles.flat} viewBox={logo.viewBox.join(' ')} fill="currentColor"><path d={logo.parts.join(' ')} /></svg>
      ) : <canvas ref={canvas} className={styles.canvas} />}
    </div>
  );
}
