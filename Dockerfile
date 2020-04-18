FROM node:lts-alpine as base

RUN npm install -g @quasar/cli
RUN npm install -g firebase-tools

RUN mkdir /app
WORKDIR /app
