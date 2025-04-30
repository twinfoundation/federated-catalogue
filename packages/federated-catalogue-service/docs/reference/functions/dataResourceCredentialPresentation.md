# Function: dataResourceCredentialPresentation()

> **dataResourceCredentialPresentation**(`baseRouteName`, `httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`ICreatedResponse`\>

Register a new data resource.

## Parameters

### baseRouteName

`string`

The base route name.

### httpRequestContext

`IHttpRequestContext`

The request context for the API.

### factoryServiceName

`string`

The name of the service to use in the routes.

### request

`ICompliancePresentationRequest`

The request.

## Returns

`Promise`\<`ICreatedResponse`\>

The response object with additional http response properties.
