# Class: ComplianceCredentialVerificationService

## Constructors

### new ComplianceCredentialVerificationService()

> **new ComplianceCredentialVerificationService**(): [`ComplianceCredentialVerificationService`](ComplianceCredentialVerificationService.md)

#### Returns

[`ComplianceCredentialVerificationService`](ComplianceCredentialVerificationService.md)

## Properties

### CLASS\_NAME

> **CLASS\_NAME**: `string`

## Methods

### verify()

> **verify**(`credential`): `Promise`\<`IVerificationResult`\>

#### Parameters

• **credential**: `IComplianceCredential`

#### Returns

`Promise`\<`IVerificationResult`\>

***

### verifyEvidence()

> `private` **verifyEvidence**(`evidence`): `Promise`\<`IVerificationResult`\>

#### Parameters

• **evidence**: `IComplianceEvidence`

#### Returns

`Promise`\<`IVerificationResult`\>
