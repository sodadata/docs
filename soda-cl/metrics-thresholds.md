---
layout: default
title: Metrics and thresholds
description: 
parent: SodaCL
---

# Metrics and thresholds

This section explains the general principles of how metric checks are composed.

The basic pattern or numerical metric checks is this:
```yaml
<metric> <treshold>
```

Eg `count > 0` where

metric: `count`
threshold: `> 0`

Below is a list of metrics and thresholds including

* Fixed thresholds
* Absolute change over time thresholds
* Relative change over time percentage thresholds
* Warning level thresholds


## Metrics

| Metric | Arguments | Description | Data sources supported |
| ------ | --------- | ----------- | ---------------------- |
| `row_count` | | Row counts | * |
| `missing_count` | Column name | Missing values count | * |
| `missing_percent` | Column name | Missing values as a percentage of total row count | * |
| `invalid_count` | Column name | Invalid values count | * |
| `invalid_percent` | Column name | Invalid values as a percentage of the non-missing values count | * |
| `duplicate_count` | One or more column names | Values that occur more than once | * |
| `sum` | Column name | Sum | * |
| `min` | Column name | Min | * |
| `max` | Column name | Max | * |
| TODO | | TODO Which ones are we missing here? | * |
| `stdev` | Column name | | postgresql |
| `stddev_pop` | Column name |  | postgresql |
| `stddev_samp` | Column name |  | postgresql |
| `variance` | Column name | | postgresql |
| `var_pop` | Column name | | postgresql |
| `var_samp` | Column name | | postgresql |
| `percentile` | Column name, percentage | Eg percentile(distance, 0.7) | postgresql |


## Fixed boundary thresholds

```yaml
checks for {table_name}:
  - row_count = 10.0
  - row_count < 11
  - row_count > 9
  - row_count <= 10
  - row_count >= 10
  - row_count != 0
  - row_count <> 0
  - row_count between 10 and 15
  - row_count between -5 and 10
  - row_count between (9 and 15]
  - row_count between [-5 and 11)
  - row_count not between 11 and 15
  - row_count not between -5 and 9
  - row_count not between (10 and 15
  - row_count not between -5 and 10)
```

`(` before the lower bound means it is not included. So

* `row_count between (9 and 15` translates to `9 < count <= 15`
* `row_count not between ]10 and 15` translates to `count <= 10 or 15 < count`

`)` after the upper bound means it is not included.

* `row_count between -5 and 11)` translates to `-5 <= count < 11`
* `row_count not between -5 and 10)` translates to `count < -5 or 10 <= count`

Boundaries included are the default, but It is ok to explicitely specify. These are all the equivalent:

* `row_count between 10 and 15`
* `row_count between [10 and 15`
* `row_count between 10 and 15]`
* `row_count between [10 and 15]`

## Warning thresholds

In the above, checks only had pass/fail outcomes. Here we show how to distinct between pass, warn and fail zones.

The next examples are shown for a count metric. But a zone threshold can be used for all numeric metric checks.

The next example shows how to configure split warning and failure zones where inner is good and outer is bad:

```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when not between -10 and 10
      fail: when not between -20 and 20
```

The above configuration gives a historic chart that looks like this:

![historic-chart](/assets/images/historic-chart.png){:height="300px" width="300px"}

The next example shows how to configure warning and failure zones where inner is bad and outer is good:
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when between -20 and 20
      fail: when between -10 and 10
```

The above configuration gives a historic chart that looks like this:

![historic-chart2](/assets/images/historic-chart2.png){:height="350px" width="350px"}

The next example shows how to configure a simple warning without a failure
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when < 20
```

The next example shows how to configure a warning zone band with a single failure value.
```yaml
checks for CUSTOMERS:
  - row_count:
      warn: when not between 1 and 20
      fail: when = 11
```

## Change over time thresholds

(*) This feature depends on [a Soda Cloud account](../soda-core/soda-cloud.md).

In the examples below, we use `row_count` as the metric.
In your use case, use any of the metrics as listed in [the Metrics section above](#metrics) 

The next example will generate a failure if the difference between the previous `row_count` 
and the current `row_count` is 50 or greater. 
```yaml
checks for CUSTOMERS:
  - change for row_count < 50
```

The next examples show how to check the difference between the current `row_count` 
and the average, minimum or maximum of the last 7 `row_count`s. 
```yaml
checks for CUSTOMERS:
  - change avg last 7 for row_count < 50
  - change min last 7 for row_count < 50
  - change max last 7 for row_count < 50
```

## Anomaly detection thresholds

(*) This feature depends on a Soda Cloud account.

Anomaly detection checks can be applied to all metrics. The examples below are all 
showing `row_count` as the metric.  Use any of the metrics as listed in [the Metrics section above](#metrics) 

The next check is the simplest anomaly detection check.  It performs anomaly detection on 
the `row_count` metric with the default anomaly score threshold.

The anomaly score metric checks will generate a warning by default, which is different from the 
typical failure default for other checks.

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < default
```

It's possible to override the anomaly score threshold.  The following check will generate 
a warning if the anomaly score for row_count exceeds .7

```yaml
checks for CUSTOMERS:
  - anomaly score for row_count < .7
```

Finally, you can have separate thresholds for warn and fail.  It's possible to specify only the 
warn threshold, the fail threshold or both like shown here:
```yaml
checks for CUSTOMERS:
  - anomaly score for row_count:
      warn: when > .8
      fail: when > .99
```

---
{% include docs-footer.md %}
