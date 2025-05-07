---
layout: default
title: Quickstart Observability
description: Quickstart Observability
parent: Data Observability
nav_order: 511
---

# Quickstart: Get Started with Observability

*Last modified on {% last_modified_at %}*

This quickstart walks you through enabling observability on a single dataset to help you explore Soda’s functionality as quickly as possible.

You will:
- Create a Soda Cloud account
- Connect a data source
- Configure your first dataset to enable observability

> 💡 We recommend enabling observability for a single dataset that updates daily and has been in use for a while.
> This gives you more meaningful results, faster.
> 
> You can always update or remove the data source later—this is just a test connection to explore the platform.

## Step 1: Create a Soda Cloud Account
1. Go to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank"> cloud.soda.io</a> and sign up for a Soda Cloud account. If you already have an account, log in.
2. By default, Soda creates a Soda-hosted Agent for all new accounts. You can think of an Agent as the bridge between your data sources and Soda Cloud. A Soda-hosted Agent runs in Soda's cloud and securely connects to your data sources to scan for data quality issues.
3. If you are an admin and prefer to deploy your own agent, you can configure a self-hosted agent: 

    - In Soda Cloud, go to **your avatar** > **Agents**  
    - Click **New Soda Agent** and follow the setup instructions

<br />
![soda-hosted-agent](/assets/images/soda-hosted-agent.png){:height="700px" width="700px"}

{% include agent-basics.md %}

## Step 2: Add a Data Source
{% include connect-datasource.md %}

Use the appropriate guide below to complete the connection:
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
*  [Connect to MS SQL Server]({% link soda/connect-mssql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})

## Step 3: Test Data Source Connection
Click **Test Connection** at the top to verify that all connection settings are configured correctly.
![test-connection](/assets/images/test-connection.png){:height="150px"}

If everything is configured properly, you’ll see a success screen like the one below.

![connected-succesfully](/assets/images/connected-succesfully.png){:height="100px"}

## Step 4: Configure Dataset Discovery, Profiling and Anomaly Detection
In this step, you define which datasets and columns Soda will monitor, and enable anomaly detection to automatically surface issues.

### 4.1 Dataset Discovery
Dataset discovery collects metadata about each dataset, including its schema and the data types of each column.

![datasource-discover](/assets/images/datasource-discover.png){:height="400px"}

Specify the datasets you want to profile. Because dataset discovery can be resource-intensive, only include datasets that are important for observability.

See [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.

### 4.2 Column Profiling
Column profiling captures metrics such as the mean, minimum, and maximum values in a column, as well as the number of missing values.

![datasource-profile](/assets/images/datasource-profile.png){:height="400px"}

Use include/exclude patterns to specify which columns Soda should profile. These metrics feed into the anomaly dashboard.

By default, Soda includes all datasets in the data source. If you’re just testing the functionality, you can leave the default settings and click Next to continue.

### 4.3 Anomaly Detection
In the Detect Anomalies tab, define which datasets should be monitored for anomalies like schema changes or unusual metric behavior.

![datasource-anomaly](/assets/images/datasource-anomaly.png){:height="400px"}

Use include/exclude filters to specify the datasets to monitor with Metric Monitors.

![historical-metric-collection](/assets/images/historical-metric-collection.png){:width="400px"}

You can also enable historical metric collection to calculate past metrics and provide training data for the anomaly detection engine. This helps with:

1. Assessing how the data quality metrics were performing in the past.
2. Using them as training data for the anomaly detection algorithms.


## Step 5: Assing a Data Source and Dataset Owner
Assign responsibility for maintaining the data source and each dataset.

![datasource-owner](/assets/images/datasource-owner.png){:height="400px"}

- **Data Source Owner:** Manages the connection settings and scan configurations for the data source.
- **Dataset Owner:**  Becomes the default owner of each dataset for monitoring and collaboration.

For more details, see [Roles and rights in Soda Cloud]({% link soda-cloud/roles-global.md %}).

## Step 6: Test Connection and Save
- Click **Test Connection** to verify your configuration.
- Click **Save** to start profiling the selected datasets.

![datasource-save-run](/assets/images/datasource-save-run.png){:height="400px"}

Once saved, Soda runs a first scan using your profiling settings. This initial scan provides baseline measurements that Soda uses to begin learning patterns and identifying anomalies.

## Step 7: View Metric Monitor Results
1. Go to the **Datasets** page in Soda Cloud.
2. Select a dataset you included in profiling.
3. Open the **Metric Monitors** tab to view automatically detected issues.

After the historical metric collection scan is complete (this usually takes just a few minutes), you can review the results.

![metric-monitors-dashboard](/assets/images/metric-monitors-dashboard.png){:height="700px"}

On this screen, you’ll see the following metrics:

| Metric name            | Based on | How it's calculated                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Total Row Count**        | metadata | The total number of rows in the dataset at scan time obtained from metadata.                                                      |
| **Total Row Count Change** | metadata | The total number of rows at the previous scan time deducted from the current total row count obtained from metadata at scan time. |
| **Last Insertion Time**    | metadata | The time of last insert at the scan time obtained from metadata and deducted from the scan time.                                  |
| **Schema Changes**         | metadata | The number of changes in the dataset schema at the scan time compared to the previous scan.                                       |
| **Partition Row Count**    | data     | The number of rows inserted in the last partition.                                                                                |
| **Most Recent Timestamp**  | data     | The most recent timestamp in the time partition column at scan, deducted from scan time.

### 🎉 Congratulations! You’ve set up your dataset and enabled observability.

## What's Next?
Now that your first dataset is configured and observability is active, try:

- [Explore detailed metrics in the anomaly guide]({% link observability/observability-guide.md %})
- [Set up alerts for anomaly detection]({% link observability/set-up-alerts.md %})
