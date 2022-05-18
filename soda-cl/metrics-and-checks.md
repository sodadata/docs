---
layout: default
title: Metrics and checks
description: 
parent: Soda CL
redirect: 
---

# Metrics and checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A **metric** is a property of the data in your dataset. A **measurement** is the value for a metric that Soda checks against during a scan. Usually, you use both a metric and a measurement to define a SodaCL **check** in a checks YAML file, like the following example that checks that the `dim_customer` dataset is not empty.  

![check](/assets/images/check.png){:height="300px" width="300px"}

A check is a test for data quality that you write using the Soda Checks Language (SodaCL). SodaCL includes over 30 built-in metrics that you can use to write checks, but you also have the option of writing your own SQL queries or expressions using SodaCL.

When it scans datasets in your data source, Soda Core executes the checks you defined in your checks YAML file. Technically, a check is a Python expression that, during a Soda scan, checks metrics to see if they match the parameters you defined for a measurement. A single Soda scan executes mutiple checks against one or more datasets in your data source.

As a result of a scan, each check results in one of three default states:
* **pass**: the values in the dataset match or fall within the thresholds you specified for the measurment
* **fail**: the values in the dataset _do not_ match or fall within the threshold you specified for the measurment
* **error**: the syntax of the check is invalid

A fourth state, **warn**, is something you can explicitly configure for individual checks. See Alert configuration.

The scan results appear in your command-line interface (CLI) and, if you have connected Soda Core to a Soda Cloud account, in the **Monitors Results** dashboard in the Soda Cloud web application. 

```shell
Soda Core 3.0.0bx
Scan summary:
1/1 check PASSED: 
    dim_customer in adventureworks
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
```

![check-result](/assets/images/check-result.png){:height="700px" width="700px"}

## Check types

In general, SodaCL checks fall into one of three loose categories:
1. standard
2. unique
2. user-defined

