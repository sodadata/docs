---
layout: default
title: Install and use Soda Spark 
parent: Soda Spark
---

# Soda Spark

Soda Spark is an extension of 
[Soda SQL]({% link soda-sql/5_min_tutorial.md %}) that allows you to run Soda
SQL functionality programmatically on a 
[Spark data frame](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.html).

## Requirements

Soda Spark has the same requirements as 
[`soda-sql-spark`]({% link soda-sql/installation.md %}).

## Install

From your command-line interface tool, execute the following command.

``` sh
$ pip install soda-spark
```

## Use

From your Python prompt, execute the following commands.

``` python
>>> from pyspark.sql import DataFrame, SparkSession
>>> from sodaspark import scan
>>>
>>> spark_session = SparkSession.builder.getOrCreate()
>>>
>>> id = "a76824f0-50c0-11eb-8be8-88e9fe6293fd"
>>> df = spark_session.createDataFrame([
...	   {"id": id, "name": "Paula Landry", "size": 3006},
...	   {"id": id, "name": "Kevin Crawford", "size": 7243}
... ])
>>>
>>> scan_definition = ("""
... table_name: demodata
... metrics:
... - row_count
... - max
... - min_length
... tests:
... - row_count > 0
... columns:
...   id:
...     valid_format: uuid
...     tests:
...     - invalid_percentage == 0
... """)
>>> scan_result = scan.execute(scan_definition, df)
>>>
>>> scan_result.measurements
[Measurement(metric='schema', ...), Measurement(metric='row_count', ...), ...]
>>> scan_result.test_results
[TestResult(test=Test(..., expression='row_count > 0', ...), passed=True, skipped=False, ...)]
>>>
```

Or, use a [scan YAML](https://docs.soda.io/soda-sql/scan-yaml.html) file

``` python
>>> scan_yml = "static/demodata.yml"
>>> scan_result = scan.execute(scan_yml, df)
>>>
>>> scan_result.measurements
[Measurement(metric='schema', ...), Measurement(metric='row_count', ...), ...]
>>>
```

### Send results to Soda cloud

Send the scan result to Soda cloud.

``` python
>>> import os
>>> from sodasql.soda_server_client.soda_server_client import SodaServerClient
>>>
>>> soda_server_client = SodaServerClient(
...     host="cloud.soda.io",
...     api_key_id=os.getenv("API_PUBLIC"),
...     api_key_secret=os.getenv("API_PRIVATE"),
... )
>>> scan_result = scan.execute(scan_yml, df, soda_server_client=soda_server_client)
>>>
```

## Understand

Under the hood `soda-spark` does the following.

1. Setup the scan
   * Use the Spark dialect
   * Use [Spark session](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.SparkSession.html)
     as [warehouse]({% link soda-sql/warehouse.md %}) connection
2. Create (or replace) 
   [global temporary view](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceGlobalTempView.html)
   for the Spark data frame
3. Execute the scan on the temporary view

## Go further

* Learn more about the [scan YAML file]({% link soda-sql/scan-yaml.md %}).
* Learn how to configure [metrics]({% link soda-sql/sql_metrics.md %}) in your
  YAML files.
* Learn more about configuring [tests]({% link soda-sql/tests.md %}).
* Learn how to define a list of 
  [columns to exclude]({% link soda-sql/scan-yaml.md
  %}#scan-yaml-configuration-keys) when Soda SQL executes a scan on a dataset. 
* Need help? Join the **#soda-spark** channel in 
  <a href="http://community.soda.io/slack" target="_blank"> Soda community on
  Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the
**#soda-docs** channel in the 
<a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> 
or 
<a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> 
in GitHub.
