---
layout: default
title: Glossary
parent: Documentation
nav_order: 18
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->

### alert
A setting that you configure in a Soda Cloud monitor by specifying key:value thresholds which, if exceeded, trigger a notification. See also: [notification](#notification).

### analyze
A Soda SQL CLI command that sifts through the contents of your database and automatically prepares a scan YAML file for each table. See [Create a scan YAML file]({% link soda-sql/documentation/scan-yaml.md %}#create-a-scan-yaml-file).

### column
A column in a table in your warehouse.

### column configuration key
The key in the key-value pair that you use to define what qualifies as a valid value in a column. A Soda SQL scan uses the value of a column configuration key to determine if it should pass or fail a test on a column. For example, in `valid_format: UUID` , `valid_format` is a column configuration key and `UUID` is the only format of the data in the column that Soda SQL considers valid. See [Column metrics]({% link soda-sql/documentation/sql_metrics.md %}#column-metrics).

### column metric
A property of the data of a single column in your database. Use a column metric to define tests that apply to specific columns in a table during a scan. See [Column metrics]({% link soda-sql/documentation/sql_metrics.md %}#column-metrics).

### configuration key
The key in the key-value pair that you use to define configuration in your scan YAML file. See [Scan YAML configuration keys]({% link soda-sql/documentation/scan-yaml.md %}#scan-yaml-configuration-keys).

### create
A Soda SQL CLI command that creates a warehouse directory.

### custom metric
A metric you define in your scan YAML file using SQL queries. Also known as a SQL metric. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/documentation/sql_metrics.md %}#sql-metrics).

### data source
A storage location that contains a collection of datasets.  A [warehouse](#warehouse) in Soda SQL is one form of datasource. A datasource may also imply a compute engine that Soda SQL uses to compute measurements.

### dataset
A representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, a stream in Kafka, or a dataframe built in a Spark application.

### default metric
An out-of-the-box metric that you can configure in a scan YAML file. There are two levels of default metric: [table](#table-metric), which are metrics that apply to an entire table of data, and [column](#column-metric), which are metrics that apply to individual columns in a table.

By contrast, you can use [SQL metrics]({% link soda-sql/documentation/sql_metrics.md %}#sql-metrics) to define custom metrics in a scan YAML file.

### env_vars YAML
The file in your local user home directory that stores your warehouse login credentials.

### measurement
The value for a metric that Soda SQL obtains during a scan. For example, in `row_count = 5`, `row_count` is the metric and `5` is the measurement.

### metric
A property of the data in your database. See [Metrics]({% link soda-sql/documentation/sql_metrics.md %}).

### monitor
A set of details you define in Soda Cloud which Soda SQL uses when it runs a scan. For a new monitor, you define: a dataset and column against which to execute a test, a test, an alert, a notification, an owner, and a description. See [Scans]({% link soda-sql/documentation/scan.md %}).

### notification
A setting you configure in Soda Cloud that defines whom to notify when a data issue triggers an alert. See also: [alert](#alert).

### scan
A Soda SQL CLI command that executes tests to extract information about data in a data source.

### scan YAML
The file in which you configure scan metrics and tests. Soda SQL uses the input from this file to prepare, then run SQL queries against your data. See [Scan YAML]({% link soda-sql/documentation/scan-yaml.md %}).

### Soda Cloud
A free, web application that enables you to examine the results of Soda SQL scans and create monitors and alerts. To use Soda Cloud, you must set up and connect Soda SQL to your Soda cloud account. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup) then [connect Soda SQL to Soda Cloud]({% link soda-sql/documentation/connect_to_cloud.md %}).

### Soda SQL
An open-source command-line tool that scans the data in your warehouse. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. Start by [installing Soda SQL]({% link soda-sql/getting-started/installation.md%}).

### SQL metric
A custom metric you define in your scan YAML file. Also known as a custom metric. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/documentation/sql_metrics.md %}#sql-metrics).

### table
A type of [dataset](#dataset). 

### table metric
A property of the data in a table in your database. Use a table metric to define tests that apply to all the columns in the table during a scan. See [Table metrics]({% link soda-sql/documentation/sql_metrics.md %}#table-metrics).

### test
A Python expression that, during a scan, checks metrics to see if they match the parameters defined for a measurement. As a result of a scan, a test either passes or fails. See [Tests]({% link soda-sql/documentation/tests.md %}).

### warehouse
A type of [datasource](#datasource).

### warehouse directory
The top directory in the Soda SQL directory structure which contains your warehouse YAML file and, generally, your `/tables` directory.

### warehouse YAML
The file in which you configure warehouse connection details and Soda Cloud connection details. See [Warehouse YAML]({% link soda-sql/documentation/warehouse.md %}) and [Connect to Soda Cloud]({% link soda-sql/documentation/connect_to_cloud.md %}).