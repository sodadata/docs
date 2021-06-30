---
layout: default
title: Create monitors and alerts
parent: Soda Cloud
redirect_from: /soda-sql/documentation/monitors.html
---

# Create monitors and alerts

A **monitor** is a set of details you define in Soda Cloud which Soda SQL uses when it runs a scan. Log in to **Soda Cloud** to create **[monitors]({% link soda/glossary.md %}#monitor)**, and customize **[alerts]({% link soda/glossary.md %}#alert)** that send **[notifications]({% link soda/glossary.md %}#notification)** to your team when a [scan]({% link soda/glossary.md %}#scan) surfaces data issues.


## Prerequisites

1. Create a free Soda Cloud account at [cloud.soda.io/signup](https://cloud.soda.io/signup).
2. [Install Soda SQL]({% link soda-sql/installation.md %}) in your local or development environment and [configure it]({% link soda-sql/configure.md %}) to connect to a data source. Soda SQL is the tool that actually executes the scans of your data, then it pushes the results of its scans to your Soda Cloud account.
3. Use Soda SQL to [analyze]({% link soda-sql/scan-yaml.md %}#create-a-scan-yaml-file) the tables in your warehouse and [run your first scan]({% link soda/scan.md %}#run-a-scan).
4. [Connect]({% link soda-cloud/connect_to_cloud.md %}) Soda SQL to your Soda Cloud account.
5. (Optional) [Integrate with Slack]({% link soda-cloud/integrate-slack.md %}) to enable Soda Cloud to send Slack notifications to your team.


## Create a monitor and an alert

For a new monitor, you define several details including which data to test, what test to run, and whom to notify when bad data triggers an alert. 

In Soda Cloud, navigate to the **Monitor Results** table, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup. Use the table below for reference when completing the steps.

#### 1. Dataset

| Field or Label  | Description | 
| -----------------  | ----------- |
| Dataset | A dataset is a tabular data structure with rows and columns, such as a table in a database. Select the dataset that contains the data you wish to test. |
| Filters | Use filters to limit the amount of data that Soda SQL tests during a scan of your dataset.<br /> For example, you can use a filter to instruct Soda SQL to apply this monitor's tests *only* to rows in which the value of the `country` column is `FRA`. When you next run the soda scan command, Soda SQL executes this monitor's tests only against the data that meets the filter criteria instead of scanning an entire dataset. Refer to [Apply filters]({% link soda-sql/filtering.md %}) to learn more. 
| Filter 1 | Select the values from the dropdowns for the column, operator, and value that will narrow the scope of data that Soda SQL tests during its scan. | 
| Filter logic | Use `AND`, `OR`, or `NOT` to dictate how Soda SQL should apply the filters you have defined (Filter 1, Filter 2, etc). For example, to instruct Soda SQL to run tests against only those rows which match the criteria of two filters you created, enter `1 AND 2`. | 

#### 2. Monitor

| Field or Label | Description |
| -----------------------   | ---------- |
| Metric type | Select the type of default column metric you want to use to test your data. Read more about [default column metrics]({% link soda-sql/sql_metrics.md %}default-column-metrics). <sup>1</sup>
| Column | Select the column in your dataset against which your test will run.
| Evaluation type | Threshold: tests your data against the threshold value you define in your Critical Alert or Warning.<br /> Change Over Time: runs a comparison test against historical values in the same dataset. <br /> Anomaly Detection: automatically discovers patterns in your data over time and looks for outliers to the pattern. See [Detect anomalies]({% link soda-cloud/anomaly-detection.md %}).
| Critical Alert | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a [test]({% link soda/glossary.md %}test) that Soda SQL will run against data in the dataset. A failed test triggers this alert which, in turn, triggers a notification. 
| Warning | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a [test]({% link soda/glossary.md %}test) that Soda SQL will run against data in the dataset. A failed test triggers this alert which, in turn, triggers a notification. | 

<sup>1</sup> Monitors can only use default column metrics, not default table metrics or SQL metrics. See [Metrics]({% link soda-sql/sql_metrics.md %}) for more detail.

#### 3. Notifications
By default, Soda Cloud includes two out-of-the-box email notifications: one for the **Dataset Owner** and one for the **Monitor Owner**, which is you. You can remove or adjust these notifications, or use the search bar to add more.

| Field or Label | Description |
| -----------------------   | ---------- |
| Add people, roles or channels to alert | If you have integrated your Soda Cloud account with [Slack]({% link soda-cloud/integrate-slack.md %}), use this field to type a channel name to add to the notification list of people included by default. Alternatively, use the field to enter names of teammates with whom you collaborate in Soda Cloud. |


#### 4. Attributes

Note that you have the option of adjusting the name of the monitor you are creating. Click the name to edit.

| Field or Label | Description |
| -----------------------   | ---------- |
| Monitor Owner | As the creator of this new monitor, you are the Monitor Owner by default. However, you can change this value to the name of a teammate with whom you collaborate in Soda Cloud. |
| Description | Optionally, use this text field to describe what your monitor does to test data in the dataset. |

## Run a scan

1. When you have completed the guided steps to create a monitor, access your command-line interface and use Soda SQL to scan your data again.
``` shell
$ soda scan warehouse.yml tables/yourtablename.yml
```
2. Check your Slack channel or email inbox; when a scan surfaces data that triggers your alert(s), Soda Cloud sends a notification.
3. Return to **Monitor Results** in Soda Cloud and refresh your browser. Click the monitor to access details that can help you diagnose and solve the data issue.


## Go further

* Learn more about [how scans work]({% link soda/scan.md %}#scan-output-in-soda-cloud) with Soda Cloud.
* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %})
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.