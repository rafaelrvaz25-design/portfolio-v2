import { projects, person } from '../../../data/projects';
import { loadCaseStudy } from '../../../lib/caseStudy';
import CaseStudy from '../../../components/CaseStudy';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: `${project.title} · ${person.name}` };
}

export default function Page({ params }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const study = loadCaseStudy(project.file);
  return (
    <CaseStudy
      project={project}
      study={study}
      number={String(index + 1).padStart(2, '0')}
      next={{ slug: next.slug, title: next.title, tag: next.tag }}
    />
  );
}
