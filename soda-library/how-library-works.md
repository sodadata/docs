---
layout: default
title: How Soda Library works
description: Learn Soda Library Basics, Soda Library Operation, Soda Library Automation and Integration with orchestration tools and Soda Cloud.
parent: Soda Library
redirect_from: /soda-core/how-core-works.html
---

# How Soda Library works 
*Last modified on {% last_modified_at %}*

**Soda Library** is Python library and CLI tool that enables Data Engineers to test data for quality where and when they need to. 

Soda Library utilizes user-defined input to prepare SQL queries that run checks on datasets in a data source to find invalid, missing, or unexpected data. When checks fail, they surface the data that you defined as "bad" in the check. Armed with this information, you and your data engineering team can diagnose where the "bad" data entered your data pipeline and take steps to prioritize and resolve issues.

Use Soda Library to manually or programmatically scan the data that your organization uses to make decisions. Optionally, you can integrate Soda Library with your data orchestration tool to schedule scans and automate actions based on scan results. Connect Soda Library to a Soda Cloud account where you and your team can use the web application to monitor check results and collaborate to keep your data issue-free.

[Soda Library basics](#soda-Library-basics)<br />
[Soda Library operation](#soda-library-operation)<br />
[Soda Library automation and integrations](#soda-library-automation-and-integrations)<br />
[Go further](#go-further)<br />


## Soda Library basics

This tool checks the quality of data inside [data sources]({% link soda/glossary.md %}#data-source). It enables you to perform four basic tasks:

- connect to your data source
- connect to a Soda Cloud account
- define checks to surface "bad" data
- run a scan for data quality against your data


To connect to a data source such as Snowflake, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source and connection details for your Soda Cloud account. (Except for connections to Spark DataFrames which do not use a configuration YAML file.) Refer to [Configure Soda Library]({% link soda-library/configure.md %}) for details and links to data source-specific connection configurations.

#### Configuration YAML example
{% include code-header.html %}
```yaml
data_source adventureworks:
  type: postgres
  connection:
    host: localhost
    port: '5432'
    username: postgres
    password: secret
  database: postgres
  schema: public

soda_cloud:
  host: cloud.soda.io
  api_key_id: 2e0ba0cb-**7b
  api_key_secret: 5wdx**aGuRg
```

<br />

To define the data quality checks that Soda Library runs against a dataset, you use a `checks.yml` file. A Soda Check is a test that Soda Library performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using [SodaCL]({% link soda-cl/soda-cl-overview.md %}). 

For example, you can define checks that look for things like missing or forbidden columns in a dataset, or rows that contain data in an invalid format. See [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}) for more details.

#### Checks YAML example
{% include code-header.html %}
```yaml
# Check for absent or forbidden columns in dataset
checks for dataset_name:
  - schema:
      warn:
        when required column missing: [column_name]
      fail:
        when forbidden column present: [column_name, column_name2]

# Check an email column to confirm that all values are in email format
checks for dataset_name:
  - invalid_count(email_column_name) = 0:
      valid format: email
```

In your own local environment, you create and store your checks YAML file anywhere you wish, then identify its name and filepath in the scan command. In fact, you can name the file whatever you like, as long as it is a `.yml` file and it contains checks using the SodaCL syntax.

You write Soda Checks using SodaCL’s built-in metrics, though you can go beyond the built-in metrics and write your own SQL queries, if you wish. The example above illustrates two simple checks on two datasets, but SodaCL offers a wealth of [built-in metrics]({% link soda-cl/metrics-and-checks.md %}) that enable you to define checks for more complex situations.

<br />

To scan your data, you use the `soda scan` CLI command. Soda Library uses the input in the checks YAML file to prepare SQL queries that it runs against the data in one or more datasets in a data source. It returns the output of the scan with each check's results in the CLI. See [Anatomy of a scan command]({% link soda-library/run-a-scan.md %}#anatomy-of-a-scan-command) for more details.
{% include code-header.html %}
```shell
soda scan -d adventureworks -c configuration.yml checks.yml
```




## Soda Library operation

The following image illustrates what Soda Library does when you initiate a scan.

![soda-library-operation](/assets/images/soda-library-operation.png){:height="800px" width="800px"}

**1** - You trigger a scan using the `soda scan` CLI command from your Soda project directory which contains the `configuration.yml` and `checks.yml` files. The scan specifies which data source to scan, where to get data source access info,  and which checks to run on which datasets.

**2** - Soda Library uses the checks you defined in the checks YAML to prepare SQL queries that it runs on the datasets in your data source.

**3** - When Soda Library runs a scan, it performs the following actions:
- fetches column metadata (column name, type, and nullable)
- executes a single aggregation query that computes aggregate metrics for multiple columns, such as `missing`, `min`, or `max`
- for each column each dataset, executes several more queries

**4** - {% include scan-output.md %}

The **Soda Cloud** web application integrates with your Soda Library implementation giving your team broader visibility into your organization's data quality. Soda Library pushes scan results to your Soda Cloud account where you can examine the results. 

Except when you explicitly demand that it do so, Soda Library only ever pushes *metadata* to the cloud; all your data stays inside your private network. (An exception to this rule is when Soda collects failed row samples that it presents in scan output to aid with issue investigation, a feature you can [disable]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).)

The web app serves to complement Soda Library. Use Soda Cloud to:

* access visualized check results
* track check results over time with the Cloud Metric Store that records past measurements 
* set up and send alert notifications when bad-quality data surfaces
* examine failed row samples
* profile columns and examine sample data
* create and track data quality [incidents]({% link soda-cloud/incidents.md %}) so your team can collaborate in Slack to resolve them
* collaborate with team members to review details of scan results that can help you to diagnose data issues


## Soda Library automation and integrations

To automate scans on your data, you can use **Soda Library** to programmatically execute scans. Based on a set of conditions or a specific schedule of events, you can instruct Soda Library to, for example, automatically run scans in your development workflow in GitHub.  Refer to the [Test data during development]({% link soda/quick-start-dev.md %}) for details.

Alternatively, you can integrate Soda Library with a **data orchestration tool** such as, Airflow, Dagster, or Prefect to schedule automated scans. You can also configure actions that the orchestration tool can take based on scan output. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a warehouse, after it is transformed, and before it is exported to another data source or tool. Refer to [Test data in a pipeline]({% link soda/quick-start-prod.md %}) for details.


## Go further

* Learn more about the [Metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use to check for data quality.
* Learn how to prepare [programmatic scans]({% link soda-library/programmatic.md %}) of your data.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}