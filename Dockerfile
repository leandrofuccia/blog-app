FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN chmod +x wait-for-it.sh

EXPOSE 3002

CMD ["./wait-for-it.sh", "db:5432", "--", "node", "build/server.cjs"]