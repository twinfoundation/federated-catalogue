# Interface: IDataSpaceConnector

TWIN Data Space Connector.

## Extends

- [`IDataExchangeComponent`](IDataExchangeComponent.md)

## Extended by

- [`IDataSpaceConnectorEntry`](IDataSpaceConnectorEntry.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD Context.

#### Overrides

`IDataExchangeComponent.@context`

***

### type

> **type**: \[`"DataExchangeComponent"`, `"DataSpaceConnector"`, `...string[]`\]

A Connector is a Data Exchange Component

#### Overrides

[`IDataExchangeComponent`](IDataExchangeComponent.md).[`type`](IDataExchangeComponent.md#type)

***

### identity

> **identity**: `string`

Connector's Identity

***

### defaultEndpoint

> **defaultEndpoint**: [`IEndpoint`](IEndpoint.md)

The default endpoint of the Connector.
This endpoint can be used as a base to guess other endpoints in case they are not explicitly declared.

***

### subscriptionActivityEndpoint

> **subscriptionActivityEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used for data subscription by Consumers.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### pushActivityEndpoint

> **pushActivityEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used by Providers to push data.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### pullDataEndpoint

> **pullDataEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used by Consumers to pull data from.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

***

### resourceCatalog

> **resourceCatalog**: `object`

The resources offered by this Connector.
A resource index is usually a relative reference to the default endpoint base URL.
Nonetheless if the resource already declares an endpoint URL that one should be taken.

#### offeredResource

> **offeredResource**: `object`

##### Index Signature

\[`resourceId`: `string`\]: [`IDataResource`](IDataResource.md)
