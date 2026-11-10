# Case study 01: Design System, FPF

## Um Design System para unificar o ecossistema digital da FPF

### Ficha rápida
- **Cliente:** Federação Portuguesa de Futebol
- **Papel:** UX/UI Designer na Monday
- **Ano:** 2023 a 2024
- **Duração:** 6 meses + 12 de manutenção
- **Equipa:** 2 designers, 1 Design Lead e 1 PM

---

## O desafio

### Mais de 40 produtos digitais, sem uma linguagem visual partilhada.

A Federação Portuguesa de Futebol tinha um ecossistema com mais de 40 produtos digitais, desenvolvidos de forma independente e com diferentes padrões visuais e de interação.

O desafio era criar um Design System capaz de unificar estas experiências, reduzir inconsistências e facilitar o desenvolvimento e manutenção dos produtos.

Enquanto UX/UI Designer, participei na investigação inicial e fui responsável pelo **desenho dos componentes, organização dos Design Tokens e documentação da biblioteca em Figma**. Participei também nas apresentações ao cliente e, após a entrega, continuei a trabalhar na evolução do sistema durante mais um ano.

![Os quatro produtos prioritários antes do Design System: Resultados, Bilheteira, site institucional e Portugal Store.](images/fpf/01-contexto.webp?v=4)

## Compreender antes de construir

Antes de desenhar, precisávamos de confirmar a necessidade do sistema. A equipa mapeou os produtos, entrevistou diferentes departamentos e realizou uma auditoria às interfaces.

A análise identificou **27 componentes e 1.313 variações**, revelando inconsistências entre elementos com a mesma função.

![Excerto do inventário: botões e cards de resultados com a mesma função e tratamentos diferentes.](images/fpf/02-inventario.webp?v=5)

:::stats
27 | componentes identificados
1.313 | variações, entre estrutura e estados
:::

Em vez de tentar abranger todo o ecossistema, definimos quatro plataformas prioritárias: Resultados, Bilheteira, site institucional e Portugal Store.

Esta abordagem permitiu começar com um âmbito controlado e construir uma base preparada para crescer.

## Construir um sistema escalável

Com a investigação concluída, fui responsável por transformar os elementos identificados numa biblioteca de componentes reutilizáveis.

Comecei por estruturar os **Design Tokens**, centralizando cores, tipografia, espaçamentos e raios. Esta organização permitiu estabelecer referências partilhadas e simplificar futuras alterações.

![As variáveis em duas coleções, Primitives e Tokens, com quatro modos. O mesmo token, Colour/Action/high, alimenta o botão e o toggle em modo claro e escuro.](images/fpf/03-tokens.webp?v=4)

Os componentes foram organizados com variantes, propriedades e estados de interação. No caso dos botões, por exemplo, definimos cinco níveis de destaque: Primário, Secundário, Outlined, Ghost e Destrutivo.

![O botão: cinco níveis de destaque nos estados Rest, Hover, Pressed e Focus, com as propriedades do componente e as medidas de construção.](images/fpf/04-botao.webp?v=4)

A acessibilidade também fez parte do processo, utilizando as WCAG 2.1 como referência. Um exemplo foi a definição de um estado de foco com a cor `#3366FF` e um contorno branco para melhorar a visibilidade em diferentes fundos.

![O estado de foco num fundo claro e num fundo escuro. Nos dois fundos em que o azul não chega ao contraste mínimo, o contorno branco garante a visibilidade.](images/fpf/05-foco.webp?v=4)

Para facilitar a utilização, organizámos a biblioteca num único ficheiro Figma, com documentação individual dos componentes, regras de utilização, Design Tokens e Changelog.

![A estrutura de páginas do ficheiro e duas páginas reais da documentação do botão.](images/fpf/06-documentacao.webp?v=4)

## Da biblioteca aos produtos reais

Após seis meses de desenvolvimento, o Design System começou a ser integrado nos produtos da FPF.

Dos quatro produtos iniciais, **dois alcançaram adoção completa**, o site institucional e a Portugal Store. O sistema chegou também a cerca de oito projetos de backoffice, enquanto a plataforma Score alcançou uma adoção praticamente total.

Os novos projetos passaram a utilizar o Design System desde o início.

![Componentes partilhados no site Resultados e no site institucional.](images/fpf/07-aplicacao.webp?v=4)

Durante o ano seguinte, continuei a acompanhar a manutenção e evolução da biblioteca, respondendo a novas necessidades através de tickets, incluindo componentes de tabelas para a plataforma Score.

## Resultados e aprendizagens

O projeto estabeleceu uma linguagem visual partilhada e uma base reutilizável para diferentes produtos da FPF.

**Resultados principais:**

:::stats
2/4 | produtos iniciais com **adoção completa**: site institucional e Portugal Store
~8 | projetos de backoffice, a maioria com **adoção parcial**; o Score com adoção praticamente total
100% | dos novos projetos construídos com o Design System, segundo os resultados acompanhados
12 | meses adicionais de manutenção e evolução
:::

A maior aprendizagem foi perceber que **o sucesso de um Design System depende tanto da sua construção como da sua adoção**.

A implementação parcial em algumas plataformas mostrou a importância de envolver os decisores desde o início. A colaboração mais próxima com desenvolvimento teria também facilitado o alinhamento entre design e implementação.

Esta experiência reforçou a minha capacidade de pensar para além de interfaces individuais, criando soluções consistentes, documentadas e preparadas para evoluir com as necessidades dos produtos.
