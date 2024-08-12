# Interface: ILogEntry

Interface describing a log entry.

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

The level of the error being logged.

***

### source

> **source**: `string`

The source of the log entry.

***

### ts?

> `optional` **ts**: `number`

The timestamp of the log entry, if left blank will be populated by the connector.

***

### message

> **message**: `string`

The message.

***

### error?

> `optional` **error**: `IError`

Optional error details.

***

### data?

> `optional` **data**: `object`

Optional data for the message.

#### Index signature

 \[`key`: `string`\]: `unknown`
