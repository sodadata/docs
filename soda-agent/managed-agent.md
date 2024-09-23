---
layout: default
title: Set up a Soda-hosted agent
description: Use an out-of-the-box Soda-hosted agent to connect to your data sources and begin testing data quality.
parent: Get started
---

# Set up a Soda-hosted agent
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. 

Use the secure, out-of-the-box **Soda-hosted agent** made available for every Soda Cloud organization or, alternatively, you can create a Kubernetes cluster in your organization's environment and use Helm to deploy a Self-hosted Soda Agent in the cluster; see [Deploy a Soda Agent]({% link soda-agent/deploy.md %}).

A Soda-hosted agent enables Soda Cloud users to securely connect to [supported data sources](#compatibility) and create checks for data quality in the new data source.

As a step in the **Get started roadmap**, this guide offers instructions to set up Soda in a [Soda-hosted agent deployment model]({% link soda/setup-guide.md %}#soda-managed-agent).

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda: Soda-hosted agent** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Add a new data source](#add-a-new-data-source)<br />
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate


## Compatibility

{% include compatible-soda-hosted.md %}


## Create a Soda Cloud account

{% include access-managed-agent.md %}


## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Data Sources**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

💡 Already have data source connected to a self-hosted agent? You can [migrate]({% link soda/upgrade.md %}#migrate-a-data-source-from-a-self-hosted-to-a-soda-hosted-agent) a data source to a Soda-hosted agent.

#### 1. Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At (UTC) | Select the time of day to run the scan. The default value is midnight. |
| Custom Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Anomaly Dashboard Scan Schedule <br />![preview](/assets/images/preview.png){:height="75px" width="75px"} <br /> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard. |

<br />

#### 2. Connect

Enter values in the fields to provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. See [Data security and privacy]({% link soda/data-privacy.md %}#using-a-soda-hosted-agent) for details.

Use the following data source-specific connection configuration pages to populate the connection fields in Soda Cloud.
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to Databricks SQL]({% link soda/connect-spark.md %}#connect-to-spark-for-databricks-sql)
*  [Connect to MS SQL Server]({% link soda/connect-mssql.md %})
*  [Connect to MySQL]({% link soda/connect-mysql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Redshift]({% link soda/connect-redshift.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})
 
<br />

#### 3. Discover

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including dataset names, the columns each contains, and the type of data each column contains such as integer, character varying, timestamp, etc.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. See [Add dataset discovery]({% link soda-cl/profile.md %}#add-dataset-discovery) for more detail on profiling syntax.

*Known issue:* SodaCL does not support using variables in column profiling and dataset discovery configurations. <!--SAS-1642-->

{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

#### 4. Profile

To gather more detailed profile information about datasets in your data source and automatically build an **anomaly dashboard** for data quality observability (preview, only), you can configure Soda Cloud to profile the columns in datasets. 

Profiling a dataset produces two tabs' worth of data in a dataset page:
* In the **Columns** tab, you can see column profile information including details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.
![profile-columns2](/assets/images/profile-columns2.png){:height="600px" width="600px"}
* In the **Anomalies** tab, you can access an out-of-the-box anomaly dashboard that uses the column profile information to automatically begin detecting anomalies in your data relative to the patterns the machine learning algorithm learns over the course of approximately five days. [Learn more]({% link soda-cloud/anomaly-dashboard.md %})<br /> ![preview](/assets/images/preview.png){:height="75px" width="75px"} <br />
![profile-anomalies](/assets/images/profile-anomalies.png){:height="600px" width="600px"}

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character. See [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for more detail on profiling syntax.

Column profiling and automated anomaly detection can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

<br />

#### 5. Check

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly detection]({% link soda-cl/anomaly-detection.md %}) and [schema evolution]({% link soda-cl/schema.md %}#define-schema-evolution-checks) checks, respectively.

(Note that if you have signed up for early access to [anomaly dashboards]({% link soda-cloud/anomaly-dashboard.md %}) for datasets, this **Check** tab is unavailable as Soda performs all automated monitoring automatically in the dashboards.)

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. Refer to [Add automated monitoring checks]({% link soda-cl/automated-monitoring.md %}) for further detail.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
``` 


#### (5) 6. Assign

This tab is the fifth step in the guided workflow if the **5. Check** tab is absent because you requested access to the anomaly dashboards feature.

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Definition. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Manage roles and permissions in Soda Cloud]({% link soda-cloud/roles-global.md %}#data-source-dataset-agreement-and-check-owners) to learn how to adjust the Dataset Owner of individual datasets.|

<br />


## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: self-hosted agent</font></s> 
3. **[Write SodaCL checks]({% link soda-cl/soda-cl-overview.md %})**
4. Run scans and review results
5. Organize, alert, investigate

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
