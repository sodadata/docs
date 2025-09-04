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

***

## BigQuery

A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do.

* In the context of Soda, a [dataset](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/learning-resources/glossary#dataset) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, or a DataFrame in a Spark application.
* In the context of BigQuery, a [dataset](https://cloud.google.com/bigquery/docs/datasets-intro) is “a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset…”

Instances of "dataset" in Soda documentation always reference the former.

#### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-bigquery
```

Data source YAML

```yaml
# Option A — Service Account
type: bigquery
name: my_bigquery
connection:
  account_info_json: ${BQ_SERVICE_ACCOUNT_JSON}  # full JSON string. SEE NOTE
  dataset: <your_dataset>
  
  # optional
  auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
  project_id: <your-project-id>  # Defaults to the one embedded in credentials
  storage_project_id: <your-storage-project>
  location: <your-location>  # Defaults to the specified project's location
  client_options: 
  kabels: 
  impersonation_account:
  delegates:
  use_context_auth: False     # if set to True, Application Default Credentials
                              # will be used and other credentials passed in will be ignored
```

```yaml
# Option B — ADC (no key in config)
type: bigquery
name: my_bigquery
connection:
  account_info_json_path: /path/to/service-account.json  # SEE NOTE
  dataset: <your_dataset>
  
  # optional
  auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
  project_id: <your-project-id>  # Defaults to the one embedded in credentials
  storage_project_id: <your-storage-project>
  location: <your-location>  # Defaults to the specified project's location
  client_options: 
  kabels: 
  impersonation_account:
  delegates:
  use_context_auth: False     # if set to True, Application Default Credentials
                              # will be used and other credentials passed in will be ignored
```

{% hint style="info" %}
**Note:** Set `use_context_auth=True` to use application default credentials, in which case `account_info_json` or `account_info_json_path` are not necessary.
{% endhint %}

> * See [Google BigQuery Integration parameters](https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-big-query#integration_parameters)
> * See[ BigQuery's locations documentation](https://cloud.google.com/bigquery/docs/locations) to learn more about `location`.

***

## Databricks

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-databricks
```

#### Data source YAML

```yaml
type: databricks
name: my_databricks
connection:
  host: <server-hostname>
  http_path: <http-path>
  catalog: <unity-catalog>

  # optional
    warehouse:
    session_configuration:
    field_mapping: 
```

***

## DuckDB

Soda supports DuckDB as a flexible, lightweight SQL engine that can be used with native `.duckdb` files, in-memory data, or external dataframes such as Pandas and Polars.

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

***

## Microsoft Fabric

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-fabric
```

#### Data source YAML

```yaml
type: fabric
name: my_fabric
connection:
  host: <your-fabric-sql-endpoint>
  user: ${env.USER}          # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE
  database: <your_db>
  
  # optional
  port: 1433
  trusted_connection: false
  encrypt: true
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}

## Pandas

You can run contracts on Pandas dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")

***

## Polars

You can run contracts on Polars dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")

***

## PostgreSQL

Install the package `soda-postgres`:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

#### Data source YAML

```yaml
type: postgres
name: my_postgres
connection:
  user: ${env.USERNAME}
  host: <your-postgresql-host>
  port: 5432
  password: ${env.PASSWORD}
  database: <your_database>
```

***

## Amazon Redshift

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-redshift
```

#### Data source YAML

```yaml
type: redshift
name: my_redshift
connection:
  host: <your-redshift-hostname>
  port: 5439
  database: <your_database>
  user: ${env.USER}
  
  # optional
  password: ${env.PASSWORD}
  access_key_id: ${AWS_ACCESS_KEY_ID}
  secret_access_key: ${AWS_SECRET_ACCESS_KEY}
  session_token: ${AWS_SESSION_TOKEN}
  role_arn: <arn:aws:iam::123456789012:role/MyRole>
  region: us-east-1
  profile_name: <my_aws_profile>
  cluster_identifier: <my-redshift-cluster>
```

## SQL Server

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-sqlserver
```

#### Data source YAML

```yaml
type: sqlserver
name: my_sqlserver
connection:
  host: <your-sqlserver-hostname>
  port: 1433
  database: <your_database>
  user: ${env.USER}          # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE

  # optional
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql     # sql | activedirectoryinteractive | activedirectorypassword |
                          # activedirectoryserviceprincipal | activedirectory | auto |
                          # cli | environment | synapsespark | fabricspark |
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}

## Snowflake

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-snowflake
```

#### Data source YAML

```yaml
type: snowflake
name: my_snowflake
connection:
  account: <your_account>
  database: <your_database>
  warehouse: <your_warehouse>
  user: ${env.USERNAME}
  
  # If using username/password authentication
  password: ${env.PASSWORD}
  
  # If using private key authentication
  authenticator: SNOWFLAKE_JWT
  private_key: ${env.PRIVATE_KEY}
  private_key_passphrase: ${env.PRIVATE_KEY_PASSPHRASE}
  # or
  authenticator: SNOWFLAKE_JWT
  private_key_path: /path/to/rsa_key.p8 
  private_key_passphrase: ${env.PRIVATE_KEY_PASSPHRASE}

  # optional
  role: <your_role>
```

{% hint style="info" %}
Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a [Snowflake System-Defined Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles) to the user account, Snowflake may, confusingly, deny access to the data source.
{% endhint %}

## Synapse

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-synapse
```

#### Data source YAML

```yaml
type: synapse
name: my_synapse
connection:
  host: <your-server>
  port: 1433
  database: <your_database>
  username: ${env.USERNAME}  # SEE NOTE
  password: ${env.PASSWORD}  # SEE NOTE

  # optional
  trusted_connection: false
  encrypt: true
  trust_server_certificate: false
  driver: ODBC Driver 18 for SQL Server
  scope: DW
  connection_parameters:
    multi_subnet_failover: true
  authentication: sql  # sql | activedirectoryinteractive | activedirectorypassword | 
                       # activedirectoryserviceprincipal | activedirectory | auto | 
                       # cli | environment | synapsespark | fabricspark
```

{% hint style="info" %}
**Note:** depending on the authentication method that is used,  `user` and `password` may not be required (e.g. `activedirectoryserviceprincipal` requires `client_id` and `client_secret`).
{% endhint %}
