# Interface: IParticipantEntry

Interface describing a participant.

## Extends

- [`IParticipant`](IParticipant.md).`ICatalogEntry`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdNodeObject`[] \| `IJsonLdGraphObject` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{\}

## Properties

### @context

> **@context**: `"https://w3id.org/gaia-x/development#"` \| \[`"https://w3id.org/gaia-x/development#"`, `...IJsonLdContextDefinitionElement[]`\]

The LD context

#### Inherited from

[`IParticipant`](IParticipant.md).[`@context`](IParticipant.md#@context)

***

### id

> **id**: `string`

The participant Id.

#### Inherited from

[`IParticipant`](IParticipant.md).[`id`](IParticipant.md#id)

***

### type

> **type**: `"LegalPerson"`

JSON-LD type.

#### Inherited from

[`IParticipant`](IParticipant.md).[`type`](IParticipant.md#type)

***

### registrationNumber

> **registrationNumber**: [`IRegistrationNumber`](IRegistrationNumber.md)

The legal registration number.

#### Inherited from

[`IParticipant`](IParticipant.md).[`registrationNumber`](IParticipant.md#registrationnumber)

***

### legalName

> **legalName**: `string`

The legal name.

#### Inherited from

[`IParticipant`](IParticipant.md).[`legalName`](IParticipant.md#legalname)

***

### legalAddress

> **legalAddress**: [`IAddress`](IAddress.md)

Legal Address

#### Inherited from

[`IParticipant`](IParticipant.md).[`legalAddress`](IParticipant.md#legaladdress)

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
