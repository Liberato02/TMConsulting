# Soul Game | TM Consulting

Projeto desenvolvido para o Challenge da FIAP em parceria com a SoulUp.

A proposta do projeto é utilizar elementos de gamificação para incentivar o
engajamento dos usuários através de desafios, recompensas e participação
ativa dentro da plataforma.

> 📌 **Nota de versão**: este README documenta a versão migrada para
> **React + TypeScript** (Sprints 3 e 4). A versão original em HTML/CSS/JS
> puro (Sprint 2) está preservada no histórico do Git.

## 📑 Navegação

- [Objetivo do Projeto](#objetivo-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Estrutura de Páginas](#estrutura-de-páginas)
- [Integrantes](#integrantes)
- [Como Rodar o Projeto](#️-como-rodar-o-projeto)
- [Roadmap do Projeto](#roadmap-do-projeto)
- [Próximos Passos](#próximos-passos)
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

## 📂 Estrutura de Pastas

```
📁 soulgame-academico
│
┣ 📁 src
┃ ┣ 📁 assets              → imagens (fotos da equipe, ícones)
┃ ┣ 📁 components          → componentes reutilizáveis (Navbar, Footer)
┃ ┣ 📁 context             → contextos globais (autenticação, notificações)
┃ ┣ 📁 data                → dados tipados (atividades, integrantes, conversão)
┃ ┣ 📁 hooks               → hooks customizados (useAuth, useToast)
┃ ┣ 📁 layouts             → layout compartilhado (Navbar + Footer + Outlet)
┃ ┣ 📁 routes              → uma pasta por rota (index.tsx dentro de cada)
┃ ┃ ┣ 📁 home
┃ ┃ ┣ 📁 sobre
┃ ┃ ┣ 📁 faq
┃ ┃ ┣ 📁 integrantes
┃ ┃ ┣ 📁 contato
┃ ┃ ┣ 📁 login
┃ ┃ ┣ 📁 cadastro
┃ ┃ ┣ 📁 desafios
┃ ┃ ┣ 📁 admin-cadastros
┃ ┃ ┣ 📁 error
┃ ┃ ┗ 📄 RotaProtegida.tsx
┃ ┣ 📁 schemas             → validação de formulários (Zod)
┃ ┣ 📁 theme               → referência da paleta de cores
┃ ┣ 📁 types               → contratos de dados (TypeScript)
┃ ┣ 📄 App.tsx             → roteamento principal
┃ ┣ 📄 main.tsx            → ponto de entrada da aplicação
┃ ┗ 📄 index.css           → estilos globais (Tailwind)
┃
┣ 📁 docs
┃ ┗ 📄 EXPLICACAO_DO_PROJETO.md   → explicação detalhada da arquitetura
┃
┣ 📄 .gitignore
┣ 📄 index.html
┣ 📄 package.json
┗ 📄 README.md
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

### Desafios — `/desafios` 🔒
Painel de gamificação (rota protegida — exige login):
- nível, sequência de dias (streak) e pontos totais;
- conversão de pontos em reais (R$ 0,009 por ponto);
- lista das 6 atividades oficiais de impacto social/ambiental.

### Admin/Cadastros — `/admin/cadastros` 🔒
Painel do time interno (rota protegida — exige login como admin):
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

## ⚙️ Como Rodar o Projeto

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd soulgame-academico

# Instalar as dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Rodar o linter
npm run lint
```

A aplicação sobe em `http://localhost:5173` por padrão.

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

🔗 [Acessar Repositório](<URL_DO_REPOSITORIO>)

## Status do Projeto

🟡 **Em desenvolvimento** — versão acadêmica funcional (front-end completo,
integração com back-end Java em andamento).
