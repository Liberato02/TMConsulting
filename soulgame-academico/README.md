# SoulGame

Aplicação acadêmica desenvolvida com React, TypeScript, Vite e Tailwind CSS. O projeto inclui cadastro, autenticação simulada, desafios, sistema de pontos e painel administrativo.

## Pré-requisitos

Antes de iniciar, instale:

- Git;
- Node.js 20.19 ou superior;
- npm, instalado junto com o Node.js.

Para conferir as versões:

```bash
git --version
node --version
npm --version
```

## Como clonar o projeto

Abra o terminal e execute:

```bash
git clone https://github.com/Liberato02/TMConsulting.git
cd TMConsulting
cd soulgame-academico
```

## Como instalar as dependências

Dentro da pasta `soulgame-academico`, execute:

```bash
npm install
```

Esse comando instala as dependências registradas no `package.json`.

## Como executar o projeto

Execute:

```bash
npm run dev
```

O terminal mostrará um endereço local semelhante a:

```text
http://localhost:5173/
```

Abra esse endereço no navegador.

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

## Como gerar o build de produção

Execute:

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist`.

## Como visualizar o build

Depois de gerar o build, execute:

```bash
npm run preview
```

## Como verificar a qualidade do código

Execute:

```bash
npm run lint
```

## Scripts disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Valida o TypeScript e gera o build |
| `npm run preview` | Exibe localmente o build de produção |
| `npm run lint` | Analisa a qualidade do código |

## Tecnologias utilizadas

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- React Router;
- React Hook Form;
- Zod;
- Oxlint.

## Observação

A autenticação e os dados dos usuários são armazenados no `localStorage` do navegador. Esse funcionamento é destinado ao protótipo acadêmico e não substitui um backend seguro para uso em produção.