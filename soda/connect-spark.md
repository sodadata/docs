---
layout: default
title: Connect Soda to Apache Spark
description: Access configuration details to connect Soda to a Spark data source.
parent: Data source reference
---

# Connect Soda to Apache Spark
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

[Spark packages](#spark-packages)<br />
[Connect to Spark DataFrames](#connect-to-spark-dataframes)<br />
[Use Soda Library with Spark DataFrames on Databricks](#use-soda-library-with-spark-dataframes-on-databricks)<br />
[Connect to Spark for Hive](#connect-to-spark-for-hive)<br />
[Connect to Spark for ODBC](#connect-to-spark-for-odbc)<br />
[Connect to Spark for Databricks SQL](#connect-to-spark-for-databricks-sql) <br />
[Test the data source connection](#test-the-data-source-connection)<br />
[Supported data types](#supported-data-types)<br />
<br />

## Spark packages

There are several Soda Library install packages for Spark.

| Package | Description | 
| ------- | ----- |
| [`soda-spark-df`](#connect-to-spark-dataframes) | Enables you to pass dataframe objects into Soda scans programatically, after you have associated the temporary tables to DataFrames via the Spark API. <br />- For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only. <br />- Supports Delta Lake Tables on Databricks.<br />- [Use for Spark DataFrames on Databricks](#use-soda-library-with-spark-dataframes-on-databricks).<br  /> |
| [`soda-spark[hive]`](#connect-to-spark-for-hive) | A package you add to `soda-spark-df` if you are using Apache Hive. |
| [`soda-spark[odbc]`](#connect-to-spark-for-odbc) | A package you add to `soda-spark-df` if you are using ODBC. |
| [`soda-spark[databricks]`](#connect-to-spark-for-databricks-sql) | A package you use to install Soda Library for Databricks SQL on the Databricks Lakehouse Platform. |


## Connect to Spark DataFrames

- For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only.
- Unlike other data sources, Soda Library for SparkDF does _not_ require a configuration YAML file to run scans against Spark DataFrames.

A Spark cluster contains a distributed collection of data. Spark DataFrames are distributed collections of data that are organized into named columns, much like a table in a database, and which are stored in-memory in a cluster. 

To make a DataFrame available to Soda Library to run scans against, you must use a driver program like PySpark and the Spark API to link DataFrames to individual, named, temporary tables in the cluster. You pass this information into a Soda scan programatically. You can also pass Soda Cloud connection details programmatically; see [below](#connect-soda-library-for-sparkdf-to-soda-cloud). 

1. If you are _not_ installing Soda Library Spark DataFrames on a cluster, skip to step 2. To install Soda Library Spark DataFrames on a cluster, such as a Kubernetes cluster or a Databricks cluster, install <a href="https://packages.debian.org/buster/libsasl2-dev" target="_blank"> `libsasl2-dev` </a> _before_ installing `soda-spark-df`. For Ubuntu users, install `libsasl2-dev` using the following command:
```shell
sh sudo apt-get -y install unixodbc-dev libsasl2-dev gcc python-dev
```
2. If you are _not_ using Spark with Hive or ODBC, skip to step 3. Otherwise, install the separate dependencies as needed, and configure connection details for each dependency; see below.
* for Hive, use: `pip install -i https://pypi.cloud.soda.io soda-spark[hive]` and [configure](#connect-to-spark-for-hive)
* for ODBC, use: `pip install -i https://pypi.cloud.soda.io soda-spark[odbc]` and [configure](#connect-to-spark-for-odbc)
3. Install `soda-spark-df` (see [Install Soda Library]({% link soda-library/install.md %})) and confirm that you have completed the following.
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
5. Use the Spark API to link a DataFrame to the name of each temporary table against which you wish to run Soda scans. Refer to <a href="hhttps://spark.apache.org/docs/3.1.3/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceTempView.html" target="_blank"> PySpark documentation</a>.
6. [Define a programmatic scan]({% link soda-library/programmatic.md %}) for the data in the DataFrames, and include one extra method to pass all the DataFrames to Soda Library: `add_spark_session(self, spark_session, data_source_name: str)`. The default value for `data_source_name` is `"spark_df"`,  but we suggest to change this to something which makes sense for your implementation. Refer to the example below.
{% include code-header.html %}
```python
spark_session = ...your_spark_session...
df1.createOrReplaceTempView("TABLE_ONE")
df2.createOrReplaceTempView("TABLE_TWO")
...

scan = Scan()
scan.add_spark_session(spark_session, data_source_name="orders")
scan.set_data_source_name("orders")
scan.set_scan_definition_name('YOUR_SCHEDULE_NAME')
scan.add_configuration_yaml_file(file_path="somedirectory/your_configuration.yml")
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


## Connect Soda Library for SparkDF to Soda Cloud

Unlike other data sources, Soda Library does _not_ require a configuration YAML file to run scans against Spark DataFrames. It is for use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only.

Therefore, to connect to Soda Cloud, include the Soda Cloud API keys in your programmatic scan using either `add_configuration_yaml_file(file_path)` or `scan.add_configuration_yaml_str(config_string)` as in the example below.

{% include code-header.html %}
```shell
from pyspark.sql import SparkSession, types
from soda.scan import Scan

spark_session = SparkSession.builder.master("local").appName("test").getOrCreate()
df = spark_session.createDataFrame(
    data=[{"id": "1", "name": "John Doe"}],
    schema=types.StructType(
        [types.StructField("id", types.StringType()), types.StructField("name", types.StringType())]
    ),
)
df.createOrReplaceTempView("users")

scan = Scan()
scan.set_verbose(True)
scan.set_scan_definition_name("YOUR_SCHEDULE_NAME")
scan.set_data_source_name("customers")
scan.add_configuration_yaml_file(file_path="sodacl_spark_df/configuration.yml")
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

Use the `soda-spark-df` package to connect to Databricks using a Notebook. 

1. Follow steps 1-2 in [the instructions](#connect-to-spark-dataframes) to install `soda-spark-df`.
2. Reference the following Notebook example to connect to Databricks. 
{% include code-header.html %}
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

<br />

## Connect to Spark for Hive

An addition to `soda-spark-df`, install and configure the `soda-spark[hive]` package if you use Apache Hive.
{% include code-header.html %}
```yaml
data_source my_datasource_name:
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

## Connect to Spark for ODBC

An addition to `soda-spark-df`, install and configure the `soda-spark[odbc]` package if you use ODBC.
{% include code-header.html %}
```yaml
data_source my_datasource_name:
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

## Connect to Spark for Databricks SQL

1. Install `soda-spark-df` (see [above](#connect-to-spark-dataframes)) and `soda-spark[databricks]` to connect to Databricks SQL. Refer to [Install Soda Library]({% link soda-library/install.md %}) for details.
```shell
pip install -i https://pypi.cloud.soda.io soda-spark[databricks]
```
2. If you have not done so already, install `databricks-sql-connector`. Refer to <a href="https://docs.databricks.com/dev-tools/python-sql-connector.html" target="_blank">Databricks documentation</a> for details.
3. Configure the data source connection in your `configuration.yml` file as per the following example.

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: spark
  catalog: samples
  schema: nyctaxi
  method: databricks
  host: hostname_from_Databricks_SQL_settings
  http_path: http_path_from_Databricks_SQL_settings
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

<br />

{% include test-connection.md %}

## Supported data types

| Category | Data type  |
| -------- | ---------- |
| text     | CHAR, VARCHAR, TEXT  |
| number   | BIG INT, NUMERIC, BIT, SMALLINT, DECIMAL, SMALLMONEY, INT, TINYINT, MONEY, FLOAT, REAL  |
| time     | DATE, TIME, DATETIME, DATETIMEOFFSET |

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
