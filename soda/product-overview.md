---
layout: default
title: Soda product overview
description: Soda SQL utilizes user-defined input to prepare SQL queries to find bad data. Use the Soda Cloud web app to visualize results of scans and set up alerts.
parent: Get started
---

# Soda product overview

[Soda OSS tools](#soda-oss-tools) <br />
[Soda Checks Language](#soda-checks-language-sodacl)<br />
[Soda Cloud](#soda-cloud)<br />
[Soda in operation](#soda-in-operation)<br />
[Go further](#go-further)<br />
<br />

Soda has three parts that work together to establish and maintain the reliability of data in your organization: **Soda OSS tools**, **Soda Checks Language**, and **Soda Cloud**.


## Soda OSS tools

Soda's free, open-source software products are command-line tools that you install in your environment and connect to your data sources. Once connected, you run scans of your data from the command-line to find invalid, missing, or unexpected data. The scan results in the CLI indicate whether the data quality tests you defined passed, failed, or triggered a warning. 

Armed with this information, you and your data engineering team can diagnose data quality issues and take steps to prioritize and resolve issues based on downstream impact.

There are three OSS CLI tools to choose from: 

* ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="80px" width="80px"} is the original command-line tool that Soda created to test for data quality. A solid, production-ready tool, it provides many built-in metrics you can use to write data quality tests. Where the built-in metrics can't quite address the complexities of a data quality test, you can include your own custom metrics and SQL queries. Access [Soda SQL documentation]({% link soda-sql/overview.md %}).

* ![soda-spark-logo](/assets/images/soda-spark-logo.png){:height="103px" width="103px"} is an extension of Soda SQL that allows you to run Soda SQL functionality programmatically on a Spark DataFrame. Access [Soda Spark documentation]({% link soda-spark/install-and-use.md %}).

* ![soda-core-logo](/assets/images/soda-core-logo.png){:height="98px" width="98px"} ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"} is the newest Soda technology that improves upon the functionality that Soda SQL offers. Available as a beta product, Soda Core works with [SodaCL](#soda-checks-language-sodacl) to make use of even more built-in metrics, notably for freshness, and reference checks between datasets. When it becomes generally available, Soda Core will replace Soda SQL as the primary and most accessible tool for maintaining data reliability. Access [Soda Core documentation]({% link soda-core/overview-main.md %}).

Refer to the [Soda product comparison]({% link soda/product-matrix.md %}) to compare the features and functionality of the tools.

These OSS tools essentially serve as the backbone of Soda technology, the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality. To extend your data reliability efforts even further, you have the option of integrating the OSS tools with other technologies.
* Integrate Soda with your [data orchestration tool]({% link soda-sql/orchestrate_scans.md %}), such as Airflow or Prefect, to schedule scans and automate actions based on scan results.
* Connect Soda OSS tools to a [Soda Cloud account](#soda-cloud) where you and your team can use the web application to collaborate on data quality monitoring.


## Soda Checks Language (SodaCL)

![soda-cl-logo](/assets/images/sodacl-logo.png){:height="74px" width="74px"} ![beta](/assets/images/beta.png){:height="30px" width="30px" align="top"} is a YAML-based, domain-specific language for data reliability that you use to define Soda Checks. A Soda Check is a test that Soda Core executes when it scans a dataset in your data source. 

Designed as a human-readable language, SodaCL includes over 30 built-in metrics that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness; see example below. Compatible with Soda Core, SodaCL enables data engineers and analysts to collaborate on writing checks for good-quality data. 

Access [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}).

#### Example SodaCL checks

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

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="105px" width="105px"} is the web application that you can optionally connect to your Soda OSS tool. It aggregates all metrics and tests for data quality and enables multiple people in an organization to monitor scan results, collaborate on issue investigation, and even write their own tests and checks for data reliability. Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data quality.

Beyond increasing the observability of your data, Soda Cloud enables you to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}), view samples of the [rows that failed]({% link soda-cloud/failed-rows.md %}) a test during a scan, and [integrate with your Slack]({% link soda/integrate-slack.md %}) workspace to get [alert notifications]({% link soda-cloud/monitors.md %}) and automatically spin up new channels for collaborative [incident investigation]({% link soda-cloud/incidents.md %}).

Access [Soda Cloud documentation]({% link soda-cloud/overview.md %}).

![overview-soda-cloud](/assets/images/overview-soda-cloud.png){:height="700px" width="700px"}


## Soda in operation

After you install one of the Soda OSS CLI tools, you need to create two YAML files to be able to run scans for data quality:
* a file that contains the details Soda needs to connect to a data source, such as host, type, and login credentials. In Soda SQL and Soda Spark, this is called the `warehouse.yml`; in Soda Core, this is called the `configuration.yml`.
* a file that contains the tests or checks you define for data quality. In Soda SQL and Soda Spark, this is called the `scan.yml`; in Soda Core, this is called the `checks.yml`. 

In your environment, you would likely have several `warehouse.yml` files to connect to multiple data sources and multiple environments (staging, production), and several `scan.yml` files that contain different kinds of tests for different datasets. However, with at least one of each of these files in existence, you can run a scan for data quality. 

A scan is a soda command that you execute in the CLI. Soda SQL and Soda Spark run scans on individual datasets, but in Soda Core, you can use a [for each check]({% link soda-cl/for-each.md %}) to scan across multiple datasets. The Soda OSS tools use the input in the YAML files to prepare SQL queries that they runs against the data. Technically, a test or check is a Python expression that, during a scan, checks metrics to see if they match the parameters you defined for a measurement. Learn more about [Scans]({% link soda/scan.md %}).

When it completes a scan, the Soda OSS CLI tool returns the scan results in the CLI. The output informs you of all the tests that passed or failed, and, in Soda Core's case, triggered a warning or resulted in an error. 

#### Example Soda SQL scan results 

```shell
  | 2.x.xx
  | Scanning tables/breakdowns.yml ...
  | ...
  | No Soda Cloud account configured
  | Executing SQL query: 
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE lower(table_name) = 'breakdowns' 
  AND table_catalog = 'sodasql_tutorial' 
  AND table_schema = 'new_york'
  | SQL took 0:00:00.062634
  ...
  | Test test(row_count > 0) passed with measurements {"expression_result": 199998, "row_count": 199998}
  | Test column(school_year) test(invalid_percentage == 0) passed with measurements {"expression_result": 0.0, "invalid_percentage": 0.0}
  | Test column(bus_no) test(invalid_percentage <= 20) passed with measurements {"expression_result": 19.99919999199992, "invalid_percentage": 19.99919999199992}
  | Test column(schools_serviced) test(invalid_percentage <= 15) passed with measurements {"expression_result": 12.095620956209562, "invalid_percentage": 12.095620956209562}
  | Executed 2 queries in 0:00:03.291901
  | Scan summary ------
  | 239 measurements computed
  | 4 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```

#### Example Soda Core scan results 

```shell
Soda Core 3.0.0bx
Scan summary:
1/1 check PASSED: 
    my_dataset in my_database_name
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```

You can use the scan results to integrate with a data orchestration tool such as Airflow so that you can automate any mitigating actions should Soda discover issues with the quality of the data your organization uses to make decisions.

Further, you have the option of connecting a Soda OSS tool to Soda Cloud. The Soda OSS tools use a secure API to connect to Soda Cloud. When a Soda OSS tool completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

![product-overview-cloud](/assets/images/product-overview-cloud.png){:height="700px" width="700px"}

In Soda Cloud, you can do much more than just review the scan results.
* [Create monitors and alerts]({% link soda-cloud/monitors.md %}) directly in Soda Cloud. The Soda OSS tool picks up those monitors during a scan and returns the results for both the tests or checks defined in a YAML *and* any monitors you and your team defined in the web app. 
* Take advantage of the [anomaly detection monitor]({% link soda-cloud/anomaly-detection.md %}) that Soda Cloud automatically sets up for all the time-series datasets it discovers. 
* [Integrate with Slack]({% link soda/integrate-slack.md %}) to configure and send alerts to your team when there is a data quality issue.
* Create and track data quality [incidents]({% link soda-cloud/incidents.md %}) associated with failed monitor results so your team can collaborate on issue investigation.
<!--* Get at-a-glance information about column metrics and the overall health of a dataset in the Datasets dashboard.-->
* [Integrate your dbt tests]({% link soda/integrate-dbt.md %}) into Soda Cloud, or integrate with your [Metaphor]({% link soda/integrate-metaphor.md %}) or [Alation]({% link soda/integrate-alation.md %}) data catalog.


## Go further

* Access a [Soda product comparison]({% link soda/product-matrix.md %}) to learn about the features and functionalities each tool has to offer.
* [Install Soda SQL]({% link soda-sql/installation.md %}) or [Soda Core]({% link soda-core/installation.md %}), then sign up for a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Get up and running in a few minutes using the [Quick start for Soda SQL and Soda Cloud]({% link soda/quick-start-soda-sql.md %}) or the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).
* Learn more about [scans]({% link soda/scan.md %}) and [metrics]({% link soda/metrics.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}