FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

COPY initdb /docker-entrypoint-initdb.d/

RUN service postgresql start && \
    echo "Iniciando configuração do PostgreSQL..." && \
    su - postgres -c "psql -c \"CREATE USER blogdb WITH PASSWORD 'your_db_password';\"" && \
    echo "Usuário 'postgres' criado." && \
    su - postgres -c "psql -c \"CREATE DATABASE blogdb;\"" && \
    echo "Banco de dados 'blogdb' criado." && \
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE blogdb TO blogdb;\"" && \
    echo "Privilégios concedidos ao usuário 'postgres'." && \
    echo "Executando scripts de inicialização..." && \
    for f in /docker-entrypoint-initdb.d/*; do \
        echo "Executando $f..."; \
        su - postgres -c "psql -f $f" && \
        echo "$f executado com sucesso."; \
    done && \
    echo "Configuração do PostgreSQL concluída."

RUN npm run build

EXPOSE 3002

CMD service postgresql start && node build/server.cjs
