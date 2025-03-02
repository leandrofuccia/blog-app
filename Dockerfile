# Use a imagem oficial do Node.js como base
FROM node:22

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Defina a porta que a aplicação irá expor
EXPOSE 3002

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
