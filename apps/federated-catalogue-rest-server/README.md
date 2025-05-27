# Federated Catalogue REST Server

A REST server implementation support the Federated Catalogue routes.

## Open API

The Open API Spec is [here](./docs/open-api/spec.json)

## Building and running the application

To install the dependencies, perform a full build and start the server.

```shell
npm install
npm run dist
npm start
```

## Development mode

Once you have performed a full build you can run the server in development mode, this will watch the TypeScript code, rebuild if there are any changes, and relaunch the server.

```shell
npm run dev
```

## Configuration

There are various options you can set through configuration, these can be found in [docs/configuration.md](docs/configuration.md)

## Deployment

Examples of how to deploy the app can be found in [docs/deployment.md](docs/deployment.md)

## Testing the Catalogue endpoints

Apart from local testing of the federated-catalogue-service package you can also test the endpoints offered by this REST service.

Once the service is running you can use Postman (or a regular HTTP client) to test the API endpoints. There is a test dataset in the tests folder of the federated-catalogue-service it also contains several compliance credentials.

As those credentials rely on evidence (Verifiable Credentials) that should be hosted online you can run a local HTTP Server as follows:

```sh
cd ../../packages/federated-catalogue-service
npx http-server -S -C ./tests/published-datasets/twinfoundation.github.io.pem -K ./tests/published-datasets/twinfoundation.github.io-key.pem ./tests/published-datasets/twinfoundation.github.io/ -p 443
```

The key and certificate of your local web server can be generated using [mkcert](https://github.com/FiloSottile/mkcert).
You should also map `twinfoundation.github.io` in your `/etc/hosts` file to point to `127.0.0.1`.

Another alternative is to set a local proxy but this has not been tested.

## Changelog

The changes between each version can be found in [docs/changelog.md](docs/changelog.md)
