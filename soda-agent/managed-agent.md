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

You can create a Kubernetes cluster in your organization's environment and use Helm to deploy a Self-hosted Soda Agent in the cluster, or you can use the secure, out-of-the-box **Soda-hosted agent** made available for every Soda Cloud organization.

A Soda-hosted agent enables Soda Cloud users to securely connect to BigQuery, MySQL, PostgreSQL, or Snowflake data sources and create checks for data quality in the new data source.

As a step in the **Get started roadmap**, this guide offers instructions to set up Soda in a [Soda-hosted agent deployment model]({% link soda/setup-guide.md %}#soda-managed-agent).

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda: Soda-hosted agent** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Add a new data source](#add-a-new-data-source)<br />
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate


### Compatibility

You can use a Soda-manage agent to connect with the following data sources:
* BigQuery
* MySQL
* PostgreSQL
* Snowflake


## Create a Soda Cloud account

{% include access-managed-agent.md %}


## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Data Sources**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

#### 1. Attributes

| Field or Label            | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Schedule Label | Provide a name for the default scan schedule for this data sources. The scan schedule indicates which Soda Agent to use to execute the scan, and when.  |
| Default Scan Schedule Agent | Select `SodaManagedAgent`. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Schedule Definition | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At | Select the time of day to run the scan. The default value is midnight. |
| Time Zone | Select a timezone. The default value is UTC. |
| Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |

<br />

#### 2. Connect the Data Source

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

Soda hosts agents in a secure environment in Amazon AWS. As a SOC 2 Type 2 certified business, Soda responsibly manages Soda-hosted agents to ensure that they remain private, secure, and independent of all other hosted agents. See [Data security and privacy]({% link soda/data-privacy.md %}#using-a-soda-hosted-agent) for details.

Use the following data source-specific connection configuration pages to populate the connection fields in Soda Cloud.
*  [Connect to BigQuery]({% link soda/connect-bigquery.md %})
*  [Connect to MySQL]({% link soda/connect-mysql.md %})
*  [Connect to PostgreSQL]({% link soda/connect-postgres.md %})
*  [Connect to Snowflake]({% link soda/connect-snowflake.md %})
 
<br />

#### 3. Discover Datasets

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset names and the columns each contains.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. See [Add dataset discovery]({% link soda-cl/profile.md %}l#add-dataset-discovery) for more detail on profiling syntax.

*Known issue:* SodaCL does not support using variables in column profiling and dataset discovery configurations. <!--SAS-1642-->

{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

#### 4. Profile datasets

To gather more detailed profile information about datasets in your data source, you can configure Soda Cloud to profile the columns in datasets. 

Column profile information includes details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character. See [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for more detail on profiling syntax.

Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

<br />

#### 5. Check Datasets

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly score]({% link soda-cl/anomaly-score.md %}) and [schema]({% link soda-cl/schema.md %}) checks, respectively.

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

#### 6. Assign Owner

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Schedule. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Roles and Rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) to learn how to adjust the Dataset Owner of individual datasets.|

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
