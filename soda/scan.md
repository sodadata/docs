---
layout: default
title: Scans
parent: Soda
redirect_from: /soda-sql/documentation/scan.html
---

# Scans 

A **scan** is a Soda SQL CLI command that uses SQL queries to extract information about data in a dataset.

[Run a scan](#run-a-scan)<br />
[Scan output in Soda SQL](#scan-output-in-soda-sql)<br />
[Scan output in Soda Cloud](#scan-output-in-soda-cloud)<br />
[Programmatically use scan output](#programmatically-use-scan-output)<br />
[Go further](#go-further)<br />

## Run a scan

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

## Scan output in Soda Cloud

If you have a Soda Cloud account and you have [connected Soda SQL]({% link soda-cloud/connect_to_cloud.md %}) to your account, Soda SQL automatically pushes your scan output to Soda Cloud. In the Soda Cloud web user interface, the test results manifest as monitor results. Log in to view the **Monitor Results** dashboard; each row in the Monitor Results table represents the result of a test, and the icon indicates whether the test passed or failed.

![monitor-results](/assets/images/monitor-results.png){:height="550px" width="550px"}

When you run a scan in Soda SQL, it connects with Soda Cloud to:
1. push the results of tests you configured in the scan YAML file to Soda Cloud
2. fetch tests associated with any [monitors you have created]({% link soda-cloud/monitors.md %}) in Soda Cloud, then execute the tests and push the test results to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}



## Programmatically use scan output 

Optionally, you can insert the output of Soda SQL scans into your data orchestration tool such as Dagster, or Apache Airflow. You can save Soda SQL scan results anywhere in your system; the `scan_result` object contains all the scan result information. See [Configure programmatic scans]({% link soda-sql/programmatic_scan.md %}) for details.

Further, in your orchestration tool, you can use Soda SQL scan results to block the data pipeline if it encounters bad data, or to run in parallel to surface issues with your data. Learn more about [orchestrating scans]({% link soda-sql/orchestrate_scans.md %}).

## Go further

* Learn more about [scan YAML files]({% link soda-sql/scan-yaml.md %}).
* Learn more about the [warehouse YAML]({% link soda-sql/warehouse.md %}) file.
* Learn how to configure [metrics]({% link soda-sql/sql_metrics.md %}) in your YAML files.
* Learn more about configuring [tests]({% link soda-sql/tests.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.