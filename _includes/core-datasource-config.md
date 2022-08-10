## Connect to Amazon Athena

```yaml
data_source athena:
  type: athena
  connection:
    access_key_id: 
    secret_access_key: 
    region_name: eu-west-1
    staging_dir: 
    database: 
```

| Property          | Required | Notes                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| type              | required |                                                            |
| access_key_id     | optional | Use system variables to retrieve this value securely. |
| secret_access_key | optional | Use system variables to retrieve this value securely. |
| region_name       | optional |                                                            |
| staging_dir       | required |                                                            |
| database          | required |                                                            |

Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Identity and Access Management in Athena](https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html) for details.

### Supported data types

| Category | Data type                                                       |
| -------- | --------------------------------------------------------------- |
| text     | CHAR, VARCHAR, STRING                                           |
| number   | TINYINT, SMALLINT, INT, INTEGER, BIGINT, DOUBLE, FLOAT, DECIMAL |
| time     | DATE, TIMESTAMP                                                 |

## Connect to Amazon Redshift

```yaml
data_source my_database_name:
  type: redshift
  connection:
    host: db
    username:
    password:
    database: soda_test
    access_key_id:
    secret_access_key:
    role_arn:
    region: eu-west-1
  schema: public
```

| Property          | Required | Notes  |
| ----------------- | -------- | ------ |
| type              | required |                                                                                                                                                  |
| host              | required |                                                                                                                                                  |
| username          | required |                                                                                                                                                  |
| password          | required |                                                                                                                                                  |
| database          | required |                                                                                                                                                  |
| schema            |          |                                                                                                                                                  |
| access_key_id     | optional | Use system variables to retrieve this value securely.                                                                                       |
| secret_access_key | optional | Use system variables to retrieve this value securely.                                                                                       |
| role_arn          | optional | The [Amazon Resource Name](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-role_arn.html) of an IAM role that you want to use. |
| region            | optional |                                                                                                                                                  |

Access keys and IAM role are mutually exclusive: if you provide values for `access_key_id` and `secret_access_key`, you cannot use Identity and Access Management role; if you provide value for `role_arn`, then you cannot use the access keys. Refer to [Amazon Redshift Authorization parameters](https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html) for details.

### Supported data types

| Category | Data type                                                         |
| -------- | ----------------------------------------------------------------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT, NCHAR, NVARCHAR, BPCHAR |
| number   | SMALLINT, INT2, INTEGER, INT, INT4, BIGINT, INT8                  |
| time     | DATE, TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ                        |

## Connect to Apache Spark DataFrames

- For use with [programmatic Soda scans]({% link soda-core/programmatic-scans.md %}), only.
- Unlike other data sources, Soda Core does _not_ require a configuration YAML file to run scans against Spark DataFrames.

Note that there are two Soda Core packages for Spark:

- `soda-core-spark-df`, in its early release candidate form, enables you to pass dataframe objects into Soda scans programatically, after you have associated the temporary tables to DataFrames via the Spark API.
- `soda-core-spark` continues as a work-in-progress and will connect to Soda Core much the same as other data sources, via connection details in a configuration YAML.

A Spark cluster contains a distributed collection of data. Spark DataFrames are distributed collections of data that are organized into named columns, much like a table in a database, and which are stored in-memory in a cluster. To make a DataFrame available to Soda Core to run scans against, you must use a driver program like PySpark and the Spark API to link DataFrames to individual, named, temporary tables in the cluster. You pass this information into a Soda scan programatically. You can also pass Soda Cloud connection details programmatically; see [Connect Soda Core for SparkDF to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}#connect-soda-core-for-sparkdf-to-soda-cloud).

Refer to <a href="https://github.com/sodadata/soda-core/blob/main/soda/core/tests/examples/example_python_api.py" target="_blank">the soda-core repo in GitHub</a> for details.

1. If you are _not_ installing Soda Core Spark DataFrames on a cluster, skip to step 2. To install Soda Core Spark DataFrames on a cluster, such as a Kubernetes cluster or a Databricks cluster, install <a href="https://packages.debian.org/buster/libsasl2-dev" target="_blank"> `libsasl2-dev` </a> _before_ installing `soda-core-spark-df`. For Ubuntu users, install `libsasl2-dev` using the following command:
```shell
sh sudo apt-get -y install unixodbc-dev libsasl2-dev gcc python-dev
```
2. Confirm that you have completed the following.
* installed `soda-core-spark-df`
* set up a a Spark session
```python
spark_session: SparkSession = ...user-defined-way-to-create-the-spark-session...
```
* confirmed that your Spark cluster contains one or more DataFrames
```python
df = ...user-defined-way-to-build-the-dataframe...
```
3. Use the Spark API to link the name of a temporary table to a DataFrame. In this example, the name of the table is `customers`.
```python
db.createOrReplaceTempView('customers')
```
4. Use the Spark API to link a DataFrame to the name of each temporary table against which you wish to run Soda scans. Refer to <a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceTempView.html" target="_blank"> PySpark documentation</a>.
5. [Define a programmatic scan]({% link soda-core/programmatic-scans.md %}) for the data in the DataFrames, and include one extra method to pass all the DataFrames to Soda Core: `add_spark_session(self, spark_session, data_source_name: str)`. The default value for `data_source_name` is `"spark_df"`. Refer to the example below.

