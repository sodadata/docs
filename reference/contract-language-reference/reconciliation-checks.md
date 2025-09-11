---
description: This page documents the contract language syntax for reconciliation.
---

# Reconciliation checks

{% hint style="warning" %}
Only available with Soda Agent.&#x20;
{% endhint %}

Reconciliation checks validate that a **target dataset** matches a **source dataset**, ensuring that data remains consistent after migrations, in pipelines, or during synchronizations. They can be used for both **metric-level (aggregate) validation** and **row-level (record-by-record) validation**.

> Learn more about the use cases and performance considerations: [data-reconciliation.md](../../data-testing/data-reconciliation.md "mention")



## Prerequisites

To use **reconciliation checks**, you must either:

* Run your contract with **Soda Agent**, which has reconciliation support built in, **or**
* Install the **Soda Reconciliation extension** locally:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-reconciliation
```

## Example

#### Structure

* `dataset:` defines the **target dataset**.
* `reconciliation.source.dataset:` defines the **source dataset** to compare against.
* `reconciliation.source.filter:` is an optional filter applied only to the source dataset.
* Each reconciliation `check:` supports an additional **check-level filter** applied consistently to both source and target, layered on top of dataset-level filters.
* Thresholds define acceptable differences.



All Common Check Configurations (filters, thresholds, names, qualifiers, attributes) apply to reconciliation checks. [#common-check-configurations](./#common-check-configurations "mention")



```yaml
dataset: cloud_data_source/db/schema/dataset
filter: created_at >= CURRENT_DATE - INTERVAL '1 day'

reconciliation:
  source:
    dataset: on_prem_data_source/db/schema/dataset
    filter: created_at >= CURRENT_DATE - INTERVAL '1 day'
  checks:
    - row_count_diff:
        threshold:
          must_be_less_than: 1
    - aggregate_diff:
        function: avg
        column: employee_key
        filter: employee_key < 100
    - duplicate_diff:
        columns: [employee_key]
        threshold:
          must_be_less_than: 1
          metric: percent
    - freshness_diff:
        column: hire_date
        threshold:
          must_be: 0
          unit: hour
    - metric_diff:
        source_expression: SUM(employee_key + parent_employee_key)
        target_expression: SUM(employee_key + parent_employee_key)
        threshold:
          must_be_less_than: 100
          metric: percent
    - rows_diff:
        source_key_columns: [employee_key]
        target_key_columns: [employee_key]
        source_columns: [price, order_date]
        target_columns: [price, order_date]
        threshold:
          must_be: 0
```



***

## Row count diff

Compares the row count of the source and target datasets.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - row_count_diff:
        threshold:
          must_be_less_than: 1
```

**Configuration keys**

| Key          | Description                                                                                                                                          | Optional |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`       | [#check-names](./#check-names "mention")                                                                                                             | Yes      |
| `threshold`  | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target.<br><br>By default, threshold = 0 </p> | Yes      |
| `filter`     | [#configure-a-check-filter](reconciliation-checks.md#configure-a-check-filter "mention"). Filter applied to both source and target.                  | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                   | Yes      |
| `attributes` | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                             | Yes      |

***

## Aggregate diff

Compares the result of an aggregate function on a column between source and target.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - aggregate_diff:
        function: avg
        column: employee_key
        filter: employee_key < 100
        threshold:
          must_be_less_than: 0.5
```

**Configuration keys**

