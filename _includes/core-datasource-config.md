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

## Connect to Apache Spark

There are several Soda Core packages for Spark:

- `soda-core-spark-df`, in its early release candidate form, enables you to pass dataframe objects into Soda scans programatically, after you have associated the temporary tables to DataFrames via the Spark API. <br  />*Known issue:* Soda Core for SparkDF does not support anomaly score or distribution checks.
- `soda-core-spark` continues as a work-in-progress and will connect to Soda Core much the same as other data sources, via connection details in a configuration YAML.
- `soda-core-spark[hive]` is a package you add if you are using Apache Hive.
- `soda-core-spark[odbc]` is a package you add if you are using an ODBC driver.
- `soda-core-spark[databricks]` is a package you use to install Soda Core for Databricks SQL on the Databricks Lakehouse Platform. See [Connect to Spark for Databricks SQL](#connect-to-spark-for-databricks-sql).


### Connect to Spark DataFrames

- For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.
- Unlike other data sources, Soda Core for SparkDf does _not_ require a configuration YAML file to run scans against Spark DataFrames.

A Spark cluster contains a distributed collection of data. Spark DataFrames are distributed collections of data that are organized into named columns, much like a table in a database, and which are stored in-memory in a cluster. To make a DataFrame available to Soda Core to run scans against, you must use a driver program like PySpark and the Spark API to link DataFrames to individual, named, temporary tables in the cluster. You pass this information into a Soda scan programatically. You can also pass Soda Cloud connection details programmatically; see [Connect Soda Core for SparkDF to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}#connect-soda-core-for-sparkdf-to-soda-cloud).

Refer to <a href="https://github.com/sodadata/soda-core/blob/main/soda/core/tests/examples/example_python_api.py" target="_blank">the soda-core repo in GitHub</a> for details.

1. If you are _not_ installing Soda Core Spark DataFrames on a cluster, skip to step 2. To install Soda Core Spark DataFrames on a cluster, such as a Kubernetes cluster or a Databricks cluster, install <a href="https://packages.debian.org/buster/libsasl2-dev" target="_blank"> `libsasl2-dev` </a> _before_ installing `soda-core-spark-df`. For Ubuntu users, install `libsasl2-dev` using the following command:
```shell
sh sudo apt-get -y install unixodbc-dev libsasl2-dev gcc python-dev
```
2. If you are _not_ using Spark with Hive or ODBC, skip to step 3. Otherwise, install the separate dependencies as needed, and configure connection details for each dependency; see below.
* for Hive, use: `pip install soda-core-spark[hive]` and [configure](#connect-to-spark-for-hive)
* for ODBC, use: `pip install soda-core-spark[odbc]` and [configure](#connect-to-spark-for-odbc)
3. Confirm that you have completed the following.
* installed `soda-core-spark-df`
* set up a a Spark session
```python
spark_session: SparkSession = ...user-defined-way-to-create-the-spark-session...
```
* confirmed that your Spark cluster contains one or more DataFrames
```python
df = ...user-defined-way-to-build-the-dataframe...
```
4. Use the Spark API to link the name of a temporary table to a DataFrame. In this example, the name of the table is `customers`.
```python
db.createOrReplaceTempView('customers')
```
5. Use the Spark API to link a DataFrame to the name of each temporary table against which you wish to run Soda scans. Refer to <a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceTempView.html" target="_blank"> PySpark documentation</a>.
6. [Define a programmatic scan]({% link soda-core/programmatic.md %}) for the data in the DataFrames, and include one extra method to pass all the DataFrames to Soda Core: `add_spark_session(self, spark_session, data_source_name: str)`. The default value for `data_source_name` is `"spark_df"`. Refer to the example below.

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

### Connect to Spark for Hive

```yaml
data_source my_database_name:
  type: spark
  username:
  password:
  host:
  port:
  database:
  auth_method:
```

| Property      | Required    |
| ------------- | ----------- |
| type          | required    |
| username      | required    |
| password      | required    |
| host          | required    |
| port          | required    |
| database      | required    |
| auth_method   | required    |


<br />

### Connect to Spark for ODBC

```yaml
data_source my_database_name:
  type: spark
  driver:
  host:
  port:
  token:
  organization:
  cluster:
  server_side_parameters:
```

| Property      | Required    |
| ------------- | ----------- |
| type          | required    |
| driver        | required    |
| host          | required    |
| port          | required    |
| token         | required    |
| organization  | required    |
| cluster       | required    |
| server_side_parameters | required    |


<br />

### Use Soda Core with Spark DataFrames on Databricks

Use the `soda-core-spark-df` package to connect to Databricks using a Notebook.

1. Follow steps 1-2 in [the instructions](#connect-to-apache-spark-dataframes) to install `soda-core-spark-df`.
2. Reference the following Notebook example to connect to Databricks.

```python
# import Scan from Soda Core
from soda.scan import Scan
# Create a Spark DataFrame, or use the Spark API to read data and create a DataFrame
df = spark.createDataFrame([(1, "a"), (2, "b")], ("id", "name"))
# Create a view that SodaCL uses as a dataset
df.createOrReplaceTempView("abc")
# Create a Scan object, set a scan definition, and attach a Spark session
scan = Scan()
scan.set_scan_definition_name("test")
scan.set_data_source_name("spark_df")
scan.add_spark_session(spark)
# Define checks for datasets
checks  ="""
checks for dataset_abc:
  - row_count > 0
"""
# If you defined checks in a file accessible via Spark, you can use the scan.add_sodacl_yaml_file method to retrieve the checks
scan.add_sodacl_yaml_str(checks)
# Optionally, add a configuration file with Soda Cloud credentials
# config = """
# soda_cloud:
#   api_key_id: xyz
#   api_key_secret: xyz
# """
# scan.add_configuration_yaml_str(config)

# Execute a scan
scan.execute()
# Check the Scan object for methods to inspect the scan result; the following prints all logs to console
print(scan.get_logs_text())
```

### Connect to Spark for Databricks SQL

```yaml
data_source my_database_name:
  type: spark
  catalog: samples
  schema: nyctaxi
  method: databricks
  host: hostname_from_Databricks_SQL_settings
  http_path:*http_path_from_Databricks_SQL_settings
  token: my_access_token
```

| Property      | Required    |
| ------------- | ----------- |
| type          | required    |
| catalog       | required    |
| schema        | required    |
| method        | required    |
| host          | required    |
| token         | required    |

### Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHAR, VARCHAR, TEXT  |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL  |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET |


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

| Property                                | required                                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------|
| type                                    | required                                                                                                    |
| account_info_json                       | optional; inline properties listed below; if not provided, Soda uses Google Application Default Credentials |
| &ensp;&ensp;type                        | required                                                                                                    |
| &ensp;&ensp;project_id                  | required                                                                                                    |
| &ensp;&ensp;private_key_id              | required                                                                                                    |
| &ensp;&ensp;private_key                 | required                                                                                                    |
| &ensp;&ensp;client_email                | required                                                                                                    |
| &ensp;&ensp;client_id                   | required                                                                                                    |
| &ensp;&ensp;auth_uri                    | required                                                                                                    |
| &ensp;&ensp;token_uri                   | required                                                                                                    |
| &ensp;&ensp;auth_provider_x509_cert_url | required                                                                                                    |
| &ensp;&ensp;client_x509_cert_url        | required                                                                                                    |
| auth_scopes                             | optional; Soda applies the three scopes listed above by default                                             |
| project_id                              | optional; overrides project_id from account_info_json                                                       |
| dataset                                 | required                                                                                                    |

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
  host: host
  port: '1433'
  username: xxx
  password: ...
  database: sodaexample
  schema: dbo
  trusted_connection: false
  encrypt: false
  trust_server_certificate: false
  driver:
```

| Property | Required | Notes                                                      |
| -------- | -------- | ---------------------------------------------------------- |
| type     | required |                                                            |
| host     | required |                                                            |
| port     | optional | You can remove the `port` config setting entirely; defaults to `1433`.|
| username | required | Use system variables to retrieve this value securely.      |
| password | required | Use system variables to retrieve this value securely.      |
| database | required |                                                            |
| schema   | required |                                                            |
| trusted_connection | optional |  The default value is `false`. Set to `true` if using Active Directory authentication. |
| encrypt | optional |   The default value is `false`.                             |
| trust_server_certificate | optional |   The default value is `false`.  |
| driver  | optional | Use this config setting to specify the ODBC driver version you use, such as `SQL Server Native Client 11.0` |


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

| Property | Required | Notes |
| ----__-- | -------- | ----- |
| type   | required |   |
| username | required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_USER}`. |
| password | required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_PASSWORD}`. |
| account| required | Use system variables to retrieve this value securely using, for example, `${SNOWFLAKE_ACCOUNT}`. |
| database| required | |
| schema | required | |
| warehouse| required | |
| connection_timeout| required | |
| role | optional | See <a href="https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#system-defined-roles" target="_blank">Snowflake System-Defined Roles</a> for details. |
| QUERY_TAG | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#query-tag" target="_blank">QUERY_TAG</a> in Snowflake documentation. |
| QUOTED_IDENTIFIERS_IGNORE_CASE | optional | See <a href="https://docs.snowflake.com/en/sql-reference/parameters.html#quoted-identifiers-ignore-case" target="_blank">QUOTED_IDENTIFIERS_IGNORE_CASE</a> in Snowflake documentation. |

### Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR, CHARACTER, STRING, TEXT                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |


## Connect to Trino

Reference <a href="https://trino.io/docs/current/overview/concepts.html#" target="_blank">Trino documentation</a> for assistance.

```yaml
data_source my_datasource_name:
  type: trino
  host: host
  port:
  username: user
  password: ***
  catalog:
  schema:
```

| Property | Required | Notes |
| -------- | -------- | ----- |
| type     | required |       |
| host     | required |       |
| port     | optional |       |
| username | required | Use system variables to retrieve this value securely using, for example, `${TRINO_USER}`. |
| password | required | Use system variables to retrieve this value securely using, for example, `${TRINO_PASSWORD}`. |
| catalog  | required |       |
| schema   | required |       |

### Supported data types

| Category | Data type                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| text     | CHAR, VARCHAR                                                                          |
| number   | NUMBER, INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT, FLOAT, FLOAT4, FLOAT8, DOUBLE, DOUBLE PRECISION, REAL |
| time     | DATE, DATETIME, TIME, TIMESTAMP, TIMESTAMPT_LTZ, TIMESTAMP_NTZ, TIMESTAMP_TZ                                    |
