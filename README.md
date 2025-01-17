# Documentação do Projeto de Gerenciamento de Projetos

> [!IMPORTANT]
>
> Para garantir que o projeto funcione de forma adequada e sem problemas, é necessário seguir os seguintes passos:
>
> 1. Instalar as dependências do projeto.
>
> - `npm install`
> - `npm run dev`
>
> 2. Iniciar o servidor da API.
>
> - `npm run json-server`
>
> 3. Iniciar o servidor de imagens.
>
> - `node imageServer.js`

## Índice

1. [Visão Geral](#visão-geral)
2. [Requisitos Atendidos](#requisitos-atendidos)
3. [Arquitetura](#arquitetura)
   - [Estrutura de Componentes](#estrutura-de-componentes)
   - [Composables](#composables)
   - [Store](#store)
   - [Services](#services)
4. [Justificativas](#justificativas)
5. [Fluxo da Aplicação](#fluxo-da-aplicação)
6. [Configuração do Ambiente](#configuração-do-ambiente)
7. [Tecnologias Utilizadas](#tecnologias-utilizadas)
8. [Testes](#testes)
9. [Melhorias Futuras](#melhorias-futuras)

## Visão Geral

Este projeto é uma aplicação web para gerenciamento de projetos, desenvolvida com Vue.js 3, utilizando a Composition API, TypeScript e TailwindCSS. A aplicação oferece funcionalidades como criação, edição, a habilidade de excluir e favoritar projetos, além de filtros e busca.

## Requisitos Atendidos

### Funcionalidades Principais:

1. **Listagem Inicial:**

   - Exibição de uma mensagem amigável quando não há projetos cadastrados, com botão para criar o primeiro projeto.

2. **Exibição do Título e Contagem de Projetos:**

   - Título "Projetos" e o número total de projetos listados dinamicamente.

3. **Filtros de Listagem:**

   - Exibição de projetos favoritos.
   - Opção de ordenação:
     - Ordem alfabética (padrão).
     - Projetos iniciados mais recentemente.
     - Projetos com data de finalização mais próxima.

4. **Página de Criação e Edição:**

   - Formulário para criar e editar projetos.
   - Validações obrigatórias nos campos como nome, cliente e datas.

5. **Modal de Confirmação:**

   - Modal para confirmar a remoção de projetos.

6. **Favoritar Projetos:**

   - Botão para alternar entre favoritar e desfavoritar.

7. **Barra de Busca:**
   - Busca ativada ao digitar ao menos 3 caracteres.
   - Histórico das 5 últimas buscas recentes.
   - Destaque no texto para os termos correspondentes da busca.
     - Tanto nomes de projetos como de clientes.

## Arquitetura

### Estrutura de Componentes

Os componentes foram organizados para manter a modularidade e reutilização:

- `HomeView.vue`: Exibe a listagem de projetos.
- `ProjectCard.vue`: Cartões individuais de projetos.
- `ModalBase.vue`: Modal reutilizável para confirmação de exclusão.

**Formulários:**

- `ProjectFormView.vue`: Criação/Edição.
- `ProjectFormHeader.vue`: Header do formulário.
- `ProjectImageUpload.vue`: Upload de imagem.

**Filtros:**

- `ProjectFilters.vue`: Agrupa e organiza os componentes de filtro.
- `FavoriteToggle.vue`: Componente de toggle para exibir apenas favoritos.
- `SortSelect.vue`: Dropdown select para seleção de ordenação.

**Busca:**

- `TheHeader.vue`: Contém a barra de pesquisa.
- `SearchBar.vue`: Input de busca com histórico recente.

### Composables

Os composables encapsulam a lógica de estado e ações:

- `useProjects`: Lógica de manipulação de projetos.
- `useSearch`: Lógica de busca e histórico recente.
- `useProjectForm`: Gerenciamento do estado do formulário.
- `useProjectImage`: Upload e remoção de imagens de capa.

### Store

**Pinia** utilizado para gerenciar o estado global da aplicação:

- **Arquivo:** `projectStore.ts`
- **Principais funcionalidades:**
  - Carregar, criar, atualizar e deletar projetos através dos métodos expostos pela store.
  - Gerenciar o histórico de buscas recentes.
  - Atualizar dinamicamente o estado dos projetos favoritos.
- **Vantagem:**
  - Proporciona reatividade automática a todos componentes dependentes do estado.

### Services

Os arquivos do diretório **Services** abstraem a comunicação com a API REST:

1. **`projectApi.ts`:**
   - Gerencia as operações CRUD dos projetos.
2. **`imageApi.ts`:**
   - Gerencia upload e remoção de imagens no servidor.

## Justificativas

- **Gradiente no Overlay do ProjectCard:**

  - Melhorou a usabilidade e acessibilidade visual.
  - Imagens de fundo claras poderiam dificultar a visualização dos botões.

- **Uso de json-server e um servidor Node.js com Express no projeto:**

  O projeto utiliza dois servidores diferentes para propósitos específicos:

  - JSON Server (API Mock)
  - Express Server (Servidor de Imagens)

  O servidor Node.js com Express foi implementado para lidar com upload e manipulação de imagens, evitando o uso de base64 no banco de dados por motivos como:

  - **Tamanho do banco**: Base64 aumenta significativamente o tamanho dos dados.
  - **Performance**: Consultas e transferências mais lentas.
  - **Cache**: Difícil para navegadores armazenarem em cache.
  - **Requisições pesadas**: Dados em base64 aumentam o consumo de requisições.

  Essa separação reflete uma abordagem mais próxima de um cenário real, onde imagens seriam gerenciadas por serviços de armazenamento especializados, como Amazon S3, Supabase Storage ou Cloudinary. Em produção, esses serviços oferecem escalabilidade, desempenho e facilidade de integração, enquanto no projeto atual o servidor Node.js simula essa funcionalidade de forma local para fins de desenvolvimento e testes.

  O approach também reduziu dependências externas e custos adicionais para o ambiente atual.

## Fluxo da Aplicação

1. **Listagem Inicial:**

   - Caso não existam projetos, uma mensagem de incentivo é exibida.

2. **Criação e Edição:**

   - O formulário valida automaticamente os campos obrigatórios.

3. **Busca:**

   - Implementada com debounce para otimizar o desempenho.
   - Histórico salvo no `localStorage`.

4. **Favoritar e Ordenar:**

   - Filtros e ordenação atualizam a listagem em tempo real.

5. **Upload de Imagens:**
   - Limite de 5MB e suporte para JPG/PNG.
   - Feedback ao usuário em caso de erros.

# Configuração do Ambiente

## Instalação das Dependências

1. **Frontend (Raiz do Projeto):**

```bash
npm install
```

2. **Servidor de Imagens:**

```bash
cd server
npm install
```

## Configuração das Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto
Copie e cole as seguintes variáveis:

```env
VITE_API_PORT=3000
VITE_IMAGE_SERVER_PORT=3001
VITE_API_URL=http://localhost:3000
VITE_IMAGE_API_URL=http://localhost:3001
```

## Iniciando os Serviços

1. **Frontend (Em um terminal):**

```bash
# Na raiz do projeto
npm run dev
```

2. **Servidor de API (Em outro terminal):**

```bash
# Na raiz do projeto
npm run json-server
```

3. **Servidor de Imagens (Em outro terminal):**

```bash
node imageServer.js
```

## Portas Utilizadas

- Frontend: http://localhost:5173
- API: http://localhost:3000
- Servidor de Imagens: http://localhost:3001

## Observações

- Certifique-se de que todas as dependências foram instaladas corretamente em ambos os diretórios (raiz e server)
- O diretório `uploads` será criado automaticamente na primeira execução do servidor de imagens
- As variáveis de ambiente precisam começar com VITE\_ para serem acessíveis no frontend
- É necessário reiniciar os servidores após alterar as variáveis de ambiente

## Tecnologias Utilizadas

- **Frontend:**
  - Vue.js 3 (Composition API).
  - TailwindCSS.
  - Pinia (Gerenciamento de estado).
  - TypeScript
- **Backend:**
  - JSON Server.
  - Servidor Express para upload de imagens.

## Testes

Os testes foram escritos utilizando o **Vitest**, garantindo a confiança do código:

### Testes Disponíveis:

- **Componentes:**
  - `HomeView.spec.ts`
  - `ModalBase.spec.ts`
  - `ProjectCard.spec.ts`
  - `ProjectFilters.spec.ts`
  - `ProjectFormHeader.spec.ts`
  - `ProjectFormView.spec.ts`
  - `ProjectImageUpload.spec.ts`
  - `SearchBar.spec.ts`
- **Stores:**
  - `projectStore.spec.ts`
- **Composables:**
  - `useProjects.spec.ts`

## Melhorias Futuras

- Integração com serviços de armazenamento dedicados (e.g., Amazon S3).
- Sistema de autenticação e controle de acesso.
- Melhoria na acessibilidade (WCAG).
