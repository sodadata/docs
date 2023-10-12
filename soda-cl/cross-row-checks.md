---
layout: default
title: Cross checks
description: Use a SodaCL cross check to compare row counts across datasets in the same, or different, data sources.
parent: SodaCL reference
redirect_from: /soda-cl/row-count.html
---

# Cross checks 
<!--Linked to UI, access Shlink--> 
*Last modified on {% last_modified_at %}*

Use a cross check to compare row counts between datasets within the same, or different, data sources.

See also: [Compare data using SodaCL]({% link soda-cl/compare.md %})
{% include code-header.html %}
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

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), cross checks are unique. This check employs the `row_count` metric and is limited in its syntax variation, with only a few mutable parts to specify dataset and data source names.

The example check below compares the volume of rows in two datasets in the same data source. If the row count in the `dim_department_group` is not the same as in `dim_customer`, the check fails.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count same as dim_department_group
```

<br />

You can use cross checks to compare row counts between datasets in different data sources, as in the example below. 

In the example, `retail_customers` is the name of the other dataset, and `aws_postgres_retail` is the name of the data source in which `retail_customers` exists.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail
```

* If you wish to compare row counts of datasets in different data sources, you must have configured a connection to both data sources. Soda needs access to both data sources in order to execute a cross check between data sources. 
* The data sources do not need to be the same type; you can compare a dataset in a PostgreSQL data source to a dataset in a BigQuery data source.

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a cross check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
|   | Define alert configurations to specify warn and fail alert conditions. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. | - |
|   | Use for each to apply schema checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | - |

#### Example with check name 
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count same as retail_customers in aws_postgres_retail:
      name: Cross check customer datasets
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count same as "dim_department_group"
```

<br />


## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Learn more about [Comparing data using SodaCL]({% link soda-cl/compare.md %}).
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
