FROM node:22-alpine

WORKDIR /usr/src/app

COPY node_modules ./node_modules

COPY apps/federated-catalogue-rest-server .
COPY packages/federated-catalogue-models ./node_modules/@twin.org/federated-catalogue-models
COPY packages/federated-catalogue-service ./node_modules/@twin.org/federated-catalogue-service

CMD ["node","./dist/es/index.js"]
