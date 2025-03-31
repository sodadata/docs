---
layout: default
title: Quickstart Observability
description: Quickstart Observability
parent: Observability
nav_order: 511
---

# Quickstart: Get Started with Observability

*Last modified on {% last_modified_at %}*

In this quickstart, you will: 
- Create a Soda Cloud account
- Connect a data source
- Configure your first dataset to enable observability.

## Step 1: Create a Soda Cloud Account
1. Go to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank"> cloud.soda.io</a> and sign up for a Soda Cloud account. If you already have an account, log in.
2. By default, Soda creates a Soda-hosted Agent for all new accounts. You can think of an Agent as the bridge between your data sources and Soda Cloud. A Soda-hosted Agent runs in Soda's cloud and securely connects to your data sources to scan for data quality issues.
3. If you are an admin and prefer to deploy your own agent, you can configure a self-hosted agent: 

- In Soda Cloud, go to **your avatar** > **Agents**
- Click **New Soda Agent** and follow the setup instructions
<br />
![soda-hosted-agent](/assets/images/soda-hosted-agent.png){:height="700px" width="700px"}

> **Soda Agent Basics**
> <br />
> There are two types of Soda Agents:
> 1. **Soda-hosted Agent:** This is an out-of-the-box, ready-to-use agent that Soda provides and manages for you. It's the quickest way to get started with Soda as it requires no installation or deployment. It supports connections to specific data sources like BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, and Snowflake. [Soda-hosted agent (missing)](#)
> 2. **Self-hosted Agent:** This is a version of the agent that you deploy in your own Kubernetes cluster within your cloud environment (like AWS, Azure, or Google Cloud). It gives you more control and supports a wider range of data sources. [Self-hosted agent (missing)](#)
> 
> A Soda Agent is essentially Soda Library (the core scanning technology) packaged as a containerized application that runs in Kubernetes. It acts as the bridge between your data sources and Soda Cloud, allowing users to:
> - Connect to data sources securely
> - Run scans to check data quality
> - Create and manage no-code checks directly in the Soda Cloud interface
>
> The agent only sends metadata (not your actual data) to Soda Cloud, keeping your data secure within your environment. Soda [Agent basic concepts (missing)](#)

## Step 2: Add a Data Source
1. In Soda Cloud, go to **your avatar** > **Data Sources**.
2. Click **New Data Source**, then follow the guided steps to create the connection.
Use the table below to understand what each field means and how to complete it:

####  Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At (UTC) | Select the time of day to run the scan. The default value is midnight. |
| Custom Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Anomaly Dashboard Scan Schedule <br />![available-2025](/assets/images/available-2025.png){:height="150px" width="150px"} <br /> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard. |

{:start="3"}
3. Complete the connection configuration. These settings are specific to each data source (PostgreSQL, MySQL, Snowflake, etc) and usually include connection details such as host, port, credentials, and database name.

Use the appropriate guide below to complete the connection:
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
*  [Connect to MS SQL Server]({% link soda/connect-mssql.md %})
*  [Connect to MySQL]({% link soda/connect-mysql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Redshift]({% link soda/connect-redshift.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})


## Step 3: Configure Dataset Discovery
Dataset discovery captures metadata about each dataset, including its schema and the data types of each column.

- In Step 3 of the guided workflow, specify the datasets you want to profile. Because dataset discovery can be resource-intensive, only include the datasets you need for observability.
See [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.

## Step 4: Add Column Profiling
Column profiling extracts metrics such as the mean, minimum, and maximum values in a column, and the number of missing values.

- In Step 4 of the guided workflow, use include/exclude patterns to define which columns Soda should profile. Soda uses this information to power the anomaly dashboard. Learn more about [column profiling syntax]({% link soda-cl/profile.md %}#add-column-profiling).

```yaml
profile columns:
  columns:
    - "%.%"  # Includes all columns of all datasets
    - "prod%.%"  # Includes all columns of all datasets that begin with 'prod'
```

## Step 5: Add Automated Monitoring Checks
In Step 5 of the guided workflow, define which datasets should have automated checks applied for anomaly scores and schema evolution.

> If you are using the early access anomaly dashboard, this step is not required. Soda automatically enables monitoring in the > dashboard. See [Anomaly Dashboard]({% link soda-cloud/anomaly-dashboard.md %}) for details.

Use include/exclude filters to target specific datasets. Read more about [automated monitoring configuration]({% link soda-cl/automated-monitoring.md %}).

```yaml
automated monitoring:
  datasets:
    - include prod% # Includes all the datasets that begin with 'prod'
    - exclude test% # Excludes all the datasets that begin with 'test'
```

## Step 6: Assing a Data Source and Dataset Owner
In the step 6 of the guided workflow, assign responsibility for maintaining the data source and each dataset.

- **Data Source Owner:** Manages the connection settings and scan configurations for the data source.
- **Dataset Owner:**  Becomes the default owner of each dataset for monitoring and collaboration.

For more details, see [Roles and rights in Soda Cloud]({% link soda-cloud/roles-global.md %}).

## Step 7: Test Connection and Save
- Click **Test Connection** to verify your configuration.
- Click **Save** to start profiling the selected datasets.

Once saved, Soda runs a first scan using your profiling settings. This initial scan provides baseline measurements that Soda uses to begin learning patterns and identifying anomalies.

## Step 8: View Metric Monitor Results
1. Go to the **Datasets** page in Soda Cloud.
2. Select a dataset you included in profiling.
3. Open the **Metric Monitors** tab to view automatically detected issues.

![profile-anomalies](/assets/images/profile-anomalies.png){:height="700px" width="700px"}

### 🎉 Congratulations! You’ve set up your dataset and enabled observability.

## What's Next?
Now that your first dataset is configured and observability is active, try:

- [Explore detailed metrics in the anomaly dashboard]({% link observability/anomaly-dashboard.md %})
- [Set up alerts for anomaly detection]({% link observability/set-up-alerts.md %})
