---
layout: default
title: Failed rows
parent: Documentation
---

# Use samples 

When it scans your data, Soda SQL executes [tests]({% link soda-sql/documentation/glossary.md %}#test) that you define in the [scan YAML]({% link soda-sql/documentation/glossary.md %}#scan-yaml) file. If you have connected Soda SQL to a [Soda Cloud]({% link soda-sql/documentation/connect_to_cloud.md %}) account, Soda SQL sends the results of each test to Soda Cloud where the test results manifest as [monitors]({% link soda-sql/documentation/glossary.md %}#monitor). As a Soda Cloud user, you can open a monitor to review the same test results you see in Soda SQL, but you also have access to more information about the result including a chart that shows changes to your data over time, and a table that displays the data in the [rows that failed]({% link soda-sql/documentation/failed-rows.md %}) the test. 

When working with large [datasets]({% link soda-sql/documentation/glossary.md %}#dataset), scans may result in Soda SQL sending great volumes of results to your Soda Cloud account. In such a case, you may wish to limit the amount of data and metadata that Soda SQL sends to Soda Cloud when it executes a scan. To do so, use **sample metrics**. 

Add one or more sample metrics to your scan YAML file at the table level as per the following example. The `table_limit` defines the threshold of rows in the table that Soda SQL sends as a sample to Soda Cloud; the `failed_limit` defines the threshold of failed tests Soda SQL sends as a sample to Soda Cloud.
```yaml
table_name: orders
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  ... 
samples:
  table_limit: 50
  failed_limit: 50
tests:
  - row_count > 0
columns:
  orderid:
    valid_format: uuid
    tests:
      - invalid_percentage <= 3
```
<br />
Using the example scan YAML above, the scan executes both tests against all the data in the dataset, but it only sends a maximum of 50 rows of data and metadata to Soda Cloud for review in its corresponding monitor, where applicable. The snippet below displays the CLI output of query that counts the rows in the dataset; Soda SQL counts 193 rows but only sends 50 as a sample to Soda Cloud. 
```shell
  | …
  | Executing SQL query: 
SELECT * 
FROM "public"."orders" 
LIMIT 50;
  | SQL took 0:00:00.074957
  | Sent sample orders.sample (50/193) to Soda Cloud
  | …
```
<br />

| Metric | Value type | Description | 
| ----- | ----------- | ----------- |
| `table_limit` | integer | Defines the threshold of rows in a dataset that Soda SQL sends to Soda Cloud after it executes a test during a scan. |
| `failed_limit` | integer | Defines the threshold of rows with data that failed a test that Soda SQL sends to Soda Cloud during a scan. |


## Use sampling

To limit the volume of data in a dataset that Soda SQL actually scans, you can instruct it to run a scan against a portion, or sample, of the data. In your scan YAML file, define values for `sample_percentage` and `sample_method` as per the following example. 
```yaml
table_name: orders
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
samples:
  sample_percentage: 50
  sample_method: ROW
tests:
  - row_count > 0
columns:
  orderid:
    valid_format: uuid
    tests:
      - invalid_percentage <= 3
```
<br />


| Metric | Value type | Description | 
| ------ | ---------- | ----------- |
| sample_percentage | integer | Defines the percentage of the total number of rows in a dataset against which Soda SQL executes tests during a scan. |
| sample_method | string | Defines the type of sampling Soda SQL uses to select rows in a dataset against which to execute tests during a scan. |


## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for Soda Cloud and [connect it to Soda SQL]({% link soda-sql/documentation/connect_to_cloud.md %}).
- [Create monitors]({% link soda-sql/documentation/monitors.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-sql/documentation/soda-cloud-architecture.md %}).












