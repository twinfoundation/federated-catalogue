// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import { IServiceOffering } from "../../gaia-x/IServiceOffering";
import { FederatedCatalogueTypes } from "../fedCatalogueTypes";

/**
 * Service Offering Subject. See Gaia-X Ontology.
 */
export interface IServiceOfferingSubject extends IJsonLdNodeObject, IServiceOffering {
	"@context":
		| typeof FederatedCatalogueTypes.Gaia_X_LD_Context
		| [typeof FederatedCatalogueTypes.Gaia_X_LD_Context, ...IJsonLdContextDefinitionElement[]];
}
