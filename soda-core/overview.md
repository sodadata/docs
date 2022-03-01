---
layout: default
title: Soda Core overview
description: 
sidebar: core
parent: Soda Core
---

# Soda Core overview

Soda Core is a CLI tool and python library for data reliability.

It's used for data reliability as code

* Data quality testing, both in and out of pipeline
* Produce live data docs
* Data monitoring and data observability
* Enabling analysts to express data usage assumptions self-serve

Main features:

* Easy to learn language
* Support for all common
* Check your data anywhere
* Anomaly detection
* Compares row counts across data sources
* Change over time testing
* Automated monitoring
* Easy to enable a persistent metrics store

## How it works

Soda Core evaluates checks that are written in SodaCL, Soda's checks language. A collection of SodaCL files can be executed in one scan. A scan will build and execute the necessary queries, extract the metrics and evaluate the checks. A scan is typically embedded into a data pipeline or executed on a time based schedule to ensure that new data is continuously checked.

## Data quality examples

Hello world: The most basic SodaCL checks involve missing values, validity & duplicates:
```yaml
checks for PRODUCTS:
  - invalid(unit_cost) = 0
      valid min: 0.01
      valid max: 10000
  - invalid(movement_date) = 0:
      valid format: date us
  - sum(units_in) > 50
```

Schema checking
```yaml
checks for PRODUCTS:
  - schema:
      fail:
        when required column missing: [finance_key]
        when wrong column type:
          date_key: integer # use alias when fixed
          amount: double precision # use alias when fixed
        when wrong column index:
          finance_key: 0
        when forbidden column present: ["pii_*"]
      warn:
        when forbidden column present: [deprecated_col]
```

Freshness
```yaml
checks for PRODUCTS:
  - freshness using row_added_ts < 1h
Duplicates

checks for PRODUCTS:
  - duplicates(date_key, account_key) = 0
checks for PRODUCTS:
  - reference from (organization_key) to dim_organization (organization_key)
```

Run checks dynamically on multiple tables
```yaml
for each table T:
  tables: 
    - PRD_%
  checks:
    - count > 0
```

Support for table filters
```yaml
table filter CUSTOMERS [daily]:
  filter: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - count = 6
  - missing(cat) = 2
```

## Cross warehouse examples

Cross warehouse row count comparison:
```yaml
checks for CUSTOMERS:
  - count same as RAW_CUSTOMERS in other_snowflake_data_source
```

## Examples using the metric store
And when connecting a free Soda Cloud developer account, you have a metric store integrated and can enable following extra checks:

Change over time checks:
```yaml
checks for PRODUCTS:
  - change for count < 50
  - change avg last 7 for count < 50
```

Keep notified on any schema change:
```yaml
checks for PRODUCTS:
  - schema:
      warn:
        - when schema changes

```
## Automation examples

Even automated monitoring using anomaly detection:
```yaml
automated monitoring:
  tables: ['%']
```

## Compatibility

Use Soda Core to scan a variety of data sources:

| Available | Coming soon | Roadmapped (experimental) |
| --------- | ----------- | --------------------------|
|PostgreSQL <br />Snowflake <br />GCP Big Query|Amazon Redshift  <br />Apache Spark  <br />Amazon Athena  | MySQL  <br />Microsoft SQL Server  <br />Apache Hive  <br />Trino |



And deploy it in a variety of environments:

| In orchestration tools | As a managed service	| Programmatically |
| ---------------------- | -------------------- | ---------------- |
| Airflow<br />Prefect (coming soon) <br />Dagster (coming soon) | Using Soda Cloud & Soda Agent |Python <br />PySpark |

Next, [install it on your own laptop to try it for yourself]({% link soda-core/get-started.md %}).

---
{% include docs-core-footer.md %}