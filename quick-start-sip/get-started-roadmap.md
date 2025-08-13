---
description: >-
  Get started with Soda! Use this curated set of instructions to quickly get
  data quality tests up and running.
---

# Get started roadmap

{% hint style="warning" %}
The Soda environment has been updated since this tutorial.

> Refer to [v4 documentation](https://app.gitbook.com/s/A2PmHkO5cBgeRPdiPPOG/quickstart) for updated tutorials.
{% endhint %}

The roadmap to get started offers a curated experience to help you get from zero to productive with Soda software.

However, if a guided experience is not your style, take a different path!

* Follow a [15-min tutorial](./) to set up and run Soda using demo data.
* Follow a [Use case guide](../use-case-guides/) for implementation instructions that target a specific outcome.
* [Request a demo](https://www.soda.io/schedule-a-demo) so we can help you get the most out of your Soda experience.

## Get started roadmap

1. [Choose a flavor of Soda](setup-guide.md) 🚀 Start here!
2. Set up Soda

* [Self-operated](install.md)
* [Soda-hosted agent](managed-agent.md)
* [Self-hosted agent](deploy.md)
* [Programmatic](programmatic.md)

3. [Write SodaCL checks](../soda-cl-overview/)
4. [Run scans and review results](../run-a-scan/)
5. [Organize, alert, investigate](../collaborate/)

Need help? Join the [Soda community on Slack](https://community.soda.io/slack).

## About Soda

Soda enables Data Engineers, Data Scientists, and Data Analysts to test data for quality where and when they need to.

Is your data fresh? Is it complete or missing values? Are there unexpected duplicate values? Did something go wrong during transformation? Are all the data values valid? These are the questions that Soda answers.

* Use Soda with GitHub Actions to test data quality during CI/CD development.
* Use Soda to build data quality rules in a collaborative, browser user interface.
* Use it with Airflow to test data quality after ingestion and transformation in your pipeline.
* Import your dbt tests into Soda to facilitate issue investigation and track dataset health over time.
* Integrate Soda with your data catalog to gauge dataset health from within the catalog.

### How it works <a href="#how-it-works" id="how-it-works"></a>

Soda works by taking the data quality checks that you prepare and using them to run a scan of datasets in a data source. A scan is a command which instructs Soda to prepare optimized SQL queries that execute data quality checks on your data source to find invalid, missing, or unexpected data. When checks fail, they surface bad-quality data and present check results that help you investigate and address quality issues.

To test your data quality, you choose a flavor of Soda (choose a deployment model) which enables you to configure connections with your data sources and define data quality checks, then run scans that execute your data quality checks.

* **Connect to your data source.**\
  Connect Soda to a data source such as Snowflake, Amazon Athena, or BigQuery by providing access details for your data source such as host, port, and data source login credentials.
* **Define checks to surface bad-quality data.**\
  Define data quality checks using Soda Checks Language (SodaCL), a domain-specific language for data quality testing. A Soda Check is a test that Soda performs when it scans a dataset in your data source.
* **Run a scan to execute your data quality checks.**\
  During a scan, Soda does not ingest your data, it only scans it for quality metrics, then uses the metadata to prepare scan results<sup>1</sup>. After a scan, each check results in one of three default states:
  * pass: the values in the dataset match or fall within the thresholds you specified
  * fail: the values in the dataset do not match or fall within the thresholds you specified
  * error: the syntax of the check is invalid, or there are runtime or credential errors
  * A fourth state, warn, is something you can explicitly configure for individual checks.
* **Review scan results and investigate issues.**\
  You can review the scan output in the command-line and in your Soda Cloud account. Access visualized scan results, set alert notifications, track trends in data quality over time, and integrate with the messaging, ticketing, and data cataloging tools you already use, like Slack, Jira, and Atlan.

<sup>1</sup> An exception to this rule is when Soda collects failed row samples that it presents in scan output to aid with issue investigation, a feature you can [disable](https://docs.soda.io/soda-cl/failed-row-samples.html#disable-all-failed-row-samples).

> Access a [Soda product overview](https://docs.soda.io/soda/product-overview.html).
>
> Learn more about [How Soda works](https://docs.soda.io/soda-library/how-library-works.html).
>
> Learn more about [SodaCL](https://docs.soda.io/soda-cl/metrics-and-checks.html).
>
> Access the [Glossary](https://docs.soda.io/soda/glossary.html) for a full list of Soda terminology.