A **standard** check, as illustrated above, uses a language pattern that includes a metric and a measurement. All numeric, missing, and validity metrics use this pattern and have a multitude of optional configurations. Read more about [standard check types](#standard-check-types) below.

<details>
    <summary>Quick view of standard checks</summary>
    avg<br />
    avg_length<br />
    duplicate_count<br />
    freshness<br />
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
    valid_count<br />
    valid_percent<br />
    variance<br />
    var_pop<br />
    var_samp<br />
</details>

<br/>

Some checks that you write with SodaCL do not use metrics and measurements, and instead follow **unique patterns** relavent to the data quality parameters they check. For example, a check that validates that the values in a column in one dataset match exactly with the values in another column in another dataset uses a unique pattern.

![unique-check](/assets/images/unique-check.png){:height="600px" width="600px"}

<details>
    <summary>Quick view of unique checks</summary>
    anomaly score<br />
    distribution<br />
    reference<br />
    row_count cross-check<br />
    schema<br />
</details>

<br/>

Finally, the **user-defined** checks make use of common table expressions or SQL queries to construct a check; see an example below. This check type is designed to meet the more complex and specific data quality checks that would not otherwise be possible using the built-in standard and unique checks SodaCL provides. Use these checks to prepare expressions or queries for your data that Soda Core executes during a scan along with all the other checks in your checks YAML file.

![user-defined-check](/assets/images/user-defined-check.png){:height="415px" width="415px"}

<details>
    <summary>Quick view of user-defined checks</summary>
    failed rows using common table expression
    failed rows using SQL query
    user-defined metric using common table expression
    user-defined metric using SQL query

</details>

<br />

### Standard check types

Standard check types use the same pattern to compose a check, but the metrics they use can, themselves, be divided into three categories:
1. numeric - metrics that involve tabulation or calculation of data
2. missing - metrics that identify values or formats of data that qualifies as missing, such as NULL
3. validity - metrics that idefnify values or formats of data that, according to your own business rules, are acceptable or unacceptable

### Fixed thresholds

All standard checks that use numeric, missing, or validity metrics can specify a fixed measurement value, or **fixed threshold**, which is not relative to any other measurement. `row_count > 0` is an example of a check with a fixed threshold as the measurement value, `0`, is absolute.

Generally, a fixed threshold check has three or four mutable parts:

| a metric | 
| an argument (optional) | 
| a comparison symbol or phrase| 
| a measurement |  



<br />

```yaml
checks for retail_products: 
  - row_count > 0
  - max(size) <= 500
```

The example above defines two checks. The first check applies to the entire dataset and counts the rows to confirm that it is not empty. If the `retail_products` dataset contains more than `0` rows, the check result is `pass`.

| metric |`row_count` |
| comparison symbol | `>` |
| measurement | `0` | 

The second check applies to only the `size` column in the dataset and checks that the values in that column do not exceed `500`. If the `size` column in the `retail_products` dataset contains values larger than `500`, the check result is `fail`.

| metric | `max` |
| argument | `(size)` |
| comparison symbol | `<=` |
| measurement | `500`  |


### Dynamic thresholds

Only checks that use numeric metrics can specify a **dynamic threshold**, a measurement value that is relative to a past measurement value. Sometimes referred to a change-over-time threshold, you use these dynamic threshold measurements to gauge changes to the same metric over time. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account. Soda Cloud stores the value of each measurement that a check result produces during a scan. Over time, these historic measurements accumulate and you can reference them to detect anomalous measurements relative to previous measurements for the same metric. Therefore, you must have a Soda Cloud account to use dynamic thresholds.

Refer to [Dynamic thresholds]({% link soda-cl/numeric-checks.md %}#fixed-and-dynamic-thresholds) for further details.


## Define zones using alert configurations

Use the optional alert configuration with several metrics to write checks that define fail or warn zones. By establising these zones, the check results are more severe the further a measurement falls outside the parameters you specify as acceptable for your data quality. 

The example that follows defines split warning and failure zones in which inner is good, and outer is bad. The chart below illustrates the pass (white), warn (yellow), and fail (red) zones. Note that an individual check only ever yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more serious, failed check result. 

```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when not between -10 and 10
      fail: when not between -20 and 20
```

![historic-chart](/assets/images/historic-chart.png){:height="300px" width="300px"}

<br />

The next example defines a different kind of zone slip in which inner is bad, and outer is good. The chart below illustrates the fail (red), warn (yellow), and pass (white) zones.
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when between -20 and 20
      fail: when between -10 and 10
```

![historic-chart2](/assets/images/historic-chart2.png){:height="350px" width="350px"}

## Define boundaries with fixed thresholds

While the most basic of checks that use numeric metrics use a single value to identify a fixed threshold, such as `row_count >= 10`, you can use comparison phrases to define the upper and lower boundaries for a fixed threshold value. Read more about fixed and dynamic thresholds.

The following examples list several ways to set boundaries using the `row_count` metric in checks. You can use any numeric, missing, or validity metric in lieu of `row_count`.

### Implicitly include thresholds
By default, SodaCL includes the values that define the boundary thresholds when Soda Core executes a check. In the following exmample, the check passes if the number of rows is equal to 10, 11, 12, 13, 14, or 15 because SodaCL includes both boundary thresholds, `10` and `15`, when Soda Core executes the check.

```yaml
checks for dim_customer:
  - row_count between 10 and 15
```

Use negative values to set boundaries, if you wish. The check in the following example passes if the number of rows is equal to -3, -2, -1, 0, 1, 2, 3, 4, or 5.
```yaml
checks for dim_customer:
  - row_count between -3 and 5
```

Use the `not between` comparison phrase to establish a range of acceptable measurements, so that anything that falls *outside* the boundaries you specify yields a fail check result. The check in the following example passes if the number of rows is *not* equal to -3, -2, -1, 0, 1, 2, 3, 4, or 5.

```yaml
checks for dim_customer:
  - row_count not between -3 and 5
```

### Explicitly exclude thresholds
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

### Explicitly include thresholds
Though SodaCL includes the values that define the boundary thresholds during a check by default, you can use square brackets, `[` and `]`, to explicitly specify which values to include, if you wish. For example, all of the following checks are equivalent and will pass if the number of rows is equal to 10, 11, 12, 13, 14, or 15.

```yaml
checks for dim_customer:
  - row_count between 10 and 15
  - row_count between [10 and 15
  - row_count between 10 and 15]
  - row_count between [10 and 15]
```

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}