---
layout: default
title: How Soda SQL works
description: Learn Soda SQL Basics, Soda SQL Operation, Soda SQL Automation and Integration with orchestration tools and Soda Cloud.
sidebar: sql
parent: Soda SQL
redirect_from: /soda-sql/documentation/concepts.html
---

# How Soda SQL works

{% include banner-sql.md %}

**Soda SQL** is a free, open-source command-line tool. It utilizes user-defined input to prepare SQL queries that run tests on dataset in a data source to find invalid, missing, or unexpected data. When tests fail, they surface the data that you defined as "bad" in the tests. Armed with this information, you and your data engineering team can diagnose where the "bad" data entered your data pipeline and take steps to prioritize and resolve issues.

Use Soda SQL on its own to manually or programmatically scan the data that your organization uses to make decisions. Optionally, you can integrate Soda SQL with your data orchestration tool to schedule scans and automate actions based on scan results. Further, you can connect Soda SQL to a Soda Cloud account where you and your team can use the web application to monitor test results and collaborate to keep your data issue-free.

[Soda SQL basics](#soda-sql-basics)<br />
[Soda SQL operation](#soda-sql-operation)<br />
[Soda SQL automation and integrations](#soda-sql-automation-and-integrations)<br />
[Go further](#go-further)<br />


## Soda SQL basics

This open-source, command-line tool exists to enable Data Engineers to access and test data inside [data sources]({% link soda/glossary.md %}#data-source). The first of what will soon be many such developer tools, Soda SQL allows you to perform three basic tasks:

- connect to your data source,
- define tests for "bad" data, and,
- scan your [dataset]({% link soda/glossary.md %}#dataset) to run tests against your data.


To connect to a data source such as Snowflake, Amazon Athena, or Google Cloud Platform Big Query, you use two files that Soda SQL creates for you when you run the CLI [`create`]({% link soda-sql/configure.md %}#create-commands) command:
- a `warehouse.yml` file which stores access details for your data warehouse, and,
- an `env_vars.yml` file which securely stores warehouse login credentials.

#### Warehouse YAML example
```yaml
name: soda_sql_tutorial
connection:
  type: postgres
  host: localhost
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: sodasql
  schema: public
```

#### env_vars YAML example
```yaml
soda_sql_tutorial:
  POSTGRES_USERNAME: xxxxxx
  POSTGRES_PASSWORD: yyyyyy
```

To define the data quality tests that Soda SQL runs against a dataset, you use the scan YAML files that Soda SQL creates when you run the `soda analyze` CLI command. Soda SQL uses the warehouse YAML file to connect to your data source and analyze the datasets in it. For every dataset that exists, Soda SQL creates a corresponding scan YAML file and automatically populates it with tests it deems relevant for your data. You can keep these default tests intact, or you can adjust them or add more tests to fine-tune your search for "bad" data.

For example, you can define tests that look for things like, non-UUID-formatted entries in the ID column of a table, or zero values in a commission percentage column. See [Scan YAML]({% link soda-sql/scan-yaml.md %}) for much more detail on the contents of this file.

#### Scan YAML example
```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - ...
tests:
  - row_count > 0
columns:
  id:
    valid_format: uuid
    tests:
      - invalid_percentage == 0
```

To scan your data, you use the `soda scan` CLI command. Soda SQL uses the input in the scan YAML file to prepare SQL queries that it runs against the data in a dataset in a data source. All tests return true or false; if true, the test passed and you know your data is sound; if false, the test fails which means the scan discovered data that falls outside the expected or acceptable parameters you defined in your test.


## Soda SQL operation

Imagine you have installed Soda SQL, you have run the `soda create yourwarehousetype` command to set up your data warehouse and env_vars YAML files, and you have added your warehouse login credentials to the env_vars YAML. You have run `soda analyze`, and you have some new scan YAML files in your `/tables` directory that map to datasets in your data warehouse. You are ready to scan!

The following image illustrates what Soda SQL does when you initiate a scan.

![soda-operation](/assets/images/soda-operation.png){:height="800px" width="800px"}

**1** - You trigger a scan using the `soda scan` CLI command from your [warehouse directory]({% link soda/glossary.md %}#warehouse-directory). The scan specifies which warehouse YAML and scan YAML files to use, which amounts to identifying which dataset in which data source to scan.

**2** - Soda SQL uses the tests in the scan YAML to prepare SQL queries that it runs on the datasets in your data source.

**3** - When Soda SQL runs a scan, it performs the following actions:
- fetches column metadata (column name, type, and nullable)
- executes a single aggregation query that computes aggregate metrics for multiple columns, such as `missing`, `min`, or `max`
- for each column, executes several more queries, including `distinct_count`, `unique_count`, and `valid_count`

**4** - {% include scan-output.md %}


## Soda SQL automation and integrations

To automate scans on your data, you can use the **Soda SQL Python library** to programmatically execute scans. Based on a set of conditions or a specific schedule of events, you can instruct Soda SQL to automatically run scans. For example, you may wish to scan your data at several points along your data pipeline, perhaps when new data enters a warehouse, after it is transformed, and before it is exported to another warehouse. Refer to the [Programmatic scan]({% link soda-sql/programmatic_scan.md %}) instructions for details.

Alternatively, you can integrate Soda SQL with a **data orchestration tool** such as, Airflow, Dagster, or dbt Core™, to schedule automated scans. You can also configure actions that the orchestration tool can take based on scan output. For example, if the output of a scan reveals a large number of failed tests, the orchestration tool can automatically quarantine the "bad" data or block it from contaminating your data pipeline. Refer to [Orchestrate scans]({% link soda-sql/orchestrate_scans.md %}) for details.

Additionally, you can integrate Soda SQL with a **Soda Cloud** account. This cloud-based web application integrates with your Soda SQL implementation giving your team broader visibility into your organization's data quality. Soda SQL pushes scan results to your Soda Cloud account where you can use the web app to examine the results. Except when you explicitly demand that it do so, Soda SQL only ever pushes *metadata* to the cloud; all your data stays inside your private network. Learn more about [connecting to Soda Cloud]({% link soda-sql/connect_to_cloud.md %}).

Though you do not have to set up and ingrate a Soda Cloud account in order to use Soda SQL, the web app serves to complement the CLI tool, giving you a non-CLI method of examining data quality. Use Soda Cloud to:

- collaborate with team members to review details of scan results that can help you to diagnose data issues
- use monitors to view stored [scan output]({% link soda-sql/scan.md %}#scan-output-in-soda-cloud) as visualizations that represents the volume of failed tests in each scan
- empower others to set quality thresholds that define "good" data
- set up and send alert notifications when "bad" data enters your data pipeline
- create and track data quality [Incidents]({% link soda-cloud/incidents.md %}) so your team can collaborate in Slack to resolve them

To connect Soda SQL to Soda Cloud, you create API keys in your Soda Cloud account and configure them as connection credentials in your warehouse and env_vars YAML files. See [Connect to Soda Cloud]({% link soda-sql/connect_to_cloud.md %}) for details.

## Go further
* Learn more about the contents of the [Scan YAML]({% link soda-sql/scan-yaml.md %}) file.
* Learn more about the [Metrics]({% link soda-sql/metrics.md %}) you can use to define [Tests]({% link soda-sql/tests.md %}).
* Learn how to [Connect to Soda Cloud]({% link soda-sql/connect_to_cloud.md %}).
* See how to prepare [programmatic scans]({% link soda-sql/programmatic_scan.md %}) of your data.
* Reference the [Data types]({% link soda-sql/supported-data-types.md %}) that Soda SQL supports when it scans columns.


<br />

---
*Last modified on {% last_modified_at %}*

- Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.
