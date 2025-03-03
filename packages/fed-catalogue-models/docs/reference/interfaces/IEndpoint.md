# Interface: IEndpoint

Endpoint as defined by the Gaia-X ontology.
https://docs.gaia-x.eu/ontology/development/classes/Endpoint

## Extends

- `IJsonLdNodeObject`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{\} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### type

> **type**: `undefined` \| `"Endpoint"`

The type of JSON-LD node. In this case it is allowed to be omitted as it is usually a child node.

***

### endpointURL

> **endpointURL**: `string`

The endpoint URL

***

### formalDescription?

> `optional` **formalDescription**: `string`

The formal description

***

### standardConformity?

> `optional` **standardConformity**: `IJsonLdNodeObject`

Standards conformity
