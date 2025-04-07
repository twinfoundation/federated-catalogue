# Function: serviceOfferingGet()

> **serviceOfferingGet**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`INotFoundResponse` \| `IServiceOfferingGetResponse`\>

Get a Service Offering entry.

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

`Promise`\<`INotFoundResponse` \| `IServiceOfferingGetResponse`\>

The response object with additional http response properties.
