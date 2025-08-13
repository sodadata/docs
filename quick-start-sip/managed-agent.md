---
description: >-
  Use an out-of-the-box Soda-hosted agent to connect to your data sources and
  begin testing data quality.
---

# Set up a Soda-hosted agent

{% hint style="warning" %}
The Soda environment has been updated since this tutorial.

> Refer to [v4 documentation](https://app.gitbook.com/s/A2PmHkO5cBgeRPdiPPOG/quickstart) for updated tutorials.
{% endhint %}

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality.

Use the secure, out-of-the-box **Soda-hosted agent** made available for every Soda Cloud organization or, alternatively, you can create a Kubernetes cluster in your organization's environment and use Helm to deploy a Self-hosted Soda Agent in the cluster; see [Deploy a Soda Agent](deploy.md).

A Soda-hosted agent enables Soda Cloud users to securely connect to [supported data sources](managed-agent.md#compatibility) and create checks for data quality in the new data source.

As a step in the **Get started roadmap**, this guide offers instructions to set up Soda in a [Soda-hosted agent deployment model](setup-guide.md).

#### Get started roadmap

1. ~~Choose a flavor of Soda~~
2. **Set up Soda: Soda-hosted agent** 📍 You are here!\
   &#x20;    a. [Create a Soda Cloud account](managed-agent.md#create-a-soda-cloud-account)\
   &#x20;    b. [Add a new data source](managed-agent.md#add-a-new-data-source)
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate

## Compatibility

* BigQuery
* Databricks SQL
* MS SQL Server
* MySQL
* PostgreSQL
* Redshift
* Snowflake

## Create a Soda Cloud account

1. If you have not already done so, create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup?utm_source=docs). If you already have a Soda account, log in.
2. By default, Soda prepares a Soda-hosted agent for all newly-created accounts. However, if you are an Admin in an existing Soda Cloud account and wish to use a Soda-hosted agent, navigate to **your avatar** > **Organization Settings**. In the **Organization** tab, click the checkbox to **Enable Soda-hosted Agent**.
3. Navigate to **your avatar** > **Data Sources**, then access the **Agents** tab. Notice your out-of-the-box Soda-hosted agent that is up and running.

<figure><img src="https://docs.soda.io/assets/images/soda-hosted-agent.png" alt=""><figcaption></figcaption></figure>

## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Data Sources**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps.

> Already have data source connected to a self-hosted agent?
>
> You can [migrate](upgrade.md#migrate-a-data-source-from-a-self-hosted-to-a-soda-hosted-agent) a data source to a Soda-hosted agent.

#### 1. Attributes

<table><thead><tr><th width="270">Field or Label</th><th>Guidance</th></tr></thead><tbody><tr><td>Data Source Label</td><td>Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.</td></tr><tr><td>Default Scan Agent</td><td>Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan.</td></tr><tr><td>Check Schedule</td><td>Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression.</td></tr><tr><td>Starting At (UTC)</td><td>Select the time of day to run the scan. The default value is midnight.</td></tr><tr><td>Custom Cron Expression</td><td>(Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron">cron expression</a> to define the schedule Soda Cloud uses to run scans.</td></tr><tr><td>Anomaly Dashboard Scan Schedule (<strong>available in 2025</strong>)</td><td>Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard.</td></tr></tbody></table>

#### 2. Connect

Enter values in the fields to provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials.

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. See [Data security and privacy](../learning-resources/data-privacy.md) for details.

Use the following data source-specific connection configuration pages to populate the connection fields in Soda Cloud.

* [Connect to BigQuery](../data-source-reference/connect-bigquery.md)
* [Connect to Databricks SQL](../data-source-reference/connect-databricks.md)
* [Connect to MS SQL Server](../data-source-reference/connect-mssql.md)
* [Connect to MySQL](../data-source-reference/connect-mysql.md)
* [Connect to PostgreSQL](../data-source-reference/connect-postgres.md)
* [Connect to Redshift](../data-source-reference/connect-redshift.md)
* [Connect to Snowflake](../data-source-reference/connect-snowflake.md)

#### 3. Discover

During its initial scan of your data source, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including dataset names, the columns each contains, and the type of data each column contains such as integer, character varying, timestamp, etc.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source _except_ those with names that begin with `test_`. The `%` is a wildcard character. See [Add dataset discovery](../soda-cl-overview/profile.md#add-dataset-discovery) for more detail on profiling syntax.

{% hint style="warning" %}
**Known issue**: SodaCL does not support using variables in column profiling and dataset discovery configurations.
{% endhint %}

```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

#### 4. Profile

To gather more detailed profile information about datasets in your data source and automatically build an **anomaly dashboard** for data quality observability (preview, only), you can configure Soda Cloud to profile the columns in datasets.

Profiling a dataset produces two tabs' worth of data in a dataset page:

* In the **Columns** tab, you can see column profile information including details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

<figure><img src="../.gitbook/assets/profile-columns2.png" alt=""><figcaption></figcaption></figure>

* In the **Anomalies** tab, you can access an out-of-the-box anomaly dashboard that uses the column profile information to automatically begin detecting anomalies in your data relative to the patterns the machine learning algorithm learns over the course of approximately five days. (Available in 2025. [Learn more](../collaborate/anomaly-dashboard.md))

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`. The `%` is a wildcard character. See [Add column profiling](../soda-cl-overview/profile.md#add-column-profiling) for more detail on profiling syntax.

Column profiling and automated anomaly detection can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations](../soda-cl-overview/profile.md#compute-consumption-and-cost-considerations) for more detail.

```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

#### 5. Check

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly detection](../sodacl-reference/anomaly-detection.md) and [schema evolution](../sodacl-reference/schema.md#define-schema-evolution-checks) checks, respectively.

(Note that if you have signed up for early access to [anomaly dashboards](../collaborate/anomaly-dashboard.md) for datasets, this **Check** tab is unavailable as Soda performs all automated monitoring automatically in the dashboards.)

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source _except_ those with names that begin with `test_`. The `%` is a wildcard character. Refer to [Add automated monitoring checks](../soda-cl-overview/automated-monitoring.md) for further detail.

```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

#### (5) 6. Assign

This tab is the fifth step in the guided workflow if the **5. Check** tab is absent because you requested access to the anomaly dashboards feature.

| Field or Label        | Guidance                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Data Source Owner     | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Definition. |
| Default Dataset Owner | g6driOiYtQZD                                                                                                              |

## Next

1. ~~Choose a flavor of Soda~~
2. ~~Set up Soda: self-hosted agent~~
3. [**Write SodaCL checks**](../soda-cl-overview/)
4. Run scans and review results
5. Organize, alert, investigate

> Need help? Join the [Soda community on Slack](https://community.soda.io/slack).
