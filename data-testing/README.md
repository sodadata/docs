# Data Testing

## What is Data Testing?

Data testing is the practice of validating that your data meets the expectations you’ve defined for it before it reaches stakeholders, dashboards, or downstream systems. Just like software testing ensures your code behaves as intended, data testing safeguards the quality and reliability of your data.

At Soda, we see data testing as **the foundation of data trust**. Whether you’re verifying row counts, checking for missing or invalid values, or enforcing schema integrity, the goal is the same: catch issues early, reduce incidents, and keep your data consumers confident.

## What is a Data Contract?

A **Data Contract** is a formal agreement between data producers and data consumers that defines what “good data” looks like. It sets expectations about schema, freshness, quality rules, and more, and makes those expectations explicit and testable.

With a data contract in place, producers commit to delivering data that meets certain standards. Consumers, in turn, can rely on that contract to build reports, models, or pipelines without second-guessing the data.

At Soda, Data Contracts are **testable artifacts** that can be authored, versioned, verified, and monitored, whether in code or in the UI. They’re the connective tissue between producers and consumers, aligning teams and eliminating ambiguity.

### What is Contract Verification?

Defining a contract is only the first step. Verifying that your data actually **meets** the expectations is where the value is realized. Contract verification is the process of testing whether the data in your datasets aligns with the rules, thresholds, and schema defined in the contract.

At Soda, contract verification is **fully automated**. Whether triggered manually, on a schedule, or as part of your CI/CD pipelines, each verification run checks that:

* The schema matches the contract definition (columns, data types, structure)
* The data complies with checks like missing, duplicate, invalid values, and custom rules

This helps you catch issues early, ensure data quality over time, and build trust across your organization.

## Authoring and managing Data Contracts: choose your style

Soda supports two complementary ways to author and manage data contracts. They are designed to fit the way your team works.

### Cloud-managed Contracts (Soda Cloud UI)

If you’re a data analyst, product owner, or stakeholder, who prefers intuitive interfaces over code, **Soda Cloud** is the ideal workspace.

With the Soda Cloud UI, you can:

* Browse datasets and view profiling insights
* Define a contract with a no-code Editor
* Schedule and monitor contract verifications
* Collaborate with your team and publish contracts with a click

There’s no setup or YAML required, just fast, visual workflows that enable domain experts to contribute directly to data quality.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-20 at 3.05.13 PM.png" alt=""><figcaption></figcaption></figure>

### Git-managed Contracts (Soda Core CLI)

If you live in your terminal and manage your data pipelines as code, you’ll want to use **Soda Core** and the **Soda CLI**.

With this setup, you can:

* Define contracts in YAML
* Run contract verifications in CI/CD
* Push the contract and verification results to Soda Cloud for visibility
* Use Git as the source of truth for version control, collaboration, and reviews
* Collaborate with non-technical users that use Soda Cloud and integrate with engineering workflows via Git

This path offers full control, transparency, and seamless integration into your dev tooling.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-21 at 10.56.28 AM.png" alt=""><figcaption></figcaption></figure>

***

### Combine UI and Git for cross-team collaboration

Soda gives you the flexibility to blend both approaches. For example, non-technical users can define or adjust contracts visually in Soda Cloud for the datasets they manage, while engineers can use Git-managed contracts for the datasets they own.

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

This hybrid model enables collaboration across teams:

* Business users bring domain expertise directly into the contract
* Engineers maintain quality, consistency, and governance
* Each dataset follows the authoring method that best suits the team responsible for it

You can mix and match—using the UI for some contracts, and code for others—depending on your team's structure and preferences.

And even if Data Contracts are managed in Git, you can still involve non-technical users who can propose changes to a contract in the UI. These approved changes can be embedded into engineering workflows and synced to Git, ensuring that every update follows your organization’s quality and deployment standards.

Choose the model, or combination of models, that works best for your organization.

***

## Soda Agent vs. Soda Core for execution

Once a contract is published, you’ll want to verify that the actual data meets the contract’s expectations. This verification can be done in two ways:

* **Soda Agent** is our managed runner that lives in your environment and connects to Soda Cloud. It handles contract verification, scheduling, and execution securely, without exposing your data externally. It is great for teams who want central management without maintaining CLI infrastructure.
* **Soda Core** is our open-source engine you can run anywhere: locally, in CI, or data pipeline. It’s lightweight, customizable, and great for teams that prefer full control or have strict environment constraints.

Both approaches support the same Data Contract logic. Choose the one that best fits your deployment model.
