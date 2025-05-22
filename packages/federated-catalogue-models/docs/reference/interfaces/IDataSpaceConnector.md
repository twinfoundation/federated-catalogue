# Interface: IDataSpaceConnector

TWIN Data Space Connector.

## Extends

- `IDataExchangeComponent`

## Extended by

- [`IDataSpaceConnectorEntry`](IDataSpaceConnectorEntry.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### @context

> **@context**: `GaiaXContextType`

The LD Context.

#### Overrides

`IDataExchangeComponent.@context`

***

### id

> **id**: `string`

A unique identifier given to this Data Space Connector.

***

### type

> **type**: \[`"DataExchangeComponent"`, `"DataSpaceConnector"`, `...string[]`\]

A Connector is a Data Exchange Component

#### Overrides

`IDataExchangeComponent.type`

***

### identity

> **identity**: `string`

Connector's Identity that allows to know public key of this Connector.

***

### maintainer

> **maintainer**: `string`

Who maintains this Data Space Connector.

***

### name?

> `optional` **name**: `string`

The name of this Data Space Connector

***

### description?

> `optional` **description**: `string`

A description of this Data Space Connector

***

### defaultEndpoint

> **defaultEndpoint**: `IEndpoint`

The default endpoint of the Connector.
This endpoint can be used as a base to guess other endpoints in case they are not explicitly declared.

***

### subscriptionActivityEndpoint?

> `optional` **subscriptionActivityEndpoint**: `IEndpoint`

The endpoint used for data subscription by Consumers.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### pushActivityEndpoint

> **pushActivityEndpoint**: `IEndpoint`

The endpoint used by Providers to push data.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### pullDataEndpoint

> **pullDataEndpoint**: `IEndpoint`

The endpoint used by Consumers to pull data from.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### offeredResource

> **offeredResource**: `string`[] \| \{[`resourceId`: `string`]: `IDataResource` \| `IJsonLdNodeObject` & `object`; \}

The resources offered by this Connector.
A resource index is usually a relative reference to the default endpoint base URL.
Nonetheless if the resource already declares an endpoint URL that one should be taken.
It is captured the case where the Data Resource is supplied
via a list of identifiers or through a map indexed by Id
