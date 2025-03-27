# Interface: IComplianceVerificationResult

Compliance verification result

## Extends

- [`IVerificationResult`](IVerificationResult.md)

## Properties

### credentials

> **credentials**: [`ICredential`](ICredential.md)[]

The credentials involved

***

### evidenceVerificationResult?

> `optional` **evidenceVerificationResult**: [`IVerificationResult`](IVerificationResult.md)

Filled in case an evidence cannot be verified to provide the reason

***

### evidenceFailedToVerify?

> `optional` **evidenceFailedToVerify**: `string`[]

The evidences that failed to be verified.

***

### verified

> **verified**: `boolean`

True if verified. False the opposite.

#### Inherited from

[`IVerificationResult`](IVerificationResult.md).[`verified`](IVerificationResult.md#verified)

***

### verificationFailureReason?

> `optional` **verificationFailureReason**: `string`

Verification failure reason.

#### Inherited from

[`IVerificationResult`](IVerificationResult.md).[`verificationFailureReason`](IVerificationResult.md#verificationfailurereason)
