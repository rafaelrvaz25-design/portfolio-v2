// Fonte única dos projetos. O texto de cada case study vive em /content/*.md.
// `cover` é a capa 16:9 do projeto (cartões da home e topo do case study), feita no Figma
// do portfólio, página "Portfolio / Project Thumbnails". `color` é o fundo dessa capa,
// mostrado enquanto a imagem carrega. Ao trocar uma capa, subir o `?v=N`.

export const projects = [
  {
    slug: "design-system-fpf",
    file: "01-design-system-fpf.md",
    title: "Design System FPF",
    tag: "Design System",
    client: "Federação Portuguesa de Futebol",
    year: "2023 a 2024",
    color: "#112723",
    cover: "images/fpf/00-capa.webp?v=1",
    images: {}, // as figuras do FPF vivem no próprio texto (content/01-design-system-fpf.md)
  },
  {
    slug: "rrs-pingo-doce",
    file: "02-rrs-pingo-doce.md",
    title: "RRS Pingo Doce",
    tag: "Self-checkout",
    client: "Fujitsu, para o Pingo Doce",
    year: null, // por confirmar com o Rafa
    color: "#e4ecd6",
    cover: "images/rrs/00-capa.webp?v=1",
    images: {}, // as figuras vivem no próprio texto (content/02-rrs-pingo-doce.md)
  },
  {
    slug: "monday-talent-pool",
    file: "03-monday-talent-pool.md",
    title: "Monday Talent Pool",
    tag: "UX/UI e acessibilidade",
    client: "Monday, projeto interno",
    year: "2026",
    color: "#3f7a3a",
    cover: "images/monday/00-capa.webp?v=1",
    images: {}, // as figuras vivem no próprio texto (content/03-monday-talent-pool.md)
  },
  {
    slug: "gallo",
    file: "04-gallo.md",
    title: "Gallo",
    tag: "Landing page",
    client: "Gallo",
    year: "2026",
    color: "#e2c879",
    cover: "images/gallo/00-capa.webp?v=2",
    images: {}, // as figuras vivem no próprio texto (content/04-gallo.md)
  },
];

export const person = {
  name: "Rafael Vaz",
  role: "UX/UI Designer",
  email: "rafaelrvaz.25@gmail.com",
  linkedin: "https://www.linkedin.com/in/rafastuff",
};
