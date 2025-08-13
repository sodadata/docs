---
description: >-
  Use a SodaCL freshness check to infer data freshness according to the age of
  the most recently added row in a table.
---

# Freshness checks

Use a freshness check to determine the relative age of the data in a column in your dataset.

```yaml
checks for dim_product:
  - freshness(start_date) < 3d
```

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✔️    Available as a no-code check

## Define freshness checks

In the context of [SodaCL check types](metrics-and-checks.md#check-types), freshness checks are unique. This check is limited in its syntax variation, with only a few mutable parts to specify column name, threshold, and, optionally, a `NOW` variable.

A freshness check has two or three mutable parts:

|                                                     |
| --------------------------------------------------- |
| a timestamp column name                             |
| a variable to specify the value of “now” (optional) |
| a threshold                                         |



The example below defines a check that measures freshness relative to "now", where "now" is the moment you run the scan that executes the freshness check. This example discovers when the last row was added to the `start_date` timestamp column, then compares that timestamp to "now". If Soda discovers that the last row was added more than three days ago, the check fails.

```yaml
checks for dim_product:
  - freshness(start_date) < 3d
```

| column name | `start_date` |
| ----------- | ------------ |
| threshold   | 3d           |

\


Instead of using the default value for "now" (the time you run the scan that executes the freshness check), you can use a variable to specify the value of "now" at scan time. For example, the following check measures freshness relative to a date that a user specifies at scan time. You cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

```yaml
checks for dim_product:
  - freshness using end_date with NOW < 1d
```

| column name                                       | `end_date` |
| ------------------------------------------------- | ---------- |
| variable to specify the value of “now” (optional) | `NOW`      |
| threshold                                         | 1d         |

At scan time, you use a `-v` option to pass a value for the variable that the check expects for the value of "now". The scan command below passes a variable that the check uses. In your scan command, if you pass a variable with a timestamp, the variable must be in ISO8601 format such as `"2022-02-16 21:00:00"` or `"2022-02-16T21:00:00"`.

```shell
soda scan -d adventureworks -c configuration.yml -v NOW="2022-05-31 21:00:00" checks_test.yml
```

_**Known issue:**_\


When introducing a NOW variable into a freshness check, you must use the deprecated syntax that includes `using`. This syntax yields an error message in the scan output, `Syntax of freshness check has changed and is deprecated. Use freshness(column_name) < 24h30m See docs` but does not prevent Soda from executing the check. Workaround: ignore the deprecated syntax message.

### Details and limitations

* Out-of-the-box, freshness checks _only_ work with columns that contain data types TIMESTAMP or DATE. However, though it does not universally apply to all data sources, you _may_ be able to apply a freshness check to TEXT type data using the following syntax to cast the column:

```yaml
checks for dim_product:
  - freshness(createdat::datetime) < 1d
```

* Note that casting a column in a check does not work with a NOW variable.
* The only comparison symbol you can use with freshness checks is `<` _except_ when you employ and alert configuration. See [Example with alert configuration](freshness.md#example-with-alert-configuration) for details.
* The default value for "now" is the time you run the scan that executes the freshness check.
* If no timezone information is available in either the timestamp of the check (scan time), or in the data in the column, a freshness check uses the UTC timezone. Soda converts both timestamps to UTC to compare values.
* You cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

### Troubleshoot errors with freshness checks

**Problem:** When you run a scan to execute a freshness check, the CLI returns one of the following error message.

```shell
Invalid staleness threshold "when < 3256d"
  +-> line=2,col=5 in checks_test.yml

```

```shell
Invalid check "freshness(start_date) > 1d": no viable alternative at input ' >'
```

**Solution:** The error indicates that you are using an incorrect comparison symbol. Remember that freshness checks can only use `<` in check, unless the freshness check employs an alert configuration, in which case it can only use `>` in the check.

\


**Problem:** When you run a scan to execute a freshness check that uses a NOW variable, the CLI returns an following error message for `Invalid check`.

```shell
Invalid check "freshness(end_date) ${NOW} < 1d": mismatched input '${NOW}' expecting {'between', 'not', '!=', '<>', '<=', '>=', '=', '<', '>'}
```

**Solution:** Until the known issue is resolved, use a deprecated syntax for freshness checks using a NOW variable, and ignore the `deprecated syntax` message in the output. For example, define a check as per the following.

```yaml
checks for dim_product:
  - freshness using end_date with NOW < 1d
```

\


## Freshness check results

When you run a scan that includes a freshness check, the output in the **Soda Library CLI** provides several values for measurements Soda used to calculate freshness. The value for freshness itself is displayed in days, hours, minutes, seconds, and milliseconds; see the example below.

In **Soda Cloud**, the freshness value represents age of the data in the days, hours, minutes, etc. relative to `now_timestamp`. In other words, `(scan time - (max of date_column))`.

```shell
Soda Library 1.0.x
Soda Core 3.0.x
Scan summary:
1/1 checks FAILED: 
      Data is fresh [FAILED]
        max_column_timestamp: 2013-07-01 00:00:00
        max_column_timestamp_utc: 2013-07-01 00:00:00+00:00
        now_variable_name: NOW
        now_timestamp: 2022-09-13T16:40:39.196522+00:00
        now_timestamp_utc: 2022-09-13 16:40:39.196522+00:00
        freshness: 3361 days, 16:40:39.196522
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```

## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th>Configuration</th><th>Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td>Define a name for a freshness check; see <a href="freshness.md#example-with-check-name">example</a>.</td><td><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td>Add an identity to a check.</td><td><a href="optional-config.md#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center">✓</td><td>Define alert configurations to specify warn and fail thresholds; see <a href="freshness.md#example-with-alert-configuration">example</a>.</td><td><a href="optional-config.md#add-alert-configurations">Add alert configurations</a></td></tr><tr><td align="center">✓</td><td>Apply an in-check filter to return results for a specific portion of the data in your dataset; see <a href="freshness.md#example-with-in-check-filter">example</a>.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use quotes when identifying dataset or column names; see <a href="freshness.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center"> </td><td>Use wildcard characters ( % or * ) in values in the check.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use for each to apply freshness checks to multiple datasets in one scan; see <a href="freshness.md#example-with-for-each">example</a>.</td><td><a href="optional-config.md#apply-checks-to-multiple-datasets">Apply checks to multiple datasets</a></td></tr><tr><td align="center">✓</td><td>Apply a dataset filter to partition data during a scan; see <a href="freshness.md#example-with-dataset-filter">example</a>.</td><td><a href="optional-config.md#scan-a-portion-of-your-dataset">Scan a portion of your dataset</a></td></tr></tbody></table>

#### Example with check name

```yaml
checks for dim_product:
  - freshness(start_date) < 27h:
      name: Data is fresh
```

#### Example with alert configuration

The only comparison symbol that you can use with freshness checks that employ an alert configuration is `>`.

```yaml
checks for dim_product:
  - freshness(start_date):
      warn: when > 3256d
      fail: when > 3258d
```

OR

```yaml
checks for dim_product:
  - freshness(start_date):
      warn: 
        when > 3256d
      fail: 
        when > 3258d
```

#### Example with in-check filter

```yaml
checks for dim_product:
  - freshness(start_date) < 27h:
      filter: weight = 10
```

#### Example with quotes

```yaml
checks for dim_product:
  - freshness("end_date") < 3d
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_prod%
  checks:
    - freshness(end_date) < 3d
```

#### Example with dataset filter

```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - freshness(end_date) < 3d
```

\


## List of freshness thresholds

| Threshold | Example | Reads as              |
| --------- | ------- | --------------------- |
| `#d`      | `3d`    | 3 days                |
| `#h`      | `1h`    | 1 hour                |
| `#m`      | `30m`   | 30 minutes            |
| `#d#h`    | `1d6h`  | 1 day and 6 hours     |
| `#h#m`    | `1h30m` | 1 hour and 30 minutes |

## List of comparison symbols and phrases

```yaml
# If using without an alert configuration
<
# If using with an alert configuration
>
```

## Go further

* Use missing metrics in checks with alert configurations to establish [warn and fail zones](optional-config.md#define-zones-using-alert-configurations)
* Use missing metrics in checks to define ranges of acceptable thresholds using [boundary thresholds](metrics-and-checks.md#define-boundaries-with-fixed-thresholds).
* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
