# Interface: IDataResource

A Data Resource as defined by Gaia-X.
See also W3C DCAT Dataset

## Extends

- `IJsonLdNodeObject`

## Extended by

- [`IDataResourceEntry`](IDataResourceEntry.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD Context

#### Overrides

`IJsonLdNodeObject.@context`

***

### id

> **id**: `string`

Subject Id

***

### type

> **type**: `"DataResource"`

Subject type

***

### description?

> `optional` **description**: `string`

Description

***

### name

> **name**: `string`

The Resource Name

***

### exposedThrough

> **exposedThrough**: `string` \| [`IDataExchangeComponent`](IDataExchangeComponent.md) \| `IJsonLdNodeObject` & `object`

Exposed through a Data Exchange Component.
'string' in case just an Id pointing to the Data Exchange Component is supplied
the third case covers the idiom where a JSON-LD Node is supplied with id and type.

***

### producedBy

> **producedBy**: `string`

Who is the data producer

***

### license

> **license**: `string`

Pointer (URL) to the license

***

### copyrightOwnedBy

> **copyrightOwnedBy**: `string`

Copyright owner

***

### resourcePolicy

> **resourcePolicy**: `IJsonLdNodeObject`

ODRL Policy