| Key          | Description                                                                                                                                           | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `function`   | Aggregate function (`avg`, `sum`, `min`, `max`, `avg_length`, etc.)                                                                                   | No       |
| `column`     | Column to aggregate                                                                                                                                   | Yes      |
| `threshold`  | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target. <br><br>By default, threshold = 0 </p> | Yes      |
| `filter`     | [#configure-a-check-filter](reconciliation-checks.md#configure-a-check-filter "mention"). Filter applied to both source and target                    | Yes      |
| `name`       | [#check-names](./#check-names "mention")                                                                                                              | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                    | Yes      |
| `attributes` | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                              | Yes      |

***

## Duplicate diff

Compares the number or percentage of duplicate rows based on one or more columns.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - duplicate_diff:
        columns: [employee_key]
        threshold:
          must_be_less_than: 1
          metric: percent
```

**Configuration keys**

| Key          | Description                                                                                                                                                                                                                                               | Optional |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `columns`    | List of column(s) to evaluate duplicates on                                                                                                                                                                                                               | No       |
| `threshold`  | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target.<br><br>By default, threshold = 0  </p>                                                                                                     | Yes      |
| `filter`     | <p><a data-mention href="reconciliation-checks.md#configure-a-check-filter">#configure-a-check-filter</a>. Filter applied to both source and target. <br><br>Support both comparison of <code>metric:percent</code> and <code>metric:count</code><br></p> | Yes      |
| `name`       | [#check-names](./#check-names "mention")                                                                                                                                                                                                                  | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                                                                                                        | Yes      |
| `attributes` | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                                                                                                                                  | Yes      |

***

## Freshness diff

Compares freshness (recency of the latest timestamp) between source and target.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - freshness_diff:
        column: hire_date
        threshold:
          must_be_less_than: 1
          unit: hour
```

**Configuration keys**

| Key          | Description                                                                                                                                           | Optional |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `column`     | Timestamp column used to measure freshness                                                                                                            | Yes      |
| `unit`       | Unit of time (`hour`, `minute`, `day`)                                                                                                                | Yes      |
| `threshold`  | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target. <br><br>By default, threshold = 0 </p> | Yes      |
| `filter`     | [#configure-a-check-filter](reconciliation-checks.md#configure-a-check-filter "mention"). Filter applied to both source and target                    | Yes      |
| `name`       | [#check-names](./#check-names "mention")                                                                                                              | Yes      |
| `qualifier`  | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                    | Yes      |
| `attributes` | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                              | Yes      |

***

## Metric diff

Compares results of custom SQL expressions or queries across source and target.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - metric_diff:
        source_expression: SUM(employee_key + parent_employee_key)
        target_expression: SUM(employee_key + parent_employee_key)
        threshold:
          must_be_less_than: 100
```

**Configuration keys**

| Key                 | Description                                                                                                                                           | Optional |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `source_expression` | SQL expression for source                                                                                                                             | No\*     |
| `target_expression` | SQL expression for target                                                                                                                             | No\*     |
| `source_query`      | Full SQL query for source metric                                                                                                                      | No\*     |
| `target_query`      | Full SQL query for target metric                                                                                                                      | No\*     |
| `threshold`         | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target. <br><br>By default, threshold = 0 </p> | Yes      |
| `filter`            | [#configure-a-check-filter](reconciliation-checks.md#configure-a-check-filter "mention"). Filter applied to both source and target                    | Yes      |
| `name`              | [#check-names](./#check-names "mention")                                                                                                              | Yes      |
| `qualifier`         | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                    | Yes      |
| `attributes`        | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                              | Yes      |

\* Either expression or query must be defined.

***

## Rows diff

Compares rows between source and target based on keys, and checks specified columns for differences.

**Example**

```yaml
reconciliation:
  source:
    dataset: contracts-source/postgres/public/dim_employee_copy
  checks:
    - rows_diff:
        source_key_columns: [employee_key]
        target_key_columns: [employee_key]
        source_columns: [price, order_date]
        target_columns: [price, order_date]
        threshold:
          must_be: 0
          metric: percent
```

**Configuration keys**

| Key                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Optional |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `source_key_columns` | Key column(s) to align rows in source dataset                                                                                                                                                                                                                                                                                                                                                                                                                                 | No       |
| `target_key_columns` | Key column(s) to align rows in target dataset                                                                                                                                                                                                                                                                                                                                                                                                                                 | No       |
| `source_columns`     | <p>Columns to compare in the target dataset. If omitted, all columns are compared based on column order.<br><br>The number of defined source columns must match the number of defined target columns</p>                                                                                                                                                                                                                                                                      | Yes      |
| `target_columns`     | <p>Columns to compare in the target dataset. If omitted, all columns are compared based on column order.<br><br>The number of defined target columns must match the number of defined source columns.</p>                                                                                                                                                                                                                                                                     | Yes      |
| `threshold`          | <p><a data-mention href="./#thresholds">#thresholds</a></p><p>Acceptable difference between source and target. <br></p><p></p><p><strong>Thresholds</strong>  can be defined in two ways:</p><ul><li>As the <strong>count of differing rows</strong> between source and target.</li><li>As the <strong>percentage of differing rows</strong>, relative to the number of tested rows in the <strong>source dataset</strong>.</li></ul><p></p><p>By default, threshold = 0 </p> | Yes      |
| `filter`             | [#configure-a-check-filter](reconciliation-checks.md#configure-a-check-filter "mention"). Filter applied to both source and target                                                                                                                                                                                                                                                                                                                                            | Yes      |
| `name`               | [#check-names](./#check-names "mention")                                                                                                                                                                                                                                                                                                                                                                                                                                      | Yes      |
| `qualifier`          | [#check-qualifiers](./#check-qualifiers "mention")                                                                                                                                                                                                                                                                                                                                                                                                                            | Yes      |
| `attributes`         | [#check-attributes](reconciliation-checks.md#check-attributes "mention")                                                                                                                                                                                                                                                                                                                                                                                                      | Yes      |

