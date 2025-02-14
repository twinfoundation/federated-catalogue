// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import { FederatedCatalogueTypes } from "../fedCatalogueTypes";
import { IDataResource } from "../../gaia-x/IDataResource";

export interface IDataResourceSubject extends IJsonLdNodeObject, IDataResource {
	"@context":
		| typeof FederatedCatalogueTypes.Gaia_X_LD_Context
		| [typeof FederatedCatalogueTypes.Gaia_X_LD_Context, ...IJsonLdContextDefinitionElement[]];
}
