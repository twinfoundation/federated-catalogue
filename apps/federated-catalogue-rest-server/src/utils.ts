// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-console */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { I18n, type ILocaleDictionary } from "@twin.org/core";

/**
 * Initialise the locales for the application.
 * @param rootPackageFolder The root package folder.
 */
export async function initialiseLocales(rootPackageFolder: string): Promise<void> {
	const localesDirectory = path.resolve(path.join(rootPackageFolder, "dist", "locales"));
	const enLangContent = await readFile(`${localesDirectory}/en.json`, "utf8");
	I18n.addDictionary("en", JSON.parse(enLangContent) as ILocaleDictionary);
}

/**
 * Find the root package folder.
 * @returns The root package folder.
 */
export function findRootPackageFolder(): string {
	// Find the root package folder.
	const rootPackageFolder = path.resolve(
		path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..")
	);

	return rootPackageFolder;
}
