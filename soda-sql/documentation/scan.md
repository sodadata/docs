---
layout: default
title: Scans
parent: Documentation
---

# Scans 

A **scan** is a Soda SQL CLI command that uses SQL queries to extract information about data in a dataset.

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

To test specific portions of data, such as data pertaining to a specific date, you can apply dynamic filters when you scan data in your warehouse. See [Apply filters]({% link soda-sql/documentation/filtering.md %}) for instructions.

## Scan output in Soda SQL

{% include scan-output.md %}

## Scan output in Soda Cloud

If you have a Soda Cloud account and you have [connected Soda SQL]({% link soda-sql/documentation/connect_to_cloud.md %}) to your account, Soda SQL automatically pushes your scan output to Soda Cloud. In the Soda Cloud web user interface, the test results manifest as monitor results. You can log in to view the **Monitor Results** dashboard; each row in the Monitor Results table represents the result of a test, and the icon indicates whether the test passed or failed.

When you run a scan in Soda SQL, it connects with Soda Cloud to:
1. push test results to Soda Cloud
2. fetch tests associated with any [monitors you have created]({% link soda-sql/documentation/monitors.md %}) in Soda Cloud, then execute the tests and push the test results to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}



## Use the scan output in your orchestration tool

Optionally, you can insert the output of Soda SQL scans into your data orchestration tool such as Dagster, or Apache Airflow. In your orchestration tool, you can use Soda SQL scan results to block the data pipeline if it encounters bad data, or to run in parallel to surface issues with your data. Learn more about [orchestrating scans]({% link soda-sql/documentation/orchestrate_scans.md %}).

## Go further

* Learn more about [scan YAML files]({% link soda-sql/documentation/scan-yaml.md %}).
* Learn more about the [warehouse YAML]({% link soda-sql/documentation/warehouse.md %}) file.
* Learn how to configure [metrics]({% link soda-sql/documentation/sql_metrics.md %}) in your YAML files.
* Learn more about configuring [tests]({% link soda-sql/documentation/tests.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.