```python
spark_session = ...your_spark_session...
df1.createOrReplaceTempView("TABLE_ONE")
df2.createOrReplaceTempView("TABLE_TWO")
...

scan = Scan()
scan.set_scan_definition_name('YOUR_SCHEDULE_NAME')
scan.set_data_source_name("spark_df")
scan.add_configuration_yaml_file(file_path="somedirectory/your_configuration.yml")
scan.add_spark_session(spark_session)
... all other scan methods in the standard programmatic scan ...
```

<!--### Supported data types

| Category | Data type |
| ---- | --------- |
| text | STRING |
| number | DECIMAL, INTEGER |
| time | DATE, TIMESTAMP, TIMESTAMPTZ |
-->

<br />

## Connect to GCP BigQuery

{% include gcp-datasets.md %}

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
    project_id: "..."
    dataset: sodacore
```

| Property                                | Required                                                        |
| --------------------------------------- | --------------------------------------------------------------- |
| type                                    | required                                                        |
| account_info_json                       | reqired; inline properties listed below                         |
| &ensp;&ensp;type                        | required                                                        |
| &ensp;&ensp;project_id                  | required                                                        |
| &ensp;&ensp;private_key_id              | required                                                        |
| &ensp;&ensp;private_key                 | required                                                        |
| &ensp;&ensp;client_email                | required                                                        |
| &ensp;&ensp;client_id                   | required                                                        |
| &ensp;&ensp;auth_uri                    | required                                                        |
| &ensp;&ensp;token_uri                   | required                                                        |
| &ensp;&ensp;auth_provider_x509_cert_url | required                                                        |
| &ensp;&ensp;client_x509_cert_url        | required                                                        |
| auth_scopes                             | optional; Soda applies the three scopes listed above by default |
| project_id                              | optional; overrides project_id from account_info_json           |
| dataset                                 | required                                                        |

### Supported data types

| Category | Data type                                      |
| -------- | ---------------------------------------------- |
| text     | STRING                                         |
| number   | INT64, DECIMAL, BINUMERIC, BIGDECIMAL, FLOAT64 |
| time     | DATE, DATETIME, TIME, TIMESTAMP                |

## Connect to IBM DB2

```yaml
data_source my_database_name:
  type: db2
  host: localhost
  port: 50000
  username: xxx
  password: ...
  database: 
  schema: 
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | optional |                                                            |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |
| schema   | required |                                                            |

### Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | VARCHAR  |
| number   | INT, INTEGER, DOUBLE, FLOAT  |
| time     | DATE, TIME, TIMESTAMP |


## Connect to MS SQL Server

**Known issue:** Connections to MS SQL Server do not support checks that use regex, such as with [missing metrics]({% link soda-cl/missing-metrics.md %}#list-of-missing-metrics) or [validity metrics]({% link soda-cl/validity-metrics.md %}#list-of-validity-metrics).<!--CORE-211-->

```yaml
data_source my_server_name:
  type: sqlserver
  host: localhost
  port: 1433
  username: xxx
  password: ...
  database:
  schema:
  trusted_connection: false
  encrypt: false 
  trust_server_certificate: false
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | optional |                                                            |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |
| schema   | required |                                                            |
| trusted_connection | optional |  The default value is `false`.                   |
| encrypt | optional |   The default value is `false`.                             |
| trust_server_certificate | optional |   The default value is `false`.            |


### Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHAR, VARCHAR, TEXT  |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL  |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET |


## Connect to MySQL

```yaml
data_source my_server_name:
  type: mysql
  host: 
  username: xxx
  password: ...
  database:
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |


### Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHAR, VARCHAR, TEXT  |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL  |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET |



## Connect to PostgreSQL

```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: db
    port: "5432"
    username:
    password:
    database: postgres
  schema: public
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | optional |                                                            |
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |
| schema   | required |                                                            |

### Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHARACTER VARYING, CHARACTER, CHAR, TEXT  |
| number   | SMALLINT, INTEGER, BIGINT, DECIMAL, NUMERIC, VARIABLE, REAL, DOUBLE PRECISION, SMALLSERIAL, SERIAL, BIGSERIAL  |
| time     | TIMESTAMP, DATE, TIME, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITHOUT TIME ZONE, TIME WITH TIME ZONE, TIME WITHOUT TIME ZONE |

## Connect to Snowflake

```yaml
data_source orders:
  type: snowflake
  connection:
    username: "SODATESTING"
    password: "abc123"
    account: sodadatapartner.eu-central-1
    database: SNOWFLAKE_SAMPLE_DATA
    warehouse:
    connection_timeout:
    role: PUBLIC
    client_session_keep_alive:
    session_parameters:
      QUERY_TAG: soda-queries
      QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```

| Property                       | Required | Notes                                                                                                                                                                                   |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                           | required | The name of your Snowflake virtual data source.                                                                                                                                         |
| username                       | required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`.                                                                                      |
| password                       | required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`.                                                                                  |
| account                        | required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`.                                                                                   |
| database                       | required |                                                                                                                                                                                         |
| schema                         | required |                                                                                                                                                                                         |
| warehouse                      | required |                                                                                                                                                                                         |
| connection_timeout             | required |                                                                                                                                                                                         |
| role                           | optional | See <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Roles</a> for details.       |
| QUERY_TAG                      | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag" target="_blank">QUERY_TAG</a> in Snowflake documentation.                                           |
| QUOTED_IDENTIFIERS_IGNORE_CASE | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case" target="_blank">QUOTED_IDENTIFIERS_IGNORE_CASE</a> in Snowflake documentation. |

### Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, CHARACTER, STRING, TEXT                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |
