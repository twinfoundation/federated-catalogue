// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IComplianceCredential } from "@twin.org/federated-catalogue-models";
import { VerificationHelper, type IIdentityResolverComponent } from "@twin.org/identity-models";
import { nameof } from "@twin.org/nameof";

/**
 * Verifies a JWT
 * @internal
 */
export class JwtVerificationService {
	public readonly CLASS_NAME: string = nameof<JwtVerificationService>();

	/**
	 * Identity Resolver component.
	 * @internal
	 */
	private readonly _resolver: IIdentityResolverComponent;

	/**
	 * Constructor.
	 * @param resolver The resolver used.
	 */
	constructor(resolver: IIdentityResolverComponent) {
		this._resolver = resolver;
	}

	/**
	 * Decodes the JWT.
	 * @param jwt JWT.
	 * @returns Decoded.
	 */
	public async decodeJwt(jwt: string): Promise<IComplianceCredential> {
		const { payload } = await VerificationHelper.verifyJwt(this._resolver, jwt);
		return payload as unknown as IComplianceCredential;
	}
}
