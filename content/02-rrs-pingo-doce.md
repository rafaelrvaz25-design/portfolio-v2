# Case study 02: RRS, Pingo Doce

## Simplificar a correção de artigos no quiosque de self-checkout do Pingo Doce

### Ficha rápida
- **Papel:** UX/UI Designer, na Monday
- **Cliente:** Fujitsu, para o Pingo Doce
- **Modelo:** pacote de horas contratado à Monday
- **Dispositivo:** RRS, o quiosque de self-checkout da Comida Fresca
- **Duração:** 2 semanas
- **Equipa:** eu, como único designer, com 2 desenvolvedores da Fujitsu; sessões mediadas por um gestor de projeto da Monday
- **Impacto:** em produção nas lojas Pingo Doce. Corrigir um tabuleiro deixou de passar pelo POS e passou a ter um fluxo próprio no menu do supervisor, com o motivo de cada remoção sempre registado

---

## Visão geral

O RRS é um quiosque que lê o tabuleiro do cliente por câmara e sensores, sem que o cliente registe qualquer artigo. Quando a leitura falhava, o supervisor tinha de corrigir a transação numa janela pequena do sistema de faturação. Em duas semanas desenhei uma opção dedicada para editar tabuleiros, dentro das limitações técnicas da máquina e das exigências do Pingo Doce.

### O meu papel
Fui o único designer do projeto. Trabalhei diretamente com os dois desenvolvedores da Fujitsu, em sessões mediadas por um gestor de projeto da Monday, desde o briefing até aos ecrãs finais.

## Problema

**Contexto.** A Fujitsu contrata à Monday um pacote de horas para responder a pedidos sobre as máquinas do Pingo Doce: alterações de fluxo, novos requisitos legais, novos métodos de pagamento. Cada pedido chega com o seu próprio briefing, limitações técnicas e exigências do cliente.

**A dor.** Quando havia um problema numa transação, o operador passava o cartão de supervisor e entrava em Modo Direto, que abre o POS. A janela do POS ocupa só uma pequena parte do ecrã, e o briefing da Fujitsu trazia a queixa dos operadores: corrigir ou remover um artigo ali era difícil.

**Objetivo.** Permitir ao supervisor remover e adicionar artigos de forma simples, sem sair do ecrã do RRS.

**Restrições.**
- **Técnicas:** para ser rápido e focado no reconhecimento de artigos, o RRS não suporta imagens nem grandes processamentos.
- **De negócio:** o motivo da remoção de um artigo tem de ser sempre indicado.

## Processo

### Perceber a máquina antes do ecrã
As limitações do RRS eliminavam à partida muitas soluções visuais, como menus com ícones ou imagens dos produtos. Cheguei a explorar uma versão com imagens de produto, mas não servia de nada desenhar um ecrã bonito e cheio de funcionalidades que o RRS não conseguia comportar.

### Decisões
- **Só texto e listas.** Sem imagens, a clareza tinha de vir da organização: artigos agrupados por tabuleiro e, na adição, por categoria.
- **Manter a lógica do cesto.** A lista por tabuleiro segue a forma como o cliente já pensa na compra, por isso o supervisor reconhece o que está a ver.
- **O motivo como passo obrigatório.** Em vez de um campo opcional, remover um artigo abre um modal com os motivos possíveis: erro no reconhecimento, artigo duplicado por engano ou cliente desistiu do artigo.
- **Remover um a um, adicionar em volume.** Remoções são correções pontuais; adições podem envolver vários artigos, por isso a adição permite seleção múltipla.
- **Junto do que já existe.** A nova opção fica no menu do supervisor, ao lado de Apagar transação, onde o supervisor já procura este tipo de ação.

## Solução

### Remover um artigo (3 ecrãs)
1. Ecrã de acesso ao supervisor, depois de passar o cartão.
2. Lista por tabuleiro, mantendo a lógica do cesto.
3. Modal com os motivos de remoção.

### Adicionar artigos (3 ecrãs)
1. Lista por tabuleiro, mantendo a lógica do cesto.
2. Lista de artigos, organizada por categoria.
3. Seleção múltipla de artigos.

## Resultados

Editar tabuleiros passou a fazer parte do menu do supervisor e os dois fluxos já estão em produção nas lojas Pingo Doce, sem problemas reportados na implementação.

- **Para os supervisores:** corrigir um artigo deixou de exigir a janela pequena do POS.
- **Para o Pingo Doce:** cada remoção fica registada com um motivo, como era exigido.
- **Para a Fujitsu:** uma solução que cabe nas limitações técnicas do RRS.

## Aprendizagens

### O que funcionou
- **Começar pelas limitações.** Conhecer cedo o que o RRS não suporta poupou tempo em soluções que nunca iriam ser implementadas.
- **Falar diretamente com quem implementa.** Discutir as soluções com os desenvolvedores da Fujitsu, sessão a sessão, manteve o design dentro do que era possível construir.

### O que faria diferente
- **Ouvir os supervisores nas lojas.** Num projeto de duas semanas havia pouca margem, mas falar diretamente com supervisores do Pingo Doce teria ajudado a identificar outros pontos de fricção além do que vinha no briefing.

### O que desenvolvi
- Desenhar para hardware com recursos limitados.
- Trabalhar como único designer, diretamente com a equipa de desenvolvimento do cliente, num prazo curto.

---

## Imagens necessárias
1. O RRS na loja (quiosque da Comida Fresca).
2. Modo Direto: a janela pequena do POS dentro do ecrã.
3. A exploração descartada com imagens de produto.
4. Fluxo de remoção: os 3 ecrãs.
5. Fluxo de adição: os 3 ecrãs.
