-- Criar a tabela Perfil
CREATE TABLE perfil (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Criar a tabela Credencial
CREATE TABLE credencial (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criar a tabela Usuario
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

-- Criar a tabela Postagem
CREATE TABLE postagem (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    usuarioid INT NOT NULL,
    datacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataatualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioid) REFERENCES usuario(id)
);

-- Garantir a unicidade da chave estrangeira
ALTER TABLE usuario
ADD CONSTRAINT unique_credencial UNIQUE (credencialid);

-- Garantir que cada credencial é associada a um único usuário
ALTER TABLE credencial 
ADD CONSTRAINT unique_usuario UNIQUE (id);

INSERT INTO perfil VALUES (1, 'Aluno');
INSERT INTO perfil VALUES (2, 'Professor');

SELECT * FROM perfil;
SELECT * FROM credencial;
SELECT * FROM usuario;
SELECT * FROM postagem;