# SoulGame — Como o projeto funciona, pasta por pasta

> Esta explicação foi atualizada para a versão final (Sprints 3 e 4): o
> projeto deixou de simular um banco com `localStorage` e passou a
> consumir de verdade a API Java via `fetch()`, e ganhou o ecossistema
> completo de ODS (trilha, mapa, conquistas, campeonatos). A versão
> anterior desta explicação, baseada em `localStorage` e em uma pasta por
> rota, continua disponível no histórico do Git.

## A ideia geral primeiro

O React funciona assim: existe **UM** arquivo HTML (`index.html`), e tudo que você vê na tela é gerado por JavaScript/TypeScript "montando" pedaços (componentes) dentro dele. Quando você navega entre páginas, o navegador **não recarrega** — só troca o pedaço de componente que aparece, por isso o app parece rápido.

O ponto de entrada é `src/main.tsx`: ele pega o `<App />` e "planta" ele dentro da `<div id="root">` do `index.html`. Do `App.tsx` pra baixo, tudo é uma árvore de componentes.

---

## `App.tsx` — o mapa de tudo

É aqui que ficam declaradas todas as rotas (URLs) da aplicação e qual componente cada uma carrega. Também é aqui que os "Providers" (contextos globais — autenticação e notificações) envolvem toda a aplicação, pra que qualquer componente, em qualquer lugar da árvore, consiga acessar "quem está logado" ou "mostrar uma notificação" sem precisar passar isso manualmente de componente em componente.

```
ToastProvider          → disponibiliza notificações pra tudo
  AuthProvider          → disponibiliza "quem está logado" pra tudo
    BrowserRouter        → habilita navegação por URL
      Routes              → a lista de rotas
```

---

## `src/pages/` — uma pasta por página

Cada página mora na própria pasta, com um `index.tsx` dentro (estrutura oficial do Challenge). Assim, se uma página ganhar componentes ou testes próprios, eles ficam ao lado dela sem poluir o resto do projeto. Páginas restritas a um tipo de conta (`admin-cadastros`, `validador`) seguem a mesma regra.

| Pasta | Rota | O que faz |
|---|---|---|
| `home/` | `/` | Banner, vídeo de apresentação, roadmap |
| `sobre/` | `/sobre` | Texto sobre o projeto e tecnologias usadas |
| `faq/` | `/faq` | Perguntas frequentes, em formato "sanfona" |
| `integrantes/` | `/integrantes` | Fotos da equipe, efeito de rede/ecossistema |
| `contato/` | `/contato` | Formulário validado (React Hook Form + Zod) enviado via Fetch API |
| `login/` | `/login` | Autenticação |
| `cadastro/` | `/cadastro` | Cadastro completo (validação de idade mínima incluída) |
| `desafios/` | `/desafios` | Lista de ações sustentáveis, registro com foto de evidência obrigatória |
| `detalhe-atividade/` | `/desafios/:atividadeId` | **Rota dinâmica** — detalhes de uma atividade, lidos a partir da URL |
| `trilha/` | `/trilha` | Trilha de evolução do usuário |
| `mapa-ods/` | `/mapa-ods` | Os 17 ODS oficiais |
| `painel-conquistas/` | `/conquistas` | Conquistas desbloqueadas/disponíveis |
| `perfil/` | `/perfil` | Dados e avatar do usuário logado |
| `perfil-publico/` | `/perfil/:usuarioId` | **Rota dinâmica** — perfil de outro usuário, lido a partir da URL |
| `historico/` | `/historico` | Ações concluídas |
| `ranking/` | `/ranking` | Ranking geral; cada linha linka pra `/perfil/:usuarioId` |
| `comunidade-soulsport/` | `/comunidade` | Só pra contas tipo `soulsport` |
| `validador/` | `/validador` | Validação de evidências |
| `admin-cadastros/` | `/admin/cadastros` | Cadastro de atividades, só `admin` |
| `error/` | qualquer URL inválida | Página 404 |
| `RotaProtegida.tsx` | (não é uma página) | O "segurança": decide se deixa entrar numa rota ou manda pro login |

### Rota dinâmica, na prática

`/perfil/:usuarioId` é o exemplo de rota com **parâmetro na própria URL**
do projeto. No React Router, `:usuarioId` é um "espaço reservado" — a
URL real pode ser `/perfil/abc123`, `/perfil/xyz789` etc., e dentro do
componente o React Router te entrega esse pedaço via `useParams()`:

```tsx
const { usuarioId } = useParams<{ usuarioId: string }>();
```

A página usa esse valor pra buscar o usuário certo na API, e se o id não
corresponder a ninguém, faz um **redirecionamento** (`useNavigate()`) de
volta pro `/ranking` depois de avisar — isso é diferente de uma rota
estática como `/perfil`, que sempre mostra o mesmo usuário (o logado).

---

## `src/api/` — a ponte com o back-end Java

`clienteApi.ts` concentra **toda** a comunicação HTTP do projeto:

- uma função `requisicao<T>()` genérica, que usa `fetch()` nativo (nunca
  Axios) e já trata erro de rede e resposta não-OK;
- uma `interface` TypeScript pra cada formato de resposta da API
  (`UsuarioApi`, `AtividadeApi`, `CampeonatoApi`...) — isso é o que o
  enunciado da disciplina pede quando fala em "tipar rigorosamente as
  respostas de API";
