---
description: >-
  This page lists the supported data source types and their required connection
  parameters for use with Soda Core.
---

# Data source reference for Soda Core

Soda uses the official Python drivers for each supported data source. The configuration examples below include the default required fields, but you can extend them with any additional parameters supported by the underlying driver.

Each data source configuration must be written in a YAML file and passed as an argument using the CLI or Python API.

## General Guidelines

* Each configuration must include `type`, `name`, and a `connection` block.
* Use the exact structure required by the underlying Python driver.
* Test the connection before using the configuration in a contract.

```bash
soda data-source test -ds ds.yml
```

***

#### Connect to a data source already onboarded in Soda Cloud (via Soda Agent)

You can run verifications using Soda Core (local execution) or a Soda Agent (remote execution). To ensure consistency and compatibility, you must use the same data source name in both your local configuration for Soda Core and in Soda Cloud. See: [onboard-datasets-on-soda-cloud](../../onboard-datasets-on-soda-cloud/ "mention")

This matching by name ensures that the data source is recognized and treated as the same across both execution modes, whether you’re running locally in Soda Core or remotely via a Soda Agent.

***

#### Onboard a data source in Soda Cloud after using Soda Core

It’s also possible to onboard a data source to Soda Cloud and a Soda Agent after it was onboarded using Soda Core.

> To learn how: [onboard-datasets-on-soda-cloud](../../onboard-datasets-on-soda-cloud/ "mention")



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

> For Soda to run quality scans on your data, you must configure it to connect to your data source.\
> To learn how to set up Soda from scratch and configure it to connect to your data sources, see Soda's [quickstart.md](../../quickstart.md "mention").

***

## Supported data sources

|                                                                   |                                                                      |                                                                  |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="bigquery/" class="button secondary">BigQuery</a>         | <a href="pandas.md" class="button secondary">Pandas</a>              | <a href="sql-server.md" class="button secondary">SQL Server</a>  |
| <a href="databricks.md" class="button secondary">Databricks</a>   | <a href="polars.md" class="button secondary">Polars</a>              | <a href="snowflake.md" class="button secondary">Snowflake</a>    |
| <a href="duckdb/" class="button secondary">DuckDB</a>             | <a href="postgresql.md" class="button secondary">PostgreSQL</a>      | <a href="synapse.md" class="button secondary">Synapse</a>        |
| <a href="microsoft-fabric.md" class="button secondary">Fabric</a> | <a href="amazon-redshift-1.md" class="button secondary">Redshift</a> | <a href="amazon-redshift.md" class="button secondary">Athena</a> |

