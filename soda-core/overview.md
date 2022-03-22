---
layout: default
title: Soda Core overview
description: Soda Core (Beta) is a free, open-source, command-line tool that enables you to use the Soda Check Language (Beta) to turn user-defined input into SQL queries.
sidebar: core
parent: Soda Core (Beta)
---

# Soda Core overview ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Soda Core is a CLI tool and Python library for data reliability.  Soda Core serves as the foundation 
for Soda Cloud, but you can use it as a stand-alone, open source tool. 

Use Soda Core for data quality testing both in and out of your pipeline, for data observability, and for data monitoring.

Soda Core leverages the Soda Checks Language (SodaCL), a human-readable domain-specific language (DSL) for data reliability.

Main features of SodaCL:

* Read and write checks in a human-readable DSL
* Includes dozens of built-in checks
* Includes an anomaly detection check and change-over-time checks

## How it works

Soda Core evaluates checks that you write in a checks YAML file using SodaCL. You can execute a collection of checks files 
in one scan. A scan builds and executes the necessary SQL queries, extracts the metrics, and 
evaluates the checks. Typically, you embed a scan in a data pipeline, or execute scans on a time-based schedule to 
ensure that Soda continuously checks new data.

## SodaCL examples

Row count, missing, invalid, duplicates, and basic aggregates:
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

Schema check:
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

Freshness check:
```yaml
checks for PRODUCTS:
  - freshness using row_added_ts < 1h
```

Reference data check:
```yaml
checks for PRODUCTS:
  - values in organization_key must exist in dim_organization organization_key
```

Dynamic for each checks on multiple tables:
```yaml
for each table T:
  tables: 
    - PRD_%
  checks:
    - row_count > 0
```

Checks with table filters that you can use to check only the most recent data in a table:
```yaml
table filter CUSTOMERS [daily]:
  filter: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2
```

Cross-warehouse row count comparison checks:
```yaml
checks for CUSTOMERS:
  - row_count same as RAW_CUSTOMERS in other_snowflake_data_source
```

## Examples using the metric store

If you connect Soda Core to a free Soda Cloud Developer account, Soda Core pushes scan results to Soda Cloud. Soda Cloud stores the measurements resulting from each check Soda Core executes in the metric store so you can use the following checks:

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

Schema change checks:
```yaml
checks for PRODUCTS:
  - schema:
      warn:
        - when schema changes
```

## Compatibility

Use Soda Core to scan the following data sources:
* Amazon Redshift 
* GCP Big Query
* PostgreSQL
* Snowflake


Next, [install Soda Core]({% link soda-core/get-started.md %}) in your own environment to try it for yourself.

---
{% include docs-core-footer.md %}
