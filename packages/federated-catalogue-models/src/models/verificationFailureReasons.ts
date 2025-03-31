// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The verification failure reasons.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VerificationFailureReasons = {
	/**
	 * Credential type is invalid.
	 */
	InvalidCredentialType: "invalidCredentialType",

	/**
	 * The issuer is invalid.
	 */
	InvalidIssuer: "invalidIssuer",

	/**
	 * Credential is not valid yet.
	 */
	NotValidYet: "notValidYet",

	/**
	 * Credential ahs expired.
	 */
	Expired: "expired",

	/**
	 * Credential's evidence cannot be verified.
	 */
	EvidenceCannotBeVerified: "evidenceCannotBeVerified",

	/**
	 * Credential has no expiration.
	 */
	NoValidityEndPeriod: "noValidityEndPeriod",

	/**
	 * Credential's subject is missing.
	 */
	MissingSubject: "missingSubject",

	/**
	 * Credential's evidences are missing.
	 */
	MissingEvidences: "missingEvidences",

	/**
	 * General error happened while verifying and the credential cannot be deemed as verified.
	 */
	GeneralVerificationError: "generalVerificationError",

	/**
	 * Credential's integrity check has failed
	 */
	IntegrityCheckFailed: "integrityCheckFailed",

	/**
	 * Credential's Evidence cannot be retrieved.
	 */
	EvidenceCannotBeRetrieved: "evidenceCannotBeRetrieved"
} as const;

/**
 * The verification failure Reasons.
 */
export type VerificationFailureReasons =
	(typeof VerificationFailureReasons)[keyof typeof VerificationFailureReasons];
