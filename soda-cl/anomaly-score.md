---
layout: default
title: Anomaly score checks
description: 
parent: Soda CL 
---

# Anomaly score checks ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

The anomaly score check is powered by a machine learning algorithm that works with measurements that occur over time. The algorithm learns the patterns of your data – its trends and seasonality – to identify and flag anomalous measurements in time-series data. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the historic measurements for your checks in a metric store. SodaCL can then use these stored values to establish a baseline of normal measurements against which to evaluate future measurements to identify anomalies. Therefore, you must have a [Soda Cloud account]({% link soda-cloud/overview.md%}) to use change-over-time thresholds.

[Prerequisites](#prerequisites)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Define an anomaly score check](#define-an-anomaly-score-check) <br />
[Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation)<br />
[Go further](#go-further) <br />
<br />


## Prerequisites
* You have installed and <a href="https://docs.soda.io/soda-core/configure.html" target="_blank">configured Soda Core</a> to connect to a data source using a <a href="https://docs.soda.io/soda-core/first-scan.html#the-configuration-yaml-file" target="_blank">`configuration.yml` file</a>. 
* You have a Soda Cloud account and have <a href="https://docs.soda.io/soda-core/configure.html#connect-soda-core-to-soda-cloud" target="_blank">connected Soda Core to Soda Cloud</a>. 
* You have [installed Soda Core Scientific](#install-soda-core-scientific) in the same directory or virtual environment in which you <a href="https://docs.soda.io/soda-core/get-started.html#requirements" target="_blank">installed Soda Core</a>.


## Install Soda Core Scientific

To use an anomaly score check, you must install Soda Core Scientific in the same directory or virtual environment in which you installed Soda Core.

{% include install-soda-core-scientific.md %}

Refer to [Troubleshoot Soda Core Scientific installation](#troubleshoot-soda-core-scientific-installation) for help with issues during installation.


## Define an anomaly score check

The following example demonstrates how to use the anomaly score for the `row_count` metric in a check. You can use any [numeric]({% link soda-cl/numeric-metrics.md %}), [missing, or validity metric]({% link soda-cl/missing-validity.md %}) in lieu of `row_count`. 

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < default
```

* Currently, you can only use `default` as the measurement in an anomaly check. 
* By default, anomaly score checks yield warning check results, not failures.

<br />
You can use any [numeric]({% link soda-cl/numeric-metrics.md %}), [missing, or validity]({% link soda-cl/missing-validity.md %}) metric in anomaly score checks.  The following example detects anomalies for the average of `order_price` in an `orders` dataset.

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

## Troubleshoot Soda Core Scientific installation

{% include troubleshoot-soda-core-scientific.md %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}
