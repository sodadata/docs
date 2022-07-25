---
layout: default
title: Metrics in Soda SQL
description: A metric is a property of the data in your database. You use metrics to define the tests that Soda executes against your data during a scan.
sidebar: sql
parent: Soda SQL
redirect_from: /soda/metrics.html
---

# Metrics in Soda SQL

{% include banner-sql.md %}

A **metric** is a property of the data in your database. A **measurement** is the value for a metric that Soda checks against during a scan. You use metrics to define the tests that Soda executes against your data during a scan. 

For example, in the [test]({% link soda/glossary.md %}#test) defined as `row_count > 0`, `row_count` is the metric and `0` is the measurement. When it runs a scan, Soda executes the test against your [dataset]({% link soda/glossary.md %}#dataset); if the row count is greater than `0`, the test passes; if the dataset is empty, the test fails.

* In **Soda SQL**, you use metrics to define tests in your scan YAML file. Read more about [configuring metrics]({% link soda-sql/sql_metrics.md %}). 
* In **Soda Cloud**, you use metrics to define a test as part of the process to create a new monitor. 

There are four kinds of metrics Soda uses:

* **[Dataset metrics](#dataset-metrics)** for tests that execute against an entire dataset
* **[Column metrics](#column-metrics)** for tests that execute against an individual column
* **[Custom metrics](#custom-metrics)**, also known as SQL metrics, enable you to define your own metric that you can use tests that execute against a dataset or a column; you can also use custom metrics to simply define SQL queries that Soda executes during a scan
* **[Historic metrics](#historic-metrics)** for tests that rely on historic measurements stored in the Cloud Metric Store

## Dataset metrics

Use **dataset metrics** in tests that execute against all data in the dataset during a scan. 

{% include dataset-metrics.md %}

## Column metrics

Use **column metrics** in tests that execute against specific columns in a dataset during a scan.

Where a column metric references a valid or invalid value, or a limit, use the metric in conjunction with a **column configuration key** in Soda SQL or a **Validity Rule** in Soda Cloud. A Soda scan uses the value of a column configuration key / validity rule to determine if it should pass or fail a test.

{% include column-metrics.md %}

### Using regex with column metrics

* You can only use regex to define valid or missing values in columns that contain strings.
* When using regex to define valid or missing values, be sure to put the regex inside single quotes, as per the following example. You must single quotes because, as per YAML convention, chars like `[` and `]` have specific meaning in YAML if they are the first char of a value. If the first char is a normal text char then the YAML parser reads the rest of the value as a string.
```yaml
firstname:
    valid_regex: '[A-Z].'
    tests:
      - invalid_count == 0
```

### Column configuration keys or validity rules

Refer to [Using regex with column metrics](#using-regex-with-column-metrics) for important details on how to define the regex in a YAML file. The column configuration key:value pair defines what Soda SQL ought to consider as "valid" or "missing".

{% include column-config-keys.md %}

### Valid format values

{% include valid-format-values.md %}

## Custom metrics

If the built-in dataset and column metrics that Soda offers do not quite give you the information you need from a scan, you can use **custom metrics** to customize your queries. Custom metrics, also known as SQL metrics, essentially enable you to define SQL queries that Soda runs during a scan. You can also use custom metrics to define new metrics that you can use when you write tests. See [Validate that row counts are equal]({% link soda-sql/custom-metric-templates.md %}#validate-that-row-counts-are-equal) for an example of a test that uses a custom metric.

Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics).

## Historic metrics

{% include historic-metrics.md %}



## Go further

* Learn how to [configure metrics]({% link soda-sql/sql_metrics.md %}) in Soda SQL.
* Follow the [Quick start tutorial for Soda SQL]({% link soda-sql/quick-start-soda-sql.md %}) to set up Soda SQL and run your first scan!
* Follow the [Quick start for Soda SQL and Soda Cloud]({% link soda-sql/quick-start-soda-sql.md %}) to start monitoring your data.

<br />

---
*Last modified on {% last_modified_at %}*