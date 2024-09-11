// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

import { DidResolver } from "@gaia-x/json-web-signature-2020";
import { GeneralError } from "@gtsc/core";
import type { ILoggingConnector } from "@gtsc/logging-models";
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

export class JwtVerificationService {
	public readonly CLASS_NAME: string = nameof<JwtVerificationService>();

	/**
	 * DID service.
	 * @internal
	 */
	private readonly _didService: DIDService;

	constructor(loggingService: ILoggingConnector) {
		this._didService = new DIDService(new DidResolver(), loggingService);
	}

	/**
	 * Decodes the JWT.
	 * @param jwt JWT.
	 * @returns Decoded.
	 */
	public async decodeJwt(jwt: string): Promise<object> {
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

		const vpPayload = await this.decodeJWTWithKey(jwt, key);
		return vpPayload.payload;
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
	private async decodeJWTWithKey(jwt: string, key: KeyLike): Promise<JWTVerifyResult> {
		try {
			return jwtVerify(jwt, key);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "The signature validation has failed", {}, error);
		}
	}
}
