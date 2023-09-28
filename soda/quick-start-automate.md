---
layout: default
title: Automate data quality monitoring
description: 
parent: Use case guides
---

# Automate data quality monitoring
*Last modified on {% last_modified_at %}*

Use this guide to set up Soda and begin automatically monitoring the data quality of datasets in a data source. Use the guided workflow in Soda Cloud to connect to a data source, profile your data, and add automated checks for data quality.

[About this guide](#about-this-guide)<br />
[Set up a Soda Agent](#set-up-a-soda-agent)<br />
[Automate data quality monitoring](#automate-data-quality-monitoring)<br />
[Set up alert notifications](#set-up-alert-notifications)<br/>
[Go further](#go-further)<br />
<br />

## About this guide

The instructions below offer data analysts, data scientists, and business users to set up Soda to profile and begin monitoring data for quality, right out of the box.

This example uses a self-hosted agent deployment model which uses Soda Cloud connected to a Soda Agent which securely accesses data sources and executes scheduled scans for data quality. See: [Choose a flavor of Soda]({% link soda/setup-guide.md %}). 

## Set up a Soda Agent

The Soda Agent is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. To set up a Soda Agent, you create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a Soda Agent in the cluster. 

If you do not have the access or authorization to set up a cluster or deploy the containerized agent, pass the instructions to your data engineering or IT team to complete the exercise for you.

1. <a href="https://cloud.soda.io/signup" target="_blank">Create a Soda Cloud account</a> which is free for a 45-day trial. 
2. Access the [exhaustive deployment instructions]({% link soda-agent/deploy.md %}#deploy-a-soda-agent-in-a-kubernetes-cluster) to deploy a Soda Agent in the cloud services provider you use. 
* Cloud services provider-agnostic instructions
* Amazon Elastic Kubernetes Service (EKS)
* Microsoft Azure Kubernetes Service (AKS)
* Google Kubernetes Engine (GKE)
3. Use the instructions for [managing sensitive values]({% link soda-agent/secrets.md %}) to securely store API key values and data source login credential values that the Soda Agent needs to connect to both Soda Cloud and your data sources. Pass the environment variable identifiers to your colleagues to use when adding a new data source in Soda Cloud.
4. Invite your colleague(s) to your Soda Cloud organization so they can access the newly-deployed Soda Agent to connect to data sources and begin monitoring data quality. In your Soda Cloud account, navigate to **your avatar** > **Invite Team Members** and fill in the blanks.

## Automate data quality monitoring

1. If you have not already done so, <a href="https://cloud.soda.io/signup" target="_blank">create a Soda Cloud account</a>, or accept your colleague's emailed invitation to create an account and join their Soda Cloud organization. 
2. In Soda Cloud, navigate to **your avatar** > **Scans & Data**.
3. In the **Agents** tab, confirm that you can see the Soda Agent you deployed and that its status is "green" in the **Last Seen** column. If not, refer to the Soda Agent documentation to [troubleshoot]({% link soda-agent/deploy.md %}#troubleshoot-deployment) its status.
![agent-running](/assets/images/agent-running.png){:height="700px" width="700px"}
3. Navigate to the **Data source** tab, then click **New Data Source** and follow the guided steps to connect to a new data source and opt-in to auotmated monitoring checks. <br />Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

#### Attributes

| Field or Label | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the [data source]({% link soda/glossary.md %}#data-source). Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Definition Label | Provide a name for the default scan definition. A collection of [checks YAML]({% link soda/glossary.md %}#checks-yaml) files that contain the checks for data quality you wish to scan at a specific time, including details for which Soda Agent to use to connect to which data source.  |
| Default Scan Definition Agent | Select the name of a Soda Agent that you have previously set up in your secure environment and connected to a specific data source. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Schedule Definition | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At | Select the time of day to run the scan. The default value is midnight. |
| Time Zone | Select a timezone. The default value is UTC. |
| Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |

<br />

#### Connect the Data Source

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

To more securely provide sensitive values such as usernames and passwords, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials]({% link soda-agent/deploy.md %}#use-environment-variables-for-data-source-connection-credentials) for details.

Access the [data source-specific connection configurations]({% link soda/connect-athena.md %}) to copy+paste the connection syntax into the editing panel, then adjust the values to correspond with your data source's details. 
 
<br />

#### Discover Datasets

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset's schema and the columns it contains.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. See [Display profile information in Soda Cloud]({% link soda-cl/profile.md %}#limitations-and-known-issues) for more detail on profiling syntax.

*Known issue:* SodaCL does not support using [variables]({% link soda-cl/filters.md %}#configure-variables-in-sodacl) in column profiling and dataset discovery configurations. <!--SAS-1642-->

{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

#### Profile datasets

To gather more detailed profile information about datasets in your data source, you can configure Soda Cloud to profile the columns in datasets. 

Column profile information includes details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character. 

Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

<br />

#### Check Datasets

When Soda Cloud automatically discovers the datasets in a data source, it prepares **automated monitoring checks** for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL anomaly score and schema checks, respectively.  
* [Anomaly score]({% link soda-cl/anomaly-score.md %}) automatically detects anomalies in your time-series data. Its algorithm learns the patterns of your data – including trends and seasonality – to identify and flag anomalies in your data. A detected anomaly yields a failed check result. 
* [Schema evolution]({% link soda-cl/schema.md %}) automatically detects changes in a dataset's schema, whether columns are added, removed, or the index or data type of a column has changed. Any of those schema changes yield a failed check result.

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda adds automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

#### Assign Owner

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Schedule. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Roles and Rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) to learn how to adjust the Dataset Owner of individual datasets.|


## Set up alert notifications

Best practice dictates that you send a notification to someone on your team when bad-quality data triggers a failed check result on one of your automated checks. When alerted to an issue, a person or team can take action to investigate and resolve it.

In Soda Cloud, navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule, supplying values that will trigger a notification any time one of your automated monitoring checks fails. 

The example below sends such notifications for the automated anomaly score check on the `paxstats` dataset.

![automated-alert](/assets/images/automated-alert.png){:height="500px" width="500px"}

<br />


## Go further

* Learn more about [organizing check results]({% link soda-cloud/collaborate.md %}), setting alerts, and investigating issues.
* [Write your own checks]({% link soda-cl/soda-cl-overview.md %}) for data quality.
* [Integrate Soda with Slack]({% link soda/integrate-slack.md %}) to send alert notifications directly to channels in your workspace.
* Integrate Soda with a data catalog to see data quality results from within the catalog: 
    * [Atlan]({% link soda/integrate-atlan.md %})
    * [Alation]({% link soda/integrate-alation.md %})
    * [Metaphor]({% link soda/integrate-metaphor.md %})
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}