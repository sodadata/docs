---
layout: default
title: Group by checks
description: Use a SodaCL group by configuration to customize the group of data quality check results by category.
parent: SodaCL reference
---

# Group by
*Last modified on {% last_modified_at %}*

{% include banner-upgrade.md %}

Use a group by configuration to collect and present check results by category.

{% include code-header.html %}
```yaml
checks for fact_internet_sales:
  - group by: # Not supported in Soda Core
      query: |
        SELECT sales_territory_key, AVG(discount_amount) as average_discount
        FROM fact_internet_sales
        GROUP BY sales_territory_key
      fields:
        - sales_territory_key
      checks:
        - average_discount:
            fail: when > 40
            name: Average discount percentage is less than 40% (grouped by sales territory)
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>
<br />

[Define a group by configuration checks](#define-a-group-by-configuration) <br />
[Group by check results](#group-by-check-results)<br />
[Optional check configurations](#optional-check-configurations)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Add multiple group configurations](#add-multiple-group-configurations)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Change configurations and preserve check history](#change-configurations-and-preserve-check-history)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Track anomalies and relative changes by group](#track-anomalies-and-relative-changes-by-group)<br />
[Troubleshoot](#troubleshoot)<br />
[Go further](#go-further)<br />
<br />

## Define a group by configuration

For an individual dataset, add a **group by** configuration to specify the categories into which Soda must group the check results.

The example below uses a SQL query to define a custom metric for the `fact_internet_sales` dataset. It calculates the average order discount based on the contents of the `discount_amount` column, then groups the results according to the value in the `sales_territory_key`. This check supports up to a maximum of 1000 groups.

The check itself uses the custom metric `average_discount` and an [alert configuration]({% link soda-cl/optional-config.md %}#add-alert-configurations) to determine if the measurement for each group passes, warns, or fails. In this case, any calculated measurement for average that exceeds 40 results in a fail. 
{% include code-header.html %}
```yaml
checks for fact_internet_sales:
  - group by:
      group_limit: 10
      name: average discount
      query: |
        SELECT sales_territory_key, AVG(discount_amount) as average_discount
        FROM fact_internet_sales
        GROUP BY sales_territory_key
      fields:
        - sales_territory_key
      checks:
        - average_discount:
            fail: when > 40
            name: Average discount percentage is less than 40% (grouped-by sales territory)
```

| `group by` | required | configuration section label |
| `group_limit` | optional | the maximum number of groups, or column values, into which Soda must categorize the results. This value must correspond with the number of unique values in the column you identify in the `fields` section; see example below. This check supports up to a maximum of 1000 groups.|
| `group_name` | optional | specify a name for the group; Soda does not evaluate this parameter |
| `query` | required | custom query subsection label. The nested SQL query defines the custom metric `average_discount`|
| `fields`| required | column subsection label |
| `sales_territory_key`| required | column identifier; the values in this column identify how Soda groups the results. |
| `checks` | required | check subsection label |
| `average_discount`| required | custom metric identifier  |
| `fail: when > 40` | required | fail condition and threshold |
| `warn: when between 50 and 60` | only one alert condition is required | warn condition and threshold |
| `name` | optional | custom name for the check; it not defined, Soda derives the name of the check in Soda Cloud from the check syntax |

<br />

You can also use multi-column groups in a group by check, as in the example below that groups results both by `gender` and `english_education`. 

```yaml
checks for dim_customer:
    - group by:
        query: |
            SELECT
                gender,
                english_education,
                sum(total_children) as sum_total_children
            FROM dim_customer
            GROUP BY gender, english_education
        fields:
            - gender
            - english_education
        checks:
            - sum_total_children:
                fail: when < 100000
                name: Total number of children
