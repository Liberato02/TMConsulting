# SoulGame — Como o projeto funciona, pasta por pasta

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

## `src/routes/` — cada pasta é uma página

Esse é o padrão que o professor ensinou: **uma pasta por rota**, com um `index.tsx` dentro. O nome da pasta = o que aquela rota representa.

| Pasta | Rota | O que faz |
|---|---|---|
| `home/` | `/` | Página inicial: banner, vídeo de apresentação, roadmap |
| `sobre/` | `/sobre` | Texto sobre o projeto e tecnologias usadas |
| `faq/` | `/faq` | Perguntas frequentes, em formato "sanfona" (abre/fecha ao clicar) |
| `integrantes/` | `/integrantes` | Fotos da equipe, com o efeito de rede/ecossistema |
| `contato/` | `/contato` | Formulário que envia dados via Fetch API de verdade |
| `login/` | `/login` | Formulário de login |
| `cadastro/` | `/cadastro` | Formulário de cadastro completo (8 campos + validação de idade) |
| `desafios/` | `/desafios` | Painel de gamificação (nível, streak, pontos, saldo em R$) |
| `admin-cadastros/` | `/admin/cadastros` | Painel do time interno pra cadastrar novas atividades |
| `error/` | qualquer URL inválida | Página 404 |
| `RotaProtegida.tsx` | (não é uma página) | O "segurança": decide se deixa entrar numa rota ou manda pro login |

**Por que `RotaProtegida.tsx` não é uma pasta?** Porque ele não é uma página — é um componente que **envolve** outras rotas (`/desafios` e `/admin/cadastros`), verificando login antes de deixar passar. Fica solto direto em `routes/` porque é utilitário de rota, não uma rota em si.

---

## `src/components/` — pedaços reutilizáveis, não páginas inteiras

Diferente de `routes/`, aqui ficam pedaços que aparecem **dentro** de várias páginas ao mesmo tempo:

- **`Navbar.tsx`** — o menu do topo. Reage a quem está logado (muda de "Entrar/Cadastre-se" pra "Meus Desafios/Sair") e tem o menu hambúrguer no celular.
- **`Footer.tsx`** — o rodapé, com links de navegação de verdade (`<Link>`).

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

**Por que separar em 3 arquivos assim, em vez de 1 só?** Ferramenta de qualidade de código (`oxlint`) aponta isso como boa prática: quando um arquivo mistura *componente* com *hook* ou *objeto de contexto*, o "hot reload" do Vite (atualização automática ao salvar) para de funcionar direito pra aquele arquivo — ele recarrega a página inteira em vez de só atualizar a peça que mudou. Fizemos essa separação recentemente pra corrigir isso.

O mesmo padrão se repete pro **Toast** (sistema de notificações que aparecem e somem sozinhas).

---

## `src/data/` — os "dados" do sistema (não é banco de dados de verdade — ainda)

- **`atividades.ts`** — a lista fixa das 6 atividades oficiais (Doação de Sangue, Reciclagem, etc.), com pontos de cada uma. Isso é o que se chama "config tipada": em vez de `if/else` espalhado pelo código, é uma lista de dados que qualquer função pode consultar.
- **`conversao.ts`** — a fórmula de pontos → R$ (R$ 0,009 por ponto), num lugar só, reaproveitável.
- **`integrantes.ts`** — os dados da equipe (nome, RM, foto, links).
- **`usuariosStorage.ts`** — o "banco de dados" simulado, usando `localStorage` do navegador. Tem funções pra inserir, buscar por e-mail, atualizar. Quando o backend Java estiver pronto, só essas funções mudam (viram chamadas `fetch()`), o resto do app nem percebe.

---

## `src/schemas/` — as regras de validação

`auth.ts` define, usando a biblioteca **Zod**, o formato esperado de cada formulário (Login e Cadastro): e-mail precisa ser válido, senha mínimo 6 caracteres, senhas precisam bater, idade mínima de 16 anos, etc. O **React Hook Form** usa esse "contrato" pra saber quando mostrar erro em cada campo, sem você escrever `if` manual pra cada validação.

---

## `src/types/` — os "contratos" de dados do TypeScript

`index.ts` declara a forma exata de cada coisa que circula no sistema: o que é um `Usuario`, uma `Atividade`, um resultado de autenticação. Isso é o que faz o TypeScript te avisar de erro **antes** de rodar o código — se você tentar usar um campo que não existe, ele acusa na hora de escrever.

---

## `src/layouts/` — o "molde" compartilhado

`MainLayout.tsx` é o que garante que **toda** página tenha Navbar em cima e Footer embaixo, sem precisar repetir isso em cada arquivo de `routes/`. Ele usa o `<Outlet />` do React Router — um "buraco" onde a página da rota atual é encaixada.

---

## `src/theme/` — referência de paleta

`paleta.ts` documenta qual tom de azul/verde usar em cada contexto (não é código executado, é uma "folha de consulta" pra manter consistência visual conforme o projeto cresce).

---

## `src/assets/` — imagens

Fotos da equipe, logo, ícones. Cada imagem importada vira parte do "bundle" final — o Vite otimiza e renomeia os arquivos automaticamente no build de produção.

---

## Os "efeitos" (animações) — onde vivem

Ficam declarados no `index.css`, dentro de um bloco `@theme` + `@keyframes` (sintaxe do Tailwind v4): o efeito de toast aparecendo suavemente, por exemplo. São reaproveitados via classe (`animate-toast-in`) em qualquer componente que precise.

---

## Resumo do fluxo, de ponta a ponta

1. `main.tsx` monta o `App.tsx` na página.
2. `App.tsx` decide, pela URL, qual pasta de `routes/` carregar.
3. Toda rota nasce dentro do `MainLayout` (Navbar + Footer sempre visíveis).
4. Se a rota é protegida, passa primeiro pelo `RotaProtegida.tsx`, que consulta o `useAuth()` (vindo do `AuthContext`) pra saber se deixa passar.
5. Qualquer formulário usa `schemas/` pra validar e `data/usuariosStorage.ts` pra ler/gravar no "banco" (localStorage).
6. Qualquer ação de sucesso/erro dispara um `useToast()` que aparece no canto da tela.
