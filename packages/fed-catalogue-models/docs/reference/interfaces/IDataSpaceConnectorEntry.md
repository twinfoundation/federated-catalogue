# Interface: IDataSpaceConnectorEntry

Interface describing a participant.

## Extends

- [`IDataSpaceConnector`](IDataSpaceConnector.md).`ICatalogEntry`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### trustedIssuerId

> **trustedIssuerId**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogEntry.trustedIssuerId`

***

### validFrom

> **validFrom**: `string`

Valid from (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogEntry.validFrom`

***

### validUntil

> **validUntil**: `string`

Valid until (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogEntry.validUntil`

***

### dateCreated

> **dateCreated**: `string`

The creation date.

#### Inherited from

`ICatalogEntry.dateCreated`

***

### evidences

> **evidences**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogEntry.evidences`

***

### @context

> **@context**: `IJsonLdContextDefinitionElement`[]

The LD Context.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`@context`](IDataSpaceConnector.md#@context)

***

### type

> **type**: \[`"DataExchangeComponent"`, `"DataSpaceConnector"`, `...string[]`\]

A Connector

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`type`](IDataSpaceConnector.md#type)

***

### identity

> **identity**: `string`

Connector's Identity

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`identity`](IDataSpaceConnector.md#identity)

***

### defaultEndpoint

> **defaultEndpoint**: [`IEndpoint`](IEndpoint.md)

The default endpoint of the Connector.
This endpoint can be used as a base to guess other endpoints in case they are not explicitly declared.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`defaultEndpoint`](IDataSpaceConnector.md#defaultendpoint)

***

### subscriptionActivityEndpoint

> **subscriptionActivityEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used for data subscription by Consumers.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`subscriptionActivityEndpoint`](IDataSpaceConnector.md#subscriptionactivityendpoint)

***

### pushActivityEndpoint

> **pushActivityEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used by Providers to push data.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`pushActivityEndpoint`](IDataSpaceConnector.md#pushactivityendpoint)

***

### pullDataEndpoint

> **pullDataEndpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint used by Consumers to pull data from.
If the endpoint URL is a relative reference to a URL then it should be resolved using the
default endpoint URL as a base URL.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`pullDataEndpoint`](IDataSpaceConnector.md#pulldataendpoint)

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

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`resourceCatalog`](IDataSpaceConnector.md#resourcecatalog)
