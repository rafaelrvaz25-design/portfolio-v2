import Hero from '../components/Hero';
import Work from '../components/Work';
import About from '../components/About';
import Contact from '../components/Contact';
import { getListedProjects, toCard } from '../lib/content';

export default function Home() {
  // Só os projetos públicos aparecem na homepage, pela ordem definida no backoffice.
  const projects = getListedProjects().map(toCard);
  return (
    <main>
      <Hero />
      <Work projects={projects} />
      <About />
      <Contact />
    </main>
  )
}
