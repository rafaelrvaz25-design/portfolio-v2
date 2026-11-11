# Case study 02: RRS, Pingo Doce

## Simplificar a correção de artigos no self-checkout do Pingo Doce

### Ficha rápida
- **Cliente:** Pingo Doce
- **O meu papel:** UX/UI Designer
- **Setor:** Retalho

---

## O desafio

### Corrigir uma transação não devia exigir navegar por um sistema inteiro.

Nos quiosques RRS da Comida Fresca, os artigos do tabuleiro são reconhecidos automaticamente. Para corrigir uma transação, o supervisor entrava em Modo Direto e usava uma pequena janela do sistema POS, no topo do ecrã. Uma tarefa simples tornava-se mais trabalhosa do que o necessário.

O objetivo era criar uma funcionalidade dedicada para adicionar e remover artigos, integrada na interface existente e adaptada ao equipamento.

Fui o único UX/UI Designer do projeto: analisei o fluxo original e desenhei a solução em colaboração com dois developers da Fujitsu.

![O fluxo original: do menu do supervisor ao Modo Direto, onde a correção acontecia na janela do POS. Screenshots do briefing, com as marcações a vermelho originais.](images/rrs/01-contexto.webp?v=1)

## Desenhar dentro das limitações

### Uma solução simples era também a mais adequada ao equipamento.

Recebi o problema já identificado e analisei o fluxo existente através de uma sequência de screenshots partilhada pela equipa.

O prazo de duas semanas e o hardware condicionavam as opções: o RRS não suporta imagens de produtos nem processamento mais exigente.

Uma das primeiras abordagens incluía imagens e ícones, mas foi descartada por não ser compatível com o equipamento. Com os developers, optámos por texto, listas e categorias: a clareza tinha de vir da organização, não dos recursos gráficos.

![À esquerda, a exploração inicial com imagens de produto, descartada. À direita, a solução escolhida, só com texto e listas.](images/rrs/02-exploracao.webp?v=1)

## Simplificar os fluxos de correção

### Duas operações diferentes exigiam comportamentos diferentes.

Os dois percursos começam no mesmo sítio. Uma nova opção, Editar tabuleiros, mostra a transação organizada por tabuleiro, a mesma lógica do cesto do cliente.

Na remoção, o supervisor retira um artigo de cada vez e escolhe o motivo: erro no reconhecimento, artigo duplicado ou desistência do cliente. É um passo obrigatório, porque o Pingo Doce exige que o motivo seja sempre indicado.

Na adição, pode selecionar vários artigos por categoria antes de confirmar, sem repetir a ação para cada produto.

![Os dois percursos com os ecrãs finais. Remover: um artigo de cada vez, com motivo obrigatório. Adicionar: seleção múltipla por categoria.](images/rrs/03-fluxos.webp?v=1)

Colocámos a funcionalidade no menu do supervisor, ao lado de Apagar transação, numa área que ele já conhece. Assim, corrigir artigos deixou de depender da janela do POS.

![O menu do supervisor antes e depois: Editar tabuleiros fica ao lado de Apagar transação.](images/rrs/04-menu.webp?v=1)

## Da proposta à implementação

### Uma solução viável, aprovada e preparada para o contexto real.

Ao longo das duas semanas, discuti as decisões de interface diretamente com os developers da Fujitsu, para garantir que respeitavam as limitações técnicas do RRS.

A proposta final foi apresentada e aprovada pela Fujitsu e pelo Pingo Doce, e chegou depois a produção.

![Ecrãs da proposta final aprovada, em Figma: lista por tabuleiro, seleção de artigos e motivo da remoção.](images/rrs/05-interface.webp?v=2)

## Resultados e aprendizagens

Este projeto permitiu-me assumir o desenho de uma solução completa, num prazo curto e com restrições técnicas concretas.

A principal aprendizagem foi perceber que **uma boa experiência não precisa de ser visualmente complexa**. Precisa de responder ao problema, respeitar o contexto de utilização e ser tecnicamente viável.

A aprovação da Fujitsu e do Pingo Doce confirmou a aceitação da proposta, mas não houve testes de usabilidade com os supervisores. Num projeto semelhante, procuraria complementar essa aprovação com validação direta junto de quem usa o equipamento.
