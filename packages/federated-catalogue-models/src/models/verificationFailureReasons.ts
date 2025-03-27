// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The verification failure reasons.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VerificationFailureReasons = {
  InvalidCredentialType: "invalidCredentialType",
  InvalidIssuer: "invalidIssuer",
  NotValidYet: "notValidYet",
  Expired: "expired",
  EvidenceCannotBeVerified: "evidenceCannotBeVerified",
  NoValidityEndPeriod: "noValidityEndPeriod",
  MissingSubject: "missingSubject",
  MissingEvidences: "missingEvidences",
  GeneralVerificationError: "generalVerificationError",
  IntegrityCheckFailed: "integrityCheckFailed",
  EvidenceCannotBeRetrieved: "evidenceCannotBeRetrieved"
} as const;

/**
 * The verification failure Reasons.
 */
export type VerificationFailureReasons = (typeof VerificationFailureReasons)[keyof typeof VerificationFailureReasons];
