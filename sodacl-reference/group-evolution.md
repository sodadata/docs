---
description: >-
  Use a SodaCL group evolution data quality check to validate changes to the
  categorical groups you defined.
---

# Group evolution checks

{% hint style="info" %}
This feature is not supported in **Soda Core OSS**.\
[Migrate](../quick-start-sip/upgrade.md#migrate-from-soda-core) to **Soda Library** in minutes to start using this feature for free with a 45-day trial.
{% endhint %}

Use a group evolution check to validate the presence or absence of a group in a dataset, or to check for changes to groups in a dataset relative to their previous state.

```yaml
checks for dim_customer:
  - group evolution:
      name: Marital status
      query: |
        SELECT marital_status FROM dim_employee GROUP BY marital_status
      warn:
        when required group missing: [M]
        when forbidden group present: [T]
      fail:
        when groups change: any
```

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✖️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check

## Define group evolution checks

In the context of [SodaCL check types](metrics-and-checks.md#check-types), group by checks are unique. Evolution checks always employ a custom SQL query and an alert configuration – specifying warn and/or fail alert conditions – with **validation keys**. Refer to [Add alert configurations](optional-config.md#add-alert-configurations) for exhaustive alert configuration details.

The validation key:value pairs in group evolution checks set the conditions for a warn or a fail check result. See a [List of validation keys](group-evolution.md#list-of-validation-keys) below.

For example, the following check uses a `group by` configuration to execute a check on a dataset and return check results in groups. In a `group evolution` check, the `when required group missing` validation key confirms that specific groups are present in a dataset; if any of groups in the list are absent, the check result is warn.

```yaml
checks for dim_product:
  - group by:
      query: |
        SELECT style, AVG(days_to_manufacture) as rare
        FROM dim_product 
        GROUP BY style
      fields:
        - style
      checks:
        - rare > 3:
            name: Rare

  - group evolution:
      query: | 
        SELECT style FROM dim_product GROUP BY style
      warn:
        when required group missing:
          - U
          - W
```

In the example above, the values for the validation key are in a nested list format, but you can use an inline list of comma-separated values inside square brackets instead. The following example yields identical checks results to the example above.

```yaml
checks for dim_product:
  - group evolution:
      query: | 
        SELECT style FROM dim_product GROUP BY style
      warn:
        when required group missing: [U, W]
```

You can define a group evolution check with both warn and fail alert conditions, each with multiple validation keys. Refer to [Configure multiple alerts](optional-config.md#configure-multiple-alerts) for details. Be aware, however, that a single group evolution check only ever produces a _single check result_. See [Expect one check result](group-evolution.md#expect-one-check-result) below for details.

The following example is a single check; Soda executes each of its validations during a scan and returns a single result for the check: pass, warn, or fail.

```yaml
checks for dim_employee:
  - group evolution:
      name: Marital status
      query: |
        SELECT marital_status FROM dim_employee GROUP BY marital_status
      warn:
        when required group missing: [M]
        when forbidden group present: [S]
      fail:
        when required group missing: [T]
```

\


### Define group changes

Rather than specifying exact parameters for group changes, you can use the `when groups change` validation key to warn or fail when indistinct changes occur in a dataset.

Soda Cloud must have at least two measurements to yield a check result for group changes. In other words, the first time you run a scan to execute a group evolution check, Soda does not evaluate the check because it has nothing against which to compare; the second scan that executes the check yields a check result.

```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when groups change: any
    fail:
      when groups change: 
        - group delete
        - group add
```

## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th>Configuration</th><th>Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td>Define a name for a group evolution check; see <a href="group-evolution.md#example-with-check-name">example</a>.</td><td><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td>Add an identity to a check.</td><td><a href="optional-config.md#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center">✓</td><td>Define alert configurations to specify warn and fail alert conditions; see <a href="group-evolution.md#example-with-alert-configuration">example</a>.</td><td><a href="optional-config.md#add-alert-configurations">Add alert configurations</a></td></tr><tr><td align="center"> </td><td>Apply an in-check filter to return results for a specific portion of the data in your dataset.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use quotes when identifying dataset or group names; see <a href="group-evolution.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center">✓</td><td>Use wildcard characters ( % or * ) in values in the check; see <a href="group-evolution.md#example-with-wildcards">example</a>.</td><td>See note in <a href="group-evolution.md#example-with-wildcards">example</a> below.</td></tr><tr><td align="center"> </td><td>Use for each to apply group evolution checks to multiple datasets in one scan.</td><td>-</td></tr><tr><td align="center"> </td><td>Apply a dataset filter to partition data during a scan.</td><td>-</td></tr></tbody></table>

#### Example with check name

```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when groups change: any
```

#### Example with alert configuration

Be aware that Soda only ever returns a single check result per check. See [Expect one check result](group-evolution.md#expect-one-check-result) for details.

```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when forbidden column present: [T]
    fail:
      when groups change: 
        - group delete
        - group add
```

#### Example with quotes

```yaml
- group evolution:
    name: Marital status
    query: |
      SELECT marital_status FROM "dim_employee" GROUP BY marital_status
    warn:
      when required group missing: ["M"]
      when forbidden group present: ["T"]
```

#### Example with wildcards

You can use `*` or `%` as wildcard characters in a list of column names. If the column name begins with a wildcard character, add single quotes as per the example below.

```yaml
- group evolution:
    name: Rare product
    query: | 
      SELECT style FROM dim_product GROUP BY style
    warn:
      when forbidden group present: [T%]
```

\


## List of validation keys

| Validation key                 | Values                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when required group missing`  | <p>one or more group names in an inline<br>list of comma-separated values, or a nested list</p>                                                   |
| `when forbidden group present` | <p>one or more group names in an inline<br>list of comma-separated values, or a nested list</p>                                                   |
| `when groups change`           | <p><code>any</code> as an inline value<br><code>group add</code> as a nested list item<br><code>group delete</code> as a nested list item<br></p> |

## Expect one check result

Be aware that a check that contains one or more alert configurations only ever yields a _single_ check result; one check yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more severe, failed check result. (Schema checks behave slightly differently; see [Schema checks](schema.md#expect-one-check-result).)

Using the following example, Soda Library, during a scan, discovers that the data in the dataset triggers both alerts, but the check result is still `Only 1 warning`. Nonetheless, the results in the CLI still display both alerts as having both triggered a `[WARNED]` state.

```yaml
checks for dim_customer:
  - row_count:
      warn:
        when > 2
        when < 0
```

```sh
Soda Library 1.0.x
Soda Core 3.0.x
Scan summary:
1/1 check WARNED: 
    dim_customer in adventureworks
      row_count warn when > 2 when > 3 [WARNED]
        check_value: 18484
Only 1 warning. 0 failure. 0 errors. 0 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 42812***
```

The check in the example below data triggers both `warn` alerts and the `fail` alert, but only returns a single check result, the more severe `Oops! 1 failures.`

```yaml
checks for dim_product:
  - sum(safety_stock_level):
      name: Stock levels are safe
      warn:
        when > 0
      fail:
        when > 0
```

```sh
Soda Library 1.0.x
Soda Core 3.0.x
Scan summary:
1/1 check FAILED: 
    dim_product in adventureworks
      Stock levels are safe [FAILED]
        check_value: 275936
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 6016***
```

## Go further

* Use a [group by](group-by.md) configuration to categorize your check results into groups.
* Learn more about [alert configurations](optional-config.md#add-alert-configurations).
* Learn more about [SodaCL metrics and checks](metrics-and-checks.md) in general.
* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
