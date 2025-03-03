// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { ConflictError, GeneralError, Is } from "@twin.org/core";
import type { IIdentityResolverConnector } from "@twin.org/identity-models";
import type { ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import type { IDidDocument, IDidDocumentVerificationMethod } from "@twin.org/standards-w3c-did";
import { FetchHelper, HttpStatusCode, type IJwk } from "@twin.org/web";
import * as jose from "jose";
import { type KeyLike, importJWK } from "jose";

/**
 * DID Service.
 */
export class DIDService {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<DIDService>();

	/**
	 * The DID Resolver being used.
	 */
	private readonly _didResolver: IIdentityResolverConnector;

	/**
	 * Logging service.
	 */
	private readonly _logger: ILoggingConnector;

	/**
	 * Constructor.
	 * @param didResolver DID Resolver.
	 * @param logger Logging.
	 */
	constructor(didResolver: IIdentityResolverConnector, logger: ILoggingConnector) {
		this._didResolver = didResolver;
		this._logger = logger;
	}

	/**
	 * Returns DID Doc from DID.
	 * @param did DID.
	 * @returns DID Document.
	 */
	public async getDIDDocumentFromDID(did: string): Promise<IDidDocument> {
		let didDocument: IDidDocument;
		try {
			didDocument = await this._didResolver.resolveDocument(did);
		} catch (error) {
			this._logger.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: "DID Resolution error",
				data: { did }
			});
			throw new ConflictError(this.CLASS_NAME, `Unable to retrieve your did ${did}`, "", [], error);
		}

		if (
			!didDocument?.verificationMethod ||
			didDocument?.verificationMethod?.constructor !== Array
		) {
			this._logger.log({
				level: "error",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: `DID ${did} does not contain verificationMethod array`,
				data: { did }
			});
			throw new ConflictError(
				this.CLASS_NAME,
				`DID ${did} does not contain the verificationMethod array`
			);
		}

		return didDocument;
	}

	/**
	 * Gets JWK from DID.
	 * @param didDocument DID Doc.
	 * @param verificationMethodName Ver method.
	 * @returns JWK.
	 * @throws Error
	 */
	public getJWKFromDID(
		didDocument: IDidDocument,
		verificationMethodName: string
	): IJwk | undefined {
		const verificationMethod = didDocument.verificationMethod?.find(
			verMethod => (verMethod as IDidDocumentVerificationMethod).id === verificationMethodName
		) as IDidDocumentVerificationMethod;

		if (Is.undefined(verificationMethod)) {
			throw new GeneralError(
				this.CLASS_NAME,
				`Unable to find verificationMethod ${verificationMethodName} in the DID ${didDocument.id}`
			);
		}
		return verificationMethod.publicKeyJwk;
	}

	/**
	 * Public key from JWK.
	 * @param jwk JWK.
	 * @returns Public Key.
	 */
	public async getPublicKeyFromJWK(jwk: IJwk): Promise<KeyLike> {
		return (await importJWK(jwk as jose.JWK)) as KeyLike;
	}

	/**
	 * Checks X5U matches public key.
	 * @param publicKey PK.
	 * @param x5uURL X5U URL.
	 * @returns Bool.
	 * @throws Error.
	 */
	public async checkx5uMatchesPublicKey(publicKey: KeyLike, x5uURL: string): Promise<boolean> {
		try {
			const spki = await jose.exportSPKI(publicKey);
			const certificatePem = await this.loadCertificatesRaw(x5uURL);
			const x509 = await jose.importX509(certificatePem, "");
			const spkiX509 = await jose.exportSPKI(x509);

			return spki === spkiX509;
		} catch (error) {
			throw new ConflictError(
				this.CLASS_NAME,
				"Could not confirm X509 public key with certificate chain.",
				"",
				[],
				error
			);
		}
	}

	/**
	 * Loads Raw Certificate.
	 * @param url URL.
	 * @returns Raw Certificate.
	 */
	public async loadCertificatesRaw(url: string): Promise<string> {
		try {
			const response = await FetchHelper.fetch(this.CLASS_NAME, url, "GET");
			if (response.status === HttpStatusCode.ok) {
				const data = await response.text();
				this._logger.log({
					source: this.CLASS_NAME,
					level: "info",
					message: "X5U Certificate loaded",
					ts: Date.now()
				});
				const cert = data.replace(/\n/gm, "");
				return cert;
			}
			// eslint-disable-next-line no-restricted-syntax
			throw new Error(`HTTP Status: ${response.status}`);
		} catch (error) {
			this._logger.log({
				level: "warn",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: `Unable to load x509 certificate from  ${url}`
			});
			throw new ConflictError(
				this.CLASS_NAME,
				`Could not load X509 certificate(s) at ${url}`,
				"",
				[],
				error
			);
		}
	}
}
