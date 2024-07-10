---
layout: default
title: Validity metrics
description: Use validity metrics in SodaCL checks to detect invalid values in a dataset.
parent: Soda CL reference
---

# Validity metrics 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a validity metric in a check to surface invalid or unexpected values in your dataset. 
{% include code-header.html %}
```yaml
checks for dim_customer:
# Check for valid values
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
      valid values: [0, 1]
```
{% include code-header.html %}
```yaml
checks for dim_customer:
# Check for invalid values
  - invalid_count(first_name) = 0:
      invalid values: [Antonio]
  - invalid_count(number_cars_owned) = 0:
      invalid values: [0, 3] 
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />

[Define checks with validity metrics](#define-checks-with-validity-metrics) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Specify valid or invalid values](#specify-valid-or-invalid-values)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Specify valid format](#specify-valid-format)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Failed row samples](#failed-row-samples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[List of validity metrics](#list-of-validity-metrics)<br />
[List of configuration keys](#list-of-configuration-keys)<br />
[List of valid formats](#list-of-valid-formats)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Go further](#go-further)<br />
<br />

## Define checks with validity metrics

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), you use validity metrics in standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details.

You can use all validity metrics in checks that apply to individual columns in a dataset; you cannot use validity metrics in checks that apply to entire datasets. Identify the column by adding a value in the argument between brackets in the check. 
* You must use a [configuration key:value pair](#list-of-configuration-keys) to define what qualifies as an valid value or invalid value. 
* If you wish, you can add a `%` character to the threshold for a `invalid_percent` metric for improved readability. This character does not behave as a wildard in this context.

{% include code-header.html %}
```yaml
checks for dim_customer
  - invalid_count(number_cars_owned) = 0:
      valid min: 1
```

You can use validity metrics in checks with fixed thresholds, or relative thresholds, but *not* change-over-time thresholds. See [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for more detail. 
{% include code-header.html %}
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
  <summary style="color:#00BC7E">What is a relative threshold?</summary>
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


### Specify valid or invalid values

Use a nested **configuration key:value pair** to provide your own definition of a valid or invalid value. There are several configuration keys that you can use to define what qualifies as valid; the examples below illustrate the use of just a few config keys. See a complete [List of configuration keys](#list-of-configuration-keys) below.

A check that uses a validity metric has six mutable parts:

| a metric | 
| an argument | 
| a comparison symbol or phrase| 
| a threshold |  
| a configuration key |
| a configuration value|

<br />

The example below defines two checks. The first check applies to the column `house_owner_flag`. The `valid values` configuration key specifies that if a row in that column contains *anything other than* the two valid values in the list, Soda registers them as invalid. The check fails if Soda discovers any values that are *not* `0` or `1`. 
* Values in a list must be enclosed in square brackets.
* *Known issue:*  Do not wrap numeric values in single quotes if you are scanning data in a BigQuery data source. 

The second check uses a regular expression to define what qualifies as a valid value in the `birthday` column so that any values that do *not* match the pattern defined by the regex qualify as invalid. 
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count(house_owner_flag) = 0:
      valid values: [0, 1]
  - invalid_count(birthday) = 0:
      valid regex: ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$
```

First check:

| metric | `invalid_count` |
| argument | `house_owner_flag` |
| comparison symbol | `=` |
| threshold | `0` | 
| configuration key | `valid values` |
| configuration value(s) | `0, 1` |

Second check:

| metric | `invalid_count` |
| argument | `birthday` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `valid regex` |
| configuration value(s) | `(0?[0-9]|1[012])[/](0?[0-9]|[12][0-9]|3[01])[/](0000|(19|20)?\d\d)` |

<br />

The `invalid values` configuration key specifies that if a row in that column contains the invalid values in the list, Soda registers them as invalid. In the example below, the check fails if Soda discovers any values that are `Antonio`. 

Values in a list must be enclosed in square brackets.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count(first_name) = 0:
      invalid values: [Antonio]
```

<br />

### Specify valid format

If the data type of the column you are checking is TEXT (such as character, character varying, or string) then you can use the `valid format` configuration key. This config key uses built-in values that test the data in the column for specific formats, such as email address format, date format, or uuid format. See [List of valid formats](#list-of-valid-formats) below.

 The check below validates that all values in the `email_address` column conform to an email address format. 
{% include code-header.html %}
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

### Failed row samples

Checks with validity metrics automatically collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100. 

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration in a check with a validity metric. You can add this configuration to your checks YAML file for Soda Library, or when writing checks as part of an agreement in Soda Cloud. 
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_percent(email_address) < 50:
      samples limit: 2
```

