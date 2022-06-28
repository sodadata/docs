---
layout: default
title: Configure metrics
description: A metric is a property of the data in your database. The following sections detail the configuration for metrics you can customize in your scan YAML file.
sidebar: sql
parent: Soda SQL
redirect_from: /soda-sql/documentation/sql_metrics.html
---

# Configure metrics in Soda SQL

{% include banner-sql.md %}

A **metric** is a property of the data in your database. A **measurement** is the value for a metric that Soda SQL checks against during a scan. The following sections detail the configuration for metrics you can customize in your [scan YAML file]({% link soda-sql/scan-yaml.md %}).

Read more about [Metrics]({% link soda-sql/metrics.md %}) in general as they apply to both Soda SQL and Soda Cloud. 
<br />
<br />

[Dataset metrics](#dataset-metrics)<br />
[Column metrics](#column-metrics)<br />
[Using regex with column metrics](#using-regex-with-column-metrics)<br />
[Column configuration keys](#column-configuration-keys) <br />
[Valid format values](#valid-format-values) <br />
[Historic metrics](#historic-metrics)<br />
[Metric groups and dependencies](#metric-groups-and-dependencies)<br />
[Custom metrics](#custom-metrics)<br />
[Custom metric names](#custom-metric-names)<br >
[GROUP BY queries in custom metrics](#group-by-queries-in-custom-metrics)<br />
[Variables in custom metrics](#variables-in-custom-metrics)<br />
[Custom metrics using file reference](#custom-metrics-using-file-reference)<br />
[Go further](#go-further)<br />


## Dataset metrics

Use **dataset metrics** to define tests in your scan YAML file that execute against all data in the dataset during a scan.

![table-metrics](/assets/images/table-metrics.png){:height="440px" width="440px"}

| Dataset metric <br />in Soda SQL | Description      |
| ---------- | ---------------- | -------------|
| `row_count` | The number of rows in a dataset. |
| `schema` | A list of column names in a dataset, and their data types. |


#### Example tests using a dataset metric

```yaml
tests:
  - row_count > 0
```
Checks to see if the dataset has more than one row. The test passes if the dataset contains rows.

<br />

```yaml
tests:
  - row_count =5
```
Checks to see if the dataset has exactly five rows. The test fails if the dataset contains more or fewer than five rows.


## Column metrics

Use **column metrics** to define tests in your scan YAML file that execute against specific columns in a dataset during a scan. 

Where a column metric references a valid or invalid value, or a limit, use the metric in conjunction with a **column configuration key**. A Soda SQL scan uses the value of a column configuration key to determine if it should pass or fail a test. See [example](#example-tests-using-a-column-metric) below.

![column-metrics](/assets/images/column-metrics.png){:height="440px" width="440px"}


See [Metrics examples]({% link soda-sql/examples-by-metric.md %}).

{% include column-metrics.md %}

### Using regex with column metrics

* You can only use regex to define valid or missing values in columns that contain strings.
* When using regex to define valid or missing values, be sure to put the regex inside single quotes, as per the following example. You must single quotes because, as per YAML convention, chars like `[` and `]` have specific meaning in YAML if they are the first char of a value. If the first char is a normal text char then the YAML parser reads the rest of the value as a string.
```yaml
firstname:
    valid_regex: '[A-Z].'
    tests:
      - invalid_count == 0
```

### Column configuration keys

The column configuration key:value pair defines what Soda SQL ought to consider as "valid" or "missing".  Refer to [Using regex with column metrics](#using-regex-with-column-metrics) for important details on how to define the regex in a YAML file.

{% include column-config-keys.md %}

### Valid format values

{% include valid-format-values.md %}


#### Example tests using a column metric

```yaml
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
`invalid_percentage == 0` in column `id` with column configuration `valid_format: uuid` checks the rows in the column named `id` for values that match a uuid (universally unique identifier) format. If the test passes, it means that 0% of the rows contain data that is invalid; if the test fails, it means that more than 0% of the rows contain invalid data, which is data that is in non-UUID format.

`invalid_percentage == 0` in column `feepct` with column configuration `valid_format: number_percentage` checks the rows in the column named `feepct` for values that match a percentage format. If the test passes, it means that 0% of the rows contain data that is invalid; if the test fails, it means that more than 0% of the rows contain invalid data, which is data that is in non-percentage format.

See more examples of how to use *all* column metrics in [Examples by metric]({% link soda-sql/examples-by-metric.md %}).


## Historic metrics

{% include historic-metrics.md %}


## Metric groups and dependencies

Out of the box, Soda SQL includes a **metric groups** configuration key. Define this configuration key in your scan YAML file in the dataset level or column level so that when you use one of the group's metrics in a test, Soda SQL automatically runs the test against all the metrics in its group.

| `metric_groups` value | Metrics the scan includes |
| ------------------- | ----------------------- |
| `all` | all column metrics groups |
| `missing` | `missing_count`, `missing_percentage`, `values_count`, `values_percentage`. |
| `validity` |  `valid_count`, `valid_percentage`, `invalid_count`, `invalide_percentage` |
| `duplicates` | `distinct`, `unique_count`, `duplicate_count`, `uniqueness` |
| `length` | `min_length`, `max_length`, `avg_length` |
| `profiling` |  `maxs`, `mins`, `frequent_values`, `histogram` |
| `statistics` | `min`, `max`, `avg`, `sum`, `variance`, `stddev` |


To use these metrics, be sure to define the `metric_groups` in your scan YAML file at the dataset level if the test is to apply to all columns in a dataset, or at the column level if the test is to apply only to a single column. An example follows, below.

| Column metric  |  Description |  Use with `metric_groups` |
| -------------- | ------------ | ------------------------- |
| `distinct` |  The number of rows that contain distinct values, relative to the column. For example, where a column has values: `aaa`, `aaa`, `bbb`, `ccc`, it has three distinct values. | duplicates |
| `duplicate_count` | The number of rows that contain duplicate values, relative to the column. | duplicates |
| `frequent_values` |  A list of values in the column and the frequency with which they occur.  |  profiling |
| `histogram` |  A list of values to use to create a histogram that represents the contents of the column.  |  profiling  |
| `maxs` |  A list of values that qualify as maximum relative to other values in the column.  |  profiling |
| `mins` |  A list of values that qualify as minimum relative to other values in the column.  |  profiling |
| `unique_count` | The number of rows in which a value appears exactly only once in the column. For example, where a column has values: `aaa`, `aaa`, `bbb`, `ccc`, it has two unique values.  | duplicates |
| `uniqueness` | A ratio that produces a number between 0 and 100 that indicates how unique the data in a column is.  0 indicates that all the values are the same; 100 indicates that all the values in the column are unique.  | duplicates |


In the example below, a Soda SQL scan runs two tests on the contents of the `id` column: 
- test for values that are not in UUID format
- test for duplicate values

Because the YAML file also defines `metric_groups: duplicates`, the scan also tests all other metrics in the `duplicates` group. Refer to table below.

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
    metric_groups:
    - duplicates
    valid_format: uuid
    tests:
      - invalid_percentage == 0
      - duplicate_count == 0
  feepct:
    valid_format: number_percentage
    tests:
      - invalid_percentage == 0
```

The example above defines metric groups at the **column level**, but you can also define metric groups at the **dataset level** so as to use the individual metrics from the group in tests in multiple columns. See example below.

```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
metric_groups:
  - duplicates
tests:
  - row_count > 0
columns:
  id:
    valid_format: uuid
    tests:
      - invalid_percentage == 0
      - duplicate_count == 0
  feepct:
    valid_format: number_percentage
    tests:
      - invalid_percentage == 0
      - duplicate_count == 0
```

By default, there exist **dependencies** between some metrics. If Soda SQL scans a metric which has dependencies, it includes all the dependent metrics in the scan as well.

| If you use... | ...the scan includes: |
| ------ | ------------ |
| `valid_count` | `missing_count` |
| `valid_percentage` | `missing_percentage` |
| `invalid_count` | `values_count` |
| `invalid_percentage`| `values_percentage`|
| `missing_count` <br /> `missing_percentage` <br /> `values_count` <br /> `values_percentage` | `row_count` |
| `histogram` | `min` <br /> `max` |



## Custom metrics

If the built-in set of dataset and column metrics that Soda SQL offers do not quite give you the information you need from a scan, you can use **custom metrics** to customize your queries. Custom metrics, also known as SQL metrics, essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan.


#### Dataset custom metric example
In your scan YAML file, use the `sql_metrics` property as a dataset metric or a column metric. The following simple custom metric example queries all data in the dataset to select a single numeric value. The outcome of the test determines whether or not the volume of transactions in the United States is greater than 5000.

```yaml
table_name: mytable
sql_metrics:
    - sql: |
        SELECT sum(volume) as total_volume_us
        FROM CUSTOMER_TRANSACTIONS
        WHERE country = 'US'
      tests:
        - total_volume_us > 5000
```
In the example, the computed value (the sum volume of all customer transaction in the United States) becomes a **field** named `total_volume_us`, which, in turn, becomes the name of the metric that you use to define the test Soda SQL that runs on your data. In this case, the test passes if the computed sum of all US transactions exceeds `5000`.

Notice that by default, Soda SQL uses the name of the field as the name of the metric. If you do not want to use the default field names inside your SQL queries, you can explicitly name the metrics outside the queries. See [Custom metric names](#custom-metric-names) below.


#### Multiple example

You can also compute multiple metric values in a single query, then combine them in your tests.

```yaml
table_name: mytable
sql_metrics:
    - sql: |
        SELECT sum(volume) as total_volume_us,
               min(volume) as min_volume_us,
               max(volume) as max_volume_us
        FROM CUSTOMER_TRANSACTIONS
        WHERE country = 'US'
      tests:
        - total_volume_us > 5000
        - min_volume_us > 20
        - max_volume_us > 100
        - max_volume_us - min_volume_us < 60
```
In this example, the tests pass if:

- the computed sum of all US transactions exceeds `5000`
- the numerical value of the smallest of all US transactions is greater than `20`
- the numerical value of the greatest of all US transactions is greater than `100`
- the numerical value of the difference between the greatest and smallest of US transactions is less than `60`


#### Column custom metric example

The following example uses custom metrics to run a query against an individual column named `volume`. When you use custome metrics in a column, the field you define becomes available to use as a metric in the tests in that column.

```yaml
table_name: mytable
columns:
    metrics:
        - avg
    volume:
        sql_metrics:
            - sql: |
                SELECT sum(volume) as total_volume_us
                FROM CUSTOMER_TRANSACTIONS
                WHERE country = 'US'
              tests:
                - total_volume_us - avg > 5000
```


### Custom metric names

If you do not want to use the default field names inside your SQL queries, you can use the **`metric_names` property** to explicitly name the metrics outside the queries. This property contains a list of values which match the order of values in your `SELECT` statement.

```yaml
table_name: mytable
sql_metrics:
    - sql: |
        SELECT sum(volume),
               min(volume),
               max(volume)
        FROM CUSTOMER_TRANSACTIONS
        WHERE country = 'US'
      metric_names:
        - total_volume_us
        - min_volume_us
        - max_volume_us
      tests:
        - total_volume_us > 5000
        - min_volume_us > 20
        - max_volume_us > 100
        - max_volume_us - min_volume_us < 60
```


### GROUP BY queries in custom metrics

If your SQL query uses a `GROUP BY` clause, you can use a `group_fields` property in your custom metrics to instruct Soda SQL to run each test against each group combination. The example below runs each of the four tests against each country in the dataset.

```yaml
table_name: mytable
sql_metrics:
    - sql: |
        SELECT country,
               sum(volume) as total_volume,
               min(volume) as min_volume,
               max(volume) as max_volume
        FROM CUSTOMER_TRANSACTIONS
        GROUP BY country
      group_fields:
        - country
      tests:
        - total_volume > 5000
        - min_volume > 20
        - max_volume > 100
        - max_volume - min_volume < 60
```


### Variables in custom metrics

In Soda SQL, you set a **variable** to apply a filter to the data that Soda SQL scans. Often you use a variable to filter the range of a scan by date. Refer to [Apply filters]({% link soda-sql/filtering.md %}) for details.

When you define a variable in your scan YAML file, Soda SQL applies the filter to all tests *except* tests defined in custom metrics. To apply a filter to custom metrics tests, be sure to explicitly define the variable in your SQL query, as in the example below.
{% raw %}
```yaml
table_name: mytable
filter: date = DATE '{{ date }}'
sql_metrics:
    - sql: |
        SELECT sum(volume) as total_volume_us
        FROM CUSTOMER_TRANSACTIONS
        WHERE country = 'US' AND date = DATE '{{ date }}'
      tests:
        - total_volume_us > 5000
```
{% endraw %}

### Custom metrics using file reference

Instead of including all your customized SQL queries in the custom metrics in your scan YAML file, you can use **`sql_file`** to reference a relative file.

```yaml
table_name: mytable
sql_metrics:
    - sql_file: mytable_metric_us_volume.sql
      tests:
        - total_volume_us > 5000
```

In this case, the `mytable_metric_us_volume.sql` file contains the following SQL query.

```sql
SELECT sum(volume) as total_volume_us
FROM CUSTOMER_TRANSACTIONS
WHERE country = 'US'
```

## Go further

* Reference the [Data types]({% link soda-sql/supported-data-types.md %}) that Soda SQL supports when it scans columns.
* Learn [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about the [Scan YAML]({% link soda-sql/scan-yaml.md %}) file.
* Learn more about configuring [tests]({% link soda-sql/tests.md %}).
* Learn how to apply [filters]({% link soda-sql/filtering.md %}) to your scan.


<br />

---
*Last modified on {% last_modified_at %}*