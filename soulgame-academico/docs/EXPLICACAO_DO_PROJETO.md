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
