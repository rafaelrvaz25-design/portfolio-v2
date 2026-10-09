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
    color: "#e6ebe7",
    images: {
      "Problema": ["Inventário: o mesmo componente com estilos diferentes nos 4 produtos"],
      "Processo": ["Os 4 produtos em scope: Resultados, Bilheteira, institucional e Portugal Store"],
      "Solução": [
        "O ficheiro Figma: lista de páginas e canvas de um componente",
        "Documentação do botão: hierarquia, construção e estados",
      ],
      "Resultados": ["Produtos construídos com o sistema, incluindo a plataforma Score"],
    },
  },
  {
    slug: "rrs-pingo-doce",
    file: "02-rrs-pingo-doce.md",
    title: "RRS Pingo Doce",
    tag: "Self-checkout",
    client: "Fujitsu, para o Pingo Doce",
    year: null, // por confirmar com o Rafa
    color: "#ebe7e1",
    images: {
      "Visão geral": ["O RRS na loja, o quiosque da Comida Fresca"],
      "Problema": ["Modo Direto: a janela pequena do POS dentro do ecrã"],
      "Processo": ["A exploração descartada, com imagens de produto"],
      "Solução": ["Fluxo de remoção: os 3 ecrãs", "Fluxo de adição: os 3 ecrãs"],
    },
  },
];

export const person = {
  name: "Rafael Vaz",
  role: "UX/UI Designer",
  email: "rafaelrvaz.25@gmail.com",
  linkedin: "https://www.linkedin.com/in/rafastuff",
};
