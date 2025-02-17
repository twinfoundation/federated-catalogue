// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile } from "node:fs/promises";
import path from "node:path";
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
