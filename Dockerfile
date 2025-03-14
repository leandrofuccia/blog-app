FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install --legacy-peer-deps

COPY . .

# Copiar o arquivo SQL para o contêiner
COPY initdb/01-create-and-populate.sql /docker-entrypoint-initdb.d/01-create-and-populate.sql

RUN npm run build

EXPOSE 3002

CMD ["node", "build/server.cjs"]