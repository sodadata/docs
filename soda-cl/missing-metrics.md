---
layout: default
title: Missing metrics
description: Use missing metrics in SodaCL checks to detect missing values in a dataset.
parent: Soda CL
redirect_from: /soda-cl/missing-validity.html
---

# Missing metrics 

Use a missing metric in a check to surface missing values in the data in your dataset. <br />Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

```yaml
checks for dim_customer
  - missing_count(birthday) = 0
  - missing_percent(gender) < 5%
  - missing_count(birthday) = 0:
      missing regex: (0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)
  - missing_count(last_name) < 5:
      missing values: [n/a, NA, none]
  - missing_percent(email_address) = 0:
      missing format: '    '
```

[Define checks with missing metrics](#define-checks-with-missing-metrics) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of missing metrics](#list-of-missing-metrics)<br />
[List of configuration keys](#list-of-configuration-keys)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Go further](#go-further)<br />
<br />


## Define checks with missing metrics

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), you use missing metrics in standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details.

You can use both missing metrics in checks that apply to individual columns in a dataset; you cannot use missing metrics in checks that apply to entire datasets. Identify the column(s) by adding one or more values in the argument between brackets in the check. 
* SodaCL considers `NULL` as the default value for "missing". 
* If you wish, you can add a `%` character to the threshold for a `missing_percent` metric for improved readability. 

```yaml
checks for dim_customer
  - missing_count(birthday, last_name) = 0
```

You can use missing metrics in checks with fixed thresholds, or relative thresholds, but *not* dynamic thresholds. See [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for more detail. 

```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - missing_percent(phone) = 5%
# a check with a relative threshold
  - missing_percent(number_employees) < 5
```

<details>
  <summary>What is a relative threshold?</summary>
When it scans a column in your dataset, Soda automatically separates all values in the column into one of three categories:
<ul> 
  <li>missing</li>
  <li>invalid</li>
  <li>valid</li>
</ul>
Soda then performs two calculations. The sum of the count for all categories in a column is always equal to the total row count for the dataset. 
<br/><br/>
missing count(column name) + invalid count(column name) + valid count(column name) = row count
<br/><br/>
Similarly, a calculation that uses percentage always adds up to a total of 100 for the column. 
<br/><br/>
missing percent(name) + invalid percent(name) + valid percent(name) = 100 
<br/><br/>
These calculations enable you to write checks that use <strong>relative thresholds</strong>. <br />
<br />
In the example above, the missing values (in this case, NULL) of the <code>number_employees</code> column must be less than five percent of the total row count, or the check fails.<br /><br />
Percentage thresholds are between 0 and 100, not between 0 and 1.
</details>


### Specify missing values or missing regex

SodaCL considers `NULL` as the default value for "missing". In the two check examples above, Soda executes the checks to count the number or values which are `NULL`, or the percent of values  which are `NULL` relative to the total row count of the column. 

However, you can use a nested **configuration key:value pair** to provide your own definition of a missing value. See [List of configuration keys](#list-of-configuration-keys) below.

A check that uses a missing metric has four or six mutable parts:

| a metric | 
| an argument | 
| a comparison symbol or phrase| 
| a threshold |  
| a configuration key (optional) |
| a configuration value (optional)|

<br />

The example below defines two checks. The first check applies to the column `last_name`. The `missing values` configuration key specifies that any of the three values in the list exist in a row in that column, Soda recognizes those values as missing values. The check fails if Soda discovers more than five values that match `NA`, `n/a`, or `'0'`. 
* Values in a list must be enclosed in square brackets.
* Numeric characters in a `missing values` list must be enclosed in single quotes.

The second check uses a regular expression to define what qualifies as a missing value in the `birthday` column so that any values that are `00/00/0000` qualify as missing. This check passes if Soda discovers no values that match the pattern defined by the regex.

```yaml
checks for dim_customer:
  - missing_count(last_name) < 5:
      missing values: [NA, n/a, '0']
  - missing_count(birthday) = 0:
      missing regex: (0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)
```

First check:

| metric | `missing_count` |
| argument | `last_name` |
| comparison symbol | `<` |
| threshold | `5` | 
| configuration key | `missing values` |
| configuration value(s) | `NA, n/a, '0'` |

Second check:

| metric | `missing_count` |
| argument | `birthday` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `missing regex` |
| configuration value(s) | `(0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)` |

<br />

### Specify missing format

*Known issue:* The `missing format` configuration does not function as expected. A fix is forthcoming.<!--CORE-212-->

Defines what qualifies as a value that ought to register as missing, such as whitespace or empty strings. For example, three spaces in row is recognizable as an entry, but from a business perspective, it ought to be recognized as missing.

The check below ensures that Soda ought to consider any value entered as three spaces as missing, in addition to all NULL values which Soda automatically considers as missing.

```yaml
checks for dim_customer:
  - missing_percent(email_address) = 0:
      missing format: '   '
```

| metric | `missing_percent` |
| argument | `email_address` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `missing format` |
| configuration value(s) | `'   '` |


<br />

### Send failed rows to Soda Cloud

If you have connected Soda Core to a Soda Cloud account, checks with missing metrics automatically send samples of any failed rows to Soda Cloud. 
1. To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard.
2. Click the row for a check for missing values, then go to the **Failed rows** tab.

![failed-missing-count](/assets/images/failed-missing-count.png){:height="700px" width="700px"}

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with missing metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter).| [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply checks with missing metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with check name

```yaml
checks for dim_customer:
  - missing_count(birthday) = 0:
      missing regex: (0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)
      name: Date entered as 00/00/0000
```

#### Example with alert configuration

```yaml
checks for dim_customer:
  - missing_percent(marital_status):
      valid length: 1
      warn: when < 5
      fail: when >= 5  
```

#### Example with in-check filter

```yaml
checks for dim_customer:
  - missing_count(first_name) < 5:
      missing values: [NA, none]
      filter: number_children_at_home > 2
```

#### Example with quotes

```yaml
checks for dim_reseller:
  - missing_percent("phone", "address_line1") = 0
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_product
    - dim_product_%
  checks:
    - missing_count(product_line) = 0
```

#### Example with dataset filter

```yaml
coming soon
```

<br />

## List of missing metrics

| Metric | Column config keys | Description | Supported data type | Supported data sources | 
| ------ | ------------------ | ----------- | ------------------- |------------------------| 
| `missing_count` | `missing format` <br /> `missing regex`<sup>1</sup>  <br /> `missing values` | The number of rows in a column that contain NULL values and any other user-defined values that qualify as missing. | number, text, time |  Athena <br /> Redshift <br />  Apache Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake   |
| `missing_percent` | `missing format` <br /> `missing regex`<sup>1</sup>  <br /> `missing values` | The percentage of rows in a column, relative to the total row count, that contain NULL values and any other user-defined values that qualify as missing. | number, text, time |  Athena <br /> Redshift <br />  Apache Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  | 

<sup>1</sup> **Known issue:** Connections to MS SQL Server do not support checks that use regex. <!--CORE-211-->

## List of configuration keys

The column configuration key:value pair defines what SodaCL ought to consider as missing values. 

| Column config key  | Description  | Values | 
| ------------------ | ------------ | ------ |
| `missing format` | Defines what qualifies as a value that ought to register as missing, such as whitespace or empty strings. For example, three spaces in row is recognizable as an entry, but from a business perspective, it ought to be recognized as missing. <br />*Known issue:* The `missing format` configuration does not function as expected. A fix is forthcoming. <!--CORE-212-->|
| `missing regex` | Specifies a regular expression to define your own custom missing values.| regex, no forward slash delimiters, string only |
| `missing values` | Specifies the values that Soda is to consider missing. Numeric characters in a `valid values` list must be enclosed in single quotes. | values in a list |


## List of comparison symbols and phrases

{% include list-symbols.md %}

<!--
## Configure global missing values (experimental)

Optionally, you can use a global configuration to define what qualifies as a missing value.  Global configurations apply to all checks in a dataset so that you can write checks that use missing metrics without having to declare what qualifies as a missing value in each individual check.

The following example defines a global column configuration for what qualifies as a missing value for the `growth_pct` column. You can add the global configuration section to any part of your checks.yml file. The check that uses a `missing_percent` references the global configuration to determine what qualifies as a missing value.

```yaml
configurations for dim_customer:
  missing values for first_name: [none]

checks for dim_customer:
  - missing_percent(first_name) < 1%
```

* In your global column configurations, you can identify column names with or without quotes. If you use quotes with the column name, any checks you write that do *not* use the quotes, do not use the global configuration. Refer to [Use quotes in a check]({% link soda-cl/metrics-and-checks.md %}##use-quotes-in-a-check).
* Globally defined missing values do not have an effect on aggregation checks. For example, if you globally define `0` as a missing value for a column named `value`, SodaCL still uses `0` when calculating the following aggregation check: `- avg(value) between 30 and 70`.
* You can define both global and local column configurations in a checks YAML file. If you accidentally configure the same property both globally and locally and the values conflict, SodaCL uses the local configuration to execute the check.
-->

## Go further

* Use missing metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use missing metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
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