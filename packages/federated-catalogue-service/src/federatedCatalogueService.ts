// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import {
	ArrayHelper,
	ComponentFactory,
	GeneralError,
	Guards,
	Is,
	NotFoundError,
	ObjectHelper,
	StringHelper,
	UnprocessableError
} from "@twin.org/core";
import { JsonLdProcessor } from "@twin.org/data-json-ld";
import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";
import { ComparisonOperator, type EntityCondition } from "@twin.org/entity";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import {
	type IComplianceCredential,
	type IDataResourceCredential,
	type IDataResourceEntry,
	type IFederatedCatalogue,
	type IParticipantEntry,
	type IServiceOfferingCredential,
	type IServiceOfferingEntry,
	type IDataSpaceConnectorEntry,
	type IDataSpaceConnectorCredential,
	type IParticipantCredential,
	FederatedCatalogueTypes,
	type IParticipantList,
	type IDataResourceList,
	type IDataSpaceConnectorList,
	type IServiceOfferingList,
	FederatedCatalogueContextInstances,
	type FederatedCatalogueEntryType
} from "@twin.org/federated-catalogue-models";
import { VerificationHelper, type IIdentityResolverComponent } from "@twin.org/identity-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import { GaiaXTypes, type IParticipant } from "@twin.org/standards-gaia-x";
import { SchemaOrgDataTypes, SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { IOdrlPolicy } from "@twin.org/standards-w3c-odrl";
import type { DataResourceEntry } from "./entities/dataResourceEntry";
import type { DataSpaceConnectorEntry } from "./entities/dataSpaceConnectorEntry";
import type { ParticipantEntry } from "./entities/participantEntry";
import type { ServiceOfferingEntry } from "./entities/serviceOfferingEntry";
import type { IFederatedCatalogueConstructorOptions } from "./models/IFederatedCatalogueConstructorOptions";
import { ComplianceCredentialVerificationService } from "./verification/complianceCredentialVerificationService";

/**
 * Service for performing logging operations to a connector.
 */
export class FederatedCatalogueService implements IFederatedCatalogue {
	/**
	 * Fields to skip when persisting entries to the Catalogue
	 * @internal
	 */
	private static readonly _FIELDS_TO_SKIP = ["@context", "type"];

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<FederatedCatalogueService>();

	/**
	 * The identity resolver used to dereference DIDs.
	 * @internal
	 */
	private readonly _resolver: IIdentityResolverComponent;

	/**
	 * Logging service.
	 * @internal
	 */
	private readonly _loggingService?: ILoggingConnector;

	/**
	 * Storage service for participants.
	 * @internal
	 */
	private readonly _entityStorageParticipants: IEntityStorageConnector<ParticipantEntry>;

	/**
	 * Storage service for service offering.
	 * @internal
	 */
	private readonly _entityStorageServiceOfferings: IEntityStorageConnector<ServiceOfferingEntry>;

	/**
	 * Storage service for data resources.
	 * @internal
	 */
	private readonly _entityStorageDataResources: IEntityStorageConnector<DataResourceEntry>;

	/**
	 * Storage service for data resources.
	 * @internal
	 */
	private readonly _entityStorageDataSpaceConnectors: IEntityStorageConnector<DataSpaceConnectorEntry>;

	/**
	 * Compliance Credential Verifier service.
	 * @internal
	 */
	private readonly _complianceCredentialVerifier: ComplianceCredentialVerificationService;

	/**
	 * Create a new instance of FederatedCatalogue service.
	 * @param options The options for the connector.
	 */
	constructor(options: IFederatedCatalogueConstructorOptions) {
		this._loggingService = LoggingConnectorFactory.getIfExists(
			options?.loggingConnectorType ?? "logging"
		);

		this._entityStorageParticipants = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ParticipantEntry>
		>(StringHelper.kebabCase(nameof<ParticipantEntry>()));

		this._entityStorageServiceOfferings = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<ServiceOfferingEntry>
		>(StringHelper.kebabCase(nameof<ServiceOfferingEntry>()));

		this._entityStorageDataResources = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<DataResourceEntry>
		>(StringHelper.kebabCase(nameof<DataResourceEntry>()));

		this._entityStorageDataSpaceConnectors = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<DataSpaceConnectorEntry>
		>(StringHelper.kebabCase(nameof<DataSpaceConnectorEntry>()));

		this._resolver = ComponentFactory.get<IIdentityResolverComponent>(
			options.identityResolverComponentType ?? "identity-resolver"
		);

		this._complianceCredentialVerifier = new ComplianceCredentialVerificationService(
			options.config.clearingHouseApproverList,
			this._resolver,
			options.config.subResourceCacheTtlMs,
			this._loggingService
		);

		SchemaOrgDataTypes.registerRedirects();
	}

	/**
	 * Registers a Participant's compliance Credential.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns The Id of the Participant (DID usually).
	 */
	public async registerComplianceCredential(credentialJwt: string): Promise<string> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = await this.decodeJwt(credentialJwt);

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "complianceCredentialNotVerified",
				data: { result }
			});

			throw new UnprocessableError(this.CLASS_NAME, "complianceCredentialNotVerified", {
				reason: result.verificationFailureReason
			});
		}

		const targetCredential = result.credentials.find(
			credential => credential.credentialSubject.type === GaiaXTypes.Participant
		) as IParticipantCredential;

		if (Is.undefined(targetCredential)) {
			throw new UnprocessableError(this.CLASS_NAME, "noEvidence");
		}
		const participantEntry = this.extractParticipantEntry(complianceCredential, targetCredential);
		const theEntry = ObjectHelper.omit<IParticipantEntry>(
			participantEntry,
			FederatedCatalogueService._FIELDS_TO_SKIP
		);
		await this._entityStorageParticipants.set(theEntry as IParticipantEntry);

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "complianceCredentialVerified",
			data: {
				participantId: complianceCredential.credentialSubject?.id,
				trustedIssuer: complianceCredential.issuer
			}
		});

		return participantEntry.id;
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
	): Promise<IParticipantList> {
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

		const entries = await this._entityStorageParticipants.query(
			{ conditions },
			undefined,
			undefined,
			cursor,
			pageSize
		);

		const itemList = entries.entities.map(entry => {
			(entry as IParticipantEntry).type = GaiaXTypes.Participant;
			return entry;
		});
		const result = {
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
			type: SchemaOrgTypes.ItemList,
			itemListElement: itemList,
			nextItem: entries.cursor
		};

		return JsonLdProcessor.compact(result, result["@context"]);
	}

	/**
	 * Returns a Federated Catalogue entry.
	 * @param entryType The type of entry.
	 * @param entryId The entry's id.
	 * @returns Catalogue Entry
	 * @throws NotFoundError if not found.
	 */
	public async getEntry<T>(entryType: FederatedCatalogueEntryType, entryId: string): Promise<T> {
		Guards.stringValue(this.CLASS_NAME, nameof(entryId), entryId);

		let itemsAndCursor;
		switch (entryType) {
			case GaiaXTypes.Participant:
				itemsAndCursor = await this.queryParticipants(entryId);
				break;
			case GaiaXTypes.DataExchangeComponent:
			case FederatedCatalogueTypes.DataSpaceConnector:
				itemsAndCursor = await this.queryDataSpaceConnectors(entryId);
				break;
			case GaiaXTypes.ServiceOffering:
				itemsAndCursor = await this.queryServiceOfferings(entryId);
				break;
			case GaiaXTypes.DataResource:
				itemsAndCursor = await this.queryDataResources(entryId);
				break;
			default:
				throw new GeneralError(this.CLASS_NAME, "unknownEntryType", { entryType });
		}

		if (Is.arrayValue(itemsAndCursor?.itemListElement)) {
			const entry = {
				type: GaiaXTypes.Participant,
				"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
				...itemsAndCursor.itemListElement[0]
			};

			const result = await JsonLdProcessor.compact(entry, entry["@context"]);

			return result as T;
		}

		throw new NotFoundError(this.CLASS_NAME, "entryNotFound", entryId);
	}

	/**
	 * Registers a compliance Credential concerning a Data Space Connector.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns The identifier of the Data Space Connector registered.
	 */
	public async registerDataSpaceConnectorCredential(credentialJwt: string): Promise<string> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = await this.decodeJwt(credentialJwt);

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "complianceCredentialNotVerified",
				data: { result }
			});

			throw new UnprocessableError(this.CLASS_NAME, "complianceCredentialNotVerified", {
				reason: result.verificationFailureReason
			});
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
			throw new UnprocessableError(this.CLASS_NAME, "noEvidence");
		}

		await this.checkParticipantExists(targetCredential.issuer as string);

		const dataSpaceConnectorEntry = this.extractDataSpaceConnectorEntry(
			complianceCredential,
			result.credentials[0] as IDataSpaceConnectorCredential
		);
		const theEntry = ObjectHelper.omit<IDataSpaceConnectorEntry>(
			dataSpaceConnectorEntry,
			FederatedCatalogueService._FIELDS_TO_SKIP
		);
		await this._entityStorageDataSpaceConnectors.set(theEntry as IDataSpaceConnectorEntry);

		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				complianceCredential,
				dataResourceCredential
			);
			const drEntry = ObjectHelper.omit<IDataResourceEntry>(
				dataResourceEntry,
				FederatedCatalogueService._FIELDS_TO_SKIP
			);
			await this._entityStorageDataResources.set(drEntry as IDataResourceEntry);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "complianceCredentialVerified",
			data: {
				dataSpaceConnectorId: complianceCredential.credentialSubject?.id,
				trustedIssuer: complianceCredential.issuer
			}
		});

		return dataSpaceConnectorEntry.id;
	}

	/**
	 * Registers a data resource Credential concerning a Data Space Connector.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns The list of Data Resources created.
	 */
	public async registerDataResourceCredential(credentialJwt: string): Promise<string[]> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const complianceCredential = await this.decodeJwt(credentialJwt);

		const result = await this._complianceCredentialVerifier.verify(complianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "complianceCredentialNotVerified",
				data: { result }
			});

			throw new UnprocessableError(this.CLASS_NAME, "complianceCredentialNotVerified", {
				reason: result.verificationFailureReason
			});
		}

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.DataResource
		) as IDataResourceCredential[];

		if (dataResourceCredentials.length === 0) {
			throw new UnprocessableError(this.CLASS_NAME, "noEvidence");
		}

		const dataResourceIds: string[] = [];
		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				complianceCredential,
				dataResourceCredential
			);
			const theEntry = ObjectHelper.omit<IDataResourceEntry>(
				dataResourceEntry,
				FederatedCatalogueService._FIELDS_TO_SKIP
			);

			await this._entityStorageDataResources.set(theEntry as IDataResourceEntry);

			dataResourceIds.push(dataResourceEntry.id);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "complianceCredentialVerified",
			data: {
				dataResourceIds,
				trustedIssuer: complianceCredential.issuer
			}
		});

		return dataResourceIds;
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
	): Promise<IDataSpaceConnectorList> {
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

		const entries = await this._entityStorageDataSpaceConnectors.query(
			{ conditions },
			undefined,
			undefined,
			cursor,
			pageSize
		);

		const itemList = entries.entities.map(entry => {
			(entry as IDataSpaceConnectorEntry).type = [
				GaiaXTypes.DataExchangeComponent,
				FederatedCatalogueTypes.DataSpaceConnector
			];
			return entry;
		});
		const result = {
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
			type: SchemaOrgTypes.ItemList,
			itemListElement: itemList,
			nextItem: entries.cursor
		};

		return JsonLdProcessor.compact(result, result["@context"]);
	}

	/**
	 * Registers a Service Offering Credential.
	 * @param credentialJwt The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerServiceOfferingCredential(credentialJwt: string): Promise<string[]> {
		Guards.string(this.CLASS_NAME, nameof(credentialJwt), credentialJwt);

		// This will raise exceptions as it has been coded reusing code from Gaia-X
		const sdComplianceCredential = await this.decodeJwt(credentialJwt);

		const result = await this._complianceCredentialVerifier.verify(sdComplianceCredential);

		if (!result.verified) {
			this._loggingService?.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "complianceCredentialNotVerified",
				data: { result }
			});

			throw new UnprocessableError(this.CLASS_NAME, "complianceCredentialNotVerified", {
				reason: result.verificationFailureReason
			});
		}

		const serviceOfferingCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.ServiceOffering
		) as IServiceOfferingCredential[];

		const dataResourceCredentials = result.credentials.filter(
			credential => credential.credentialSubject.type === GaiaXTypes.DataResource
		) as IDataResourceCredential[];

		if (serviceOfferingCredentials.length === 0) {
			throw new UnprocessableError(this.CLASS_NAME, "noEvidence");
		}

		const serviceOfferingIds: string[] = [];

		for (const serviceOfferingCredential of serviceOfferingCredentials) {
			const serviceIssuer = serviceOfferingCredential.issuer;
			await this.checkParticipantExists(serviceIssuer as string);

			const serviceOfferingEntry = this.extractServiceOfferingEntry(
				sdComplianceCredential,
				serviceOfferingCredential
			);
			const theEntry = ObjectHelper.omit<IServiceOfferingEntry>(
				serviceOfferingEntry,
				FederatedCatalogueService._FIELDS_TO_SKIP
			);
			await this._entityStorageServiceOfferings.set(theEntry as IServiceOfferingEntry);

			serviceOfferingIds.push(serviceOfferingEntry.id);
		}

		for (const dataResourceCredential of dataResourceCredentials) {
			await this.checkParticipantExists(dataResourceCredential.issuer as string);

			const dataResourceEntry = this.extractDataResourceEntry(
				sdComplianceCredential,
				dataResourceCredential
			);
			await this._entityStorageDataResources.set(dataResourceEntry);
		}

		await this._loggingService?.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: "complianceCredentialVerified",
			data: {
				serviceOfferingIds,
				trustedIssuer: sdComplianceCredential.issuer
			}
		});

		return serviceOfferingIds;
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
	): Promise<IServiceOfferingList> {
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

		const entries = await this._entityStorageServiceOfferings.query(
			{ conditions },
			undefined,
			undefined,
			cursor,
			pageSize
		);

		const itemList = entries.entities.map(entry => {
			(entry as IServiceOfferingEntry).type = GaiaXTypes.ServiceOffering;
			return entry;
		});
		const result = {
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
			type: SchemaOrgTypes.ItemList,
			itemListElement: itemList as IServiceOfferingEntry[],
			nextItem: entries.cursor
		};

		return JsonLdProcessor.compact(result, result["@context"]);
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
	): Promise<IDataResourceList> {
		const conditions: EntityCondition<DataResourceEntry>[] = [];

		if (Is.stringValue(producedBy)) {
			const condition: EntityCondition<DataResourceEntry> = {
				property: "producedBy",
				value: producedBy,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		if (Is.stringValue(id)) {
			const condition: EntityCondition<DataResourceEntry> = {
				property: "id",
				value: id,
				comparison: ComparisonOperator.Equals
			};

			conditions.push(condition);
		}

		const entries = await this._entityStorageDataResources.query(
			{ conditions },
			undefined,
			undefined,
			cursor,
			pageSize
		);

		const itemList = entries.entities.map(entry => {
			(entry as IDataResourceEntry).type = GaiaXTypes.DataResource;
			return entry;
		});
		const result = {
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
			type: SchemaOrgTypes.ItemList,
			itemListElement: itemList as IDataResourceEntry[],
			nextItem: entries.cursor
		};

		return JsonLdProcessor.compact(result, result["@context"]);
	}

	/**
	 * Decodes the JWT.
	 * @param jwt JWT.
	 * @returns Decoded.
	 */
	private async decodeJwt(jwt: string): Promise<IComplianceCredential> {
		const { payload } = await VerificationHelper.verifyJwt(this._resolver, jwt);
		return payload as unknown as IComplianceCredential;
	}

	/**
	 * Returns the trusted Issuer id.
	 * @param complianceCredential The compliance credential.
	 * @returns The trusted issuer.
	 */
	private getTrustedIssuerId(complianceCredential: IComplianceCredential): string {
		const trustedIssuerId = Is.object<{ id: string }>(complianceCredential.issuer)
			? complianceCredential.issuer.id
			: (complianceCredential.issuer as string);

		return trustedIssuerId;
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
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
			issuer: this.getTrustedIssuerId(complianceCredential),
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidence: evidences
		};

		return result;
	}

	/**
	 * Extracts Data Space Connector description entry from the credentials.
	 * @param complianceCredential Compliance Credential.
	 * @param dataSpaceConnectorCredential Evidence Credential.
	 * @returns Service Description Entry to be saved on the Database.
	 */
	private extractDataSpaceConnectorEntry(
		complianceCredential: IComplianceCredential,
		dataSpaceConnectorCredential: IDataSpaceConnectorCredential
	): IDataSpaceConnectorEntry {
		const credentialData = dataSpaceConnectorCredential.credentialSubject;

		Guards.objectValue(this.CLASS_NAME, nameof(credentialData), credentialData);

		const { offeredResource, ...deStructuredData } = credentialData;

		const result: IDataSpaceConnectorEntry = {
			...deStructuredData,
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
			offeredResource: Object.keys(offeredResource),
			issuer: this.getTrustedIssuerId(complianceCredential),
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidence: [dataSpaceConnectorCredential.id]
		};

		return result;
	}

	/**
	 * Extracts service offering entry from the credentials.
	 * @param complianceCredential The Compliance Credential.
	 * @param serviceOfferingCredential Service Offering credential (evidence).
	 * @returns Service Offering Entry to be saved on the Database.
	 */
	private extractServiceOfferingEntry(
		complianceCredential: IComplianceCredential,
		serviceOfferingCredential: IServiceOfferingCredential
	): IServiceOfferingEntry {
		const credentialData = serviceOfferingCredential.credentialSubject;

		Guards.objectValue(this.CLASS_NAME, nameof(credentialData), credentialData);

		const { providedBy, aggregationOfResources, servicePolicy, ...deStructuredData } =
			credentialData;

		const result: IServiceOfferingEntry = {
			...deStructuredData,
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
			providedBy: Is.string(providedBy) ? providedBy : providedBy.id,
			aggregationOfResources: aggregationOfResources as string[],
			issuer: this.getTrustedIssuerId(complianceCredential),
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidence: [serviceOfferingCredential.id as string],
			servicePolicy: ArrayHelper.fromObjectOrArray<IJsonLdNodeObject>(
				servicePolicy
			) as IOdrlPolicy[]
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

		const { producedBy, copyrightOwnedBy, exposedThrough, resourcePolicy, ...deStructuredData } =
			credentialData;

		let producedByValue = producedBy;
		if (Is.object<IParticipant>(producedByValue)) {
			producedByValue = producedByValue.id;
		}

		let copyrightOwnedByValue = copyrightOwnedBy;
		if (Is.object<IParticipant>(copyrightOwnedByValue)) {
			copyrightOwnedByValue = copyrightOwnedByValue.id;
		}

		const result: IDataResourceEntry = {
			...deStructuredData,
			"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
			issuer: this.getTrustedIssuerId(complianceCredential),
			producedBy: producedByValue,
			copyrightOwnedBy: copyrightOwnedByValue,
			exposedThrough: exposedThrough as string,
			validFrom: complianceCredential.validFrom,
			validUntil: complianceCredential.validUntil,
			dateCreated: new Date().toISOString(),
			evidence: [dataResourceCredential.id as string],
			resourcePolicy: ArrayHelper.fromObjectOrArray<IJsonLdNodeObject>(
				resourcePolicy
			) as IOdrlPolicy[]
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
				message: "providerIsNotParticipant",
				data: { providedBy: participantId }
			});

			throw new UnprocessableError(this.CLASS_NAME, "providerIsNotParticipant", {
				providedBy: participantId
			});
		}
	}
}
