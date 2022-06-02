---
layout: default
title: Glossary
description: Access a glossary of Soda terminology. 
parent: Soda
redirect_from: 
- /soda-sql/documentation/glossary.html
- /soda/common-terms.html
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->

### alert
A setting that you configure in a Soda Cloud monitor by specifying key:value thresholds which, if exceeded, trigger a notification. See also: [notification](#notification).

### alert configuration ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
A configuration in a SodaCL check that you use to explicitly specify the conditions that warrant a warn result. See [Optional check configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).

### analyze
{% include glossary-analyze.md %}

### built-in metric
An out-of-the-box metric that you can configure in a scan YAML file. There are two kinds of built-in metrics: [dataset](#dataset-metric), which are metrics that apply to an entire dataset, and [column](#column-metric), which are metrics that apply to individual columns in a dataset.

By contrast, you can use [custom metrics]({% link soda-sql/sql_metrics.md %}#custom-metrics), also known as SQL metrics, to define SQL queries in a scan YAML file in Soda SQL.

### check ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
A test for data quality that you write using the Soda Checks Language (SodaCL). See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### checks YAML ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
The file in which you define SodaCL checks. Soda Core uses the input from this file to prepare, then run SQL queries against your data.

### cloud metric store
The place in Soda Cloud that stores the values of measurements collected over time as Soda SQL executes tests.  

### column
A column in a dataset in your data source.

### column configuration key
The key in the key-value pair that you use to define what qualifies as a valid value in a column. A Soda scan uses the value of a column configuration key to determine if it should pass or fail a test. For example, in `valid_format: UUID` , `valid_format` is a column configuration key and `UUID` is the only format of the data in the column that Soda considers valid. See [Column configuration keys]({% link soda/metrics.md %}#column-configuration-keys-or-validity-rules).

### column metric
A property of the data of a single column in your data source. Use a column metric to define tests that apply to specific columns in a dataset during a scan. See [Column metrics]({% link soda/metrics.md %}#column-metrics).

### configuration key
The key in the key-value pair that you use to define configuration in your scan YAML file. See [Scan YAML configuration keys]({% link soda-sql/scan-yaml.md %}#scan-yaml-table-configuration-keys).

### configuration YAML ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
The file in which you configure data source connection details and Soda Cloud connection details. Applies to Soda Core, only.

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
A metric to use in Soda SQL tests which rely on historic measurements stored in the Cloud Metric Store. See [Historic metrics](#historic-metrics). 

### measurement
{% include glossary-measurement.md %}

### metric
{% include glossary-metric.md %}

### metric store
The component in Soda Cloud that stores metric measurements. This component facilities the visualization of changes to your data over time.

### monitor
{% include glossary-monitor.md %}

### notification
A setting you configure in a Soda Cloud monitor that defines whom to notify when a data issue triggers an alert. See also: [alert](#alert).

### scan
{% include glossary-scan.md %}

### scan YAML
{% include glossary-scan-yaml.md %}

### SodaCL ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
The domain-specific language to define Soda Checks in a checks YAML file. A Soda Check is a test that Soda Core (Beta) executes when it scans a dataset in your data source. See [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}).

### Soda Cloud
A web application that enables you to examine scan results and create monitors and alerts. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup). If you also use Soda SQL, you can [connect Soda SQL to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}).

### Soda Core ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
A free, open-source, command-line tool that enables you to use the Soda Checks Language (Beta) to turn user-defined input into aggregated SQL queries. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. See <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core documentation</a>.

### Soda Spark
Soda Spark is an extension of Soda SQL that allows you to run Soda SQL functionality programmatically on a <a href="https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.html" target="_blank">Spark dataframe</a>.

### Soda SQL
An open-source command-line tool that scans the data in your data source. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. Start by [installing Soda SQL]({% link soda-sql/installation.md%}).

### SQL metric
See [custom metric](#custom-metric).

### table
A type of [dataset](#dataset). 

### table metric
See [dataset metric](#dataset-metric).

### threshold ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"}
The value for a metric that Soda checks against during a scan. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

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
{% include docs-footer.md %}