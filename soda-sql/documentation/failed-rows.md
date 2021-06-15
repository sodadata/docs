---
layout: default
title: Failed rows
parent: Documentation
---

# Examine failed rows

When a scan in Soda SQL results in a failed test, the CLI output displays information about the test that failed and why.  To offer more insight into the data that failed a test, [Soda Cloud]({% link soda-sql/documentation/soda-cloud-architecture.md %}) displays failed rows.

As an example, imagine you have defined a test in your [scan YAML]({% link soda-sql/documentation/glossary.md %}#scan-yaml) file to make sure that 99% of the values in the `productid` column are correctly formatted as universally unique identifiers (UUID), then you [run a scan]({% link soda-sql/documentation/scan.md %}#run-a-scan) from the command line to execute the test on the data in your table.

Scan YAML file:
```yaml
table_name: orders
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  …
samples:
  sample_percentage: 50
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

The scan results in a failed test that indicates that 5.18% of the rows in the `productid` column are incorrectly formatted. This is all the information that the CLI output reveals. To review the data that failed the test, you must access the dataset in the data warehouse. However, if you are a Soda Cloud user, you can review the data in the failed rows without directly accessing the data.

In Soda Cloud, the Soda SQL test manifests as a line item in the **Monitor results** page. The line item reveals that the test failed with an invalid percentage value of 5.18, which is what Soda SQL CLI output revealed, but you can open the monitor to examine the contents of the rows that failed. Soda Cloud offers this quick view of the failing data in your dataset to help you identify issues and address causes.

![failed-rows](/assets/images/failed-rows.png){:height="700px" width="700px"}


## Get a sample of failed rows

[Monitors]({% link soda-sql/documentation/glossary.md %}#monitor) in Soda Cloud automatically reveal failed rows when a scan results in a failed test, but you can use Soda SQL custom metrics to seek out failed rows in your dataset.

In your scan YAML file, use `failed_rows` when writing a SQL query to retrieve a sample of failed rows in a dataset. By default, this property collects five rows of data that meet the criteria of the SQL query and displays them in Soda Cloud as samples of failed rows. 

The following example returns rows in which the value of the purchase price column of a product exceeds the value in the selling price column. Soda Cloud displays the rows of data that met the criteria of the SQL query in the **Failed rows** tab in the monitor.

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

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for Soda Cloud and [connect it to Soda SQL]({% link soda-sql/documentation/connect_to_cloud.md %}).
- [Create monitors]({% link soda-sql/documentation/monitors.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-sql/documentation/soda-cloud-architecture.md %}).