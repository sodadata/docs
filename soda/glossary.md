---
layout: default
title: Glossary
description: Access a glossary of Soda terminology. 
parent: Reference
redirect_from: 
- /soda-sql/documentation/glossary.html
- /soda/common-terms.html
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->

#### agreement
A collection of checks that serve as a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. 

### alert configuration 
A configuration in a SodaCL check that you use to explicitly specify the conditions that warrant a warn result. See [Optional check configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).

### built-in metric
An out-of-the-box metric that you can configure in a checks YAML file. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### check 
A test for data quality that you write using the Soda Checks Language (SodaCL). See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### checks YAML 
The file in which you define SodaCL checks. Soda Core uses the input from this file to prepare, then run SQL queries against your data. See [How Soda Core works]({% link soda-core/how-core-works.md %}).

### cloud metric store
The place in Soda Cloud that stores the values of measurements collected over time as Soda Core executes checks.  

### column
A column in a dataset in your data source.

### configuration key
The key in the key-value pair that you use to define what qualifies as a missing or valid value in a column. A Soda scan uses the value of a column configuration key to determine if a check should pass, warn, or fail. For example, in `valid format: UUID` , `valid format` is a column configuration key and `UUID` is the only format of the data in the column that Soda considers valid. See [Missing metrics]({% link soda-cl/missing-metrics.md %}) and [Validity metrics]({% link soda-cl/validity-metrics.md %}).

### configuration YAML 
The file in which you configure data source connection details and Soda Cloud connection details. See [How Soda Core works]({% link soda-core/how-core-works.md %}).

### data source
{% include glossary-data-source.md %}

### dataset
{% include glossary-dataset.md %}

### measurement
{% include glossary-measurement.md %}

### metric
{% include glossary-metric.md %}

### metric store
The component in Soda Cloud that stores metric measurements. This component facilities the visualization of changes to your data over time.

### monitor
{% include glossary-monitor.md %}

### notification
A setting you configure in a Soda Cloud agreement that defines whom to notify with check results after a scan. 

### scan
{% include glossary-scan.md %}

#### scan definition
A collection of checks YAML files that contain the checks for data quality you wish to scan at a specific time, including details for which Soda Agent to use to connect to which data source. Effectively, a scan definition provides the what, when, and where to run a scan.

#### Soda Agent
The Helm chart you deploy in your Kubernetes cluster to faciliate a secure connection between your Soda Cloud account and your data sources. See [Deploy a Soda Agent]({% link soda-agent/deploy.md %}).

### SodaCL 
The domain-specific language to define Soda Checks in a checks YAML file. A Soda Check is a test that Soda Core executes when it scans a dataset in your data source. See [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}).

### Soda Cloud
A web application that enables you to examine scan results and create agreements. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup). If you also use Soda Core, you can [connect Soda Core to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}).

### Soda Core 
A free, open-source, command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries. You can use this as a stand-alone tool to monitor data quality from the command-line, or connect it to a Soda Cloud account to monitor your data using a web application. See [Soda Core documentation]({% link soda-core/overview-main.md %}).

### Soda Spark (Deprecated)
Soda Spark was an extension of Soda SQL that allowed you to run Soda SQL functionality programmatically on a Spark DataFrame. It has been replaced by Soda Core configured to [connect with Apache Spark DataFrames]({% link soda-core/configuration.md %}#connect-to-apache-spark-dataframes). Access [legacy documentation]({% link soda-spark/install-and-use.md %}).

### Soda SQL (Deprecated)
Soda SQL was an open-source command-line tool that scanned the data in your data source. Replaced by [Soda Core]({% link soda-core/overview-main.md %}). Access [legacy documentation]({% link soda-sql/overview.md %}).

### threshold 
The value for a metric that Soda checks against during a scan. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### validity rule
In Soda Cloud, the key-value pair that you use to define what qualifies as a missing valid value in a column. A Soda scan uses the value defined in a validity rule to determine if it should pass or fail a check. See also: [configuration key](#configuration-key).

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}