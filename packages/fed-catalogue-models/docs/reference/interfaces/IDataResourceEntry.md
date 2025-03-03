# Interface: IDataResourceEntry

Interface describing a Data Resource entry.

## Extends

- `ICatalogEntry`.[`IDataResource`](IDataResource.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{\} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

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

### license

> **license**: `string`

Pointer (URL) to the license

#### Inherited from

[`IDataResource`](IDataResource.md).[`license`](IDataResource.md#license)

***

### copyrightOwnedBy

> **copyrightOwnedBy**: `string`

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

***

### producedBy

> **producedBy**: `string`

Overwriting producedBy as we only store the identifier

#### Overrides

[`IDataResource`](IDataResource.md).[`producedBy`](IDataResource.md#producedby)

***

### exposedThrough

> **exposedThrough**: `string`

Overwriting exposedThrough as we only store the id of the Data Exchange Component

#### Overrides

[`IDataResource`](IDataResource.md).[`exposedThrough`](IDataResource.md#exposedthrough)
