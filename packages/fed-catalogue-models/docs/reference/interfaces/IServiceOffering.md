# Interface: IServiceOffering

A Service offering

## Extends

- `IJsonLdNodeObject`

## Extended by

- [`IServiceOfferingEntry`](IServiceOfferingEntry.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD context

#### Overrides

`IJsonLdNodeObject.@context`

***

### id

> **id**: `string`

Id

***

### type

> **type**: `"ServiceOffering"`

Type

***

### description?

> `optional` **description**: `string`

Description

***

### name

> **name**: `string`

Name

***

### providedBy

> **providedBy**: `string` \| [`IParticipant`](IParticipant.md) \| `IJsonLdNodeObject` & `object`

Participant that provides the offering

***

### servicePolicy

> **servicePolicy**: `IJsonLdNodeObject`

ODRL policy associated to the service offering

***

### aggregationOfResources?

> `optional` **aggregationOfResources**: `string`[] \| [`IDataResource`](IDataResource.md)[] \| `IJsonLdNodeObject` & `object`

Resources aggregated
It is supported different representations, inline,
by reference both providing the URI or a partial JSON-LD Node object

***

### endpoint

> **endpoint**: [`IEndpoint`](IEndpoint.md)

The endpoint
