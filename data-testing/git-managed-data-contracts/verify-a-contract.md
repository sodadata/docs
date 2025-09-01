# Verify a contract

Once your contract is authored and published (or available locally), you can verify whether the actual data complies with the defined expectations. Soda provides two execution options:

* **Soda Core** – run verifications locally, typically in CI/CD pipelines or dev environments.
* **Soda Agent** – run verifications remotely using an agent deployed in your environment, triggered via Soda Cloud.

Both approaches support variable overrides, publishing results to Soda Cloud, and integration into automated workflows.

> Learn more about [deployment-options](../../deployment-options/ "mention")

## Using Soda Core

Soda Core runs the verification locally, connecting to your data source using the defined data source configuration file.

```javascript
soda contract verify --data-source ds.yml --contract contract.yaml
```

This command:

* Connects to your database using the local config
* Loads the contract
* Runs all checks and returns a pass/fail result

### With variable overrides

You can pass variables defined in the contract using the `--set` flag:

```javascript
soda contract verify --data-source ds.yml --contract contract.yaml --set START_DATE=2024-05-01
```

> Learn about variables in Data Contract: [#make-contracts-dynamic-with-variables](../../reference/contract-language-reference/#make-contracts-dynamic-with-variables "mention")

### Publish results to Soda Cloud

To send verification results to Soda Cloud for visibility and reporting.

Add the flag `--publish` to the command.

{% hint style="warning" %}
This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration.

Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../../dataset-attributes-and-responsibilities.md "mention")
{% endhint %}

```javascript
soda contract verify --data-source ds.yml --contract contract.yaml --publish --soda-cloud sc.yml
```

> Learn how to connect the CLI to Soda Cloud:  [#connect-to-soda-cloud](../../reference/cli-reference.md#connect-to-soda-cloud "mention")

This is recommended if you want stakeholders to see the outcomes in Soda Cloud or include them in dashboards and alerting.

## Using Soda Agent

Soda Agent executes verifications using data sources configured in Soda Cloud.

```javascript
soda contract verify --contract contract.yaml --use-agent --soda-cloud sc.yml
```

This setup:

* Runs verifications through the Soda Agent connected to your data source
* Fetches the published contract from Soda Cloud
* Returns the result locally in the CLI

### With variable overrides

You can pass variables defined in the contract using the `--set` flag:

```javascript
soda contract verify --contract contract.yaml --use-agent --soda-cloud sc.yml --set START_DATE=2024-05-01
```

> Learn about variables in Data Contract: [#make-contracts-dynamic-with-variables](../../reference/contract-language-reference/#make-contracts-dynamic-with-variables "mention")

### Publish results to Soda Cloud

You can also push results to Soda Cloud from the agent-based run.

Add the flag `--publish` to the command.

{% hint style="warning" %}
This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration.

Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../../dataset-attributes-and-responsibilities.md "mention")
{% endhint %}

```javascript
soda contract verify --dataset datasource/db/schema/table --publish --use-agent --soda-cloud sc.yml
```

This is recommended if you want stakeholders to see the outcomes in the Soda Cloud or include them in dashboards and alerting.
