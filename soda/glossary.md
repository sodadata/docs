---
layout: default
title: Glossary
description: Access a glossary of Soda terminology. 
parent: Learning resources
redirect_from: 
- /soda-sql/documentation/glossary.html
- /soda/common-terms.html
- /soda-core/terminology.html
---

# Glossary
<!--This glossary contains Soda-specific terms only. Do not define industry terminology such as "SQL" or "query".-->
*Last modified on {% last_modified_at %}*

### agreement
A collection of checks that serve as a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. 

### alert configuration 
A configuration in a SodaCL check that you use to explicitly specify the conditions that warrant a warn result. See [Optional check configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations).

### built-in metric
An out-of-the-box metric that you can configure in a checks YAML file. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### check 
A test for data quality that you write using the Soda Checks Language (SodaCL). Technically, it is a Python expression that checks metrics to see if they match the parameters you defined for a measurement. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### checks YAML 
The file in which you define SodaCL checks. Soda Library uses the input from this file to prepare, then run SQL queries against your data. See [How Soda works]({% link soda-library/how-library-works.md %}).

### cloud metric store
The place in Soda Cloud that stores the values of measurements collected over time as Soda Library executes checks.  

### collection
A saved set of filters in the Checks dashboard that you can access via a dropdown. Also known as a Saved View. 

### column
A column in a dataset in your data source.

### configuration key
The key in the key-value pair that you use to define what qualifies as a missing or valid value in a column. A Soda scan uses the value of a column configuration key to determine if a check should pass, warn, or fail. For example, in `valid format: UUID` , `valid format` is a column configuration key and `UUID` is the only format of the data in the column that Soda considers valid. See [Missing metrics]({% link soda-cl/missing-metrics.md %}) and [Validity metrics]({% link soda-cl/validity-metrics.md %}).

### configuration YAML 
The file in which you configure data source connection details and Soda Cloud connection details. 

### data source
A storage location that contains a collection of datasets, such as Snowflake, Amazon Athena, or GCP BigQuery.

### dataset
A representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, a stream, or a DataFrame in a Spark application.

### incident
A ticket you create and associate with a failed check result so as to track your team's investigation and resolution of a data quality issue. See [Create and track incidents]({% link soda-cloud/incidents.md %}).

### measurement
The value for a metric that Soda Library collects during a scan. 

### metric
A property of the data in your dataset. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).

### metric store
The component in Soda Cloud that stores metric measurements. This component facilities the visualization of changes to your data over time.

### monitor
(Deprecated) A set of details you define in Soda Cloud which Soda SQL used when it ran a scan. Now deprecated and replaced by a [check](#check).

### notification
A setting you configure in a Soda Cloud agreement that defines whom to notify with check results after a scan. 

### recon YAML
The file in which you define SodaCL reconciliation checks. See [Reconciliation checks]({% link soda-cl/recon.md %}).

### scan
A command that executes checks to extract information about data in a data source. See [Run a scan and view results]({% link soda-library/run-a-scan.md %}).

### scan definition
A collection of checks YAML files that contain the checks for data quality you wish to scan at a specific time, including details for which Soda Agent to use to connect to which data source. Effectively, a scan definition provides the what, when, and where to run a scan. 

### scan definition name
A unique identifier that you add to a programmatic scan or to the `soda scan` command using the `-s` option. Soda Cloud uses the scan definition name to correlate subsequent scan results, thus retaining an historical record of the measurements over time. 

### Soda Agent
The Helm chart you deploy in your Kubernetes cluster to faciliate a secure connection between your Soda Cloud account and your data sources. See [Soda Agent basic concepts]({% link soda-agent/basics.md %}).

### SodaCL 
The domain-specific language to define Soda Checks in a checks YAML file. A Soda Check is a test that Soda Library executes when it scans a dataset in your data source. 

### Soda Cloud
A web application that enables you to examine scan results and create agreements. Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup). 

### Soda Core 
A free, open-source, Python library and command-line tool that enables you to use the Soda Checks Language to turn user-defined input into aggregated SQL queries that test for data quality. See  Soda Core in<a href="https://github.com/sodadata/soda-core" target="_blank"> GitHub</a>.

### Soda Library 
A Python library and CLI tool that is a commercial extension of Soda Core. Connect Soda Library with over a dozen data sources and Soda Cloud, and use the Soda Checks Language to turn user-defined input into aggregated SQL queries that test for data quality.

### Soda Spark (Deprecated)
Soda Spark was an extension of Soda SQL that allowed you to run Soda SQL functionality programmatically on a Spark DataFrame. It has been replaced by Soda Library configured to [connect Soda to Apache Spark]({% link soda/connect-spark.md %}). 

### Soda SQL (Deprecated)
Soda SQL was an open-source command-line tool that scanned the data in your data source. Replaced by Soda Library. 

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