'use client';
import { useEffect, useRef, useState } from 'react';
import { logoNew } from '../../data/logoNew';
import styles from './style.module.scss';

// O novo Rv. em 3D, em três materiais: 'cromado' (itálico, céu e horizonte), 'prata' e 'vidro'.
// Leve de propósito: geometria com pouco detalhe, resolução limitada e render só quando está no ecrã.
// Se o computador não aguentar (ou o visitante pedir "reduzir movimento", ou não houver WebGL),
// mostra uma imagem estática do mesmo logo, já renderizada.
//
// onStatus recebe { mode: '3d' | 'static', reason, fps } para a barra de testes mostrar o que aconteceu.

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
const BOX = [92, 813, 73, 369]; // caixa do logo nas coordenadas da imagem original
const CX = (BOX[0] + BOX[1]) / 2, CY = (BOX[2] + BOX[3]) / 2;

const ENVS = {
  sky: { g: [[-1, '#9a9ea6'], [-0.45, '#3a3d44'], [-0.1, '#08090b'], [-0.01, '#2b2e35'], [0, '#ffffff'], [0.05, '#dfe9ff'], [0.25, '#6f97e8'], [0.6, '#2a55c4'], [1, '#e8eeff']],
    p: [{ w: 40, h: 10, pos: [-60, 40, 60], i: 6 }] },
  softSilver: { g: [[-1, '#3a3a3a'], [-0.5, '#9a9a9a'], [-0.15, '#5a5a5a'], [0.05, '#ffffff'], [0.3, '#bcbcbc'], [0.6, '#f5f5f5'], [1, '#8c8c8c']],
    p: [{ w: 90, h: 70, pos: [-55, 45, 45], i: 2.2 }, { w: 50, h: 120, pos: [80, 0, 10], i: 0, color: '#000' }, { w: 120, h: 30, pos: [0, -75, 40], i: 0.15 }, { w: 30, h: 90, pos: [-85, -10, -20], i: 1.4 }] },
  glassStudio: { g: [[-1, '#d8d4e0'], [-0.3, '#ffffff'], [0, '#f2f0f6'], [0.4, '#ffffff'], [1, '#e2dfe9']],
    p: [{ w: 60, h: 40, pos: [-50, 50, 50], i: 3.5 }, { w: 16, h: 150, pos: [78, 0, 25], i: 0, color: '#111' }, { w: 12, h: 150, pos: [-82, 0, 30], i: 0, color: '#1a1a1a' }, { w: 150, h: 12, pos: [0, -80, 35], i: 0, color: '#222' }, { w: 10, h: 10, pos: [55, 55, 55], i: 12 }] },
};

const VARIANTS = {
  cromado: { env: 'sky', exposure: 1.15, rot: [0.05, -0.12], parts: 'sharp' },
  prata: { env: 'softSilver', exposure: 1.0, rot: [0.16, -0.32], parts: 'round' },
  vidro: { env: 'glassStudio', exposure: 1.0, rot: [0.12, -0.32], parts: 'round', noTone: true },
};

