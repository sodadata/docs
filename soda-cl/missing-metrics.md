---
layout: default
title: Missing metrics
description: Use missing metrics in SodaCL checks to detect missing values in a dataset.
parent: Soda CL reference
redirect_from: /soda-cl/missing-validity.html
---

# Missing metrics 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a missing metric in a check to surface missing values in the data in your dataset. 
{% include code-header.html %}
```yaml
checks for dim_customer
  - missing_count(birthday) = 0
  - missing_percent(gender) < 5%
  - missing_count(first_name) = 0:
      missing regex: (?:N/A)
  - missing_count(last_name) < 5:
      missing values: [n/a, NA, none]
  - missing_percent(email_address) = 0%
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✔️ &nbsp;&nbsp; Available as a no-code check</small>
<br />

[Define checks with missing metrics](#define-checks-with-missing-metrics) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Specify missing values or missing regex](#specify-missing-values-or-missing-regex)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Failed row samples](#failed-row-samples) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of missing metrics](#list-of-missing-metrics)<br />
[List of configuration keys](#list-of-configuration-keys)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Go further](#go-further)<br />
<br />


## Define checks with missing metrics

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), you use missing metrics in standard checks. Refer to [Standard check types]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) for exhaustive configuration details. 

You can use both missing metrics in checks that apply to individual columns in a dataset; you cannot use missing metrics in checks that apply to entire datasets. Identify the column by adding a value in the argument between brackets in the check. 
* SodaCL considers `NULL` as the default value for "missing". 
* If you wish, you can add a `%` character to the threshold for a `missing_percent` metric for improved readability. 
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_count(birthday) = 0
```

