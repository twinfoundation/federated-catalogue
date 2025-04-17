# Interface: IComplianceEvidence

Compliance Evidence.

## Extends

- `IJsonLdNodeObject`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

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
ABNF grammar defined in the Sub-resource Integrity specification,
Section 3.5: The integrity attribute.

***

### credentialType

> **credentialType**: `string` \| `string`[]

Original type
