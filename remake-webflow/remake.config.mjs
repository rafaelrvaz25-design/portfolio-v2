// Configuração do remake do site Webflow "Rafa Stuff" (2022).
// Os textos dos case studies vêm de ../content/*.md (os mesmos da versão principal).
// Aqui ficam só as coisas próprias deste visual: cores de cada projeto (como os banners
// de marca do site antigo) e um título curto por secção (o padrão "rótulo + título" do Webflow).

export const tokens = {
  sectionBlue: '#fbfbfd',
  softBlack: '#252525',
  niceBlack: '#121212',
  niceGray: '#777777',
  menuGray: '#e9e9eb',
  actionBlue: '#007aff',
  hoverBlue: '#2157bf',
  shadow: '#9ba1a8',
};

export const remake = {
  'design-system-fpf': {
    banner: { bg: '#008944', fg: '#ffffff', kicker: 'UX/UI Design · Design System' },
    headings: {
      'Visão geral': 'Um sistema para unificar 40+ produtos',
      'Problema': 'Um ecossistema construído em silos',
      'Processo': 'Limpar a casa antes de comprar um móvel novo',
      'Solução': 'Biblioteca, tokens e documentação no mesmo sítio',
      'Resultados': 'Um sistema que passou do scope inicial',
      'Aprendizagens': 'O que aprendi',
    },
  },
  'rrs-pingo-doce': {
    banner: { bg: '#1f2a24', fg: '#ffffff', kicker: 'UX/UI Design · Self-checkout' },
    headings: {
      'Visão geral': 'Corrigir um tabuleiro sem sair do RRS',
      'Problema': 'Um POS pequeno demais para corrigir um erro',
      'Processo': 'Perceber a máquina antes do ecrã',
      'Solução': 'Uma opção dedicada para editar tabuleiros',
      'Resultados': 'Em produção nas lojas',
      'Aprendizagens': 'O que aprendi',
    },
  },
};

// Projeto real ainda sem case study escrito: aparece como "Em breve",
// tal como o cartão "Em breve" do site antigo. Apagar se não quiseres mostrar.
export const comingSoon = [
  { title: 'Perfumes & Companhia', tag: 'Redesign de e-commerce' },
];
