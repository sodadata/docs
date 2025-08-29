# Create and edit contracts

With Git-managed contracts, you define your expectations as code using YAML. This gives you full control over how your data is validated, and allows you to manage contracts just like any other code artifact: versioned, tested, and deployed via Git.

> To learn all about the structure and supported features, refer to the full specification in the [contract-language-reference.md](../../reference/contract-language-reference.md "mention")

The contract structure includes:

* Dataset and column structure&#x20;
* Available check types (`missing`, `invalid`, `duplicate`, `freshness`, etc.)
* Filters (dataset-level and check-level) — Optional
* Threshold configuration — Optional
* Use of variables — Optional
* Scheduling — Optional
* ...and more

## Test your contract

Before publishing or verifying your contract, you can run a **test command** to ensure the contract is correctly defined and points to a valid dataset.

```javascript
soda contract test --data-source ds.yml --contract contract.yaml
```

This will:

* Validate the YAML syntax
* Confirm that the referenced dataset exists
* Check for any issues with variables, filters, or structure

{% hint style="info" %}
Run this as part of your development workflow or CI to catch errors early.
{% endhint %}

## Verify your contract

Before publishing your contract, you may want to execute it to verify that it runs correctly.

> Read more about how to [verify-a-contract.md](verify-a-contract.md "mention")

## Publish the Contract

If you have Soda Cloud, once your contract is finalized and tested, you can publish it to Soda Cloud, making it the authoritative version for verification and scheduling.

{% hint style="warning" %}
This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration.

Learn more about permissions here: [dataset-attributes-and-responsibilities.md](../../dataset-attributes-and-responsibilities.md "mention")
{% endhint %}

```sh
soda contract publish --contract contract.yaml --soda-cloud sc.yml
```

> Learn how to connect the CLI to Soda Cloud: [#connect-to-soda-cloud](../../reference/cli-reference.md#connect-to-soda-cloud "mention")

Publishing:

* Uploads the contract to Soda Cloud
* Makes it available for manual, scheduled, or programmatic verifications
* Enables visibility and collaboration through the UI

Once published, the contract becomes the **source of truth** for the dataset until a new version is published.



You’re now ready to start verifying your contract and monitoring your data.
