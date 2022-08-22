---
layout: default
title: Metrics and checks
description: SodaCL uses metrics in checks for data quality in one or more datasets.
parent: Soda CL
redirect_from:
- /soda-cl/metrics-thresholds.html 
---

# Metrics and checks 

**Soda Checks Language (SodaCL)** is a YAML-based, domain-specific language for data reliability. Used in conjunction with **Soda Core**, Soda’s open-source, command-line tool, you use SodaCL to write checks for data quality, then use Soda Core to scan the data in your data source and execute those checks.

A **metric** is a property of the data in your dataset. A **threshold** is the value for a metric that Soda checks against during a scan. Usually, you use both a metric and a threshold to define a SodaCL **check** in a checks YAML file, like the following example that checks that the `dim_customer` dataset is not empty.  

```yaml
checks for dim_customer:
  - row_count > 0
```

![check](/assets/images/check.png){:height="325px" width="325px"}

A check is a test for data quality that you write using the Soda Checks Language (SodaCL). SodaCL includes over 25 built-in metrics that you can use to write checks, but you also have the option of writing your own SQL queries or expressions using SodaCL.

When it scans datasets in your data source, Soda Core executes the checks you defined in your checks YAML file. Technically, a check is a Python expression that, during a Soda scan, checks metrics to see if they match the parameters you defined for a threshold. A single Soda scan executes multiple checks against one or more datasets in your data source.

{% include core-scan-output.md %}

## Check types

In general, SodaCL checks fall into one of three broad categories:
1. standard
2. unique
2. user-defined

