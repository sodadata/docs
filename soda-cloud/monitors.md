---
layout: default
title: Create monitors and alerts
description: Log in to Soda Cloud to create monitors, and customize alerts that send notifications to your team when a Soda SQL scan surfaces data issues.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/monitors.html
---

# Create monitors and alerts


A **monitor** is a set of details you define in Soda Cloud which Soda uses when it runs a scan. Log in to **Soda Cloud** to create monitors, and customize [alerts]({% link soda/glossary.md %}#alert) that send [notifications]({% link soda/glossary.md %}#notification) to your team when a [scan]({% link soda/glossary.md %}#scan) surfaces data issues.


<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda SQL</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda Core (Beta)</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

## Prerequisites

* An [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account has connected it to a configured instance of Soda Core. Learn more about adding datasets via Soda Core.
* A Soda Core user has prepared one or more `checks.yaml` files which contain user-defined checks for data quality.
* You have used Soda Core to run at least one scan of a dataset in your data source so that Soda Core pushes dataset details and check results to Soda Cloud.
* You are an Admin in your Soda Cloud account, or have a Manager or Editor role for the dataset for which you wish to create a monitor. See [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) for details.
* (Optional) An Admin on your Soda Cloud account has [integrated with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack) to enable Soda Cloud to send Slack notifications to your team. If you do not use Slack, Soda Cloud sends notifications via email.

## Create a monitor and an alert

For a new monitor, you define several details including which data to check, what checks to run, and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to the **Monitor Results** table, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup. Use the tables below for reference when completing the steps. If you select the type `Schema Evaluation`, refer to the [Monitor schema evolution]({% link soda-cloud/schema-evolution.md %}) instructions for details. 

#### 1. Dataset

| Field or Label  | Description |
| -----------------  | ----------- |
| Dataset | A dataset is a tabular data structure with rows and columns, such as a table in a database. Select the dataset that contains the data you wish to test. |
| Filters | Use filters to limit the amount of data that Soda Cloud tests during a scan of your dataset.<br /> For example, you can use a filter to instruct Soda Cloud to apply this monitor's tests *only* to rows in which the value of the `country` column is `FRA`. When you next run a scan of your dataset, Soda Cloud executes this monitor's tests only against the data that meets the filter criteria instead of scanning an entire dataset. 
| Filter 1 | Select the values from the dropdowns for the column, operator, and value that narrows the scope of data that Soda Cloud tests during its scan. |
| Filter logic | Use `AND`, `OR`, or `NOT` to dictate how Soda Cloud should apply the filters you have defined (Filter 1, Filter 2, etc). For example, to instruct Soda Core to run checks against only those rows which match the criteria of two filters you created, enter `1 AND 2`. |
| Sample Data | Use the sample data to see what kind of data is in your dataset so you can determine what kinds of tests to write. If the panel is empty, configure Soda Core to send sample data to Soda Cloud. |

#### 2. Monitor

| Field or Label | Description |
| -----------------------   | ---------- |
| Metric type | Select the type of metric you want to use to check your data. See [Metric types](#metric-types) below for details. |
| Column | If you selected the **Column** Metric Type, use this field to select the column in your dataset against which your check will run.|
| Metric | Select the type of metric you want to use to check your data. |
| Evaluation type | **Threshold:** check your data against the threshold value you define in your Critical Alert or Warning.<br /> **Change Over Time:** runs a comparison check against historical values in the same dataset. <br /> **Anomaly Detection:** automatically discovers patterns in your data over time and looks for outliers to the pattern. See [Detect anomalies]({% link soda-cloud/anomaly-detection.md %}).|
| Critical Alert | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a check that Soda Core will run against data in the dataset during a scan. A failed check triggers this alert which, in turn, triggers a notification. |
| Warning | Select an operand and value. Combined with the Metric type, Column, and Evaluation type details you defined, the Critical Alert is essentially a check that Soda Core will run against data in the dataset during a scan. A failed check triggers this alert which, in turn, triggers a notification. |


#### 3. Notifications

By default, Soda Cloud includes two out-of-the-box email notifications: one for the **Dataset Owner** and one for the **Monitor Owner**, which is you. You can remove or adjust these notifications, or use the search bar to add more.

Note that Soda Cloud does not send an email or Slack notification when a scan fails, only when checks fail. Refer to [Scan output in Soda Cloud]({% link soda/scan.md %}#scan-output-in-soda-cloud).

| Field or Label | Description |
| -----------------------   | ---------- |
| Add people, roles or channels to alert | If you have integrated your Soda Cloud account with [Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack), use this field to type a channel name to add to the notification list of people included by default. Alternatively, use the field to enter names of teammates with whom you collaborate in Soda Cloud. |


#### 4. Attributes

| Field or Label | Description |
| -----------------------   | ---------- |
| Monitor: Metric name| You have the option of adjusting the name of the monitor you are creating. Click the name to edit. |
| Monitor Owner | As the creator of this new monitor, you are the Monitor Owner by default. However, you can change this value to the name of a teammate who is a member of your organization's Soda Cloud account. |
| Description | Optionally, use this text field to describe what your monitor does to test data in the dataset. |

## Metric types

Soda Cloud makes three metric types available for you to select when you create a monitor.

* **Dataset:** a metric type that applies to an entire dataset.
* **Column:** a metric type that applies only to an individual column in your dataset.
* **Custom:** also known as a SQL metric, a metric type that enables you to define SQL queries that Soda Core executes against an entire dataset or against individual columns. In Soda Cloud, you can only use the custom metrics you defined in your checks YAML file for Soda Core; you cannot define custom metrics directly in Soda Cloud. 

Soda Cloud makes several metric types available to select, depending upon the type of data in the dataset. Read [Metrics]({% link soda/metrics.md %}) to learn more about using metrics in checks. Some metric types check for missing or valid data in columns in your dataset. If you use one of the metric types listed below, Soda Cloud displays a link to **Modify Validity Rules**. Click the link to define what qualifies as valid or missing data.

![validity-rules](/assets/images/validity-rules.png){:height="500px" width="500px"}

* Invalid Values
* Invalid Values (%)
* Missing Values
* Missing Values (%)
* Valid Values

For example, to check that data in an `id` column all conforms to a universally unique identifier (UUID) format, you can use:
* Metric Type: Invalid Values %
* Column: id
* Evaluation Type: Threshold

In the **Modifiy Validity Rules** modal, you select "UUID" as the **Validity Type**, then define the **Alert** values. When Soda Core runs a scan using this check in your monitor, it gauges whether or not a value in the `id` column is valid based on the Validity Type rule you defined.

Read more about [Validity rules]({% link soda/metrics.md %}#column-configuration-keys-or-validity-rules) and [Valid value formats]({% link soda/metrics.md %}#valid-format-values) details and limitations.


## Run a scan

1. When you have completed the guided steps to create a monitor, run another Soda Core scan on the dataset associated with the monitor.
2. After the Soda Core scan completes, return to **Monitor Results** in Soda Cloud and refresh your browser. Click the monitor results associated with the monitor you created to access details of the scan results.
3. Check your Slack channel or email inbox; when a scan surfaces data that triggers your alert(s), Soda Cloud sends notifications according to the settings you defined when you created the monitor.
  </div>
  <div class="panel" id="two-panel" markdown="1">
In Soda Cloud, you can only create new monitors and alerts for datasets connected to an instance of Soda SQL.

You cannot create monitors for datasets connected to an instance of **Soda Core (Beta)**, yet. 

Instead, you can use **SodaCL (Beta)** to write checks in a checks YAML file for Soda Core to execute during a scan. You can connect Soda Core to your Soda Cloud account to see the check results after each scan. 

[Soda Core (Beta) documentation]({% link soda-core/overview.md %})<br />
[SodaCL (Beta) documentation]({% link soda-cl/soda-cl-overview.md %})

## Edit checks in Soda Cloud

If you have connected Soda Core to your Soda Cloud account and run a scan, you can see check results in the list of Monitor Results in the **Monitors** dashboard. If you wish, you can edit the checks to add attributes.

1. In Soda Cloud, navigate to the **Monitors** dashboard, then click the stacked dots at the right of the check you wish to edit and select **Edit monitor**.
2. Navigate to the **Attributes** tab, then change the value for the **Monitor Owner** field and add any details to the **Description** field, then **Save**.

  </div>
  </div>
</div>

## Go further

* Learn more about [how scans work]({% link soda/scan.md %}#scan-output-in-soda-cloud) in Soda Cloud.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Integrate Soda with your [data catalogs]({% link soda/integrate-alation.md %}) or [data pipeline tools]({% link soda/integrate-dbt.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.


<br />

---
{% include docs-footer.md %}