---
layout: default
title: Metrics and thresholds
description: 
parent: SodaCL
---

# Metrics and thresholds

This section explains the general principles of how to compose checks using metrics.

The basic pattern for numeric metric checks is as follows:
```yaml
<metric> <threshold>
```

For example, in the check defined as `row_count > 0`, `row_count` is the metric, and `> 0` is the threshold. When it runs a scan, Soda Core executes the check against your table; if the row count is greater than 0, the check passes; if the table is empty, the check fails.

[Numeric metrics](#numeric-metrics)<br />
[Fixed thresholds and boundaries](#fixed-thresholds-and-boundaries)<br />
[Warning thresholds and zones](#warning-thresholds-and-zones)<br />
[Change-over-time thresholds](#change-over-time-thresholds)<br />
[Anomaly detection thresholds](#anomaly-detection-thresholds)<br />
<br />


## Numeric metrics

| Metric | Arguments | Description | Supported data sources |
| ------ | --------- | ----------- | ---------------------- |
| `row_count` | | The number of rows in a table. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake |
| `duplicate_count` | one or more column names | The number of rows that contain duplicate values, relative to the column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `missing_count` | column name | The number of rows in a column that do not contain specific content. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `missing_percent` | column name | The percentage of rows in a column that do not contain specific content. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `invalid_count` | column name | The number of rows that contain invalid values. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `invalid_percent` | column name | The percentage of rows that contain invalid values.| Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min` | column name | The smallest value in a numeric column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max` | column name | The greatest value in a numeric column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `avg` | column name | The average value in a numeric column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `sum` | column name | The calculated sum of the values in a numeric column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min_length` | column name | The smallest length in a text column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max_length` | column name | The greatest length in a text column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `avg_length` | column name | The average length in a text column. | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `percentile` | column name, percentage |  The value below which a percentage of observations fall within a group of observations. For example, `percentile(distance, 0.7)`. | PostgreSQL |
| `stdev` | column name | The calculated standard deviation of values in a numeric column. | PostgreSQL |
| `stddev_pop` | column name | The calculated population standard deviation of values in a numeric column. | PostgreSQL |
| `stddev_samp` | column name | The calculated sample standard deviation of values in a numeric column. | PostgreSQL |
| `variance` | column name | The calculated variance of the values in a numeric column. | PostgreSQL |
| `var_pop` | column name | The calculated population variance of the values in a numeric column. | PostgreSQL |
| `var_samp` | column name | The calculated sample variance of the values in a numeric column.| PostgreSQL |


## Fixed thresholds and boundaries

The following example lists multiple ways to use set thresholds for the `row_count` metric in checks. You can use any numeric metrics in lieu of `row_count`.

```yaml
checks for {table_name}:
  - row_count = 10.0
  - row_count < 11
  - row_count > 9
  - row_count <= 10
  - row_count >= 10
  - row_count != 0
  - row_count <> 0
  - row_count between 10 and 15
  - row_count between -5 and 10
  - row_count between (9 and 15]
  - row_count between [-5 and 11)
  - row_count not between 11 and 15
  - row_count not between -5 and 9
  - row_count not between (10 and 15
  - row_count not between -5 and 10)
```

By default, SodaCL includes the values that define the boundary thresholds when Soda Core executes a check. For example, in `row_count between 10 and 15`, the check passes if the number of rows is equal to `10, 11, 12, 13, 14, or 15` because SodaCL includes both boundary thresholds, `10` and `15`, when Soda Core executes the check.

If you wish, you can instruct SodaCL to *exclude* the boundary threshold values from a scan. However, rather than using multiple operands to define a threshold boundary, you can use the opening bracket `(` and closing bracket `)` characters to demand that SodaCL excludes a boundary threshold.
* a `(` before the lower threshold boundary means the value is excluded from the check. For example, rather than writing `9 < row_count <= 15`, you can use `row_count between (9 and 15`; instead of writing `row_count <= 10 or 15 < row_count`, you can use `row_count not between ]10 and 15`.
* a `)` after the upper threshold boundary means the value is excluded from the check. For example, rather than writing `-5 <= row_count < 11`, you can use `row_count between -5 and 11)`; instead of writing `row_count < -5 or 10 <= row_count`, you can use `row_count not between -5 and 10)`.

Though SodaCL includes the values that define the boundary thresholds during a check by default, you can explicitly specify which values to include, if you wish. For example, all of the following checks are equivalent:

* `row_count between 10 and 15`
* `row_count between [10 and 15`
* `row_count between 10 and 15]`
* `row_count between [10 and 15]`

## Warning thresholds and zones

Where most checks yield pass or fail check results, you have the option of defining a warning threshold for any numeric metric check. To do so, you define a threshold that, when reached or surpassed, triggers a warning. For example, this check triggers a warning if the `row_count` of the `CUSTOMERS` table is lower than `10`.

```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when < 10
```

<br />

You can also define fail and warning zones, effectively yielding more severe check results the further a measurement falls outside the parameters you specify as acceptable for your data quality. 

The example that follows defines split warning and failure zones in which inner is good, and outer is bad. The chart below illustrates the pass (white), warn (yellow), and fail (red) zones. 

```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when not between -10 and 10
      fail: when not between -20 and 20
```

![historic-chart](/assets/images/historic-chart.png){:height="300px" width="300px"}

<br />

The next example defines a different kind of zone slip in which inner is bad, and outer is good. The chart below illustrates the fail (red), warn (yellow), and pass (white) zones.
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when between -20 and 20
      fail: when between -10 and 10
```

![historic-chart2](/assets/images/historic-chart2.png){:height="350px" width="350px"}



## Change over time thresholds

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the historic measurements for your checks in a metric store. SodaCL can then use these stored values to evaluate change-over-time thresholds relative to previous measurements. Therefore, you must have a [Soda Cloud account]({% link soda-cloud/overview.md%}) to use change-over-time thresholds.

The following example demonstrates how to use a change-over-time threshold for the `row_count` metric in a check. You can use any numeric metrics in lieu of `row_count`. This check yields a failed check result if the difference between the previous `row_count` measurement and the current `row_count` measurement is 50 or greater. 

```yaml
checks for CUSTOMERS:
  - change for row_count < 50
```

<br />

The next example demonstrates how to use change-over-time thresholds to gauge the difference between the current `row_count` measurement and the average, minimum, and maximum value for the measurement calculated using the preceding seven measurements for `row_count`. 
```yaml
checks for CUSTOMERS:
  - change avg last 7 for row_count < 50
  - change min last 7 for row_count < 50
  - change max last 7 for row_count < 50
```

## Anomaly detection 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the historic measurements for your checks in a metric store. SodaCL can then use these stored values to establish a baseline of normal measurements against which to evaluate future measurements to identify anomalies. Therefore, you must have a [Soda Cloud account]({% link soda-cloud/overview.md%}) to use change-over-time thresholds.

The following example demonstrates how to use the anomaly score for the `row_count` metric in a check. You can use any numeric metrics in lieu of `row_count`. By default, anomaly score checks yield warning check results, not failures.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < default
```
<br />

If you wish, you can override the anomaly score. <!--why would you want to do this? what is the .7 a portion of?--> The following check yields a warning check result if the anomaly score for `row_count` exceeds `.7`.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < .7
```

<br />

Further, you can use `warn` and `fail` thresholds with the anomaly score. The following example demonstrates how to define the threshold for `row_count` that yields a warning, and the threshold that yields a failed check result. Note that an individual check only ever yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more serious, failed check result. 
```yaml
checks for CUSTOMERS:
  - anomaly score for row_count:
      warn: when > .8
      fail: when > .99
```

---
{% include docs-footer.md %}
