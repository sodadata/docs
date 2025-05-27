---
layout: default
title: Create and Edit Contracts
description: Create and Edit Contracts
parent: Git Managed Data Contracts
nav_order: 403
---

# Create and Edit Contracts

With Git-managed contracts, you define your expectations as code using YAML. This gives you full control over how your data is validated, and allows you to manage contracts just like any other code artifact—versioned, tested, and deployed via Git.

To learn all about the structure and supported features, refer to the full specification here:

[Data Contract Language Reference](https://sodadata.slite.com/app/docs/stjVPznNGCIOuy)

This includes:

- Dataset and column structure
- Available check types (missing, invalid, duplicate, freshness, etc.)
- Filters (dataset-level and check-level)
- Threshold configuration
- Use of variables
- Scheduling and more

## Generate a Contract Skeleton

To speed up authoring, you can generate a **contract skeleton** based on the structure of your dataset.

This feature is the `soda-generator` available to Soda Cloud users. To install it:

```
pip install soda-generator
```

You can then run

```
soda soda contract generate --dataset datasource/db/schema/table --data-source ds.yml --output ./contracts generate --dataset
```

**Available Parameters:**

- `-dataset` / `d` (required): The fully qualified dataset name in the format `datasource/db/schema/table`.
- `-output` / `o` (optional): The directory where the generated contract file will be stored relative your current location.
- Using Soda Core
    - `-data-source` / `ds` : The path to your local data source config file.
- Using Soda Agent
    - `-use-agent` / `a` : Use a Soda Agent (instead of a local connection). Requires the `-soda-cloud` Config to be provided.
    - `-soda-cloud` / `sc` : Path to the Soda Cloud config file. Needed when connecting via a Soda Agent or publishing to Soda Cloud.

This command connects to your data source, inspects the dataset, and generates a contract YAML file with the dataset and columns pre-filled. You can then customize the checks and thresholds as needed.

## Run a Dry Test (Contract Validation)

Before publishing or verifying your contract, you can run a **dry test** to ensure it’s correctly defined and points to a valid dataset.

```
soda contract test --data-source ds.yml --contract contract.yaml
```

This will:

- Validate the YAML syntax
- Confirm that the referenced dataset exists
- Check for any issues with variables, filters, or structure

*Run this as part of your development workflow or CI to catch errors early.*

## Publish the Contract

If you have Soda Cloud, once your contract is finalized and tested, you can publish it to **Soda Cloud**, making it the authoritative version for verification and scheduling.

*Learn how to connect the CLI to Soda Cloud:* [Install and Configure ✅](https://sodadata.slite.com/app/docs/5-ToQYuCt6fjTp)

This action requires the "Manage contract" permission on the dataset; the user is identified based on the API key provided in the Soda Cloud configuration. Learn more about permissions here: [Dataset Settings & Responsibilities](https://sodadata.slite.com/app/docs/yh0GzHD8tVlvHC)

```
soda contract publish --contract contract.yaml --soda-cloud sc.yml
```

Publishing:

- Uploads the contract to Soda Cloud
- Makes it available for manual, scheduled, or programmatic verifications
- Enables visibility and collaboration through the UI

Once published, the contract becomes the **source of truth** for the dataset until a new version is published.

You’re now ready to start verifying your contract and monitoring your data.