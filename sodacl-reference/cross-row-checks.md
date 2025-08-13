---
description: >-
  Use a SodaCL cross check to compare row counts across datasets in the same, or
  different, data sources.
---

# Cross checks

Use a cross check to compare row counts between datasets within the same, or different, data sources.

See also: [Compare data using SodaCL](../soda-cl-overview/compare.md)

```yaml
checks for dim_customer:
# Check row count between datasets in one data source
  - row_count same as dim_department_group
# Check row count between datasets in different data sources
  - row_count same as retail_customers in aws_postgres_retail
```

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check

## Define cross checks

In the context of [SodaCL check types](metrics-and-checks.md#check-types), cross checks are unique. This check employs the `row_count` metric and is limited in its syntax variation, with only a few mutable parts to specify dataset and data source names.

The example check below compares the volume of rows in two datasets in the same data source. If the row count in the `dim_department_group` is not the same as in `dim_customer`, the check fails.

```yaml
checks for dim_customer:
  - row_count same as dim_department_group
```

\


You can use cross checks to compare row counts between datasets in different data sources, as in the example below.

In the example, `retail_customers` is the name of the other dataset, and `aws_postgres_retail` is the name of the data source in which `retail_customers` exists.

```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail
```

* If you wish to compare row counts of datasets in different data sources, you must have configured a connection to both data sources. Soda needs access to both data sources in order to execute a cross check between data sources.
* The data sources do not need to be the same type; you can compare a dataset in a PostgreSQL data source to a dataset in a BigQuery data source.

## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th align="center">Configuration</th><th align="center">Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td align="center">Define a name for a cross check; see <a href="cross-row-checks.md#example-with-check-name">example</a>.</td><td align="center"><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td align="center">Add an identity to a check.</td><td align="center"><a href="optional-config.md#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center"> </td><td align="center">Define alert configurations to specify warn and fail alert conditions.</td><td align="center">-</td></tr><tr><td align="center"> </td><td align="center">Apply an in-check filter to return results for a specific portion of the data in your dataset.</td><td align="center">-</td></tr><tr><td align="center">✓</td><td align="center">Use quotes when identifying dataset or column names; see <a href="cross-row-checks.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td align="center"><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center"> </td><td align="center">Use wildcard characters ( % or * ) in values in the check.</td><td align="center">-</td></tr><tr><td align="center"> </td><td align="center">Use for each to apply schema checks to multiple datasets in one scan.</td><td align="center">-</td></tr><tr><td align="center">✓</td><td align="center">Apply a dataset filter to partition data during a scan; see <a href="cross-row-checks.md#example-with-dataset-filters">example</a>.</td><td align="center">-</td></tr></tbody></table>

#### Example with check name

```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail:
      name: Cross check customer datasets
```

#### Example with quotes

```yaml
checks for dim_customer:
  - row_count same as "dim_department_group"
```

#### Example with dataset filters

```yaml
filter dim_promotion [daily]:
  where: discount_pct = '0.5'

filter retail_orders [daily]:
  where: discount = `50'

checks for dim_promotion [daily]:
  - row_count same as retail_orders [daily] in aws_postgres_retail:
      name: Cross check between data sources
```

\


## Go further

* Learn more about [SodaCL metrics and checks](metrics-and-checks.md) in general.
* Learn more about [Comparing data using SodaCL](../soda-cl-overview/compare.md).
* Use a [schema check](schema.md) to discover missing or forbidden columns in a dataset.
* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
