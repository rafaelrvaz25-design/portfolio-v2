# Case study 01: Design System, FPF

## Um Design System para unificar o ecossistema digital da FPF

Design System para os produtos digitais da Federação Portuguesa de Futebol. Desenhei os componentes, organizei os Design Tokens e mantive a biblioteca durante mais um ano. Dois dos quatro produtos prioritários adotaram o sistema por completo.

### Ficha rápida
- **Papel:** UX/UI Designer
- **Cliente:** Federação Portuguesa de Futebol
- **Setor:** Desporto
- **Duração:** 6 meses + 12 de manutenção

---

## O desafio e o meu papel

### Mais de 40 produtos digitais, sem uma linguagem visual partilhada.

Os produtos da FPF tinham sido desenvolvidos de forma independente, cada um com os seus padrões visuais e de interação. O objetivo era criar um Design System que reduzisse estas inconsistências e tornasse o desenvolvimento e a manutenção mais simples.

Trabalhei no projeto através da Monday, numa equipa com outro designer, um Design Lead e um PM. Fui responsável pelo **desenho de todos os componentes, pela organização dos Design Tokens e por parte da documentação** da biblioteca em Figma. Participei nas apresentações ao cliente, onde discuti os próximos passos, e depois da entrega continuei a manter e a evoluir o sistema durante mais um ano.

## Investigação e definição do âmbito

### Confirmar a necessidade antes de desenhar.

Antes de desenhar, a equipa mapeou os produtos, entrevistou diferentes departamentos e fez uma auditoria às interfaces. Nesta fase fui apoio: acompanhei as entrevistas, tomei notas e complementei o trabalho da minha colega.

A auditoria mostrou a dimensão do problema: elementos com a mesma função tinham estruturas, estilos e estados diferentes de produto para produto.

![Excerto do inventário: botões e cards de resultados com a mesma função e tratamentos diferentes.](images/fpf/02-inventario.webp?v=5)

:::stats
27 | componentes identificados
1.313 | variações, entre estrutura e estados
:::

Em vez de tentar abranger o ecossistema inteiro, definimos quatro produtos prioritários: Resultados, Bilheteira, site institucional e Portugal Store. Um âmbito controlado permitia construir uma base sólida antes de a alargar.

![Os quatro produtos prioritários antes do Design System: Resultados, Bilheteira, site institucional e Portugal Store.](images/fpf/01-contexto.webp?v=4)

## Construção do Design System

### Tokens primeiro, componentes depois.

Comecei pelos **Design Tokens**. Organizei as variáveis em duas coleções: Primitives, com os valores base, e Tokens, com os nomes que os componentes usam, em quatro modos. Uma cor ou um modo passam a mudar num só sítio, e não em cada componente.

![As variáveis em duas coleções, Primitives e Tokens, com quatro modos. O mesmo token, Colour/Action/high, alimenta o botão e o toggle em modo claro e escuro.](images/fpf/03-tokens.webp?v=4)

Sobre esta base desenhei os componentes, com variantes, propriedades e estados de interação. O botão mostra a lógica: cinco níveis de destaque (Primário, Secundário, Outlined, Ghost e Destrutivo), cada um nos estados Rest, Hover, Pressed e Focus.

![O botão: cinco níveis de destaque nos estados Rest, Hover, Pressed e Focus, com as propriedades do componente e as medidas de construção.](images/fpf/04-botao.webp?v=4)

A acessibilidade entrou nas decisões dos componentes, com as WCAG 2.1 como referência. O estado de foco é um exemplo: um contorno azul `#3366FF` acompanhado de um contorno branco. Em dois dos fundos usados nos produtos, o azul sozinho não chegava ao contraste mínimo, e o contorno branco garante que o foco continua visível.

![O estado de foco num fundo claro e num fundo escuro. Nos dois fundos em que o azul não chega ao contraste mínimo, o contorno branco garante a visibilidade.](images/fpf/05-foco.webp?v=4)

A biblioteca ficou num único ficheiro Figma, com uma página de documentação por componente, regras de utilização, Design Tokens e Changelog.

![A estrutura de páginas do ficheiro e duas páginas reais da documentação do botão.](images/fpf/06-documentacao.webp?v=4)

## Adoção e evolução

### Seis meses de construção, doze de manutenção.

O desenvolvimento inicial durou seis meses. A partir daí, o Design System começou a ser integrado nos produtos, e eu continuei a acompanhá-lo durante mais doze meses: respondi a novos pedidos através de tickets e desenhei, por exemplo, os componentes de tabelas para a plataforma Score.

A adoção não foi igual em todos os produtos. Dos quatro prioritários, o site institucional e a Portugal Store adotaram o sistema por completo; no site Resultados, a adoção foi parcial. A adoção parcial deveu-se sobretudo a prioridades definidas pelas chefias da FPF.

Fora do âmbito inicial, o sistema chegou a cerca de oito projetos de backoffice, a maioria com adoção parcial. A plataforma Score, um deles, ficou com adoção praticamente total. Os projetos novos que surgiram enquanto acompanhei o sistema começaram já com o Design System.

![Componentes partilhados no site Resultados, com adoção parcial, e no site institucional, com adoção completa.](images/fpf/07-aplicacao.webp?v=4)

## Resultados e aprendizagens

:::stats
2 de 4 | produtos prioritários com **adoção completa**: site institucional e Portugal Store
~8 | projetos de backoffice com o sistema, a maioria com **adoção parcial**
12 | meses de manutenção e evolução depois da entrega
:::

O projeto deixou à FPF uma biblioteca documentada e uma linguagem visual partilhada, usada por completo em dois produtos prioritários e de forma parcial em vários outros.

A principal aprendizagem foi que **um Design System depende tanto da adoção como da construção**. A adoção parcial mostrou-me a importância de envolver desde o início quem decide as prioridades. E, como a equipa de desenvolvimento da FPF trabalhava longe da equipa de design, hoje procuraria um contacto mais próximo com os developers logo nas primeiras decisões sobre componentes e tokens.
