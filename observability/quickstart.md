---
layout: default
title: Quickstart Observability
description: Quickstart Observability
parent: Data Observability
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

{% include agent-basics.md %}

## Step 2: Add a Data Source
{% include connect-datasource.md %}

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

- [Explore detailed metrics in the anomaly guide]({% link observability/observability-guide.md %})
- [Set up alerts for anomaly detection]({% link observability/set-up-alerts.md %})
