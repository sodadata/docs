---
layout: default
title: Metrics
parent: Soda
---

# Metrics

A **metric** is a property of the data in your database. A **measurement** is the value for a metric that Soda checks against during a scan. You use metrics to define the tests that Soda executes against your data during a scan. 

For example, in the [test]({% link soda/glossary.md %}#test) defined as `row_count > 0`, `row_count` is the metric and `0` is the measurement. When it runs a scan, Soda executes the test against your [dataset]({% link soda/glossary.md %}#dataset); if the row count is greater than `0`, the test passes; if the dataset is empty, the test fails.

* In **Soda SQL**, you use metrics to define tests in your scan YAML file. Read more about [configuring metrics]({% link soda-sql/sql_metrics.md %}). 
* In **Soda Cloud**, you use metrics to define a test as part of the process to create a new monitor. Read more about [creating a monitor]({% link soda-cloud/monitors.md %}).

There are three kinds of metrics Soda uses:

* **[Dataset metrics](#dataset-metrics)** for tests that execute against an entire dataset
* **[Column metrics](#column-metrics)** for tests that execute against an individual column
* **[Custom metrics](#custom-metrics)**, also known as SQL metrics, that enable you to define SQL queries that Soda SQL executes against an entire dataset or against individual columns 

## Dataset metrics

Use **dataset metrics** in tests that execute against all data in the dataset during a scan. 

{% include dataset-metrics.md %}


## Column metrics

Use **column metrics** in tests that execute against specific columns in a dataset during a scan.

Where a column metric references a valid or invalid value, or a limit, use the metric in conjunction with a **column configuration key** in Soda SQL or a **Validity Rule** in Soda Cloud. A Soda scan uses the value of a column configuration key / validity rule to determine if it should pass or fail a test.

{% include column-metrics.md %}

### Column configuration keys or validity rules

{% include column-config-keys.md %}

### Valid format values

{% include valid-format-values.md %}

## Custom metrics

If the built-in dataset and column metrics that Soda offers do not quite give you the information you need from a scan, you can use **custom metrics** in Soda SQL to customize your queries. Custom metrics, also known as SQL metrics, essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan.

Read more about using [custom metrics in Soda SQL]({% link soda-sql/sql_metrics.md %}#custom-metrics).

## Go further

* Learn how to [configure metrics]({% link soda-sql/sql_metrics.md %}) in Soda SQL.
* Learn how to use metrics when [creating a monitor]({% link soda-cloud/monitors.md %}#2-monitor) in Soda Cloud.
* Follow the [Quick start tutorial for Soda SQL]({% link soda-sql/5_min_tutorial.md %}) to set up Soda SQL and run your first scan!
* Follow the [Quick start tutorial for Soda Cloud]({% link soda-cloud/quick-start.md %}) to start monitoring your data.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.