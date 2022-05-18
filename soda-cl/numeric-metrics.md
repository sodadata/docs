---
layout: default
title: Numeric metrics
description: 
parent: Soda CL
redirect: 
---

# Numeric metrics ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

```yaml
checks for retail_products:
  - avg(size) between 100 and 300 
  - avg_length(manufacturer) > 10
  - duplicate_count(product_id) = 0
  - max(size) <= 500
  - max_length(manufacturer) = 25
  - min(size) >= 50
  - min_length(manufacturer) = 5
  - row_count > 0
  - percentile(size, 0.95) > 50

checks for retail_orders_postgres:
  - stddev(order_quantity) > 0
  - stddev_pop(order_quantity) between 3 and 4
  - stddev_samp(order_quantity) not between 3 and 4
  - sum(discount, order_quantity) < 120
  - variance(discount) > 0
  - var_pop(discount) between 0 and 5
  - var_samp(discount) not between 0 and 5
```

[Definition](#definition) <br />
[Optional configurations](#optional-configurations)<br />
[List of numeric metrics](#list-of-numeric-metrics)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Fixed and dynamic thresholds](#fixed-and-dynamic-thresholds<br />
[Go further](#go-further)<br />
<br />

## Definition

Use a numeric metric in a check to perform basic calculations on the data in your dataset. Read more about [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

You can use the `row_count` metric in checks that apply to entire datasets. 
```yaml
checks for dim_reseller:
  - row_count > 0
```

You can use all numeric metrics in checks that apply to individual columns in a dataset. Identify the column(s) by adding one or more values in the argument in the check. 

```yaml
checks for dim_reseller:
  - duplicate_count(phone, address_line1) = 0
```

You can use numeric metrics in checks with either fixed or dynamic thresholds. See [Fixed and dynamic thresholds](#fixed-and-dynamic-thresholds) for more detail. 

```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - duplicate_count(phone) = 0
# a check with a dynamic threshold
  - change avg last 7 for row_count < 50
```

If you have connected Soda Core to a Soda Cloud account, one numeric metric, `duplicate_count`, automatically sends samples of any failed rows to Soda Cloud. 
1. To review the failed rows in Soda Cloud, navigate to the **Monitors** dashboard.
2. Click the row for the `duplicate_count` check, then go to the **Failed rows** tab.

![failed-duplicate-count](/assets/images/failed-duplicate-count.png){:height="700px" width="700px"}


## Optional configurations

| ✓ | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | Alert configurations |
| ✓ | Define a name for a numeric check; see [example](#example-with-check-name). |  Define names for checks |
| ✓ | Apply a filter to return results for a specific portion of the data in your dataset. | Filters | 
|   | Use wildcard values {% raw %} (%) {% endraw %} with values in the check argument. |  - |
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | Quotes in checks |
| ✓ | Apply table filters to partition data during a scan; see [example](#example-with-table-filters). | Table filters |
| ✓ | Use for each to apply checks with numeric metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks) | For each |

#### Example with alert configuration

```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: when > 5
      fail: when >= 10  
```

#### Example with check name

```yaml
checks for dim_reseller:
  - duplicate_count(phone) = 0:
      name: Duplicate phone numbers
```

#### Example with filter

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vaccation hours for sales territory US
      filter: sales_territory_key = 11
```

#### Example with quotes

```yaml
checks for dim_reseller:
  - duplicate_count("phone", "address_line1") = 0
```

#### Example with table filters

```yaml
coming soon
```

#### Example with for each checks

```yaml
for each table T:
  tables:
    - dim_product
    - dim_customer
    - dim reseller
  checks:
    - row_count > 0
```

## List of numeric metrics

| Metric | Arguments | Description | Supported data type | Supported data sources |
| ------ | --------- | ----------- | ---------------------- |
| `avg` | one or more column names, comma-separated values | The average value in a numeric column. | number | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `avg_length` | one or more column names, comma-separated values | The average length in a text column. | text | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `duplicate_count` | one or more column names, comma-separated values | The number of rows that contain duplicate values, relative to the column. | number<br /> text<br /> time | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max` | one or more column names, comma-separated values | The greatest value in a numeric column. | number<br /> time | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max_length` | one or more column names, comma-separated values | The greatest length in a text column. | text | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min` | one or more column names, comma-separated values | The smallest value in a numeric column. | number<br /> time | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min_length` | one or more column names, comma-separated values | The smallest length in a text column. | text | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `percentile` | one or more column names, comma-separated values, percentage | The value below which a percentage of observations fall within a group of observations. <br /> For example, `percentile(distance, 0.7)`. | number | PostgreSQL |
| `row_count` | (optional) one or more column names, comma-separated values| The number of rows in a table or column, if specified. | number<br /> text<br /> time | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev` | one or more column names, comma-separated values | The calculated standard deviation of values in a numeric column. | number | PostgreSQL |
| `stddev_pop` | one or more column names, comma-separated values | The calculated population standard deviation of values in a numeric column. | number |  PostgreSQL |
| `stddev_samp` | one or more column names, comma-separated values | The calculated sample standard deviation of values in a numeric column. | number | PostgreSQL |
| `sum` | one or more column names, comma-separated values | The calculated sum of the values in a numeric column. | number | Amazon Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake  |
| `variance` | one or more column names, comma-separated values | The calculated variance of the values in a numeric column. | number<br /> time | PostgreSQL |
| `var_pop` | one or more column names, comma-separated values | The calculated population variance of the values in a numeric column. | number<br /> time | PostgreSQL |
| `var_samp` | one or more column names, comma-separated values | The calculated sample variance of the values in a numeric column.| number<br /> time | PostgreSQL |


## List of comparison symbols and phrases

```yaml
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

## Fixed and dynamic thresholds

Numeric metrics can specify a fixed measurement value, or **fixed threshold**, which is not relative to any other measurement. `row_count > 0` is an example of a check with a fixed threshold as the measurement value, `0`, is absolute. Refer to [Fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#fixed-thresholds)

Only checks that use numeric metrics can specify a **dynamic threshold**, a measurement value that is relative to a past measurement value. Sometimes referred to a change-over-time threshold, you use these dynamic threshold measurements to gauge changes to the same metric over time. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account. Soda Cloud stores the value of each measurement that a check result produces during a scan. Over time, these historic measurements accumulate and you can reference them to detect anomalous measurements relative to previous measurements for the same metric. Therefore, you must have a Soda Cloud account to use dynamic thresholds.

The most basic of dynamic threshold checks has three or four mutable parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a measurement |  

<br />

```yaml
checks for dim_customer:
  - change for row_count < 50
```

The example above defines a check that applies to the entire dataset and counts the rows in the dataset, then compares that value to the preceeding value contained in the Cloud Metric Store. If the `row_count` at present is greater than the preceding measurement for `row_count` by more than 49, the check fails.

| metric |`row_count` |
| comparison symbol | `>` |
| measurement | `50` | 

The example below applies to only the `phone` column in the dataset and counts the rows that contain duplicate values, then compares that value to the preceeding value contained in the Cloud Metric Store. If the number of duplicate phone numbers at present is greater than the preceding measurement for `duplicate_count` by more than 20, the check fails.

```yaml
checks for dim_customer:
  - change for duplicate_count(phone) < 20
```

| metric | `duplicate_count` |
| argument | `(phone)` |
| comparison symbol | `<` |
| measurement | `20`  |

<br />

A more complex dynmaic threshold check includes two more optional mutable parts:

| a calculation type (optional) `avg`, `min`, `max`|
| a count (optional) |
| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a measurement |  

<br />


```yaml
checks for dim_customer:
  - change avg last 7 for row_count < 50
  - change min last 7 for row_count < 50
  - change max last 7 for row_count < 50
```
 
The example above defines three checks, one for each type of calculation available to use, `avg`, `min`, and `max`, all of which apply to the entire dataset. Each check values uses a count of `7` which refers to the preceding seven measurements. The first check counts the rows in the dataset, then compares that value to the calculated average of the preceding seven values contained in the Cloud Metric Store. If the `row_count` at present is greater than the average of the seven preceding measurements by more than 50, the check fails. The second and third checks in the example determine the minimum value and maximum value of the preceding seven measurements resepectively, then use that value to compare to the present measurement value.

## Go further

* Use numeric metrics in checks with alert configurations to establish warn and fail zones.
* Use numeric metrics to in checks that define ranges of acceptable measurements using boundary thresholds.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}