export default function LogoMaterial3D({ variant = 'prata', forceStatic = false, className = '', onStatus }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [mode, setMode] = useState('loading');
  const report = useRef(onStatus);
  report.current = onStatus;

  useEffect(() => {
    const goStatic = (reason, fps) => { setMode('static'); report.current && report.current({ mode: 'static', reason, fps }); };
    if (forceStatic) { goStatic('forçado'); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { goStatic('reduzir movimento'); return; }
    if (navigator.connection && navigator.connection.saveData) { goStatic('poupança de dados'); return; }

    let disposed = false;
    let cleanup = () => {};
    const V = VARIANTS[variant];
    // ?capture: pose fixa e sem sonda (usado para gerar as imagens estáticas); ?noprobe: sem sonda
    const qs = new URLSearchParams(location.search);
    const capture = qs.has('capture'), noProbe = capture || qs.has('noprobe');

    (async () => {
      const THREE = await import('three');
      const { SVGLoader } = await import('three/examples/jsm/loaders/SVGLoader.js');
      const { toCreasedNormals } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
      if (disposed) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true, alpha: !V.noTone, powerPreference: 'high-performance' });
      } catch (e) { goStatic('sem WebGL'); return; }
      setMode('3d');
      renderer.setPixelRatio(capture ? 2 : Math.min(window.devicePixelRatio, 1.5)); // retina a 1.5x chega e poupa muito
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = V.noTone ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = V.exposure;

      const scene = new THREE.Scene();
      // o vidro precisa de um fundo sólido para refratar: usa a cor da página (e o canvas mistura-se com "darken")
      if (V.noTone) scene.background = new THREE.Color(getComputedStyle(document.body).backgroundColor || '#f4f4f4');

      // ambiente: esfera com gradiente vertical e painéis de luz, convertida num mapa de reflexos
      const env = ENVS[V.env];
      const envScene = new THREE.Scene();
      const sg = new THREE.SphereGeometry(100, 48, 24), sp = sg.attributes.position, cols = [], c = new THREE.Color(), c2 = new THREE.Color();
      for (let i = 0; i < sp.count; i++) {
        const y = sp.getY(i) / 100; let a = env.g[0], b = env.g[env.g.length - 1];
        for (let k = 0; k < env.g.length - 1; k++) if (y >= env.g[k][0] && y <= env.g[k + 1][0]) { a = env.g[k]; b = env.g[k + 1]; }
        const t = b[0] === a[0] ? 0 : (y - a[0]) / (b[0] - a[0]);
        c.set(a[1]).lerp(c2.set(b[1]), Math.min(1, Math.max(0, t))); cols.push(c.r, c.g, c.b);
      }
      sg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
      envScene.add(new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
      for (const p of env.p) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.h), new THREE.MeshBasicMaterial({ color: new THREE.Color(p.color || '#fff').multiplyScalar(p.i), side: THREE.DoubleSide }));
        m.position.set(...p.pos); m.lookAt(0, 0, 0); envScene.add(m);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(envScene, 0).texture;
      envScene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });

      // curvatura falsa nas faces da frente: o reflexo varre o horizonte como em letras cromadas
      const bend = (mat, k, kx) => {
        mat.onBeforeCompile = (sh) => {
          sh.uniforms.uB = { value: new THREE.Vector2(k, kx) };
          sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vLP; varying vec3 vUpV; varying vec3 vRtV;')
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLP = position;\nvUpV = normalize((viewMatrix * modelMatrix * vec4(0.0, -1.0, 0.0, 0.0)).xyz);\nvRtV = normalize((viewMatrix * modelMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);');
          sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vLP; varying vec3 vUpV; varying vec3 vRtV; uniform vec2 uB;')
            .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
              float ty = clamp((vLP.y - ${BOX[2]}.0) / ${BOX[3] - BOX[2]}.0, 0.0, 1.0) * -2.0 + 1.0;
              float tx = clamp((vLP.x - ${BOX[0]}.0) / ${BOX[1] - BOX[0]}.0, 0.0, 1.0) * 2.0 - 1.0;
              normal = normalize(normal + normalize(vUpV) * ty * uB.x + normalize(vRtV) * tx * uB.y);`);
        };
      };
      // faces da frente e de trás com normal plana (evita riscas nos triângulos grandes)
      const flattenCaps = (geo, mid) => {
        const n = geo.attributes.normal, p = geo.attributes.position, g0 = geo.groups.find((g) => g.materialIndex === 0);
        if (!g0) return;
        for (let i = g0.start; i < g0.start + g0.count; i++) n.setXYZ(i, 0, 0, Math.sign(p.getZ(i) - mid) || 1);
        n.needsUpdate = true;
      };

      const parts = logoNew[V.parts];
      const shapes = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="${parts.join(' ')}"/></svg>`).paths.flatMap((p) => SVGLoader.createShapes(p));
      const group = new THREE.Group();
      const materials = [];

      if (variant === 'cromado') {
        const metal = new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 1, roughness: 0.05 });
        const caps = metal.clone(); bend(caps, 1.0, 0.3);
        materials.push(metal, caps);
        const italic = -0.32;
        shapes.forEach((s) => {
          const geo = new THREE.ExtrudeGeometry(s, { depth: 18, bevelEnabled: true, bevelThickness: 6, bevelSize: 4, bevelSegments: 3, curveSegments: 8 });
          geo.applyMatrix4(new THREE.Matrix4().makeShear(0, 0, italic, 0, 0, 0).premultiply(new THREE.Matrix4().makeTranslation(-italic * BOX[3], 0, 0)));
          const m = new THREE.Mesh(geo, [caps, metal]); m.scale.set(1, -1, 1); m.position.set(-CX, CY, -9); group.add(m);
        });
      } else {
        const glass = variant === 'vidro';
        const mat = glass
          ? new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0, roughness: 0.02, transmission: 1, thickness: 160, ior: 1.7, clearcoat: 1, attenuationColor: '#dfe6ff', attenuationDistance: 500, envMapIntensity: 1.3 })
          : new THREE.MeshPhysicalMaterial({ color: '#e9e9eb', metalness: 1, roughness: 0.16, clearcoat: 0.6, clearcoatRoughness: 0.08 });
        if (glass) {
          // arestas com corpo: escurecem com o ângulo e ganham um fio de luz
          mat.onBeforeCompile = (sh) => {
            sh.fragmentShader = sh.fragmentShader.replace('#include <tonemapping_fragment>', `
              float fr = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
              gl_FragColor.rgb *= 1.0 - smoothstep(0.18, 0.8, fr) * 0.6;
              gl_FragColor.rgb += vec3(1.0) * smoothstep(0.86, 0.99, fr) * 0.45;
              #include <tonemapping_fragment>`);
          };
        }
        const caps = glass ? mat : mat.clone();
        if (!glass) bend(caps, 0.85, 0.5);
        materials.push(mat, caps);
        const depth = glass ? 60 : 40, bt = glass ? 30 : 26;
        shapes.forEach((s) => {
          const bb = new THREE.Box2(); s.getPoints().forEach((p) => bb.expandByPoint(p));
          const w = bb.max.x - bb.min.x;
          if (w < 100) { // o ponto é uma esfera
            const ball = new THREE.Mesh(new THREE.SphereGeometry(w / 2 + (glass ? 4 : 6), 40, 28), mat);
            ball.position.set((bb.min.x + bb.max.x) / 2 - CX, -((bb.min.y + bb.max.y) / 2 - CY), glass ? 0 : 10); group.add(ball); return;
          }
          let geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bt, bevelSize: 18, bevelOffset: -8, bevelSegments: 7, curveSegments: 10 });
          geo = toCreasedNormals(geo, Math.PI / 2.2);
          flattenCaps(geo, depth / 2);
          const m = new THREE.Mesh(geo, [caps, mat]); m.scale.set(1, -1, 1); m.position.set(-CX, CY, -depth / 2); group.add(m);
        });
      }

      const pivot = new THREE.Group(); pivot.add(group); scene.add(pivot);
      const camera = new THREE.PerspectiveCamera(22, 1, 1, 6000);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = wrap.current;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const vf = THREE.MathUtils.degToRad(camera.fov), fitW = 900 / 0.8, fitH = 420 / 0.8;
        camera.position.z = Math.max(fitH / 2 / Math.tan(vf / 2), fitW / 2 / Math.tan(vf / 2) / camera.aspect);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(wrap.current);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e) => { pointer.x = (e.clientX / innerWidth) * 2 - 1; pointer.y = (e.clientY / innerHeight) * 2 - 1; };
      addEventListener('pointermove', onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(wrap.current);

      // sonda de desempenho: nos primeiros 2 s, abaixo de 35 fps passa à imagem estática
      const probe = { frames: [], last: 0, start: performance.now(), done: noProbe };
      if (noProbe) report.current && report.current({ mode: '3d', reason: 'sem sonda' });
      const rot = { x: 0, y: 0 };
      const clock = new THREE.Clock();
      let raf;
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        if (!visible) { probe.last = 0; return; }
        if (!probe.done) {
          // mede durante 1,5 s depois de meio segundo de aquecimento (por tempo, para não demorar em máquinas lentas)
          const el = now - probe.start;
          if (el > 500) probe.frames.push(now);
          if (el > 2000) {
            probe.done = true;
            const n = probe.frames.length, span = n > 1 ? (probe.frames[n - 1] - probe.frames[0]) / 1000 : 1.5;
            const fps = Math.round((n - 1) / span);
            if (fps < 35) { cleanup(); goStatic('computador lento', fps); return; }
            report.current && report.current({ mode: '3d', reason: 'a correr bem', fps });
          }
        }
        const t = capture ? 0 : clock.getElapsedTime();
        if (capture) { pointer.x = 0; pointer.y = 0; }
        rot.x += (pointer.y * 0.35 - rot.x) * 0.05;
        rot.y += (pointer.x * 0.55 - rot.y) * 0.05;
        pivot.rotation.set(V.rot[0] + rot.x + Math.sin(t * 0.7) * 0.05, V.rot[1] + rot.y + Math.sin(t * 0.45) * 0.14, Math.sin(t * 0.6) * 0.03);
        pivot.position.y = Math.sin(t * 1.1) * 8;
        const rect = wrap.current.parentElement.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        wrap.current.style.transform = `translate3d(0, ${-progress * 40}vh, 0)`;
        renderer.render(scene, camera);
        if (capture) { wrap.current.dataset.ready = '1'; wrap.current.dataset.tris = renderer.info.render.triangles; }
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        removeEventListener('pointermove', onPointer);
        ro.disconnect(); io.disconnect();
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
        materials.forEach((m) => m.dispose());
        pmrem.dispose(); renderer.dispose();
        cleanup = () => {};
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [variant, forceStatic]);

  return (
    <div ref={wrap} className={`${styles.wrap} ${variant === 'vidro' ? styles.glass : ''} ${className}`} aria-hidden="true">
      {mode === 'static'
        ? <img className={styles.still} src={`${BASE}/logo-static/${variant}.webp`} alt="" />
        : <canvas key={variant + String(forceStatic)} ref={canvas} className={styles.canvas} />}
    </div>
  );
}
