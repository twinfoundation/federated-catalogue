# Docker

## Build Instructions

1. Build all the packages

Go to the root folder:

```sh
cd ../../..
```

and then

```sh
npm install --omit=dev
npm run dist:no-test
```

2. Build the docker image

```sh
docker build --no-cache  -f ./apps/federated-catalogue-rest-server/deploy/Dockerfile -t twin.org/federated-catalogue:1.0 .
```

3. Run the Docker image

docker compose -f 