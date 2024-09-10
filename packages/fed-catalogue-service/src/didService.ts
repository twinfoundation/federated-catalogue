// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { DidResolver } from "@gaia-x/json-web-signature-2020";
import { ConflictError, GeneralError } from "@gtsc/core";
import type { ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { FetchHelper, HttpStatusCode } from "@gtsc/web";
import type { DIDDocument, JsonWebKey } from "did-resolver";
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

	// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
	private readonly _didCache: Record<string, DIDDocument>;

	// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
	private readonly _certificateCache: Record<string, string>;

	private readonly _didResolver: DidResolver;

	/**
	 * Logging service.
	 */
	private readonly _logger: ILoggingConnector;

	/**
	 * Constructor.
	 * @param didResolver DID Resolver.
	 * @param logger Logging.
	 */
	constructor(didResolver: DidResolver, logger: ILoggingConnector) {
		this._didCache = {};
		this._certificateCache = {};
		this._didResolver = didResolver;
		this._logger = logger;
	}

	/**
	 * Returns DID Doc from DID.
	 * @param did DID.
	 * @returns DID Document.
	 */
	public async getDIDDocumentFromDID(did: string): Promise<DIDDocument> {
		const cachedDID = this._didCache[did];
		// eslint-disable-next-line no-constant-condition
		if (false) {
			return cachedDID;
		}
		let didDocument: DIDDocument;
		try {
			didDocument = await this._didResolver.resolve(did);
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
		this._didCache[did] = didDocument;
		return didDocument || undefined;
	}

	/**
	 * Gets JWK from DID.
	 * @param didDocument DID Doc.
	 * @param verificationMethodName Ver method.
	 * @returns JWK.
	 * @throws Error
	 */
	public getJWKFromDID(
		didDocument: DIDDocument,
		verificationMethodName: string
	): JsonWebKey | undefined {
		const verificationMethod = didDocument.verificationMethod?.find(
			verMethod => verMethod.id === verificationMethodName
		);
		if (!verificationMethod) {
			throw new GeneralError(
				this.CLASS_NAME,
				`Unable to find verificationMethod ${verificationMethodName} in the DID ${didDocument.id}`
			);
		}
		return didDocument.verificationMethod?.find(
			verMethod => verMethod.id === verificationMethodName
		)?.publicKeyJwk;
	}

	/**
	 * Public key from JWK.
	 * @param jwk JWK.
	 * @returns Public Key.
	 */
	public async getPublicKeyFromJWK(jwk: JsonWebKey): Promise<KeyLike> {
		return (await importJWK(jwk)) as KeyLike;
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
		const certificateCached = this._certificateCache[url];
		if (certificateCached) {
			return certificateCached;
		}
		try {
			const response = await FetchHelper.fetch(this.CLASS_NAME, url, "GET");
			if (response.status === HttpStatusCode.ok) {
				const data = await response.text();
				const cert = data.replace(/\n/gm, "");
				this._certificateCache[url] = cert;
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
