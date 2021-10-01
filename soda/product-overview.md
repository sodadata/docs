---
layout: default
title: Soda product overview
parent: Soda
---

# Soda product overview
<br />

![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="150px" width="150px"}

**Soda SQL** is a free, open-source command-line tool. It utilizes user-defined input to prepare SQL queries that run tests on datasets in a data source to find invalid, missing, or unexpected data. When tests fail, they surface the data that you defined as "bad" in the tests. Armed with this information, you and your data engineering team can diagnose where the "bad" data entered your data pipeline and take steps to prioritize and resolve issues based on downstream impact.

Use Soda SQL on its own to manually or programmatically scan the data that your organization uses to make decisions. Optionally, you can integrate Soda SQL with your data orchestration tool to schedule scans and automate actions based on scan results. Further, you can connect Soda SQL to a free Soda Cloud account where you and your team can use the web application to monitor test results and collaborate to keep your data issue-free.

Get started with the [Quick start tutorial for Soda SQL]({% link soda-sql/5_min_tutorial.md %}).

<br />

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="175px" width="175px"}

**Soda Cloud** is the web application that connects to your data source, aggregates all metrics and tests, and enables your teammates to add even more. Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data. 

Soda Cloud uses Soda SQL in the background to run scheduled scans. Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, and view samples of the rows that failed a test during a scan. Integrate Soda Cloud with your Slack workspace to collaborate with your team on data monitoring. 

Get started with the [Quick start tutorial for Soda Cloud]({% link soda-cloud/quick-start.md %}).

## Compare features and functionality

[Connect Soda SQL to your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}) to take advantage of all the features and functionality.

| ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="120px" width="120px"} | ![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} |
|--------| ---------|
|Connect to a data source using a [warehouse YAML file]({% link soda-sql/warehouse.md %}) and an [env_vars YAML file]({% link soda-sql/warehouse.md %}#env_vars-yaml-file)| Connect to a data source via [Add Datasets]({% link soda-cloud/add-datasets.md %})|
|Edit connection details in a warehouse YAML file| Edit data source connection and import details |
|Discover datasets of a newly-connected data source using the [`soda analyze` <br />CLI command]({% link soda-sql/cli.md %})| Discover datasets of a newly-connected data source during the [first scheduled scan]({% link soda-cloud/add-datasets.md %}#after-the-first-scan) |
|Define new [tests]({% link soda-sql/tests.md %}) in the [scan YAML file]({% link soda-sql/scan-yaml.md %}) only for datasets you added via Soda SQL. | Define new tests when you [create new monitors]({% link soda-cloud/monitors.md %}#2-monitor) for datasets you added via Soda Cloud or Soda SQL |
|Edit existing tests in the scan YAML file| Edit the tests in existing monitors |
| Use [dataset metrics]({% link soda-sql/sql_metrics.md %}#dataset-metrics) in the scan YAML file | Use [dataset metrics]({% link soda/metrics.md %}#dataset-metrics) when creating a new monitor |
| Use [column metrics]({% link soda-sql/sql_metrics.md %}#column-metrics) in the scan YAML file | Use [column metrics]({% link soda/metrics.md %}#column-metrics) when creating a new monitor |
| Use [custom metrics]({% link soda-sql/sql_metrics.md %}#custom-metrics) in the scan YAML file | Use [custom metrics]({% link soda/metrics.md %}#custom-metrics) when creating a new monitor |
|Copy + paste [custom metrics from templates]({% link soda-sql/custom-metric-templates.md %}) into your scan YAML file  |  |
|View scan results from tests that use template custom metrics in the command-line|View scan results from tests that use template custom metrics in the Monitors dashboard|
|Configure [programmatic scans]({% link soda-sql/programmatic_scan.md %})| |
|Integrate with an [orchestration tool]({% link soda-sql/orchestrate_scans.md %}) such as Airflow| |
|[Add filters]({% link soda-sql/filtering.md %}) in the scan YAML file | [Add filters]({% link soda-cloud/monitors.md %}#1-dataset) when creating a monitor|
| [Exclude columns]({% link soda-sql/scan-yaml.md %}#excluded-columns-example) from scans |  |
|[Run an *ad hoc* scan]({% link soda/scan.md %}#run-a-scan-in-soda-sql) |  |
|Schedule scans using your [data orchestration tool]({% link soda-sql/orchestrate_scans.md %}) | Schedule scans for a [data source]({% link soda-cloud/add-datasets.md %}#import-settings) and individual [datasets]({% link soda-cloud/dataset-scan-schedule.md %}) |
|	| View a chart to get visibility into stored measurements for a metric over time |
|	| Create [alerts]({% link soda/glossary.md %}#alert) and [notifications]({% link soda/glossary.md %}#notification) |
|Configure scan YAML to send <br />[failed row samples]({% link soda-sql/send-failed-rows.md %}) to Soda Cloud | Use a missing value metric type to [collect failed row samples]({% link soda-cloud/failed-rows.md %}#use-a-missing-value-metric-type-to-collect-failed-row-samples)|
|   | View [failed rows]({% link soda-cloud/failed-rows.md %}) |
| Configure scan YAML to send <br />[sample dataset data]({% link soda-sql/samples.md %}) to Soda Cloud | [Enable sample data]({% link soda-cloud/display-samples.md %}) for a dataset | 
|   | View [sample data]({% link soda-cloud/display-samples.md %}) for a dataset | 
|	| Use [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) |
|   | [Collaborate]({% link soda-cloud/collaborate.md %}) with your team to monitor your data: invite team members, and integrate with Slack
|   | Set up [Single sign-on for Soda Cloud]({% link soda-cloud/sso.md %}) so that all users in your organization must use your IdP to access Soda Cloud. |
|   | Manage [user access]({% link soda-cloud/roles-and-rights.md %}) to your organization and its datasets. | 

## Go further

* [Install Soda SQL]({% link soda-sql/installation.md %}) and sign up for a free Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Contribute to Soda SQL development on GitHub: <a href="https://github.com/sodadata/soda-sql" target="_blank">github.com/sodadata/soda-sql</a>
* Automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data using Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.