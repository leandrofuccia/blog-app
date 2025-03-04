CREATE TABLE Perfil (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL
);

CREATE TABLE Credencial (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Usuario (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    PerfilId INT NOT NULL,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UltimoLogin TIMESTAMP,
    CredencialId INT,
    FOREIGN KEY (PerfilId) REFERENCES Perfil(Id),
    FOREIGN KEY (CredencialId) REFERENCES Credencial(id)
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

-- Garantir a unicidade da chave estrangeira
ALTER TABLE Usuario
ADD CONSTRAINT unique_credencial 
UNIQUE (CredencialId);

-- Garantir que cada credencial é associada a um único usuário
ALTER TABLE Credencial 
ADD CONSTRAINT unique_usuario 
UNIQUE (id);

INSERT INTO perfil VALUES (1, 'Aluno');
INSERT INTO perfil VALUES (2, 'Professor');
