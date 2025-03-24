# Interface: IParticipantEntry

Interface describing a participant.

## Extends

- `IParticipant`.`ICatalogEntry`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{\} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

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