- uma função exportada por operação (`loginApi`, `listarRankingApi`,
  `registrarAcaoApi`...), cada uma já tipada de entrada e saída.

Nenhuma outra parte do projeto chama `fetch()` diretamente — tudo passa
por aqui, o que facilita trocar a URL base ou adicionar autenticação no
futuro sem caçar chamadas espalhadas pelo código.

---

## `src/components/` — pedaços reutilizáveis, não páginas inteiras

Diferente de `pages/`, aqui ficam pedaços que aparecem **dentro** de várias páginas ao mesmo tempo:

- **`Navbar.tsx`** — o menu do topo. Reage a quem está logado e tem o menu hambúrguer no celular.
- **`Footer.tsx`** — o rodapé, com links de navegação de verdade (`<Link>`).
- **`ErrorBoundary.tsx`** — captura erros inesperados de renderização pra não "quebrar a tela branca".
- **`SeletorAvatar.tsx`** — escolha de avatar (personagem ou foto) no perfil.

---

## `src/context/` + `src/hooks/` — o "cérebro" compartilhado

Isso é a parte mais conceitual do projeto. Funciona em duas peças:

1. **O Contexto** (`context/`) — guarda o dado (ex: "quem está logado") e o disponibiliza pra árvore inteira de componentes.
2. **O Hook** (`hooks/`) — a função que qualquer componente chama pra *ler* esse dado (`useAuth()`, `useToast()`).

```
context/authContextInstance.ts   → só o "objeto contêiner" do contexto (sem lógica)
context/AuthContext.tsx          → o Provider: tem toda a lógica (login, cadastro, logout...)
hooks/useAuth.ts                 → a função que os componentes chamam pra usar tudo isso
```

**Por que separar em 3 arquivos assim, em vez de 1 só?** Ferramenta de qualidade de código (`oxlint`) aponta isso como boa prática: quando um arquivo mistura *componente* com *hook* ou *objeto de contexto*, o "hot reload" do Vite (atualização automática ao salvar) para de funcionar direito pra aquele arquivo. O mesmo padrão se repete pro **Toast** (sistema de notificações que aparecem e somem sozinhas).

---

## `src/data/` — a ponte entre a API e as páginas

Esta pasta **não guarda mais dados fixos como um banco simulado** — essa
era a versão com `localStorage`. Agora ela "adapta" o formato cru que
vem da API Java para o formato que as páginas esperam:

- **`usuariosStorage.ts`** — chama as funções de `api/clienteApi.ts`,
  monta o objeto `Usuario` completo (juntando usuário + histórico +
  desafios agendados em paralelo) e guarda só o **e-mail da sessão**
  em `localStorage` (pra sobreviver a um F5 — não é dado de negócio).
- **`tiposConta.ts`** — catálogo dos 8 tipos de conta (soulgamer,
  soulfluencer, admin...) e o que cada um pode fazer.
- **`atividades.ts`**, **`conversao.ts`**, **`integrantes.ts`** — dados
  estáticos/config que não dependem do back-end.

---

## `src/schemas/` — as regras de validação

Define, usando a biblioteca **Zod**, o formato esperado de cada formulário: e-mail precisa ser válido, senha mínimo 6 caracteres, idade mínima de 16 anos, etc. O **React Hook Form** usa esse "contrato" pra saber quando mostrar erro em cada campo, sem você escrever `if` manual pra cada validação.

---

## `src/types/` — os "contratos" de dados do TypeScript

Declara a forma exata de cada coisa que circula no sistema: o que é um `Usuario`, uma `Atividade`, um `Campeonato`. Isso é o que faz o TypeScript te avisar de erro **antes** de rodar o código.

---

## `src/layouts/` — os "moldes" compartilhados

- **`MainLayout.tsx`** — garante Navbar em cima e Footer embaixo nas páginas públicas.
- **`PainelLayout.tsx`** — o layout da área logada, com o menu lateral (Desafios, Trilha, Ranking, Validador...).

Ambos usam o `<Outlet />` do React Router — um "buraco" onde a página da rota atual é encaixada.

---

## `src/theme/` e `src/assets/`

`theme/paleta.ts` documenta qual tom de azul/verde usar em cada contexto. `assets/` guarda as imagens (fotos da equipe, hero, logo) — o Vite otimiza e renomeia os arquivos automaticamente no build de produção.

---

## Resumo do fluxo, de ponta a ponta

1. `main.tsx` monta o `App.tsx` na página.
2. `App.tsx` decide, pela URL, qual componente de `pages/` carregar (incluindo parâmetros dinâmicos, como `/perfil/:usuarioId`).
3. Páginas públicas nascem dentro do `MainLayout`; páginas logadas, dentro do `PainelLayout`, atrás de `RotaProtegida`.
4. `RotaProtegida` consulta o `useAuth()` (vindo do `AuthContext`) pra saber se deixa passar — e, se um tipo específico de conta for exigido, confere isso também.
5. Qualquer formulário usa `schemas/` pra validar e `api/clienteApi.ts` (via `data/`) pra ler/gravar na API Java de verdade.
6. Toda chamada à API trata 3 estados: carregando, erro e vazio — nunca assume que os dados "simplesmente chegaram".
7. Qualquer ação de sucesso/erro dispara um `useToast()` que aparece no canto da tela.
