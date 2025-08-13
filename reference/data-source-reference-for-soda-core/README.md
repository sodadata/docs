# Data source reference for Soda Core

This page lists the supported data source types and their required connection parameters for use with Soda Core.

Soda uses the official Python drivers for each supported data source. The configuration examples below include the default required fields, but you can extend them with any additional parameters supported by the underlying driver.

Each data source configuration must be written in a YAML file and passed as an argument using the CLI or Python API.

### General Guidelines

* Each configuration must include `type`, `name`, and a `connection` block.
* Use the exact structure required by the underlying Python driver.
* Test the connection before using the configuration in a contract

```
soda data-source test -ds ds.yml
```

***

#### Connect to a Data Source Already Onboarded in Soda Cloud (via Soda Agent)

You can run verifications using Soda Core (local execution) or a Soda Agent (remote execution). To ensure consistency and compatibility, you must use the same data source name in both your local configuration for Soda Core and in Soda Cloud. See: [onboard-datasets-on-soda-cloud](../../onboard-datasets-on-soda-cloud/ "mention")

This matching by name ensures that the data source is recognized and treated as the same across both execution modes, whether you’re running locally in Soda Core or remotely via a Soda Agent.

***

#### Onboard a Data Source in Soda Cloud After Using Soda Core

It’s also possible to onboard a data source to Soda Cloud and a Soda Agent after it was onboarded using Soda Core.

\
To learn how: [onboard-datasets-on-soda-cloud](../../onboard-datasets-on-soda-cloud/ "mention")



#### Using Environment Variables

You can reference environment variables in your data source configuration. This is useful for securely managing sensitive values (like credentials) or dynamically setting parameters based on your environment (e.g., dev, staging, prod).

**Example:**

```yaml
type: postgres
name: postgres
connection:
  host:
  port:
  database:
  user: ${env.SNOWFLAKE_USERNAME}
  password: ${env.SNOWFLAKE_PASSWORD}
```

Environment variables must be available in the runtime environment where Soda is executed (e.g., your terminal, CI/CD runner, or Docker container).



***

### PostgreSQL

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

\
Data source YAML

```
type: postgres
name: postgres
connection:
  host:
  port:
  user:
  password:
  database:
```

***

### Snowflake

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-snowflake
```

\
Data source YAML

```
type: snowflake
name: snowflake
connection:
  host:
  account:
  user:
  password:
  database:
```

***

### Databricks

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-databricks
```

\
Data source YAML

```
type: databricks
name: databricks
connection:
  host:
  http_path:
  catalog: "unity_catalog"
  access_token:
```

***

### DuckDB

Soda supports DuckDB as a flexible, lightweight SQL engine that can be used with native `.duckdb` files, in-memory data, or external dataframes such as Pandas and Polars.

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-duckdb
```

Data source YAML

```yaml
type: duckdb 
name: datasource
connection: 
    database: "adventureworks.duckdb" # or a supported file path like "dim_employee.parquet"
```

Contract YAML

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

***

### Polars

You can run contracts on Polars dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")

***

### Pandas

You can run contracts on Pandas dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")
