import { IJsonLdNodeObject } from "@twin.org/data-json-ld";
import { IDataExchangeComponent } from "./IDataExchangeComponent";

export interface IDataResource {
	/**
	 * Subject Id
	 */
	id: string;

	/** Subject type
	 *
	 */
	type: "DataResource";

	/**
	 * Description
	 */
	description?: string;

	/**
	 * Name
	 */
	name: string;

	/**
	 * Exposed through endpoint
	 */
	exposedThrough: IDataExchangeComponent;

	/**
	 * Who is the data producer
	 */
	producedBy: string;

	/**
	 * Pointer to the license
	 */
	license: string;

	/**
	 * Copyright owner
	 */
	copyrightOwnedBy?: string;

	/**
	 * ODRL Policy
	 */
	resourcePolicy: IJsonLdNodeObject;
}
