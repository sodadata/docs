---
layout: default
title: Define tests
parent: Documentation
nav_order: 7
---

# Define tests

A **test** is a check that Soda SQL performs when it scans a table in your warehouse. Technically, it is a Python expression that, during a Soda SQL scan, checks metrics to see if they match the parameters defined for a measurement. A single Soda SQL scan runs against a single table in your database, but each scan can run multiple tests against multiple columns.

As a result of a scan, each test either passes or fails. When a test fails, it means that a property of the data in your table did not match the test parameters you defined. In other words, any test that returns `true` during a Soda SQL scan passes; any test that returns `false`, fails.

The **scan results** appear in your command-line interface (CLI). The results include an exit code which is an indicator of the test results: `0` means all tests passed; a non-zero value means one or more tests have failed.  See [Scan output in Soda SQL]({% link soda-sql/documentation/scan.md %}#scan-output-in-soda-sql) for details.

**Soda Cloud** refers to tests as **monitors**. Refer to [Create monitors and alerts]({% link soda-sql/documentation/monitors.md %}) to learn how to define a monitor using Soda Cloud.

## Define tests using metrics

You define your tests in your [scan YAML file]({% link soda-sql/documentation/scan-yaml.md %}) which is associated with a specific table in your database. You can write tests using **[default metrics]({% link soda-sql/documentation/sql_metrics.md %})** that Soda SQL applies to an entire table (table metrics), or to individual columns you identify (column metrics). You can also write tests using **[custom metrics]({% link soda-sql/documentation/sql_metrics.md %}#sql-metrics)** (SQL metrics) that you can apply to an entire table or individual columns. See [example tests]({% link soda-sql/examples/examples-by-metric.md %}) that use each default metric.

Regardless of where it applies, each test is generally comprised of three parts:

- a metric (a property of the data in your database)
- a comparison operator
- a value

For example:

```yaml
tests:
  - row_count > 0
```

At times, a test may only include one part, a metric, that simply returns a calculated value. For example, you may wish to write a test that simply returns the calculated sum of the values in a numeric column.

```yaml
columns:
  commission_paid:
    tests:
      - sum
```

However, where a test must determine whether or not data is valid, you must add a fourth element, a **column configuration key** to define what qualifies as valid. In the scan YAML file, you define a column configuration key before the test that will use the definition of "valid".

In the example below, the user defined the `valid_format` as `date_eu` or dd/mm/yyyy format. The metric `invalid_percentage` refers to the `valid_format` configuration key to determine if the data in the column is valid. Note that `valid_format` applies only to columns with data type TEXT. Refer to [Data types]({% link soda-sql/documentation/supported-data-types.md %}) for details. To see a list of all available column configuration keys, see [Column Metrics]({% link soda-sql/documentation/sql_metrics.md %}#column-metrics).

```yaml
columns:
    start_date:
        valid_format: date_eu
        tests:
            - invalid_percentage < 2.0
```

See [example tests]({% link soda-sql/examples/examples-by-metric.md %}) that use each default metric.

<br />

#### Example tests using default metrics

Reference the table below which corresponds to the following example scan YAML file. Both the `id` and `feepct` columns are of data type TEXT, enabling the user to define a `valid_format` for the contents of the columns. See [Valid format]({% link soda-sql/documentation/sql_metrics.md %}#valid-format) for details.

```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
tests:
  - row_count > 0
columns:
  id:
    valid_format: uuid
    tests:
      - invalid_percentage == 0
  feepct:
    valid_format: number_percentage
    tests:
      - invalid_percentage == 0
```

| Default metric | Comparison operator | Value | Applies to | Test |
| ------ | ------------------- | ----- | ---------- | ---- |
| `row_count` | `>` | `0` | whole table | Checks to see if the table has at least one row. If the test fails, it means the table has no rows, which means that the table is empty.|
| `invalid_percentage` | `==` | `0` | `id` column | Checks to see if all rows in the id column contain data in a valid format. If the test fails, it means that more than 0% of the rows contain invalid data, which is data that is in non-UUID format.|
| `invalid_percentage` | `==` | `0` | `feepct` column | Checks to see if all rows in the `feepct` column contain data in a valid format. If the test fails, it means that more than 0% of the rows contain invalid data, which is data that is not a numerical percentage.|

See [example tests]({% link soda-sql/examples/examples-by-metric.md %}) that use each default metric.

<br />



#### Example tests using custom metrics

If the default set of table and column metrics that Soda SQL offers do not quite give you the information you need from a scan, you can use **SQL metrics** to customize your queries. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/documentation/sql_metrics.md %}#sql-metrics)

Reference the table below which corresponds to the following example scan YAML file.

```yaml
table_name: yourtable
sql_metrics:
    - sql: |
          SELECT sum(volume) as total_volume_us
          FROM CUSTOMER_TRANSACTIONS
          WHERE country = 'US'
      tests:
          - total_volume_us > 5000
```

| Custom metric | Comparison operator | Value | Applies to | Test |
| ------------- | ------------------- | ----- | ---------- | ---- |
| `total_volume_us` | `>` | `5000`|  whole table | Checks to see if the sum of all customer transactions in the United States exceeds `5000`. If the test fails, it means that the total volume of transactions is less than `5000`.


## Define test names

Soda SQL can run both anonymous or named tests. Named tests are useful if you intend to push Soda SQL scan results to your Soda Cloud account where you can update a test and retain its test history.

Example of an anonymous test
```yaml
tests:
    - total_volume_us > 5000
```

Examples of named tests
```yaml
tests:
    volume_test_max:  total_volume_us > 3000
    volume_test_min:  total_volume_us < 5000
```

## Go further

* Learn how to [apply filters]({% link soda-sql/documentation/filtering.md %}) such as date, to a scan of your data.
* Learn more about [Metrics]({% link soda-sql/documentation/sql_metrics.md %}).
* See [example tests]({% link soda-sql/examples/examples-by-metric.md %}) that use each default metric.
* Learn about [How Soda works]({% link soda-sql/documentation/concepts.md  %}).
* Reference the [Data types]({% link soda-sql/documentation/supported-data-types.md %}) that Soda SQL supports when it scans columns.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.