# Rafael Vaz · Portfolio (alpha)

Site em Next.js 13 (export estático), com Locomotive Scroll, GSAP e Framer Motion.
Base: template "awwwards-landing-page"; todo o conteúdo e imagens originais foram removidos.

## Onde está o quê
- `content/*.md`: texto dos case studies. Editar aqui; as páginas são geradas a partir destes ficheiros.
  As secções "Por confirmar" e "Imagens necessárias" são notas e não aparecem no site.
- `src/data/projects.js`: lista de projetos, cores e legendas das imagens de cada secção.
- `src/common/Placeholder`: espaços reservados para fotos. Trocar por imagens reais em `public/images/`.

## Comandos
- `npm install`
- `npm run dev` (abre em http://localhost:4000)
- `npm run build` (gera o site estático em `out/`)

## Publicação (GitHub Pages)
O código fica na branch `main`; o site gerado fica na branch `gh-pages`.
Para atualizar o site:
1. `BASE_PATH=/portfolio-v2 npm run build`
2. `touch out/.nojekyll` (sem isto o GitHub ignora a pasta `_next`)
3. Publicar o conteúdo de `out/` na branch `gh-pages`.

## As três versões publicadas
- `/` · versão atual (tipografia Archivo, scroller de projetos)
- `/alpha/` · primeira versão, com o visual do template (commit `cec8fdf`)
- `/webflow/` · remake do site Webflow "Rafa Stuff" (2022), em `remake-webflow/`

O remake é HTML estático gerado por `node remake-webflow/build.mjs` a partir dos mesmos `content/*.md`.
Para a alpha: `git worktree add <pasta> cec8fdf`, copiar `content/*.md` atuais e `BASE_PATH=/portfolio-v2/alpha npm run build`.
