# Documentação do Tech-challenge - Fase 2

Atualmente, a maioria de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. Para solucionar esse problema, criamos uma aplicação de blogging dinâmico. Este documento descreve a arquitetura e o funcionamento da aplicação.

Conforme requisitos técnicos, foi disponibilizada uma API contendo endpoints para permitir o cadastro e a consulta de postagens. Como nessa fase não foi desenvolvida uma camada de apresentação (Frontend), é necessária a utilização de ferramentas como Postman ou Swagger para consumir a API.

A aplicação possui 2 perfis de uso (Professor e Aluno), com autenticação. As funcionalidades comuns a ambos os perfis são compartilhadas (visualização de postagens existentes de todos os professores autores) e as demais permanecem restritas ao perfil Professor (criar, editar e excluir postagens).

---

## Arquitetura do Sistema

#### 1. **Camada de Serviço (Backend):**

- **Framework:** Desenvolvido em **Node.js** com o uso do framework **Fastify** para roteamento e middleware.
- **Endpoints REST:**
  - **POST /credencial -** Cria uma nova credencial
  - **POST /credencial/signin -** Permite a autenticação do usuário
  - **POST /usuario -** Cria um novo usuário
  - **GET /usuario/:usuarioId -** Retorna os dados de um usuário específico.
  - **GET /usuario/credencial/:credencialId -** Retorna os dados de um usuário através de uma credencial específica.
  - **GET /posts -** Lista os posts disponíveis.
  - **GET /posts/:id -** Retorna o conteúdo completo de um post específico.
  - **GET /posts/usuario/:usuarioId -** Lista os posts disponíveis de um usuário específico.
  - **POST /posts -** Permite criar um novo post (dados enviados no corpo da requisição).
  - **PUT /posts/:id -** Permite atualizar um post existente.
  - **DELETE /posts/:id -** Remove um post específico.
  - **GET /posts/search/:termo -** Permite busca de posts por palavras-chave.
- **Segurança:** Middleware para autenticação (JSON Web Token - JWT).

#### 2. **Camada de Persistência (Banco de Dados):**

- **Banco de Dados Relacional:** **PostgreSQL**

**Tabela Perfil**: armazena os diferentes tipos de perfis de usuários (ex.: professor, aluno).

Estrutura:

```sql
CREATE TABLE perfil (
    id int4 PRIMARY KEY,
    perfil varchar NOT NULL UNIQUE
);
```

**Tabela Credencial**: gerencia as credenciais de acesso (nome de usuário e senha) para autenticação.

Estrutura:

```sql
CREATE TABLE credencial (
    id serial4 PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL
);
```

**Tabela Usuario**: representa os usuários do sistema e se relaciona tanto com perfis quanto com credenciais.

Estrutura:

```sql
CREATE TABLE usuario (
    id serial4 PRIMARY KEY,
    nome varchar NOT NULL,
    perfilid int4 NOT NULL,
    datacriacao timestamp DEFAULT CURRENT_TIMESTAMP,
    ultimologin timestamp,
    credencialid int4 NOT NULL UNIQUE,
    FOREIGN KEY (perfilid) REFERENCES perfil(id),
    FOREIGN KEY (credencialid) REFERENCES credencial(id)
);
```

**Tabela Postagem**: armazena as postagens criadas pelos usuários.

Estrutura:

```sql
CREATE TABLE postagem (
    id serial4 PRIMARY KEY,
    titulo varchar NOT NULL,
    conteudo varchar NOT NULL,
    usuarioid int4 NOT NULL,
    datacriacao timestamp DEFAULT CURRENT_TIMESTAMP,
    dataatualizacao timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioid) REFERENCES usuario(id)
);
```

- **ORM Utilizado: TypeORM**
  Cada tabela é representada por uma entidade no TypeORM, o que facilita a interação entre o código e o banco de dados. O TypeORM permite abstrair queries SQL por meio de métodos e também suporta migrações, garantindo evolução do banco sem perda de dados.

#### 3. **Containerização:**

- Uso de **Docker** para garantir consistência entre os ambientes de desenvolvimento e produção.
  - **Dockerfile:**
    - Define como o servidor Node.js e o banco de dados PostgreSQL serão configurados e executados.
  - **Docker Compose:**
    - Configura os serviços, conectando o backend e o banco de dados.

#### 4. **Automação (CI/CD):**

- **GitHub Actions:** Pipeline configurado para rodar testes automatizados (unitários) e realizar builds da aplicação.

#### 5. **Testes:**

- **Jest** foi utilizado para garantir a qualidade do código realizando testes unitários.
- Para rodar os testes unitários foi utilizado o banco de dados em memória **SQLite**.

---

## Setup Inicial

Este guia orienta o usuário a baixar e executar a aplicação utilizando a imagem Docker disponível no Docker Hub.

