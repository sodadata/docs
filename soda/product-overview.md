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

Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).

<br />

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="175px" width="175px"}

**Soda Cloud** is the web application that connects to your data source and runs scheduled scans of your data. Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data. 

Soda Cloud uses Soda SQL in the background to run scheduled scans. Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. 

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, and view samples of the rows that failed a test during a scan. Integrate Soda Cloud with your Slack workspace to collaborate with your team on data monitoring. 

Learn more about how to [set up]({% link soda-cloud/quick-start.md %}) your Soda Cloud account to start monitoring your data.

## Compare features and functionality

| ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="120px" width="120px"} | ![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} |
|--------| ---------|
|Connect to a warehouse using a [warehouse YAML file]({% link soda-sql/warehouse.md %})| Connect to a data source via [Add Datasets]({% link soda-cloud/add-datasets.md %})|
|Edit connection details in a warehouse YAML file| Edit data source connection and import details |
|Discover tables using the [`soda analyze` <br />CLI command]({% link soda-sql/cli.md %})| Discover datasets during the [first scheduled scan]({% link soda-cloud/add-datasets.md %}#after-the-first-scan) |
|Define new [tests]({% link soda-sql/tests.md %}) using the [scan YAML file]({% link soda-sql/scan-yaml.md %}) | |
|Edit existing tests in the scan YAML file| |
|	|[Create new monitors]({% link soda-cloud/monitors.md %}) |
|	|Edit existing monitors |
| Use [dataset metrics]({% link soda-sql/sql_metrics.md %}#table-metrics) in the scan YAML file | Use dataset metrics when [creating a new monitor]({% link soda-cloud/monitors.md %}#2-monitor) |
| Use [column metrics]({% link soda-sql/sql_metrics.md %}#column-metrics) in the scan YAML file | Use column metrics when [creating a new monitor]({% link soda-cloud/monitors.md %}#2-monitor) |
| Use [custom metrics]({% link soda-sql/sql_metrics.md %}#sql-metrics) in the scan YAML file | |
|Configure [programmatic scans]({% link soda-sql/programmatic_scan.md %})| |
|Integrate with an [orchestration tool]({% link soda-sql/orchestrate_scans.md %}) such as Airflow| |
|[Add filters]({% link soda-sql/filtering.md %}) in the scan YAML file | [Add filters]({% link soda-cloud/monitors.md %}#1-dataset) when creating a monitor|
|[Run an *ad hoc* scan]({% link soda/scan.md %}#run-a-scan-in-soda-sql) |  |
|Schedule scans using your [data orchestration tool]({% link soda-sql/orchestrate_scans.md %}) | Schedule scans for a [data source]({% link soda-cloud/add-datasets.md %}#import-settings) and [datasets]({% link soda-cloud/dataset-scan-schedule.md %}) |
|	| Create [alerts]({% link soda/glossary.md %}#alert) and [notifications]({% link soda/glossary.md %}#notification) |
|Configure scan YAML to send <br />[failed row samples]({% link soda-sql/send-failed-rows.md %}) to Soda Cloud | |
|   | View [failed rows]({% link soda-cloud/failed-rows.md %}) |
| Configure scan YAML to send <br />[sample dataset data]({% link soda-sql/samples.md %}) to Soda Cloud | [Enable sample data]({% link soda-cloud/display-samples.md %}) for a dataset | 
|  | View sample data for a dataset | 
|	| View a chart of stored measurements for a metric over time |
|	| Use [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) |

## Go further

* [Install Soda SQL]({% link soda-sql/installation.md %}) and sign up for a free Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Contribute to Soda SQL development on GitHub: <a href="https://github.com/sodadata/soda-sql" target="_blank">github.com/sodadata/soda-sql</a>
* Automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data using Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.