// Fonte única dos projetos. O texto de cada case study vive em /content/*.md.
// As imagens ainda são espaços reservados: cada entrada de `images` diz depois
// de que secção (pelo título da secção) aparece.

export const projects = [
  {
    slug: "design-system-fpf",
    file: "01-design-system-fpf.md",
    title: "Design System FPF",
    tag: "Design System",
    client: "Federação Portuguesa de Futebol",
    year: "2023 a 2024",
    color: "#e4e4e4",
    images: {}, // as figuras do FPF vivem no próprio texto (content/01-design-system-fpf.md)
  },
  {
    slug: "rrs-pingo-doce",
    file: "02-rrs-pingo-doce.md",
    title: "RRS Pingo Doce",
    tag: "Self-checkout",
    client: "Fujitsu, para o Pingo Doce",
    year: null, // por confirmar com o Rafa
    color: "#dddddd",
    images: {}, // as figuras vivem no próprio texto (content/02-rrs-pingo-doce.md)
  },
  {
    slug: "monday-talent-pool",
    file: "03-monday-talent-pool.md",
    title: "Monday Talent Pool",
    tag: "UX/UI e acessibilidade",
    client: "Monday, projeto interno",
    year: "2026",
    color: "#e2e2e2",
    images: {}, // as figuras vivem no próprio texto (content/03-monday-talent-pool.md)
  },
];

export const person = {
  name: "Rafael Vaz",
  role: "UX/UI Designer",
  email: "rafaelrvaz.25@gmail.com",
  linkedin: "https://www.linkedin.com/in/rafastuff",
};
