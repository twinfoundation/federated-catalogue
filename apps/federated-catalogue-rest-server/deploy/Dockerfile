FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=fed-cat-root node_modules ./node_modules

COPY --from=fed-cat-server ./dist ./dist
COPY --from=fed-cat-server ./locales ./locales
COPY --from=fed-cat-server ./docs ./docs

COPY --from=fed-cat-root ./packages/federated-catalogue-models/dist ./node_modules/@twin.org/federated-catalogue-models/dist
COPY --from=fed-cat-root ./packages/federated-catalogue-models/package.json ./node_modules/@twin.org/federated-catalogue-models/package.json

COPY --from=fed-cat-root ./packages/federated-catalogue-service/dist ./node_modules/@twin.org/federated-catalogue-service/dist
COPY --from=fed-cat-root ./packages/federated-catalogue-service/locales ./node_modules/@twin.org/federated-catalogue-service/locales
COPY --from=fed-cat-root ./packages/federated-catalogue-service/package.json ./node_modules/@twin.org/federated-catalogue-service/package.json

CMD ["node","./dist/es/index.js"]
