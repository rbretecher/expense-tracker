FROM node:lts-alpine as base

RUN npm install -g @quasar/cli

RUN mkdir /app
WORKDIR /app
