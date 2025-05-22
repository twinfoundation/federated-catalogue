# Function: participantGet()

> **participantGet**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`IParticipantGetResponse` \| `INotFoundResponse`\>

Get a Participant entry.

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

`Promise`\<`IParticipantGetResponse` \| `INotFoundResponse`\>

The response object with additional http response properties.
