---
layout: default
title: Cross checks
description: Use a SodaCL cross check to compare row counts across datasets in the same, or different, data sources.
parent: SodaCL
redirect_from: /soda-cl/row-count.html
---

# Cross checks 

Use a cross check to compare row counts between datasets within the same, or different, data sources.

```yaml
checks for dim_customer:
# Check row count between datasets in one data source
  - row_count same as dim_department_group
# Check row count between datasets in different data sources
  - row_count same as retail_customers in aws_postgres_retail
```

[Define cross checks](#define-cross-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[Go further](#go-further)<br />
<br />


## Define cross checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), cross checks are unique. This check employs the `row_count` metric but is limited in its syntax variation, with only a few mutable parts to specify dataset and data source names.

The example check below compares the volume of rows in two datasets in the same data source. If the row count in the `dim_department_group` is not the same as in `dim_customer`, the check fails.

```yaml
checks for dim_customer:
  - row_count same as dim_department_group
```

<br />

You can use cross checks to compare row counts between datasets in different data sources, as in the example below. 

In the example, `retail_customers` is the name of the other dataset, and `aws_postgres_retail` is the name of the data source in which `retail_customers` exists.

```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail
```

* If you wish to compare row counts of datasets in different data sources, you must have configured a connection to both data sources in your [configuration YAML file]({% link soda-core/configuration.md %}). Soda needs access to both data sources in order to execute a cross check between data sources. 
* The data sources do not need to be the same type; you can compare a dataset in a PostgreSQL data source to a dataset in a BigQuery data source.

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a cross check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
|   | Define alert configurations to specify warn and fail alert conditions. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. | - |
|   | Use for each to apply schema checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | - |

#### Example with check name 

```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail:
      name: Cross check customer datasets
```

#### Example with quotes

```yaml
checks for dim_customer:
  - row_count same as "dim_department_group"
```

<br />



<!--
## Cross table row count checks with filters

(Coming soon)

TODO Consider if we should push it to the user to define the right variables and avoid clashes between the variable names when comparing?

Check if the row count of a table is the same as another table in the same data source
```yaml
checks for CUSTOMERS [daily_date]:
  - row_count same as RAW_CUSTOMERS [daily_timestamp]
```

where in the same or another file:

```yaml
filter CUSTOMERS [daily_date]:
  where: date = DATE '${date}'

filter RAW_CUSTOMERS [daily_timestamp]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'
```

Row count comparison with table filter also works cross data source.
-->

## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Use a [schema check]({% link soda-cl/schema.md %}) to discover missing or forbidden columns in a dataset.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
