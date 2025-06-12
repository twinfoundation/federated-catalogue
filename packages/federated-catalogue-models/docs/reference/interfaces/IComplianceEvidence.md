# Interface: IComplianceEvidence

Compliance Evidence.

## Extends

- `IJsonLdNodeObject`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdGraphObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdNodeObject`[] \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \}

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
