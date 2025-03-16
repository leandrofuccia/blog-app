# Documentação do Tech-challenge - Fase 2

Atualmente, a maioria de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. Para solucionar esse problema, criamos uma aplicação de blogging dinâmico. Este documento descreve a arquitetura e o funcionamento da aplicação.

Conforme requisitos técnicos, foi disponibilizada uma API contendo endpoints para permitir o cadastro e a consulta de postagens. Como nessa fase não foi desenvolvida uma camada de apresentação (Frontend), é necessária a utilização de ferramentas como Postman ou Swagger para consumir a API.

A aplicação possui 2 perfis de uso (Professor e Aluno), com autenticação. As funcionalidades comuns a ambos os perfis são compartilhadas (visualização de postagens existentes de todos os professores autores) e as demais permanecem restritas ao perfil Professor (criar, editar e excluir postagens).

---

## Arquitetura do Sistema

#### 1. **Camada de Serviço (Backend):**

- **Framework:** Desenvolvido em **Node.js** com o uso do framework **Fastify** para roteamento e middleware.
- **Endpoints REST:**
  - **GET /posts -** Lista os posts disponíveis.
  - **GET /posts/:id -** Retorna o conteúdo completo de um post específico.
  - **POST /posts -** Permite criar um novo post (dados enviados no corpo da requisição).
  - **PUT /posts/:id -** Permite atualizar um post existente.
  - **DELETE /posts/:id -** Remove um post específico.
  - **GET /posts/search -** Permite busca de posts por palavras-chave.
- **Segurança:** Middleware para autenticação (JSON Web Token - JWT).

#### 2. **Camada de Persistência (Banco de Dados):**

- **Banco de Dados Relacional:** **PostgreSQL**

**Tabela Perfil**: armazena os diferentes tipos de perfis de usuários (ex.: professor, aluno).

Estrutura:

```sql
CREATE TABLE perfil (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);
```

**Tabela Credencial**: gerencia as credenciais de acesso (nome de usuário e senha) para autenticação.

Estrutura:

