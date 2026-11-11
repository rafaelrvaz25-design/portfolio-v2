# Case study 02: RRS, Pingo Doce

## Simplificar a correção de artigos no self-checkout do Pingo Doce

Uma funcionalidade para os supervisores adicionarem e removerem artigos nos quiosques de self-checkout RRS da Comida Fresca. Desenhei-a em duas semanas, como único designer, com dois developers da Fujitsu. A proposta foi aprovada pela Fujitsu e pelo Pingo Doce.

### Ficha rápida
- **Papel:** UX/UI Designer
- **Cliente:** Pingo Doce
- **Setor:** Retalho alimentar
- **Duração:** 2 semanas
- **Equipa:** Único designer, 2 developers

---

## O desafio

### Corrigir uma transação não devia exigir navegar por um sistema inteiro.

Nos quiosques RRS da Comida Fresca, os artigos do tabuleiro são reconhecidos automaticamente. Para corrigir uma transação, o supervisor entrava em Modo Direto e usava uma pequena janela do sistema POS, no topo do ecrã. Uma tarefa simples tornava-se mais trabalhosa do que o necessário.

O objetivo era criar uma funcionalidade dedicada para adicionar e remover artigos, integrada na interface existente e adaptada ao equipamento.

![O fluxo original: do menu do supervisor ao Modo Direto, onde a correção acontecia na janela do POS. Screenshots do briefing, com as marcações a vermelho originais.](images/rrs/01-contexto.webp?v=1)

## Desenhar dentro das limitações

### Uma solução simples era também a mais adequada ao equipamento.

O problema chegou já identificado. Não usei o equipamento: analisei o fluxo existente através de uma sequência de screenshots partilhada pela equipa.

O prazo de duas semanas e o hardware condicionavam as opções, porque o RRS não suporta imagens de produtos nem processamento mais exigente. Uma das primeiras abordagens incluía imagens e ícones, mas foi descartada por não ser compatível com o equipamento. Com os developers, optámos por texto, listas e categorias: a clareza tinha de vir da organização, não dos recursos gráficos.

![À esquerda, a exploração inicial com imagens de produto, descartada. À direita, a solução escolhida, só com texto e listas.](images/rrs/02-exploracao.webp?v=1)

## Simplificar os fluxos de correção

### Duas operações diferentes exigiam comportamentos diferentes.

Os dois percursos começam no mesmo sítio. Uma nova opção, Editar tabuleiros, mostra a transação organizada por tabuleiro, a mesma lógica do cesto do cliente. A partir daí, adicionar e remover comportam-se de forma diferente:

- **Remover:** o supervisor retira um artigo de cada vez e escolhe o motivo (erro no reconhecimento, artigo duplicado ou desistência do cliente). O motivo é obrigatório, porque o Pingo Doce exige que fique sempre registado.
- **Adicionar:** pode selecionar vários artigos por categoria antes de confirmar, sem repetir a ação para cada produto.

![Os dois percursos com os ecrãs finais. Remover: um artigo de cada vez, com motivo obrigatório. Adicionar: seleção múltipla por categoria.](images/rrs/03-fluxos.webp?v=1)

A funcionalidade ficou no menu do supervisor, ao lado de Apagar transação. Em vez de um novo ponto de entrada, usámos uma área que o supervisor já conhece, e corrigir artigos deixou de depender da janela do POS.

![O menu do supervisor antes e depois: Editar tabuleiros fica ao lado de Apagar transação.](images/rrs/04-menu.webp?v=1)

## Da proposta à implementação

### Uma solução viável, discutida com quem a ia construir.

Ao longo das duas semanas, discuti as decisões de interface diretamente com os developers da Fujitsu, para garantir que respeitavam as limitações técnicas do RRS. As sessões eram mediadas por um gestor da nossa equipa.

A proposta final foi apresentada e aprovada pela Fujitsu e pelo Pingo Doce. Segundo a informação que recebi depois, a funcionalidade foi implementada nos quiosques.

![Ecrãs da proposta final aprovada, em Figma: lista por tabuleiro, seleção de artigos e motivo da remoção.](images/rrs/05-interface.webp?v=2)

## Resultados e aprendizagens

Entreguei o desenho completo da funcionalidade, aprovado pelo cliente e pelo parceiro técnico. Não houve testes de usabilidade com os supervisores, nem tenho dados sobre o efeito no tempo das correções.

A principal aprendizagem foi que, sem imagens nem efeitos, **a clareza tem de vir da estrutura**: separar os dois percursos e pôr a funcionalidade num sítio conhecido fez mais pela tarefa do que qualquer recurso visual. Num projeto semelhante, procuraria falar diretamente com supervisores das lojas, para validar a solução e encontrar outros pontos de fricção.
