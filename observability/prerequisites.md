---
layout: default
title: Prerequisites
description: How to set up Soda Agent?
parent: Observability Guide
nav_order: 520
---

# Prerequisites
To use data observability, you need the following:

- Create a Soda Cloud account.
- Set up a Soda Agent (optional).
- Connect a data source.

## Create a Soda Cloud account
If you don’t have a Soda Cloud account, [book a demo](https://www.soda.io/schedule-a-demo). You’ll get a free trial to explore and test Soda.

## Soda Agent (Optional)
This step is optional. Soda creates a Soda-hosted Agent with every account.
You can think of an Agent as the bridge between your data sources and Soda Cloud. A Soda-hosted Agent runs in Soda's cloud and securely connects to your data sources to scan for data quality issues.

If you are an admin and prefer to deploy your own agent, you can configure a self-hosted agent: 
- In Soda Cloud, go to **your avatar** > **Agents**
- Click **New Soda Agent** and follow the setup instructions
<br />
![soda-hosted-agent](/assets/images/soda-hosted-agent.png){:height="700px" width="700px"}

{% include agent-basics.md %}


## Connect a Data Source
{% include connect-datasource.md %}

### Supported databases for data observability

Soda supports metric monitoring for multiple databases. Soda leverages metadata history when available. If metadata history isn't available for your data source, Soda builds history gradually as scans occur.

#### Metric monitoring support

- **Metadata-based metrics**
  - [Snowflake]({% link soda/connect-snowflake.md %})
  - [BigQuery]({% link soda/connect-bigquery.md %})
  - [Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
  - [MS SQL Server]({% link soda/connect-mssql.md %})
  - [PostgreSQL]({% link soda/connect-postgres.md %})

- **Historical metric support**
  - **From metadata**
    - [Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)

  - **From query logs**
    - [Snowflake]({% link soda/connect-snowflake.md %})
    - [BigQuery]({% link soda/connect-bigquery.md %})

- **Data-based metrics**
  - All data sources are theoretically supported for data-based metric monitoring.


## What's Next?

- [Explore how to analyse and keep track of your Metric Monitors.]({% link observability/metric-monitors.md %})