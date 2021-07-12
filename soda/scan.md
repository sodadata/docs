---
layout: default
title: Scans
parent: Soda
redirect_from: /soda-sql/documentation/scan.html
---

# Scans 

A **scan** is a command that executes [tests]({% link soda/glossary.md %}#test) to extract information about data in a [dataset]({% link soda/glossary.md %}#dataset). 

Soda SQL uses the input in the scan YAML file to prepare SQL queries that it runs against the data in a dataset in a data source. All tests return true or false; if true, the test passed and you know your data is sound; if false, the test fails which means the scan discovered data that falls outside the expected or acceptable parameters you defined in your test.

[Run a scan in Soda SQL](#run-a-scan-in-soda-sql)<br />
[Scan output in Soda SQL](#scan-output-in-soda-sql)<br />
[Schedule a scan in Soda Cloud](#schedule-a-scan-in-soda-cloud)
[Scan output in Soda Cloud](#scan-output-in-soda-cloud)<br />
[Programmatically use scan output](#programmatically-use-scan-output)<br />
[Go further](#go-further)<br />

## Run a scan in Soda SQL

{% include run-a-scan.md %}

When Soda SQL runs a scan, it performs the following actions:
- fetches column metadata (column name, type, and nullable)
- executes a single aggregation query that computes aggregate metrics for multiple columns, such as `missing`, `min`, or `max`
- for each column, executes:
  - a query for `distinct_count`, `unique_count`, and `valid_count`
  - a query for `mins` (list of smallest values)
  - a query for `maxs` (list of greatest values)
  - a query for `frequent_values`
  - a query for `histograms`

To allow some databases, such as Snowflake, to cache scan results, the column queries use the same Column Table Expression (CTE). This practice aims to improve overall scan performance.

To test specific portions of data, such as data pertaining to a specific date, you can apply dynamic filters when you scan data in your warehouse. See [Apply filters]({% link soda-sql/filtering.md %}) for instructions. Further, use the `soda scan --help` command to review optional parameters you can include to customize the scan. 

## Scan output in Soda SQL

{% include scan-output.md %}

## Schedule a scan in Soda Cloud

When you connect a **[data source]({% link soda/glossary.md %}#data-source)** to your Soda Cloud account, the guided steps ask that you define a schedule for scans of your data. See [Import settings]({% link soda-cloud/add-datasets.md %}#import-settings) for more information about setting a scan schedule. Note, you cannot run an *ad hoc* scan directly from Soda Cloud.

You can also define scan schedules for individual **datasets**. For example, you can specify a more frequent scan schedule for a dataset that changes often. Learn more about [Adjusting a dataset scan schedule]({% link soda-cloud/dataset-scan-schedule.md %}). 

## Scan output in Soda Cloud

Whether you define your tests in your [scan YAML file]({% link soda-sql/scan-yaml.md %}) for Soda SQL or in a [monitor]({% link soda-cloud/monitors.md %}) in Soda Cloud, in the Soda Cloud web user interface, all test results manifest as monitor results. Log in to view the **Monitors** dashboard; each row in the **Monitor Results** table represents the result of a test, and the icon indicates whether the test passed or failed.

![monitor-results](/assets/images/monitor-results.png){:height="550px" width="550px"}

Soda Cloud uses Soda SQL in the background to run scheduled scans. Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, Soda SQL:
1. pushes the results of any tests you configured in the scan YAML file to Soda Cloud
2. fetches tests associated with any monitors you created in Soda Cloud, then executes the tests and pushes the test results to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}



## Programmatically use scan output 

Optionally, you can insert the output of Soda SQL scans into your data orchestration tool such as Dagster, or Apache Airflow. You can save Soda SQL scan results anywhere in your system; the `scan_result` object contains all the scan result information. See [Configure programmatic scans]({% link soda-sql/programmatic_scan.md %}) for details.

Further, in your orchestration tool, you can use Soda SQL scan results to block the data pipeline if it encounters bad data, or to run in parallel to surface issues with your data. Learn more about [orchestrating scans]({% link soda-sql/orchestrate_scans.md %}).

## Go further

* Learn more about [scan YAML files]({% link soda-sql/scan-yaml.md %}).
* Learn more about [creating monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
* Learn how to configure [metrics]({% link soda-sql/sql_metrics.md %}) in your YAML files.
* Learn more about configuring [tests]({% link soda-sql/tests.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.