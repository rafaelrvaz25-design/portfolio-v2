# Case study 03: Monday Talent Pool

## Tornar mais clara e acessível a página do candidato da Talent Pool da Monday

### Ficha rápida
- **Cliente:** Monday
- **O meu papel:** UX/UI Designer
- **Setor:** Recursos humanos

---

## O desafio

### Uma página funcional que ainda não parecia da Monday.

A Talent Pool é a ferramenta interna onde a Monday guarda os CVs que recebe, os pesquisa por competência e mantém o contacto com as pessoas ao longo do tempo.

A única parte que alguém de fora vê é a página do candidato. Abre a partir de uma ligação individual e temporária enviada por email, sem conta nem password. Ali, o candidato pode confirmar que quer continuar na pool, enviar um CV novo sem apagar os anteriores, pedir a correção ou eliminação dos dados, gerir os emails que recebe e fazer perguntas a um assistente.

O sistema já funcionava, mas a página não tinha logótipo nem cor da marca e usava o seletor de ficheiro do browser. A equipa pediu-me para a melhorar sem mexer na lógica existente: **sem login, sem dados pessoais no endereço, sem checkbox de RGPD e com um assistente que só responde com textos aprovados**.

Fui responsável pela análise da página, pelo Design Critique, pela auditoria de acessibilidade, pelo design em desktop e mobile e pelo handoff para desenvolvimento.

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

**Confirmar a permanência.** O cartão escuro tanto parecia um botão como um estado. Passou a ter um botão **Confirmar**, que depois do clique dá lugar a "Perfil confirmado", com a data da próxima pergunta e a opção de cancelar. Ação e estado deixam de se confundir.

![Confirmar a permanência: de um cartão entre ação e estado para uma ação explícita que se transforma em estado.](images/monday/05a-confirmar.webp?v=1)

**Preferências de comunicação.** "Ainda não decidido" não dava forma de mudar a escolha. Cada linha tem agora um **toggle** que grava no momento, e "Não quero receber futuras oportunidades" deixou de ser um cartão à parte para passar a ser o toggle "Sobre novas vagas". Todas as escolhas de contacto ficam num só sítio, e a pessoa continua na pool mesmo que deixe de receber emails.

![Preferências de comunicação: as escolhas de contacto num só sítio, cada uma com o seu controlo.](images/monday/05b-preferencias.webp?v=1)

**Envio de CV.** No original, a confirmação surgia num aviso no topo da página, longe de onde a ação aconteceu. O novo seletor mostra o nome do ficheiro e, depois do envio, a confirmação aparece no próprio cartão, com o ficheiro na lista e a tag "Novo". Os CVs anteriores ficam guardados.

![Envio de CV: seletor com a identidade da página e confirmação no próprio cartão.](images/monday/05c-envio-cv.webp?v=1)

**Pedido de correção ou eliminação de dados.** Esta ação tem consequências diferentes de confirmar a permanência, mas só se distinguia por um contorno tracejado. Passou a usar o botão secundário, a indicar o prazo habitual e a não ter "Cancelar", porque o pedido segue um caminho próprio e auditável.

![Pedido de correção ou eliminação: botão próprio, prazo e confirmação sem volta atrás.](images/monday/05d-pedido-dados.webp?v=1)

A linguagem acompanhou estas mudanças: datas em formato longo, "Última atividade" em vez de "Última vez que fizeste alguma coisa aqui", ortografia uniforme e a etiqueta "Assistente" para ficar claro que não é uma pessoa.

## Uma experiência que pertence à Monday

### Uma origem reconhecível, numa página aberta a partir de um email.

A ausência de identidade visual tornava mais difícil reconhecer a origem da página. Como o acesso acontece através de uma ligação recebida por email, sem conta, integrar o logótipo e os elementos visuais da Monday foi também uma forma de tornar a experiência mais reconhecível e transmitir confiança.

Não criei um sistema novo. Apliquei a cor, a tipografia **Archivo** e os componentes que a Monday já tinha na sua biblioteca de Figma. Os valores novos que a acessibilidade exigiu ficaram numa coleção local, sem alterar a biblioteca partilhada.

![Tokens e componentes usados na página, com os nomes e os ids do Figma.](images/monday/06-identidade-componentes.webp?v=1)

## Acessibilidade como parte do processo

### Medir os tokens reais, em vez de avaliar a olho.

