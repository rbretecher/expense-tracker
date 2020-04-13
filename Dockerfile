FROM node:lts-alpine

RUN npm install -g @quasar/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["quasar", "dev"]
