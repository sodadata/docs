---
layout: default
title: Quick start for Soda Cloud
parent: Soda Cloud
redirect_from: /soda-cloud.html
---

# Quick start tutorial for Soda Cloud

**Sign up** for a free Soda Cloud account, **add datasets** to your account, **integrate** with Slack, then **create** a monitor and an alert to begin monitoring your data.

![tutorial-cloud-happy-path](/assets/images/tutorial-cloud-happy-path.png){:height="600px" width="600px"}

<!--
## Create a sample data source (optional)

In the context of Soda Cloud, a data source is a storage location that contains a collection of datasets, or tables. If you do not have access to a data source on your system, you can use <a href="https://www.docker.com/products/docker-desktop" target="_blank">Docker</a> to build a sample PostgreSQL warehouse so that you can set up your Soda Cloud account and see Soda in action.

All the instructions in this tutorial reference this sample data source.

1. Ensure the Docker app is running, then, from your command-line interface, execute the following to build a containerized PostgreSQL warehouse. 
```shell
docker run --name soda_sql_tutorial_db --rm -d \
    -p 5432:5432 \
    -v soda_sql_tutorial_postgres:/var/lib/postgresql/data:rw \
    -e POSTGRES_USER=sodasql \
    -e POSTGRES_DB=sodasql \
    -e POSTGRES_HOST_AUTH_METHOD=trust \
    postgres:9.6.17-alpine
```
2. Load sample data into your warehouse.
```shell
docker exec soda_sql_tutorial_db \
  sh -c "wget -qO - https://raw.githubusercontent.com/sodadata/soda-sql/main/tests/demo/demodata.sql | psql -U sodasql -d sodasql"
```
-->

## Sign up and add datasets

All the instructions in this tutorial reference a PostgreSQL data source, but you can use your own [data source]({% link soda/glossary.md %}#data-source) for this tutorial. Connect to any of the following Soda-compatible data sources to which you have access. 

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br /></td>
    <td>PostgreSQL<br /> Snowflake<br /></td>
  </tr>
</table>

1. If you have not already done so, create a free Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In Soda Cloud, navigate to **Datasets**, then click **Add Datasets** and follow the guided steps to connect a data source. As reference, use the following input values for the **Connection Details** for a PostgreSQL data source. 
* Data source name: `demodata`
* Data source type: `PostgreSQL`
* Host: `localhost`
* Username: `sodasql` <sup>1</sup>
* Password: `Eg abc123` <sup>1</sup>
* Database: `sodasql`
* Schema: `public`
3. Click **Next** to access **Import Settings**. In this panel, you have the option to instruct Soda Cloud to automatically discover new [datasets]({% link soda/glossary.md %}#dataset) as they are added to your data source, and/or define filters to limit the data Soda Cloud scans. For this tutorial, click **Next** to skip ahead. 
4. Define the default **Scan Schedule** for all datasets in your data source. Set the values to scan the data source every hour, starting at the top of the next hour in your time zone, then **Save**. <br />For this tutorial, you are setting the schedule to run as soon as possible after you have completed this step. When Soda Cloud runs the scheduled scan, it automatically discovers all the datasets in the data source (such as all the tables in a PostgreSQL warehouse) and makes the details available to you so that you can create a new monitor.

Refer to [Add datasets in Soda Cloud]({% link soda-cloud/add-datasets.md %}) for further details.

<sup>1</sup> Stored in a secure database; password is encrypted.

## Integrate with Slack

While you wait for Soda Cloud to complete its first scheduled scan of your data source, connect your Soda Cloud account to your Slack workspace. Making this connection enables you to send Slack notifications to your team when a data issue triggers an [alert]({% link soda/glossary.md %}#alert).

If you do not use Slack, Soda Cloud notifies you and any [teammates you invite]({% link soda-cloud/collaborate.md %}#invite-your-team-members) via email.

{% include integrate-slack-steps.md %}

## Create a monitor and alert

After Soda Cloud completes its first scheduled scan of your data source, you can use the data and metadata it collected, such as column names and data types, to create a monitor and alert. 

Note that Soda Cloud also automatically created a **row count anomaly detection monitor** for each dataset that contains time-series data. This enables Soda Cloud to start learning row count patterns in your dataset over the course of the next few scheduled scans and surface anything it recognizes as anomalous. See [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) for details.

For a new monitor, you define several details including which data to test, what tests to run, and whom to notify when bad data triggers an alert. 

1. In Soda Cloud, navigate to the **Monitors** dashboard, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup. Use the following input values for reference.
* Dataset: `demodata`
* Metric Type: `Row Count` <br />(For datasets you added [via Soda Cloud](#sign-up-and-add-datasets), you can only select Row Count for this field. Soon, Soda Cloud will make more Metric Types available for selection for all datasets.)
* Column: n/a
* Evaluation type: `Threshold`
* Critical Alert: `if less than`; `1`
* Add people, roles or channels to alert: `your slack channel`, if using Slack
* Notify about: `Critical Alerts`
* Frequency: `Immediately`
2. When Soda Cloud runs its next scheduled scan of your data source, it runs the test you just created in your monitor. If the test fails (which, with the example input, would indicate that your dataset is empty), the failure triggers the alert you defined and sends a notification to the Slack channel you identified in your monitor, or your email address if you do not use Slack.

Refer to [Create monitors and alerts]({% link soda-cloud/monitors.md %}) for further details.

## Review your scan results

When Soda Cloud completes its second scheduled scan of your data source, it runs your test and presents the results in the **Monitors** dashboard.

1. Review the results of your test in the **Monitor Results** table in Soda Cloud to find the result for the monitor you just created. See the example below in which a test passed.
![tutorial-monitor-results](/assets/images/tutorial-monitor-results.png){:height="600px" width="600px"}
2. Click the monitor result to access details that can help you diagnose and solve the data issue.
3. Check your Slack channel or email inbox; if the test failed, the scan surfaced a data issue that triggered your alert so Soda Cloud sent a notification.


## Go further

* Follow the detailed steps to [add datasets]({% link soda-cloud/add-datasets.md %}) and begin monitoring your data.
* Learn more about [Soda Cloud Architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Use Soda Cloud to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data.
* Find out how to [examine failed rows]({% link soda-cloud/failed-rows.md %}) for tests that failed.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.