```

<br />

## Group by check results

When you run a scan that includes checks nested in a group by configuration, the output in **Soda Library CLI** groups the results according to the unique values in the column you identified in the `fields` subsection. The number of unique values in the column must match the value you provided for `group_limit`. 

In the example results below, the calculated average of `average_discount` for each sales territory is less than 40%, so the check for each group passed. The value in the square brackets next to the custom check name identifies the group which, in this case, is a number that corresponds to a territory.

```shell
Soda 1.0.x
Soda Core 3.0.x
Scan summary:
11/11 checks PASSED: 
    fact_internet_sales in adventureworks
      group by [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [8] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [10] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [9] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [7] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [1] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [5] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [2] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [4] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [6] [PASSED]
      Average discount percentage is less than 40% (grouped-by sales territory) [3] [PASSED]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 14733***37
```

In Soda Cloud, the check results appear by territory.

![group-by-4](/assets/images/group-by-4.png){:height="600px" width="600px"}

<br />

{% include expect-one-result.md %}


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a group by; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration) | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters in the value in the check. | Use wildcard values as you would with SQL. |
|   | Use for each to apply group by checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. | - |

#### Example with check name
When the check results appear in Soda Cloud, the checks use the `name` you define for the check or, if you do not specify a `name` parameter, the syntax of the check itself.
{% include code-header.html %}
```yaml
checks for dim_employee:
  - group by:
      name: Grouped vacation hours
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

#### Example with identity
See also: [Change configurations and preserve check history](#change-configurations-and-preserve-check-history).
{% include code-header.html %}
```yaml
checks for dim_employee:
  - group by:
    ...
      checks:
        - vacation_hours > 0:
            identity: custom_identity
```

#### Example with alert configuration
Be aware that Soda only ever returns a single check result per check. See [Expect one check result](#expect-one-check-result) for details.
{% include code-header.html %}
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
{% include code-header.html %}
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
<br />

### Add multiple group configurations

You can add multiple `group by` configurations to the same dataset in the same checks YAML file and produce separately grouped check results. To do so, you must include an identifier in the `group by` configuration key of the extra group configurations you add, as in the example below. 

* The first `group by` in the example requires no identifier, though for readability and completeness, you have the option of adding one. 
* The second `group by` includes `title` as an identifier to differentiate it from the first. 

{% include code-header.html %}
```yaml
checks for dim_employee:
  - group by:
      query: |
        SELECT marital_status, AVG(vacation_hours) as vacation_hours, MAX(vacation_hours) as max_vacation_hours
        FROM dim_employee
        GROUP BY marital_status
      fields:
        - marital_status
      checks:
        - vacation_hours > 0
        - max_vacation_hours < 100:
            name: MAX vacation hours less than 100 [marital_status]
  - group by title:
      query: |
        SELECT title, AVG(vacation_hours) as vacation_hours, MAX(vacation_hours) as max_vacation_hours
        FROM dim_employee
        GROUP BY title
      fields:
        - title
      checks:
        - vacation_hours > 0:
        - max_vacation_hours < 100:
            name: MAX vacation hours less than 100 [title]
```

<br />

When the check results appear in Soda Cloud, the checks use the `name` you define for each check or, if you do not specify a `name` parameter, the syntax of the checks themselves. The `group by` identifiers appear in the CLI output, but do not appear the the check results in Soda Cloud.

```shell
Soda Library 1.3.1
Soda Core 3.0.47
By downloading and using Soda Library, you agree to Sodas Terms & Conditions (https://go.soda.io/t&c) and Privacy Policy (https://go.soda.io/privacy). 
Scan summary:
138/140 checks PASSED: 
    dim_employee in adventureworks
      group by [PASSED]
      vacation_hours > 0 [M] [PASSED]
      MAX vacation hours less than 100 [marital_status] [M] [PASSED]
      vacation_hours > 0 [S] [PASSED]
      MAX vacation hours less than 100 [marital_status] [S] [PASSED]
      vacation_hours > 0 [Database Administrator] [PASSED]
      MAX vacation hours less than 100 [title] [Database Administrator] [PASSED]
      vacation_hours > 0 [Design Engineer] [PASSED]
      MAX vacation hours less than 100 [title] [Design Engineer] [PASSED]
      vacation_hours > 0 [Production Supervisor - WC20] [PASSED]
      MAX vacation hours less than 100 [title] [Production Supervisor - WC20] [PASSED]
      vacation_hours > 0 [Research and Development Engineer] [PASSED]
      MAX vacation hours less than 100 [title] [Research and Development Engineer] [PASSED]
      vacation_hours > 0 [Research and Development Manager] [PASSED]
      ...
2/140 checks FAILED: 
    dim_employee in adventureworks
      group by title [FAILED]
      vacation_hours > 0 [Chief Financial Officer] [FAILED]
        check_value: 0E-20
Oops! 2 failures. 0 warnings. 0 errors. 138 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 693****
```

![multiple-group-results](/assets/images/multiple-group-results.png){:height="700px" width="700px"}

![group1-results](/assets/images/group1-results.png){:height="700px" width="700px"}

![group2-results](/assets/images/group2-results.png){:height="700px" width="700px"}

![group3-results](/assets/images/group3-results.png){:height="700px" width="700px"}

![group4-results](/assets/images/group4-results.png){:height="700px" width="700px"}

<br />

### Change configurations and preserve check history

When you make changes to your `group by` configuration, some changes result in a resetting of the check history in Soda Cloud. 

The following changes result in a reset of a group by check's history; all historical measurements disappear.
* change the list of `fields`, either adding, removing, or changing an existing field
* change the `group by` identifier when more than one `group by` configurations exist; see [Add multiple group configurations](#add-multiple-group-configurations)
* change the syntax of a group by check such as, a change to the threshold value; see [Configure variables in SodaCL]({% link soda-cl/filters.md %}#example-provide-a-threshold-value-at-scan-time) to mitigate disruption using dynamic threshold values

The following changes result in *no changes* to the check's history; Soda preserves all historical measurements to a maximum of 90 days.
* change the SQL query that forms part of the `group by` configuration
* add a check to the `group by` configuration

Further, you can add an `identity` parameter to a group by check to be able to make changes to the check and still preserve its historical measurements, as in the example below. See also: [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity).
```yaml
checks for dim_employee:
  - group by:
    ...
      checks:
        - vacation_hours > 0:
            identity: custom_identity
```

<br />

### Track anomalies and relative changes by group

{% include group-anomaly.md %}

<br />

## Troubleshoot

If you use an optional `group_limit` parameter, you must always match the number of unique values in the group by column to the value you provide for the parameter. 

In the following example, the number of unique values in the `sales_territory_key` column is greater than the `group_limit: 2` so Soda does not evaluate the check.  
{% include code-header.html %}
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
            name: Reasonable vacation hours
```

```shell
Soda Library 1.0.x
Soda Core 3.0.x
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

Resolve the issue by increasing the group limit value, or by removing the parameter entirely.
{% include code-header.html %}
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
Soda Library 1.0.x
Soda Core 3.0.x
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

## Go further

* Use a [group evolution check]({% link soda-cl/group-evolution.md %}) to surface changes in groups in a dataset.
* Learn more about [alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).
* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}