# Function: dataResourceGet()

> **dataResourceGet**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`INotFoundResponse` \| `IDataResourceGetResponse`\>

Get a Data Resource entry.

## Parameters

### httpRequestContext

`IHttpRequestContext`

The request context for the API.

### factoryServiceName

`string`

The name of the service to use in the routes.

### request

`ICatalogueEntryGetRequest`

The request.

## Returns

`Promise`\<`INotFoundResponse` \| `IDataResourceGetResponse`\>

The response object with additional http response properties.
