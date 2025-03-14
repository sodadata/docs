---
layout: default
title: Quickstart observability
description: Quickstart observability
parent: Observability
nav_order: 511
---

# Quickstart: Get Started with Observability

*Last modified on {% last_modified_at %}*

In this Quickstart, you'll: 
- create a Soda Cloud account, 
- connect a data source, and 
- configure your first dataset to enable observability.

## Step 1: Create a Soda Cloud Account
1. Go to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank"> cloud.soda.io</a> and create a Soda Cloud account.
   If you already have a Soda account, log in.
2. By default, Soda prepares a Soda-hosted agent for all newly-created accounts. However, if you are an Admin in an existing Soda Cloud account and wish to use a Soda-hosted agent, navigate to **your avatar** > **Organization Settings**. In the **Organization** tab, click the checkbox to **Enable Soda-hosted Agent**. 
3. Navigate to **your avatar** > **Data Sources**, then access the **Agents** tab. Notice your out-of-the-box Soda-hosted agent that is up and running. <br />
![soda-hosted-agent](/assets/images/soda-hosted-agent.png){:height="700px" width="700px"}

## Step 2: Add a Data Source
1. In your Soda Cloud account, navigate to **your avatar** > **Data Sources**.
2. Click **New Data Source**, then follow the guided steps to create a new data source (e.g., PostgreSQL, BigQuery).
   Enter the required connection details (host, port, database name, credentials).
   Refer to the section - **Attributes** below for insight into the values to enter in the fields and editing panels in the guided steps. 

####  Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At (UTC) | Select the time of day to run the scan. The default value is midnight. |
| Custom Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Anomaly Dashboard Scan Schedule <br />![available-2025](/assets/images/available-2025.png){:height="150px" width="150px"} <br /> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard. |


3. Enter values in the fields to provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. See [Data security and privacy]({% link soda/data-privacy.md %}#using-a-soda-hosted-agent) for details.

Use the following data source-specific connection configuration pages to populate the connection fields in Soda Cloud.
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
*  [Connect to MS SQL Server]({% link soda/connect-mssql.md %})
*  [Connect to MySQL]({% link soda/connect-mysql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Redshift]({% link soda/connect-redshift.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})

💡 Already have data source connected to a self-hosted agent? You can [migrate]({% link soda/upgrade.md %}#migrate-a-data-source-from-a-self-hosted-to-a-soda-hosted-agent) a data source to a Soda-hosted agent.


## Step 3: Select and Configure a Dataset

1. In the editing panel of **4. Profile**, use the include and exclude syntax to indicate the datasets for which Soda must profile and prepare an anomaly dashboard. The default syntax in the editing panel instructs Soda to profile every column of every dataset in the data source, and, superfluously, all datasets with names that begin with prod. The `%` is a wildcard character. See [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for more detail on profiling syntax.

```yaml
    profile columns:
      columns:
        - "%.%"  # Includes all your datasets
        - prod%  # Includes all datasets that begin with 'prod'
```

2. Continue the remaining steps to add your new data source, then **Test Connection**, if you wish, and **Save** the data source configuration. 

3. Soda begins profiling the datasets according to your **Profile** configuration while the algorithm uses the first measurements collected from a scan of your data to begin the work of identifying patterns in the data. You can navigate to the **Dataset** page for a dataset you included in profiling. Click the **Monitors** tab to view the issues Soda automatically detected.

### Congratulations! You’ve set up your dataset and enabled observability.

#### What's Next?
Now that you’ve set up your first dataset and enabled observability, try:
[Exploring detailed metrics in the dashboard.]({% link observability/anomaly-dashboard.md %})
[Setting up notifications for anomaly detection.]({% link observability/set-up-alerts.md %})
