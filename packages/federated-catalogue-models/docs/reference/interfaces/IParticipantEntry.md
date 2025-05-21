# Interface: IParticipantEntry

Interface describing a participant.

## Extends

- `IParticipant`.`ICatalogueBase`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogueBase.issuer`

***

### validFrom

> **validFrom**: `string`

Valid from (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueBase.validFrom`

***

### validUntil

> **validUntil**: `string`

Valid until (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueBase.validUntil`

***

### dateCreated

> **dateCreated**: `string`

The creation date.

#### Inherited from

`ICatalogueBase.dateCreated`

***

### evidence

> **evidence**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogueBase.evidence`

***

### @context

> **@context**: [`FederatedCatalogueContextType`](../type-aliases/FederatedCatalogueContextType.md)

The LD Context

#### Overrides

`IParticipant.@context`
