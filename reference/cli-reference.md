# CLI reference

This guide documents the CLI commands for working with Soda Data Contracts. You can use the CLI to generate, test, publish, and verify contracts using either Soda Core (local execution) or Soda Agent (remote execution).

For full language reference, see:\
[contract-language-reference](contract-language-reference/ "mention")

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

> _Don’t have an account? Sign up_ [_here_](https://www.soda.io/schedule-a-demo) _to get started._

```bash
soda cloud create -f sc_config.yml
```

#### Parameters

<table><thead><tr><th>Parameter</th><th width="225.33203125">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>--file, -f</code> </td><td>Yes</td><td>Path to a Soda Cloud YAML configuration file.</td></tr><tr><td><code>--verbose, -v</code></td><td>No</td><td>Display detailed logs during execution.</td></tr></tbody></table>

***

#### Test connection

```bash
soda cloud test -sc sc_config.yml
```

<table><thead><tr><th>Parameter</th><th width="212.6796875">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>--soda-cloud, -sc</code></td><td>Yes</td><td>Path to a Soda Cloud YAML configuration file</td></tr><tr><td><code>--verbose, -v</code></td><td>No</td><td>Display detailed logs during execution.</td></tr></tbody></table>

***

## Configure a data source

These commands help you define a local configuration for your data source (used by Soda Core) and validate the connection.

#### Create data source config

```bash
soda data-source create -f ds_config.yml
```

| Parameter       | Required | Description                                                   |
| --------------- | -------- | ------------------------------------------------------------- |
| `--file, -f`    | Yes      | Output file path for the data source YAML configuration file. |
| `--verbose, -v` | No       | Display detailed logs during execution.                       |

{% hint style="info" %}
By default, the YAML file generated as `ds_config.yml` is a template for **PostgreSQL connections**.

To see how to modify it to connect to other data sources, head to [data-source-reference-for-soda-core](data-source-reference-for-soda-core/ "mention").
{% endhint %}

#### Test data source connection

```bash
soda data-source test -ds ds_config.yml
```

| Parameter                     | Required | Description                                    |
| ----------------------------- | -------- | ---------------------------------------------- |
| `--data-source, -ds`          | Yes      | Path to a data source YAML configuration file. |
| `--verbose, -v`               | No       | Display detailed logs during execution.        |

***

## Create a contract

{% hint style="warning" %}
Available soon
{% endhint %}

Creates a new contract file for a given dataset. This is useful for bootstrapping a contract definition from an existing dataset schema.

```bash
soda contract create --dataset datasource/db/schema/table --file contract.yaml --data-source ds_config.yml --soda-cloud sc_config.yml --use-agent
```

| Parameter            | Required | Description                                                                                                                  |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--dataset, -d`      | Yes      | Fully qualified dataset name (data\_source\_name/database\_name/schema\_name/table\_name) aka Soda Cloud dataset identifier. |
| `--file, -f`         | Yes      | Path to a contract YAML file to be created. Directories will be created if needed.                                           |
| `--data-source, -ds` | No       | Path to a data source YAML config file.                                                                                      |
| `--soda-cloud, -sc`  | No       | Path to Soda Cloud YAML config file. Required if using Soda Agent.                                                           |
| `--use-agent, -a`    | Yes      | Use Soda Agent for execution. **Currently, contract creation only works with `--use-agent`.**                                |
| `--verbose, -v`      | No       | Display detailed logs during execution.                                                                                      |



***

## Test a contract (dry run)

Checks that a contract is syntactically valid and points to an existing dataset before publishing or running a verification.

```bash
soda contract test --contract contract.yaml
```

| Parameter                             | Required | Description                             |
| ------------------------------------- | -------- | --------------------------------------- |
| `--contract, -c`                      | Yes      | Path to a contract YAML file            |
| `--verbose, -v`                       | No       | Display detailed logs during execution. |

## Publish a contract

Publishes a local contract to Soda Cloud, making it the source of truth for verification.

```bash
soda contract publish --contract contract.yaml --soda-cloud sc_config.yml
```

| Parameter            | Required | Description                             |
| -------------------- | -------- | --------------------------------------- |
| `--contract, -c`     | Yes      | Path to a contract YAML file.           |
| `--soda-cloud, -sc`  | Yes      | Path to Soda Cloud YAML config file.    |
| `--verbose, -v`      | No       | Display detailed logs during execution. |

This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration. Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../dataset-attributes-and-responsibilities.md "mention")

## Fetch a contract from Soda Cloud

You can fetch a contract from Soda Cloud to output it in a local file.

```bash
soda contract fetch --dataset datasource/db/schema/table --file contract.yaml --soda-cloud sc_config.yml
```

| Parameter           | Required | Description                                           |
| ------------------- | -------- | ----------------------------------------------------- |
| `--dataset, -d`     | Yes      | Soda Cloud dataset identifier.                        |
| `--file, -f`        | Yes      | The path to a contract YAML file to update or create. |
| `--soda-cloud, -sc` | Yes      | Path to Soda Cloud YAML config file.                  |
| `--verbose, -v`     | no       | Display detailed logs during execution.               |

## Verify a contract

Executes a contract verification to check if the dataset complies with its expectations. You can verify a local contract file or a Soda Cloud contract either locally (in your Python environment) or remotely with a Soda Agent.

```bash
soda contract verify --data-source ds_config.yml --contract contract.yaml
```

<table><thead><tr><th>Parameter</th><th width="230.328125">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>--use-agent, -a</code></td><td>No</td><td>Use Soda Agent for execution</td></tr><tr><td><code>--publish</code></td><td>No</td><td>Publish results and contract to Soda Cloud. This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration. Learn more about permissions here: <a data-mention href="../dataset-attributes-and-responsibilities.md">dataset-attributes-and-responsibilities.md</a></td></tr><tr><td><code>--data-source, -ds</code></td><td>without <code>--use-agent</code></td><td>Path to a data source YAML config file</td></tr><tr><td><code>--contract, -c</code></td><td>without <code>--use-agent</code></td><td>Path to the contract YAML file</td></tr><tr><td><code>--soda-cloud, -sc</code></td><td>with <code>--use-agent</code> or with <code>--publish</code>  </td><td>Path to a Soda Cloud YAML config file</td></tr><tr><td><code>--dataset, -d</code></td><td>with <code>--use-agent</code></td><td>Soda Cloud dataset identifier</td></tr><tr><td><code>--set</code></td><td>No</td><td>Override contract variables at runtime (can be used multiple times)</td></tr><tr><td><code>--verbose, -v</code></td><td>No</td><td>Display detailed logs during execution</td></tr></tbody></table>

***

### Override variables

Use the `--set` option to define or override variables in the contract when running a verification.

```bash
soda contract verify --data-source ds_config.yml --contract contract.yaml --set country=BE --set threshold=5
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
soda request fetch -r 7 -p 1 -sc soda-cloud.yaml --f ./contracts/ecommerce_orders.yaml
```

| Parameter           | Required | Description                                                                                                                                                            |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-r`                | Yes      | The request number. Identifies the request to fetch. Request numbers can be found when reviewing a proposal. See screenshot below.                                     |
| `-p`                | No       | The proposal number. Defaults to the latest proposal if not specified. Proposal numbers are shown as the decimal part when reviewing a proposal. See screenshot below. |
| `--soda-cloud, -sc` | Yes      | Path to the Soda Cloud config file (e.g., `soda-cloud.yaml`).                                                                                                          |
| `--f`               | Yes      | Path to the output file where the contract will be written.                                                                                                            |

### Push a proposal to Soda Cloud

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

### Transition a request

Updates the status of a contract request in Soda Cloud. This is useful for marking a request as open, resolved, or closed when no action will be taken.

```bash
soda request transition -sc soda-cloud.yaml -r 7 -s done
```

| Parameter           | Required | Description                                                                                                                                                                                                |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-sc, --soda-cloud` | Yes      | Path to the Soda Cloud configuration file.                                                                                                                                                                 |
| `-r, --request`     | Yes      | The **Contract Request number** to be transitioned.                                                                                                                                                        |
| `-s, --status`      | Yes      | <p>• <code>open</code> → Reopen or keep the request active<br>• <code>done</code> → Mark the request as completed.<br>• <code>wontDo</code> → Mark the request as closed without changes (“won’t do”).</p> |