A **standard** check, as illustrated above with `row_count`, uses a language pattern that includes a metric and a threshold. All numeric, missing, and validity metrics use this pattern and have a multitude of optional configurations. Read more about [standard check types](#standard-check-types) below.

<details>
    <summary>Quick view of standard check metrics</summary>
    avg<br />
    avg_length<br />
    duplicate_count<br />
    invalid_count<br />
    invalid_percent<br />
    max<br />
    max_length<br />
    min<br />
    min_length<br />
    missing_count<br />
    missing_percent<br />
    percentile<br />
    row_count<br />
    stddev<br />
    stddev_pop<br />
    stddev_samp<br />
    sum<br />
    variance<br />
    var_pop<br />
    var_samp<br />
</details>

<br/>

Some checks that you write with SodaCL do not use metrics and thresholds, and instead follow **unique patterns** relevant to the data quality parameters they check. Each unique check type has its own documentation.

For example, a reference check that validates that the values in a column in one dataset match exactly with the values in another column in another dataset uses a unique pattern.

```yaml
checks for dim_employees_dev:
  - values in salary must exist in dim_employee_prod salary
```

![unique-check](/assets/images/unique-check.png){:height="700px" width="700px"}

<details>
    <summary>Quick view of unique check types</summary>
    anomaly score<br />
    distribution<br />
    freshness<br />
    reference<br />
    cross<br />
    schema<br />
</details>

<br/>

Finally, the **user-defined** checks make use of common table expressions (CTE) or SQL queries to construct a check; see an example below. This check type is designed to meet the needs of more complex and specific data quality checks, needs which cannot otherwise be met using the built-in standard and unique checks SodaCL provides. Each user-defined check type has its own documentation.

Use these checks to prepare expressions or queries for your data that Soda Core executes during a scan along with all the other checks in your checks YAML file.

```yaml
checks for customers:
  - avg_surface < 1068:
      avg_surface expression: AVG(size * distance)
```

![user-defined-check](/assets/images/user-defined-check.png){:height="640px" width="640px"}

<details>
    <summary>Quick view of user-defined check types</summary>
    failed rows<br />
    user-defined<br />

</details>

<br />

## Standard check types

Standard check types use the same pattern to compose a check, but the metrics they use can, themselves, be divided into three categories:
1. [numeric]({% link soda-cl/numeric-metrics.md %}) - metrics that involve tabulation or calculation of data
2. [missing]({% link soda-cl/missing-metrics.md %})  - metrics that identify values or formats of data that qualify as missing, such as NULL
3. [validity]({% link soda-cl/validity-metrics.md %})  - metrics that identify values or formats of data that, according to your own business rules, are acceptable or unacceptable

### Checks with fixed thresholds

All standard checks that use numeric, missing, or validity metrics can specify a **fixed threshold** which is not relative to any other threshold. `row_count > 0` is an example of a check with a fixed threshold as the threshold value, `0`, is absolute.

Generally, a fixed threshold check has three or four mutable parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a threshold |  



<br />

```yaml
checks for retail_products: 
  - row_count > 0
  - max(size) <= 500
```

The example above defines two checks. The first check applies to the entire dataset and counts the rows to confirm that it is not empty. If the `retail_products` dataset contains more than `0` rows, the check result is `pass`.

| metric |`row_count` |
| comparison symbol | `>` |
| threshold | `0` | 

The second check applies to only the `size` column in the dataset and checks that the values in that column do not exceed `500`. If the `size` column in the `retail_products` dataset contains values larger than `500`, the check result is `fail`.

| metric | `max` |
| argument | `(size)` |
| comparison symbol | `<=` |
| threshold | `500`  |

<br />

### Checks with dynamic thresholds

Only checks that use numeric metrics can specify a **dynamic threshold**, a value that is relative to a previously-measured, or historic, value. Sometimes referred to a change-over-time threshold, you use these dynamic thresholds to gauge changes to the same metric over time. 

You must have a Soda Cloud account to use dynamic thresholds.

Refer to [Dynamic thresholds]({% link soda-cl/numeric-metrics.md %}#fixed-and-dynamic-thresholds) for further details.


### Define boundaries with fixed thresholds

While the most basic of standard checks use a single value to identify a fixed threshold, such as `row_count >= 10`, you can use comparison phrases to define the upper and lower boundaries for a fixed threshold value. Read more about [fixed](#checks-with-fixed-thresholds) and [dynamic](#checks-with-dynamic-thresholds) thresholds.

The following sections present several ways to set boundaries using the `row_count` metric in the example checks. You can use any numeric, missing, or validity metric in lieu of `row_count`.

### Implicitly include thresholds in a check
By default, SodaCL includes the values that define the boundary thresholds when Soda Core executes a check. In the following example, the check passes if the number of rows is equal to 10, 11, 12, 13, 14, or 15 because SodaCL includes both boundary thresholds, `10` and `15`, when Soda Core executes the check.

```yaml
checks for dim_customer:
  - row_count between 10 and 15
```

Use negative values to set boundaries, if you wish. The check in the following example passes if the number of rows is equal to -3, -2, -1, 0, 1, 2, 3, 4, or 5.
```yaml
checks for dim_customer:
  - row_count between -3 and 5
```

Use the `not between` comparison phrase to establish a range of acceptable thresholds, so that anything that falls *outside* the boundaries you specify yields a fail check result. The check in the following example passes if the number of rows is *not* equal to -3, -2, -1, 0, 1, 2, 3, 4, or 5.

```yaml
checks for dim_customer:
  - row_count not between -3 and 5
```

### Explicitly exclude thresholds in a check
To exclude the values that define the boundary thresholds, use the opening bracket `(` and closing bracket `)` characters. In the following example, the check passes if the number of rows is equal to 11, 12, 13, 14, or 15 because the opening bracket excludes 10 as an acceptable value.

```yaml
checks for dim_customer:
  - row_count between (10 and 15
```

Similarly, the following example check passes if the number of rows is equal to 11, 12, 13, or 14.

```yaml
checks for dim_customer:
  - row_count between (10 and 15)
```

### Explicitly include thresholds in a check
Though SodaCL includes the values that define the boundary thresholds during a check by default, you can use square brackets, `[` and `]`, to explicitly specify which values to include, if you wish. 

For example, all of the following checks are equivalent and pass if the number of rows is equal to 10, 11, 12, 13, 14, or 15.

```yaml
checks for dim_customer:
  - row_count between 10 and 15
  - row_count between [10 and 15
  - row_count between 10 and 15]
  - row_count between [10 and 15]
```

## Go further

* Access information about [optional configurations]({% link soda-cl/optional-config.md %}) that you can use in SodaCL checks.
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