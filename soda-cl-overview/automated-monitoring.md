---
description: >-
  Use a SodaCL automated monitoring check to automatically check for row count
  anomalies and schema changes.
---

# Add automated monitoring checks

{% hint style="warning" %}
This feature is not supported in **Soda Core OSS**.

[Migrate](https://docs.soda.io/soda/upgrade.html#migrate-from-soda-core) to **Soda Library** in minutes to start using this feature for free with a 45-day trial.
{% endhint %}

Use automated monitoring checks to instruct Soda to automatically check for row count anomalies and schema changes in a dataset.

```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test%
```

✔️    Requires Soda Core Scientific (included in a Soda Agent)\
✖️    Supported in Soda Core\
✔️    Supported in Soda Library + Soda Cloud\
✔️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as no-code checks

***

## About automated monitoring checks

When you add automated monitoring checks to a data source connected to your Soda Cloud account via a self-hosted agent, Soda prepares and executes two checks on all the datasets you indicated as `included` in the configuration.

**Anomaly score check on row count**: This check counts the number of rows in a dataset during scan and registers anomalous counts relative to previous measurements for the row count metric. Refer to [Anomaly score checks](../sodacl-reference/anomaly-score.md) for details.\
Anomaly score checks require a minimum of four data points (four scans at stable intervals) to establish a baseline against which to gauge anomalies. If you do not see check results immediately, allow Soda Library to accumulate the necessary data points for relative comparison.

**Schema evolution check**: This check monitors schema changes in datasets, including column addition, deletion, data type changes, and index changes. By default, this automated check results in a failure if a column is deleted, its type changes, or its index changes; it results in a warning if a column is added. Refer to [Schema checks](../sodacl-reference/schema.md) for details.\
Schema checks require a minimum of one data point to use as a baseline against which to gauge schema changes. If you do not see check results immediately, wait until after you have scanned the dataset twice.

## Add automated monitoring checks

Add automated monitoring checks as part of the guided workflow to create a new data source only in deployment models that use a self-hosted Soda agent, not a Soda-hosted Soda agent. For a Soda-hosted agent, consider using the automated [anomaly dashboard](../collaborate/anomaly-dashboard.md) for observability into basic data quality in your datasets.

If you are using a self-operated deployment model that leverages Soda Library, add the column profiling configuration outlined below to your checks YAML file.

In Soda Cloud, navigate to **your avatar** > **Data Sources** > **New Data Source** to begin.

In step **5. Check** of the guided workflow, you have the option of listing the datasets to which you wish to automatically add anomaly score and schema evolution checks. (Note that if you have signed up for early access to [anomaly dashboards](../collaborate/anomaly-dashboard.md) for datasets, this **Check** tab is unavailable as Soda performs all automated monitoring automatically in the dashboards.)

The example check below uses a wildcard character (`%`) to specify that Soda Library executes automated monitoring checks against all datasets with names that begin with `prod`, and _not_ to execute the checks against any dataset with a name that begins with `test`.

```yaml
automated monitoring:
  datasets:
    - include prod%
    - exclude test%
```



You can also specify individual datasets to include or exclude, as in the following example.

```yaml
automated monitoring:
  datasets:
    - include orders
```

### Scan results in Soda Cloud

To review the check results for automated monitoring checks in Soda Cloud, you can:

* navigate to the **Checks** dashboard to see the check results
* navigate to the **Datasets** dashboard to see the check results for an individual dataset



## Add quotes to all datasets

```yaml
data_source soda_demo:
  type: sqlserver
  host: localhost
  username: ${SQL_USERNAME}
  password: ${SQL_PASSWORD}
  quote_tables: true
```

To add those necessary quotes to dataset names that Soda acts upon automatically – discovering, profiling, or sampling datasets, or creating automated monitoring checks – you can add a `quote_tables` configuration to your data source, as in the following example.

If your dataset names include white spaces or use special characters, you must wrap those dataset names in quotes whenever you identify them to Soda, such as in a checks YAML file.



## Go further

* Learn more about the [anomaly dashboard](../collaborate/anomaly-dashboard.md) for datasets.
* Reference [tips and best practices for SodaCL](quick-start-sodacl.md#tips-and-best-practices-for-sodacl).
* Use a [freshness check](../sodacl-reference/freshness.md) to gauge how recently your data was captured.
* Use [reference checks](../sodacl-reference/reference.md) to compare the values of one column to another.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
