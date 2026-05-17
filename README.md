# TM Consulting

# Integração Tecnológica (Sprint 1 e 2)
Nossa solução para o Challenge 2026 foi desenvolvida aplicando o conceito de separação de responsabilidades arquiteturais, unificando a inteligência lógica em backend/scripting ao design de engenharia front-end.

##  Descrição
Este projeto está sendo desenvolvido para o Challenge da FIAP, em parceria com a empresa SoulUp.

A proposta consiste em criar uma solução baseada em gamificação para incentivar ações sustentáveis entre os usuários da plataforma.

---

##  Objetivo
Desenvolver uma solução que represente um sistema de pontuação e ranking baseado em ações sustentáveis.

---

## Solução
A solução proposta utiliza um sistema de pontuação onde os usuários acumulam pontos ao realizar ações sustentáveis, como reciclagem...

Esses pontos são utilizados para gerar um ranking entre os usuários, incentivando o engajamento e a competitividade saudável.

---

##  Integrantes
- Vinicius Liberato dos Anjos - RM 571480 
- Jonatan Vieira Feitosa - RM 570452
- Fernando Oliveira Francelino Sardinha – RM 570196
- Marcelo Candido da Mata Junior - RM 569584

---
# Arquitetura Logística
O arquivo `main.py` contém o núcleo de regras de negócios estruturadas para o terminal, focado em **Computational Thinking**:
* **Estrutura Imutável**: Uso de `Tuplas` para fixação das diretrizes de ações sustentáveis aceitas pela Prospera (`Transporte Público`, `ECO Ponto`, `Energia Solar`).
* **Estrutura de Persistência**: Manipulação de listas compostas dinâmicas para armazenamento de usuários e saldos.
* **Validação**: Algoritmos de sanitização com `.strip()` para controle de entradas nulas e limitadores condicionais restritos para pontuações exclusivas de `0 a 100` pontos por atividade.
* **Controle Estrito**: Substituição de quebras bruscas de execução (`break`) por flags de controle lógico booleanas em laços `while`.

### Interface de Operação (Front-End)
A pasta web foi desenvolvida sob os rígidos critérios de padronização do **Guia de Estilo HTML/CSS do Google** e boas práticas da **W3C**:
* **Semântica HTML5**: Substituição de divisórias genéricas por blocos de conteúdo mapeados para acessibilidade (`header`, `main`, `section`, `footer`).
* **Design Responsivo (BEM CSS)**: Estilização limpa e escalável baseada na identidade visual corporativa da SoulUp, utilizando Grid e Flexbox nativos para sanar quebras de layout em dispositivos móveis.
* **JavaScript Engine**: O arquivo `./js/game.js` replica integralmente as regras matemáticas, ordenações decrescentes de ranking e comportamentos lógicos validados no script Python, promovendo uma experiência de usuário (UX) fluida e interativa.