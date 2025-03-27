// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { EntitySchemaFactory, EntitySchemaHelper } from "@twin.org/entity";
import {
	DataResourceEntry,
	DataSpaceConnectorEntry,
	ParticipantEntry,
	ServiceOfferingEntry
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";

/**
 * Inits schemas.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<ParticipantEntry>(), () =>
		EntitySchemaHelper.getSchema(ParticipantEntry)
	);

	EntitySchemaFactory.register(nameof<DataResourceEntry>(), () =>
		EntitySchemaHelper.getSchema(DataResourceEntry)
	);

	EntitySchemaFactory.register(nameof<ServiceOfferingEntry>(), () =>
		EntitySchemaHelper.getSchema(ServiceOfferingEntry)
	);

	EntitySchemaFactory.register(nameof<DataSpaceConnectorEntry>(), () =>
		EntitySchemaHelper.getSchema(DataSpaceConnectorEntry)
	);
}
