FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .

COPY node_modules ./node_modules
COPY json-web-signature-2020 ./node_modules/@gaia-x/json-web-signature-2020

COPY ./packages ./packages

EXPOSE 3020

WORKDIR /usr/src/app/packages/fed-catalogue-rest-server

CMD ["npm","start"]
