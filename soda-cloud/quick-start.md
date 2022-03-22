---
layout: default
title: Quick start for Soda Cloud
description: Sign up for a Soda Cloud account, connect Soda SQL to your account, integrate with Slack, then create a monitor and an alert to begin monitoring your data.
parent: Get started
redirect_from: /soda-cloud.html
---

# Quick start tutorial for Soda Cloud

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda SQL</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda Core (Beta)</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

**Sign up** for a Soda Cloud account, **connect Soda SQL** to your account, **integrate** with Slack, then **create** a monitor and an alert to begin monitoring your data.
<br />
<br />

![tutorial-cloud-happy-path](/assets/images/cloud-tutorial-happy-path.png){:height="700px" width="700px"}


## Sign up and connect to Soda SQL

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>. You, as the first user in your organization to sign up for a Soda Cloud account, become the account's **Admin** by default. Learn more about [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}). An Admin role is necessary to complete this tutorial.
2. If you have not already done so, follow the instructions to [Install]({% link soda-sql/installation.md %}) and [Configure Soda SQL]({% link soda-sql/configure.md %}) in your local environment and connect it to a [data source]({% link soda/glossary.md %}#data-source). 
3. [Connect your Soda Cloud account]({% link soda-cloud/connect_to_cloud.md %}) to your Soda SQL instance.
4. [Run a scan]({% link soda/scan.md %}#run-a-scan) in Soda SQL so that it pushes information about your datasets and test results to your Soda Cloud account.

## Integrate with Slack

Connect your Soda Cloud account to your Slack workspace. Making this connection enables you to send Slack notifications to your team when a data quality issue triggers an [alert]({% link soda/glossary.md %}#alert).

If you do not use Slack, Soda Cloud notifies you and any [teammates you invite]({% link soda-cloud/collaborate.md %}#invite-your-team-members) via email.

{% include integrate-slack-steps.md %}

## Create a monitor and alert

After you have used Soda SQL to run at least one scan of a dataset in your data source, you can use the data and metadata it collected, such as column names and data types, to create a monitor and alert in Soda Cloud.

Note that Soda Cloud also automatically creates a **row count anomaly detection monitor** for each dataset that contains time-series data, and a **schema evaluation monitor** for each dataset. 
* The anomaly detection monitor enables Soda Cloud to start learning row count patterns in your dataset over the course of the next few Soda scans and surface anything it recognizes as anomalous. See [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) for details. 
* The schema evaluation monitor notifies you when columns in a dataset have been added, removed, or changed since the previous Soda scan of the dataset. See [Monitor schema evolution]({% link soda-cloud/schema-evolution.md %}) for details.

For a new monitor, you define several details including which data to test, what tests to run, and whom to notify when bad data triggers an alert.

1. In Soda Cloud, navigate to the **Monitors** dashboard, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup. Use the following input values for reference.
* Dataset: `a dataset in your data source`
* Metric Type: `Row Count` <br />
* Column: n/a
* Evaluation type: `Threshold`
* Critical Alert: `if less than`; `1`
* Add people, roles or channels to alert: `your slack channel`, if using Slack
* Notify about: `Critical Alerts`
* Frequency: `Immediately`
2. When you use Soda SQL to run your next scan of your dataset, it runs the test you just created in your monitor. If the test fails (in this case, if the dataset contains no rows), the failure triggers the alert you defined and sends a notification to the Slack channel you identified in your monitor, or your email address if you do not use Slack.

Refer to [Create monitors and alerts]({% link soda-cloud/monitors.md %}) for further details.

## Review your scan results

When Soda SQL completes another scan of the dataset for which you created a monitor, it runs your test and presents the results in the **Monitors** dashboard.

1. Review the results of your test in the **Monitor Results** table in Soda Cloud to find the result for the monitor you just created. See the example below in which a test passed.
![tutorial-monitor-results](/assets/images/tutorial-monitor-results.png){:height="600px" width="600px"}
2. Click the monitor result to access details that can help you diagnose and solve the data issue.
3. Check your Slack channel or email inbox; if the test failed, the scan surfaced a data quality issue that triggered your alert so Soda Cloud sent a notification.


## Go further

* Learn more about [How Soda SQL Works]({% link soda-sql/concepts.md %}).
* Use Soda Cloud to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data.
* Find out how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) for tests that failed.
* Integrate Soda with your [data catalogs]({% link soda/integrate-alation.md %}) or [data pipeline tools]({% link soda/integrate-dbt.md %}).

Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

  </div>
  <div class="panel" id="two-panel" markdown="1">

**Soda Core (Beta)** is a free, open-source, command-line tool that enables you to use the **Soda Checks Language (Beta)** to turn user-defined input, Soda Checks, into aggregated SQL queries. When it runs a scan on a dataset, Soda Core executes the checks to find invalid, missing, or unexpected data. When your Soda Checks fail, they surface the data that you defined as "bad".

You connect Soda Core to your data source (Snowflake, Postgres, etc.), then define your Soda Checks for data quality in a checks YAML file. Referencing this checks file, Soda Core runs scans of your data to execute the checks. Soda Core pushes the results of the scan to your Soda Cloud account where you can examine the check results and see visualizations that chart changes in data quality over time.

This tutorial takes you through the steps to set up and connect Soda Core and Soda Cloud, then, use SodaCL to write a simple check, run a scan in Soda Core, and see the result of your scan in Soda Cloud. 

![tutorial-cloud-happy-core](/assets/images/cloud-tutorial-happy-core.png){:height="700px" width="700px"}

## Sign up and connect to Soda Core

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a>. You, as the first user in your organization to sign up for a Soda Cloud account, become the account’s Admin by default. Learn more about [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}). An Admin role is necessary to complete this tutorial.
2. If you have not already done so, follow the instructions to [install Soda Core]({% link soda-core/get-started.md %}) in your local environment and create a [configuration YAML file]({% link soda-core/configure.md %}) to provide the details that Soda Core needs to your data source.
3. To connect Soda Core to your Soda Cloud account, being by opening your `configuration.yml` file in a code editor and adding the following to the file:
```yaml
soda_account:
  host: cloud.soda.io
  api_key_id: 
  api_key_secret:
```
4. Log into your Soda Cloud account and navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
* Copy the API Key ID, then paste it into the `configuration.yml` file as the value for **api_key_id**.
* Copy the API Key Secret, then paste it into the configuration.yaml file as the value for **api_key_secret**.
5. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in your Soda Cloud account.

## Write a Soda Check and run a scan in Soda Core

1. In your code editor, create a new file in your Soda Core project named `checks.yml`. Add the following to the file, adjusting the value for `CUSTOMERS` with the name of a dataset in your data source.
```yaml
checks for CUSTOMERS:
  - row_count > 0
```
2. Save the file. The Soda Check that you created uses SodaCL’s built-in metric for `row_count` to validate that the number of rows in your dataset is greater than zero, meaning it is not empty. <br />
You can use SodaCL to write volumes of checks to find invalid, missing, or unexpected data, including checks for freshness, schema changes, and missing values. Reference the [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}) to add more checks to your `checks.yml` file, if you wish.
3. In your command-line interface, navigate to your Soda Core project, then use the following command to run a scan of the data, replacing the value for `data_source` with the name of your own data source.
```shell
soda scan -d data_source -c ~/.soda/configuration.yml checks.yml
```
4. Review the check results in the command-line output. The results are likely to display something like the following, which indicates that your check passed and your dataset is not empty.
```shell
Soda Core 0.0.x
Scan summary:
1/1 check PASSED: 
    CUSTOMERS  in demo_datasource
      count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```

## Review check results in Soda Cloud

1. Log into you Soda Cloud account, then click **Monitors** to access the **Monitors** dashboard.
2. In the **Monitor Results** table, notice the checks result of the scan that you ran; Soda Core pushed the check results to your Soda Cloud account.
3. Click the check to review details about and a visualization of the check result.
4. If you wish, click **Datasets** to access the **Datasets** dashboard. 
5. Click the row in the table for the dataset details that Soda Core pushed to Soda Cloud to review information about the dataset.


## Go further

* Learn more about <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core (Beta)</a>.
* Learn more about <a href="https://docs.soda.io/soda-cl/soda-cl-overview.html" target="_blank">SodaCL (Beta) </a>.

Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.


  </div>
  </div>
</div>



<br />

---
{% include docs-footer.md %}