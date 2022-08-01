---
layout: default
title: Soda product overview
description: Soda Core utilizes user-defined input to prepare SQL queries to find bad data. Use the Soda Cloud web app to visualize results of scans and set up alerts.
parent: Get started
---

# Soda product overview

Soda has three parts that work together to establish and maintain the reliability of data in your organization: **Soda Core**, **Soda Checks Language**, and **Soda Cloud**.

[Soda Core ](#soda-core) <br />
[Soda Checks Language ](#soda-checks-language-sodacl)<br />
[Soda Cloud](#soda-cloud)<br />
[Soda in operation](#soda-in-operation)<br />
[Legacy OSS tools](#legacy-oss-tools) <br />
[Go further](#go-further)<br />
<br />




## Soda Core 

![soda-core-logo](/assets/images/soda-core-logo.png){:height="98px" width="98px"}  is a free, open-source, command-line tool that you install in your environment and connect to your data sources. Once connected, you run scans of your data from the command-line to find invalid, missing, or unexpected data. The scan results in the CLI indicate whether the data quality tests you defined passed, failed, or triggered a warning. 

Armed with this information, you and your data engineering team can diagnose data quality issues and take steps to prioritize and resolve issues based on downstream impact.

Soda Core works with [SodaCL](#soda-checks-language-sodacl), the YAML-based language you use to define checks that surface "bad" data during a scan of data in your data sources. 

Soda Core essentially serves as the backbone of Soda technology, the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality. To extend your data reliability efforts even further, you have the option of integrating Soda Core with other technologies.
* Integrate Soda with your [data orchestration tool]({% link soda-core/orchestrate-scans.md %}), such as Airflow or Prefect, to schedule scans and automate actions based on scan results.
* Connect Soda Core to a [Soda Cloud account](#soda-cloud) where you and your team can use the web application to collaborate on data quality monitoring.

Access [Soda Core documentation]({% link soda-core/overview-main.md %}).


## Soda Checks Language (SodaCL) 

![soda-cl-logo](/assets/images/sodacl-logo.png){:height="74px" width="74px"}  is a YAML-based, domain-specific language for data reliability that you use to define Soda Checks. A Soda Check is a test that Soda Core executes when it scans a dataset in your data source. 

Designed as a human-readable language, SodaCL includes over 25 built-in metrics and checks that you can use to write Soda Checks for data quality, including metrics for missing values, duplicates, schema changes, and freshness; see example below. Compatible with Soda Core, SodaCL enables data engineers and analysts to collaborate on writing checks for good-quality data. 

Access [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}).

#### Example SodaCL checks

```yaml
checks for CUSTOMERS:
  - row_count > 0
  - missing_count(last_name) = 3:
      missing values: [N/A, None]
  - duplicate_count(phone, email) < 3
  - schema:
      warn:
        when required column missing: [id, size, distance]
        when forbidden column present: [pii_%]
        when wrong column type:
          id: varchar
          distance: integer
        when wrong column index:
          id: 0

  checks for ORDERS [daily]:
  - freshness(created_at) < 2h
```

## Soda Cloud

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="105px" width="105px"} is the web application that you can optionally connect to Soda Core. It aggregates all metrics and tests for data quality and enables multiple people in an organization to monitor scan results, collaborate on issue investigation, and even write their own checks for data reliability. 

Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data quality.

Beyond increasing the observability of your data, Soda Cloud enables you to view samples of the [rows that failed]({% link soda-cloud/failed-rows.md %}) a check during a scan and [integrate with your Slack]({% link soda/integrate-slack.md %}) workspace to get [alert notifications]({% link soda-cloud/agreements.md %}) and automatically spin up new channels for collaborative [incident investigation]({% link soda-cloud/incidents.md %}).

Access [Soda Cloud documentation]({% link soda-cloud/overview.md %}).

![preview](/assets/images/preview.png){:height="60px" width="60px"} Some new features and functionality for are accessible via limited-access preview. <a href="mailto:support@soda.io">Let us know</a> if you want access!
* [Create a data source in Soda Cloud]({% link soda-cloud/add-datasource.md %})
* [Create an agreement]({% link soda-cloud/agreements.md %})
* [Deploy a Soda Agent]({% link soda-agent/deploy.md %})
* [Add automated monitoring checks]({% link soda-cl/automated-monitoring.md %})
* [Send profile info to Soda Cloud]({% link soda-cl/profile.md %})


![overview-soda-cloud](/assets/images/overview-soda-cloud.png){:height="700px" width="700px"}


## Soda in operation

After you install Soda Core, you need to create two YAML files to be able to run scans for data quality:
* a `configuration.yml` file that contains the details Soda needs to connect to a data source, such as host, type, and login credentials. 
* a `checks.yml` file that contains the tests or checks you define for data quality. 

With at least one of each of these files in existence, you can run a scan for data quality. A scan is a soda command that you execute in the CLI. Soda Core uses the input in the YAML files to prepare SQL queries that it runs against the data. Technically, a check is a Python expression that, during a scan, checks metrics to see if they match the parameters you defined for a threshold. Learn more about [Soda Core scans]({% link soda-core/scan-core.md %}).

When it completes a scan, Soda Core returns the scan results in the CLI. The output informs you of all the checks that passed, failed, triggered a warning, or resulted in an error. 

#### Example Soda Core scan results 

```shell
Soda Core 3.0.xx
Scan summary:
1/1 check PASSED: 
    my_dataset in my_database_name
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```

You can use the scan results to integrate with a data orchestration tool such as Airflow so that you can automate any mitigating actions when Soda discovers issues with the quality of the data in your organization.

Further, you have the option of connecting a Soda Core to Soda Cloud. Soda Core uses a secure API to connect to Soda Cloud. When it completes a scan, Soda Core pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

![product-overview-cloud](/assets/images/product-overview-cloud.png){:height="700px" width="700px"}

In Soda Cloud, you can do much more than just review the scan results.
* [Integrate with Slack]({% link soda/integrate-slack.md %}) to configure and send alerts to your team when there is a data quality issue.
* Create and track data quality [incidents]({% link soda-cloud/incidents.md %}) associated with failed check results so your team can collaborate on issue investigation.
* Get at-a-glance information about column metrics and the overall health of a dataset in the Datasets dashboard.
* Integrate with your [Metaphor]({% link soda/integrate-metaphor.md %}) or [Alation]({% link soda/integrate-alation.md %}) data catalog.

## Legacy OSS tools

The very first Soda OSS tools, Soda SQL and Soda Spark served their community well since 2021. They have been deprecated. 

* ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="80px" width="80px"} was the original command-line tool that Soda created to test for data quality. Access the [legacy documentation]({% link soda-sql/overview.md %}).

* ![soda-spark-logo](/assets/images/soda-spark-logo.png){:height="103px" width="103px"} was an extension of Soda SQL that allowed you to run Soda SQL functionality programmatically on a Spark DataFrame. It has been replaced by Soda Core configured to [connect with Apache Spark DataFrames]({% link soda-core/configuration.md %}#connect-to-apache-spark-dataframes). Access [legacy documentation]({% link soda-spark/install-and-use.md %}).

## Go further

* Access a [Soda product comparison]({% link soda/product-matrix.md %}) to learn about the features and functionalities each tool has to offer.
* Get up and running in a few minutes using the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}).
* Learn more about Soda Core [scans]({% link soda-core/scan-core.md %}) and [metrics and checks]({% link soda-cl/metrics-and-checks.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}