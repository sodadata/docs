---
layout: default
title: Missing and validity checks
description:
sidebar: cl 
parent: SodaCL
---

# Missing and validity checks

A check for missing, valid, or invalid values surfaces unexpected or missing data.

[Anatomy of a missing or validity check](#anatomy-of-a-missing-or-validity-check)<br />
[Missing and validity metrics](#missing-and-validity-metrics)<br />
[Column configuration keys](#column-configuration-keys)<br />
[Valid format values](#valid-format-values)<br />
[Configure global missing or valid values](#configure-global-missing-or-valid-values)<br />
[Checks with relative thresholds](#checks-with-relative-thresholds)<br />
<br />


## Anatomy of a missing or validity check

Checks that you write with SodaCL generally have two or three parts: 
* the metric  
* (optional) the column identifier
* the threshold 

Missing and validity checks, however, require more parts which serve to identify the column against which to execute the check, and to identify what SodaCL must consider as missing or valid values.
* the metric  
* the column identifier
* the threshold 
* the column configuration key
* (optional) the valid value format

For example, the following missing check validates that the column `name` contains no more than 99 missing values. 

```yaml
checks for CUSTOMERS:
  - missing count(name) < 100 :
      missing values: [N/A, None, No value]
```
* `missing_count` is the metric.
* `(name)` is the column identifier.
* `< 100` is the threshold.
* `missing values` is the [column configuration key](#column-configuration-keys); its values define what qualifies as "missing". Note that by default, SodaCL always considers a `NULL` value as missing, so you do not need to explicitly define `NULL` as a missing value.

<br />

The following example is similar to the one above, but this check uses a `valid_count` metric with a `valid format` configuration key which, in turn, uses a valid format value. This check fails if the value in a row in the `email` column is *not* formatted as an email address.

```yaml
checks for CUSTOMERS:
  - valid_count(email) < 1 :
      valid format: email
```
* `valid_count` is the metric.
* `(email)` is the column identifier.
* `< 1` is the threshold.
* `valid format` is the [column configuration key](#column-configuration-keys); its values define what qualifies as "valid". 
* `email` is the valid format value; see a complete list of [valid formats](#valid-format-values) below.

## Missing and validity metrics

| Metric | Description |  Applies to data type | Column config key(s) | 
| ----- | ----------- | --------------------- | -------------------- |
| `invalid_count` |  The number of rows that contain invalid values. | text, number, time  | `valid_format` <br /> `valid_regex` <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length`|
| `invalid_percentage` | The percentage of rows that contain invalid values.  | text, number, time  |  `valid_format` <br /> `valid_regex` <br />`valid_values`<br /> `valid_min_length` <br /> `valid_max_length` |
| `missing_count` |  The number of rows in a column that do not contain specific content. | text, number, time  | `missing_format` <br /> `missing_regex`  <br /> `missing_values`  |
| `missing_percentage` |  The percentage of rows in a column that do not contain specific content. | text, number, time  | `missing_format` <br /> `missing_regex`  <br /> `missing_values`|
| `valid_count` |   The number of rows that contain valid content.  | text, number, time  | `valid_format` <br /> `valid_regex`  <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `valid_percentage` |  The percentage of rows that contain valid content.  |  text, number, time |  `valid_format` <br /> `valid_regex`  <br /> `valid_values` <br /> `valid_min_length` <br /> `valid_max_length` |
| `values_count` |  The number of rows that contain content included in a list of valid values. |  text, number, time | `valid_values` <br /> `valid_regex`  |
| `values_percentage` |  The percentage of rows that contain content identified by valid values. | text, number, time | `valid_values` <br /> `valid_regex`  |

### Column configuration keys

The column configuration key:value pair defines what SodaCL ought to consider as “valid” or “missing” values. You can speficy column configurations at both the check level and the global level. 

| Column config key  | Description  | Values | 
| ------------------ | ------------ | ------ |
| `missing format` | Defines what qualifies as a value that ought to register as missing, such as whitespace or empty strings. For example, three spaces in row is recognizable as an entry, but from a business perspective, it ought to be recognized as empty. |  See [Valid format values](#valid-format-values) table. |
| `missing regex` | Use regex expressions to specify your own custom missing values.| regex, no forward slash delimiters, string only |
| `missing values` | Specifies the values that Soda is to consider missing in list format.| values in a list |
| `valid format` | Specifies a named valid text format. Can apply only to columns using data type TEXT.  | See [Valid format values](#valid-format-values) table.  |
| `valid length` | Specifies a value for the string length for valid values. | string |
| `valid max` | Specifies a maximum value for valid values. | integer or float|
| `valid max_length` | Specifies a maximum string length for valid values. | string |
| `valid min` | Specifies a minimum value for valid values. | integer or float |
| `valid min_length` | Specifies a minimum string length for valid values. | string |
| `valid regex` | Use regex expressions to specify your own custom valid values. | regex, no forward slash delimiters, string only |
| `valid values` | Specifies several valid values in list format. | values in a list |

			
### Valid format values

**Valid formats apply *only* to columns using data type TEXT.** 

| Valid format value  | Format |
| ------------------- | ------ |
| `credit card number` | Four four-digit numbers separated by spaces.<br /> Four four-digit numbers separated by dashes.<br /> Sixteen-digit number.<br /> Four five-digit numbers separated by spaces.<br />|
| `date eu` | Validates date only, not time. <br />mm/dd/yyyy |
| `date inverse` | Validates date only, not time. <br />yyyy/mm/dd |
| `date iso 8601` | Validates date and/or time according to <a href="https://www.w3.org/TR/NOTE-datetime" target="_blank">ISO 8601 format </a>. <br /> 2021-04-28T09:00:00+02:00 |
| `date us` | Validates date only, not time. <br />dd/mm/yyyy |
| `decimal` | Number uses a `,` or `.` as a decimal indicator. |
| `decimal comma` | Number uses `,` as decimal indicator. |
| `decimal point` | Number uses `.` as decimal indicator. |
| `email` | name@domain.extension |
| `ip_address` | Four whole numbers separated by `.` |
| `ipv4_address` | Four whole numbers separated by `.` |
| `ipv6_address` | Eight values separated by `:` |
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


## Configure global missing or valid values 

Important! Configuring missing or valid values globally for a dataset will affect all checks. This means that if value `0` is configured as a missing value on column `value`, it will also be ignored in all checks, i.e. it will be ignored in aggregation check like `avg(value) between 30 and 70`

A `NULL` value is always considered a missing value. But the set of values that is considered missing can be customized locally on the check. Local configurations will only apply to the check.

The configuration of missing values can also be centralized so that it applies to all checks.
```yaml
checks for CUSTOMERS:
  - missing_percent(growth_pct) < 1
  - avg(growth_pct) between 30 and 70
  - min(growth_pct) >= 0
  - max(growth_pct) <= 100

configurations for CUSTOMERS:
  # Value -1 will be excluded from all the aggregation checks above
  - missing values for growth_pct: [-1]
```

Similarly, valid values can be defined (and only applied) locally inside a check:




```yaml
checks for CUSTOMERS:
  - invalid_percent(category) < 1%:
      valid values:
        - HIGH
        - MEDIUM
        - LOW
  - invalid_count(id) = 0:
      valid format: uuid
  - invalid_count(email_masked) = 0:
      valid regex: ^[a-z]+\*\*\*[a-z]+$
  - invalid_count(usage_pct) = 0:
      valid min: 0
      valid max: 100
  - invalid_count(name) = 0:
      valid min length: 3
      valid max length: 60
  - invalid_count(product_code) = 0:
      valid length: 7
```

or the above valid configurations can also be defined centrally so all checks on that column will leverage them.

```yaml
configurations for CUSTOMERS:
  valid values for id: [HIGH, MEDIUM, LOW]
  valid format for id: uuid
  valid regex for email_masked: ^[a-z]+\*\*\*[a-z]+$
  valid min for "usage_PCT": 0
  valid max for "usage_PCT": 100
  valid min length for name: 3
  valid max length for name: 60
  valid length for product_code: 7
```

Advanced: When both global column configurations as well as check-local configurations are specified, they combined in case of different properties. If the same property is specified both locally and globally, local wins.

```yaml
checks for CUSTOMERS:
 - invalid_percent(category) < 1%:
     missing values: [N/A, No value, null]
     valid values: [HIGH, MEDIUM, LOW]
configurations for CUSTOMERS:
  missing values for category: [N/A, No value]
  valid min length for category: 3
  valid max length for category: 6
```


## Checks with relative thresholds

SodaCL separates all values in a column into one of three categories:
* missing
* invalid
* valid

The sum of the count for all categories in a column is always equal to the total row count for the table. 

`missing_count(name)` + `invalid_count(name)` + `valid_count(name)` = `row_count`
 
Similarly, a calculation that uses percentage always adds up to a total of 100. 

`missing_percent(name)` + `invalid_percent(name)` + `valid_percent(name)` = 100. 

This categorization enables you to write checks that use a **relative threshold**. 

In the following example, the missing values of column `name` must be less than one percent of the total row count, or the check fails.

```yaml
checks for CUSTOMERS:
  - missing_percent(name) < 1
```

* Percentage metrics are between 0 and 100, not between 0 and 1.
* If you wish, you can add a `%` to the threshold value for improved readability. `missing_percent(name) < 1%` is equivalent to `- missing_percent(name) < 1`.




TODO: When explaining valid values list, also point to reference check which covers a different variant of validity.


[Warning] Column names can be specified with or without quotes, *but* quoting and case must match where they are used. So if you refer to column `"size"` in the column configurations section, the configurations will not be applied to checks referring to column `size` and `"Size"`

[Note] Missing and invalidity checks can also be combined with [table filters]({% link soda-cl/table-filters.md %})



Configurations used in check `invalid_percent(category) < 1%`:

| Configuration property | value |
| ---------------------- | ----- |
| missing values | [`'N/A'`, `'No value'`, `'null'`] |
| valid min length | 3 |
| valid max length | 6 |





## Failed rows

If you have connected Soda Core to a Soda Cloud Enterprise account, Soda Core pushes samples of failed rows to your cloud account.

Metrics `missing`, `missing_percent`, `invalid`, `invalid_percent` will store failed rows when connected to Soda Cloud enterprise account for diagnostic purposes.

`duplicates` will store a table of value / frequency for all value combinations with frequency greater than 1 for diagnostic purposes.

Using the open source Soda Core only, it is still possible to log the failed rows on the console.

---
{% include docs-footer.md %}
