---
layout: default
title: Filters and variables
description: Instead of checking whole sets of data, use filters to specify a portion of data against which to execute a check. Use variables to specify values at scan time.
parent: SodaCL
redirect_from:
- soda-cl/table-filters.html
- soda-cl/dataset-filters.html
- /soda-core/variables.html
---

# Filters and variables
*Last modified on {% last_modified_at %}*

Use filters or variables to specify portions of data in your dataset against which Soda Core executes checks during a scan.

```yaml
# In-check filter
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11

# Dataset filter with variables
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2

# In-check variable 
checks for ${DATASET}:
  - invalid_count(last_name) = 0:
      valid length: 10 
```

[In-check vs. dataset filters](#in-check-vs-dataset-filters)<br />
[Configure in-check filters](#configure-in-check-filters)<br />
[Configure dataset filters](#configure-dataset-filters)<br />
[Configure variables](#configure-variables)<br />
[Configure variables for connection configuration](#configure-variables-for-connection-configuration)<br />
[Go further](#go-further)<br />
<br />

## In-check vs. dataset filters

The following expanation aims to help you decide when to use an in-check filter, and when to use a dataset filter.

Use **dataset filters** to create one or more partitions of data, commonly time partitions, upon which you want to execute large volumes of checks. 

Instead of executing a great many checks on *all* the data in a dataset, you can specify a smaller portion of data against which to execute all the checks. Doing so helps avoid having to repeatedly apply the same filter to many checks, and it produces a `WHERE` clause in the SQL query that Soda prepares and executes against your data. 

*Known issue:* Dataset filters are not compatible with [failed rows checks which use a SQL query]({% link soda-cl/failed-rows-checks.md %}#define-failed-rows-checks). With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260-->

Use **in-check filters** to exclude rows from an individual check evaluation. 

In-check filters provide the ability to create conditions, or business rules, that data in a column must meet before Soda includes a row in a check evaluation. In other words, Soda first finds rows that match the filter, *then* executes the check on those rows. As an example, you may wish to use an in-check filter to support a use case in which "Column X must be filled in for all rows that have value Y in column Z". 

When you find yourself adding the same in-check filters to multiple checks, you may wish to promote an in-check filter to a dataset filter. 

<details>
  <summary style="color:#00BC7E">How Soda Core applies filters</summary>
<br />
Soda Core uses the checks you define to prepare SQL queries that it executes against the datasets in your data source. It puts as many checks under the same <code>checks for</code> header into a single query as it can. An in-check filter translates to a <a href="https://www.w3schools.com/sql/sql_case.asp" target="_blank">CASE syntax</a> which Soda puts into that same query with other unfiltered checks.
<br /><br />
For a dataset filter, Soda Core generates a separate query and, again, attempts to put all checks under a <code>checks for</code> header into one query including any checks that also have a in-check filter. If your checks YAML has defined some unfiltered checks for a dataset, and applied a dataset filter to other checks on a particular partition of that data, Soda Core prepares two queries, each of which has several calculated metrics in the <code>SELECT</code> statement and which then flow back to their respective checks to evaluate whether they pass, warn, or fail.
</details>

## Configure in-check filters

{% include in-check-filters.md %}

### List of compatible metrics and checks

* all numeric metrics, *except* `duplicate_count` and `duplicate_percent`
* both missing metrics
* both validity metrics

## Configure dataset filters

{% include dataset-filters.md %}

## Configure variables

{% include variables.md %}

## Configure variables for connection configuration

If you use Soda Core to execute Soda scans for data quality, you can pass variables at scan time to provide values for data source connection configuration keys in your configuration YAML file. For example, you may wish to pass a variable for the value of `password` in your configuration YAML.

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
