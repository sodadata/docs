---
layout: default
title: Configure Soda Core
description: Create a configuration YAML file to configure connection details for Soda Core (Beta) to access your data source. 
sidebar: core
parent: Soda Core (Beta)
---

# Configure Soda Core ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Create a configuration YAML file to configure connection details for Soda Core to access your data source. Store the `configuration.yml` as a hidden file in your local user home directory: `~/.soda/configuration.yml`. When you execute a scan, Soda Core uses that path and filename by default to find the configuration YAML and use the information within to connect to your data source.

To set the data source configurations, use the following example configurations that correspond to each kind of data source that Soda Core supports.

[Connect to Amazon Redshift](#connect-to-amazon-redshift)<br />
[Connect to GCP BigQuery](#connect-to-gcp-bigquery)<br />
[Connect to PostgreSQL](#connect-to-postgresql)<br />
[Connect to Snowflake](#connect-to-snowflake)<br />
[Add prefixes to tables](#add-prefixes-to-tables)<br />
[Connect Soda Core to Soda Cloud](#connect-soda-core-to-soda-cloud)<br />
<br />

## Connect to Amazon Redshift

```yaml
data_source my_database_name:
  type: redshift
  connection:
    host: db
    username: 
    password:  
  database: soda_test
  schema: public
  access_key_id: 
  secret_access_key:
  role_arn:
  region: eu-west-1
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type    | required |  |
| host |  required |   |
| username  |  required |  |
| password  |  required |  |
| database  | required |  |
| schema    |  |  |
| access_key_id  | optional | Use environment variables to retrieve this value securely. |
| secret_access_key  | optional | Use environment variables to retrieve this value securely. |
| role_arn| optional | The [Amazon Resource Name](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-role_arn.html) of an IAM role that you want to use. |
| region | optional |  |

Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Amazon Redshift Authorization parameters](https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html) for details.

### Supported data types

| Category | Data type | 
| ---- | --------- |
| text | CHARACTER VARYING, CHARACTER, CHAR, TEXT, NCHAR, NVARCHAR, BPCHAR |
| number | SMALLINT, INT2, INTEGER, INT, INT4, BIGINT, INT8 |
| time | DATE, TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ |

## Connect to GCP BigQuery

```yaml
data_source my_database_name:
  type: bigquery
  connection:
    account_info_json: '{
        "type": "service_account",
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "...@project.iam.gserviceaccount.com",
        "client_id": "...",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}'
    auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
    dataset: sodacore
```

| Property |  Required | 
| -------- |  -------- | 
| type | required | 
| project_id | required | 
| private_key_id | required |
| private_key | required |
| client_email | required |
| client_id | required |
| auth_uri | required |
| token_uri | required |
| auth_provider_x509_cert_url | required |
| client_x509_cert_url | required | 
| auth_scopes | optional; Soda applies the three scopes listed above by default |
| dataset | required |

### Supported data types

| Category | Data type | 
| ---- | --------- |
| text | STRING |
| number | INT64, DECIMAL, BINUMERIC, BIGDECIMAL, FLOAT64 |
| time | DATE, DATETIME, TIME, TIMESTAMP |


## Connect to PostgreSQL

```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: db
    username:  
    password:  
  database: postgres
  schema: public
```

| Property |  Required | Notes |
| -------- |  -------- | ----- |
| type | required |  |
| host| required |  |
| username| required | Use environment variables to retrieve this value securely.|
| password| required | Use environment variables to retrieve this value securely.|
| database| required |  |
| schema | required | |

### Supported data types

| Category | Data type | 
| ---- | --------- |
| text | CHARACTER VARYING, CHARACTER, CHAR, TEXT |
| number | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL |
| time | TIMESTAMPT, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |


## Connect to Snowflake

```yaml
data_source orders:
  type: snowflake
  connection:
    username: "SODATESTING"
    password: "abc123"
    account: sodadatapartner.eu-central-1
    database: SNOWFLAKE_SAMPLE_DATA
    schema: PUBLIC
    warehouse:
    connection_timeout:
    role: PUBLIC
    client_session_keep_alive:
  session_parameters:
    QUERY_TAG: soda-queries
    QUOTED_IDENTIFIERS_IGNORE_CASE: false
```

| Property | Required | Notes |
| --------  | -------- | -----|
| type  | required |  The name of your Snowflake virtual data source. |
| username | required | Use environment variables to retrieve this value securely. |
| password | optional | Use environment variables to retrieve this value securely using `env_var(SNOWFLAKE_PASSWORD)`. |
| account | required |   |
| database | required |  |
| schema | required |  |
| warehouse | required |   |
| connection_timeout | required |   |
| role | optional | See <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Roles</a> for details.|
| QUERY_TAG | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag" target="_blank">QUERY_TAG</a> in Snowflake documentation. |
| QUOTED_IDENTIFIERS_IGNORE_CASE | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case" target="_blank">QUOTED_IDENTIFIERS_IGNORE_CASE</a> in Snowflake documentation. |


### Supported data types

| Category | Data type | 
| ---- | --------- |
| text | CHAR, VARCHAR, CHARACTER, STRING, TEXT |
| number | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ |


## Add prefixes to tables

To assist in identifying details when Soda Core scans your data with the verbose option, you can add a prefix to the name of a table with the name of a database or schema. Use the data source property `table_prefix` according to the following example.

```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: db
    username:  
    password:  
  database: postgres
  schema: public
  table_prefix: "public"
```

If you have configured the `table_prefix` property, a check for `row_count` yields scan output that reveals the table prefix information: `FROM public.CUSTOMERS`.

Checks YAML file:
```yaml
checks for "CUSTOMERS":
  - row_count > 0
```

Soda scan output, with `-V` option for verbose mode:
```shell
soda scan -d adventureworks -V -c configuration.yml checks.yml
```

Soda scan output:

```shell
Soda Core 0.0.x
Reading configuration file "configuration.yml"
Reading SodaCL file "checks.yml"
Scan execution starts
Query adventureworks.CUSTOMERS.aggregation[0]:
SELECT 
  COUNT(*) 
FROM public.CUSTOMERS
Scan summary:
1/1 query OK
  adventureworks.CUSTOMERS.aggregation[0] [OK] 0:00:00.035515
1/1 check PASSED: 
    CUSTOMERS in adventureworks
      row_count > 0 [PASSED]
        check_value: 99
All is good. No failures. No warnings. No errors.
```

## Connect Soda Core to Soda Cloud

1. If you have not already done so, create a free Soda Cloud Developer account at <a href="cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a>. 
2. To your `configuration.yml`, and adding the following:
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key: 
  api_secret: 
```
3. In your Soda Cloud account, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_secret`.
4. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in Soda Cloud.

The next time you execute a scan in Soda Core, it pushes the scan results to Soda Cloud where you can view the results in the **Monitors** dashboard. Refer to [Soda Cloud documentation]({% link soda-cloud/overview.md %}) for more information.

---
{% include docs-core-footer.md %}
