# Test dataset

This folder contains the dataset that allows to generate the different Compliance Credentials and associated Evidence.

Once all the Credentials are available they are copied to the [published-datasets](../published-datasets/) folder as if they were hosted on the Web.

The dataset contains:

- [claims](./claims). The claims used to issue testing credentials.
- [templates](./templates/). The templates that define the structure of credentials.
- [credentials](./credentials/). The credentials used for testing.
- [identities](./identities/). The identities used, including the private keys of the verification methods.
- [dids](./dids/). The DID documents used so that tests can resolve them without relying on an online DLT Node.
