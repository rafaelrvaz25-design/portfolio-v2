// Pré-visualização no painel do editor: a estrutura do case study (título, ficha, capa,
// secções e blocos) com o texto Markdown já formatado. É uma aproximação, não o design final:
// para ver a página real, usar «Ver pré-visualização» com o site local a correr.
/* global CMS, h, createClass, marked */
(function () {
  if (!window.CMS) return;
  CMS.registerPreviewStyle('preview.css');

  const md = (s) => ({ __html: window.marked ? marked.parse(String(s || '')) : String(s || '') });
  const mdInline = (s) => ({ __html: window.marked ? marked.parseInline(String(s || '')) : String(s || '') });
  const LABEL = { publico: 'Público', nao_listado: 'Não listado', rascunho: 'Rascunho', arquivado: 'Arquivado' };
  const FICHA = [['papel', 'Papel'], ['cliente', 'Cliente'], ['setor', 'Setor'], ['duracao', 'Duração'], ['equipa', 'Equipa']];

  const ProjectPreview = createClass({
    img(src) {
      if (!src) return null;
      return String(this.props.getAsset(src));
    },
    render() {
      const d = this.props.entry.get('data').toJS();
      const ficha = d.ficha || {};
      const capa = d.capa || {};
      return h('article', { className: 'cs' },
        h('p', { className: 'estado estado-' + d.visibilidade }, LABEL[d.visibilidade] || '—'),
        h('p', { className: 'kicker' }, d.categoria || ''),
        h('h1', {}, d.titulo_pagina || d.titulo || ''),
        d.descricao ? h('p', { className: 'lead' }, d.descricao) : null,
        h('dl', { className: 'ficha' }, FICHA.filter(([k]) => ficha[k]).map(([k, l]) =>
          h('div', { key: k }, h('dt', {}, l), h('dd', {}, ficha[k])))),
        h('div', { className: 'capa', style: { background: capa.cor_fundo || '#eee' } },
          capa.imagem ? h('img', { src: this.img(capa.imagem), alt: '' }) : null),
        ficha.impacto ? h('section', { className: 'impacto' }, h('p', { className: 'label' }, 'Impacto'), h('p', {}, ficha.impacto)) : null,
        (d.secoes || []).map((s, i) => h('section', { key: i, className: 'secao' },
          h('h2', {}, h('span', {}, String(i + 1).padStart(2, '0')), s.titulo || ''),
          s.subtitulo ? h('h3', {}, s.subtitulo) : null,
          (s.blocos || []).map((b, j) => {
            if (b.tipo === 'texto') return h('div', { key: j, className: 'prose', dangerouslySetInnerHTML: md(b.corpo) });
            if (b.tipo === 'figura') return h('figure', { key: j },
              b.imagem ? h('img', { src: this.img(b.imagem), alt: b.alt || b.legenda || '' }) : h('div', { className: 'vazio' }, 'Sem imagem'),
              h('figcaption', {}, b.legenda || ''));
            if (b.tipo === 'numeros') return h('dl', { key: j, className: 'stats' }, (b.itens || []).map((it, k) =>
              h('div', { key: k }, h('dt', {}, it.valor), h('dd', { dangerouslySetInnerHTML: mdInline(it.descricao) }))));
            return null;
          }))));
    },
  });

  CMS.registerPreviewTemplate('projetos', ProjectPreview);
})();
