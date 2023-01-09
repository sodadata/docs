---
layout: default
title: Numeric metrics
description: Use numeric metrics in SodaCL checks for data quality.
parent: Soda CL
redirect_from: soda-cl/duplicates.html
---

# Numeric metrics 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a numeric metric in a check to perform basic calculations on the data in your dataset. <br />Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

```yaml
checks for retail_products:
  - avg(size) between 100 and 300 
  - avg_length(manufacturer) > 10
  - duplicate_count(product_id) = 0
  - duplicate_percent(user_id) < 2%
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
&nbsp;&nbsp;&nbsp;&nbsp;[Failed row samples](#failed-row-samples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[List of numeric metrics](#list-of-numeric-metrics)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Change-over-time thresholds](#change-over-time-thresholds) <br />
[Go further](#go-further)<br />
<br />

## Define checks with numeric metrics

In the context of Soda check types, you use numeric metrics in Standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details.

You can use the `row_count` metric in checks that apply to entire datasets. 
```yaml
checks for dim_reseller:
  - row_count > 0
```

You can use all numeric metrics in checks that apply to individual columns in a dataset. Identify the column by adding a value in the argument between brackets in the check. 

```yaml
checks for dim_reseller:
  - duplicate_count(phone) = 0
```

You can use some numeric metrics in checks with either fixed or change-over-time thresholds. See [Change-over-time thresholds](#change-over-time-thresholds) for more detail. 

```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - duplicate_count(phone) = 0
# a check with a dynamic threshold
  - change avg last 7 for row_count < 50
```

### Failed row samples

Checks that use the `duplicate_count` or `duplicate_percent` metrics automatically collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100. 

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration in a check with a validity metric. You can add this configuration to your checks YAML file for Soda Core, or when writing checks as part of an [agreement]({% link soda-cloud/agreements.md %}) in Soda Cloud. 

```yaml
checks for dim_customer:
  - duplicate_count(email_address) < 50:
      samples limit: 2
```

<br />

For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a check for duplicate values. Examine failed rows in the **Failed rows** tab; see [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for further details.

![failed-duplicate-count](/assets/images/failed-duplicate-count.png){:height="700px" width="700px"}


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with numeric metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter). | [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
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
filter CUSTOMERS [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - duplicate_count(phone) < 10
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

| Metric  | Description | Supported data type | Supported data sources<sup>1</sup> |
| ------  | ----------- | ------------------- | ---------------------- |
| `avg`  | The average value in a numeric column. | number | all  |
| `avg_length`  | The average length in a text column. | text | all  |
| `duplicate_count`  | The number of rows that contain duplicate values.<br> Include one column in the argument to compare values relative to that one column. <br/>Include more than one column in the argument to compare values across columns. See also: [Duplicate check]({% link soda/quick-start-sodacl.md %}#duplicate-check)| number<br /> text<br /> time | all  |
| `duplicate_percent`  | The percentage of rows in a dataset that contain duplicate values.<br> Include one column in the argument to compare values relative to that one column. <br/>Include more than one column in the argument to compare values across columns. | number<br /> text<br /> time | all  |
| `max`  | The greatest value in a numeric column. | number | all  |
| `max_length`  | The greatest length in a text column. | text | all |
| `min`  | The smallest value in a numeric column. | number | all  |
| `min_length`  | The smallest length in a text column. | text | all  |
| `percentile` | The value below which a percentage of observations fall within a group of observations. <br /> For example, `percentile(distance, 0.7)`. | number | PostgreSQL <br /> Snowflake |
| `row_count` | The number of rows in a dataset or column, if specified. | number<br /> text<br /> time | all |
| `stddev`  | The calculated standard deviation of values in a numeric column. | number | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev_pop`  | The calculated population standard deviation of values in a numeric column. | number |  Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `stddev_samp`  | The calculated sample standard deviation of values in a numeric column. | number | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `sum`  | The calculated sum of the values in a numeric column. | number | all  |
| `variance`  | The calculated variance of the values in a numeric column. | number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `var_pop`  | The calculated population variance of the values in a numeric column. | number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |
| `var_samp`  | The calculated sample variance of the values in a numeric column.| number<br /> time | Athena <br /> Redshift <br />  Big Query <br /> PostgreSQL <br /> Snowflake |

<sup>1</sup> Soda has not validated metric functionality for any data source labeled as "Experimental".

## List of comparison symbols and phrases

{% include list-symbols.md %}

## Change-over-time thresholds

*Requires Soda Cloud*

Numeric metrics can specify a **fixed threshold** which is not relative to any other threshold. `row_count > 0` is an example of a check with a fixed threshold as the threshold value, `0`, is absolute. Refer to [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for details.

Only checks that use numeric metrics can specify a **change-over-time threshold**, a value that is relative to a previously-measured, or historic, value. Sometimes referred to as a dynamic threshold or historic metrics, you use these change-over-time thresholds to gauge changes to the same metric over time. Most of the examples below use the `row_count` metric, but you can use any numeric metric in checks that use change-over-time thresholds. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account. Soda Cloud stores the measured value of each metric that a check result produces during a scan in a Cloud Metric Store. Over time, these historic values accumulate and you can reference them to detect anomalous values relative to historic values for the same metric. Therefore, you must have a Soda Cloud account to use change-over-time thresholds.

The most basic of change-over-time threshold checks has three or four mutable parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a threshold |  

<br />

The example below defines a check that applies to the entire dataset and counts the rows in the dataset, then compares that value to the preceding value contained in the Cloud Metric Store. If the `row_count` at present is greater than the previously-recorded historic value for `row_count` by more than 50 or less than -20, the check fails. 

Use `between` for checks with change-over-time thresholds as much as possible to trigger check failures when the measurement falls outside of a range of acceptable values. This practice ensures that you get visibility into changes that either exceed or fall short of threshold expectations. 

Note that checks with change-over-time thresholds define a failed state for data quality. This is unlike all other SodaCL metrics and checks in which you define a passing state.

```yaml
checks for dim_customer:
  - change for row_count between -20 and +50
```

| metric |`row_count` |
| threshold | `between -20 and +50` |

<br />

You can also use use a change-over-time threshold to compare check results relative to the same day in the previous week. The example below uses change-over-time to compare today's value with the same check result from last week to confirm that the delta is greater than 10. 
```yaml
checks for dim_customer:
  - change same day last week for row_count > 10
```

| metric |`row_count` |
| threshold | `> 10` |

<br />

The example below defines a check that applies to the entire dataset and counts the rows in the dataset, then compares that value to the preceding value contained in the Cloud Metric Store. If the `row_count` at present is greater than the previously-recorded historic value for `row_count` by more than 50%, the check fails. 

For example, the previously-recorded historic measurement for row count is 80, and the newly-recorded value is 100, the relative change is 25%, which is less than the 50% specified in the threshold, so the check passes.
* Percentage thresholds are between 0 and 100, not between 0 and 1. 
* If you wish, you can add a `%` character to the threshold for a change-over-time threshold for improved readability.   
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

A more complex change-over-time threshold check includes two more optional mutable parts:

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
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
