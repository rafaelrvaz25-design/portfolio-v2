import { person } from '../../../data/projects';
import { getListedProjects, getPagedProjects, loadStudy, toCard } from '../../../lib/content';
import CaseStudy from '../../../components/CaseStudy';

// Só há página para projetos públicos e não listados (os rascunhos e arquivados não são
// gerados; com output: 'export', um slug fora desta lista não tem página).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPagedProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getPagedProjects().find((p) => p.slug === params.slug);
  const meta = { title: `${project.title} · ${person.name}` };
  // Não listado: acessível pelo URL, mas fora dos motores de pesquisa (os links continuam a ser seguidos).
  if (project.visibilidade !== 'publico') meta.robots = { index: false };
  return meta;
}

export default function Page({ params }) {
  const listed = getListedProjects();
  const project = getPagedProjects().find((p) => p.slug === params.slug);
  const index = listed.findIndex((p) => p.slug === params.slug);
  // Numeração e «Próximo projeto» só entre os públicos. Um não listado não tem número
  // e aponta para o primeiro projeto público.
  const next = index >= 0 ? listed[(index + 1) % listed.length] : listed[0];
  const study = loadStudy(project);
  return (
    <CaseStudy
      project={toCard(project)}
      study={study}
      number={index >= 0 ? String(index + 1).padStart(2, '0') : null}
      next={{ slug: next.slug, title: next.title, tag: next.tag }}
    />
  );
}
