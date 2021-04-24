---
layout: default
title: Scan multiple datasets or tables
parent: Documentation
---

# Scan multiple datasets or tables

You can run a single [scan]({% link soda-sql/documentation/glossary.md %}#scan %}) against different datasets in your environments. For example, you can run the same scan against data in a [warehouse]({% link soda-sql/documentation/glossary.md %}#warehouse) in development environment and data in a warehouse in a production environment.

You can also run a single scan against different [tables]({% link soda-sql/documentation/glossary.md %}#table %}) in your warehouse using [custom metrics]({% link soda-sql/documentation/glossary.md %}#custom-metric). 

## Run a basic scan

{% include run-a-scan.md %}

## Scan multiple datasets

To run the same scan against different datasets, proceed as follows.

1. Prepare one [warehouse YAML file]({% link soda-sql/documentation/warehouse.md %}) for each data warehouse you wish to scan. For example:
* `warehouse_postgres_dev.yml`
```yaml
name: my_postgres_datawarehouse_dev
connection:
  type: postgres
  host: localhost
  port: '5432'
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: dev
  schema: public
```
* `warehouse_postgres_prod.yml`
```yaml
name: my_postgres_datawarehouse_prod
connection:
  type: postgres
  host: dbhost.example.com
  port: '5432'
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: prod
  schema: public
```
2. Prepare a [scan YAML file]({% link soda-sql/documentation/scan.md %}) to define all the tests you wish to run against your datasets. See [Define tests]({% link soda-sql/documentation/tests.md %}) for details.
3. Run separate Soda SQL scans against each dataset by specifying which warehouse YAML to scan and using the same scan YAML file. For example:
```shell
soda scan warehouse_postgres_dev.yml tables/my_table_scan.yml 
soda scan warehouse_postgres_prod.yml tables/my_table_scan.yml
```

## Scan multiple tables

Use a single scan YAML file to run tests on different tables in your warehouse.

Prepare one [scan YAML file]({% link soda-sql/documentation/scan.md %}) to define the tests you wish to apply against multiple tables. Use custom metrics to write SQL queries and subqueries that run against multiple tables. When you run a scan, Soda SQL uses your SQL queries to query data in the tables you specified in your scan YAML file. 

Example coming soon.
<!--
The example below compares today's count of table entries against an average count of entries using historical data in a separate table. Note that the example uses a [filter]({% link soda-sql/documentation/filtering.md %}) to scan data for a specific date.
{% raw %}
```yaml
table_name: current_table
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - ...
sql_metrics:
    - sql: |
        SELECT avg(cnt) as avg_cnt(
            SELECT date, reported_date, count(*) as cnt
            FROM my_history_table
            WHERE to_date(date) = to_date(reported_date)
            GROUP by date, reported_date
        )
            (SELECT count(1) as current_cnt
            FROM current_table
            WHERE date = DATE '{{ date }}')
      tests:
        - current_cnt > (avg_cnt * 0.5)
```
{% endraw %}
-->
## Go further

* See [Example tests by metric]({% link soda-sql/examples/examples-by-metric.md %}) to learn more about defining tests.
* Learn [How Soda SQL works]({% link soda-sql/documentation/concepts.md %}).
* Learn more about [Metrics]({% link soda-sql/documentation/sql_metrics.md %}).
* Learn how to [apply dynamic filters]({% link soda-sql/documentation/filtering.md %}) to your scan.