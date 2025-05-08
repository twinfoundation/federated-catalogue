# Interface: IParticipantEntry

Interface describing a participant.

## Extends

- `IParticipant`.`ICatalogueEntry`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogueEntry.issuer`

***

### validFrom

> **validFrom**: `string`

Valid from (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueEntry.validFrom`

***

### validUntil

> **validUntil**: `string`

Valid until (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueEntry.validUntil`

***

### dateCreated

> **dateCreated**: `string`

The creation date.

#### Inherited from

`ICatalogueEntry.dateCreated`

***

### evidence

> **evidence**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogueEntry.evidence`

***

### @context

> **@context**: [`FederatedCatalogueContextType`](../type-aliases/FederatedCatalogueContextType.md)

The LD Context

#### Overrides

`IParticipant.@context`

***

### id

> **id**: `string`

The participant Id.

#### Inherited from

`IParticipant.id`

***

### type

> **type**: `"LegalPerson"`

JSON-LD type.

#### Inherited from

`IParticipant.type`

***

### registrationNumber

> **registrationNumber**: `IRegistrationNumber`

The legal registration number.

#### Inherited from

`IParticipant.registrationNumber`

***

### legalName

> **legalName**: `string`

The legal name.

#### Inherited from

`IParticipant.legalName`

***

### legalAddress

> **legalAddress**: `IAddress`

Legal Address

#### Inherited from

`IParticipant.legalAddress`
