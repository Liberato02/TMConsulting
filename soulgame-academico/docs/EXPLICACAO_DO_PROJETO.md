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

