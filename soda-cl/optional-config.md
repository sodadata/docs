---
layout: default
title: SodaCL optional check configurations
description: Add optional configurations to your SodaCL checks to optimize and clarify.
parent: SodaCL
redirect_from:
- /soda-cl/quotes.html
---

# Optional check configurations 
*Last modified on {% last_modified_at %}*

When you define SodaCL checks for data quality in your checks YAML file, you have the option of adding one or more extra configurations or syntax variations. Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.

The following optional configurations are available to use with most, though not all, [check types]({% link soda-cl/metrics-and-checks.md %}#check-types). The detailed documentation for metrics and individual check types indicate specifically which optional configurations are compatible.

[Customize check names](#customize-check-names)<br />
[Add a check identity](#add-a-check-identity)<br />
[Add alert configurations](#add-alert-configurations)<br />
[Add a filter to a check](#add-a-filter-to-a-check)<br />
[Use quotes in a check](#use-quotes-in-a-check)<br />
[Apply checks to multiple datasets](#apply-checks-to-multiple-datasets)<br />
[Scan a portion of your dataset](#scan-a-portion-of-your-dataset)<br />
[Collect failed rows samples](#collect-failed-rows-samples)<br />
[Disable failed rows samples for specific columns](#disable-failed-row-samples-for-specific-columns)<br />
<br />
<br />


## Customize check names

Add a customized, plain-language name to your check so that anyone reviewing the check results can easily grasp the intent of the check. 

Add the name to the check as a nested key:value pair, as per the example below.

```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours
```

* Be sure to add the `:` to the end of your check, before the nested content.
* If `name` is configured, Soda Core sends the value of `name` to Soda Cloud as the check identifier.

<br />

If you wish, you can use a variable to customize a dynamic check name. Read more about [Filters and variables]({% link soda-cl/filters.md %}).
```yaml
variables:
  name: Customers UK
checks for dim_customer:
  - row_count > 1:
     name: Row count in ${name}
```

When you run a scan, Soda Core uses the value you specified for your variable in the scan results, as in the example below.
```shell
Soda Core 3.0.4
Scan summary:
1/1 check PASSED: 
    dim_customer in adventureworks
      Row count in Customers UK [PASSED]
All is good. No failures. No warnings. No errors.
```

## Add a check identity

Soda Cloud identifies a check using details such as the check name, the check YAML file name, the file's location. When you modify an individual check, the check identity changes which results in a new check result in Soda cloud.  For example, the following check sends one check result to Soda Cloud after a scan. 
```yaml
checks for dim_customer:
  - missing_count(last_name) > 0
```
If you changed the threshold from `0` to `99`, then after the next scan, Soda Cloud considers this as a new check and discards the previous check result's history; it would appear as though the original check and its results had disappeared. 

If you anticipate modifying a check, particularly if you include a variable in your check, you can explicitly specify a check identity and [scan definition name]({% link soda/glossary.md %}#scan-definition-name) so that Soda Cloud can correctly accumulate the results of a single check and retain its history even if the check has been modified. 

1. First, navigate to an existing check in your Soda Cloud account, then copy the UUID of the check from the URL; see the example below.
![check-identity](/assets/images/check-identity.png){:height="700px" width="700px"}
2. Add an identity property to your check using the UUID you copied as the identity's value.
```yaml
checks for dim_customer:
  - missing_count(last_name) > 99:
      identity: aa457447-60f6-4b09-4h8t-02fbb78f9587
```
3. If you use Soda Core to manually or programmatically run a scan, add a scan definition name to the [programmatic scan]({% link soda-core/programmatic.md %}#basic-programmatic-scan) or to the scan command itself using the `-s` option, as in the following example.
```shell
# for first scan
soda scan -d nyc_prod -c configuration.yml -s nyc_a checks.yml
# for second scan
soda scan -d nyc_prod -c configuration.yml -s nyc_b checks.yml
```

You can also use a variable to pass the value of a check identity at scan time, as in the example below. Read more about using [in-check variables]({% link soda-cl/filters.md %}#configure-variables-in-sodacl).

```yaml
checks for dim_product:
  - row_count > 0:
      identity: ${IDENTITY}
```

See also: [Configure a single scan to run in multiple environments]({% link soda-core/configuration.md %}##configure-the-same-scan-to-run-in-multiple-environments).<br />
See also: [Missing check results in Soda Cloud]({% link soda-cl/troubleshoot.md %}#missing-check-results-in-soda-cloud)

## Add alert configurations

When Soda Core runs a scan of your data, it returns a check result for each check. Each check results in one of three default states:
* **pass**: the values in the dataset match or fall within the thresholds you specified
* **fail**: the values in the dataset _do not_ match or fall within the thresholds you specified
* **error**: the syntax of the check is invalid

However, you can add alert configurations to a check to explicitly specify the conditions that warrant a **warn** result. Setting more granular conditions for a warn, or fail, state of a check result gives you more insight into the severity of a data quality issue. 

For example, perhaps 50 missing values in a column is acceptable, but more than 50 is cause for concern; you can use alert configurations to warn you when there are 0 - 50 missing values, but fail when there are 51 or more missing values.

### Configure a single alert 

Add alert configurations as nested key:value pairs, as in the following example which adds a single alert configuration. It produces a `warn` check result when the volume of duplicate phone numbers in the dataset exceeds five. Refer to the CLI output below.

```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: when > 5
```

```shell
Soda Core 3.0.xxx
Scan summary:
1/1 check WARNED: 
    dim_reseller in adventureworks
      duplicate_count(phone) [WARNED]
        check_value: 48
Only 1 warning. 0 failure. 0 errors. 0 pass.
Sending results to Soda Cloud
```


### Configure multiple alerts

Add multiple nested key:value pairs to define both `warn` alert conditions and `fail` alert conditions.

The following example defines the conditions for both a `warn` and a `fail` state. After a scan, the check result is `warn` when there are between one and ten duplicate phone numbers in the dataset, but if Soda Core discovers more than ten duplicates, as it does in the example, the check fails. If there are no duplicate phone numbers, the check passes.

```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: when between 1 and 10
      fail: when > 10
```
```shell
Soda Core 3.0.xxx
Scan summary:
1/1 check FAILED: 
    dim_reseller in adventureworks
      duplicate_count(phone) [FAILED]
        check_value: 48
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
```

You can add multiple conditions to each type of alert, as with the following example, but be aware that a check that contains one or more alert configurations only ever yields a [single check result](#expect-one-check-result).
```yaml
checks for dim_reseller:
  - duplicate_count(phone):
      warn: 
        when between 1 and 2
        when between 8 and 10
      fail: when > 10
```


* Be sure to add the `:` to the end of your check, before the nested content.
* Be aware that a check that contains one or more alert configurations only ever yields a [single check result](#expect-one-check-result).
* If it is configured, Soda Core sends `warn` results to Soda Cloud where they appear as **Warning**; for `fail`, the result appears as **Critical**.

### Expect one check result

{% include expect-one-result.md %}

### Define zones using alert configurations

Use alert configurations to write checks that define fail or warn zones. By establishing these zones, the check results register as more severe the further a measured value falls outside the threshold parameters you specify as acceptable for your data quality. 

The example that follows defines split warning and failure zones in which inner is good, and outer is bad. The chart below illustrates the pass (white), warn (yellow), and fail (red) zones. Note that an individual check only ever yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more serious, failed check result. See [Expect one check result](#expect-one-check-result) for details.

```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when not between -10 and 10
      fail: when not between -20 and 20
```

![historic-chart](/assets/images/historic-chart.png){:height="300px" width="300px"}

<br />

The next example defines a different kind of zone in which inner is bad, and outer is good. The chart below illustrates the fail (red), warn (yellow), and pass (white) zones.
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when between -20 and 20
      fail: when between -10 and 10
```

![historic-chart2](/assets/images/historic-chart2.png){:height="350px" width="350px"}


## Add a filter to a check

{% include in-check-filters.md %}

See [Filters and variables]({% link soda-cl/filters.md %}) for further details.

## Use quotes in a check

In the checks you write with SodaCL, you can apply the quoting style that your data source uses for dataset or column names. Soda Core uses the quoting style you specify in the aggregated SQL queries it prepares, then executes during a scan. 

Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark.

Write a check referencing a dataset name with quotes to produce a SQL query that references the dataset name with quotes.

Check:
```yaml
checks for "CUSTOMERS":
  - row_count > 0
```

Resulting SQL query:
```sql
SELECT
  COUNT(*)
FROM "CUSTOMERS"
```
<br />

Write a check referencing a column name with quotes to produce a SQL query that references the column name with quotes.

Check:
```yaml
checks for CUSTOMERS:
  - missing("id") = 0
```

Resulting SQL query:
```sql
SELECT
  COUNT(CASE WHEN "id" IS NULL THEN 1 END)
FROM CUSTOMERS
```


## Apply checks to multiple datasets

{% include foreach-config.md %}

See [For each]({% link soda-cl/for-each.md %}) for further details.

## Scan a portion of your dataset

{% include dataset-filters.md %}

See [Filters and variables]({% link soda-cl/filters.md %}) for further details.

## Collect failed rows samples

Soda collects failed rows samples explicitly and implicitly. 

To explicitly collect failed row samples, you can add a [failed row check]({% link soda-cl/failed-rows-checks.md %}) your checks YAML file for Soda Core, or when writing checks as part of an [agreement]({% link soda-cloud/agreements.md %}) in Soda Cloud. 

Implicitly, Soda automatically collects 100 failed row samples for the following checks:
* [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
* checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
* checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
* checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration with any of the above-listed checks, including failed row checks.

```yaml
checks for dim_customer:
  - duplicate_count(email_address) < 50:
      samples limit: 2
```

<br />

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a check that collects failed row samples and has failed. Examine failed rows in the **Failed rows** tab; see [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for further details.

### Disable failed row samples for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).


## Go further

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