<br />

For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

Alternatively, you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_percent(email_address) < 50:
      samples limit: 0
```

<br />

You can also use a `samples columns` configuration to a check to specify the columns for which Soda must implicitly collect failed row sample values, as in the following example. Soda only collects this check's failed row samples for the columns you specify in the list. 

Note that the comma-separated list of samples columns does not support wildcard characters (%).
{% include code-header.html %}
```yaml
checks for dim_employee:
  - invalid_count(gender) = 0:
      valid values: ["M", "Q"]
      samples columns: [employee_key, first_name]
```
<br />

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a check for validity values. Examine failed rows in the **Failed Rows** tab; see [Examine failed row samples]({% link soda-cloud/failed-rows.md %}) for further details.

![failed-invalid-count](/assets/images/failed-invalid-count.png){:height="700px" width="700px"}


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with validity metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter).| [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply checks with validity metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count(first_name) = 0 :
      valid min length: 2
      name: First name has 2 or more characters
```

#### Example with alert configuration
{% include code-header.html %}
```yaml
  - invalid_count(house_owner_flag):
      valid values: [0, 1]
      warn: when between 1 and 5
      fail: when > 6  
```

#### Example with in-check filter
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_percent(marital_status) = 0:
      valid max length: 1
      filter: total_children = 0
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count("number_cars_owned") = 0:
      valid min: 1
```

#### Example with for each
{% include code-header.html %}
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
{% include code-header.html %}
```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - invalid_count(email_address) = 0:
      valid format: email
