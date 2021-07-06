---
layout: default
title: Failed rows
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Examine failed rows

When a [scan]({% link soda/glossary.md %}#scan) in Soda SQL results in a failed [test]({% link soda/glossary.md %}#test), the CLI output displays information about the test that failed and why.  To offer more insight into the data that failed a test, [Soda Cloud]({% link soda-cloud/soda-cloud-architecture.md %}) displays **failed rows** in a monitor's history. 

Note: The current implementation of failed rows is evolving to better serve user needs.
<br />


There are three ways you can configure Soda SQL to send failed rows to Soda Cloud for you to examine:

1. define a [sample metric](#use-a-sample-metric-to-send-failed-rows) in your scan YAML file
2. use a [missing-value Metric Type](#use-a-missing-value-metric-type-to-send-failed-rows) in your monitor
3. use custom metrics to [explicitly send failed rows](#explicitly-send-a-sample-of-failed-rows) to Soda Cloud

## Use a sample metric to send failed rows

Define a `failed_limit` sample metric in your scan YAML file to instruct Soda SQL to send a sample of failed rows to Soda Cloud for any tests that fail during a scan. Refer to the Scan YAML Example below.

For this example, imagine you define a test in your [scan YAML]({% link soda/glossary.md %}#scan-yaml) file to make sure that 99% of the values in the `productid` column are correctly formatted as universally unique identifiers (UUID), then you [run a scan]({% link soda/scan.md %}#run-a-scan) from the command line to execute the test on the data in your table.

#### Scan YAML Example

```yaml
table_name: orders
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
samples:
  failed_limit: 50
tests:
  - row_count > 0
columns:
  productid:
    valid_format: uuid
    tests:
      - invalid_percentage <= 1
```

CLI output:
```shell
  | Scan summary ------
  | 126 measurements computed
  | 2 tests executed
  | 1 of 2 tests failed:
  |   Test column(productid) test(invalid_percentage <= 1) failed with measurements {"invalid_percentage": 5.181347150259067}
  | Exiting with code 1
```

The scan results in a failed test that indicates that 5.18% of the rows in the `productid` column are incorrectly formatted. This is all the information that the CLI output reveals. To review the data that failed the test, you must directly access the dataset in the data warehouse. However, if you are a Soda Cloud user, you can review the data in the failed rows without directly accessing the data.

In Soda Cloud, the Soda SQL test manifests as a line item in the **Monitor results** page. The line item reveals that the test failed with an invalid percentage value of 5.18, which is what Soda SQL CLI output revealed, but you can open the monitor and navigate to the **Failed Rows** tab to examine the contents of a sample of the rows that failed. Soda Cloud offers this quick view of the failing data in your dataset to help you identify issues and address causes.

![failed-rows](/assets/images/failed-rows.png){:height="700px" width="700px"}

#### Troubleshoot

If you open the monitor whose test failed during a scan but cannot click the **Failed Rows** tab, click a failed data point in the chart that shows the monitor's scan results over time. This action identifies the specific set of failed rows associated with an individual scan result so it can display the failed rows associated with that individual scan. 


## Use a missing-value Metric Type to send failed rows

If you used one of the following **Metric Types** in a test that you defined in a [monitor]({% link soda-cloud/monitors.md %}), Soda SQL automatically sends a sample of five failed rows associated with the failed test to Soda Cloud with the scan results. 

* Missing Values
* Invalid Values
* Distinct


## Explicitly send a sample of failed rows

You can use Soda SQL [custom metrics]({% link soda-sql/sql_metrics.md %}#sql-metrics) (also known as SQL Metrics) to explicitly demand that Soda SQL send failed rows to Soda Cloud when a scan results in a failed test.

In your scan YAML file, use `type: failed_rows` when writing a SQL query to retrieve a sample of failed rows in a dataset. By default, this property collects five rows of data that failed the test defined in the SQL query and displays them in Soda Cloud as failed rows in the monitor that represents the test that failed during a scan. 

In the following example, Soda SQL runs the scan and Soda Cloud displays a sample of five rows of data that failed the test defined as a SQL query.

```yaml
sql_metrics:
  - type: failed_rows
    name: PURCHASEPRICE_EXCEEDS_SELLINGPRICE
    sql: |
      SELECT *
      FROM ORDERS
      WHERE PURCHASEPRICE > SELLINGPRICE
```

## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a free Soda Cloud account and [connect it to Soda SQL]({% link soda-cloud/connect_to_cloud.md %}).
- [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
- Learn how to [use samples]({% link soda-sql/samples.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
- Learn more about [Soda scans]({% link soda/scan.md %}).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.