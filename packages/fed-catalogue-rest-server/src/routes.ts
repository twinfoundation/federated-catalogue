// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { generateRestRoutesAuthentication } from "@gtsc/api-auth-entity-storage-service";
import type { IRestRoute } from "@gtsc/api-models";
import { generateRestRoutesInformation } from "@gtsc/api-service";
import { generateRestRoutesLogging } from "@gtsc/logging-service";
i

/**
 * The routes for the application.
 * @returns The routes for the application.
 */
export function buildRoutes(): IRestRoute[] {
	return [
		...generateRestRoutesInformation("", INFORMATION_SERVICE_NAME),
		...generateRestRoutesAuthentication("authentication", AUTH_SERVICE_NAME),
		...generateRestRoutesBlobStorage("blob-storage", BLOB_STORAGE_SERVICE_NAME),
		...generateRestRoutesLogging("logging", LOGGING_SERVICE_NAME),
		...generateRestRoutesTelemetry("telemetry", TELEMETRY_SERVICE_NAME),
		...generateRestRoutesIdentity("identity", IDENTITY_SERVICE_NAME),
		...generateRestRoutesIdentityProfile("identity/profile", IDENTITY_PROFILE_SERVICE_NAME),
		...generateRestRoutesNft("nft", NFT_SERVICE_NAME),
		...generateRestRoutesAttestation("attestation", ATTESTATION_SERVICE_NAME)
	];
}
