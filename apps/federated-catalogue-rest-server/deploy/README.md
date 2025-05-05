# Docker

## Build Instructions

1. Ensure all packages are built

Under the root folder of the Federated Catalogue repository run:

```sh
npm install --omit=dev
npm run dist:no-test
```

2. Build the docker image

(For testing purposes you might need to add these instructions to the Dockerfile recipe).
`rootCA.pem` must be the mkdcert rootCA ypu are using locally to serve evidence credentials.

```docker
COPY rootCA.pem /usr/local/share/ca-certificates/rootCA.pem
RUN cat /usr/local/share/ca-certificates/rootCA.pem  >> /etc/ssl/certs/ca-certificates.crt
```

```sh
docker buildx build --no-cache  --build-context fed-cat-root=../../..  --build-context fed-cat-server=.. -t twin.org/federated-catalogue:latest .
```

3. Run the Docker image

docker compose up
