---
layout: default
title: Filters and variables
description: Instead of checking whole sets of data, use filters to specify a portion of data against which to execute a check. Use variables to specify values at scan time.
parent: SodaCL reference
redirect_from:
- soda-cl/table-filters.html
- soda-cl/dataset-filters.html
- /soda-core/variables.html
---

# Filters and variables
*Last modified on {% last_modified_at %}*

Use filters or variables to specify portions of data in your dataset against which Soda executes checks during a scan.
{% include code-header.html %}
```yaml
# In-check filter
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11
```
{% include code-header.html %}
```yaml
# Dataset filter with variables
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```
{% include code-header.html %}
```yaml
# In-check variable 
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

[In-check vs. dataset filters](#in-check-vs-dataset-filters)<br />
[Configure in-check filters](#configure-in-check-filters)<br />
[Configure dataset filters](#configure-dataset-filters)<br />
[Configure a time partition using the NOW variable](#configure-a-time-partition-using-the-now-variable)<br />
[Configure variables in SodaCL](#configure-variables-in-sodacl)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configure variables for connection configuration](#configure-variables-for-connection-configuration)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configuration details and limitations](#configuration-details-and-limitations)<br />
[Go further](#go-further)<br />
<br />

## In-check vs. dataset filters

The following expanation aims to help you decide when to use an in-check filter, and when to use a dataset filter.

Use **dataset filters** to create one or more partitions of data, commonly time partitions, upon which you want to execute large volumes of checks. 

Instead of executing a great many checks on *all* the data in a dataset, you can specify a smaller portion of data against which to execute all the checks. Doing so helps avoid having to repeatedly apply the same filter to many checks, and it produces a `WHERE` clause in the SQL query that Soda prepares and executes against your data. 

* Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.
* *Known issue:* Dataset filters are not compatible with [failed rows checks which use a SQL query]({% link soda-cl/failed-rows-checks.md %}#define-failed-rows-checks). With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260-->

Use **in-check filters** to exclude rows from an individual check evaluation. 

In-check filters provide the ability to create conditions, or business rules, that data in a column must meet before Soda includes a row in a check evaluation. In other words, Soda first finds rows that match the filter, *then* executes the check on those rows. As an example, you may wish to use an in-check filter to support a use case in which "Column X must be filled in for all rows that have value Y in column Z". 

When you find yourself adding the same in-check filters to multiple checks, you may wish to promote an in-check filter to a dataset filter. 

<details>
  <summary style="color:#00BC7E">How Soda applies filters</summary>
<br />
Soda uses the checks you define to prepare SQL queries that it executes against the datasets in your data source. It puts as many checks under the same <code>checks for</code> header into a single query as it can. An in-check filter translates to a <a href="https://www.w3schools.com/sql/sql_case.asp" target="_blank">CASE syntax</a> which Soda puts into that same query with other unfiltered checks.
<br /><br />
For a dataset filter, Soda generates a separate query and, again, attempts to put all checks under a <code>checks for</code> header into one query including any checks that also have a in-check filter. If your checks YAML has defined some unfiltered checks for a dataset, and applied a dataset filter to other checks on a particular partition of that data, Soda prepares two queries, each of which has several calculated metrics in the <code>SELECT</code> statement and which then flow back to their respective checks to evaluate whether they pass, warn, or fail.
</details>

## Configure in-check filters
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />
<br />

{% include in-check-filters.md %}

See also: [Troubleshoot SodaCL]({% link soda-cl/troubleshoot.md %}#errors-when-using-in-check-filters).

### List of compatible metrics and checks

* all numeric metrics, *except* `duplicate_count` and `duplicate_percent`
* both missing metrics
* both validity metrics

## Configure dataset filters
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>
<br />
<br />

{% include dataset-filters.md %}

## Configure a time partition using the NOW variable

If your data source is partitioned, or if you wish to apply checks in your agreement to a specific interval of time, you can do so using a dataset filter. 

Use the built-in `NOW` variable to specify a relative time partition. Reference the following example to add a dataset filter to either your checks YAML file, or to the **Write Checks** step in the agreement workflow in Soda Cloud. The `where` clause in the example defines the time partition to mean "now, less one day". 
{% include code-header.html %}
```yaml
filter sodatest_dataset [daily]:
  where: ts > TIMESTAMP '${NOW}' - interval '1d'

checks for sodatest_dataset [daily]:
  - duplicate_count(email_address) < 5
