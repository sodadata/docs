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


## Configuration

The following example demonstrates how to use the anomaly score for the `row_count` metric in a check. You can use any numeric metrics in lieu of `row_count`. By default, anomaly score checks yield warning check results, not failures.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < default
```
<br />

If you wish, you can override the anomaly score. <!--why would you want to do this? what is the .7 a portion of?--> The following check yields a warning check result if the anomaly score for `row_count` exceeds `.7`.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < .7
```

<br />

Further, you can use `warn` and `fail` thresholds with the anomaly score. The following example demonstrates how to define the threshold for `row_count` that yields a warning, and the threshold that yields a failed check result. Note that an individual check only ever yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more serious, failed check result. 
```yaml
checks for CUSTOMERS:
  - anomaly score for row_count:
      warn: when > .8
      fail: when > .99
```

## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}