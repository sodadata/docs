---
layout: default
title: Numeric metrics
description: Use numeric metrics in SodaCL checks for data quality.
parent: Soda CL
redirect_from: soda-cl/duplicates.html
---

# Numeric metrics 

Use a numeric metric in a check to perform basic calculations on the data in your dataset. <br />Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

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

[Define checks with numeric metrics](#define-checks-with-numeric-metrics) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of numeric metrics](#list-of-numeric-metrics)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Fixed and dynamic thresholds](#fixed-and-dynamic-thresholds)<br />
[Go further](#go-further)<br />
<br />

## Define checks with numeric metrics

In the context of Soda check types, you use numeric metrics in Standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details.

You can use the `row_count` metric in checks that apply to entire datasets. 
```yaml
checks for dim_reseller:
  - row_count > 0
```

You can use all numeric metrics in checks that apply to individual columns in a dataset. Identify the column(s) by adding one or more values in the argument between brackets in the check. 

```yaml
checks for dim_reseller:
  - duplicate_count(phone, address_line1) = 0
```

You can use some numeric metrics in checks with either fixed or dynamic thresholds. See [Fixed and dynamic thresholds](#fixed-and-dynamic-thresholds) for more detail. 

```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - duplicate_count(phone) = 0
# a check with a dynamic threshold
  - change avg last 7 for row_count < 50
```

### Send failed rows to Soda Cloud

If you have connected Soda Core to a Soda Cloud account, checks that use a `duplicate_count` metric automatically sends samples of any failed rows to Soda Cloud. 
1. To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard.
2. Click the row for the check with `duplicate_count`, then go to the **Failed rows** tab.

![failed-duplicate-count](/assets/images/failed-duplicate-count.png){:height="700px" width="700px"}


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with numeric metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter). <br />Exception: you *cannot* use filters in checks with a `duplicate_count` metric. <br /> *Known issue:* In-check filters on numeric checks is not consistently applied. <!--Github 1541-->| [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply checks with numeric metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


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

#### Example with in-check filter

*Known issue:* In-check filters on numeric checks is not consistently applied. <!--Github 1541-->

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for sales territory US
      filter: sales_territory_key = 11
```

#### Example with quotes

```yaml
checks for dim_reseller:
  - duplicate_count("phone", "address_line1") = 0
```

#### Example with dataset filter

```yaml
coming soon
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_product
    - dim_customer
    - dim reseller
  checks:
    - row_count > 0
```

## List of numeric metrics

| Metric  | Description | Supported data type | Supported data sources |
| ------  | ----------- | ------------------- | ---------------------- |
| `avg`  | The average value in a numeric column. | number | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `avg_length`  | The average length in a text column. | text | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `duplicate_count`  | The number of rows that contain duplicate values.<br> Include one column in the argument to compare values relative to that one column. <br/>Include more than one column in the argument to compare values across columns. See [Duplicate check]({% link soda/quick-start-sodacl.md %}#duplicate-check)| number<br /> text<br /> time | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `max`  | The greatest value in a numeric column. | number<br /> time | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `max_length`  | The greatest length in a text column. | text | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `min`  | The smallest value in a numeric column. | number<br /> time | Athena <br /> Redshift <br /> Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `min_length`  | The smallest length in a text column. | text | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `percentile` | The value below which a percentage of observations fall within a group of observations. <br /> For example, `percentile(distance, 0.7)`. | number | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `row_count` | The number of rows in a dataset or column, if specified. | number<br /> text<br /> time | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake |
| `stddev`  | The calculated standard deviation of values in a numeric column. | number | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev_pop`  | The calculated population standard deviation of values in a numeric column. | number |  Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev_samp`  | The calculated sample standard deviation of values in a numeric column. | number | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `sum`  | The calculated sum of the values in a numeric column. | number | Athena <br /> Redshift <br />  Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  |
| `variance`  | The calculated variance of the values in a numeric column. | number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `var_pop`  | The calculated population variance of the values in a numeric column. | number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `var_samp`  | The calculated sample variance of the values in a numeric column.| number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |


## List of comparison symbols and phrases

{% include list-symbols.md %}

## Fixed and dynamic thresholds

Numeric metrics can specify a **fixed threshold** which is not relative to any other threshold. `row_count > 0` is an example of a check with a fixed threshold as the threshold value, `0`, is absolute. Refer to [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for details.

Only checks that use numeric metrics can specify a **dynamic threshold**, a value that is relative to a previously-measured, or historic, value. Sometimes referred to as a change-over-time threshold, you use these dynamic thresholds to gauge changes to the same metric over time. Most of the examples below use the `row_count` metric, but you can use any numeric metric in checks that use dynamic thresholds. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account. Soda Cloud stores the measured value of each metric that a check result produces during a scan in a Cloud Metric Store. Over time, these historic values accumulate and you can reference them to detect anomalous values relative to historic values for the same metric. Therefore, you must have a Soda Cloud account to use dynamic thresholds.

The most basic of dynamic threshold checks has three or four mutable parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a threshold |  

<br />

The example below defines a check that applies to the entire dataset and counts the rows in the dataset, then compares that value to the preceding value contained in the Cloud Metric Store. If the `row_count` at present is greater than the previously-recorded historic value for `row_count` by more than 50 or less than -20, the check fails. 

Use `between` for checks with dynamic thresholds as much as possible to trigger check failures when the measurement falls outside of a range of acceptable values. This practice ensures that you get visibility into changes that either exceed or fall short of threshold expectations. 

```yaml
checks for dim_customer:
  - change for row_count between -20 and +50
```

| metric |`row_count` |
| threshold | `between -20 and +50` |

<br />

The example below defines a check that applies to the entire dataset and counts the rows in the dataset, then compares that value to the preceding value contained in the Cloud Metric Store. If the `row_count` at present is greater than the previously-recorded historic value for `row_count` by more than 50%, the check fails. 

For example, the previously-recorded historic measurement for row count is 80, and the newly-recorded value is 100, the relative change is 25%, which is less than the 50% specified in the threshold, so the check passes.
* Percentage thresholds are between 0 and 100, not between 0 and 1. 
* If you wish, you can add a `%` character to the threshold for a dynamic threshold for improved readability.   
* If the previous measurement value is 0 and the new value is 0, Soda calculates the relative change as 0%. However, if the previous measurement value is 0 and the new value is not 0, then Soda indicates the check as `NOT EVALUATED` because the calculation is a division by zero. 

```yaml
checks for dim_customer:
  - change percent for row_count > 50%
```

| metric |`row_count` |
| comparison symbol | `>` |
| threshold | `50 %` | 

<br />

The example below applies to only the `phone` column in the dataset and counts the rows that contain duplicate values, then compares that value to the preceding value contained in the Cloud Metric Store. If the number of duplicate phone numbers at present is greater than the preceding historic values for `duplicate_count` by more than 20, the check fails.

```yaml
checks for dim_customer:
  - change for duplicate_count(phone) < 20
```

| metric | `duplicate_count` |
| argument | `(phone)` |
| comparison symbol | `<` |
| threshold | `20`  |

<br />

A more complex dynamic threshold check includes two more optional mutable parts:

| a calculation type (optional) `avg`, `min`, `max`|
| a historical value definition (optional) `7` |
| percent (optional) |
| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a threshold |  

<br />


```yaml
checks for dim_customer:
  - change avg last 7 for row_count < 50
  - change min last 7 for row_count < 50
  - change max last 7 percent for row_count < 50
```
 
The example above defines three checks, one for each type of calculation available to use, `avg`, `min`, and `max`, all of which apply to the entire dataset.  

The first check counts the rows in the dataset, then compares that value to the calculated average of the preceding seven measurement values for that metric contained in the Cloud Metric Store. If the `row_count` at present is greater than the average of the seven preceding historic values by more than 50, the check fails. The only valid historical value definiton you can use is seven.

| calculation type (optional) | `avg` |
| a historical value definition (optional) | `last 7`
| percent (optional) | - |
| metric | `row_count` |
| argument (optional) | - |
| comparison symbol or phrase| `<` |
| a threshold | `50` |

<br />

The second check in the example determines the minimum value of the preceding seven historic values, then uses that value to compare to the present measurement value. 

| calculation type (optional) | `min` |
| historical value definition (optional) | `last 7`
| percent (optional) | - |
| metric | `row_count` |
| argument (optional) | - |
| comparison symbol or phrase| `<` |
| a threshold | `50` |

<br />

The third check in the example determines the maximum value of the preceding seven historic values, then uses that value and the present measurement value to calculate the percentage of change. 

| calculation type (optional) | `max` |
| historical value definition (optional) | `last 7`
| percent (optional) | `percent` |
| metric | `row_count` |
| argument (optional) | - |
| comparison symbol or phrase| `<` |
| a threshold | `50` |


## Go further

* Use numeric metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use numeric metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
