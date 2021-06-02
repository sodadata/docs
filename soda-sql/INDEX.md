---
layout: default
title: Get Started
nav_order: 1
has_children: true
permalink: soda-sql/
---

![soda banner](../assets/images/soda-banner.png){:height="800px" width="800px"}

---

![soda sql](/assets/images/soda-sql-logo.png){:height="200px" width="200px"}

Soda SQL is an open-source command-line tool. It utilizes user-defined input to prepare SQL queries that run tests on tables in a data warehouse to find invalid, missing, or unexpected data. When tests fail, they surface "bad" data that you can fix to ensure that downstream analysts are using "good" data to make decisions.
<br />

[Quick start tutorial](https://docs.soda.io/soda-sql/getting-started/5_min_tutorial.html)<br />
<a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>

## Test your data

If your organization uses data to make decisions, you should always be testing your data. 

- When data comes into a system, you should test it. 
- When data is transformed or otherwise manipulated to fit into an app or other database, you should test it. 
- When data is about to be exported, you should test it. 
- Test to make sure data is unique.
- Test that data is in an expected format, such as date or UUID.
- Test that data doesn’t exceed limits or acceptable parameters. 


## Use Soda SQL

[Install Soda SQL]({% link soda-sql/getting-started/installation.md %}), then complete three basic tasks to start testing your data: 

1. Create and configure a `warehouse.yml` file so that Soda SQL can connect to your data warehouse. 
2. Create and configure a `scan.yml` file to define tests for "bad" data. Choose from a list of predefined metrics to define simple tests – is the table empty? – to more complex tests that borrow from SQL query logic.
3. Run a scan from the command-line to test for "bad" data. Where the tests return “true”, all is well; where a test returns “false”, Soda SQL presents the issues in the command-line output. 

![scan-output-fail](/assets/images/scan-output-fail.png){:height="700px" width="700px"}

[Full configuration instructions](https://docs.soda.io/soda-sql/getting-started/configure.html)


## Show me the metrics!

This example `scan.yml` file defines **four tests** that Soda SQL runs on data in a table in a data warehouse. 


```yaml
metrics:
    - row_count
    - missing_count
    - missing_percentage
    - values_count
    - values_percentage
    - valid_count
    - valid_percentage
    - invalid_count
    - invalid_percentage
    - min
    - max
    - avg
    - sum
    - min_length
    - max_length
    - avg_length
    - distinct
    - unique_count
    - duplicate_count
    - uniqueness
    - maxs
    - mins
    - frequent_values
    - histogram
columns:
    ID:
        metrics:
            - distinct
            - duplicate_count
        valid_format: uuid
        tests:
            duplicate_count == 0
    CATEGORY:
        missing_values:
            - N/A
            - No category
        tests:
            missing_percentage < 3
    SIZE:
        tests:
            max - min < 20
sql_metrics:
    - sql: |
        SELECT sum(volume) as total_volume_us
        FROM CUSTOMER_TRANSACTIONS
        WHERE country = 'US'
      tests:
        - total_volume_us > 5000
```


| Test | Description | Outcome |
| ---- | ----------- | --------------- |
| `tests: duplicate_count == 0` | Tests that there are no duplicate values in the `ID` column of the table. | The test fails if it finds duplicate values.|
| `tests: missing_percentage < 3`| Tests that less than 3% of the values in the `CATEGORY` column match the values set under `missing_values`. | The test fails if more than 3% of the values in the column contain `n/a` or `No category`. |
| `tests: max - min < 20` | Tests that the difference between the highest value and the lowest value in the `SIZE` column is less than 20. | The test fails if the difference exceeds 20. |
| `tests: total_volume_us > 5000` | Tests that the sum total of US transactions in the `CUSTOMER_TRANSACTIONS` column is greater than 5000. | The test fails if the sum total is less than 5000.|

When Soda SQL scans the table, it returns the following scan output in your command-line interface.

```shell
$ soda scan ./soda/metrics my_warehouse my_dataset
Soda 1.0 scan for dataset my_dataset on prod my_warehouse
  | SELECT column_name, data_type, is_nullable
  | FROM information_schema.columns
  | WHERE lower(table_name) = 'customers'
  |   AND table_catalog = 'datasource.database'
  |   AND table_schema = 'datasource.schema'
  - 0.256 seconds
Found 4 columns: ID, NAME, CREATE_DATE, COUNTRY
  | SELECT
  |  COUNT(*),
  |  COUNT(CASE WHEN ID IS NULL THEN 1 END),
  |  COUNT(CASE WHEN ID IS NOT NULL AND ID regexp '\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b' THEN 1 END),
  |  MIN(LENGTH(ID)),
  |  AVG(LENGTH(ID)),
  |  MAX(LENGTH(ID)),
  | FROM customers
  - 0.557 seconds
row_count : 23543
missing   : 23
invalid   : 0
min_length: 9
avg_length: 9
max_length: 9

...more queries...

47 measurements computed
23 tests executed
All is good. No tests failed. Scan took 23.307 seconds
```

## Go further

* **See for yourself!** Follow the [Quick start tutorial](https://docs.soda.io/soda-sql/getting-started/5_min_tutorial.html) to see Soda SQL up and running in five minutes.
* [Install Soda SQL]({% link soda-sql/getting-started/installation.md %}) from your command-line interface.
* Learn the [Basics of Soda SQL]({% link soda-sql/documentation/concepts.md %}#soda-sql-basics).
* Use Soda SQL with your [data orchestration tool]({% link soda-sql/documentation/orchestrate_scans.md %}) to automate data monitoring and testing.
* Use Soda SQL as a stand-alone solution, or [connect to a free Soda Cloud account]({% link soda-sql/documentation/connect_to_cloud.md %}) to use the web app to monitor data quality.
* Help us make Soda SQL even better! Join our [developer community]({% link soda-sql/community.md %}) and [contribute](https://github.com/sodadata/soda-sql/blob/main/CONTRIBUTING.md).

<br />

![soda sql](/assets/images/soda-cloud-logo.png){:height="240px" width="240px"}

Connect Soda SQL to a free **Soda Cloud** account where you and your team can use the web application to monitor test results and collaborate to keep your data issue-free.

* Set up your free Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* Soda SQL can run without Soda Cloud, but Soda Cloud Free and Teams editions depend upon Soda SQL! Install Soda SQL, then [connect it to your Soda Cloud Account]({% link soda-sql/documentation/connect_to_cloud.md %}).
* [Create monitors and alerts]({% link soda-sql/documentation/monitors.md %}) to notify your team about data issues.
* Learn more about [Soda Cloud architecture]({% link soda-sql/documentation/soda-cloud-architecture.md %}).
