# Case study 03: Monday Talent Pool

## Tornar mais clara e acessível a página do candidato da Talent Pool da Monday

### Ficha rápida
- **Áreas:** UX Analysis · Design Critique · Acessibilidade · UI Design · Responsive Design · Handoff
- **Empresa:** Monday
- **Contexto:** Projeto interno
- **Papel:** UX/UI Designer
- **Ano:** 2026
- **Estado:** Design entregue à equipa técnica para implementação

---

## O desafio

### Uma página funcional que ainda não parecia da Monday.

A Talent Pool é a ferramenta interna onde a Monday guarda os CVs que recebe, os pesquisa por competência e mantém o contacto com as pessoas ao longo do tempo.

A única parte que alguém de fora vê é a página do candidato. Abre a partir de uma ligação individual e temporária enviada por email, sem conta nem password. Ali, o candidato pode confirmar que quer continuar na pool, enviar um CV novo sem apagar os anteriores, pedir a correção ou eliminação dos dados, gerir os emails que recebe e fazer perguntas a um assistente.

O sistema já funcionava, mas a página não tinha logótipo nem cor da marca e usava o seletor de ficheiro do browser. A equipa pediu-me para a melhorar sem mexer na lógica existente: **sem login, sem dados pessoais no endereço, sem checkbox de RGPD e com um assistente que só responde com textos aprovados**.

![A página final em desktop e mobile, no estado inicial. Todos os dados são fictícios.](images/monday/01-hero.webp?v=1)

![O ponto de partida: o HTML original e as três observações que orientaram o trabalho.](images/monday/02-ponto-de-partida.webp?v=1)

## Compreender antes de desenhar

### A ambiguidade estava nas ações principais.

Comecei pelo briefing, pelo HTML e pelos dez estados da página partilhados pela equipa. Depois fiz um **Design Critique** centrado na usabilidade, na hierarquia, na consistência e na linguagem, do ponto de vista de alguém de fora da empresa.

O cartão "Quero continuar na Talent Pool" tanto parecia um botão como um estado. As preferências mostravam "Ainda não decidido" em todas as linhas, sem forma de mudar a escolha. Encontrei também datas em formato ISO, etiquetas vagas e um assistente que não se identificava como automático.

![Três observações do Design Critique, com a gravidade atribuída e a recomendação.](images/monday/03-design-critique.webp?v=1)

A análise registou também o que devia ficar: a ausência de login, a linguagem simples e a transparência sobre o que acontece aos documentos. Daqui saíram três prioridades: **ações evidentes, identidade Monday e acessibilidade**.

![Uma decisão visível na interface final para cada prioridade.](images/monday/04-objetivos.webp?v=1)

## Transformar observações em decisões

### A mesma estrutura, com ações que dizem o que fazem.

Mantive a coluna única e a ordem das secções. O trabalho esteve na forma como cada ação se apresenta e no que acontece depois de ser usada.

O cartão escuro deu lugar a um botão **Confirmar**. Depois do clique, o cartão passa a estado, com a data da próxima pergunta e a opção de cancelar.

![Confirmar a permanência: de um cartão entre ação e estado para uma ação explícita que se transforma em estado.](images/monday/05a-confirmar.webp?v=1)

Cada preferência tem agora um **toggle** que grava no momento. Como recomendava o Design Critique, "Não quero receber futuras oportunidades" deixou de ser um cartão à parte e passou a ser o toggle "Sobre novas vagas". A pessoa continua na pool; só deixamos de lhe escrever.

![Preferências de comunicação: as escolhas de contacto num só sítio, cada uma com o seu controlo.](images/monday/05b-preferencias.webp?v=1)

O envio de CV ganhou um seletor próprio e uma confirmação no cartão. O ficheiro entra na lista com a tag "Novo" e os anteriores ficam, porque um CV novo nunca substitui os outros.

![Envio de CV: seletor com a identidade da página e confirmação no próprio cartão.](images/monday/05c-envio-cv.webp?v=1)

O pedido de dados, que só se distinguia por um contorno tracejado, passou a usar o botão secundário, a indicar o prazo habitual e a não ter "Cancelar", porque segue um caminho próprio e auditável.

![Pedido de correção ou eliminação: botão próprio, prazo e confirmação sem volta atrás.](images/monday/05d-pedido-dados.webp?v=1)

A linguagem acompanhou estas mudanças: datas em formato longo, "Última atividade" em vez de "Última vez que fizeste alguma coisa aqui", ortografia uniforme e a etiqueta "Assistente" para ficar claro que não é uma pessoa.

## Uma experiência que pertence à Monday

### Aplicar a identidade existente, sem criar um sistema novo.

