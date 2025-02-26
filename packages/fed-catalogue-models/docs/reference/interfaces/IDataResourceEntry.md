# Interface: IDataResourceEntry

Interface describing a Data Resource entry.

## Extends

- `ICatalogEntry`.[`IDataResource`](IDataResource.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD Context

#### Inherited from

[`IDataResource`](IDataResource.md).[`@context`](IDataResource.md#@context)

***

### id

> **id**: `string`

Subject Id

#### Inherited from

[`IDataResource`](IDataResource.md).[`id`](IDataResource.md#id)

***

### type

> **type**: `"DataResource"`

Subject type

#### Inherited from

[`IDataResource`](IDataResource.md).[`type`](IDataResource.md#type)

***

### description?

> `optional` **description**: `string`

Description

#### Inherited from

[`IDataResource`](IDataResource.md).[`description`](IDataResource.md#description)

***

### name

> **name**: `string`

The Resource Name

#### Inherited from

[`IDataResource`](IDataResource.md).[`name`](IDataResource.md#name)

***

### exposedThrough

> **exposedThrough**: `string` \| [`IDataExchangeComponent`](IDataExchangeComponent.md) \| `IJsonLdNodeObject` & `object`

Exposed through a Data Exchange Component.
'string' in case just an Id pointing to the Data Exchange Component is supplied
the third case covers the idiom where a JSON-LD Node is supplied with id and type.

#### Inherited from

[`IDataResource`](IDataResource.md).[`exposedThrough`](IDataResource.md#exposedthrough)

***

### producedBy

> **producedBy**: `string`

Who is the data producer

#### Inherited from

[`IDataResource`](IDataResource.md).[`producedBy`](IDataResource.md#producedby)

***

### license

> **license**: `string`

Pointer (URL) to the license

#### Inherited from

[`IDataResource`](IDataResource.md).[`license`](IDataResource.md#license)

***

### copyrightOwnedBy?

> `optional` **copyrightOwnedBy**: `string`

Copyright owner

#### Inherited from

[`IDataResource`](IDataResource.md).[`copyrightOwnedBy`](IDataResource.md#copyrightownedby)

***

### resourcePolicy

> **resourcePolicy**: `IJsonLdNodeObject`

ODRL Policy

#### Inherited from

[`IDataResource`](IDataResource.md).[`resourcePolicy`](IDataResource.md#resourcepolicy)

***

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
