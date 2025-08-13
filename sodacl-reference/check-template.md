---
description: >-
  Use a check template to write one SQL query that you can reuse in multiple
  Soda checks for data quality.
---

# Check template

{% hint style="danger" %}
This feature is not supported in **Soda Core OSS**.\
[Migrate](../quick-start-sip/upgrade.md#migrate-from-soda-core) to **Soda Library** in minutes to start using this feature for free with a 45-day trial.
{% endhint %}

Use a check template to define a reusable, user-defined metric that you can apply to many checks in multiple checks files.

```yaml
templates:
  - name: template_alpha
    description: Reusable SQL for writing checks.
    author: Jean-Claude
    metric: alpha
    query: |
      SELECT count(*) as alpha FROM ${table}
```

```yaml
checks for dim_account:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✖️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check

## Define a check template

_Requires Soda Library_\
&#xNAN;_&#x4E;ot yet supported in Soda Cloud_

A check template involves both a **template YAML** file in which you define resuable user-defined metrics, and at least one **checks YAML** file, in which you use the metric in a check for data quality.

A check template borrows from the [user-defined check](user-defined.md) syntax and has several parameters to define:

|               |
| ------------- |
| a name        |
| a description |
| an author     |
| a metric      |
| a query       |

In the very simple example below, in a file called `template.yml`, the SQL query defines a metric called `alpha`. Together with the other parameters, this user-defined metric forms the template named `template_alpha`. The SQL query uses a variable for the value of `table` so that Soda uses the value for the `table` parameter that you provide when you write the SodaCL check in the `checks.yml` file.

```yaml
templates:
  - name: template_alpha
    description: Reusable SQL for writing checks.
    author: Jean-Paul
    metric: alpha
    query: |
      SELECT count(*) as alpha FROM ${table}
```

| a name        | `template_alpha`                         |
| ------------- | ---------------------------------------- |
| a description | `Reusable SQL for writing checks.`       |
| an author     | `Jean-Paul`                              |
| a metric      | `alpha`                                  |
| a query       | `SELECT count(*) as alpha FROM ${table}` |

Having defined the check template, you can now use it in a check in your `checks.yml` file, as in the following example.

* Because the SQL query in the check template uses a variable for the value of `table`, you must supply the value in the check as a parameter.
* Be sure to add an identifier for the dataset in the first line, even if you supply the name of the dataset in the check using a parameter. To render properly in Soda Cloud, the check must include a dataset identifier.
* The check must include at least one alert configuration to define when the check result ought to fail or warn.

```yaml
checks for dim_account:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```

When you run a scan from the command-line, you must incude a `-T` option to idenfity the file path and file name of the template YAML file in which you defined your reuseable metric(s). In a programmatic scan, add the path to the template file.

Command:

```shell
soda scan -d adventureworks -c configuration.yml checks.yml -T templates.yml
```

Add to programmatic scan:

```python
scan.add_template_files(template_path)
```

Output:

```shell
Soda 1.0.x
Soda Core 3.0.x
Loaded check templates from templates.yml
Processing template $template_alpha
Scan summary:
1/1 checks FAILED: 
    $template_alpha fail when > 0 [FAILED]
      check_value: 99.0
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```

\


In a variation of the example above, you can use a template within a [failed row check](failed-rows-checks.md) so as to collect failed row samples, as in the example below.

```yaml
checks for dim_account:
  - failed rows:
      $template_alpha:
        parameters:
          table: dim_account
```

\


In the following example, the same `template.yml` file contains a second template definition for `beta`. Together with the other parameters, this user-defined metric forms the template named `template_beta` and does not use a variable for the table name.

```yaml
  - name: template_beta
    description: Simplified reusable SQL query.
    author: Jean-Claude
    metric: beta
    query: |
      SELECT count(*) as beta FROM dim_customer
```

You can then use the template in a check in the same, or different, `checks.yml` file. Even though the name of the dataset is included in the SQL query, you need to identify it in the check. The check must include at least one [alert configuration](optional-config.md#add-alert-configurations) to define when the check result ought to fail or warn.

```yaml
checks for dim_customer:
  - $template_beta:
      warn: when between 1000 and 9999
```

When you run a scan from the command-line, you must incude a `-T` option to idenfity the file path and file name of the template YAML file in which you defined your reuseable metric(s). In a programmatic scan, add the path to the template file.

CLI command:

```shell
soda scan -d adventureworks -c configuration.yml checks.yml -T templates.yml
```

Add to programmatic scan:

```python
scan.add_template_files(template_path)
```

Output:

```shell
soda scan -d adventureworks -c configuration.yml checks2.yml -T templates.yml
Soda 1.0.x
Soda Core 3.0.x
Loaded check templates from templates.yml
Processing template $template_beta 
Scan summary:
1/1 check PASSED: 
    $template_beta warn when between 1000 and 9999 [PASSED]
All is good. No failures. No warnings. No errors.
```

\


## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th>Configuration</th><th>Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td>Define a name for a freshness check; see <a href="check-template.md#example-with-check-name">example</a>.</td><td><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td>Add an identity to a check.</td><td><a href="optional-config.md#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center">✓</td><td>Define alert configurations to specify warn and fail thresholds; see <a href="check-template.md#example-with-alert-configuration">example</a>.</td><td><a href="optional-config.md#add-alert-configurations">Add alert configurations</a></td></tr><tr><td align="center"> </td><td>Apply an in-check filter to return results for a specific portion of the data in your dataset.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use quotes when identifying dataset or column names; see <a href="check-template.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center">✓</td><td>Use wildcard characters in the value in the check.</td><td>Use wildcard values as you would with CTE or SQL.</td></tr><tr><td align="center"> </td><td>Use for each to apply checks that use templates to multiple datasets in one scan.</td><td>-</td></tr><tr><td align="center"> </td><td>Apply a dataset filter to partition data during a scan.<br><em>Known issue:</em> Dataset filters are not compatible with user-defined metrics in check templates.</td><td>-</td></tr></tbody></table>

#### Example with check name

```yaml
checks:
  - $template_beta:
      warn: when between 1000 and 9999
      name: Check with beta template
```

#### Example with alert configuration

```yaml
checks:
  - $template_alpha:
      parameters:
        table: dim_account
      fail: when > 0
```

#### Example with quotes

```yaml
checks:
  - $template_alpha:
      parameters:
        table: "dim_account"
      fail: when > 0
```

\


## List of comparison symbols and phrases

```
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

## Go further

* Learn more about [user-defined checks](user-defined.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