```

<br />

## List of validity metrics

| Metric  | Column config keys | Description | Supported data type |  
| ------  | ------------------ | ----------- |---------------------| 
| `invalid_count` | `invalid format`<br /> `invalid regex`<br /> `invalid values`<br />`valid format` <br /> `valid length` <br /> `valid max`<br /> `valid max length`<br /> `valid min` <br /> `valid min length`<br /> `valid regex` <br /> `valid values` | The number of<br /> rows in a<br /> column that<br /> contain values<br /> that are not valid. | number,<br />  text,<br />  time |
| `invalid_percent` | `invalid format`<br /> `invalid regex`<br /> `invalid values`<br /> `valid format` <br /> `valid length` <br /> `valid max`<br /> `valid max length`<br /> `valid min` <br /> `valid min length`<br /> `valid regex` <br /> `valid values`| The percentage <br />of rows in a <br />column, relative to the total <br />row count, that <br />contain values <br />that are not <br />valid. | number,<br /> text,<br />  time |  


## List of configuration keys

The column configuration key:value pair defines what SodaCL ought to consider as valid values. 

| Column config key  | Description  | Values | 
| ------------------ | ------------ | ------ |
| `invalid format` | Defines the format of a value that Soda ought to register as invalid. <br />Only works with columns that contain data type TEXT. | See [List of valid formats](#list-of-valid-formats).  |
| `invalid regex` | Specifies a regular expression to define your own custom invalid values. | regex, no forward slash delimiters |
| `invalid values` | Specifies the values that Soda ought to consider invalid. |
| `valid format` | Defines the format of a value that Soda ought to register as valid. <br />Only works with columns that contain data type TEXT. | See [List of valid formats](#list-of-valid-formats).  |
| `valid length` | Specifies a valid length for a string. <br />Only works with columns that contain data type TEXT. | integer |
| `valid max` | Specifies a maximum numerical value for valid values. | integer or float|
| `valid max length` | Specifies a valid maximum length for a string. <br />Only works with columns that contain data type TEXT.| integer |
| `valid min` | Specifies a minimum numerical value for valid values. | integer or float |
| `valid min length` | Specifies a valid minimum length for a string. <br />Only works with columns that contain data type TEXT. | integer |
| `valid regex` | Specifies a regular expression to define your own custom valid values. | regex, no forward slash delimiters |
| `valid values` | Specifies the values that Soda ought to consider valid.| values in a list |

## List of valid formats

* Though table below lists valid formats, the same apply for invalid formats.
* Valid formats apply *only* to columns using data type **TEXT**, not DATE or NUMBER.
* The Soda Library package for **MS SQL Server** has limited support for valid formats. See the [separate list below](#formats-supported-with-soda-for-ms-sql-server) of formats supported for MS SQL Server.

| Valid format value  | Format |
| ------------------- | ------ |
| `credit card number` | Four four-digit numbers separated by spaces.<br /> Four four-digit numbers separated by dashes.<br /> Sixteen-digit number.<br /> Four five-digit numbers separated by spaces.<br />|
| `date eu` | Validates date only, not time. <br />dd/mm/yyyy |
| `date inverse` | Validates date only, not time. <br />yyyy/mm/dd |
| `date iso 8601` | Validates date and/or time according to <a href="https://www.w3.org/TR/NOTE-datetime" target="_blank">ISO 8601 format </a>. <br /> 2021-04-28T09:00:00+02:00 |
| `date us` | Validates date only, not time. <br />mm/dd/yyyy |
| `decimal` | Number uses a `,` or `.` as a decimal indicator. |
| `decimal comma` | Number uses `,` as decimal indicator. |
| `decimal point` | Number uses `.` as decimal indicator. |
| `email` | name@domain.extension |
| `integer` | Number is whole. |
| `ip address` | Four whole numbers separated by `.` |
| `ipv4 address` | Four whole numbers separated by `.` |
| `ipv6 address` | Eight values separated by `:` |
| `money` | A money pattern with currency symbol + decimal point or comma + currency abbreviation.|
| `money comma` | A money pattern with currency symbol + decimal comma + currency abbreviation. |
| `money point` | A money pattern with currency symbol + decimal point  + currency abbreviation. |
| `negative decimal` | Negative number uses a `,` or `.` as a decimal indicator.|
| `negative decimal comma` | Negative number uses `,` as decimal indicator. |
| `negative decimal point` | Negative number uses `.` as decimal indicator. |
| `negative integer` | Number is negative and whole. |
| `negative percentage` | Negative number is a percentage.  |
| `negative percentage comma` | Negative number is a percentage with a `,` decimal indicator. | 
| `negative percentage point` | Negative number is a percentage with a `.` decimal indicator. |
| `percentage comma` | Number is a percentage with a `,` decimal indicator. |
| `percentage point` | Number is a percentage with a `.` decimal indicator. |
| `percentage` | Number is a percentage. |
| `phone number` | +12 123 123 1234<br /> 123 123 1234<br /> +1 123-123-1234<br /> +12 123-123-1234<br /> +12 123 123-1234<br /> 555-2368<br /> 555-ABCD |
| `positive decimal` | Postive number uses a `,` or `.` as a decimal indicator. |
| `positive decimal comma` | Positive number uses `,` as decimal indicator. |
| `positive decimal point` | Positive number uses `.` as decimal indicator. |
| `positive integer` | Number is positive and whole. |
| `positive percentage` | Positive number is a percentage.  |
| `positive percentage comma` | Positive number is a percentage with a `,` decimal indicator. |
| `positive percentage point` | Positive number is a percentage with a `.` decimal indicator. |
| `time 12h` | Validates against the 12-hour clock.<br /> hh:mm:ss |
| `time 12h nosec` | Validates against the 12-hour clock.<br /> hh:mm |
| `time 24h` | Validates against the 244-hour clock.<br /> hh:mm:ss |
| `time 24h nosec` | Validates against the 24-hour clock.<br /> hh:mm |
| `timestamp 12h` | Validates against the 12-hour clock. <br /> hh:mm:ss |
| `timestamp 24h` | Validates against the 24-hour clock. <br /> hh:mm:ss |
| `uuid` | Universally unique identifier. | 


### Formats supported with Soda for MS SQL Server

| Valid format value  | Format |
| ------------------- | ------ |
| `date eu` | Validates date only, not time. <br />dd/mm/yyyy |
| `date inverse` | Validates date only, not time. <br />yyyy/mm/dd |
| `date us` | Validates date only, not time. <br />mm/dd/yyyy |
| `decimal` | Number uses a `,` or `.` as a decimal indicator. |
| `integer` | Number is whole. |
| `ip address` | Four whole numbers separated by `.` |
| `negative integer` | Number is negative and whole. |
| `phone number` | +12 123 123 1234<br /> 123 123 1234<br /> +1 123-123-1234<br /> +12 123-123-1234<br /> +12 123 123-1234<br /> 555-2368<br /> 555-ABCD |
| `positive integer` | Number is positive and whole. |
| `uuid` | Universally unique identifier. | 


## List of comparison symbols and phrases

{% include list-symbols.md %}

## Go further

* Use validity metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use validity metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
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