```

## Configure variables in SodaCL
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>
<br />
<br />

You can use variables in SodaCL to:
* define dynamic [dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters)
* customize dynamic [check names](#example-customize-a-check-name)
* define dynamic in-check values; see examples below
* define dynamic in-check filters; see [example below](#example-use-a-variable-in-an-in-check-filter)

Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

To provide a variable at scan time, as with dynamic dataset filters or with in-check values, add a `-v` option to the scan command and specify the key:value pair for the variable, as in the following example.
```shell
soda scan -d aws_postgres_retail -c configuration.yml -v TODAY=2022-03-31 checks.yml
```

If you wish, you can provide the value more than one variable at scan time, as in the following example.

```shell
soda scan -d aws_postgres_retail duplicate_count_filter.yml -v date=2022-07-25 -v name='rowcount check'
```

<br />

#### Example: customize a check name

See also: [Customize check names]({% link soda-cl/optional-config.md %}#customize-a-check-name).
{% include code-header.html %}
```yaml
variables:
  name: Customers UK
checks for dim_customer:
  - row_count > 1:
     name: Row count in ${name}
```

<br />

#### Example: provide a dataset name at scan time
{% include code-header.html %}
```yaml
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

Scan command:
{% include code-header.html %}
```shell
soda scan -d my_datasource_name -c configuration.yml -v DATASET=dim_customer checks.yml
```

<br />

#### Example: provide a column name at scan time
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count(${COLUMN}) = 0:
      valid length: 10 
```

Scan command:
{% include code-header.html %}
```shell
soda scan -d my_datasource_name -c configuration.yml -v COLUMN=last_name checks.yml
```

<br />

#### Example: provide a threshold value at scan time
{% include code-header.html %}
```yaml
checks for dim_customer:
  - invalid_count(last_name) = ${LENGTH}:
      valid length: 10 
```

Scan command:
{% include code-header.html %}
```shell
soda scan -d my_datasource_name -c configuration.yml -v LENGTH=0 checks.yml
```

#### Example: use a variable in an in-check filter
{% include code-header.html %}
```yaml
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = ${SALES_TER}
```

#### Example: use a variable for a check identity

Read more about adding a [check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity).
{% include code-header.html %}
```yaml
checks for dim_product:
  - row_count > 0:
      identity: ${IDENTITY}
```

<br />

### Configure variables for connection configuration

You can use variables to:
* resolve credentials in configuration files using system variables; see [Configure Soda]({% link soda-library/install.md %}#provide-credentials-as-system-variables)
* pass variables for values in configuration files; see instructions below

If you use Soda Library to execute Soda scans for data quality, you can pass variables at scan time to provide values for data source connection configuration keys in your configuration YAML file. For example, you may wish to pass a variable for the value of `password` in your configuration YAML. Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.

1. Adjust the data source connection configuration in your configuration YAML to include a variable.
```shell
data_source adventureworks:
  type: postgres
  host: localhost
  username: noname
  password: ${PASSWORD}
  database: sodacore
  schema: public
```
2. Save then file, then run a scan that uses a `-v` option to include the value of the variable in the scan command.
```shell
soda scan -d adventureworks -c configuration.yml -v PASSWORD=123abc checks.yml
```

You can provide the values for multiple variables in a single scan command.

```shell
soda scan -d adventureworks -c configuration.yml -v USERNAME=sodacore -v PASSWORD=123abc -v FRESH_NOW=2022-05-31 21:00:00 checks.yml
```

<br />

###  Configuration details and limitations

* Variables must use the following syntax: `${VAR_NAME}`.
* For consistency, best practice dictates that you use upper case for variable names, though you can use lower case if you wish.
* If you do not explicitly specify a variable value at scan time to resolve credentials for a connection configuration, Soda uses environment variables.
* You cannot use a variable to provide a scan-time value for a [configuration key]({% link soda-cl/validity-metrics.md %}#list-of-configuration-keys) value, such as the value for `valid length` for an `invalid_count` check.
* You may need to wrap date values for variables in single quotes for a check to execute properly. The use of single quotes is bound to the data source, so if your data source demands single quotes around date values for SQL queries, you must also include them when providing date values in SodaCL. Refer to the [# Dataset filter with variables](#filters-and-variables) example at the top of this page.  
* Except for using the `${NOW}` variable in a dataset filter to [configure a time partition](#configure-a-time-partition-using-the-now-variable) for checks, you cannot use variables when defining checks in an agreement in Soda Cloud. When using variables, you normally pass the values for those variables at scan time, adding them to the `soda scan` command with a `-v` option. However, because scans that execute checks defined in an agreement run according to a scan definition, there is no opportunity to add dynamic values for variables at scan time.
* *Known issue:* SodaCL does not support using variables in [profiling configurations]({% link soda-cl/profile.md %}). <!--SAS-1642-->
* Except with a `NOW` variable, you cannot use variables in checks you write in an agreement in Soda Cloud as it is impossible to provide the variable values at scan time.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [for each]({% link soda-cl/for-each.md %}) configuration to execute checks on multiple datasets.
* Learn more about [Optional check configurations]({% link soda-cl/optional-config.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
