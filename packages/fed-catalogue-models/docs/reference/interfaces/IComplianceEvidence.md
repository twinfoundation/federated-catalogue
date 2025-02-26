# Interface: IComplianceEvidence

Compliance Evidence.

## Extends

- `IJsonLdNodeObject`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### id

> **id**: `string`

Resolvable Id that allows to get access to the credential that serves as evidence.

***

### type

> **type**: `"CompliantCredential"`

Type of evidence.

***

### digestSRI

> **digestSRI**: `string`

One or more cryptographic digests, as defined by the hash-expression
ABNF grammar defined in the Subresource Integrity specification,
Section 3.5: The integrity attribute.

***

### credentialType

> **credentialType**: `string` \| `string`[]

Original type
