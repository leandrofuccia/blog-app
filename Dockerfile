FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

COPY initdb /docker-entrypoint-initdb.d/

RUN service postgresql start && \
    su - postgres -c "psql -c \"CREATE USER postgres WITH PASSWORD 'your_db_password';\"" && \
    su - postgres -c "psql -c \"CREATE DATABASE blogdb;\"" && \
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE blogdb TO postgres;\""

RUN npm run build

EXPOSE 3002

CMD service postgresql start && node build/server.cjs
