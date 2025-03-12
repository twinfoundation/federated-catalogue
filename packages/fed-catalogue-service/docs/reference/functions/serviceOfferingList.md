# Function: serviceOfferingList()

> **serviceOfferingList**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`IServiceOfferingListResponse`\>

Get a list of the service offering entries.

## Parameters

### httpRequestContext

`IHttpRequestContext`

The request context for the API.

### factoryServiceName

`string`

The name of the service to use in the routes.

### request

`IServiceOfferingListRequest`

The request.

## Returns

`Promise`\<`IServiceOfferingListResponse`\>

The response object with additional http response properties.
