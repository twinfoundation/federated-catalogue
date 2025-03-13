// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Guards, Is, ObjectHelper, StringHelper, UnprocessableError } from "@twin.org/core";
import { ComparisonOperator, type EntityCondition } from "@twin.org/entity";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import {
	type DataResourceEntry,
	type DataSpaceConnectorEntry,
	type IComplianceCredential,
	type IDataResourceCredential,
	type IDataResourceEntry,
	type IFederatedCatalogue,
	type IParticipantEntry,
	type IServiceOfferingCredential,
	type IServiceOfferingEntry,
	type ServiceOfferingEntry,
	type IDataSpaceConnectorEntry,
	type IDataSpaceConnectorCredential,
	type IParticipantCredential,
	FederatedCatalogueTypes,
	GaiaXTypes,
	type ParticipantEntry
} from "@twin.org/federated-catalogue-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import type { IFederatedCatalogueOptions } from "./IFederatedCatalogueOptions";
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
	private readonly _loggingService?: ILoggingConnector;

	/**
	 * Storage service for participants.
	 */
	private readonly _entityStorageParticipants: IEntityStorageConnector<ParticipantEntry>;

	/**
	 * Storage service for service offering.
	 */
	private readonly _entityStorageSOs: IEntityStorageConnector<ServiceOfferingEntry>;

	/**
	 * Storage service for data resources.
	 */
	private readonly _entityStorageResources: IEntityStorageConnector<DataResourceEntry>;

	/**
	 * Storage service for data resources.
	 */
	private readonly _entityStorageDataSpaceConnectors: IEntityStorageConnector<DataSpaceConnectorEntry>;

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
	 * Create a new instance of FederatedCatalogue service.
	 * @param options The options for the connector.
	 */
	constructor(options: IFederatedCatalogueOptions) {
		this._loggingService = LoggingConnectorFactory.getIfExists(
			options?.loggingConnectorType ?? "logging"
		);

		this._entityStorageParticipants = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ParticipantEntry>
		>(StringHelper.kebabCase(nameof<ParticipantEntry>()));

		this._entityStorageSOs = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ServiceOfferingEntry>
		>(StringHelper.kebabCase(nameof<ServiceOfferingEntry>()));

		this._entityStorageResources = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<DataResourceEntry>
		>(StringHelper.kebabCase(nameof<DataResourceEntry>()));

		this._entityStorageDataSpaceConnectors = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<DataSpaceConnectorEntry>
		>(StringHelper.kebabCase(nameof<DataSpaceConnectorEntry>()));

		this._jwtVerifier = new JwtVerificationService(
			options?.didResolverEndpoint,
			this._loggingService
		);
		this._complianceCredentialVerifier = new ComplianceCredentialVerificationService(
			options.clearingHouseWhiteList,
			this._loggingService
		);
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
			this._loggingService?.log({
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

		const targetCredential = result.credentials.find(
			credential => credential.credentialSubject.type === GaiaXTypes.Participant
		) as IParticipantCredential;

		if (Is.undefined(targetCredential)) {
			throw new UnprocessableError(this.CLASS_NAME, "No Participant Credential evidence provided");
		}
		const participantEntry = this.extractParticipantEntry(complianceCredential, targetCredential);
		const theEntry = ObjectHelper.omit<IParticipantEntry>(participantEntry, ["type", "@context"]);
		await this._entityStorageParticipants.set(theEntry as IParticipantEntry);

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message:
				"Compliance credential verified and new Participant entry added to the Fed Catalogue",
			data: {
				participantId: complianceCredential.credentialSubject?.id,
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
	 * Registers a compliance Credential concerning a Data Space Connector.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerDataSpaceConnectorCredential(credentialJwt: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = (await this._jwtVerifier.decodeJwt(
			credentialJwt
		)) as IComplianceCredential;

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Compliance DS Connector credential cannot be verified",
				data: { result }
			});

			throw new UnprocessableError(
				this.CLASS_NAME,
				"Compliance DS Connector credential cannot be verified",
				{
					reason: result.verificationFailureReason
				}
			);
		}

		const targetCredential = result.credentials.find(credential => {
			if (Is.array(credential.credentialSubject.type)) {
				return credential.credentialSubject.type.includes(
					FederatedCatalogueTypes.DataSpaceConnector
				);
			}
			return credential.credentialSubject.type === FederatedCatalogueTypes.DataSpaceConnector;
		}) as IDataSpaceConnectorCredential;

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.DataResource
		) as IDataResourceCredential[];

		if (Is.undefined(targetCredential)) {
			throw new UnprocessableError(
				this.CLASS_NAME,
				"Data Space Connector credential not referenced from Compliance Credential"
			);
		}

		await this.checkParticipantExists(targetCredential.issuer as string);

		const dataSpaceConnectorEntry = this.extractDataSpaceConnectorEntry(
			complianceCredential,
			result.credentials[0] as IDataSpaceConnectorCredential
		);
		const theEntry = ObjectHelper.omit<IDataSpaceConnectorEntry>(dataSpaceConnectorEntry, [
			"type",
			"@context"
		]);
		await this._entityStorageDataSpaceConnectors.set(theEntry as IDataSpaceConnectorEntry);

		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				complianceCredential,
				dataResourceCredential
			);
			const drEntry = ObjectHelper.omit<IDataResourceEntry>(dataResourceEntry, [
				"type",
				"@context"
			]);
			await this._entityStorageResources.set(drEntry as IDataResourceEntry);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message:
				"Compliance credential verified and new Data Space Connector entry added to the Fed Catalogue",
			data: {
				participantId: complianceCredential.credentialSubject?.id,
				trustedIssuer: complianceCredential.issuer
			}
		});
	}

	/**
	 * Registers a data resource Credential concerning a Data Space Connector.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerDataResourceCredential(credentialJwt: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = (await this._jwtVerifier.decodeJwt(
			credentialJwt
		)) as IComplianceCredential;

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Compliance Data Resource credential cannot be verified",
				data: { result }
			});

			throw new UnprocessableError(
				this.CLASS_NAME,
				"Compliance Data Resource credential cannot be verified",
				{
					reason: result.verificationFailureReason
				}
			);
		}

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.DataResource
		) as IDataResourceCredential[];

		if (dataResourceCredentials.length === 0) {
			throw new UnprocessableError(
				this.CLASS_NAME,
				"Data Resource credential not referenced from Compliance Credential"
			);
		}

		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				complianceCredential,
				dataResourceCredential
			);
			const theEntry = ObjectHelper.omit<IDataResourceEntry>(dataResourceEntry, [
				"type",
				"@context"
			]);

			await this._entityStorageResources.set(theEntry as IDataResourceEntry);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message:
				"Compliance credential verified and new Data Resource entry(ies) added to the Fed Catalogue",
			data: {
				participantId: complianceCredential.credentialSubject?.id,
				trustedIssuer: complianceCredential.issuer
			}
		});
	}

	/**
	 * Query the federated catalogue.
	 * @param id The identity of the participant.
	 * @param maintainer The DS Connector maintainer.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async queryDataSpaceConnectors(
		id?: string,
		maintainer?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IDataSpaceConnectorEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const conditions: EntityCondition<DataSpaceConnectorEntry>[] = [];

		if (Is.stringValue(id)) {
			const condition: EntityCondition<DataSpaceConnectorEntry> = {
				property: "id",
				value: id,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(maintainer)) {
			const condition: EntityCondition<DataSpaceConnectorEntry> = {
				property: "maintainer",
				value: maintainer,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageDataSpaceConnectors.query({ conditions });
		return {
			entities: entries.entities as IDataSpaceConnectorEntry[],
			cursor: entries.cursor
		};
	}

	/**
	 * Registers a Service Offering Credential.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerServiceOfferingCredential(credentialJwt: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const sdComplianceCredential = (await this._jwtVerifier.decodeJwt(
			credentialJwt
		)) as IComplianceCredential;

		const result = await this._complianceCredentialVerifier.verify(sdComplianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Service Description credential cannot be verified",
				data: { result }
			});

			throw new UnprocessableError(
				this.CLASS_NAME,
				"Service Offering credential cannot be verified",
				{
					reason: result.verificationFailureReason
				}
			);
		}

		const serviceOfferingCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.ServiceOffering
		) as IServiceOfferingCredential[];

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.DataResource
		) as IDataResourceCredential[];

		if (serviceOfferingCredentials.length === 0) {
			throw new UnprocessableError(
				this.CLASS_NAME,
				"Service Offering credential not referenced from Compliance Credential"
			);
		}

		for (const serviceOfferingCredential of serviceOfferingCredentials) {
			const serviceIssuer = serviceOfferingCredential.issuer;
			await this.checkParticipantExists(serviceIssuer as string);

			const serviceOfferingEntry = this.extractServiceOfferingEntry(
				sdComplianceCredential,
				serviceOfferingCredential
			);
			const theEntry = ObjectHelper.omit<IServiceOfferingEntry>(serviceOfferingEntry, [
				"type",
				"@context"
			]);
			await this._entityStorageSOs.set(theEntry as IServiceOfferingEntry);
		}

		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				sdComplianceCredential,
				dataResourceCredential
			);
			await this._entityStorageResources.set(dataResourceEntry);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "Service Offering credential verified and new entry added to the Fed Catalogue",
			data: {
				providedBy: serviceOfferingCredentials[0].credentialSubject.providedBy,
				trustedIssuer: sdComplianceCredential.issuer
			}
		});
	}

	/**
	 * Query the federated catalogue.
	 * @param id Service Id.
	 * @param providedBy The identity of the participant.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	public async queryServiceOfferings(
		id?: string,
		providedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IServiceOfferingEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const conditions: EntityCondition<ServiceOfferingEntry>[] = [];

		if (Is.stringValue(providedBy)) {
			const condition: EntityCondition<ServiceOfferingEntry> = {
				property: "providedBy",
				value: providedBy,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(id)) {
			const condition: EntityCondition<ServiceOfferingEntry> = {
				property: "id",
				value: id,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageSOs.query({ conditions });
		return {
			entities: entries.entities as IServiceOfferingEntry[],
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
	public async queryDataResources(
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
		const conditions: EntityCondition<ServiceOfferingEntry>[] = [];

		if (Is.stringValue(producedBy)) {
			const condition: EntityCondition<ServiceOfferingEntry> = {
				property: "producedBy",
				value: producedBy,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(id)) {
			const condition: EntityCondition<ServiceOfferingEntry> = {
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
	 * @param complianceCredential Compliance credential
	 * @param participantCredential The Participant credential extracted.
	 * @returns Participant Entry to be saved on the Database.
	 */
	private extractParticipantEntry(
		complianceCredential: IComplianceCredential,
		participantCredential: IParticipantCredential
	): IParticipantEntry {
		const participantData = participantCredential.credentialSubject;

		Guards.objectValue(this.CLASS_NAME, nameof(participantData), participantData);

		const evidences: string[] = [];
		for (const evidence of complianceCredential.evidence) {
			evidences.push(evidence.id as string);
		}

		const result: IParticipantEntry = {
			...participantData,
			trustedIssuerId: complianceCredential.issuer as string,
			validFrom: complianceCredential.validFrom as string,
			validUntil: complianceCredential.validUntil as string,
			dateCreated: new Date().toISOString(),
			evidences
		};

		return result;
	}

	/**
	 * Extracts Data Space Connector description entry from the credentials.
	 * @param complianceCredential Compliance Credential.
	 * @param dsCredential Evidence Credential.
	 * @returns Service Description Entry to be saved on the Database.
	 */
	private extractDataSpaceConnectorEntry(
		complianceCredential: IComplianceCredential,
		dsCredential: IDataSpaceConnectorCredential
	): IDataSpaceConnectorEntry {
		const credentialData = dsCredential.credentialSubject;

		Guards.objectValue(this.CLASS_NAME, nameof(credentialData), credentialData);

		const { offeredResource, ...deStructuredData } = credentialData;

		const result: IDataSpaceConnectorEntry = {
			...deStructuredData,
			offeredResource: Object.keys(offeredResource),
			trustedIssuerId: complianceCredential.issuer as string,
			validFrom: dsCredential.validFrom as string,
			validUntil: dsCredential.validUntil as string,
			dateCreated: new Date().toISOString(),
			evidences: [dsCredential.id]
		};

		return result;
	}

	/**
	 * Extracts service offering entry from the credentials.
	 * @param complianceCredential The Compliance Credential.
	 * @param sdCredential SD credential.
	 * @returns Service Offering Entry to be saved on the Database.
	 */
	private extractServiceOfferingEntry(
		complianceCredential: IComplianceCredential,
		sdCredential: IServiceOfferingCredential
	): IServiceOfferingEntry {
		const credentialData = sdCredential.credentialSubject;

		Guards.objectValue(this.CLASS_NAME, nameof(credentialData), credentialData);

		const { providedBy, aggregationOfResources, ...deStructuredData } = credentialData;

		const result: IServiceOfferingEntry = {
			...deStructuredData,
			providedBy: providedBy as string,
			aggregationOfResources: aggregationOfResources as string[],
			trustedIssuerId: complianceCredential.issuer as string,
			validFrom: sdCredential.validFrom as string,
			validUntil: sdCredential.validUntil as string,
			dateCreated: new Date().toISOString(),
			evidences: [sdCredential.id as string]
		};

		return result;
	}

	/**
	 * Extracts data resource entry from the credentials.
	 * @param complianceCredential The Compliance Credential.
	 * @param dataResourceCredential Data Resource credential.
	 * @returns DataResource Entry to be saved on the Database.
	 */
	private extractDataResourceEntry(
		complianceCredential: IComplianceCredential,
		dataResourceCredential: IDataResourceCredential
	): IDataResourceEntry {
		const credentialData = dataResourceCredential.credentialSubject;
		Guards.objectValue(this.CLASS_NAME, nameof(credentialData), credentialData);

		const { producedBy, exposedThrough, ...deStructuredData } = credentialData;

		const result: IDataResourceEntry = {
			...deStructuredData,
			trustedIssuerId: complianceCredential.issuer as string,
			producedBy: producedBy as string,
			exposedThrough: exposedThrough as string,
			validFrom: dataResourceCredential.validFrom as string,
			validUntil: dataResourceCredential.validUntil as string,
			dateCreated: new Date().toISOString(),
			evidences: [dataResourceCredential.id as string]
		};

		return result;
	}

	/**
	 * Checks whether the Participant exists.
	 * @param participantId The Participant identifier
	 */
	private async checkParticipantExists(participantId: string): Promise<void> {
		const participantData = await this._entityStorageParticipants.get(participantId);
		if (!participantData) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "Provider is not known as participant",
				data: { providedBy: participantId }
			});

			throw new UnprocessableError(this.CLASS_NAME, "Provider is not known as participant", {
				providedBy: participantId
			});
		}
	}
}
