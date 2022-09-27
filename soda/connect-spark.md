---
layout: default
title: Connect Soda to Apache Spark
description: Access configuration details to connect Soda to a Spark data source.
parent: Connect a data source
---

# Connect Soda to Apache Spark

{% include connect-to-intro.md %}


There are several Soda Core packages for Spark.

| Package | Notes | 
| ------- | ----- |
| [`soda-core-spark-df`](#connect-to-spark-dataframes) | Enables you to pass dataframe objects into Soda scans programatically, after you have associated the temporary tables to DataFrames via the Spark API. <br />- For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only. <br />- Supports Delta Lake Tables on Databricks.<br />- [Use for Spark DataFrames on Databricks](#use-soda-core-with-spark-dataframes-on-databricks).<br  />- *Known issue:* Soda Core for SparkDF does not support anomaly score or distribution checks. |
| [`soda-core-spark[hive]`](#connect-to-spark-for-hive) | A package you add to `soda-core-spark-df` if you are using Apache Hive. |
| [`soda-core-spark[odbc]`](#connect-to-spark-for-odbc) | A package you add to `soda-core-spark-df` if you are using ODBC. |
| [`soda-core-spark[databricks]`](#connect-to-spark-for-databricks-sql) | A package you use to install Soda Core for Databricks SQL on the Databricks Lakehouse Platform. |
| `soda-core-spark` | A work-in-progress, this package will connect to Soda Core much the same as other data sources, via connection details in a configuration YAML. |


## Connect to Spark DataFrames

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


## Use Soda Core with Spark DataFrames on Databricks

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

<br />

## Connect to Spark for Hive

An addition to `soda-core-spark-df`, install and configure this package if you use Apache Hive.

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

An addition to `soda-core-spark-df`, install and configure this package if you use ODBC.

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

```yaml
data_source my_datasource_name:
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

<br />

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