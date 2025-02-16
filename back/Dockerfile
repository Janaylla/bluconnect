FROM node:20

WORKDIR /app

# Definir argumentos de build
ARG ENV_FILE

# Copiar o arquivo .env apenas durante o build
COPY ${ENV_FILE} .env

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]