// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

import { Guards, Is, UnprocessableError } from "@gtsc/core";
import { ComparisonOperator, type EntityCondition } from "@gtsc/entity";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import type {
	DataResourceEntry,
	IComplianceCredential,
	IDataResourceCredential,
	IDataResourceEntry,
	IFederatedCatalogue,
	IParticipantEntry,
	IServiceDescriptionCredential,
	IServiceDescriptionEntry,
	IVerifiableCredential,
	ParticipantEntry,
	ServiceDescriptionEntry
} from "@gtsc/fed-catalogue-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { ComplianceCredentialVerificationService } from "./verification/complianceCredentialVerificationService";
import { JwtVerificationService } from "./verification/jwtVerificationService";
import { ServiceDescriptionCredentialVerificationService } from "./verification/serviceDescriptionCredentialVerificationService";

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
	 * Storage service for participants.
	 */
	private readonly _entityStorageParticipants: IEntityStorageConnector<ParticipantEntry>;

	/**
	 * Storage service for service descriptions.
	 */
	private readonly _entityStorageSDs: IEntityStorageConnector<ServiceDescriptionEntry>;

	/**
	 * Storage service for service descriptions.
	 */
	private readonly _entityStorageResources: IEntityStorageConnector<DataResourceEntry>;

	/**
	 * JWT Verifier service.
	 * @internal
	 */
	private readonly _jwtVerifier: JwtVerificationService;

	/**
	 * Compliance Credential Verifier service.
	 * @internal
	 */
	private readonly _complianceCredentialVerifier: ComplianceCredentialVerificationService;

	/**
	 * SD Credential Verifier service.
	 * @internal
	 */
	private readonly _serviceDescriptionCredentialVerifier: ServiceDescriptionCredentialVerificationService;

	/**
	 * Create a new instance of FederatedCatalogue service.
	 * @param options The options for the connector.
	 * @param options.loggingConnectorType The type of the logging connector to use, defaults to "logging".
	 * @param options.entityStorageConnectorName The name of the Entity Connector, defaults to "participant-entry".
	 */
	constructor(options?: { loggingConnectorType?: string; entityStorageConnectorName?: string }) {
		this._loggingService = LoggingConnectorFactory.get(options?.loggingConnectorType ?? "logging");
		this._entityStorageParticipants = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ParticipantEntry>
		>(options?.entityStorageConnectorName ?? "participant-entry");

		this._entityStorageSDs = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ServiceDescriptionEntry>
		>("service-description-entry");

		this._entityStorageResources =
			EntityStorageConnectorFactory.get<IEntityStorageConnector<DataResourceEntry>>(
				"data-resource-entry"
			);

		this._jwtVerifier = new JwtVerificationService(this._loggingService);
		this._complianceCredentialVerifier = new ComplianceCredentialVerificationService(
			this._loggingService
		);
		this._serviceDescriptionCredentialVerifier =
			new ServiceDescriptionCredentialVerificationService(this._loggingService);
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

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

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

		await this._entityStorageParticipants.set(participantEntry);

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
	 * @param id The identity of the participant.
	 * @param legalRegistrationNumber The legal registration number.
	 * @param lrnType The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async queryParticipants(
		id?: string,
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
		const conditions: EntityCondition<ParticipantEntry>[] = [];

		if (Is.stringValue(id)) {
			const condition: EntityCondition<ParticipantEntry> = {
				property: "id",
				value: id,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(lrnType)) {
			const condition: EntityCondition<ParticipantEntry> = {
				property: "lrnType",
				value: lrnType,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(legalRegistrationNumber)) {
			const condition: EntityCondition<ParticipantEntry> = {
				property: "registrationNumber",
				value: legalRegistrationNumber,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageParticipants.query({ conditions });
		return {
			entities: entries.entities as IParticipantEntry[],
			cursor: entries.cursor
		};
	}

	/**
	 * Registers a compliance Credential to the service.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerServiceDescriptionCredential(credentialJwt: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const sdCredential = (await this._jwtVerifier.decodeJwt(
			credentialJwt
		)) as IComplianceCredential;

		const result = await this._complianceCredentialVerifier.verify(sdCredential);

		if (!result.verified) {
			this._loggingService.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Service Description credential cannot be verified",
				data: { result }
			});

			throw new UnprocessableError(
				this.CLASS_NAME,
				"Service Description credential cannot be verified",
				{
					reason: result.verificationFailureReason
				}
			);
		}

		const targetCredential = result.credentials.find(
			credential => credential.credentialSubject.type === "gx:ServiceOffering"
		) as unknown as IServiceDescriptionCredential;

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === "gx:DataResource"
		) as unknown as IDataResourceCredential[];

		if (targetCredential) {
			const serviceProvider = targetCredential.credentialSubject["gx:providedBy"] as string;
			await this.checkParticipantExists(serviceProvider);

			const serviceDescriptionEntry = this.extractServiceDescriptionEntry(
				targetCredential,
				dataResourceCredentials
			);
			await this._entityStorageSDs.set(serviceDescriptionEntry);
		}

		if (!dataResourceCredentials || !Is.arrayValue(dataResourceCredentials)) {
			this._loggingService.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "At least a data resource has to be provided"
			});

			throw new UnprocessableError(this.CLASS_NAME, "At least a data resource has to be provided");
		}

		for (const dataResourceCredential of dataResourceCredentials) {
			const dataResourceEntry = this.extractDataResourceEntry(dataResourceCredential);
			await this._entityStorageResources.set(dataResourceEntry);
		}

		await this._loggingService.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "Service Description credential verified and new entry added to the Fed Catalogue",
			data: {
				providedBy:
					targetCredential?.credentialSubject["gx:providedBy"] ??
					dataResourceCredentials[0].credentialSubject["gx:producedBy"],
				trustedIssuer: sdCredential.issuer
			}
		});
	}

	/**
	 * Query the federated catalogue.
	 * @param providedBy The identity of the participant.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async queryServiceDescriptions(
		providedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IServiceDescriptionEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const conditions: EntityCondition<ServiceDescriptionEntry>[] = [];

		if (Is.stringValue(providedBy)) {
			const condition: EntityCondition<ServiceDescriptionEntry> = {
				property: "providedBy",
				value: providedBy,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageSDs.query({ conditions });
		return {
			entities: entries.entities as IServiceDescriptionEntry[],
			cursor: entries.cursor
		};
	}

	/**
	 * Query the federated catalogue.
	 * @param id The identity of the DataResource.
	 * @param producedBy The identity of the participant.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async queryDataResourceDescriptions(
		id?: string,
		producedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IDataResourceEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const conditions: EntityCondition<ServiceDescriptionEntry>[] = [];

		if (Is.stringValue(producedBy)) {
			const condition: EntityCondition<ServiceDescriptionEntry> = {
				property: "producedBy",
				value: producedBy,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(id)) {
			const condition: EntityCondition<ServiceDescriptionEntry> = {
				property: "id",
				value: id,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageResources.query({ conditions });
		return {
			entities: entries.entities as IDataResourceEntry[],
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
		credentials: IVerifiableCredential[]
	): IParticipantEntry {
		const legalParticipantData = credentials.find(
			cred => cred.type === "gx:LegalParticipant"
		)?.credentialSubject;
		const legalRegistrationData = credentials.find(
			cred => cred.type === "gx:legalRegistrationNumber"
		)?.credentialSubject;
		const legalRegistrationEvidence = credentials.find(
			cred => cred.type === "gx:legalRegistrationNumber"
		)?.evidence;

		Guards.objectValue(this.CLASS_NAME, nameof(legalParticipantData), legalParticipantData);
		Guards.objectValue(this.CLASS_NAME, nameof(legalRegistrationData), legalRegistrationData);
		Guards.objectValue(this.CLASS_NAME, nameof(legalRegistrationData), legalRegistrationEvidence);

		const evidences: string[] = [];
		for (const evidence of complianceCredential.credentialSubject["gx:evidence"]) {
			evidences.push(evidence.id as string);
		}

		const result: IParticipantEntry = {
			id: participantId,
			type: "Participant",
			registrationNumber: legalRegistrationData["gx:taxId"] as string,
			lrnType: legalRegistrationEvidence["gx:evidenceOf"] as string,
			countryCode: legalRegistrationData["gx:countryCode"] as string,
			trustedIssuerId: complianceCredential.issuer,
			legalName: legalParticipantData["gx:legalName"] as string,
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidences
		};

		return result;
	}

	/**
	 * Extracts service description entry from the credentials.
	 * @param sdCredential SD credential.
	 * @param dataResourceCredentials Data Resource credential.
	 * @returns Service Description Entry to be saved on the Database.
	 */
	private extractServiceDescriptionEntry(
		sdCredential: IServiceDescriptionCredential,
		dataResourceCredentials: IDataResourceCredential[]
	): IServiceDescriptionEntry {
		const credentialData = sdCredential.credentialSubject;

		// A custom type for TLIP Node probably would be needed
		// at the moment this hack can be enough
		const nodeCredential = dataResourceCredentials.find(credential =>
			credential.id.includes("tlipNodeResourceVC")
		);

		const result: IServiceDescriptionEntry = {
			id: credentialData.id,
			type: "ServiceOffering",
			providedBy: credentialData["gx:providedBy"],
			servicePolicy: credentialData["gx:servicePolicy"],
			name: credentialData["gx:name"],
			endpointURL: nodeCredential?.credentialSubject["gx:exposedThrough"] as string,
			validFrom: sdCredential.validFrom,
			validUntil: sdCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidences: [sdCredential.id],
			aggregationOfResources: credentialData["gx:aggregationOfResources"]
		};

		return result;
	}

	/**
	 * Extracts data resource entry from the credentials.
	 * @param dataResourceCredential Data Resource credential.
	 * @returns DataResource Entry to be saved on the Database.
	 */
	private extractDataResourceEntry(
		dataResourceCredential: IDataResourceCredential
	): IDataResourceEntry {
		const credentialData = dataResourceCredential.credentialSubject;

		const result: IDataResourceEntry = {
			id: credentialData.id,
			type: "DataResource",
			producedBy: credentialData["gx:producedBy"],
			copyrightOwnedBy: credentialData["gx:copyrightOwnedBy"],
			license: credentialData["gx:license"],
			resourcePolicy: credentialData["gx:resourcePolicy"],
			name: credentialData["gx:name"],
			exposedThrough: credentialData["gx:exposedThrough"],
			validFrom: dataResourceCredential.validFrom,
			validUntil: dataResourceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidences: [dataResourceCredential.id]
		};

		return result;
	}

	private async checkParticipantExists(participantId: string): Promise<void> {
		const participantData = await this._entityStorageParticipants.get(participantId);
		if (!participantData) {
			this._loggingService.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Service provider is not known as participant",
				data: { providedBy: participantId }
			});

			throw new UnprocessableError(
				this.CLASS_NAME,
				"Service provider is not known as participant",
				{
					providedBy: participantId
				}
			);
		}
	}
}
