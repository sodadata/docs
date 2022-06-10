---
layout: default
title: Anomaly score checks
description: 
parent: Soda CL 
---

# Anomaly score checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Use an anomaly score check to automatically discover anomalies in your time-series data. <br> 
Requires Soda Cloud and Soda Core Scientific.

```yaml
checks for dim_customer:
  - anomaly score for row_count < default
```

[About anomaly score checks](#about-anomaly-score-checks)<br />
[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Define an anomaly score check](#define-an-anomaly-score-check) <br />
[Optional check configurations](#optional-check-configurations) <br />
[List of comparison symbols and phrases](#list-of-comparison-symbols-and-phrases) <br />
[Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation)<br />
[Go further](#go-further) <br />
<br />

## About anomaly score checks

The anomaly score check is powered by a machine learning algorithm that works with measured values for a metric that occur over time. The algorithm learns the patterns of your data – its trends and seasonality – to identify and flag anomalies in time-series data. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the previously-measured, historic values for your checks in the Cloud Metric Store. SodaCL can then use these stored values to establish a baseline of normal metric values against which to evaluate future metric values to identify anomalies. Therefore, you must have a created and [connected a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to use anomaly score checks.


## Prerequisites

* You have a Soda Cloud account and have [connected Soda Core to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}). 
* You have [installed Soda Core Scientific](#install-soda-core-scientific) in the same directory or virtual environment in which you [installed Soda Core]({% link soda-core/installation.md %}).


## Install Soda Core Scientific

To use an anomaly score check, you must install Soda Core Scientific in the same directory or virtual environment in which you installed Soda Core. Best practice recommends installing Soda Core and Soda Core Scientific in a virtual environment to avoid library conflicts, but you can [Install Soda Core Scientific locally](#install-soda-core-scientific-locally) if you prefer.

{% include install-soda-core-scientific.md %}

Refer to [Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation) for help with issues during installation.


## Define an anomaly score check

The following example demonstrates how to use the anomaly score for the `row_count` metric in a check. You can use any [numeric]({% link soda-cl/numeric-metrics.md %}), [missing](% link soda-cl/missing-metrics.md %), or [validity]({% link soda-cl/validity-metrics.md %}) metric in lieu of `row_count`. 

```yaml
checks for dim_customer:
  - anomaly score for row_count < default
```

* Currently, you can only use `< default` to define the threshold in an anomaly score check. 
* By default, anomaly score checks yield warn check results, not fails.

<br />
You can use any [numeric]({% link soda-cl/numeric-metrics.md %}), [missing](% link soda-cl/missing-metrics.md %), or [validity]({% link soda-cl/validity-metrics.md %}) metric in anomaly score checks.  The following example detects anomalies for the average of `order_price` in an `orders` dataset.

```yaml
checks for orders:
  - anomaly score for avg(order_price) < default
```

The following example detects anomalies for the count of missing values in the `id` column. 

```yaml
checks for orders:
  - anomaly score for missing_count(id) < default:
    missing_values: [None, No Value]
```

## Optional check configurations

| ✓ | Configuration | Documentation |
| :-: | ------------|---------------|
|   | Define a name for an anomaly score check. |  - |
|   | Define alert configurations to specify warn and fail thresholds. | - |
|   | Apply a filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset names; see [example](#example-with-quotes) | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. |  - |
| ✓ | Use for each to apply anomaly score checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
|   | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with quotes

```yaml
checks for "dim_customer":
  - anomaly score for row_count < default
```

#### Example with for each

```yaml
for each table T:
  tables:
    - dim_customer
  checks:
    - anomaly score for row_count < default
```


<br />

## List of comparison symbols and phrases

```yaml
<
```


## Troubleshoot Soda Core Scientific installation

While installing Soda Core Scientific works on Linux, you may encounter issues if you install Soda Core Scientific on Mac OS (particularly, machines with the M1 ARM-based processor) or any other operating system. If that is the case, consider using one of the following alternative installation procedures.
* [Use Docker to run Soda Core (Recommended)](#use-docker-to-run-soda-core)
* [Install Soda Core locally (Limited support)](#install-soda-core-locally)

Need help? Ask the team in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

### Use Docker to run Soda Core

{% include docker-soda-core.md %}

### Install Soda Core Scientific Locally 

{% include install-local-soda-core-scientific.md %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}
