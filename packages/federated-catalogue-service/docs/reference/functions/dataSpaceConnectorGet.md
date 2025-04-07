# Function: dataSpaceConnectorGet()

> **dataSpaceConnectorGet**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`INotFoundResponse` \| `IDataSpaceConnectorGetResponse`\>

Get a Data Space Connector entry.

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

`Promise`\<`INotFoundResponse` \| `IDataSpaceConnectorGetResponse`\>

The response object with additional http response properties.
