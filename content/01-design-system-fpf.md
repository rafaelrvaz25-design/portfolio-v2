# Case study 01: Design System, FPF

## Um Design System para unificar mais de 40 produtos digitais da Federação Portuguesa de Futebol

### Ficha rápida
- **Papel:** UX/UI Designer, na Monday
- **Cliente:** Federação Portuguesa de Futebol (FPF)
- **Duração:** dezembro de 2023 a maio de 2024 (6 meses), seguidos de um ano de manutenção
- **Equipa:** 2 designers, 1 lead, 1 PM
- **Impacto:** adoção completa em 2 dos 4 produtos do scope, cerca de 8 backoffices fora do scope e 100% dos novos projetos construídos com o sistema

---

## Visão geral

A FPF tinha mais de 40 produtos digitais construídos de forma independente, cada um com as suas próprias decisões visuais. Em 6 meses criámos um Design System a partir dos 4 produtos que dão a cara à federação, com biblioteca e documentação num único ficheiro Figma. O sistema acabou por chegar além do scope inicial, e fiquei mais um ano na equipa da FPF a mantê-lo.

### O meu papel
Participei em todas as fases do projeto:
- **Pesquisa:** acompanhei as entrevistas com a minha colega, a registar e a complementar o trabalho dela.
- **Componentes:** desenhei todos os componentes do sistema.
- **Tokens:** organizei e criei o sistema de Design Tokens.
- **Documentação:** escrevi parte da documentação.
- **Entregas:** apresentei o trabalho ao cliente e discuti com ele os próximos passos.

## Problema

**Contexto.** Os produtos digitais da FPF tinham crescido em silos. O mesmo componente aparecia com estilos diferentes de produto para produto, e cada equipa voltava a resolver problemas que outra já tinha resolvido.

**A primeira pergunta.** Um Design System não é um projeto com fim: é um produto que exige manutenção contínua. Antes de propor um, quisemos confirmar que era mesmo preciso.

**Objetivo.** Uma linguagem visual e de interação comum aos principais produtos da federação, que facilitasse a implementação, a manutenção e a evolução ao longo do tempo.

**Restrições.**
- Mais de 40 produtos: impossível acertar em todos de uma só vez.
- O sistema tinha de servir produtos que já existiam, não só produtos novos.

## Processo

### Pesquisa
- Mapeámos os mais de 40 produtos digitais existentes.
- Entrevistámos vários departamentos para perceber as dores e as necessidades reais.
- Visitámos os produtos em scope e inventariámos o maior número possível de componentes, testando funcionalidades, navegação, hierarquia e estilo visual.

**Conclusão:** havia inconsistência visual e retrabalho suficientes para justificar o investimento. O inventário identificou **27 componentes** e **1313 variáveis**, entre estrutura (por exemplo, com ou sem ícone) e estados (rest, hover, pressed).

### Abordagem
Limitámos a primeira fase aos 4 produtos que davam a cara à federação: o site Resultados, a Bilheteira, o site institucional e a Portugal Store. Os restantes produtos ficariam para fases seguintes, integrados um de cada vez.

> "O mais importante nesta fase é melhorar o que já existe, não criar coisas novas. Limpar a casa antes de comprar um móvel novo."

### Decisões
- **Começar pequeno.** 4 produtos em vez de 40, para validar o sistema em produtos com visibilidade antes de o alargar.
- **Melhorar antes de inventar.** Os componentes nasceram do inventário do que já existia, não de uma página em branco.
- **Biblioteca e documentação no mesmo sítio.** Um único ficheiro Figma, para que quem usa um componente encontre logo a regra de como o usar.
- **Acessibilidade desde a construção.** Cada componente foi construído a cumprir os padrões do WCAG 2.1, em vez de ser corrigido depois.

## Solução

### Um ficheiro, publicado como biblioteca
O ficheiro abre com páginas de onboarding (Cover, Intro, Design Tokens e Changelog) antes de qualquer componente. Os componentes seguem por ordem alfabética, cada um na sua página, e o ficheiro é publicado como biblioteca para os produtos em scope.

### Design Tokens como base
Os valores visuais (cor, tipografia, espaçamento, raios) vivem como Design Tokens, numa página própria logo no início do ficheiro. Os componentes usam os tokens em vez de valores soltos, o que torna o sistema mais fácil de manter e de passar para desenvolvimento.

### Um estado de foco visível em qualquer fundo
O estado de foco usa uma cor própria, #3366FF, escolhida por se distinguir de todas as outras cores das plataformas. Nos fundos em que essa cor não cumpria o contraste mínimo, o estado de foco leva sempre um contorno branco, para que quem navega por teclado nunca perca a posição.

### Uma página por componente
Cada componente tem uma página com o componente e todas as suas variáveis, e documentação de construção, utilização, estilo visual e variantes.

### Exemplo: o botão
- **Utilização:** 5 níveis de destaque. Primário para a ação principal do ecrã, Secundário para a alternativa, Outlined para ações de baixa ênfase como "Ver tudo", Ghost para a ênfase mínima e Destrutivo para ações irreversíveis.
- **Construção:** padding horizontal de 16px, corner radius nano (4px), tipografia Barlow Condensed 20/28, texto centrado.
- **Estilo visual:** cada nível documentado nos estados Rest, Hover e Pressed.

## Resultados

Ao fim dos 6 meses:

| Âmbito | Adoção |
|--------|--------|
| Scope inicial (4 produtos) | Completa em 2 (site institucional e Portugal Store), parcial nos outros 2 |
| Fora do scope | Cerca de 8 projetos de backoffice, a maioria com adoção parcial |
| Plataforma Score | Praticamente 100% |
| Novos projetos | 100% desde o início |

**Porque é que a adoção ficou parcial em 2 produtos.** O ritmo da migração não dependia só do design: nesses produtos, as prioridades eram definidas pelas direções dos departamentos, e o Design System nem sempre estava no topo da lista.

**Depois.** A plataforma Score, com adoção total, gerou a maioria dos pedidos seguintes, sobretudo tabelas. As novas necessidades passaram a chegar como tickets para fases seguintes. Fiquei alocado à equipa da FPF durante mais um ano, a fazer a manutenção do Design System.

## Aprendizagens

### O que funcionou
- **Perguntar antes de construir.** Confirmar a necessidade com entrevistas deu argumentos para o investimento.
- **Um scope pequeno.** Começar por 4 produtos permitiu entregar um sistema usado de facto, que depois cresceu por procura (backoffices, Score).

### O que faria diferente
- **Aproximar-me da equipa de desenvolvimento.** Pela própria estrutura da FPF, a equipa de desenvolvimento estava muito afastada do design, e isso dificultou alguns pontos. Num próximo sistema, procuraria um contacto mais próximo e regular com quem o implementa.
- **Contar com as prioridades de quem decide.** A adoção depende tanto das direções dos departamentos como da qualidade do sistema. Envolvê-las mais cedo ajudaria a garantir espaço para a migração.

### O que desenvolvi
- Construir e organizar um sistema de Design Tokens de raiz.
- Apresentar o trabalho e negociar os próximos passos diretamente com o cliente.
- Manter um sistema em produção durante um ano, com novas necessidades a chegar como tickets.

---

## Imagens necessárias
1. Antes: o mesmo componente com estilos diferentes nos 4 produtos (inventário).
2. Os 4 produtos em scope: Resultados, Bilheteira, institucional, Portugal Store.
3. O ficheiro Figma: lista de páginas e canvas de um componente.
4. Documentação do botão: hierarquia, construção e estados.
5. Produtos construídos com o sistema, incluindo a plataforma Score.
