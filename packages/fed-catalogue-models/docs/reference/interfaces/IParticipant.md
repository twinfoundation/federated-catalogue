# Interface: IParticipant

A Legal Person participating in the ecosystem

## Extends

- `IJsonLdNodeObject`

## Extended by

- [`IParticipantEntry`](IParticipantEntry.md)

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{\} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD context

#### Overrides

`IJsonLdNodeObject.@context`

***

### id

> **id**: `string`

The participant Id.

***

### type

> **type**: `"LegalPerson"`

JSON-LD type.

***

### registrationNumber

> **registrationNumber**: [`IRegistrationNumber`](IRegistrationNumber.md)

The legal registration number.

***

### legalName

> **legalName**: `string`

The legal name.

***

### legalAddress

> **legalAddress**: [`IAddress`](IAddress.md)

Legal Address
