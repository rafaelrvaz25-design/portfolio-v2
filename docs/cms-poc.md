# Backoffice (prova de conceito): experimentar localmente

Tudo corre no teu computador. Nada é publicado no site nem enviado para o GitHub,
a não ser que faças `git push`.

## Preparar (uma vez)

Precisas de Node.js 20 ou mais recente (os scripts de verificação precisam do 22).

```sh
git clone https://github.com/rafaelrvaz25-design/portfolio-v2.git
cd portfolio-v2
git checkout cms-poc
npm install
```

## Abrir o backoffice

São precisos dois terminais, na pasta do projeto:

```sh
# Terminal 1: o site, em http://localhost:4000
npm run dev
```

```sh
# Terminal 2: o servidor local do backoffice (grava no Git deste computador)
npm run cms
```

Depois abre **http://localhost:4000/admin/index.html** e carrega em **Entrar**
(localmente não há palavra-passe).

## O que experimentar

1. **Corrigir uma palavra**: Projetos → Gallo → seta à esquerda de uma secção → editar o
   texto → **Salvar**. O site em http://localhost:4000/projetos/gallo/ ainda não muda.
2. **Publicar**: mudar o estado para **Pronto** → **Publicar** → **Publicar agora** → OK.
   Atualiza a página do Gallo no browser: a alteração aparece.
3. **Secção nova**: «Adicionar secção», depois «Adicionar bloco» → Texto, Figura ou
   Números em destaque. As secções e os blocos reordenam-se arrastando a barra `═`.
4. **Imagem**: num bloco Figura, «Escolha uma imagem» → carregar um ficheiro. Vai para
   `public/images/uploads/`.
5. **Visibilidade**: o primeiro campo de cada projeto (Público, Não listado, Rascunho,
   Arquivado). Para ver o efeito no site gerado: `BASE_PATH= npm run build` e
   `node scripts/validar-out.mjs`.
6. **Desistir de uma alteração**: «Excluir alterações não publicadas».

Os textos usam Markdown: `**negrito**`, linhas começadas por `- ` para listas,
`[texto](endereço)` para links e uma linha em branco entre parágrafos.

## Desfazer os testes

Cada «Publicar» é um commit no ramo `cms-poc` deste computador.

```sh
git log --oneline -5          # ver o que foi publicado
git revert <commit>           # desfazer uma publicação
git reset --hard origin/cms-poc   # voltar ao estado do GitHub, apagando todos os testes
git branch | grep cms/ | xargs git branch -D   # apagar rascunhos que ficaram por publicar
```

## Cuidados no modo local

- **Antes de guardar no backoffice, não deixes alterações por gravar no Git** (por
  exemplo, ficheiros editados à mão). Se houver, «Salvar» falha com
  «API_ERROR: Unknown error». Resolve com `git status`, e depois commit ou
  `git checkout -- <ficheiro>`.
- Não mudes de ramo nem faças `git pull` com um rascunho aberto no backoffice.
- Uma imagem carregada num rascunho só aparece na pré-visualização do editor
  logo após o carregamento; depois de recarregar a página, só aparece quando
  o rascunho for publicado.
- O backoffice está em português do Brasil («Salvar», «Mídia», «Duplicado»):
  é a tradução que o Decap traz.
- No Windows, `npm run cms` não funciona como está (usa `MODE=git`); corre
  `set MODE=git && npx decap-server`.

## Verificações para quem desenvolve

```sh
BASE_PATH= npx next build
node scripts/comparar-html.mjs     # HTML das 5 páginas igual à linha de base
node scripts/validar-out.mjs       # visibilidade, sitemap, noindex e imagens
node scripts/migrar.mjs <slug> --verificar   # migração de outro projeto, sem escrever
python3 scripts/capturas.py <pasta>          # capturas desktop/mobile (precisa de Playwright)
```
