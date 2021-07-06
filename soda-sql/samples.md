---
layout: default
title: Send sample data to Soda Cloud
parent: Soda Cloud
redirect_from: 
- /soda-sql/documentation/samples.html
- /soda-cloud/samples.html
---

# Send sample data to Soda Cloud

When creating new [monitors]({% link soda/glossary.md %}#monitor) in Soda Cloud, you may find it useful to review sample data from your [dataset]({% link soda/glossary.md %}#dataset) to help you determine the kinds of [tests]({% link soda-sql/tests.md %}) to run when Soda SQL scans your data; see the image below. For this reason, you may wish to configure a **sample metric** in Soda SQL.

Alternatively, you can **Enable Sample Data** directly in your Soda Cloud account. See [Display sample data]({% link soda-cloud/display-samples.md %}).

![sample-data](/assets/images/sample-data.png){:height="650px" width="650px"}


## Add sample metrics

DO NOT use sample data if your dataset contains sensitive information or personally identifiable information (PII).

1. Add a `table_limit` sample metric to your scan YAML file at the table level; refer to Scan YAML Example below. <br />This metric defines the numerical threshold of rows in a dataset that Soda SQL sends to Soda Cloud after it executes a test during a scan. It yields a sample of the data from your dataset in the **Sample Data** tab when you are creating a new monitor; see image above.
2. Save the changes to your scan YAML file, then run a scan on that dataset.
```shell
soda scan warehouse.yml/tables/orders.yml
```
3. In your Soda Cloud account, navigate to the **Monitors** dashboard. Click the stacked-dots icon to **Create Monitor**. Note that in the first step of the guided monitor creation, you can review sample data from your dataset that Soda SQL collected during its last scan of your dataset.

#### Scan YAML Example

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

Using the example scan YAML above, the scan executes both tests against all the data in the dataset, but it only sends a maximum of 50 rows of data and metadata to Soda Cloud for review as sample data when creating a new monitor for the `orders` dataset.

The snippet below displays the CLI output of the query that counts the rows in the dataset; Soda SQL counts 193 rows but only sends 50 as a sample to Soda Cloud.

```shell
  | ...
  | Executing SQL query: 
SELECT * 
FROM "public"."orders" 
LIMIT 50;
  | SQL took 0:00:00.074957
  | Sent sample orders.sample (50/193) to Soda Cloud
  | ...
```


## Go further

- Read more about [failed row]({% link soda-cloud/failed-rows.md %}) samples in Soda Cloud.
- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a free Soda Cloud account.
- [Create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud.
- Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.