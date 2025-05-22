# Variable: VerificationFailureReasons

> `const` **VerificationFailureReasons**: `object`

The verification failure reasons.

## Type declaration

### InvalidCredentialType

> `readonly` **InvalidCredentialType**: `"invalidCredentialType"` = `"invalidCredentialType"`

Credential type is invalid.

### InvalidIssuer

> `readonly` **InvalidIssuer**: `"invalidIssuer"` = `"invalidIssuer"`

The issuer is invalid.

### NotValidYet

> `readonly` **NotValidYet**: `"notValidYet"` = `"notValidYet"`

Credential is not valid yet.

### Expired

> `readonly` **Expired**: `"expired"` = `"expired"`

Credential ahs expired.

### EvidenceCannotBeVerified

> `readonly` **EvidenceCannotBeVerified**: `"evidenceCannotBeVerified"` = `"evidenceCannotBeVerified"`

Credential's evidence cannot be verified.

### NoValidityEndPeriod

> `readonly` **NoValidityEndPeriod**: `"noValidityEndPeriod"` = `"noValidityEndPeriod"`

Credential has no expiration.

### MissingSubject

> `readonly` **MissingSubject**: `"missingSubject"` = `"missingSubject"`

Credential's subject is missing.

### MissingEvidences

> `readonly` **MissingEvidences**: `"missingEvidences"` = `"missingEvidences"`

Credential's evidences are missing.

### GeneralVerificationError

> `readonly` **GeneralVerificationError**: `"generalVerificationError"` = `"generalVerificationError"`

General error happened while verifying and the credential cannot be deemed as verified.

### IntegrityCheckFailed

> `readonly` **IntegrityCheckFailed**: `"integrityCheckFailed"` = `"integrityCheckFailed"`

Credential's integrity check has failed

### EvidenceCannotBeRetrieved

> `readonly` **EvidenceCannotBeRetrieved**: `"evidenceCannotBeRetrieved"` = `"evidenceCannotBeRetrieved"`

Credential's Evidence cannot be retrieved.
