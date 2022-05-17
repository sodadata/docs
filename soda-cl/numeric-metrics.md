---
layout: default
title: Numeric metrics
description: 
parent: Soda CL
redirect: 
---

# Numeric metrics

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

checks for retail_orders:
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
[Define boundaries and zones](#define-boundaries-and-zones)<br />
<br />

## Definition

A **metric** is a property of the data in your dataset. A **measurement** is the value for a metric that Soda checks against during a scan. The default check result for these basic checks is one of the following three: 
* **pass** - the values in the dataset match or fall within the thresholds you specified for the measurment
* **fail** - the values in the dataset _do not_ match or fall within the threshold you specified for the measurment
* **error** - the syntax of the check is invalid


Use numeric metrics to write basic checks for data quality that specify a fixed measurement value, or **fixed threshold**, which is not relative to any other measurement. 

Generally, a fixed threshold check has three or four parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a measurement |  



<br />

```yaml
checks for retail_products: 
  - row_count > 0
  - max(size) <= 500
```

The example above defines two checks. The first check applies to the entire dataset and counts the rows to confirm that it is not empty. If the `retail_products` dataset contains more than `0` rows, the check result is `pass`.

| metric |`row_count` |
| comparison symbol | `>` |
| measurement | `0` | 

The second check applies to only the `size` column in the dataset and checks that the values in that column do not exceed `500`. If the `size` column in the `retail_products` dataset contains values larger than `500`, the check result is `fail`.

| metric | `max` |
| argument | `(size)` |
| comparison symbol | `<=` |
| measurement | `500`  |


You can also use numeric metrics to write basic changes that specify a **dynamic threshold**, a measurement value that is relative to a past measurement value. You use these dynamic threshold checks to gauge changes to the same metric over time.


Generally, a dynamic threshold check has three or four parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a measurement |  



<br />

```yaml
checks for retail_products: 
  - row_count > 0
  - max(size) <= 500
``` 

## Optional configurations

| ✓ | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define alert configurations to specify warn and fail thresholds | Alert configurations |
|   | Use wildcard values {% raw %} (%) {% endraw %} in arguments |  - |
| ✓ | Use quotes when identifying dataset or column names | Quotes in checks |
| ✓ | Apply table filters to partition data during a scan | Table filters |
| ✓ | Use for each to apply checks to multiple datasets in one scan | For each |


## List of numeric metrics

| Metric | Arguments | Description | Supported data type | Supported data sources |
| ------ | --------- | ----------- | ---------------------- |
| `avg` | one or more column names, comma-separated values | The average value in a numeric column. | number | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `avg_length` | one or more column names, comma-separated values | The average length in a text column. | text | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `duplicate_count` | one or more column names, comma-separated values | The number of rows that contain duplicate values, relative to the column. | number<br /> text<br /> time | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max` | one or more column names, comma-separated values | The greatest value in a numeric column. | number<br /> time | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `max_length` | one or more column names, comma-separated values | The greatest length in a text column. | text | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min` | one or more column names, comma-separated values | The smallest value in a numeric column. | number<br /> time | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `min_length` | one or more column names, comma-separated values | The smallest length in a text column. | text | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
| `percentile` | one or more column names, comma-separated values, percentage | The value below which a percentage of observations fall within a group of observations. <br /> For example, `percentile(distance, 0.7)`. | number | PostgreSQL |
| `row_count` | (optional) one or more column names, comma-separated values| The number of rows in a table or column, if specified. | number<br /> text<br /> time | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev` | one or more column names, comma-separated values | The calculated standard deviation of values in a numeric column. | number | PostgreSQL |
| `stddev_pop` | one or more column names, comma-separated values | The calculated population standard deviation of values in a numeric column. | number |  PostgreSQL |
| `stddev_samp` | one or more column names, comma-separated values | The calculated sample standard deviation of values in a numeric column. | number | PostgreSQL |
| `sum` | one or more column names, comma-separated values | The calculated sum of the values in a numeric column. | number | Amazon Redshift <br /> GCP Big Query <br /> PostgreSQL <br /> Snowflake  |
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

## Define boundaries and zones

WIP 

(Optional) You can set a boundary using a range; must include all variations using parens, square brackets, and minus.
(Optional) Zones


{metric} {between or not between} {inline fixed numeric measurement range} 				<-- setting boundaries
	- row_count between [-5 and 11)

{metric}({column_name}) {between or not between} {inline fixed numeric measurement range}  	<-- setting boundaries
	- duplicate_count(billing_address) between -5 and 10)




## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}