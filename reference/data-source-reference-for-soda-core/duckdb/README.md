---
description: Access configuration details to connect Soda to a DuckDB data source.
---

# DuckDB

Soda supports DuckDB as a flexible, lightweight SQL engine that can be used with native `.duckdb` files, in-memory data, or external dataframes such as Pandas and Polars.

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-duckdb
```

#### Data source YAML

```yaml
type: duckdb 
name: my_duckdb
connection: 
    database: "adventureworks.duckdb" # or a supported file path like "dim_employee.parquet"
```

DuckDB also supports registering in-memory data frames from **Pandas** or **Polars** and creating temporary tables for contract testing. You can run Soda contracts against these datasets by passing the live DuckDB cursor to `DuckDBDataSource.from_existing_cursor` as described in the following page:

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")
