// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DidResolver } from "@gaia-x/json-web-signature-2020";
import { GeneralError, Guards } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import type {
	IFederatedCatalogue,
	IParticipantEntry,
	ParticipantEntry
} from "@gtsc/fed-catalogue-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { DIDDocument, JsonWebKey } from "did-resolver";
import {
	type JWTVerifyResult,
	type KeyLike,
	type ProtectedHeaderParameters,
	decodeProtectedHeader,
	jwtVerify
} from "jose";
import { DIDService } from "./didService";

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
	 * DID service.
	 */
	private readonly _didService: DIDService;

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

		this._didService = new DIDService(new DidResolver(), this._loggingService);
	}

	/**
	 * Registers a compliance Credential to the service.
	 * @param credential The credential (wrapped into a presentation) as JWT.
	 * @returns Nothing.
	 */
	public async registerComplianceCredential(credential: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(credential), credential);

		const participantEntry: ParticipantEntry = {
			participantId: "1",
			legalRegistrationNumber: "xx",
			lrnType: "xx",
			trustedIssuerId: "x",
			legalName: "zzz"
		};

		await this._entityStorage.set(participantEntry);

		/*
		await this._loggingService.log({
			level:
		}); */
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
		/**
		 * Number of entities to return.
		 */
		pageSize?: number;
		/**
		 * Total entities length.
		 */
		totalEntities: number;
	}> {
		return {
			entities: [] as IParticipantEntry[],
			cursor: undefined,
			pageSize: 1,
			totalEntities: 1
		};
	}

	/**
	 * Decodes the JWT.
	 * @param jwt JWT.
	 * @returns Decoded.
	 */
	private async decodeJwt(jwt: string): Promise<object> {
		const decodedJWT: ProtectedHeaderParameters = this.decodeJWTHeaders(jwt);

		const { iss, kid } = this.getMandatoryHeadersOrFail(decodedJWT);

		const DID = await this._didService.getDIDDocumentFromDID(iss);
		const JWK = this.getJwkFromDid(DID, kid);
		if (!JWK) {
			throw new GeneralError(this.CLASS_NAME, "No JWK found on DID", { kid });
		}
		const key = await this._didService.getPublicKeyFromJWK(JWK);
		if (!key) {
			throw new GeneralError(this.CLASS_NAME, "Wrong public key on DID. Not JWK", { kid });
		}
		const vpPayload = await this.decodeJWT(jwt, key);
		return vpPayload;
	}

	/**
	 * Decodes JWT headers.
	 * @param jwtVerifiablePresentation a jwt containing a verifiable presentation as payload
	 * @returns ProtectedHeader parameters
	 * @throws BadRequestException if the string is not a valid JWT
	 * @throws InternalServerErrorException if the token was not decoded for an unknown reason
	 * @private
	 */
	private decodeJWTHeaders(jwtVerifiablePresentation: string): ProtectedHeaderParameters {
		try {
			return decodeProtectedHeader(jwtVerifiablePresentation);
		} catch (error) {
			if (
				(error as { message: string }).message === "Invalid Token or Protected Header formatting"
			) {
				throw new GeneralError(
					this.CLASS_NAME,
					"The payload is not a valid JWT and was not decoded"
				);
			} else {
				throw new GeneralError(
					this.CLASS_NAME,
					"An unexpected error has occurred on server-side and we don't know what happened",
					{},
					error
				);
			}
		}
	}

	/**
	 * Retrieves the two mandatory headers iss & kid from a JWT headers.
	 * Throws a BadRequestException if one of them is not present.
	 * @param decodedHeaders Decoded headers.
	 * @returns Issuer and kid.
	 * @private
	 * @see https://www.w3.org/TR/vc-jose-cose/#using-header-params-claims-key-discovery
	 */
	private getMandatoryHeadersOrFail(decodedHeaders: ProtectedHeaderParameters): {
		iss: string;
		kid: string;
	} {
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const iss = decodedHeaders["iss"] as string;
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const kid = decodedHeaders["kid"] as string;
		this.checkIssIsPresent(iss);
		this.checkKidIsPresent(kid);
		return { iss, kid };
	}

	/**
	 * Checks whether the kid header passed as parameter is present.
	 * @param kid a jwt header, might be null, empty or undefined
	 * @throws BadRequestException if the header is not filled
	 * @private
	 */
	private checkKidIsPresent(kid: string): void {
		if (!kid) {
			throw new GeneralError(
				this.CLASS_NAME,
				"The kid header referencing the verificationMethod of the DID is missing"
			);
		}
	}

	/**
	 * Checks whether the iss header passed as parameter is present.
	 * @param iss a jwt header, might be null, empty or undefined
	 * @throws BadRequestException if the header is not filled
	 * @private
	 */
	private checkIssIsPresent(iss: string): void {
		if (!iss) {
			throw new GeneralError(
				this.CLASS_NAME,
				"The iss header referencing the issuer's DID is missing"
			);
		}
	}

	/**
	 * Retrieves the verificationMethod JWK from a DID based on the JWT's kid header.
	 * @param DID the DIDDocument.
	 * @param kid the verificationMethod name.
	 * @returns JWK
	 * @throws GeneralError
	 * @private
	 */
	private getJwkFromDid(DID: DIDDocument, kid: string): JsonWebKey | undefined {
		try {
			return this._didService.getJWKFromDID(DID, kid);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "Invalid request", {}, error);
		}
	}

	/**
	 * Decode JWT.
	 * @param jwt JWT.
	 * @param key Key.
	 * @returns Verification result.
	 */
	private async decodeJWT(jwt: string, key: KeyLike): Promise<JWTVerifyResult> {
		try {
			return jwtVerify(jwt, key);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "The signature validation has failed", {}, error);
		}
	}
}
