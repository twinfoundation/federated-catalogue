# Interface: IServiceOfferingEntry

Interface describing a SD.

## Extends

- `ICatalogEntry`.[`IServiceOffering`](IServiceOffering.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD context

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`@context`](IServiceOffering.md#@context)

***

### id

> **id**: `string`

Id

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`id`](IServiceOffering.md#id)

***

### type

> **type**: `"ServiceOffering"`

Type

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`type`](IServiceOffering.md#type)

***

### description?

> `optional` **description**: `string`

Description

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`description`](IServiceOffering.md#description)

***

### name

> **name**: `string`

Name

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`name`](IServiceOffering.md#name)

***

### providedBy

> **providedBy**: `string`

Participant that provides the offering

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`providedBy`](IServiceOffering.md#providedby)

***

### servicePolicy

> **servicePolicy**: `IJsonLdNodeObject`

ODRL policy associated to the service offering

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`servicePolicy`](IServiceOffering.md#servicepolicy)

***

### aggregationOfResources?

> `optional` **aggregationOfResources**: `string`[]

Resources aggregated

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`aggregationOfResources`](IServiceOffering.md#aggregationofresources)

***

### endpoint

> **endpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint

#### Inherited from

[`IServiceOffering`](IServiceOffering.md).[`endpoint`](IServiceOffering.md#endpoint)

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