A Monday já tinha cor, tipografia e componentes na sua biblioteca de Figma. O cabeçalho passou a ter o logótipo e o nome "Talent Pool", a tipografia é **Archivo** e os componentes vêm da biblioteca.

Os valores novos que a acessibilidade exigiu ficaram numa coleção local "Talent Pool", sem alterar a biblioteca partilhada.

![Tokens e componentes usados na página, com os nomes e os ids do Figma.](images/monday/06-identidade-componentes.webp?v=1)

## Acessibilidade como parte do processo

### Medir os tokens reais, em vez de avaliar a olho.

Com a proposta desenhada, fiz uma auditoria ao frame principal com as **WCAG 2.1 AA** como referência, a partir dos valores exatos dos tokens no Figma.

:::stats
2 | problemas **críticos**: contraste do botão primário e do link para a política de dados
5 | problemas **graves**, entre placeholder, contornos, alvos de toque e rótulos repetidos
4 | problemas **menores**, incluindo pontos que só se validam na implementação
5,18:1 | contraste final do botão primário, que estava em **2,86:1**
:::

O texto branco sobre o verde `#7FA369` ficava abaixo dos 4,5:1 exigidos. Escureci a cor de ação para `#3F7A3A` e revi os restantes pares que falhavam.

![Contrastes medidos na auditoria e na especificação final.](images/monday/07a-contraste.webp?v=1)

Os botões passaram de 40 para 44 px de altura, no componente partilhado, e a text area ficou especificada com um label. Os toggles (40 × 24 px) e os chips (28 px) mantiveram o tamanho por decisão de design: cumprem o mínimo de 24 × 24 px do WCAG 2.2, mas não os 44 × 44 px que a auditoria sugeria.

![Controlos revistos na proposta final.](images/monday/07b-controlos.webp?v=1)

A auditoria foi feita sobre o design. A navegação por teclado e os leitores de ecrã ficaram documentados como pontos a verificar na implementação.

## Desenhar para além do estado inicial

### Cada ação muda o seu próprio cartão, sem modais.

Desenhei o que acontece depois de cada ação e o percurso fora do ideal: ficheiros inválidos, falhas de rede, campos vazios, ausência de documentos e ligações expiradas. **Os botões nunca ficam desativados**: se algo falha, a mensagem aparece por baixo do controlo e o estado anterior mantém-se.

![Seis dos estados desenhados, dos frames de interações, erros e ligação expirada.](images/monday/08-estados.webp?v=1)

A página foi desenhada a 1280 e a 390 px, com a mesma ordem de conteúdos. Em mobile, os botões ocupam a largura do cartão, o seletor de ficheiro fica a toda a largura, as perguntas sugeridas passam a uma por linha e as preferências quebram linha ao lado do toggle.

![Desktop e mobile à mesma escala.](images/monday/09a-responsive.webp?v=1)

![Preferências e perguntas sugeridas em desktop e em mobile.](images/monday/09b-responsive-detalhe.webp?v=1)

## Do design à implementação

### Um handoff com o que o Figma não mostra sozinho.

Escrevi o handoff para a equipa técnica: os seis frames finais, os tokens, a especificação de cada componente, os estados antes e depois de cada ação, as regras responsivas e os casos limite.

Incluí também a estrutura de títulos e landmarks, toggles anunciados como interruptores, mensagens comunicadas a tecnologias de apoio, o foco visível e as decisões ainda em aberto. O briefing pedia português e inglês; a versão final documenta apenas português, por decisão de design registada no handoff.

![Excerto do handoff: medidas do cartão de ação, tokens e estados de foco.](images/monday/10-handoff.webp?v=1)

## Resultados e aprendizagens

### Uma proposta clara, documentada e pronta para implementar.

O projeto resultou numa interface com a identidade da Monday, ações explícitas, preferências que se percebem e se alteram no próprio sítio, e estados desenhados para o percurso ideal e para os erros.

:::stats
6 | frames finais entregues: desktop, mobile, interações, erros, ligação expirada e foco
7/7 | pares de cor medidos na especificação final a cumprir **WCAG 2.1 AA**
44 px | de altura em todos os botões, definida no componente Button
3 | documentos entregues: **Design Critique**, auditoria de acessibilidade e handoff
:::

![A página depois das ações em desktop e a parte inferior da versão mobile.](images/monday/11-final.webp?v=1)

A implementação está com a equipa técnica. O próximo passo é validar a página construída, com uma passagem só com teclado e com leitores de ecrã.

A maior aprendizagem foi perceber que **medir vale mais do que avaliar a olho**. No Design Critique, alguns textos cinzentos pareciam ter pouco contraste e afinal passavam; o verde dos botões parecia correto e falhava por uma margem grande.
