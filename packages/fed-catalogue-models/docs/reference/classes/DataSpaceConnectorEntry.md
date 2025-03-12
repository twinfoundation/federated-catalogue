# Class: DataSpaceConnectorEntry

Data Space Connector Entry.

## Constructors

### new DataSpaceConnectorEntry()

> **new DataSpaceConnectorEntry**(): [`DataSpaceConnectorEntry`](DataSpaceConnectorEntry.md)

#### Returns

[`DataSpaceConnectorEntry`](DataSpaceConnectorEntry.md)

## Properties

### id

> **id**: `string`

The Id.

***

### trustedIssuerId

> **trustedIssuerId**: `string`

The trusted issuer of the compliance credential.

***

### name?

> `optional` **name**: `string`

The name.

***

### description?

> `optional` **description**: `string`

The description.

***

### identity

> **identity**: `string`

The identity of the Data Space Connector

***

### maintainer

> **maintainer**: `string`

Who maintains the Data Space Connector

***

### defaultEndpoint

> **defaultEndpoint**: [`IEndpoint`](../interfaces/IEndpoint.md)

The default endpoint

***

### pushActivityEndpoint

> **pushActivityEndpoint**: [`IEndpoint`](../interfaces/IEndpoint.md)

The activity push endpoint

***

### subscriptionActivityEndpoint?

> `optional` **subscriptionActivityEndpoint**: [`IEndpoint`](../interfaces/IEndpoint.md)

The activity subscribe endpoint

***

### pullDataEndpoint

> **pullDataEndpoint**: [`IEndpoint`](../interfaces/IEndpoint.md)

The pull data endpoint

***

### offeredResource

> **offeredResource**: `string`[]

The pull data endpoint

***

### validFrom

> **validFrom**: `string`

Valid from

***

### validUntil

> **validUntil**: `string`

Valid to

***

### dateCreated

> **dateCreated**: `string`

Date created

***

### evidences

> **evidences**: `string`[]

Evidences
