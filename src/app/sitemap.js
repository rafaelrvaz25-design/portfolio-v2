import { getListedProjects } from '../lib/content';

// sitemap.xml gerado no build: só a homepage e os projetos públicos.
// Os não listados, rascunhos e arquivados ficam de fora.
const SITE = (process.env.SITE_URL || 'https://rafastuff.github.io') + (process.env.BASE_PATH || '');

export default function sitemap() {
  return [
    { url: `${SITE}/` },
    ...getListedProjects().map((p) => ({ url: `${SITE}/projetos/${p.slug}/` })),
  ];
}
