---
layout: default
title: Validity metrics
description: Use validity metrics in SodaCL checks to detect invalid values in a dataset.
parent: Soda CL
---

# Validity metrics 

Use a validity metric in a check to surface invalid or unexpected values in your dataset. <br />Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

```yaml
checks for dim_customer:
  - invalid_count(email_address) = 0:
      valid format: email
  - invalid_percent(english_education) = 0:
      valid length: 100
  - invalid_percent(total_children) <= 2:
      valid max: 6
  - invalid_percent(marital_status) = 0:
      valid max length: 10
  - invalid_count(number_cars_owned) = 0:
      valid min: 1
  - invalid_percent(marital_status) = 0:
      valid min length: 1
  - invalid_percent(birthday) < 5%:
      valid regex: (0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)
  - invalid_count(house_owner_flag) = 0:
      valid values: ['0', '1']
```

[Define checks with validity metrics](#define-checks-with-validity-metrics) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of validity metrics](#list-of-validity-metrics)<br />
[List of configuration keys](#list-of-configuration-keys)<br />
[List of valid formats](#list-of-valid-formats)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Go further](#go-further)<br />
<br />

## Define checks with validity metrics

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), you use validity metrics in standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details.

You can use all validity metrics in checks that apply to individual columns in a dataset; you cannot use validity metrics in checks that apply to entire datasets. Identify the column(s) by adding one or more values in the argument between brackets in the check. 
* You must use a [configuration key:value pair](#list-of-configuration-keys) to define what qualifies as an valid value. 
* If you wish, you can add a `%` character to the threshold for a `invalid_percent` metric for improved readability. 

```yaml
checks for dim_customer
  - invalid_count(number_cars_owned) = 0:
      valid min: 1
```

You can use validity metrics in checks with fixed thresholds, or relative thresholds, but *not* dynamic thresholds. See [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for more detail. 

```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - invalid_count(email_address) = 0:
      valid format: email
# a check with a relative threshold
  - invalid_percent(english_education) < 3%:
      valid max length: 100
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
<br/>
<code>missing_count(column_name) + invalid_count(column_name) + valid_count(column_name) = row_count</code>
 <br/>
Similarly, a calculation that uses percentage always adds up to a total of 100 for the column. 
<br/>
<code>missing_percent(name) + invalid_percent(name) + valid_percent(name) = 100 </code>
<br/>
These calculations enable you to write checks that use <strong>relative thresholds</strong>. <br />
<br />
In the example above, the invalid values of the <code>english_education</code> column must be less than three percent of the total row count, or the check fails.<br /><br />
Percentage thresholds are between 0 and 100, not between 0 and 1.
</details>


### Specify valid values

Use a nested **configuration key:value pair** to provide your own definition of a valid value. There are several configuration keys that you can use to define what qualifies as valid; the examples below illustrate the use of just a few config keys. See a complete [List of configuration keys](#list-of-configuration-keys) below.

A check that uses a validity metric has six mutable parts:

| a metric | 
| an argument | 
| a comparison symbol or phrase| 
| a threshold |  
| a configuration key |
| a configuration value|

<br />

The example below defines two checks. The first check applies to the column `house_owner_flag`. The `valid values` configuration key specifies that if a row in that column contains *anything other than* the two valid values in the list, Soda registers them as invalid. The check fails if Soda discovers more than five values that are not `0` or `1`. 
* Values in a list must be enclosed in square brackets.
* Numeric characters in a `valid values` list must be enclosed in single quotes.

The second check uses a regular expression to define what qualifies as a valid value in the `birthday` column so that any values that do *not* match the pattern defined by the regex qualify as invalid. 

```yaml
checks for dim_customer:
  - invalid_count(house_owner_flag) = 0:
      valid values: ['0', '1']
  - invalid_count(birthday) = 0:
      valid regex: ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$
```

First check:

| metric | `invalid_count` |
| argument | `house_owner_flag` |
| comparison symbol | `=` |
| threshold | `0` | 
| configuration key | `valid values` |
| configuration value(s) | `'0', '1'` |

Second check:

| metric | `invalid_count` |
| argument | `birthday` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `valid regex` |
| configuration value(s) | `(0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)` |

<br />

### Specify valid format

If the data type of the column you are checking is TEXT (such as character, character varying, or string) then you can use the `valid format` configuration key. This config key uses built-in values that test the data in the column for specific formats, such as email address format, date format, or uuid format. See [List of valid formats](#list-of-format-values) below.

 The check below validates that all values in the `email_address` column conform to an email address format. 

```yaml
checks for dim_customer:
  - invalid_percent(email_address) = 0:
      valid format: email
```

| metric | `invalid_percent` |
| argument | `email_address` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `valid format` |
| configuration value(s) | `email` |

<br />

#### Troubleshoot valid format

**Problem:** You are using a `valid format` to test the format of values in a column and the CLI returns the following error message when you run a scan. 

```shell
  | HINT:  No operator matches the given name and argument types. You might need to add explicit type casts.

Error occurred while executing scan.
  | unsupported operand type(s) for *: 'Undefined' and 'int'

```

**Solution:** The error indicates that the data type of the column is not TEXT. Adjust your check to use a different configuration key, instead.

<br />

### Send failed rows to Soda Cloud

If you have connected Soda Core to a Soda Cloud account, checks with validity metrics automatically send samples of any failed rows to Soda Cloud. 
1. To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard.
2. Click the row for a check for invalid values, then go to the **Failed rows** tab.

![failed-invalid-count](/assets/images/failed-invalid-count.png){:height="700px" width="700px"}


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with validity metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter).| [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply checks with validity metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with check name

```yaml
checks for dim_customer:
  - invalid_count(first_name) = 0 :
      valid min length: 2
      name: First name has 2 or more characters
```

#### Example with alert configuration

```yaml
  - invalid_count(house_owner_flag):
      valid values: ['0', '1']
      warn: when between 1 and 5
      fail: when > 6  
```

#### Example with in-check filter

```yaml
checks for dim_customer:
  - invalid_percent(marital_status) = 0:
      valid max length: 1
      filter: total_children = 0
```

#### Example with quotes

```yaml
checks for dim_customer:
  - invalid_count("number_cars_owned") = 0:
      valid min: 1
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_customer
    - dim_customer_%
  checks:
    - invalid_count(email_address) = 0:
        valid format: email
```

#### Example with dataset filter

```yaml
coming soon
```

<br />

## List of validity metrics

| Metric  | Column config keys | Description | Supported data type | Supported data sources | 
| ------  | ------------------ | ----------- |---------------------| ---------------------- |
| `invalid_count` | `valid format` <br /> `valid length` <br /> `valid max`<br /> `valid max length`<br /> `valid min` <br /> `valid min length`<br /> `valid regex`<sup>1</sup> <br /> `valid values` | The number of<br /> rows in a<br /> column that<br /> contain values<br /> that are not valid. | number,<br />  text,<br />  time |  Athena <br /> Redshift <br />  Apache Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake   |
| `invalid_percent` | `valid format` <br /> `valid length` <br /> `valid max`<br /> `valid max length`<br /> `valid min` <br /> `valid min length`<br /> `valid regex`<sup>1</sup> <br /> `valid values` | The percentage <br />of rows in a <br />column, relative to the total <br />row count, that <br />contain values <br />that are not <br />valid. | number,<br /> text,<br />  time |  Athena <br /> Redshift <br />  Apache Spark DataFrames <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Snowflake  | 

<sup>1</sup> **Known issue:** Connections to MS SQL Server do not support checks that use regex.<!--CORE-211-->

## List of configuration keys

The column configuration key:value pair defines what SodaCL ought to consider as valid values. 

| Column config key  | Description  | Values | 
| ------------------ | ------------ | ------ |
| `valid format` | Defines the format of a value that Soda ought to register as valid. <br />Only works with columns that contain data type TEXT. | See [List of valid formats](#list-of-valid-formats).  |
| `valid length` | Specifies a valid length for a string. <br />Only works with columns that contain data type TEXT. | integer |
| `valid max` | Specifies a maximum numerical value for valid values. | integer or float|
| `valid max length` | Specifies a valid maximum length for a string. <br />Only works with columns that contain data type TEXT.| integer |
| `valid min` | Specifies a minimum numerical value for valid values. | integer or float |
| `valid min length` | Specifies a valid minimum length for a string. <br />Only works with columns that contain data type TEXT. | integer |
| `valid regex` | Specifies a regular expression to define your own custom valid values. | regex, no forward slash delimiters |
| `valid values` | Specifies the values that Soda is to consider valid. Numeric characters in a `valid values` list must be enclosed in single quotes.| values in a list |

## List of valid formats

{% include valid-formats.md %}

## List of comparison symbols and phrases

{% include list-symbols.md %}

<!--
## Configure global valid values (experimental)

Optionally, you can use a global configuration to define what qualifies as a valid value.  Global configurations apply to all checks in a dataset so that you can write checks that use validity metrics without having to declare what qualifies as a valid value in each individual check.

The following example defines a global column configuration for what qualifies as a valid value for the `house_owner_flag` column. You can add the global configuration section to any part of your checks.yml file. The check that uses a `invalid_percent` references the global configuration to determine what qualifies as a valid value.

```yaml
configurations for dim_customer:
  valid values for house_owner_flag: ['0','1']

checks for dim_customer:
  - invalid_percent(house_owner_flag) < 1%
```

* In your global column configurations, you can identify column names with or without quotes. If you use quotes with the column name, any checks you write that do *not* use the quotes, do not use the global configuration. Refer to [Use quotes in a check]({% link soda-cl/metrics-and-checks.md %}##use-quotes-in-a-check).
* Globally defined valid values do not have an effect on aggregation checks. For example, if you globally define `0` as a valid value for a column named `value`, SodaCL still uses `0` when calculating the following aggregation check: `- avg(value) between 30 and 70`.
* You can define both global and local column configurations in a checks YAML file. If you accidentally configure the same property both globally and locally and the values conflict, SodaCL uses the local configuration to execute the check.

-->

## Go further

* Use validity metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use validity metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
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