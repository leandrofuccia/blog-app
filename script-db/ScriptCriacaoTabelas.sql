CREATE TABLE Perfil (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha  VARCHAR(100) NOT NULL,
    PerfilId INT NOT NULL,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UltimoLogin TIMESTAMP,
    FOREIGN KEY (PerfilId) REFERENCES Perfil(Id)
);


CREATE TABLE Postagem (
    Id SERIAL PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Conteudo TEXT NOT NULL,
    UsuarioId INT NOT NULL,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id)
);


CREATE TABLE Credencial (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);


ALTER TABLE usuario 
DROP COLUMN email,
DROP COLUMN senha;

-- Adicionar a coluna CredencialId na tabela usuario
ALTER TABLE usuario 
ADD COLUMN CredencialId INT;

-- Criar o relacionamento um para um entre usuario e credencial
ALTER TABLE usuario 
ADD CONSTRAINT fk_credencial 
FOREIGN KEY (CredencialId) REFERENCES credencial(id);

-- Garantir a unicidade da chave estrangeira
ALTER TABLE usuario
ADD CONSTRAINT unique_credencial 
UNIQUE (CredencialId);

-- Garantir que cada credencial é associada a um único usuário
ALTER TABLE credencial 
ADD CONSTRAINT unique_usuario 
UNIQUE (id);

