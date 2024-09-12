# Interface: IFederatedCatalogue

Interface describing a Fed Catalogue Contract.

## Extends

- `IService`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the service.

#### Inherited from

`IService.CLASS_NAME`

## Methods

### bootstrap()?

> `optional` **bootstrap**(`nodeLoggingConnectorType`?): `Promise`\<`boolean`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`boolean`\>

True if the bootstrapping process was successful.

#### Inherited from

`IService.bootstrap`

***

### start()?

> `optional` **start**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the node is initialized.

#### Parameters

• **nodeIdentity**: `string`

The identity of the node starting the service.

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be stopped when the node is closed.

#### Parameters

• **nodeIdentity**: `string`

The identity of the node stopping the service.

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### registerComplianceCredential()

> **registerComplianceCredential**(`credential`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

• **credential**: `string`

The credential as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### query()

> **query**(`participant`?, `legalRegistrationNumber`?, `lrnType`?, `cursor`?, `pageSize`?): `Promise`\<`object`\>

Query the federated catalogue.

#### Parameters

• **participant?**: `string`

The identity of the participant.

• **legalRegistrationNumber?**: `string`

The legal registration number.

• **lrnType?**: `string`

The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)

• **cursor?**: `string`

The cursor to request the next page of entities.

• **pageSize?**: `number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`object`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

##### entities

> **entities**: [`IParticipantEntry`](IParticipantEntry.md)[]

The entities, which can be partial if a limited keys list was provided.

##### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.
