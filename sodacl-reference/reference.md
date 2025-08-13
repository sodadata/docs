---
description: >-
  Use a SodaCL reference check to validate that the values in a column in a
  table are present in a column in a different table.
---

# Reference checks

Use a reference check to validate that column contents match between datasets in the same data source.

See also: [Compare data using SodaCL](../soda-cl-overview/compare.md)

```yaml
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
  - values in (birthdate) must not exist in dim_department_group_prod (birthdate)
```

✖️    Requires Soda Core Scientific (included in a Soda Agent)\
✔️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check

## Define reference checks

In the context of [SodaCL check types](metrics-and-checks.md#check-types), reference checks are unique. This check is limited in its syntax variation, with only a few mutable parts to specify column and dataset names.

The example below checks that the values in the source column, `department_group_name`, in the `dim_department_group` dataset exist somewhere in the destination column, `department_name`, in the `dim_employee` dataset. If the values are absent in the `department_name` column, the check fails.

* Soda CL considers missing values in the source column as invalid.
* Optionally, do not use brackets around column names. The brackets serve as visual aids to improve check readability.

```yaml
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
```

You can also validate that data in one dataset does _not_ exist in another.

```yaml
checks for dim_customer_staging:
  - values in (birthdate) must not exist in dim_customer_prod (birthdate)
```

### Reference checks and dataframes

If you are using reference checks with a Spark or Databricks data source to validate the existence of values in two datasets within the same schema, you must first convert your DataFrames into temp views to add them to the Spark session, as in the following example.

```python
# after adding your Spark session to the scan
df.createOrReplaceTempView("df")
df2.createOrReplaceTempView("df2")
```

### Failed row samples

Reference checks automatically collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100.

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration in a reference check configuration. You can add this configuration to your checks YAML file for Soda Library, or when writing checks as part of an agreement in Soda Cloud. See: [Set a sample limit](../run-a-scan/failed-row-samples.md#set-a-sample-limit).

```yaml
checks for dim_customers:
  - values in (state_code, state_name) must exist in iso_3166-2 (code, subdivision_name):
      samples limit: 20
```

\


For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. See: [Disable failed row samples](../run-a-scan/failed-row-samples.md#disable-failed-row-samples).

Alternatively, you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.

```yaml
checks for dim_customers:
  - values in (state_code, state_name) must exist in iso_3166-2 (code, subdivision_name):
      samples limit: 0
```

\


You can also use a `samples columns` or a `collect failed rows` configuration to a check to specify the columns for which Soda must implicitly collect failed row sample values, as in the following example with the former. Soda only collects this check’s failed row samples for the columns you specify in the list. See: [Customize sampling for checks](../run-a-scan/failed-row-samples.md#customize-sampling-for-checks).

Note that the comma-separated list of samples columns does not support wildcard characters (%).

```yaml
checks for dim_customers:
  - values in (state_code, state_name) must exist in iso_3166-2 (code, subdivision_name):
      samples columns: [state_code]
```

\


To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a reference check. Examine failed rows in the **Failed Rows Analysis** tab; see [Manage failed row samples](../run-a-scan/failed-row-samples.md) for further details.

## Optional check configurations

<table><thead><tr><th width="100" align="center">Supported</th><th>Configuration</th><th>Documentation</th></tr></thead><tbody><tr><td align="center">✓</td><td>Define a name for a reference check; see <a href="reference.md#example-with-check-name">example</a>.</td><td><a href="optional-config.md#customize-check-names">Customize check names</a></td></tr><tr><td align="center">✓</td><td>Add an identity to a check.</td><td><a href="https://docs.soda.io/soda-cl/optional-config.html#add-a-check-identity">Add a check identity</a></td></tr><tr><td align="center"> </td><td>Define alert configurations to specify warn and fail alert conditions.</td><td>-</td></tr><tr><td align="center"> </td><td>Apply an in-check filter to return results for a specific portion of the data in your dataset.</td><td>-</td></tr><tr><td align="center">✓</td><td>Use quotes when identifying dataset or column names; see <a href="reference.md#example-with-quotes">example</a>.<br>Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick (`) as a quotation mark.</td><td><a href="optional-config.md#use-quotes-in-a-check">Use quotes in a check</a></td></tr><tr><td align="center"> </td><td>Use wildcard characters ( % or * ) in values in the check.</td><td>-</td></tr><tr><td align="center"> </td><td>Use for each to apply reference checks to multiple datasets in one scan.</td><td>-</td></tr><tr><td align="center">✓</td><td>Apply a dataset filter to partition data during a scan; see <a href="reference.md#example-with-dataset-filter">example</a>. If you encounter difficulties, see <a href="troubleshoot.md#filter-not-passed-with-reference-check">Filter not passed with reference check</a>.</td><td><a href="optional-config.md#scan-a-portion-of-your-dataset">Scan a portion of your dataset</a></td></tr><tr><td align="center">✓</td><td>Supports <code>samples columns</code> parameter to specify columns from which Soda draws failed row samples.</td><td><a href="../run-a-scan/failed-row-samples.md#customize-sampling-for-checks">Customize sampling for checks</a></td></tr><tr><td align="center">✓</td><td>Supports <code>samples limit</code> parameter to control the volume of failed row samples Soda collects.</td><td><a href="../run-a-scan/failed-row-samples.md#set-a-sample-limit">Set a sample limit</a></td></tr><tr><td align="center">✓</td><td>Supports <code>collect failed rows</code> parameter instruct Soda to collect, or not to collect, failed row samples for a check.</td><td><a href="../run-a-scan/failed-row-samples.md#customize-sampling-for-checks">Customize sampling for checks</a></td></tr></tbody></table>

#### Example with check name

```yaml
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name):
      name: Compare department datasets
```

#### Example with quotes

```yaml
checks for dim_department_group:
  - values in ("department_group_name") must exist in dim_employee ("department_name")
```

#### Example with dataset filter

Refer to [Troubleshoot SodaCL](troubleshoot.md#filter-not-passed-with-reference-check) to address challenges specific to reference checks with dataset filters.

```yaml
filter customers_c8d90f60 [daily]:
  where: ts > TIMESTAMP '${NOW}' - interval '100y'

checks for customers_c8d90f60 [daily]:
  - values in (cat) must exist in customers_europe (cat2)
```

\


## Go further

* Problems with reference checks and dataset filters? Refer to [Troubleshoot SodaCL](troubleshoot.md#filter-not-passed-with-reference-check).
* Learn more about [SodaCL metrics and checks](metrics-and-checks.md) in general.
* Learn more about [comparing data](../soda-cl-overview/compare.md) using SodaCL.
* Use a [schema check](schema.md) to discover missing or forbidden columns in a dataset.
* Reference [tips and best practices for SodaCL](../soda-cl-overview/quick-start-sodacl.md#tips-and-best-practices-for-sodacl).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
