# CLI Reference

This guide documents the CLI commands for working with Soda Data Contracts. You can use the CLI to generate, test, publish, and verify contracts using either Soda Core (local execution) or Soda Agent (remote execution).

For full language reference, see:\
[contract-language-reference.md](contract-language-reference.md "mention")

For supported data source configurations, see:\
[data-source-reference-for-soda-core](data-source-reference-for-soda-core/ "mention")

***

## Installation

Install the Soda Core package for your data source. This gives you access to all CLI functionality for working with contracts.

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

Replace `soda-postgres` with the appropriate package for your data source. See the [data-source-reference-for-soda-core](data-source-reference-for-soda-core/ "mention")for supported packages and configurations.

***

## Connect to Soda Cloud

Used to create and test your Soda Cloud configuration file. This is required for publishing contracts or pushing verification results.

_Don’t have an account? Sign up here to get started._

```bash
soda cloud create -f sc.yml
```

#### Parameters

| Parameter | Required | Description                     |
| --------- | -------- | ------------------------------- |
| `--f`     | Yes      | Output file path for the config |

***

#### Test Connection

```bash
soda cloud test -sc sc.yml
```

| Parameter | Required | Description                    |
| --------- | -------- | ------------------------------ |
| `--sc`    | Yes      | Path to Soda Cloud config file |

***

## Configure a Data Source

These commands help you define a local configuration for your data source (used by Soda Core) and validate the connection.

#### Create Data Source Config

```bash
soda data-source create -f ds.yml
```

| Parameter | Required | Description                          |
| --------- | -------- | ------------------------------------ |
| `--f`     | Yes      | Output file path for the config file |

#### Test Data Source Connection

```bash
soda data-source test -ds ds.yml
```

| Parameter | Required | Description                          |
| --------- | -------- | ------------------------------------ |
| `--f`     | Yes      | Output file path for the config file |

***

## Test a Contract (Dry Run)

Checks that a contract is syntactically valid and points to an existing dataset before publishing or running a verification.

```bash
soda contract test --data-source ds.yml --contract contract.yaml
```

| Parameter       | Required | Description                      |
| --------------- | -------- | -------------------------------- |
| `--data-source` | Yes      | Path to local data source config |
| `--contract`    | Yes      | Path to the contract YAML file   |

## Publish a Contract

Publishes a local contract to Soda Cloud, making it the source of truth for verification.

```bash
soda contract publish --contract contract.yaml --soda-cloud sc.yml
```

| Parameter      | Required | Description                    |
| -------------- | -------- | ------------------------------ |
| `--contract`   | Yes      | Path to the contract YAML file |
| `--soda-cloud` | Yes      | Path to Soda Cloud config file |

This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration. Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../dataset-attributes-and-responsibilities.md "mention")

## Fetch a Contract from Soda Cloud

You can fetch a contract from Soda Cloud to output it in a local file.

```bash
soda contract fetch --dataset datasource/db/schema/table --file contract.yaml --soda-cloud sc.yml
```

| Parameter           | Required | Description                                               |
| ------------------- | -------- | --------------------------------------------------------- |
| `--dataset`         | yes      | The dataset path                                          |
| `--file`            | yes      | The path to the contract file to either update or create. |
| `--soda-cloud, -sc` | yes      | Path to Soda config file                                  |

## Verify a Contract

Executes a contract verification to check if the dataset complies with its expectations. You can run this locally (Soda Core) or remotely via a Soda Agent.

```bash
soda contract verify --data-source ds.yml --contract contract.yaml
```