You can use missing metrics in checks with fixed thresholds, or relative thresholds, but *not* change-over-time thresholds. See [Checks with fixed thresholds]({% link soda-cl/metrics-and-checks.md %}#checks-with-fixed-thresholds) for more detail. 
{% include code-header.html %}
```yaml
checks for dim_reseller:
# a check with a fixed threshold
  - missing_count(phone) < 5
# a check with a relative threshold
  - missing_percent(number_employees) < 5%
```

<details>
  <summary style="color:#00BC7E">What is a relative threshold?</summary>
When it scans a column in your dataset, Soda automatically separates all values in the column into one of three categories:
<ul> 
  <li>missing</li>
  <li>invalid</li>
  <li>valid</li>
</ul>
Soda then performs two calculations. The sum of the count for all categories in a column is always equal to the total row count for the dataset. 
<br/><br/>
missing count(column name) + invalid count(column name) + valid count(column name) = row count
<br/><br/>
Similarly, a calculation that uses percentage always adds up to a total of 100 for the column. 
<br/><br/>
missing percent(name) + invalid percent(name) + valid percent(name) = 100 
<br/><br/>
These calculations enable you to write checks that use <strong>relative thresholds</strong>. <br />
<br />
In the <code>missing_percent</code> example above, the missing values (in this case, NULL) of the <code>number_employees</code> column must be less than five percent of the total row count, or the check fails.<br /><br />
Percentage thresholds are between 0 and 100, not between 0 and 1.
</details>


### Specify missing values or missing regex

SodaCL considers `NULL` as the default value for "missing". In the two check examples above, Soda executes the checks to count the number or values which are `NULL`, or the percent of values  which are `NULL` relative to the total row count of the column. 

However, you can use a nested **configuration key:value pair** to provide your own definition of a missing value. See [List of configuration keys](#list-of-configuration-keys) below.

A check that uses a missing metric has four or six mutable parts:

| a metric | 
| an argument | 
| a comparison symbol or phrase| 
| a threshold |  
| a configuration key (optional) |
| a configuration value (optional)|

<br />

The example below defines two checks. The first check applies to the column `last_name`. The `missing values` configuration key specifies that any of the three values in the list exist in a row in that column, Soda recognizes those values as missing values. The check fails if Soda discovers more than five values that match `NA`, `n/a`, or `0`. 
* Values in a list must be enclosed in square brackets.
* *Known issue:* Do not wrap numeric values in single quotes if you are scanning data in a BigQuery data source. 

The second check uses a regular expression to define what qualifies as a missing value in the `first_name` column so that any values that are `N/A` qualify as missing. This check passes if Soda discovers no values that match the pattern defined by the regex.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_count(last_name) < 5:
      missing values: [NA, n/a, 0]
  - missing_count(first_name) = 0:
      missing regex: (?:N/A)
```

First check:

| metric | `missing_count` |
| argument | `last_name` |
| comparison symbol | `<` |
| threshold | `5` | 
| configuration key | `missing values` |
| configuration value(s) | `NA, n/a, 0` |

Second check:

| metric | `missing_count` |
| argument | `first_name` |
| comparison symbol or phrase| `=` |
| threshold | `0` | 
| configuration key | `missing regex` |
| configuration value(s) | `(?:N/A)` |

<br />

### Failed row samples

Checks with missing metrics automatically collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100. 

If you wish to limit or broaden the sample size, you can use the `samples limit` configuration in a check with a missing metric. You can add this configuration to your checks YAML file for Soda Library, or when writing checks as part of an agreement in Soda Cloud. 
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 2
```
<br />

For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-row-samples.md %}#disable-failed-row-samples-for-specific-columns). 

Alternatively, you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 0
```
<br />

You can also use a `samples columns` configuration to a check to specify the columns for which Soda must implicitly collect failed row sample values, as in the following example. Soda only collects this check's failed row samples for the columns you specify in the list. 

Note that the comma-separated list of samples columns does not support wildcard characters (%).
```yaml
checks for dim_employee:
  - missing_count(gender) = 0:
      missing values: ["M", "Q"]
      samples columns: [employee_key, first_name]
```
<br />

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a check for missing values. Examine failed rows in the **Failed Rows Analysis** tab; see [Manage failed row samples]({% link soda-cl/failed-row-samples.md %}) for further details.

![failed-missing-count](/assets/images/failed-missing-count.png){:height="700px" width="700px"}

<br />

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a check with missing metrics; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail thresholds; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-filter).| [Add an in-check filter to a check]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check) | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply checks with missing metrics to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |
| ✓ | Supports `samples columns` parameter to specify columns from which Soda draws failed row samples. | [Customize sampling for checks]({% link soda-cl/failed-row-samples.md %}#customize-sampling-for-checks) |
| ✓ | Supports `samples limit` parameter to control the volume of failed row samples Soda collects. | [Set a sample limit]({% link soda-cl/failed-row-samples.md %}#set-a-sample-limit) |
| ✓ | Supports `collect failed rows` parameter instruct Soda to collect, or not to collect, failed row samples for a check. | [Customize sampling for checks]({% link soda-cl/failed-row-samples.md %}#customize-sampling-for-checks) |


#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_count(first_name) = 0:
      missing regex: (?:N/A)
      name: First names valid
```

#### Example with alert configuration
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(marital_status):
      valid length: 1
      warn: when < 5
      fail: when >= 5  
```

#### Example with in-check filter
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_count(first_name) < 5:
      missing values: [NA, none]
      filter: number_children_at_home > 2
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_reseller:
  - missing_percent("phone") = 0
```

#### Example with for each
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_product
    - dim_product_%
  checks:
    - missing_count(product_line) = 0
```

#### Example with dataset filter
{% include code-header.html %}
```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - missing_count(user_id) = 0
```

<br />

## List of missing metrics

<table>
    <th>Metric</th>
    <th>Column config keys</th>
    <th>Description</th>
    <th>Supported data types</th>
    <tr>
        <td rowspan="2"><code>missing_count</code> </td>
        <td><code>missing values</code></td>
        <td rowspan="2">The number of rows in a column that contain NULL values and any other user-defined values that qualify as missing.</td>
        <td>number<br />  text<br />  time </td>
    </tr>
    <tr>
        <td style="border-left: 1px solid #DCE0E0;"><code>missing regex</code></td>
        <td>text </td>
    </tr>
        <tr>
        <td rowspan="2"><code>missing_percent</code> </td>
        <td><code>missing values</code></td>
        <td rowspan="2">The percentage of rows in a column, relative to the total row count, that contain NULL values and any other user-defined values that qualify as missing.</td>
        <td>number<br />  text<br />  time </td>
    </tr>
    <tr>
        <td style="border-left: 1px solid #DCE0E0;"><code>missing regex</code></td>
        <td>text </td>
    </tr>
</table> 


## List of configuration keys

The column configuration key:value pair defines what SodaCL ought to consider as missing values. 

| Column config key  | Description  | Values | 
| ------------------ | ------------ | ------ |
| `missing regex` | Specifies a regular expression to define your own custom missing values.| regex, no forward slash delimiters, string only |
| `missing values` | Specifies the values that Soda is to consider missing. | values in a list |


## List of comparison symbols and phrases

{% include list-symbols.md %}


## Go further

* Use missing metrics in checks with alert configurations to establish [warn and fail zones]({% link soda-cl/optional-config.md %}#define-zones-using-alert-configurations)
* Use missing metrics in checks to define ranges of acceptable thresholds using [boundary thresholds]({% link soda-cl/metrics-and-checks.md %}#define-boundaries-with-fixed-thresholds).
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
