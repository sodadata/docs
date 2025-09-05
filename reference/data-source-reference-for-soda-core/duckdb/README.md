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

#### Contract YAML

```yaml
dataset: datasource/main/adventureworks

columns:
  - name: id
    checks:
      - missing:
  - name: name
    checks:
      - missing:
          threshold:
            metric: percent
            must_be_less_than: 10
  - name: size
    checks:
      - invalid:
          valid_values: ['S', 'M', 'L']

checks:
  - schema:
  - row_count: 
```

DuckDB supports registering in-memory dataframes from **Pandas** or **Polars** and creating temporary tables for contract testing. You can run Soda contracts against these datasets by passing the live DuckDB cursor to `DuckDBDataSource.from_existing_cursor`.&#x20;

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")
