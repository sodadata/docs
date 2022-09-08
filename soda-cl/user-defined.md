---
layout: default
title: User-defined checks
description: Use a SodaCL user-defined check to define elements of a check using SQL expressions or queries.
parent: SodaCL
---

# User-defined checks 

If the built-in set of [metrics and checks]({% link soda-cl/metrics-and-checks.md %}) that SodaCL offers do not quite give you the information you need from a scan, you can define your own metrics to customize your checks. User-defined checks essentially enable you to create common-table expressions or SQL queries that Soda Core runs during a scan.

[Define user-defined checks](#define-user-defined-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Go further](#go-further)<br />


## Define user-defined checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}check-types), these are user-defined checks. Truly, it is the metric that you define yourself, then use in a check.

The example below uses <a href="https://www.essentialsql.com/introduction-common-table-expressions-ctes/" target="_blank">common table expression (CTE)</a> to define the metric that is then used in the check. The check itself follows the simple pattern of a [standard check]({% link soda-cl/metrics-and-checks.md %}#standard-check-types) that uses a metric, a comparison symbol or phrase, and a threshold. You specify the CTE value for the custom metric using a nested **expression key** which also defines the name of the new custom metric.
* The name you provide for a custom metric must *not* contain spaces.

```yaml
checks for dim_reseller:
  - avg_order_span between 5 and 10:
      avg_order_span expression: AVG(last_order_year - first_order_year)
```

| custom metric | `avg_order_span` |
| comparison symbol or phrase| `between` |
| threshold | `5 and 10` |
| expression key | `avg_order_span expression` |
| expression value | `AVG(last_order_year - first_order_year)` |

<br />

Instead of using CTE to define a custom metric, you can use a SQL query. The example check below follows the same standard check pattern, but includes a nested **query key** to define the custom metric and its name.
* The name you provide for a custom metric must *not* contain spaces.
* Though you specify the dataset against which to run the query in the SQL query, you must also provide the dataset identifier in the `checks for` section header. Without the dataset identifier, Soda Core cannot send the check results to Soda Cloud.
* *Known issue*: Soda does not recognize variables used in query key for custom metrics; see <a href="https://github.com/sodadata/soda-core/issues/1523" target="_blank">GitHub Issue 1523</a>.<!--SODA-1012-->

```yaml
checks for dim_product:
  - product_stock >= 50:
      product_stock query: |
        SELECT COUNT(safety_stock_level - days_to_manufacture)
        FROM dim_product
```

| custom metric | `product_stock` |
| comparison symbol or phrase| `>=` |
| threshold | `50` |
| query key | `product_stock query` |
| query value | `SELECT COUNT(safety_stock_level - days_to_manufacture) FROM dim_product` |


<br />


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a user-defined check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
| ✓ | Use for each to apply user-defined checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with check name 

```yaml
checks for dim_product:
  - product_stock >= 50:
      name: Product stock 
      product_stock query: |
        SELECT COUNT(safety_stock_level - days_to_manufacture)
        FROM dim_product
```

#### Example with alert configuration

```yaml
  - avg_order_span:
      avg_order_span expression: AVG(last_order_year - first_order_year)
      warn: when > 50
      fail: when > 200
```

#### Example with quotes

```yaml
checks for dim_product:
  - product_stock >= 50:
      product_stock query: |
        SELECT COUNT("safety_stock_level" - "days_to_manufacture")
        FROM dim_product
```

#### Example with for each

```yaml
for each dataset T:
  datasets:
    - dim_reseller
  checks:
    - avg_order_span between 5 and 10:
        avg_order_span expression: AVG(last_order_year - first_order_year)
```

#### Example with dataset filter

```yaml
coming soon
```

<br />

## List of comparison symbols and phrases

{% include list-symbols.md %}

## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Use a [schema check]({% link soda-cl/schema.md %}) to discover missing or forbidden columns in a dataset.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />


<!--
## User-defined multi numeric metrics query

(Coming soon)
```yaml
checks:
  - min_maxs between 100 and 1000:
  - max_mins between 10 and 500:

queries:
   mins and maxs: |
       SELECT MIN(MAX(a)+MAX(b)) as min_maxs,
       MAX(MIN(a)+MIN(b)) as max_mins
       FROM CUSTOMERS
       WHERE cat = 'HIGH'
```

Aliases in the select statement will be used to map the query results to metrics in the checks and then checks are executed with the query results.
-->
---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
