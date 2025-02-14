import { IJsonLdNodeObject } from "@twin.org/data-json-ld";

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
	exposedThrough: string;

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
