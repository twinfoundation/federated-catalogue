#!/bin/sh
docker run -it -v ./dataset:/ext --rm onboardingcli/onboardingcli vc create \
--claims-file /ext/claims/acme-compliant-participant.json --template-file /ext/templates/compliance-credential-template.json \
--subject-did-file /ext/identities/acme/acme.json --trusted-issuer-file /ext/identities/clearing-house/clearing-house.json \
--vc-version 2 --issuers-dir /ext/identities --templates-dir /ext/templates --vc-dir /ext/credentials/compliance
