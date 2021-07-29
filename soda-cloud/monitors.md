---
layout: default
title: Create monitors and alerts
parent: Soda Cloud
redirect_from: /soda-sql/documentation/monitors.html
---

# Create monitors and alerts

A **monitor** is a set of details you define in Soda Cloud which Soda uses when it runs a scan. Log in to **Soda Cloud** to create monitors, and customize [alerts]({% link soda/glossary.md %}#alert) that send [notifications]({% link soda/glossary.md %}#notification) to your team when a [scan]({% link soda/glossary.md %}#scan) surfaces data issues. 

![onboarding-monitors-alerts](/assets/images/onboarding-monitors-alerts.png){:height="350px" width="350px"}

## Prerequisites

* Create a free Soda Cloud account at [cloud.soda.io/signup](https://cloud.soda.io/signup).
* Connect a [data source]({% link soda/glossary.md %}#data-source) and [add datasets]({% link soda-cloud/add-datasets.md %}) to your Soda Cloud account so that Soda has access to the data you wish to monitor. If you are a Soda SQL user and have connected it to your Soda Cloud account, you can [add datasets via Soda SQL]({% link soda-sql/configure.md %}#configuration-instructions) if you prefer. 
* Soda Cloud has executed at least one [scheduled scan]({% link soda-cloud/add-datasets.md %}#import-settings) of your data source to discover all of its datasets. If you are a Soda SQL user and have connected it to your Soda Cloud account, you can use the `soda analyze` command to discover datasets if you prefer. Refer to [Configure Soda SQL]({% link soda-sql/configure.md %}) for details.
* (Optional) [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack) to enable Soda Cloud to send Slack notifications to your team. If you do not use Slack, Soda Cloud can send notifications via email.

## Create a monitor and an alert

For a new monitor, you define several details including which data to test, what tests to run, and whom to notify when bad data triggers an alert. 

In Soda Cloud, navigate to the **Monitor Results** table, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup. Use the tables below for reference when completing the steps.

#### 1. Dataset

| Field or Label  | Description | 
| -----------------  | ----------- |
| Dataset | A dataset is a tabular data structure with rows and columns, such as a table in a database. Select the dataset that contains the data you wish to test. You can create monitors for datasets you added [via Soda Cloud]({% link soda-cloud/add-datasets.md %}) or datasets you added [using Soda SQL]({% link soda-sql/configure.md %}).|
| Filters | Use filters to limit the amount of data that Soda Cloud tests during a scan of your dataset.<br /> For example, you can use a filter to instruct Soda Cloud to apply this monitor's tests *only* to rows in which the value of the `country` column is `FRA`. When it runs its next scheduled scan of your dataset, Soda Cloud executes this monitor's tests only against the data that meets the filter criteria instead of scanning an entire dataset. Refer to [Apply filters]({% link soda-sql/filtering.md %}) to learn more. 
| Filter 1 | Select the values from the dropdowns for the column, operator, and value that will narrow the scope of data that Soda Cloud tests during its scan. | 
| Filter logic | Use `AND`, `OR`, or `NOT` to dictate how Soda Cloud should apply the filters you have defined (Filter 1, Filter 2, etc). For example, to instruct Soda SQL to run tests against only those rows which match the criteria of two filters you created, enter `1 AND 2`. | 
| Sample Data | Use the sample data to see what kind of data is in your dataset so you can determine what kinds of tests to write. If the panel is empty, follow the instructions to configure Soda SQL to [send sample data]({% link soda-sql/samples.md %}) to Soda Cloud. |

#### 2. Monitor

| Field or Label | Description |
| -----------------------   | ---------- |
| Metric type | Select the type of metric you want to use to test your data. See [Metric types](#metric-types) below for details. |
| Column | If you selected the **Column** Metric Type, use this field to select the column in your dataset against which your test will run.|
| Metric | Select the type of [metric]({% link soda/metrics.md %}) you want to use to test your data. |
| Evaluation type | **Threshold:** tests your data against the threshold value you define in your Critical Alert or Warning.<br /> **Change Over Time:** runs a comparison test against historical values in the same dataset. <br /> **Anomaly Detection:** automatically discovers patterns in your data over time and looks for outliers to the pattern. See [Detect anomalies]({% link soda-cloud/anomaly-detection.md %}).|
| Critical Alert | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a [test]({% link soda/glossary.md %}#test) that Soda SQL will run against data in the dataset. A failed test triggers this alert which, in turn, triggers a notification. |
| Warning | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a [test]({% link soda/glossary.md %}#test) that Soda SQL will run against data in the dataset. A failed test triggers this alert which, in turn, triggers a notification. | 


#### 3. Notifications

By default, Soda Cloud includes two out-of-the-box email notifications: one for the **Dataset Owner** and one for the **Monitor Owner**, which is you. You can remove or adjust these notifications, or use the search bar to add more.

| Field or Label | Description |
| -----------------------   | ---------- |
| Add people, roles or channels to alert | If you have integrated your Soda Cloud account with [Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack), use this field to type a channel name to add to the notification list of people included by default. Alternatively, use the field to enter names of teammates with whom you collaborate in Soda Cloud. |


#### 4. Attributes

| Field or Label | Description |
| -----------------------   | ---------- |
| Monitor: Metric name| You have the option of adjusting the name of the monitor you are creating. Click the name to edit. |
| Monitor Owner | As the creator of this new monitor, you are the Monitor Owner by default. However, you can change this value to the name of a teammate with whom you collaborate in Soda Cloud. |
| Description | Optionally, use this text field to describe what your monitor does to test data in the dataset. |

## Metric types

Soda Cloud makes three metric types available for you to select when you create a monitor. 

* **Dataset:** a metric type that applies to an entire dataset. 
* **Column:** a metric type that applies only to an individual column in your dataset.
* **Custom:** also known as a SQL metric, a metric type that enable you to define SQL queries that Soda executes against an entire dataset or against individual columns. In Soda Cloud, you can only use the custom metrics you defined in your scan YAML file for Soda SQL; you cannot define custom metrics directly in Soda Cloud. <br />Learn more about [connecting your Soda Cloud account to Soda SQL]({% link soda-cloud/connect_to_cloud.md %}). 


**If you added your dataset via [Soda Cloud]({% link soda-cloud/add-datasets.md %}#connection-details), "Row count" is temporarily the only metric type available to select in Metric Type.** If you added your dataset using Soda SQL, Soda Cloud makes several metric types available to select, depending upon the type of data in the dataset. Read [Metrics]({% link soda/metrics.md %}) to learn more about using metrics in tests.

Some metric types test for missing or valid data in columns in your dataset. If you use one of the metric types listed below, Soda Cloud displays a link to **Modify Validity Rules**. Click the link to define what qualifies as valid or missing data. 

![validity-rules](/assets/images/validity-rules.png){:height="500px" width="500px"}

* Invalid Values
* Invalid Values (%)
* Missing Values
* Missing Values (%)
* Valid Values

For example, to test that data in an `id` column all conforms to a universally unique identifier (UUID) format, you can use: 
* Metric Type: Invalid Values %
* Column: id
* Evaluation Type: Threshold

In the **Modifiy Validity Rules** modal, you select "UUID" as the **Validity Type**, then define the **Alert** values. When Soda runs a scan using this test in your monitor, it gauges whether or not a value in the `id` column is valid based on the Validity Type rule you defined. 

Read more about **[Validity rules]({% link soda/metrics.md %}#column-configuration-keys-or-validity-rules)** and **[Valid value formats]({% link soda/metrics.md %}#valid-format-values)** details and limitations.


## Run a scan

1. When you have completed the guided steps to create a monitor, wait for Soda Cloud to run its next scheduled scan of your dataset. You can [adjust the scan schedule of your dataset]({% link soda-cloud/dataset-scan-schedule.md%}) to run more or less frequently, if you wish.
2. After Soda Cloud completes its scan, return to **Monitor Results** in Soda Cloud and refresh your browser. Click the monitor you created to access details of the scan results.
3. Check your Slack channel or email inbox; when a scan surfaces data that triggers your alert(s), Soda Cloud sends notifications according to the settings you defined when you created the monitor.

If you are a Soda SQL user and have [connected to your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}), you can manually run a scan in Soda SQL to see monitor results right away without waiting for the scheduled scan to run. See [Run a scan]({% link soda/scan.md %}#run-a-scan-in-soda-sql) for details.


## Go further

* Next step in Soda Cloud Onboarding: [Refine dataset scan schedules]({% link soda-cloud/dataset-scan-schedule.md %})
* Learn more about [how scans work]({% link soda/scan.md %}#scan-output-in-soda-cloud) in Soda Cloud.
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.