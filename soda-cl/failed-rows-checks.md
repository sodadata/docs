---
layout: default
title: Failed rows checks
description: Use a SodaCL failed rows check to explicitly send sample failed rows to Soda Cloud.
parent: SodaCL reference
---

# Failed rows checks
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a failed rows check to explicitly send samples of rows that failed a check to Soda Cloud.

You can also use a failed row check to configure Soda Library to execute a CTE or SQL query against your data, or to group failed check results by one or more categories.
{% include code-header.html %}
```yaml
checks for dim_customer:
# Failed rows defined using common table expression
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
```
{% include code-header.html %}
```yaml
checks for dim_customer:
# Failed rows defined using SQL query
  - failed rows:
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```
<small>✔️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />

[Prerequisites](#prerequisites) <br />
[About failed row samples](#about-failed-row-samples) <br />
[Define failed rows checks](#define-failed-rows-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites

To send failed rows samples to Soda Cloud, samples collection must be enabled in Soda Cloud. 

As a Soda Cloud Admin, navigate to **your avatar** > **Organization Settings**, then check the box to **Allow Soda to collect sample data and failed row samples for all datasets**. 


## Define failed rows checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), failed row checks are user-defined. This check is limited in its syntax variation, but you can customize your expression or query as much as you like.

When a failed rows check results in a `warn` or `fail` Soda collects up to 100 failed row samples by default. You can decrease or increase the volume of sample rows using the `samples limit` parameter; see [Set a samples limit]({% link soda-cl/failed-row-samples.md %}#set-a-sample-limit). Note that failed rows checks that use a SQL query support up to a maximum of 10,000 samples.

The example below uses <a href="https://www.essentialsql.com/introduction-common-table-expressions-ctes/" target="_blank">common table expression (CTE)</a> to define the `fail condition` that any rows in the `dim_customer` dataset must meet in order to qualify as failed rows, during a scan, get sent to Soda Cloud. Soda sends any rows which contain the value 2 in the `total_children` column and which contain a value greater than or equal to 3 in the `number_cars_owned` column to Soda Cloud as failed row samples, up to a default volume of 100 rows. The check also uses the `name` configuration key to customize a name for the check so that it displays in a more readable form in Soda Cloud; see image below.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows with CTE
      fail condition: total_children = '2' and number_cars_owned >= 3

# OR

  - failed rows:
      name: Failed rows with CTE
      fail condition: |
        total_children = '2' and number_cars_owned >= 3

```

![failed-rows-CTE](/assets/images/failed-rows-CTE.png){:height="700px" width="700px"}

<br />

If you prefer, you can use a SQL query to define what qualifies as a failed row for Soda to send to Soda Cloud, as in the following simple example. Use this cofiguration to include complete SQL queries in the Soda scan of your data.

```yaml
checks for dim_customer:
  - failed rows:
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```
![failed-rows-SQL](/assets/images/failed-rows-SQL.png){:height="700px" width="700px"}

<br />


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a failed rows check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - |
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
|   | Use for each to apply failed rows checks to multiple datasets in one scan. | - |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). <br /> *Known issue:* Dataset filters are not compatible with failed rows checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260--> | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |
| ✓ | Specify a single column against which to run a failed rows check; see [example](#example-with-column-parameter). |  -  |
|   | Supports `samples columns` parameter to specify columns from which Soda draws failed row samples. | [Customize sampling for checks]({% link soda-cl/failed-row-samples.md %}#customize-sampling-for-checks) |
|   | Supports `samples limit` parameter to control the volume of failed row samples Soda collects. | [Set a sample limit]({% link soda-cl/failed-row-samples.md %}#set-a-sample-limit) |
|   | Supports `collect failed rows` parameter instruct Soda to collect, or not to collect, failed row samples for a check. | [Customize sampling for checks]({% link soda-cl/failed-row-samples.md %}#customize-sampling-for-checks) |

#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```

#### Example with alert
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      fail condition: total_children = '2' and number_cars_owned >= 3
      warn: when between 1 and 10
      fail: when > 10
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT "geography_key"
        FROM dim_customer as customer
```

#### Example with dataset filter

*Known issue:* Dataset filters are not compatible with failed rows checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260-->
{% include code-header.html %}
```yaml
filter dim_product [new]:
  where: start_date < TIMESTAMP '2015-01-01'

checks for dim_product [new]:
  - failed rows:
      name: Failed CTE with filter
      fail condition: weight < '200' and reorder_point >= 3
```

#### Example with column parameter
{% include code-header.html %}
```yaml
checks for dim_product:
  # with SQL query
  - failed rows:
      name: Brand must be LUCKY DOG
      column: product_line
      fail query: |
        SELECT *
        FROM dim_product
        WHERE product_line LIKE '%LUCKY DOG%'
  # with CTE
  - failed rows:
      name: Brand must be LUCKY DOG
      column: product_line
      fail condition: brand LIKE '%LUCKY DOG%'
```

<br />


## Go further

* Learn how to [manage failed row samples]({% link soda-cl/failed-row-samples.md %}).
* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Borrow user-defined check syntax to define a resuable [check template]({% link soda-cl/check-template.md %}).
* Use a [schema check]({% link soda-cl/schema.md %}) to discover missing or forbidden columns in a dataset.
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
