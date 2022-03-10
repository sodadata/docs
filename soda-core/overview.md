---
layout: default
title: Soda Core overview
description: 
sidebar: core
parent: Soda Core
---

# Soda Core overview

Soda Core is a CLI tool and python library for data reliability.  Soda Core serves as the foundation 
for Soda Cloud, but it is also usable as a standalone, open source tool. 

It's used for data quality testing both in and out of pipeline, data observability and data monitoring.

SodaCL enables **Data Reliability as Code**.

Main features:

* Easy read and write checks
* Loads of check types
* Includes anomaly detection & change over time checks

## How it works

Soda Core evaluates checks that are written in SodaCL, Soda's checks language. A collection of SodaCL files 
can be executed in one scan. A scan will build and execute the necessary queries, extract the metrics and 
evaluate the checks. A scan is typically embedded into a data pipeline or executed on a time based schedule to 
ensure that new data is continuously checked.

## SodaCL examples

Basics: Row count, missing, invalid, duplicates and basic aggregates:
```yaml
checks for PRODUCTS:
  - row_count between 10 and 1000
  - missing_count(unit_cost) = 0
  - invalid_count(unit_cost) = 0
      valid min: 0.01
      valid max: 10000
  - invalid_percent(movement_date) < 1 %:
      valid format: date us
  - sum(units_in) > 50
  - duplicate_count(country, zip) = 0
```

Schema checking example
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
```

Reference data
```yaml
checks for PRODUCTS:
  - reference from (organization_key) to dim_organization (organization_key)
```

Run checks dynamically on multiple tables
```yaml
for each table T:
  tables: 
    - PRD_%
  checks:
    - row_count > 0
```

Support for table filters, typically used to check only the most recent data that was just produced.
```yaml
table filter CUSTOMERS [daily]:
  filter: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```

Cross warehouse row count comparison:
```yaml
checks for CUSTOMERS:
  - row_count same as RAW_CUSTOMERS in other_snowflake_data_source
```

## Examples using the metric store

When connecting Soda Core to a free Soda Cloud developer account, you have a metric store integrated 
and that also enables following extra check types:

Change over time checks:
```yaml
checks for PRODUCTS:
  - change for row_count < 50
  - change avg last 7 for row_count < 50
```

Anomaly detection checks:
```yaml
checks for PRODUCTS:
  - row_count anomaly detection
```

Schema changes:
```yaml
checks for PRODUCTS:
  - schema:
      warn:
        - when schema changes
```

## Compatibility

Use Soda Core to scan a variety of data sources:

| Available | Coming soon | Roadmapped (experimental) |
| --------- | ----------- | --------------------------|
|PostgreSQL <br />Snowflake <br />GCP Big Query|Amazon Redshift  <br />Apache Spark  <br />Amazon Athena  | MySQL  <br />Microsoft SQL Server  <br />Apache Hive  <br />Trino |



And deploy it in a variety of environments:

| In orchestration tools | As a managed service	| Programmatically |
| ---------------------- | -------------------- | ---------------- |
| Airflow (coming soon)<br />Prefect (coming soon) <br />Dagster (coming soon) | Using Soda Cloud & Soda Agent |Python <br />PySpark |

Next, [install it on your own laptop to try it for yourself]({% link soda-core/get-started.md %}).

---
{% include docs-core-footer.md %}