#### **1. Requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- **Docker**:
  - Versão recomendada: 20.10.7 ou superior
  - [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**:
  - Versão recomendada: 2.0.0 ou superior
  - Incluído no Docker Desktop ou pode ser instalado separadamente:
    [Instalar Docker Compose](https://docs.docker.com/compose/install/)

Verifique se as ferramentas estão instaladas com os comandos:

```bash
docker --version
docker compose version
```

#### **2. Baixando a Imagem do Docker Hub**

A imagem da aplicação está disponível no repositório do Docker Hub [leandrofuccia/blog-app](https://hub.docker.com/r/leandrofuccia/blog-app).

1. Execute o seguinte comando para baixar a última versão da imagem:
   ```bash
   docker pull leandrofuccia/blog-app:latest
   ```

#### **3. Baixando o Arquivo Docker Compose**

O arquivo [docker-compose.yml](https://raw.githubusercontent.com/leandrofuccia/blog-app/refs/heads/main/docker-compose.yml) está disponível no repositório do GitHub [leandrofuccia/blog-app](https://github.com/leandrofuccia/blog-app). Faça o download em uma pasta local.

#### **4. Iniciando os Contêineres**

1. Na mesma pasta onde se encontra o arquivo `docker-compose.yml`, execute o comando abaixo para iniciar os contêineres:

   ```bash
   docker compose up -d
   ```
2. Após a execução, verifique se os contêineres estão funcionando:

   ```bash
   docker ps
   ```

> Os serviços devem incluir:
>
> - `blog_app`: Aplicação
> - `postgres_db`: Banco de dados PostgreSQL

#### **5. Testando a Aplicação**

1. Acesse a aplicação no navegador:

   ```
   http://localhost:3002/docs
   ```
2. Use o Swagger UI para testar os endpoints disponíveis, como:

   - Criar credenciais
   - Criar usuários
   - Criar e gerenciar postagens

#### **6. Encerrando os Contêineres**

Para parar e remover os contêineres, execute:

```bash
docker compose down
```

---

## Guia de Uso das APIs

Este guia tem como objetivo orientar o uso das APIs disponibilizadas pelo sistema de blogging dinâmico. As APIs estarão disponíveis após Setup Inicial no endereço: [http://localhost:3002/docs](http://localhost:3002/docs), onde será possível visualizar a documentação e testar as rotas.

### Passos para Utilizar o Sistema:

1. **Criar uma Credencial (e-mail e senha).**
2. **Criar um Usuário (nome e perfil).**
   - Escolha entre os perfis:
     - **Aluno:** Apenas visualiza postagens.
     - **Professor:** Pode criar, editar, excluir e visualizar postagens.
3. **Acessar as funcionalidades conforme o perfil.**

### Passo a Passo: Utilizando as APIs

#### 1. **Criar uma Credencial**

Para utilizar o sistema, é necessário criar uma credencial (e-mail e senha).

- **Endpoint:** `POST /credencial`
- **Descrição:** Cria uma credencial com e-mail e senha.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "username": "seuemail@dominio.com",
    "password": "suaSenha123"
  }
  ```
- **Resposta de Sucesso (201):**
  ```json
  {
    "id": 1,
    "username": "seuemail@dominio.com"
  }
  ```

#### 2. Login (Autenticação)

Para utilizar os demais endpoints, é necessário se autenticar utilizando a credencial criada.

**Endpoint:**

```
POST /credencial/signin
```

**Corpo da requisição:**

```json
{
  "username": "seuemail@dominio.com",
  "password": "suaSenha123"
}
```

**Resposta esperada (200):**

```json
{
  "token": "<seu_token_aqui>"
}
```

Se está utilizando o Swagger UI, pode-se clicar em "Authorize", inserir o token no campo value e clicar em "Authorize". De agora em diante, o Swagger UI irá alimentar o cabeçalho de todas as requisições com o Bearer token.

#### 3. **Criar um Usuário**

Para utilizar os demais endpoints, é necessário criar um Usuário e definir seu Perfil.

- **Endpoint:** `POST /usuario`
- **Descrição:** Cria um usuário associado à credencial criada anteriormente.
- **Corpo da Requisição (JSON):**

  ```json
  {
    "nome": "Seu Nome",
    "perfilid": 2, 
    "credencialId": 1
  }
  ```

  - **perfilid:**
    - `1`: Aluno
    - `2`: Professor
  - **credencialId:** ID retornado da criação de credencial.
- **Resposta de Sucesso (201):**

  ```json
  {
    "id": 1,
    "nome": "Seu Nome",
    "perfilid": 2,
    "credencialId": 1
  }
  ```

#### 4. **Criar uma Postagem (Apenas Professores)**

- **Endpoint:** `POST /posts`
- **Descrição:** Cria uma postagem.
- **Corpo da Requisição (JSON):**

  ```json
  {
    "titulo": "Título da Postagem",
    "conteudo": "Conteúdo da postagem",
    "usuarioid": 1
  }
  ```

  - **usuarioid:** ID do usuário professor.
- **Resposta de Sucesso (201):**

  ```json
  {
    "titulo": "Título da Postagem",
    "conteudo": "Conteúdo da postagem",
    "usuarioid": 1,
    "id": 1,
    "datacriacao": "2025-03-17T17:40:00.127Z",
    "dataatualizacao": "2025-03-17T17:40:00.127Z"
  }
  ```

#### 5. **Visualizar Todas as Postagens**

- **Endpoint:** `GET /posts`
- **Descrição:** Lista todas as postagens disponíveis.
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "titulo": "Título da Postagem",
      "conteudo": "Conteúdo da postagem",
      "usuarioid": 1,
      "id": 1,
      "datacriacao": "2025-03-17T17:40:00.127Z",
      "dataatualizacao": "2025-03-17T17:40:00.127Z"
    }
  ]
  ```

#### 6. **Buscar Postagem por ID**

- **Endpoint:** `GET /posts/:id`
- **Descrição:** Retorna uma postagem específica pelo ID.
- **Parâmetros:**
  - **id:** id da postagem a ser retornada
- **Resposta de Sucesso (200):**
  ```json
  {
    "titulo": "Título da Postagem",
    "conteudo": "Conteúdo da postagem",
    "usuarioid": 1,
    "id": 1,
    "datacriacao": "2025-03-17T17:40:00.127Z",
    "dataatualizacao": "2025-03-17T17:40:00.127Z"
  }
  ```

#### 7. **Editar uma Postagem (Apenas Professores)**

- **Endpoint:** `PUT /posts/:id`
- **Descrição:** Atualiza uma postagem existente.
- **Parâmetros:**
  - **id:** id da postagem a ser editada
- **Corpo da Requisição (JSON):**
  ```json
  {
    "titulo": "Novo Título",
    "conteudo": "Novo Conteúdo"
  }
  ```
- **Resposta de Sucesso (200):**
  ```json
  {
    "id": 1,
    "titulo": "Novo Título",
    "conteudo": "Novo Conteúdo",
    "usuarioid": 1,
    "datacriacao": "2025-03-17T17:40:00.127Z",
    "dataatualizacao": "2025-03-17T17:50:00.140Z"
  }
  ```

#### 8. **Excluir uma Postagem (Apenas Professores)**

- **Endpoint:** `DELETE /posts/:id`
- **Descrição:** Remove uma postagem específica.
- **Parâmetros:**
  - **id:** id da postagem a ser excluída
- **Resposta de Sucesso (200):**
  ```json
  {
    "message": "OK"
  }
  ```

#### 9. **Buscar Postagens por Termo de Pesquisa**

- **Endpoint:** `GET /posts/search/:termo`
- **Descrição:** Busca postagens que contenham o termo no título ou conteúdo.
- **Parâmetros:**
  - **termo:** termo a ser pesquisado no título ou conteúdo de uma ou mais postagens.
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "id": 1,
      "titulo": "Novo Título",
      "conteudo": "Novo Conteúdo",
      "usuarioid": 1,
      "datacriacao": "2025-03-17T17:40:00.127Z",
      "dataatualizacao": "2025-03-17T17:50:00.140Z"
    }
  ]
  ```

---

## Desafios da Equipe nessa fase

Durante o desenvolvimento desta aplicação, enfrentamos uma série de desafios técnicos, fundamentais para o aprendizado e o amadurecimento da equipe.

Após a conclusão das aulas da Fase 2, foram realizadas reuniões para discussão do projeto do Tech Challenge. Com o auxílio de inteligência artificial, iniciamos com um modelo gerado a partir dos requisitos funcionais e técnicos propostos.

Apesar de não ser um requisito, foi desafiador implementar a segurança na aplicação, especialmente no que diz respeito à autenticação e autorização. Configurar o uso de JSON Web Tokens (JWT) para validar as ações de professores e restringir o acesso de alunos a determinadas funcionalidades foi uma tarefa que demandou muita atenção.

GitHub Actions foi o ponto mais desafiador. Foram muitos testes mal sucedidos até que conseguíssemos automatizar a geração de uma imagem capaz de executar sem erros. Lidar com a configuração do docker-compose, incluindo a orquestração dos serviços de aplicação e banco de dados, foi algo que só superamos após várias tentativas. Mesmo com a ajuda de IA, foi difícil entender o porquê de tantos problemas com variáveis de ambiente, dependências, comandos, entre outros.

Como equipe, conseguimos dividir as tarefas, nos apoiar nas dificuldades e frustrações e entregar uma aplicação funcional que atendesse todos os requisitos.

---
