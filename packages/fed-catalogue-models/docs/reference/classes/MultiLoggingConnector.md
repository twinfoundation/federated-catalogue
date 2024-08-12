# Class: MultiLoggingConnector

Class for performing logging operations on multiple connectors.

## Implements

- [`ILoggingConnector`](../interfaces/ILoggingConnector.md)

## Constructors

### new MultiLoggingConnector()

> **new MultiLoggingConnector**(`options`): [`MultiLoggingConnector`](MultiLoggingConnector.md)

Create a new instance of MultiLoggingConnector.

#### Parameters

• **options**

The options for the connector.

• **options.loggingConnectorTypes**: `string`[]

The logging connectors to multiplex.

• **options.config?**: [`ILoggingLevelsConfig`](../interfaces/ILoggingLevelsConfig.md)

The configuration for the logging connector.

#### Returns

[`MultiLoggingConnector`](MultiLoggingConnector.md)

## Properties

### NAMESPACE

> `static` `readonly` **NAMESPACE**: `string` = `"multi"`

The namespace for the logging connector.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

[`ILoggingConnector`](../interfaces/ILoggingConnector.md).[`CLASS_NAME`](../interfaces/ILoggingConnector.md#class_name)

***

### \_loggingConnectors

> `private` `readonly` **\_loggingConnectors**: [`ILoggingConnector`](../interfaces/ILoggingConnector.md)[]

The connectors to send the log entries to.

***

### \_levels

> `private` `readonly` **\_levels**: [`LogLevel`](../type-aliases/LogLevel.md)[]

The log levels to display, will default to all.

## Methods

### log()

> **log**(`logEntry`): `Promise`\<`void`\>

Log an entry to the connector.

#### Parameters

• **logEntry**: [`ILogEntry`](../interfaces/ILogEntry.md)

The entry to log.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

[`ILoggingConnector`](../interfaces/ILoggingConnector.md).[`log`](../interfaces/ILoggingConnector.md#log)

***

### query()

> **query**(`conditions`?, `sortProperties`?, `properties`?, `cursor`?, `pageSize`?): `Promise`\<`object`\>

Query the log entries.

#### Parameters

• **conditions?**: `EntityCondition`\<[`ILogEntry`](../interfaces/ILogEntry.md)\>

The conditions to match for the entities.

• **sortProperties?**: `object`[]

The optional sort order.

• **properties?**: keyof [`ILogEntry`](../interfaces/ILogEntry.md)[]

The optional keys to return, defaults to all.

• **cursor?**: `string`

The cursor to request the next page of entities.

• **pageSize?**: `number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`object`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

##### entities

> **entities**: `Partial`\<[`ILogEntry`](../interfaces/ILogEntry.md)\>[]

The entities, which can be partial if a limited keys list was provided.

##### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.

##### pageSize?

> `optional` **pageSize**: `number`

Number of entities to return.

##### totalEntities

> **totalEntities**: `number`

Total entities length.

#### Implementation of

[`ILoggingConnector`](../interfaces/ILoggingConnector.md).[`query`](../interfaces/ILoggingConnector.md#query)

#### Throws

NotImplementedError if the implementation does not support retrieval.
