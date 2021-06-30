---
layout: default
title: Glossary
parent: Soda
redirect_from: /soda-sql/documentation/glossary.html
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->

### alert
A setting that you configure in a Soda Cloud monitor by specifying key:value thresholds which, if exceeded, trigger a notification. See also: [notification](#notification).

### analyze
{% include glossary-analyze.md %}

### column
A column in a table in your warehouse.

### column configuration key
The key in the key-value pair that you use to define what qualifies as a valid value in a column. A Soda SQL scan uses the value of a column configuration key to determine if it should pass or fail a test on a column. For example, in `valid_format: UUID` , `valid_format` is a column configuration key and `UUID` is the only format of the data in the column that Soda SQL considers valid. See [Column metrics]({% link soda-sql/sql_metrics.md %}#column-metrics).

### column metric
A property of the data of a single column in your database. Use a column metric to define tests that apply to specific columns in a table during a scan. See [Column metrics]({% link soda-sql/sql_metrics.md %}#column-metrics).

### configuration key
The key in the key-value pair that you use to define configuration in your scan YAML file. See [Scan YAML configuration keys]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys).

### create
A Soda SQL CLI command that creates a warehouse directory.

### custom metric
A metric you define in your scan YAML file using SQL queries. Also known as a SQL metric. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/sql_metrics.md %}#sql-metrics).

### data source
{% include glossary-data-source.md %}

### dataset
{% include glossary-dataset.md %}

### default metric
An out-of-the-box metric that you can configure in a scan YAML file. There are two levels of default metric: [table](#table-metric), which are metrics that apply to an entire table of data, and [column](#column-metric), which are metrics that apply to individual columns in a table.

By contrast, you can use [SQL metrics]({% link soda-sql/sql_metrics.md %}#sql-metrics) to define custom metrics in a scan YAML file.

### env_vars YAML
The file in your local user home directory that stores your warehouse login credentials.

### measurement
{% include glossary-measurement.md %}

### metric
{% include glossary-metric.md %}

#### metric store
The component in Soda Cloud that stores metric measurements.

### monitor
{% include glossary-monitor.md %}

### notification
A setting you configure in Soda Cloud that defines whom to notify when a data issue triggers an alert. See also: [alert](#alert).

### scan
{% include glossary-scan.md %}

### scan YAML
{% include glossary-scan-yaml.md %}

### Soda Cloud
A free, web application that enables you to examine the results of Soda SQL scans and create monitors and alerts. To use Soda Cloud, you must set up and connect Soda SQL to your Soda cloud account. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup) then [connect Soda SQL to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}).

### Soda SQL
An open-source command-line tool that scans the data in your warehouse. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. Start by [installing Soda SQL]({% link soda-sql/installation.md%}).

### SQL metric
A custom metric you define in your scan YAML file. Also known as a custom metric. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/sql_metrics.md %}#sql-metrics).

### table
A type of [dataset](#dataset). 

### table metric
A property of the data in a table in your database. Use a table metric to define tests that apply to all the columns in the table during a scan. See [Table metrics]({% link soda-sql/sql_metrics.md %}#table-metrics).

### test
{% include glossary-test.md %}

### warehouse
{% include glossary-warehouse.md %}

### warehouse directory
The top directory in the Soda SQL directory structure which contains your warehouse YAML file and, generally, your `/tables` directory.

### warehouse YAML
{% include glossary-warehouse-yaml.md %}


<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.