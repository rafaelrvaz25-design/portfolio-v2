# Case study 03: Monday Talent Pool

## Tornar mais clara e acessível a página do candidato da Talent Pool da Monday

Revisão da página que os candidatos da Talent Pool abrem a partir de um email. Fiz a análise, o design em desktop e mobile, uma auditoria de acessibilidade e o handoff. O design foi entregue à equipa técnica para implementação.

### Ficha rápida
- **Papel:** UX/UI Designer
- **Cliente:** Monday
- **Setor:** Recrutamento

---

## O desafio

### Uma página funcional que ainda não parecia da Monday.

A Talent Pool é a ferramenta interna onde a Monday guarda e pesquisa os CVs que recebe. A única parte visível para quem está de fora é a página do candidato, que abre a partir de uma ligação temporária enviada por email, sem conta nem password. Ali, a pessoa confirma se quer continuar na pool, envia um CV novo, pede a correção ou eliminação dos dados, gere os emails e faz perguntas a um assistente.

A página funcionava, mas não tinha logótipo nem cor da marca e algumas ações eram ambíguas. O pedido era melhorá-la sem mexer na lógica existente: **sem login, sem dados pessoais no endereço, sem checkbox de RGPD e com um assistente que só responde com textos aprovados**.

Fui responsável pela análise da página, pela auditoria de acessibilidade, pelo design em desktop e mobile e pelo handoff para desenvolvimento.

![A página final em desktop e mobile, no estado inicial. Todos os dados são fictícios.](images/monday/01-hero.webp?v=1)

## Análise da experiência original

### A ambiguidade estava nas ações principais.

Comecei pelo briefing, pelo HTML e pelos dez estados da página, e fiz um **Design Critique** do ponto de vista de alguém de fora da empresa.

![O ponto de partida: o HTML original e as três observações que orientaram o trabalho.](images/monday/02-ponto-de-partida.webp?v=1)

Os problemas mais importantes estavam nas ações. O cartão "Quero continuar na Talent Pool" tanto parecia um botão como um estado, e as preferências mostravam "Ainda não decidido" sem forma de mudar a escolha. Havia também datas em formato ISO, etiquetas vagas e um assistente que não se identificava como automático.

A análise registou também o que devia ficar: a ausência de login, a linguagem simples e a transparência sobre o que acontece aos documentos.

## Decisões de interação

### A mesma estrutura, com ações que dizem o que fazem.

Mantive a coluna única e a ordem das secções, e mudei a forma como cada ação se apresenta e o que acontece depois.

**Confirmar a permanência.** Um botão **Confirmar** substitui o cartão ambíguo. Depois do clique, dá lugar a "Perfil confirmado", com a data da próxima pergunta e a opção de cancelar.

![Confirmar a permanência: de um cartão entre ação e estado para uma ação explícita que se transforma em estado.](images/monday/05a-confirmar.webp?v=1)

**Preferências de comunicação.** Cada linha tem um **toggle** que grava no momento, e "Não quero receber futuras oportunidades" passou a ser o toggle "Sobre novas vagas". As escolhas de contacto ficam num só sítio, e deixar de receber emails não tira a pessoa da pool.

![Preferências de comunicação: as escolhas de contacto num só sítio, cada uma com o seu controlo.](images/monday/05b-preferencias.webp?v=1)

**Envio de CV.** A confirmação surgia num aviso no topo da página, longe da ação. Passou para o próprio cartão, com o ficheiro na lista e a tag "Novo".

![Envio de CV: seletor com a identidade da página e confirmação no próprio cartão.](images/monday/05c-envio-cv.webp?v=1)

**Pedido de correção ou eliminação de dados.** Só se distinguia por um contorno tracejado. Passou a usar o botão secundário e a indicar o prazo habitual, e não tem "Cancelar", porque o pedido segue um caminho próprio e auditável.

![Pedido de correção ou eliminação: botão próprio, prazo e confirmação sem volta atrás.](images/monday/05d-pedido-dados.webp?v=1)

A linguagem também mudou: datas por extenso, etiquetas mais claras e "Assistente", para se perceber que não é uma pessoa.

## Identidade visual e acessibilidade

### Reconhecível como Monday, medida em vez de avaliada a olho.

Como a página abre a partir de um email, a identidade da Monday ajuda a reconhecer a origem. Não criei um sistema novo: apliquei a cor, a tipografia **Archivo** e os componentes da biblioteca da Monday.

Com a proposta desenhada, fiz uma auditoria ao frame principal com as **WCAG 2.1 AA** como referência, a partir dos valores exatos dos tokens. Identifiquei nove problemas: dois críticos, quatro graves e três menores. O mais claro estava no botão primário, com texto branco sobre o verde `#7FA369`. Escureci a cor de ação para `#3F7A3A` e revi os restantes pares que falhavam.

:::stats
2,86:1 | contraste do botão primário na auditoria, abaixo dos 4,5:1 exigidos
5,18:1 | contraste na especificação final, onde todos os pares medidos cumprem
:::

![Contrastes medidos na auditoria e na especificação final.](images/monday/07a-contraste.webp?v=1)

Os botões passaram a ter 44 px de altura e a text area ficou especificada com um label. Os toggles (40 × 24 px) e os chips (28 px) mantiveram o tamanho por decisão de design: cumprem o mínimo de 24 × 24 px do critério 2.5.8 das WCAG 2.2 (nível AA), mas não os 44 × 44 px do critério 2.5.5 (nível AAA), que a auditoria sugeria.

![Controlos revistos na proposta final.](images/monday/07b-controlos.webp?v=1)

A navegação por teclado e os leitores de ecrã não se avaliam num frame estático: ficaram como pontos a validar no produto. As melhorias para componentes partilhados ficaram documentadas como recomendações, fora desta entrega.

## Estados, responsividade e handoff

### Cada ação muda o seu próprio cartão, sem modais.

Desenhei o que acontece depois de cada ação e os percursos fora do ideal: ficheiros inválidos, falhas de rede, campos vazios, ausência de documentos e ligações expiradas. **Os botões nunca ficam desativados**: se algo falha, a mensagem aparece por baixo do controlo e o estado anterior mantém-se.

![Seis dos estados desenhados, dos frames de interações, erros e ligação expirada.](images/monday/08-estados.webp?v=1)

A página foi desenhada a 1280 e a 390 px, com a mesma ordem de conteúdos; em mobile, botões e seletor ocupam a largura do cartão.

![Desktop e mobile à mesma escala.](images/monday/09a-responsive.webp?v=1)

O handoff seguiu para a equipa técnica com a especificação dos componentes, estados, regras responsivas e casos limite, e com o que o Figma não mostra sozinho: estrutura de títulos e landmarks, toggles anunciados como interruptores e mensagens para tecnologias de apoio.

![Excerto do handoff: medidas do cartão de ação, tokens e estados de foco.](images/monday/10-handoff.webp?v=1)

## Resultados e aprendizagens

### Uma proposta documentada e entregue para implementação.

O resultado é uma proposta com ações mais explícitas, preferências mais claras, a identidade da Monday e estados para os casos fora do ideal. O design e o handoff foram entregues à equipa técnica para implementação.

Este projeto mostrou-me que **medir vale mais do que avaliar a olho**: no Design Critique, alguns textos cinzentos pareciam ter pouco contraste e afinal passavam, enquanto o verde dos botões parecia correto e falhava por uma margem grande. Mostrou-me também que preservar o que já funcionava, como o acesso sem login e a linguagem simples, foi tão importante como mudar o resto.
