---
description: >-
  Use a SodaCL user-defined check to define elements of a check using SQL
  expressions or queries.
---

# User-defined checks

If the built-in set of metrics and checks that SodaCL offers do not quite give you the information you need from a scan, you can define your own metrics to customize your checks. User-defined checks essentially enable you to create common-table expressions (CTE) or SQL queries that Soda Library runs during a scan, or you can reference a file that contains your CTE or SQL query.

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✔️    SQL-defined metric available as a no-code check with a self-hosted Soda Agent connected to any Soda-supported data source, except Spark, and Dask and Pandas\
&#x20;       OR\
&#x20;       with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, or Snowflake data source

## Define user-defined checks

In the context of [SodaCL check types](metrics-and-checks.md#check-types), these are user-defined checks. Truly, it is the metric that you define yourself, then use in a check.

The example below uses [common table expression (CTE)](https://www.essentialsql.com/introduction-common-table-expressions-ctes/) to define the metric that is then used in the check. The check itself follows the simple pattern of a [standard check](metrics-and-checks.md#standard-check-types) that uses a metric, a comparison symbol or phrase, and a threshold.

You specify the CTE value for the custom metric using a nested **expression key** which also defines the name of the new custom metric. The name you provide for a custom metric must _not_ contain spaces.

```yaml
checks for dim_reseller:
  - avg_order_span between 5 and 10:
      avg_order_span expression: AVG(last_order_year - first_order_year)
```

| custom metric               | `avg_order_span`                          |
| --------------------------- | ----------------------------------------- |
| comparison symbol or phrase | `between`                                 |
| threshold                   | `5 and 10`                                |
| expression key              | `avg_order_span expression`               |
| expression value            | `AVG(last_order_year - first_order_year)` |

Instead of using CTE to define a custom metric, you can use a SQL query. The example check below follows the same standard check pattern, but includes a nested **query key** to define the custom metric and its name.

* The name you provide for a custom metric must _not_ contain spaces.
* Though you specify the dataset against which to run the query in the SQL query, you must also provide the dataset identifier in the `checks for` section header. Without the dataset identifier, Soda cannot send the check results to Soda Cloud.

```yaml
checks for dim_product:
  - product_stock >= 50:
      product_stock query: |
        SELECT COUNT(safety_stock_level - days_to_manufacture)
        FROM dim_product
```

| custom metric               | `product_stock`                                                           |
| --------------------------- | ------------------------------------------------------------------------- |
| comparison symbol or phrase | `>=`                                                                      |
| threshold                   | `50`                                                                      |
| query key                   | `product_stock query`                                                     |
| query value                 | `SELECT COUNT(safety_stock_level - days_to_manufacture) FROM dim_product` |

Instead of embedding an expression or a query directly in the check definition, you can direct Soda to use a query or expression you have defined in a different file. The example check below follow the same pattern as the metrics that use CTE or SQL queries, but this nested key identifies the **file path** of your query file.

* The name you provide for a custom metric must _not_ contain spaces.
* Though you specify the dataset against which to run the query in the SQL query, you must also provide the dataset identifier in the `checks for` section header. Without the dataset identifier, Soda cannot send the check results to Soda Cloud.

```yaml
checks for product_desc:
  - avg_surface between 1068 and 1069:
      avg_surface sql_file: "filepath/filename.sql"
```

\


You can also use a user-defined metric with an anomaly detection metric by defining the check, then nesting the query for the custom metric in the check, as in the following example.

```yaml
checks for dim_product:
  - anomaly detection for product_stock:
      product_stock query: |
        SELECT COUNT(safety_stock_level - days_to_manufacture)
        FROM dim_product
```

\


## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th>Configuration</th><th>Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td>Define a name for a user-defined check; see <a href="user-defined.md#example-with-check-name">example</a>.</td><td><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td>Add an identity to a check.</td><td><a href="https://docs.soda.io/soda-cl/optional-config.html#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center">✓</td><td>Define alert configurations to specify warn and fail alert conditions; see <a href="user-defined.md#example-with-alert-configuration">example</a>.</td><td><a href="optional-config.md#add-alert-configurations">Add alert configurations</a></td></tr><tr><td align="center"> </td><td>Apply an in-check filter to return results for a specific portion of the data in your dataset.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use quotes when identifying dataset or column names; see <a href="user-defined.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center">✓</td><td>Use wildcard characters in the value in the check.</td><td>Use wildcard values as you would with CTE or SQL.</td></tr><tr><td align="center">✓</td><td>Use for each to apply user-defined checks to multiple datasets in one scan; see <a href="user-defined.md#example-with-for-each">example</a>.</td><td><a href="optional-config.md#apply-checks-to-multiple-datasets">Apply checks to multiple datasets</a></td></tr><tr><td align="center">✓</td><td>Apply a dataset filter to partition data during a scan; see <a href="user-defined.md#example-with-dataset-filter">example</a>.<br><em>Known issue:</em> Dataset filters are not compatible with user-defined checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time.</td><td><a href="optional-config.md#scan-a-portion-of-your-dataset">Scan a portion of your dataset</a></td></tr><tr><td align="center">✓</td><td>Include a failed row sample query inside a SQL or CTE user-defined metric configuration to send failed row samples to Soda Cloud; see example.</td><td><a href="../run-a-scan/failed-row-samples.md#customize-a-failed-row-samples-query">Customize a failed row samples query</a></td></tr><tr><td align="center">✓</td><td>Specify a single column against which to run a check that uses a user-defined metric; see <a href="user-defined.md#example-with-columm-parameter">example</a>.</td><td>-</td></tr><tr><td align="center"> </td><td>Supports <code>samples columns</code> parameter to specify columns from which Soda draws failed row samples.</td><td><a href="../run-a-scan/failed-row-samples.md#customize-sampling-for-checks">Customize sampling for checks</a></td></tr><tr><td align="center"> </td><td>Supports <code>samples limit</code> parameter to control the volume of failed row samples Soda collects.</td><td><a href="../run-a-scan/failed-row-samples.md#set-a-sample-limit">Set a sample limit</a></td></tr><tr><td align="center"> </td><td>Supports <code>collect failed rows</code> parameter instruct Soda to collect, or not to collect, failed row samples for a check.</td><td><a href="../run-a-scan/failed-row-samples.md#customize-sampling-for-checks">Customize sampling for checks</a></td></tr></tbody></table>

#### Example with check name

```yaml
checks for dim_product:
  - product_stock >= 50:
      name: Product stock 
      product_stock query: |
        SELECT COUNT(safety_stock_level - days_to_manufacture)
        FROM dim_product
```

#### Example with alert configuration

```yaml
  - avg_order_span:
      avg_order_span expression: AVG(last_order_year - first_order_year)
      warn: when > 50
      fail: when > 200
```

#### Example with quotes

```yaml
checks for dim_product:
  - product_stock >= 50:
      product_stock query: |
        SELECT COUNT("safety_stock_level" - "days_to_manufacture")
        FROM dim_product
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_reseller
  checks:
    - avg_order_span between 5 and 10:
        avg_order_span expression: AVG(last_order_year - first_order_year)
```

#### Example with dataset filter

```yaml
filter FULFILLMENT [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for FULFILLMENT [daily]:
  - avg_order_span between 5 and 10:
      avg_order_span expression: AVG(last_order_day - first_order_day)
```

#### Example with failed row sample query

```yaml
checks for CUSTOMERS:
  - belgium_customers < 6:
      belgium_customers query: |
        SELECT count(*) as belgium_customers
        FROM CUSTOMERS
        WHERE country = 'BE'
      failed rows query: |
          SELECT *
          FROM CUSTOMERS
          WHERE country != 'BE'
```

#### Example with column parameter

```yaml
checks for product_b:
  - id_for_belgium:
      id_for_belgium query: SELECT count(*) FROM product_b
      failed rows query: SELECT id FROM product_b WHERE id IS NULL
      name: ID in Belgium is empty
      column: id
      fail: when > 62
```

\


## List of comparison symbols and phrases

```
 = 
 < 
 >
 <=
 >=
 !=
 <> 
 between 
 not between 
```

## Go further

* Learn more about [SodaCL metrics and checks](metrics-and-checks.md) in general.
* Borrow user-defined check syntax to define a reusable [check template](check-template.md).
* Use a [schema check](schema.md) to discover missing or forbidden columns in a dataset.
* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
