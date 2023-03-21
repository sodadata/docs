---
layout: default
title: Reference checks
description: Use a SodaCL reference check to validate that the values in a column in a table are present in a column in a different table. 
parent: SodaCL
---

# Reference checks 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a reference check to validate that column contents match between datasets in the same data source. 

```yaml
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
```

[Define reference checks](#define-reference-checks) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Failed row samples](#failed-row-samples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[Go further](#go-further)<br />
<br />


## Define reference checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), reference checks are unique. This check is limited in its syntax variation, with only a few mutable parts to specify column and dataset names.

The example below checks that the values in the source column, `department_group_name`, in the `dim_department_group` dataset exist in the destination column, `department_name`, in the `dim_employee` dataset. If the values are absent in the `department_name` column, the check fails.
* Soda CL considers missing values in the source column as invalid.
* Optionally, do not use brackets around column names. The brackets serve as visual aids to improve readability.

```yaml
checks for dim_department_group:
  - values in (department_group_name) must exist in dim_employee (department_name)
```

You can use reference checks to compare the values of multiple columns in different datasets, as in the following example. Soda compares the columns in the order you list them, so in the example below, `last_name` compares to `last_name`, and `first_name` compares to `first_name`.

```yaml
checks for dim_customers_dev:
  - values in (last_name, first_name) must exist in dim_customers_prod (last_name, first_name)
```

### Failed row samples

Reference checks automatically collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100.

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration in a reference check configuration. You can add this configuration to your checks YAML file for Soda Core, or when writing checks as part of an [agreement]({% link soda-cloud/agreements.md %}) in Soda Cloud. 

```yaml
checks for dim_customers_dev:
  - values in (last_name, first_name) must exist in dim_customers_prod (last_name, first_name):
      samples limit: 20
``` 
<br />

For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

Alternatively, you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.

```yaml
checks for dim_customers_dev:
  - values in (last_name, first_name) must exist in dim_customers_prod (last_name, first_name):
      samples limit: 0
``` 
<br />

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a reference check. Examine failed rows in the **Failed rows** tab; see [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for further details.


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a reference check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
|   | Define alert configurations to specify warn and fail alert conditions. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. | - |
|   | Use for each to apply reference checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

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
