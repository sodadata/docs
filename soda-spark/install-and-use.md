---
layout: default
title: Install and use Soda Spark 
description: Soda Spark is an extension that allows you to run Soda SQL functionality programmatically on a Spark DataFrame. Install Soda Spark from the command-line.
parent: Soda Spark
---

# Install and use Soda Spark

Soda Spark is an extension of 
[Soda SQL]({% link soda-sql/5_min_tutorial.md %}) that allows you to run Soda
SQL functionality programmatically on a 
<a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.html" target="_blank">Spark dataframe</a>. Reference the Soda SQL documentation to learn how to use Soda Spark, particularly how to [define tests]({% link soda-sql/tests.md %}) in a [scan YAML file]({% link soda-sql/scan-yaml.md %}). 

[Requirements](#requirements)<br />
[Compatibility](#compatibility)<br />
[Install Soda Spark](#install-soda-spark)<br />
[Use Soda Spark](#use-soda-spark)<br />
[How Soda Spark works](#how-soda-spark-works)<br />
[Contribute](#contribute)<br />
[Go further](#go-further)

<br />

## Requirements

To use Soda Spark, you must have installed the following on your system.

{% include requirements.md %}

To install Soda Spark on a DataBricks cluster, install the following before installing soda-spark:
* <a href="https://packages.debian.org/buster/libsasl2-dev" target="_blank"> `libsasl2-dev` </a>


## Install Soda Spark

From your command-line interface tool, execute the following command.

``` sh
$ pip install soda-spark
```

<br />

#### Troubleshoot


**Problem:** I tried installing `soda-spark` on a DataBricks cluster and the `pip install` fails. Both Python and pip meet the install requirements. <br />
**Solution:** Install `libsasl2-dev`, then use `pip install soda-spark`.
<br />

## Use Soda Spark
As an extension of Soda SQL, Soda Spark allows you to run Soda
SQL functionality programmatically on a Spark dataframe. Reference the Soda SQL documentation to learn how to use Soda Spark. 

From your Python prompt, execute the following commands to programmatically run Soda SQL functionality.

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

Alternatively, you can prepare a [scan YAML file]({% link soda-sql/scan-yaml.md %}) that Soda Spark uses to prepare SQL queries to run against your data.

``` python
>>> scan_yml = "static/demodata.yml"
>>> scan_result = scan.execute(scan_yml, df)
>>>
>>> scan_result.measurements
[Measurement(metric='schema', ...), Measurement(metric='row_count', ...), ...]
>>>
```

## Send scan results to Soda Cloud

Use the following command to send Soda Spark scan results to Soda cloud. Use [Soda Cloud documentation]({% link soda-cloud/connect_to_cloud.md %}) to learn how to generate API keys to connect Soda Spark to Soda Cloud.

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

## How Soda Spark works

When you execute Soda Spark, it completes the following tasks:

1. It sets up the scan using the Spark dialect and a <a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.SparkSession.html" target="_blank">Spark session</a> as a [warehouse]({% link soda-sql/warehouse.md %}) connection.
2. It creates, or replaces, a 
	<a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.createOrReplaceGlobalTempView.html" target="_blank">global temporary view</a>
   for the Spark dataframe.
3. It executes the Soda scan on the temporary view.

## Contribute

Soda Spark is an open-source software project hosted in <a href="https://github.com/sodadata/soda-spark" target="_blank">GitHub</a>. Learn how to <a href="https://github.com/sodadata/soda-spark/blob/main/CONTRIBUTING.md" target="blank">contribute</a> to the Soda Spark project. 

## Go further

* Learn more about the [scan YAML file]({% link soda-sql/scan-yaml.md %}).
* Learn how to configure [metrics]({% link soda-sql/sql_metrics.md %}) in your
  YAML files.
* Learn more about configuring [tests]({% link soda-sql/tests.md %}).
* Learn how to define a list of 
  [columns to exclude]({% link soda-sql/scan-yaml.md
  %}#scan-yaml-table-configuration-keys) when Soda SQL executes a scan on a dataset. 
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
