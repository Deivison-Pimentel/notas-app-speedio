# Aplicação de Anotações Vue.js

Bem-vindo à Aplicação de Anotações Vue.js! Esta aplicação minimalista permite que você crie, liste e visualize detalhes de anotações de forma fácil e rápida.

# Anotações Vue.js

Esta é uma aplicação simples de anotações desenvolvida em Vue.js.

## Tela Inicial

- **"+ Criar Anotação":**
  - Ao clicar neste botão, a aplicação verifica se há anotações existentes.
  - Se não houver anotações, redireciona para a tela de criação de anotação (`/criar-anotacao`).
  - Se houver anotações, redireciona para a lista de anotações (`/lista-anotacoes`).

## Criar Anotação

- **"Salvar":**
  - Salva a anotação com base nos dados preenchidos no formulário.
  - Limpa o formulário após salvar.
  - Redireciona para a lista de anotações (`/lista-anotacoes`).

- **"Excluir":**
  - Exibe um modal de confirmação para excluir a anotação.
  - Após a confirmação, exclui a anotação e redireciona para a tela inicial (`/`).

## Lista de Anotações

- **Anotações na Lista:**
  - Cada anotação na lista exibe seu conteúdo.
  - Clique em uma anotação para ver detalhes no lado direito.

- **"+ Criar Anotação":**
  - Redireciona para a tela de criação de anotação (`/criar-anotacao`).

## Detalhes da Anotação

- **"Excluir":**
  - Exibe um modal de confirmação para excluir a anotação.
  - Após a confirmação, exclui a anotação e retorna para a lista de anotações (`/lista-anotacoes`).

## Botão Salvar Sessão

- **"Salvar Sessão":**
  - Gera um token único para salvar a sessão atual.
  - Exibe um modal com o token gerado.
  - Esse token pode ser usado para recuperar as anotações em outro dispositivo.

### Modal de Exclusão

- **"Cancelar":**
  - Fecha o modal de confirmação sem excluir a anotação.

- **"Excluir":**
  - Confirma a exclusão da anotação, exclui-a e fecha o modal.

## Armazenamento Local com IndexedDB

  - Esta aplicação utiliza o IndexedDB para armazenar localmente suas anotações. O IndexedDB é uma API de baixo nível para armazenamento de dados no navegador, permitindo que as anotações sejam salvas e recuperadas mesmo após o fechamento do navegador.

## Como Usar

### Requisitos Prévios
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema antes de prosseguir.

### Execução Local

1. **Clone o Repositório:**
   ```bash
   git clone (https://github.com/Deivison-Pimentel/notas-app-speedio.git)
   
2. **Navegue até o Diretório da Aplicação:**
   ```bash
   cd nome-da-sua-aplicacao

3. **Instale as Dependências:**
   ```bash
   npm install

4. **Execute a Aplicação:**
   ```bash
   npm run serve

## Acesse no Navegador:

Abra o seu navegador e visite http://localhost:8080 para visualizar a aplicação.
   
