---
layout: default
title: Soda product overview
description: Soda SQL utilizes user-defined input to prepare SQL queries to find bad data. Use the Soda Cloud web app to visualize results of scans and set up alerts.
parent: Get started
---

# Soda product overview
<br />

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="175px" width="175px"}

**Soda Cloud** is the web application that connects to your data source, aggregates all metrics and tests, and enables your teammates to add even more. Log in to the web app to examine the visualized results of scans, view historical scan data, and set up alerts that automatically notify your team when there is an issue with your data.

Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application.

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, and view samples of the rows that failed a test during a scan. Integrate Soda Cloud with your Slack workspace to collaborate with your team on data monitoring.

Get started with the [Quick start tutorial for Soda Cloud]({% link soda-cloud/quick-start.md %}).

<br />


![soda-cl-logo](/assets/images/sodacl.png){:height="135px" width="135px"}

**SodaCL** is ...

Get started with the [SodaCL]({% link soda-cl/soda-cl-overview.md %}).

<br />

![soda-core-logo](/assets/images/sodacore.png){:height="170px" width="170px"}

**Soda Core** is ...

Get started with the [Soda Core]({% link soda-core/overview.md %}).

<br />

## Compare features and functionality

[Connect Soda SQL to your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}) to take advantage of all the features and functionality.

| ![soda-sql-logo](/assets/images/soda-sql-logo.png){:height="120px" width="120px"} | ![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="150px" width="150px"} |
|--------| ---------|
|Connect to a data source using a [warehouse YAML file]({% link soda-sql/warehouse.md %}) and an [env_vars YAML file]({% link soda-sql/warehouse.md %}#env_vars-yaml-file)|  |
|Edit connection details in a warehouse YAML file|   |
|Discover datasets of a newly-connected data source using the [`soda analyze` <br />CLI command]({% link soda-sql/cli.md %})|   |
|Define new [tests]({% link soda-sql/tests.md %}) in the [scan YAML file]({% link soda-sql/scan-yaml.md %}) only for datasets you added via Soda SQL. | Define new tests when you [create new monitors]({% link soda-cloud/monitors.md %}#2-monitor) for datasets you added via Soda Cloud or Soda SQL |
| Use [historic measurements]({% link soda/metrics.md %}#historic-metrics) of data when defining tests. | Use historic measurements of data when creating new monitors.|
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
|	| View a chart to get visibility into stored measurements for a metric over time |
|	| Create [alerts]({% link soda/glossary.md %}#alert) and [notifications]({% link soda/glossary.md %}#notification) |
|Configure scan YAML to send <br />[failed row samples]({% link soda-sql/send-failed-rows.md %}) to Soda Cloud | Use a missing value metric type to [collect failed row samples]({% link soda-cloud/failed-rows.md %}#use-a-missing-value-metric-type-to-collect-failed-row-samples)|
|   | View [failed rows]({% link soda-cloud/failed-rows.md %}) |
|	| Use [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) |
|   | [Collaborate]({% link soda-cloud/collaborate.md %}) with your team to monitor your data: invite team members, and integrate with Slack
|   | Set up [Single sign-on for Soda Cloud]({% link soda-cloud/sso.md %}) so that all users in your organization must use your IdP to access Soda Cloud. |
|   | Manage [user access]({% link soda-cloud/roles-and-rights.md %}) to your organization and its datasets. |
|   | Integrate with [Alation]({% link soda/integrate-alation.md %}) or [Metaphor]({% link soda/integrate-metaphor.md %}) to view data quality details from within your data catalog.
|   | Integrate with [dbt]({% link soda/integrate-dbt.md %}) to view dbt tests from within Soda Cloud. |

## Go further

* [Install Soda SQL]({% link soda-sql/installation.md %}) and sign up for a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
* Contribute to Soda SQL development on GitHub: <a href="https://github.com/sodadata/soda-sql" target="_blank">github.com/sodadata/soda-sql</a>
* Automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data using Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}