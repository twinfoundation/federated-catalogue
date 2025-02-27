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

> **@context**: \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD Context.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`@context`](IDataSpaceConnector.md#@context)

***

### id

> **id**: `string`

A unique identifier given to this Data Space Connector

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`id`](IDataSpaceConnector.md#id)

***

### type

> **type**: \[`"DataExchangeComponent"`, `"DataSpaceConnector"`, `...string[]`\]

A Connector is a Data Exchange Component

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`type`](IDataSpaceConnector.md#type)

***

### identity

> **identity**: `string`

Connector's Identity that allows to know public key of this Connector

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`identity`](IDataSpaceConnector.md#identity)

***

### maintainer

> **maintainer**: `string`

Who maintains this Data Space Connector.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`maintainer`](IDataSpaceConnector.md#maintainer)

***

### name?

> `optional` **name**: `string`

The name of this Data Space Connector

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`name`](IDataSpaceConnector.md#name)

***

### description?

> `optional` **description**: `string`

A description of this Data Space Connector

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`description`](IDataSpaceConnector.md#description)

***

### defaultEndpoint

> **defaultEndpoint**: [`IEndpoint`](IEndpoint.md)

The default endpoint of the Connector.
This endpoint can be used as a base to guess other endpoints in case they are not explicitly declared.

#### Inherited from

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`defaultEndpoint`](IDataSpaceConnector.md#defaultendpoint)

***

### subscriptionActivityEndpoint?

> `optional` **subscriptionActivityEndpoint**: [`IEndpoint`](IEndpoint.md)

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

### offeredResource

> **offeredResource**: `string`[]

Offered resources. Probably in the future this wll be separated in a different entry so
that a  Data Space Connector entry does not need to be modified when a new Data Resource
is offered.

#### Overrides

[`IDataSpaceConnector`](IDataSpaceConnector.md).[`offeredResource`](IDataSpaceConnector.md#offeredresource)
