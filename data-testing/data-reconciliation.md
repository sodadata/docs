---
description: >-
  This page describes how Soda handles data reconciliation through different
  types of reconciliation checks.
---

# Data reconciliation

{% hint style="warning" %}
Available on the 15th of September 2025
{% endhint %}

**Reconciliation checks** are a **validation step** used to ensure that data remains consistent and accurate when moving, transforming, or syncing between different systems. The core purpose is to confirm that the **target data matches the source data,** whether that’s during a one-time migration, a recurring data pipeline run, or ongoing synchronization across environments.&#x20;

For instance, if you are migrating from a MySQL database to Snowflake, reconciliation checks can verify that the data transferred into Snowflake staging is intact and reliable before promoting it to production. This **minimizes the risk of data loss, duplication, or corruption during critical migrations**.

Beyond migrations, reconciliation checks are also used in **data pipelines and integrations**. They help validate that transformations applied in-flight do not compromise accuracy, and that downstream datasets remain coherent with upstream sources.&#x20;

Other use cases include **regulatory compliance**, where organizations must prove that financial or operational data has been faithfully replicated across systems, and **system upgrades**, where schema changes or infrastructure shifts can introduce unexpected mismatches.

By systematically applying reconciliation checks, teams can maintain trust in their data, reduce operational risk, and streamline incident detection when anomalies arise.

## Defining source dataset

Before defining reconciliation checks, you first specify the **source dataset**. This represents the system of record against which you want to validate consistency. It is possible to define a **filter** on the source dataset, allowing you to reconcile only a subset of records that match certain criteria (for example, only transactions from the current month, or only rows belonging to a specific business unit).

For the **target dataset**, the reconciliation check applies the **dataset filter defined at the top of the contract (see** [#key-concepts-in-contract-authoring](cloud-managed-data-contracts/author-a-contract-in-soda-cloud.md#key-concepts-in-contract-authoring "mention") ).&#x20;

Ensure that both source and target are constrained to the same logical scope before comparisons are made, keeping the validation consistent and relevant.

<figure><img src="../.gitbook/assets/Screenshot 2025-08-21 at 2.28.13 PM.png" alt=""><figcaption></figcaption></figure>

## **Metric-Level Reconciliation**

At this level, aggregate metrics from the source and target datasets are compared. Examples include totals (e.g., revenue, number of rows), averages, or other summary statistics. This approach is efficient and provides a high-level signal that the data remains consistent. It is especially useful for large-scale migrations or pipelines where exact row-by-row comparison may not be necessary at all times.

### Thresholds&#x20;

Comparisons at the metric level are evaluated against a defined threshold, which represents the **acceptable difference between source and target**. This tolerance can be set depending on the business context. Some use cases may allow small discrepancies (e.g., rounding differences), while others require exact equality.

When comparing integrity checks such as missing values, duplicates, or invalid entries, you can reconcile either by looking at the **raw count** of affected records or by comparing the **percentage metric** (e.g., the percentage of rows with missing values in each dataset). This flexibility ensures that reconciliation is meaningful regardless of dataset size or distribution.

### Check-level filter

In addition to dataset-level filters, reconciliation checks support **check-level filters**, which are applied consistently to both the source and target within the scope of a specific check. These filters make it possible to validate a **subset of the data** relevant to the context of the check.  The check-level filter is applied **on top of any existing source or target dataset filters**.\


<figure><img src="../.gitbook/assets/Screenshot 2025-08-21 at 2.32.53 PM.png" alt=""><figcaption></figcaption></figure>



## **Row-level reconciliation**

For more granular validation, reconciliation can be performed at the **row level**. This type of check surfaces detailed differences such as **missing records**, **mismatched values**, or **unexpected duplicates**. Row-level reconciliation is critical in scenarios where accuracy at the record level is non-negotiable—such as record that address financial transactions, user data, or regulatory reporting.

This requires specifying a **primary key (or a composite key)** to uniquely identify rows between the source and the target. Once rows are aligned, you can define a **list of columns to test** for exact matches or acceptable tolerances. If no column list is provided, the check defaults to comparing **all columns in order**. This flexibility ensures that comparisons can range from broad validation across the entire dataset to focused checks on only the most critical attributes.

### Thresholds&#x20;

Row-level reconciliation supports thresholds expressed either as the **count of differing rows** between source and target, or as the **percentage of differing rows relative to the source dataset row count**. These thresholds determine the acceptable level of variance before the check is considered failed, giving you fine control over sensitivity and tolerance.&#x20;

This dual approach allows teams to adapt reconciliation logic to different contexts,  using absolute counts when every record matters, and percentages when evaluating proportional differences in large datasets.

### Check-level filter

As with metric-level checks, you can define a **check-level filter** that is applied on top of any existing dataset filters. This allows you to reconcile only a targeted segment of data within the context of the specific check—for example, testing only a single business unit, product family, or date range.



<figure><img src="../.gitbook/assets/Screenshot 2025-08-21 at 3.10.27 PM.png" alt=""><figcaption></figcaption></figure>



### Performance considerations

Row-level reconciliation is inherently **heavier** than metric-level reconciliation, as it requires comparing records across potentially large datasets. To enable comparisons even when data lives in different systems, data is loaded into memory from both the source and the target, where the diff is executed. A **paginated approach** is used to maintain scalability; this ensures that memory usage remains stable, but execution time will increase as the dataset size and column count grow.



### Benchmark&#x20;

| Dataset Shape          | Change Rate | Memory Usage | Execution Time  |
| ---------------------- | ----------- | ------------ | --------------- |
| 10 columns, 500K rows  | 1% changes  | <80MB RAM    | **9s**          |
| 360 columns, 100K rows | 1% changes  | <80MB RAM    | **1m**          |
| 360 columns, 1M rows   | 1% changes  | <80MB RAM    | **35m**         |

**Recommendations**

* **Leverage filters to scope checks to new or incremental batches of data** wherever possible, rather than repeatedly reconciling the entire dataset. This reduces both execution time and operational overhead.
* Use **metric-level reconciliation as a first line of validation**. It is significantly more efficient and scalable, and can quickly highlight whether deeper row-level analysis is even necessary.

***

## Implement reconciliation checks programmatically

Soda is suitable for no-code and programmatic users alike. If you are implementing checks programmatically, you can learn more about the **contract language syntax for reconciliation** on the [Contract Language reference](../reference/contract-language-reference/reconciliation-checks.md). Reconciliation checks can be used for both metric- and row-level validation.
