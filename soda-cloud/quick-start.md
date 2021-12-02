---
layout: default
title: Quick start for Soda Cloud
parent: Get started
redirect_from: /soda-cloud.html
---

# Quick start tutorial for Soda Cloud

**Sign up** for a free Soda Cloud account, **connect Soda SQL** to your account, **integrate** with Slack, then **create** a monitor and an alert to begin monitoring your data.
<br />
<br />

![tutorial-cloud-happy-path](/assets/images/cloud-tutorial-happy-path.png){:height="700px" width="700px"}


## Sign up and connect to Soda SQL

1. If you have not already done so, create a free Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>. You, as the first user in your organization to sign up for a Soda Cloud account, become the account's **Admin** by default. Learn more about [Roles and rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}). An Admin role is necessary to complete this tutorial.
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
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.