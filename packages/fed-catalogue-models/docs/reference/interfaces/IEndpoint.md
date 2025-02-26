# Interface: IEndpoint

Endpoint as defined by the Gaia-X ontology.
https://docs.gaia-x.eu/ontology/development/classes/Endpoint

## Extends

- `IJsonLdNodeObject`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

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
