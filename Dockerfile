FROM node:10-alpine

COPY . /app
WORKDIR /app

RUN yarn install &&\
    npx tsc

CMD node dist/server.js
