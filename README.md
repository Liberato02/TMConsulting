# Soul Game | TM Consulting

Projeto desenvolvido para o Challenge da FIAP em parceria com a SoulUp.

A proposta do projeto é utilizar elementos de gamificação para incentivar o
engajamento dos usuários através de desafios, recompensas e participação
ativa dentro da plataforma.

> **Nota de versão**: este README documenta a versão migrada para
> **React + TypeScript** (Sprints 3 e 4). A versão original em HTML/CSS/JS
> puro (Sprint 2) está preservada no histórico do Git.

## Navegação

- [Objetivo do Projeto](#objetivo-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Estrutura de Páginas](#estrutura-de-páginas)
- [Integrantes](#integrantes)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Testes Automatizados](#testes-automatizados)
- [Roadmap do Projeto](#roadmap-do-projeto)
- [Próximos Passos](#próximos-passos)
- [Maiores Dificuldades e Resoluções](#maiores-dificuldades-do-projeto-e-resoluções)
- [Contato](#contato)
- [Repositório do Projeto](#repositório-do-projeto)
- [Status do Projeto](#status-do-projeto)

## Objetivo do Projeto

O objetivo da solução é incentivar práticas sustentáveis e aumentar a
interação dos usuários utilizando mecânicas de gamificação de forma
simples, moderna e intuitiva — desafios com pontos, níveis e conversão
em valor monetário, sobre ações reais de impacto social e ambiental.

## Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Build tool | Vite |
| Biblioteca de UI | React 19 |
| Linguagem | TypeScript |
| Roteamento | React Router 7 |
| Estilização | Tailwind CSS 4 |
| Formulários | React Hook Form |
| Validação | Zod |
| Persistência | localStorage (Web Storage API) |
| Requisições HTTP | Fetch API nativa |
| Qualidade de código | oxlint |
| Versionamento | GitHub |
| Editor | Visual Studio Code |

## Estrutura de Pastas

```
soulgame-academico
│
├── src
│   ├── assets              → imagens (fotos da equipe, favicon, ícones)
│   ├── components          → componentes reutilizáveis (Navbar, Footer)
│   ├── context             → contextos globais (autenticação, notificações)
│   ├── data                → dados tipados (atividades, integrantes, conversão)
│   │   └── __tests__       → testes de conversão de pontos e integridade de dados
│   ├── hooks               → hooks customizados (useAuth, useToast, useTituloDocumento)
│   ├── layouts             → layout compartilhado (Navbar + Footer + Outlet)
│   ├── pages               → uma pasta por página (index.tsx dentro de cada)
│   │   ├── home
│   │   ├── sobre
│   │   ├── faq
│   │   ├── integrantes
│   │   ├── contato
│   │   ├── login
│   │   ├── cadastro
│   │   ├── desafios
│   │   ├── detalhe-atividades   → rota dinâmica (/desafios/:atividadeId)
│   │   ├── admin-cadastros
│   │   ├── error
│   │   └── RotaProtegida.tsx
│   ├── schemas             → validação de formulários (Zod)
│   │   └── __tests__       → testes de validação de idade mínima e login
│   ├── theme               → referência da paleta de cores
│   ├── types               → contratos de dados (TypeScript)
│   ├── App.tsx             → roteamento principal
│   ├── main.tsx            → ponto de entrada da aplicação
│   └── index.css           → estilos globais (Tailwind)
│
├── public
│   └── favicon.png         → ícone da aba do navegador
│
├── docs
│   └── EXPLICACAO_DO_PROJETO.md   → explicação detalhada da arquitetura
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Estrutura de Páginas

### Home — `/`
Página principal do projeto contendo:
- apresentação da solução (banner);
- vídeo explicativo;
- roadmap do projeto;
- navegação principal.

### Sobre — `/sobre`
Página responsável por explicar:
- objetivo do projeto;
- funcionamento da solução;
- tecnologias utilizadas.

### FAQ — `/faq`
Página contendo:
- perguntas frequentes (formato sanfona/acordeão);
- respostas sobre a solução.

### Integrantes — `/integrantes`
Página contendo:
- foto de cada integrante;
- nome completo, RM e turma;
- links de GitHub e LinkedIn;
- visual de rede/ecossistema conectando a equipe.

### Contato — `/contato`
Página contendo:
- formulário de contato (nome, e-mail, mensagem);
- envio via Fetch API nativa;
- feedback de carregamento/sucesso/erro.

### Login — `/login`
Formulário de autenticação, com sessão persistente entre recarregamentos.

### Cadastro — `/cadastro`
Formulário completo de criação de conta:
- nome, e-mail, senha, telefone, data de nascimento, cidade, estado;
- validação de idade mínima de 16 anos;
- seleção de tipo de conta (usuário / time interno).

### Desafios — `/desafios` (rota protegida)
Painel de gamificação, exige login:
- nível, sequência de dias (streak) e pontos totais;
- conversão de pontos em reais (R$ 0,009 por ponto);
- lista das 6 atividades oficiais de impacto social/ambiental.

### Admin/Cadastros — `/admin/cadastros` (rota protegida)
Painel do time interno, exige login como admin:
- cadastro de novas atividades;
- listagem das atividades já cadastradas.

### Página de erro — rota coringa
Qualquer URL inválida direciona para uma página 404 dedicada.

## Integrantes

| Integrante | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Vinicius Liberato dos Anjos | 571480 | 1TDSPY | [Liberato02](https://github.com/Liberato02) | [linkedin](https://br.linkedin.com/in/vinicius-liberato-b826a4312) |
| Jonatan Vieira Feitosa | 570452 | 1TDSPY | [Jonatanfeitosa](https://github.com/Jonatanfeitosa) | [linkedin](https://br.linkedin.com/in/jonatanvieirafeitosa) |
| Fernando Oliveira Francelino Sardinha | 570196 | 1TDSPY | [tecnando-rpa](https://github.com/tecnando-rpa) | [linkedin](https://www.linkedin.com/in/fernando-oliveira-1bb875164) |
| Marcelo Candido da Mata Junior | 569584 | 1TDSPY | [mdamata](https://github.com/mdamata) | [linkedin](https://br.linkedin.com/in/marcelo-da-mata) |
| Davi Felix Cunha | 569393 | 1TDSPY | [IsDevZ](https://github.com/IsDevZ) | [linkedin](https://www.linkedin.com/in/davi-felix-99b7a63a9) |

## Como Rodar o Projeto

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/Liberato02/TMConsulting.git
cd soulgame-academico

# Instalar as dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Rodar o linter
npm run lint

# Rodar os testes automatizados
npm run test
```

A aplicação sobe em `http://localhost:5173` por padrão.

## Testes Automatizados

O projeto usa **Vitest** para testes automatizados de lógica de negócio.
A suíte atual cobre 19 casos, distribuídos em três frentes:

| Arquivo | O que cobre |
|---|---|
| `src/schemas/__tests__/auth.test.ts` | Validação de idade mínima (16 anos), incluindo casos-limite; confirmação de senha; formato de e-mail; schema de login |
| `src/data/__tests__/conversao.test.ts` | Fórmula de conversão de pontos em reais (R$ 0,009/ponto) |
| `src/data/__tests__/atividades.test.ts` | Integridade das 6 atividades oficiais: ids únicos, pontuação positiva, categoria válida |

Comandos:

```bash
# Roda a suíte uma vez e encerra
npm run test

# Roda em modo observador, útil durante o desenvolvimento
npm run test:watch
```

## Roadmap do Projeto

1. Pesquisa do desafio
2. Planejamento da solução
3. Desenvolvimento do projeto
4. Testes e melhorias
5. Apresentação final

## Próximos Passos

- [ ] Deploy do front-end (Vercel) e do back-end (Railway/plataforma equivalente)
- [ ] Gravação do vídeo de apresentação e link no README
- [ ] Integração com a API Java (substituir `localStorage` por `fetch()`)
- [ ] Testes automatizados no backend Java
- [ ] Restrições `CHECK` no schema SQL

## Maiores Dificuldades do Projeto e Resoluções

Ao longo do desenvolvimento, alguns problemas reais apareceram — principalmente
depois de mesclar (merge) o trabalho de diferentes integrantes. Documentamos
aqui não só o que aconteceu, mas como cada um foi diagnosticado e corrigido,
porque isso também faz parte do aprendizado do projeto.

**1. Projeto dentro do OneDrive causando falhas intermitentes**

Como a pasta do projeto ficava sincronizada pelo OneDrive, arquivos como
`package.json` às vezes apareciam como inexistentes (`ENOENT: no such file
or directory`) mesmo estando visíveis no editor — o OneDrive não tinha
terminado de sincronizar o conteúdo real do arquivo. Resolvido forçando o
download do arquivo específico ("Sempre manter neste dispositivo").
Recomendação para o futuro: mover o projeto para fora de pastas
sincronizadas e usar o OneDrive só como backup via Git, não como pasta de
trabalho ativa.

**2. `node_modules` quase versionado no Git**

Em um dos primeiros commits, a pasta `node_modules` apareceu inteira na
área de staging, pronta para ser commitada por engano. O `.gitignore`
correto já existia; o problema era a ordem das operações. Resolvido com
`git rm -r --cached` nos casos já commitados, reforçando o hábito de
conferir a lista de mudanças antes de todo commit.

**3. Resíduos de conflito de merge mal resolvido**

Depois de mesclar branches de integrantes diferentes, apareceram bugs
sutis: fotos da equipe voltaram com nome capitalizado e extensão `.png`
em vez do padrão usado no código (`.jpg` minúsculo), quebrando o build em
sistemas sensíveis a maiúsculas/minúsculas; o arquivo de Integrantes
ficou com uma variável declarada duas vezes; e o import do CSS global
desapareceu do ponto de entrada da aplicação, fazendo o Tailwind parar
de carregar. Cada caso foi identificado comparando o build local (que
falhava com uma mensagem de erro específica) contra a versão anterior ao
merge, e corrigido restaurando o arquivo correto. Aprendizado para o
time: ao resolver conflitos de merge, escolher um lado, nunca aceitar os
dois sem revisar.

**4. Bug de fuso horário no cálculo de idade mínima**

A validação de idade mínima interpretava a data de nascimento com
`new Date(string)`, que o JavaScript trata como meia-noite em UTC. Como
o Brasil está em UTC-3, ler essa data com `getDate()`/`getMonth()`
(que retornam o valor no fuso local) fazia a data recuar um dia inteiro
perto da troca de dia, calculando a idade errada em casos-limite. O bug
foi encontrado por um teste automatizado específico para esse
caso-limite, que falhou na primeira execução. Corrigido construindo a
data manualmente a partir dos componentes ano/mês/dia, sempre em
horário local.

**5. `aria-label` usado incorretamente em elemento estático**

O container de notificações (toasts) tinha `aria-label` aplicado direto
numa `div` comum, sem nenhum `role` — leitores de tela ignoram o
atributo nesse caso. Corrigido adicionando `role="region"`, alinhado com
o material de acessibilidade da disciplina.

**O que isso ensinou ao time**

A maior lição não foi técnica, e sim de processo: quase todos os bugs do
item 3 só existiram depois de um merge, não durante o desenvolvimento
original de cada funcionalidade. Isso reforçou a importância de, depois
de qualquer merge, rodar a sequência completa
(`npm run lint && npx tsc --noEmit && npm run build && npm run test`)
antes de considerar o trabalho terminado.

## Contato

Caso tenha dúvidas, sugestões ou queira saber mais sobre o projeto, entre
em contato com nossa equipe.

**E-mail**: tmconsulting.challenge@gmail.com

**LinkedIn da equipe**:
- Vinicius Liberato: https://br.linkedin.com/in/vinicius-liberato-b826a4312
- Jonatan Feitosa: https://br.linkedin.com/in/jonatanvieirafeitosa
- Fernando Oliveira: https://www.linkedin.com/in/fernando-oliveira-1bb875164
- Marcelo da Mata: https://br.linkedin.com/in/marcelo-da-mata
- Davi Felix Cunha: https://www.linkedin.com/in/davi-felix-99b7a63a9

## Agradecimento

Agradecemos o interesse em nosso projeto desenvolvido para o Challenge
FIAP em parceria com a SoulUp.

## Repositório do Projeto

[Acessar Repositório](https://github.com/Liberato02/TMConsulting.git)

## Status do Projeto

**Em desenvolvimento** — versão acadêmica funcional (front-end completo,
com testes automatizados; integração com back-end Java em andamento). 