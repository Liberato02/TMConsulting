## Fluxo de autenticação — cadastro, login e sessão

A autenticação atual é uma simulação para fins acadêmicos. Os usuários e a sessão são armazenados no `localStorage` do navegador, sem comunicação com um backend.

### Cadastro

1. O usuário preenche o formulário em `routes/cadastro/index.tsx`.
2. O React Hook Form coleta os valores.
3. O Zod aplica as regras definidas em `schemas/auth.ts`.
4. O formulário chama `cadastrar()` por meio do `useAuth()`.
5. O `AuthContext` verifica se o e-mail já está cadastrado.
6. Um novo usuário é criado com identificador gerado por `crypto.randomUUID()`.
7. O usuário é salvo no `localStorage` pela função `inserirUsuario()`.
8. O e-mail é salvo como sessão ativa.
9. O estado global `usuario` é atualizado.
10. O usuário é encaminhado para `/desafios` ou `/admin/cadastros`, conforme o tipo de conta.

### Login

1. O usuário informa e-mail e senha em `routes/login/index.tsx`.
2. O Zod valida o formato dos dados.
3. O formulário chama `login()` pelo `useAuth()`.
4. O `AuthContext` busca o usuário pelo e-mail.
5. O sistema verifica se a senha informada corresponde à senha cadastrada.
6. Em caso de sucesso, o e-mail é salvo como sessão ativa.
7. O usuário, sem o campo de senha, é colocado no estado global.
8. Uma notificação de sucesso é exibida.
9. O usuário é encaminhado para `/desafios`.

### Persistência da sessão

O arquivo `data/usuariosStorage.ts` utiliza duas chaves:

- `soulgame:usuarios`: armazena a lista de usuários cadastrados;
- `soulgame:sessao`: armazena o e-mail do usuário conectado.

Quando a aplicação inicia, o `AuthProvider` lê a sessão salva, procura o usuário correspondente e restaura o estado global. Por isso, atualizar a página com `F5` não encerra a sessão.

### Proteção das rotas

O componente `RotaProtegida.tsx` consulta o usuário atual pelo `useAuth()`:

- sem usuário autenticado, redireciona para `/login`;
- com usuário autenticado, permite o acesso;
- quando a rota exige um tipo específico, também verifica se o usuário é `admin` ou `usuario`.

### Logout

Ao executar `logout()`:

1. a chave `soulgame:sessao` é removida do `localStorage`;
2. o estado global `usuario` recebe `null`;
3. as rotas protegidas deixam de permitir o acesso.

### Observação de segurança

Esse modelo é adequado apenas para o protótipo acadêmico. A senha ainda é armazenada em texto simples no navegador. Em produção, cadastro, login e sessão devem ser processados por um backend, com hash de senha, autenticação segura e controle de autorização no servidor.

## Resumo do fluxo, de ponta a ponta

1. `main.tsx` monta o `App.tsx` na página.
2. `App.tsx` decide, pela URL, qual pasta de `routes/` carregar.
3. Toda rota nasce dentro do `MainLayout` (Navbar + Footer sempre visíveis).
4. Se a rota é protegida, passa primeiro pelo `RotaProtegida.tsx`, que consulta o `useAuth()` (vindo do `AuthContext`) pra saber se deixa passar.
5. Qualquer formulário usa `schemas/` pra validar e `data/usuariosStorage.ts` pra ler/gravar no "banco" (localStorage).
6. Qualquer ação de sucesso/erro dispara um `useToast()` que aparece no canto da tela.
