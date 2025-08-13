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

## BigQuery

A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do.

* In the context of Soda, a [dataset](broken-reference) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, or a DataFrame in a Spark application.
* In the context of BigQuery, a [dataset](https://cloud.google.com/bigquery/docs/datasets-intro) is “a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset…”

Instances of "dataset" in Soda documentation always reference the former.

#### Connection configuration reference

Install package: `soda-bigquery`

```yaml
# Service Account Key authentication method
# See Authentication methods below for more config options
data_source my_datasource_name:
  type: bigquery
  account_info_json: '{
      "type": "service_account",
      "project_id": "gold-platform-67883",
      "private_key_id": "d0121d000000870xxx",
      "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
      "client_email": "abc333@project.iam.gserviceaccount.com",
      "client_id": "XXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
    }'
  auth_scopes:
  - https://www.googleapis.com/auth/bigquery
  - https://www.googleapis.com/auth/cloud-platform
  - https://www.googleapis.com/auth/drive
  project_id: "platinum-platform-67883"
  dataset: sodacore
```

> **Notes**: See [Google BigQuery Integration parameters](https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-big-query#integration_parameters)

<table data-header-hidden><thead><tr><th>Property</th><th width="100">Required</th><th>Notes</th></tr></thead><tbody><tr><td>type</td><td>required</td><td>Identify the type of data source for Soda.</td></tr><tr><td>account_info_json</td><td>required</td><td>The integration parameters for account info are listed below. If you do not provide values for the properties, Soda uses the Google application default values.</td></tr><tr><td>type</td><td>required</td><td>This the type of BigQuery account. Default: <code>service_account</code></td></tr><tr><td>project_id</td><td>required</td><td>This is the unique identifier for the project in your console. See <a href="https://support.google.com/googleapi/answer/7014113?hl=en">Locate the project ID</a>.</td></tr><tr><td>private_key_id</td><td>required</td><td>A unique identifier that you generate in your console. See <a href="https://cloud.google.com/docs/authentication/api-keys?sjid=11146678289001295316-NC">Create an API key</a>.</td></tr><tr><td>private_key</td><td>required</td><td>A unique identifier that you generate in your console. See <a href="https://cloud.google.com/docs/authentication/api-keys?sjid=11146678289001295316-NC">Create an API key</a>.</td></tr><tr><td>client_email</td><td>required</td><td>Also known as the service account ID, find this value in the IAM &#x26; Admin > Service Accounts > Details tab in your Google Cloud Console.</td></tr><tr><td>client_id</td><td>required</td><td>Your unique ID, find this value in the IAM &#x26; Admin > Service Accounts > Details tab in your Google Cloud Console.</td></tr><tr><td>auth_uri</td><td>required</td><td>BigQuery's authentication URI to which you send auth credentials. Default: <code>https://accounts.google.com/o/oauth2/auth</code></td></tr><tr><td>token_uri</td><td>required</td><td>BigQuery's token URI to which you send access tokens. Default: <code>https://oauth2.googleapis.com/ token</code></td></tr><tr><td>auth_provider_x509_cert_url</td><td>required</td><td>BigQuery's public x509 certificate URL that it uses to verify the JWT signed by the authentication provider. Default: <code>https://www.googleapis.com/ oauth2/v1/certs</code></td></tr><tr><td>client_x509_cert_url</td><td>required</td><td>BigQuery's public x509 certificate URL that it uses to verify the JWT signed by the client.</td></tr><tr><td>auth_scopes</td><td>optional</td><td>Soda applies three <a href="https://developers.google.com/identity/protocols/oauth2/scopes">OAuth 2.0 scopes</a>:<br>• <code>https://www.googleapis.com/auth/bigquery</code> to view and manage your data in BigQuery<br>• <code>https://www.googleapis.com/auth/cloud-platform</code> to view, configure, and delete your Google Cloud data<br>• <code>https://www.googleapis.com/auth/drive</code> to view and add to the record of file activity in your Google Drive</td></tr><tr><td>project_id</td><td>optional</td><td>Add an identifier to override the <code>project_id</code> from the <code>account_info_json</code></td></tr><tr><td>storage_project_id</td><td>optional</td><td>Add an identifier to use a separate BigQuery project for compute and storage.</td></tr><tr><td>dataset</td><td>required</td><td>The identifier for your BigQuery dataset, the top-level container that is used to organize and control access to your tables and views.</td></tr></tbody></table>

> Go to [Connect Soda to GCP BigQuery](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/data-source-reference/connect-bigquery "mention") for more information about BigQuery connections.

***

## Databricks

Install the following package:

```
pip install -i https://pypi.dev.sodadata.io/simple -U soda-databricks
```

#### Data source YAML

```yaml
type: databricks
name: databricks
connection:
  host:
  http_path:
  catalog: "unity_catalog"
  access_token: 
```

You can use the Soda Library packages for Apache Spark to connect to Databricks SQL or to use Spark DataFrames on Databricks.

* Refer to [Connect to Spark for Databricks SQL](broken-reference).
* Refer to [Use Soda Library with Spark DataFrames on Databricks](broken-reference).\
  🎥 Watch a video that demonstrates how to add Soda to your Databricks pipeline: [https://go.soda.io/soda-databricks-video](https://go.soda.io/soda-databricks-video)

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
name: datasource
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

| Property     | Required | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | required | Identify the type of data source for Soda.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| database     | required | <p>Identify the location of the <a href="https://duckdb.org/docs/connect">duckdb database</a>. Refer to DuckDB documentation for details on <a href="https://duckdb.org/docs/api/python/overview#persistent-storage">persistent storage</a> and <a href="https://duckdb.org/docs/api/cli.html#getting-started">how to create a .db file</a>. This can also be a <a href="broken-reference">MotherDuck database</a>.<br>Some users have reported issues using the <code>database</code> key, but have been successful using <code>path</code> instead.</p> |
| read\_only   | required | Indicate users’ access by providing a boolean value: `true` or `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| schema\_name | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

DuckDB supports registering in-memory dataframes from **Pandas** or **Polars** and creating temporary tables for contract testing. You can run Soda contracts against these datasets by passing the live DuckDB cursor to `DuckDBDataSource.from_existing_cursor`.&#x20;

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")

***

## PostgreSQL

Install the package `soda-postgres`:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-postgres
```

#### Data source YAML

```yaml
data_source my_datasource_name:
  type: postgres
  host: db
  port: "5432"
  username: soda
  password: secret
  database: postgres
  schema: public
  sslmode: prefer
```

| Property | Required | Notes                                                                                                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type     | required | Identify the type of data source for Soda.                                                                                                                                                       |
| host     | required | Provide a host identifier.                                                                                                                                                                       |
| port     | required | Provide a port identifier.                                                                                                                                                                       |
| username | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| password | required | Consider using system variables to retrieve this value securely.                                                                                                                                 |
| database | required | Provide an identifier for your database.                                                                                                                                                         |
| schema   | optional | Provide an identifier for the schema in which your dataset exists.                                                                                                                               |
| sslmode  | optional | <p>Provide a value to indicate the type of SSL support:<br><code>prefer</code><br><code>require</code><br><code>allow</code><br><code>diable</code><br>Default value is <code>prefer</code>.</p> |

> Go to [Connect Soda to PostgreSQL](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/data-source-reference/connect-postgres "mention") for more information about PostgreSQL connections.

***

## Snowflake

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-snowflake
```

#### Data source YAML

```yaml
data_source my_datasource_name:
  type: snowflake
  host: localhost
  port: 5432
  username: ${SNOWFLAKE_USER}
  password: ${SNOWFLAKE_PASSWORD}
  account: ${SNOWFLAKE_ACCOUNT}
  database: soda
  warehouse: soda_wh
  connection_timeout: 240
  role: PUBLIC
  client_session_keep_alive: true
  authenticator: externalbrowser
  session_params:
    QUERY_TAG: soda-queries
    QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```

| Property                                  | Required | Notes                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                                      | required | Identify the type of data source for Soda.                                                                                                                                                                                                                                                      |
| host                                      | optional | Provide host at which to connect to the data source.                                                                                                                                                                                                                                            |
| port                                      | optional | Provide the port through which to connect to the data source.                                                                                                                                                                                                                                   |
| username                                  | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`.                                                                                                                                                                                        |
| password                                  | required | Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`.                                                                                                                                                                                    |
| account                                   | required | Provide the unique value that identifies your account. Consider using system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`. Note: Account sometimes needs to take the form of `<account_identifier>-<account_name>` or `<account_identifier>.<region>`.  |
| database                                  | required | Provide an idenfier for your database.                                                                                                                                                                                                                                                          |
| warehouse                                 | required | Provide an identifier for the cluster of resources that is a Snowflake virtual warehouse. See [Overview of Warehouses](https://docs.snowflake.com/en/user-guide/warehouses-overview).                                                                                                           |
| connection\_timeout                       | required | Set the timeout period in seconds for an inactive login session.                                                                                                                                                                                                                                |
| role<sup>1</sup>                          | optional | Specify a Snowflake role that has permission to access the `database` and `schema` of your data source.                                                                                                                                                                                         |
| client\_session\_keep\_alive              | optional | Use this parameter to keep the session active, even with no user activity. Provide a boolean value: `true` or `false`                                                                                                                                                                           |
| authenticator<sup>2</sup>                 | optional | Add an authenticator paramater with value `externalbrowser` to authenticate the connection to your Snowflake data source using any SAML 2.0-compliant identity provider (IdP) such as Okta or OneLogin.                                                                                         |
| other params                              | optional | You can pass any other Snowflake paramters you wish by adding the key:value pairs to your Snowflake connection configuration. See [Snowflake Python Connector API documentation](https://docs.snowflake.com/en/user-guide/python-connector-api.html#connect) for a list of passable parameters. |
| QUERY\_TAG                                | optional | See [QUERY\_TAG](https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag) in Snowflake documentation.                                                                                                                                                                             |
| <p>QUOTED_IDENTIFIERS_<br>IGNORE_CASE</p> | optional | See [QUOTED\_IDENTIFIERS\_IGNORE\_CASE](https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case) in Snowflake documentation.                                                                                                                                 |
| schema                                    | required | Identify the schema in the data source in which your tables exist.                                                                                                                                                                                                                              |

<sup>1</sup> Though optional, best practice dictates that you provide a value for `role`. If you do not provide a role, and Snowflake has not assigned a [Snowflake System-Defined Role](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles) to the user account, Snowflake may, confusingly, deny access to the data source.

<sup>2</sup> Use this parameter when adding Snowflake connection configurations to a `configuration.yml` file. However, if you are adding connection configuration details directly in Soda Cloud (connecting to your Snowflake data source via a Soda Agent) to authenticate using Okta, you must follow the instructions documented by Snowflake for [Native SSO - Okta Only](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-use.html#native-sso-okta-only).

> Go to [Connect Soda to Snowflake](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/data-source-reference/connect-snowflake "mention") for more information about Snowflake connections.

***

### Pandas

You can run contracts on Pandas dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")

> Go to [Connect Soda to Dask and Pandas](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/data-source-reference/connect-dask "mention") for more information about Pandas connections.

***

### Polars

You can run contracts on Polars dataframes by registering them in DuckDB as in-memory tables.

> Learn more: [duckdb-advanced-usage.md](duckdb-advanced-usage.md "mention")
