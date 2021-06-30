---
layout: default
title: Samples
parent: Soda Cloud
redirect_from: /soda-sql/documentation/samples.html
---

# Use samples 

When it scans your data, Soda SQL executes [tests]({% link soda/glossary.md %}#test) that you define in the [scan YAML]({% link soda/glossary.md %}#scan-yaml) file. If you have connected Soda SQL to a [Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}) account, Soda SQL sends the results of each test to Soda Cloud where the test results manifest as [monitors]({% link soda/glossary.md %}#monitor). As a Soda Cloud user, you can open a monitor to review the same test results you see in Soda SQL, but you also have access to more information about the result including a chart that shows changes to your data over time, and a table that displays the data in the [rows that failed]({% link soda-cloud/failed-rows.md %}) the test.

When working with large [datasets]({% link soda/glossary.md %}#dataset), scans may result in Soda SQL sending great volumes of results to your Soda Cloud account. In such a case, you may wish to limit the amount of data and metadata that Soda SQL sends to Soda Cloud when it executes a scan. To do so, use **sample metrics**. 

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
Using the example scan YAML above, the scan executes both tests against all the data in the dataset, but it only sends a maximum of 50 rows of data and metadata to Soda Cloud for review in its corresponding monitor, where applicable. The snippet below displays the CLI output of the query that counts the rows in the dataset; Soda SQL counts 193 rows but only sends 50 as a sample to Soda Cloud. 
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
| `failed_limit` | integer | Defines the numerical threshold of rows with data that failed a test that Soda SQL sends to Soda Cloud during a scan. |


## Go further

- Read more about [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a free Soda Cloud account and [connect it to Soda SQL]({% link soda-cloud/connect_to_cloud.md %}).
- [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).

<br />

---
Last modified on {% last_modified_at %}

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.