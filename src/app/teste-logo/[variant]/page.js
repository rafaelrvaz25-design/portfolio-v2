import LogoTest from '../../../components/LogoTest';

// Páginas de teste do novo logo (não aparecem na navegação nem nos motores de busca).
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return [{ variant: 'cromado' }, { variant: 'prata' }, { variant: 'vidro' }];
}

export default function Page({ params }) {
  return <LogoTest variant={params.variant} />;
}