| Parameter           | Required         | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--use-agent, -a`   | No               | Use Soda Agent for execution                                                                                                                                                                                                                                                                                                                  |
| `--publish`         | No               | Push verification results to Soda Cloud. This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration. Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../dataset-attributes-and-responsibilities.md "mention") |
| `--soda-cloud, -sc` | with `--publish` | Path to Soda Cloud config file                                                                                                                                                                                                                                                                                                                |
| `--set`             | No               | Override contract variables at runtime (can be used multiple times)                                                                                                                                                                                                                                                                           |
| `--verbose, -u`     | No               | Display detailed logs during execution                                                                                                                                                                                                                                                                                                        |

***

### **With Soda Core**

| Parameter            | Required | Description                      |
| -------------------- | -------- | -------------------------------- |
| `--data-source, -ds` | Yes      | Path to local data source config |

### **With Soda Agent**

| Parameter           | Required | Description                    |
| ------------------- | -------- | ------------------------------ |
| `--use-agent, -a`   | Yes      | Use Soda Agent for execution   |
| `--soda-cloud, -sc` | Yes      | Path to Soda Cloud config file |

***

### **With a local Data Contract file**

| Parameter    | Required                      | Description                |
| ------------ | ----------------------------- | -------------------------- |
| `--contract` | Yes (if verifying local file) | Path to contract YAML file |

### **With a Soda Cloud Data Contract**

| Parameter       | Required | Description                  |
| --------------- | -------- | ---------------------------- |
| `--dataset, -d` | Yes      | Fully qualified dataset name |

***

### Override Variables

Use the `--set` option to define or override variables in the contract when running a verification.

```bash
soda contract verify --data-source ds.yml --contract contract.yaml --set country=BE --set threshold=5
```

| Parameter | Required | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| `--set`   | No       | Define variable key-value pairs for substitution |

\
Contract Collaboration
----------------------

Soda enables collaboration on data contracts through **requests** and **proposals**. Data consumers can request changes, propose updates, and iterate with dataset owners until alignment is reached. From the CLI, you can fetch, review, and publish proposals, ensuring contract changes are tracked and versioned in Git.

> Read more about [contract-collaboration.md](../data-testing/contract-collaboration.md "mention")

### Fetch a proposal

Fetches the content of a proposal from Soda Cloud and saves it as a contract file, which can then be published to Git. This allows dataset owners to incorporate approved changes into version-controlled data contracts.

```bash
soda request fetch -r 7 -p 1 -sc soda-cloud.yaml --f ./contracts/ecommerce_orders.yamlRe
```

| Parameter           | Required | Description                                                                                                                                                            |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-r`                | Yes      | The request number. Identifies the request to fetch. Request numbers can be found when reviewing a proposal. See screenshot below.                                     |
| `-p`                | No       | The proposal number. Defaults to the latest proposal if not specified. Proposal numbers are shown as the decimal part when reviewing a proposal. See screenshot below. |
| `--soda-cloud, -sc` | Yes      | Path to the Soda Cloud config file (e.g., `soda-cloud.yaml`).                                                                                                          |
| `--f`               | Yes      | Path to the output file where the contract will be written.                                                                                                            |

### Push a Proposal to Soda Cloud

Uploads a contract file to Soda Cloud as a proposal for a specific request. This allows dataset consumers or owners to share updates directly from the CLI and provide context with an accompanying message.



```bash
soda request push -sc soda-cloud.yaml -f ./contracts/ecommerce_orders.yaml -r 7 -m "Added new field for order_status"
```

| Parameter           | Required | Description                                                    |
| ------------------- | -------- | -------------------------------------------------------------- |
| `-sc, --soda-cloud` | Yes      | Path to the Soda Cloud configuration file.                     |
| `-f, --file`        | Yes      | Path to the contract file to be pushed to Soda Cloud.          |
| `-r, --request`     | Yes      | The **Contract Request number** to which the proposal belongs. |
| `-m, --message`     | No       | A descriptive message about the changes being proposed.        |

***

### Transition a Request

Updates the status of a contract request in Soda Cloud. This is useful for marking a request as open, resolved, or closed when no action will be taken.

```bash
soda request transition -sc soda-cloud.yaml -r 7 -s done
```

| Parameter           | Required | Description                                                                                                                                                                                                |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-sc, --soda-cloud` | Yes      | Path to the Soda Cloud configuration file.                                                                                                                                                                 |
| `-r, --request`     | Yes      | The **Contract Request number** to be transitioned.                                                                                                                                                        |
| `-s, --status`      | Yes      | <p>• <code>open</code> → Reopen or keep the request active<br>• <code>done</code> → Mark the request as completed.<br>• <code>wontDo</code> → Mark the request as closed without changes (“won’t do”).</p> |
