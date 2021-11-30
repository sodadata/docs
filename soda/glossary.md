---
layout: default
title: Glossary
parent: Soda
redirect_from: 
- /soda-sql/documentation/glossary.html
- /soda/common-terms.html
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->

### alert
A setting that you configure in a Soda Cloud monitor by specifying key:value thresholds which, if exceeded, trigger a notification. See also: [notification](#notification).

### analyze
{% include glossary-analyze.md %}

### built-in metric
An out-of-the-box metric that you can configure in a scan YAML file. There are two kinds of built-in metrics: [dataset](#dataset-metric), which are metrics that apply to an entire dataset, and [column](#column-metric), which are metrics that apply to individual columns in a dataset.

By contrast, you can use [custom metrics]({% link soda-sql/sql_metrics.md %}#custom-metrics), also known as SQL metrics, to define SQL queries in a scan YAML file in Soda SQL.

### cloud metric store
The place in Soda Cloud that stores the values of measurements collected over time as Soda SQL executes tests.  

### column
A column in a dataset in your data source.

### column configuration key
The key in the key-value pair that you use to define what qualifies as a valid value in a column. A Soda scan uses the value of a column configuration key to determine if it should pass or fail a test. For example, in `valid_format: UUID` , `valid_format` is a column configuration key and `UUID` is the only format of the data in the column that Soda considers valid. See [Column configuration keys]({% link soda/metrics.md %}#column-configuration-keys-or-validity-rules).

### column metric
A property of the data of a single column in your data source. Use a column metric to define tests that apply to specific columns in a dataset during a scan. See [Column metrics]({% link soda/metrics.md %}#column-metrics).

### configuration key
The key in the key-value pair that you use to define configuration in your scan YAML file. See [Scan YAML configuration keys]({% link soda-sql/scan-yaml.md %}#scan-yaml-configuration-keys).

### create
A Soda SQL CLI command that creates a warehouse directory.

### custom metric
A metric you define in your scan YAML file using SQL queries. Also known as a SQL metric. SQL metrics essentially enable you to add SQL queries to your scan YAML file so that Soda SQL runs them during a scan. See [SQL metrics]({% link soda-sql/sql_metrics.md %}#custom-metrics).

### data source
{% include glossary-data-source.md %}

### dataset
{% include glossary-dataset.md %}

### dataset metric
A property of the data in a dataset in your data source. Use a dataset metric to define tests that apply to all the columns in the dataset during a scan. See [Dataset metrics]({% link soda/metrics.md %}#dataset-metrics).

### default metric
See [built-in metric](#built-in-metric).

### env_vars YAML
The file in your local user home directory that stores your data source login credentials.

### historic metric
A metric to use in Soda SQL tests which rely on historic measurements stored in the Cloud Metric Store. See [Historic metrics (Experimental)](#historic-metrics-experimental). 

### measurement
{% include glossary-measurement.md %}

### metric
{% include glossary-metric.md %}

#### metric store
The component in Soda Cloud that stores metric measurements. This component facilities the visualization of changes to your data over time.

### monitor
{% include glossary-monitor.md %}

### notification
A setting you configure in a Soda Cloud monitor that defines whom to notify when a data issue triggers an alert. See also: [alert](#alert).

### scan
{% include glossary-scan.md %}

### scan YAML
{% include glossary-scan-yaml.md %}

### Soda Cloud
A free, web application that enables you to examine scan results and create monitors and alerts. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup). If you also use Soda SQL, you can [connect Soda SQL to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}).

### Soda SQL
An open-source command-line tool that scans the data in your data source. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. Start by [installing Soda SQL]({% link soda-sql/installation.md%}).

### SQL metric
See [custom metric](#custom-metric).

### table
A type of [dataset](#dataset). 

### table metric
See [dataset metric](#dataset-metric).

### test
{% include glossary-test.md %}

### validity rule
In Soda Cloud, the key-value pair that you use to define what qualifies as a valid value in a column. A Soda scan uses the value defined in a validity rule to determine if it should pass or fail a test. See also: [column configuration key](#column-configuration-key).

### warehouse
{% include glossary-warehouse.md %}

### warehouse directory
The top directory in the Soda SQL directory structure which contains your warehouse YAML file and, generally, your `/tables` directory.

### warehouse YAML
{% include glossary-warehouse-yaml.md %}


<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.