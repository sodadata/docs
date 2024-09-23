---
layout: default
title: Automate anomaly detection
description: Use this guide to set up Soda and start automatically monitoring your data for quality.
parent: Use case guides
---

# Automate anomaly detection
<!--Linked to email campaign, access Shlink-->
![preview](/assets/images/preview.png){:height="90px" width="90px"} <br />
*Last modified on {% last_modified_at %}*

Use this guide to set up Soda and begin automatically monitoring the data quality of datasets in a data source. Use the guided workflow in Soda Cloud to connect to a data source, profile your data, and activate **anomaly dashboards** for your datasets. <br />

![profile-anomalies](/assets/images/profile-anomalies.png){:height="700px" width="700px"}

[About this guide](#about-this-guide)<br />
[Set up a Soda Agent](#set-up-a-soda-agent)<br />
[Automate data quality monitoring](#automate-data-quality-monitoring)<br />
[Access an anomaly dashboard](#access-an-anomaly dashboard)<br />
[Set up alert notifications](#set-up-alert-notifications)<br/>
[Go further](#go-further)<br />
<br />

## About this guide

This guide offers Data Analysts, Data Scientists, and business users instructions to set up Soda to profile and begin monitoring data for quality, right out of the box.

This example offers instructions for both a self-hosted and Soda-hosted agent deployment models which use Soda Cloud connected to a Soda Agent to securely access data sources and execute scheduled scans for data quality anomaly detections. See: [Choose a flavor of Soda]({% link soda/setup-guide.md %}#soda-hosted-agent). 


## Set up a Soda Agent

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda-hosted Agent</label>
  <label class="tab" id="two-tab" for="two">Self-hosted Agent </label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">
This setup provides a secure, out-of-the-box Soda-hosted Agent to manage access to data sources from within your Soda Cloud account. 

### Compatibility

{% include compatible-soda-hosted.md %}

### Set up

{% include access-managed-agent.md %}

<br />

Invite your colleague(s) to your Soda Cloud organization so they can access the newly-deployed Soda Agent to connect to data sources and begin monitoring data quality. In your Soda Cloud account, navigate to **your avatar** > **Invite Team Members** and fill in the blanks.

  </div>
  <div class="panel" id="two-panel" markdown="1">

This setup uses a secure self-hosted Soda Agent to manage access to data sources from within your Soda Cloud account. 

### Compatibility

{% include compatible-cloud-datasources.md %}

### Set up

A self-hosted Soda Agent is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a self-hosted Soda Agent in the cluster.

For context, the instructions to deploy a self-hosted agent assume:
* you have the appropriate access to a cloud services provider environment such as Azure, AWS, or Google Cloud that allows you to create and deploy applications to a cluster, 
* you, or someone on your team, has access to the login credentials that Soda needs to be able to access a data source such as MS SQL, BigQuery, or Athena so that it can run scans of the data.

Access the [exhaustive deployment instructions]({% link soda-agent/deploy.md %}#deploy-a-soda-agent-in-a-kubernetes-cluster) for the cloud services provider you use.
* Cloud services provider-agnostic instructions
* Amazon Elastic Kubernetes Service (EKS)
* Microsoft Azure Kubernetes Service (AKS)
* Google Kubernetes Engine (GKE)

See also: [Soda Agent basic concepts]({% link soda-agent/basics.md %}) 

  </div>

  </div>
</div>

<br />

## Automate data quality monitoring

*For preview participants, only*

1. As a user with permission to do so in your Soda Cloud account, navigate to **your avatar** > **Data Sources**.
2. In the **Agents** tab, confirm that you can see your Soda-hosted agent and that its status is "green" in the **Last Seen** column. 
![soda-hosted-agent](/assets/images/soda-hosted-agent.png){:height="700px" width="700px"}
3. Navigate to the **Data source** tab, then click **New Data Source** and follow the guided steps to connect to a new data source. Refer to the subsections below for insight into the values to enter in the fields and editing panels in the guided steps. 

<br />


#### 1. Attributes

| Field or Label | Guidance |
| -------------- | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Agent | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At | Select the time of day to run the scan. The default value is midnight. |
| Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |
| Anomaly Dashboard Scan Schedule <br />![preview](/assets/images/preview.png){:height="75px" width="75px"} <br /> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard. |


<br />

#### 2. Connect

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

Access the [data source-specific connection configurations]({% link soda/connect-athena.md %}) for the connection syntax and descriptions; adjust the values to correspond with your data source's details. 

To more securely provide sensitive values such as usernames and passwords in a self-hosted agent deployment model, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials]({% link soda-agent/secrets.md %}#use-environment-variables-to-store-data-source-connection-credentials) for details.
 
<br />

#### 3. Discover 

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset's schema and the columns it contains.

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

To gather more detailed profile information about datasets in your data source and automatically build an **anomaly dashboard** for data quality observability, you can configure Soda Cloud to profile the columns in datasets. 

Profiling a dataset produces two tabs' worth of data in a dataset page:
* In the **Columns** tab, you can see column profile information including details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.
![profile-columns2](/assets/images/profile-columns2.png){:height="600px" width="600px"}
* In the **Anomalies** tab, you can access an out-of-the-box Anomaly Dashboard that uses the column profile information to automatically begin detecting anomalies in your data relative to the patterns the machine learning algorithm learns over the course of approximately five days. [Learn more]({% link soda-cloud/anomaly-dashboard.md %})<br /> ![preview](/assets/images/preview.png){:height="75px" width="75px"}  <br />
![profile-anomalies](/assets/images/profile-anomalies.png){:height="600px" width="600px"}

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


#### 5. Assign Owner

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Definition. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Manage global roles, user groups, and settings ]({% link soda-cloud/roles-global.md %}#data-source-dataset-agreement-and-check-owners) to learn how to adjust the Dataset Owner of individual datasets.|


## Access an anomaly dashboard

After approximately five days, during which Soda's machine learning studies your data, you can navigate to the **Anomalies** tab on the **Dataset** page on one of the datasets you included in profiling to view the issues Soda automatically detected.

{% include about-anomaly-dashboard.md %}


## Set up alert notifications

{% include anomaly-notifs.md %}

<br />


## Go further

* Learn more about the [anomaly dashboard]({% link soda-cloud/anomaly-dashboard.md %}) for datasets.
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