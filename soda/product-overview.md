---
layout: default
title: Soda product overview
description: Soda SQL utilizes user-defined input to prepare SQL queries to find bad data. Use the Soda Cloud web app to visualize results of scans and set up alerts.
parent: Get started
---

# Soda product overview

*Reading time: ~5 minutes*
<br />
<br />

Soda has three parts that work together to establish and maintain the reliability of data in your organization.
* [Soda OSS tools](#soda-oss-tools)
* [Soda Checks Language](#soda-checks-language-sodacl)
* [Soda Cloud](#soda-cloud)

## Soda OSS tools

Soda's free, open-source software products are command-line tools that you install in your environment and connect to your data sources. Once connected, you run scans of your data from the command-line to find invalid, missing, or unexpected data. The scan results in the CLI indicate whether the data quality tests you defined passed, failed, or triggered a warning. 

Armed with this information, you and your data engineering team can diagnose data quality issues and take steps to prioritize and resolve issues based on downstream impact.

There are three OSS CLI tools to choose from: 

* ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="80px" width="80px"} is the original command-line tool that Soda created to test for data quality. A solid, production-ready tool, it provides many built-in metrics you can use to write data quality tests. Where the built-in metrics can't quite address the complexities of a data quality test, you can include your own custom SQL queries. Access [Soda SQL documentation]({% link soda-sql/overview.md %}).

* ![soda-spark-logo](/assets/images/soda-spark-logo.png){:height="103px" width="103px"} is an extension of Soda SQL that allows you to run Soda SQL functionality programmatically on a Spark dataframe. Access [Soda Spark documentation]({% link soda-spark/install-and-use.md %}).

* ![soda-core-logo](/assets/images/soda-core-logo.png){:height="98px" width="98px"} ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"} is the newest Soda technology that improves upon the functionality that Soda SQL offers. Available as a beta product, Soda Core works with SodaCL to make use of even more built-in metrics, notably for freshness, and referential integrity between datasets. When it becomes generally available, Soda Core will replace Soda SQL as the best and most accessible tool for maintaining data reliability. Access <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core documentation</a>.

Refer to the Soda product matrix to compare options.

These OSS tools essentially serve as the backbone of Soda technology, the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality. To extend your data reliability efforts even futher, you can integrate the OSS tools with other technologies:
* integrate Soda with your data orchestration tool, such as Airflow or Prefect, to schedule scans and automate actions based on scan results
* connect Soda OSS tools to a [Soda Cloud account](#soda-cloud) where you and your team can use the web application to collaborate on data quality monitoring


## Soda Checks Language (SodaCL)

![soda-cl-logo](/assets/images/sodacl-logo.png){:height="74px" width="74px"} ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"} is a YAML-based, domain-specific language for data reliability that you use to define Soda Checks. A Soda Check is a test that Soda Core executes when it scans a dataset in your data source. 

Designed as a human-readable language, SodaCL includes over 30 built-in metrics that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness. Compatible with Soda Core, SodaCL enables data engineers and analysts to collaborate on writing checks for good-quality data. Access [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}).

```yaml
checks for CUSTOMERS:
  - row_count > 0

  - missing_count(pct) = 3:
      missing values: ['N/A', 'No value']

  - missing_count(id) = 0
  - duplicate_count(id) = 0

  - duplicate_count(cat, country) < 3

  - schema:
      warn:
        when required column missing: ['id', 'size', 'distance']
        when forbidden column present: ['email_address', 'pii_%']
        when wrong column type:
          id: varchar
          distance: integer
        when wrong column index:
          id: 0

  checks for ORDERS [daily]:
  - freshness using created_at < 2h
```

## Soda Cloud

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="105px" width="105px"} is the web application that you can optionally connect to your Soda OSS tool. It aggregates all metrics and tests for data quality and enables multiple people in an organization to monitor scan results, collaborate on issue investigation, and even write their own tests and checks for data reliability. Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data.

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, view samples of the rows that failed a test during a scan, and integrate with your Slack workspace to get alert notifications and automatically spin up new channels for collaborative issue investigation.

Access [Soda Cloud documentation]({% link soda-cloud/overview.md %}).

![overview-soda-cloud](/assets/images/overview-soda-cloud.png){:height="700px" width="700px"}


## Soda in operation

End-to-end, 

The OSS tools use the information in two YAML files to run scans for data quality:
* a file that contains the details Soda needs to connect to a data source, such as host, type, and login credentials
* a file that contains the tests or checks you define for data quality  

Soda Core and Soda SQL use a secure API to connect to Soda Cloud. When Soda Core or Soda SQL completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

Technically, a check is a Python expression that, during a scan, checks metrics to see if they match the parameters you defined for a measurement. 






## Go further

* [Install Soda SQL]({% link soda-sql/installation.md %}) or <a href=https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core</a> and sign up for a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data using Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}