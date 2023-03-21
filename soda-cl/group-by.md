---
layout: default
title: Group by checks
description: Use a SodaCL group by configuration to customize the group of check results by category.
parent: SodaCL
---

# Group by
*Last modified on {% last_modified_at %}*

Use a group by configuration to collect and present check results by category. 

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT marital_status, AVG(vacation_hours) as vacation_calc
        FROM dim_employee
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_calc:
            fail: when > 65
            name: average vacation hours
```

[Define reference checks](#define-reference-checks) <br />
[Group by check results](#group-by-check-results)<br />
[Optional check configurations](#optional-check-configurations)<br />
[Go further](#go-further)<br />
<br />

## Define a group by configuration

For an individual dataset, add a **group by** configuration to specify the categories into which Soda must group the check results.

The example below uses a SQL query to define a custom metric for the `dim_employee` dataset. It calculates the average vacation hours for employees based on the contents of the `vacation_hours` column, then groups the results according to the value in the `marital_status` column wherein each row contains only one of two values: `M` for married, or `S` for single. 

The check itself uses the custom metric `vacation_calc` and an [alert configuration]({% link soda-cl/optional-config.md %}#add-alert-configurations) to determine if the measurement for each group passes, warns, or fails. In this case, for both groups (married and single), any calculated measurement for average that exceeds 60 results in a fail, any measurement between 50 and 60 warns, and any measurement of 49 or less passes.

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT marital_status, AVG(vacation_hours) as vacation_calc
        FROM dim_employee
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_calc:
            fail: when > 60
            warn: when between 50 and 60
            name: Too much vacation
```

| `group by` | configuration section label |
| `group_limit` | the maximum number of groups, or column values, into which Soda must categorize the results. This value must correspond with the number of unique values in the column you identify in the `fields` section.  |
| `query` | custom query subsection label. The nested SQL query defines the custom metric `vacation_calc`|
| `fields`| column subsection label |
| `marital_status`| column identifier; the values in this column identify how Soda groups the results. In the example, the column contains `[M]` for the married group, and `[S]` for the single group. |
| `checks` | check subsection label |
| `vacation_calc`| custom metric identifier  |
| `fail: when > 60` | fail condition and threshold |
| `warn: when between 50 and 60` | warn condition and threshold |
| `name` | custom name for the check |


## Group by check results

When you run a scan that includes checks nested in a group by configuration, the output in **Soda Core CLI** groups the results according to the unique values in the column you identified in the `fields` subsection. The number of unique values in the column must match the value you provided for `group_limit`. 

In the example results below, the calculated average of `vacation_hours` for rows with an `M` value in their corresponding `marital_status` column was less than 50, so the check for that group passed. The calculated average of `vacation_hours` for rows with an `S` value in their corresponding `marital_status` column was `53`, which is between 50 and 60, so the check for that group warned. The value in the square brackets next to the custom check name identifies the group.

```shell
Soda Core 3.0.xx
Scan summary:
2/3 checks PASSED: 
    dim_employee in adventureworks
      group by [PASSED]
      Too much vacation [M] [PASSED]
1/3 checks WARNED: 
    dim_employee in adventureworks
      Too much vacation [S] [WARNED]
        check_value: 53.0000000000000000
Only 1 warning. 0 failure. 0 errors. 2 pass.
```

<br />

You must always match the number of unique values in the column to the value you provide for the `group_limit`. In the following example, the number of unique values in the `sales_territory_key` column is greater than the `group_limit: 2` so Soda does not evaluate the check.  

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT sales_territory_key, AVG(vacation_hours) as vacation_calc
        FROM dim_employee
        GROUP BY sales_territory_key
      fields:
        - sales_territory_key
      checks:
        - vacation_calc > 60:
            name: Too much vacation
```

```shell
Soda Core 3.0.xx
Evaluation of check group by failed: Total number of groups 11 exceeds configured group limit: 2
  | Total number of groups 11 exceeds configured group limit: 2
  +-> line=2,col=5 in checks_groupby.yml
Scan summary:
1/1 check NOT EVALUATED: 
    dim_employee in adventureworks
      group by [NOT EVALUATED]
1 checks not evaluated.
1 errors.
Oops! 1 error. 0 failures. 0 warnings. 0 pass.
ERRORS:
Evaluation of check group by failed: Total number of groups 11 exceeds configured group limit: 2
  | Total number of groups 11 exceeds configured group limit: 2
  +-> line=2,col=5 in checks_groupby.yml

```

Resolve the issue by increasing the group limit value.

```yaml
checks for dim_employee:
  - group by:
      group_limit: 11
      query: |
        SELECT sales_territory_key, AVG(vacation_hours) as vacation_calc
        FROM dim_employee
        GROUP BY sales_territory_key
      fields:
        - sales_territory_key
      checks:
        - vacation_calc > 20:
            name: Too much vacation
```

```shell
Soda Core 3.0.xx
Scan summary:
12/12 checks FAILED: 
    dim_employee in adventureworks
      group by [FAILED]
      Too much vacation [3] [FAILED]
        check_value: 24.0000000000000000
      Too much vacation [8] [FAILED]
        check_value: 35.0000000000000000
      Too much vacation [11] [FAILED]
        check_value: 51.3297872340425532
      Too much vacation [9] [FAILED]
        check_value: 36.0000000000000000
      Too much vacation [7] [FAILED]
        check_value: 34.0000000000000000
      Too much vacation [10] [FAILED]
        check_value: 37.0000000000000000
      Too much vacation [1] [FAILED]
        check_value: 28.0000000000000000
      Too much vacation [5] [FAILED]
        check_value: 29.0000000000000000
      Too much vacation [4] [FAILED]
        check_value: 26.5000000000000000
      Too much vacation [2] [FAILED]
        check_value: 38.0000000000000000
      Too much vacation [6] [FAILED]
        check_value: 32.0000000000000000
Oops! 12 failures. 0 warnings. 0 errors. 0 pass.
```

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a group by check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration) | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters in the value in the check. | Use wildcard values as you would with SQL. |
|   | Use for each to apply group by checks to multiple datasets in one scan. | - |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with check name

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT marital_status, AVG(vacation_hours) as vacation_hours
        FROM dim_employee
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_hours > 60:
            name: Too many vacation hours
```

#### Example with alert configuration

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT marital_status, AVG(vacation_hours) as vacation_hours
        FROM dim_employee
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_hours:
            fail: when > 65
            warn: when between 50 and 65
            name: Too many vacation hours
```

#### Example with quotes

Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark.

```yaml
checks for dim_employee:
  - group by:
      group_limit: 2
      query: |
        SELECT "marital_status", AVG("vacation_hours") as vacation_hours
        FROM "dim_employee"
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_hours > 60:
            name: Too many vacation hours
```

#### Example with dataset filter




## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}