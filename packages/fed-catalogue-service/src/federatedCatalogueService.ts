// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Guards, UnprocessableError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import type {
	IComplianceCredential,
	IFederatedCatalogue,
	IParticipantEntry,
	IVerifiableCredential,
	ParticipantEntry
} from "@gtsc/fed-catalogue-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { ComplianceCredentialVerificationService } from "./verification/complianceCredentialVerificationService";
import { JwtVerificationService } from "./verification/jwtVerificationService";

/**
 * Service for performing logging operations to a connector.
 */
export class FederatedCatalogueService implements IFederatedCatalogue {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<FederatedCatalogueService>();

	/**
	 * Logging service.
	 */
	private readonly _loggingService: ILoggingConnector;

	/**
	 * Storage service.
	 */
	private readonly _entityStorage: IEntityStorageConnector<ParticipantEntry>;

	/**
	 * JWT Verifier service.
	 * @internal
	 */
	private readonly _jwtVerifier: JwtVerificationService;

	/**
	 * Compliance Credential Verifier service.
	 * @internal
	 */
	private readonly _credentialVerifier: ComplianceCredentialVerificationService;

	/**
	 * Create a new instance of FederatedCatalogue service.
	 * @param options The options for the connector.
	 * @param options.loggingConnectorType The type of the logging connector to use, defaults to "logging".
	 * @param options.entityStorageConnectorName The name of the Entity Connector, defaults to "participant-entry".
	 */
	constructor(options?: { loggingConnectorType?: string; entityStorageConnectorName?: string }) {
		this._loggingService = LoggingConnectorFactory.get(options?.loggingConnectorType ?? "logging");
		this._entityStorage = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ParticipantEntry>
		>(options?.entityStorageConnectorName ?? "participant-entry");

		this._jwtVerifier = new JwtVerificationService(this._loggingService);
		this._credentialVerifier = new ComplianceCredentialVerificationService(this._loggingService);
	}

	/**
	 * Registers a compliance Credential to the service.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerComplianceCredential(credentialJwt: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = (await this._jwtVerifier.decodeJwt(
			credentialJwt
		)) as IComplianceCredential;

		const result = await this._credentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Compliance credential cannot be verified",
				data: { result }
			});

			throw new UnprocessableError(this.CLASS_NAME, "Compliance credential cannot be verified", {
				reason: result.verificationFailureReason
			});
		}

		const participantEntry = this.extractParticipantEntry(
			// Workaround to deal with GX Compliance Service
			complianceCredential.credentialSubject.id.split("#")[0],
			complianceCredential,
			result.credentials
		);

		await this._entityStorage.set(participantEntry);

		await this._loggingService.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "Compliance credential verified and new entry added to the Fed Catalogue",
			data: {
				participantId: complianceCredential.credentialSubject.id,
				trustedIssuer: complianceCredential.issuer
			}
		});
	}

	/**
	 * Query the federated catalogue.
	 * @param participantId The identity of the participant.
	 * @param legalRegistrationNumber The legal registration number.
	 * @param lrnType The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async query(
		participantId?: string,
		legalRegistrationNumber?: string,
		lrnType?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IParticipantEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const entries = await this._entityStorage.query();
		return {
			entities: entries.entities as IParticipantEntry[],
			cursor: entries.cursor
		};
	}

	/**
	 * Extracts participant entry from the credentials.
	 * @param participantId Participant Id.
	 * @param complianceCredential Compliance credential
	 * @param credentials The Credentials extracted.
	 * @returns Participant Entry to be saved on the Database.
	 */
	private extractParticipantEntry(
		participantId: string,
		complianceCredential: IComplianceCredential,
		credentials: { [type: string]: IVerifiableCredential }
	): IParticipantEntry {
		const legalParticipantData = credentials["gx:LegalParticipant"].credentialSubject;
		const legalRegistrationData = credentials["gx:legalRegistrationNumber"].credentialSubject;
		const legalRegistrationEvidence = credentials["gx:legalRegistrationNumber"].evidence;

		const result: IParticipantEntry = {
			participantId,
			legalRegistrationNumber: legalRegistrationData["gx:taxId"] as string,
			lrnType: legalRegistrationEvidence["gx:evidenceOf"] as string,
			countryCode: legalRegistrationData["gx:countryCode"] as string,
			trustedIssuerId: complianceCredential.issuer,
			legalName: legalParticipantData["gx:legalName"] as string,
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString()
		};

		return result;
	}
}