Com a proposta desenhada, fiz uma auditoria ao frame principal com as **WCAG 2.1 AA** como referência, a partir dos valores exatos dos tokens no Figma. Identificou nove problemas.

:::stats
2 | problemas **críticos**: contraste do botão primário e do link para a política de dados
4 | problemas **graves**, ligados a contraste, contornos de controlos e áreas interativas
3 | problemas **menores**, incluindo pontos que só se validam na implementação
5,18:1 | contraste final do botão primário, que estava em **2,86:1**
:::

O texto branco sobre o verde `#7FA369` ficava abaixo dos 4,5:1 exigidos para texto normal. Escureci a cor de ação para `#3F7A3A` e revi os restantes pares que falhavam. Na especificação final, todos os pares medidos cumprem os critérios de contraste aplicáveis.

![Contrastes medidos na auditoria e na especificação final.](images/monday/07a-contraste.webp?v=1)

Na proposta final, os botões passaram a ter 44 px de altura e a text area ficou especificada com um label. Os toggles (40 × 24 px) e os chips (28 px) mantiveram o tamanho por decisão de design: cumprem o mínimo de 24 × 24 px do WCAG 2.2, mas não os 44 × 44 px que a auditoria sugeria.

![Controlos revistos na proposta final.](images/monday/07b-controlos.webp?v=1)

As melhorias aplicáveis a componentes partilhados da ferramenta foram documentadas como recomendações para implementação futura. A navegação por teclado e a utilização com leitores de ecrã não se avaliam num frame estático, por isso ficaram identificadas como pontos a validar no produto implementado.

## Desenhar para além do estado inicial

### Cada ação muda o seu próprio cartão, sem modais.

Desenhei o que acontece depois de cada ação e o percurso fora do ideal: ficheiros inválidos, falhas de rede, campos vazios, ausência de documentos e ligações expiradas. **Os botões nunca ficam desativados**: se algo falha, a mensagem aparece por baixo do controlo e o estado anterior mantém-se.

![Seis dos estados desenhados, dos frames de interações, erros e ligação expirada.](images/monday/08-estados.webp?v=1)

A página foi desenhada a 1280 e a 390 px, com a mesma ordem de conteúdos. Em mobile, os botões ocupam a largura do cartão, o seletor de ficheiro fica a toda a largura, as perguntas sugeridas passam a uma por linha e as preferências quebram linha ao lado do toggle.

![Desktop e mobile à mesma escala.](images/monday/09a-responsive.webp?v=1)

![Preferências e perguntas sugeridas em desktop e em mobile.](images/monday/09b-responsive-detalhe.webp?v=1)

## Do design à implementação

### Um handoff com o que o Figma não mostra sozinho.

Com o design concluído, preparei o handoff e enviei-o diretamente à equipa técnica: os seis frames finais, os tokens, a especificação de cada componente, os estados antes e depois de cada ação, as regras responsivas e os casos limite.

Incluí também a estrutura de títulos e landmarks, toggles anunciados como interruptores, mensagens comunicadas a tecnologias de apoio, o foco visível e as decisões ainda em aberto. O briefing pedia português e inglês; a versão final documenta apenas português, por decisão de design registada no handoff.

![Excerto do handoff: medidas do cartão de ação, tokens e estados de foco.](images/monday/10-handoff.webp?v=1)

## Entrega e aprendizagens

### Uma proposta documentada e entregue para implementação.

O projeto resultou numa proposta de interface mais alinhada com a identidade da Monday, com ações mais explícitas, preferências de comunicação mais claras e estados preparados para diferentes situações de utilização.

A auditoria de acessibilidade orientou ajustes no design final e permitiu documentar recomendações para melhorias futuras em componentes partilhados da ferramenta. O design e o handoff foram entregues à equipa técnica para implementação.

:::stats
6 | frames finais entregues: desktop, mobile, interações, erros, ligação expirada e foco
3 | documentos de suporte: **Design Critique**, auditoria de acessibilidade e handoff
:::

![A página depois das ações em desktop e a parte inferior da versão mobile.](images/monday/11-final.webp?v=1)

Este projeto reforçou a importância de analisar antes de desenhar, preservar o que já funciona e integrar a acessibilidade nas decisões de design. Mostrou-me também que **medir vale mais do que avaliar a olho**: no Design Critique, alguns textos cinzentos pareciam ter pouco contraste e afinal passavam, enquanto o verde dos botões parecia correto e falhava por uma margem grande.