```sql
CREATE TABLE credencial (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

**Tabela Usuario**: representa os usuários do sistema e se relaciona tanto com perfis quanto com credenciais.

Estrutura:

```sql
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    perfilid INT NOT NULL,
    datacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimologin TIMESTAMP,
    credencialid INT,
    FOREIGN KEY (perfilid) REFERENCES perfil(id),
    FOREIGN KEY (credencialid) REFERENCES credencial(id)
);
```

**Tabela Postagem**: armazena as postagens criadas pelos usuários.

Estrutura:

```sql
CREATE TABLE postagem (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    usuarioid INT NOT NULL,
    datacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataatualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

- **Jest** foi utilizado para garantir a qualidade do código e funcionalidades do backend.

---

## Setup Inicial

Este guia orienta o usuário a baixar e executar a aplicação utilizando a imagem Docker disponível no Docker Hub. A imagem já foi preparada e automatizada para facilitar o deploy.

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

O arquivo [docker-compose.yml](https://raw.githubusercontent.com/leandrofuccia/blog-app/refs/heads/main/docker-compose.yml) está disponível no repositório do GitHub [leandrofuccia/blog-app]. Faça o download em uma pasta local.

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
> - `blog_db`: Banco de dados PostgreSQL

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

> Isso também removerá os volumes temporários utilizados pelo banco de dados.

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

Antes de criar um usuário, é necessário criar uma credencial (e-mail e senha).

- **Endpoint:** `POST /credencial`
- **Descrição:** Cria uma credencial com e-mail e senha.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "username": "seuemail@dominio.com",
    "password": "suaSenha123"
  }
  ```
- **Resposta de Sucesso (200):**
  ```json
  {
    "token": "tokenDeAutenticacao"
  }
  ```
- **Exemplo no Swagger:** Acesse `POST /credencial` e insira o e-mail e a senha.

#### 2. **Criar um Usuário**

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
- **Resposta de Sucesso (200):**

  ```json
  {
    "token": "tokenDeAutenticacao"
  }
  ```
- **Exemplo no Swagger:** Acesse `POST /usuario`.

#### 3. Login (Autenticação)

Para acessar postagens ou gerenciá-las, o usuário precisa se autenticar.

**Endpoint:**

```
POST /credencial/signin
```

**Corpo da requisição:**

```json
{
  "username": "usuario@email.com",
  "password": "1234"
}
```

**Resposta esperada:**

```json
{
  "token": "<seu_token_aqui>"
}
```

⚠️ Guarde o token, pois ele será necessário para acessar os demais endpoints.

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
- **Resposta de Sucesso (200):**

  ```json
  {
    "token": "tokenDeAutenticacao"
  }
  ```
- **Exemplo no Swagger:** Acesse `POST /posts`.

#### 5. **Visualizar Todas as Postagens**

- **Endpoint:** `GET /posts`
- **Descrição:** Lista todas as postagens disponíveis.
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "id": 1,
      "titulo": "Primeira Postagem",
      "conteudo": "Conteúdo",
      "usuarioid": 1,
      "datacriacao": "2025-03-16T00:00:00.000Z",
      "dataatualizacao": "2025-03-16T00:00:00.000Z"
    }
  ]
  ```
- **Exemplo no Swagger:** Acesse `GET /posts`.

#### 6. **Buscar Postagem por ID**

- **Endpoint:** `GET /posts/:id`
- **Descrição:** Retorna uma postagem específica pelo ID.
- **Resposta de Sucesso (200):**
  ```json
  {
    "id": 1,
    "titulo": "Primeira Postagem",
    "conteudo": "Conteúdo",
    "usuarioid": 1,
    "datacriacao": "2025-03-16T00:00:00.000Z",
    "dataatualizacao": "2025-03-16T00:00:00.000Z"
  }
  ```
- **Exemplo no Swagger:** Acesse `GET /posts/:id` e forneça o ID.

#### 7. **Editar uma Postagem (Apenas Professores)**

- **Endpoint:** `PUT /posts/:id`
- **Descrição:** Atualiza uma postagem existente.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "titulo": "Novo Título",
    "conteudo": "Novo Conteúdo",
    "usuarioid": 1
  }
  ```
- **Resposta de Sucesso (200):**
  ```json
  {
    "id": 1,
    "titulo": "Novo Título",
    "conteudo": "Novo Conteúdo",
    "usuarioid": 1,
    "datacriacao": "2025-03-16T00:00:00.000Z",
    "dataatualizacao": "2025-03-16T01:00:00.000Z"
  }
  ```
- **Exemplo no Swagger:** Acesse `PUT /posts/:id`.

#### 8. **Excluir uma Postagem (Apenas Professores)**

- **Endpoint:** `DELETE /posts/:id`
- **Descrição:** Remove uma postagem específica.
- **Resposta de Sucesso (200):**
  ```json
  {
    "message": "Postagem excluída com sucesso"
  }
  ```
- **Exemplo no Swagger:** Acesse `DELETE /posts/:id` e forneça o ID.

#### 9. **Buscar Postagens por Termo de Pesquisa**

- **Endpoint:** `GET /posts/search/:termo`
- **Descrição:** Busca postagens que contenham o termo no título ou conteúdo.
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "id": 1,
      "titulo": "Postagem sobre Tecnologia",
      "conteudo": "Conteúdo relacionado à tecnologia...",
      "usuarioid": 1,
      "datacriacao": "2025-03-16T00:00:00.000Z",
      "dataatualizacao": "2025-03-16T00:00:00.000Z"
    }
  ]
  ```
- **Exemplo no Swagger:** Acesse `GET /posts/search/:termo`.

---

## Desafios da Equipe nessa fase

Durante o desenvolvimento desta aplicação, enfrentamos uma série de desafios técnicos, fundamentais para o aprendizado e o amadurecimento da equipe.

Após a conclusão das aulas da Fase 2, foram realizadas reuniões para discussão do projeto do Tech Challenge. Com o auxílio de inteligência artificial, iniciamos com um modelo gerado a partir dos requisitos funcionais e técnicos propostos.

Um ponto desafiador foi implementar a segurança na aplicação, especialmente no que diz respeito à autenticação e autorização. Configurar o uso de JSON Web Tokens (JWT) para validar as ações de professores e restringir o acesso de alunos a determinadas funcionalidades foi uma tarefa que demandou muita atenção.

GitHub Actions foi o ponto mais desafiador. Foram muitos testes mal sucedidos até que conseguíssemos automatizar a geração de uma imagem capaz de executar sem erros. Lidar com a configuração do docker-compose, incluindo a orquestração dos serviços de aplicação e banco de dados, foi algo que só superamos após várias tentativas. Mesmo com a ajuda de IA, foi difícil entender o porquê de tantos problemas com variáveis de ambiente, dependências, comandos, entre outros.

Como equipe, conseguimos dividir as tarefas, nos apoiar nas dificuldades e frustrações e entregar uma aplicação funcional que atendesse todos os requisitos.

---
