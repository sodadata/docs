---
layout: default
title: Anomaly score check
description: 
parent: Soda CL 
---

# Anomaly score check ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

The anomaly score check is powered by a machine learning algorithm that works with measurements that occur over time. The algorithm learns the patterns of your data – its trends and seasonality – to identify and flag anomalous measurements in time-series data. 

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes check results to your cloud account where Soda Cloud stores all the historic measurements for your checks in a metric store. SodaCL can then use these stored values to establish a baseline of normal measurements against which to evaluate future measurements to identify anomalies. Therefore, you must have a [Soda Cloud account]({% link soda-cloud/overview.md%}) to use change-over-time thresholds.

## Prerequisites
* a Soda Cloud account, connected to Soda Core
* Soda Core Scientific package installed 
<!-- Add link to include page when https://github.com/sodadata/docs/pull/261 is merged -->


## Configuration

The following example demonstrates how to use the anomaly score for the `row_count` metric in a check. You can use any numeric metrics in lieu of `row_count`. By default, anomaly score checks yield warning check results, not failures.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < default
```
**NOTE:** Currently, only `default` is supported as a score. We will extend our documentation and configuration language in the future to let users define different sensitivity thresholds.

Anomaly detection can be applied to any of [Soda Core's numeric metrics]({% link numeric-metrics.md %}). For example, if you want to place an anomaly detection for the average of `order_price` in the `orders` table you could write the following check:

```yaml
checks for orders:
  - anomaly score for avg(order_price) < default
```

You can also use metrics that require nested configurations such as [Missing and Validity Metrics]({% link missing-validity.md %}) by simply nesting the extra configuration as you would for those checks. For example, checking for anomalies over a count of invalid values would look like:

```yaml
checkc for orders:
  - anomaly score for missing_count(id) < default:
    missing_values: [None, No Value]
```

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}
