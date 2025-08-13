---
description: Access configuration details to connect Soda to a Spark data source.
---

# Connect Soda to Apache Spark

{% include "../.gitbook/includes/for-soda-to-run-quality-sca....md" %}

## Spark packages

There are several Soda Library install packages for Spark.

| Package                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`soda-spark-df`](connect-spark.md#connect-to-spark-dataframes)                  | <p>Enables you to pass dataframe objects into Soda scans programatically, after you have associated the temporary tables to DataFrames via the Spark API.<br>- For use with <a href="../quick-start-sip/programmatic.md">programmatic Soda scans</a>, only.<br>- Supports Delta Lake Tables on Databricks.<br>- <a href="connect-spark.md#use-soda-library-with-spark-dataframes-on-databricks">Use for Spark DataFrames on Databricks</a>.<br></p> |
| [`soda-spark[hive]`](connect-spark.md#connect-to-spark-for-hive)                 | A package you add to `soda-spark-df` if you are using Apache Hive.                                                                                                                                                                                                                                                                                                                                                                                  |
| [`soda-spark[odbc]`](connect-spark.md#connect-to-spark-for-odbc)                 | A package you add to `soda-spark-df` if you are using ODBC.                                                                                                                                                                                                                                                                                                                                                                                         |
| [`soda-spark[databricks]`](connect-spark.md#connect-to-spark-for-databricks-sql) | A package you use to install Soda Library for Databricks SQL on the Databricks Lakehouse Platform.                                                                                                                                                                                                                                                                                                                                                  |

## Connect to Spark DataFrames

* For use with [programmatic Soda scans](../quick-start-sip/programmatic.md), only.
* Unlike other data sources, Soda Library for SparkDF does _not_ require a configuration YAML file to run scans against Spark DataFrames.

A Spark cluster contains a distributed collection of data. Spark DataFrames are distributed collections of data that are organized into named columns, much like a table in a database, and which are stored in-memory in a cluster.

To make a DataFrame available to Soda Library to run scans against, you must use a driver program like PySpark and the Spark API to link DataFrames to individual, named, temporary tables in the cluster. You pass this information into a Soda scan programatically. You can also pass Soda Cloud connection details programmatically; see [below](connect-spark.md#connect-soda-library-for-sparkdf-to-soda-cloud).

1. If you are _not_ installing Soda Library Spark DataFrames on a cluster, skip to step 2. To install Soda Library Spark DataFrames on a cluster, such as a Kubernetes cluster or a Databricks cluster, install [`libsasl2-dev` ](https://packages.debian.org/buster/libsasl2-dev)_before_ installing `soda-spark-df`. For Ubuntu users, install `libsasl2-dev` using the following command:

```shell
sh sudo apt-get -y install unixodbc-dev libsasl2-dev gcc python-dev
```

2. If you are _not_ using Spark with Hive or ODBC, skip to step 3. Otherwise, install the separate dependencies as needed, and configure connection details for each dependency; see below.

* for Hive, use: `pip install -i https://pypi.cloud.soda.io soda-spark[hive]` and [configure](connect-spark.md#connect-to-spark-for-hive)
* for ODBC, use: `pip install -i https://pypi.cloud.soda.io soda-spark[odbc]` and [configure](connect-spark.md#connect-to-spark-for-odbc)

3. Install `soda-spark-df` (see [Install Soda Library](../quick-start-sip/install.md)) and confirm that you have completed the following.

* set up a a Spark session

```python
spark_session: SparkSession = ...user-defined-way-to-create-the-spark-session...
```

* confirm that your Spark cluster contains one or more DataFrames

```python
df = ...user-defined-way-to-build-the-dataframe...
```

4. Use the Spark API to link the name of a temporary table to a DataFrame. In this example, the name of the table is `customers`.

```python
db.createOrReplaceTempView('customers')
```

5. Use the Spark API to link a DataFrame to the name of each temporary table against which you wish to run Soda scans. Refer to [PySpark documentation](hhttps://spark.apache.org/docs/3.1.3/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceTempView.html).
6. [Define a programmatic scan](../quick-start-sip/programmatic.md) for the data in the DataFrames, and include one extra method to pass all the DataFrames to Soda Library: `add_spark_session(self, spark_session, data_source_name: str)`. The default value for `data_source_name` is `"spark_df"`; best practice dictates that you customize the name to your implementation. Refer to the example below.

```python
spark_session = ...your_spark_session...
df1.createOrReplaceTempView("TABLE_ONE")
df2.createOrReplaceTempView("TABLE_TWO")
...

scan = Scan()
scan.add_spark_session(spark_session, data_source_name="orders")
scan.set_data_source_name("orders")
scan.set_scan_definition_name('YOUR_SCHEDULE_NAME')
... all other scan methods in the standard programmatic scan ...
```

\


If you are using reference checks with a Spark or Databricks data source to validate the existence of values in two datasets within the same schema, you must first convert your DataFrames into temp views to add them to the Spark session, as in the following example.

```python
# after adding your Spark session to the scan
df.createOrReplaceTempView("df")
df2.createOrReplaceTempView("df2")
```

\


## Connect Soda Library for SparkDF to Soda Cloud

Unlike other data sources, Soda Library does _not_ require a configuration YAML file to run scans against Spark DataFrames. It is for use with [programmatic Soda scans](../quick-start-sip/programmatic.md), only.

Therefore, to connect to Soda Cloud, include the Soda Cloud API keys in your programmatic scan using either `add_configuration_yaml_file(file_path)` or `scan.add_configuration_yaml_str(config_string)` as in the example below.

```shell
from pyspark.sql import SparkSession, types
from soda.scan import Scan

spark_session = SparkSession.builder.master("local").appName("test").getOrCreate()
df = spark_session.createDataFrame(
    data=[{"id": "1", "name": "John Frome"}],
    schema=types.StructType(
        [types.StructField("id", types.StringType()), types.StructField("name", types.StringType())]
    ),
)
df.createOrReplaceTempView("users")

scan = Scan()
scan.set_verbose(True)
scan.set_scan_definition_name("YOUR_SCHEDULE_NAME")
scan.set_data_source_name("customers")
scan.add_configuration_yaml_str(
    """
soda_cloud:
  # use cloud.soda.io for EU region; use cloud.us.soda.io for USA region
  host: cloud.soda.io
  api_key_id: "[key]"
  api_key_secret: "[secret]"
"""
)
scan.add_spark_session(spark_session, data_source_name="customers")
scan.add_sodacl_yaml_file(file_path="sodacl_spark_df/checks.yml")
# ... all other scan methods in the standard programmatic scan ...
scan.execute()

# print(scan.get_all_checks_text())
print(scan.get_logs_text())
# scan.assert_no_checks_fail()
```

## Use Soda Library with Spark DataFrames on Databricks

Use the `soda-spark-df` package to connect to Databricks using a Notebook.\
🎥 Watch a video that demonstrates how to add Soda to your Databricks pipeline: [https://go.soda.io/soda-databricks-video](https://go.soda.io/soda-databricks-video)

1. Follow steps 1-2 in [the instructions](connect-spark.md#connect-to-spark-dataframes) to install `soda-spark-df`.
2. Reference the following Notebook example to connect to Databricks.

```python
# import Scan from Soda Library
from soda.scan import Scan
# Create a Spark DataFrame, or use the Spark API to read data and create a DataFrame
df = spark.createDataFrame([(1, "a"), (2, "b")], ("id", "name"))
# Create a view that SodaCL uses as a dataset
df.createOrReplaceTempView("my_df")
# Create a Scan object, set a scan definition, and attach a Spark session
scan = Scan()
scan.set_scan_definition_name("test")
scan.set_data_source_name("customers")
scan.add_spark_session(spark, data_source_name="customers")
# Define checks for datasets 
checks  ="""
checks for my_df:
  - row_count > 0 
"""
# If you defined checks in a file accessible via Spark, you can use the scan.add_sodacl_yaml_file method to retrieve the checks
scan.add_sodacl_yaml_str(checks)
# Optionally, add a configuration file with Soda Cloud credentials 
# config = """
# soda_cloud:
#   host: cloud.soda.io
#   api_key_id: xyz
#   api_key_secret: xyz
# """
# scan.add_configuration_yaml_str(config)

# Execute a scan
scan.execute()
# Check the Scan object for methods to inspect the scan result; the following prints all logs to console
print(scan.get_logs_text())
```

\


If you are using reference checks with a Spark or Databricks data source to validate the existence of values in two datasets within the same schema, you must first convert your DataFrames into temp views to add them to the Spark session, as in the following example.

```python
# after adding your Spark session to the scan
df.createOrReplaceTempView("df")
df2.createOrReplaceTempView("df2")
```



## Connect to Spark for Hive

An addition to `soda-spark-df`, install and configure the `soda-spark[hive]` package if you use Apache Hive.

```yaml
data_source my_datasource_name:
  type: spark
  method: hive
  username: 
  password: 
  host: 
  port: 
  catalog: 
  auth_method: 
```

| Property     | Required |
| ------------ | -------- |
| type         | required |
| method       | required |
| username     | required |
| password     | required |
| host         | required |
| port         | required |
| catalog      | required |
| auth\_method | required |

\


## Connect to Spark for ODBC

An addition to `soda-spark-df`, install and configure the `soda-spark[odbc]` package if you use ODBC.

```yaml
data_source my_datasource_name:
  type: spark
  method: odbc
  driver: 
  host: 
  port: 
  token: 
  organization: 
  cluster:
  server_side_parameters: 
```

| Property                 | Required |
| ------------------------ | -------- |
| type                     | required |
| method                   | required |
| driver                   | required |
| host                     | required |
| port                     | required |
| token                    | required |
| organization             | required |
| cluster                  | required |
| server\_side\_parameters | required |

\


## Connect to Spark for Databricks SQL

1. Install `soda-spark-df` (see [above](connect-spark.md#connect-to-spark-dataframes)) and `soda-spark[databricks]` to connect to Databricks SQL. Refer to [Install Soda Library](../quick-start-sip/install.md) for details.

```shell
pip install -i https://pypi.cloud.soda.io soda-spark[databricks]
```

2. If you have not done so already, install `databricks-sql-connector`. Refer to [Databricks documentation](https://docs.databricks.com/dev-tools/python-sql-connector.html) for details.
3. Configure the data source connection in your `configuration.yml` file as per the following example.

```yaml
data_source my_datasource_name:
  type: spark
  method: databricks
  catalog: samples
  schema: nyctaxi
  host: hostname_from_Databricks_SQL_settings
  http_path: http_path_from_Databricks_SQL_settings
  token: my_access_token
```

| Property | Required |
| -------- | -------- |
| type     | required |
| method   | required |
| catalog  | required |
| schema   | required |
| host     | required |
| token    | required |

{% include "../.gitbook/includes/test-the-data-source-connec....md" %}

## Supported data types

| Category | Data type                                         |
| -------- | ------------------------------------------------- |
| text     | CHAR, VARCHAR, TEXT                               |
| number   | NUMERIC, BIT, SMALLMONEY, INT, MONEY, FLOAT, REAL |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET              |

Not supported:

* BIGINT
* BOOLEAN
* DECIMAL
* TIMESTAMP
