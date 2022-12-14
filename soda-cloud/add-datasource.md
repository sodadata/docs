---
layout: default
title: Add a data source
description: Connect a data source to your Soda Cloud account to begin scanning for data quality.
parent: Soda Cloud
redirect_from: /soda-cloud/datasource.html
---

# Add a data source 
*Last modified on {% last_modified_at %}*

To run [scans]({% link soda/glossary.md %}#scan) for data quality in your [data source]({% link soda/glossary.md %}#data-source) such as PostgreSQL or GCP BigQuery, you must first connect Soda Cloud to a data source. 

In setting up a data source, you provide details such as database access credentials, details about the frequency with which Soda Cloud runs scans on this data source, and how much profile information Soda Cloud fetches about the datasets in your data source. 

[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Add a new data source](#add-a-new-data-source)<br />
[Use a file reference for a Big Query data source connection](#use-a-file-reference-for-a-big-query-data-source-connection)<br />
[Go further](#go-further)<br />
<br />

## Compatibility

You can connect Soda Cloud with the following data sources via a [Soda Agent]({% link soda-agent/basics.md %}):

{% include compatible-cloud-datasources.md %}

<br />
Soda Cloud can, however, accept scan results from Soda Core for the following data sources:

{% include compatible-datasources.md %}


## Prerequisites
* You have created a <a href="https://cloud.soda.io/signup" target="_blank">Soda Cloud account</a>.
* You, or an IT Administrator in your organization, has deployed a [Soda Agent]({% link soda-agent/deploy.md %}) in an Amazon Elastic Kubernetes Service (EKS) Fargate environment and connected it to your Soda Cloud account.


## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Scans & Data**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

#### 1. Attributes

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

#### 2. Connect the Data Source

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

To more securely provide sensitive values such as usernames and passwords, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials]({% link soda-agent/deploy.md %}#use-environment-variables-for-data-source-connection-credentials) for details.

Access the data source-specific connection configurations listed below to copy+paste the connection syntax into the editing panel, then adjust the values to correspond with your data source's details. 

{% include connection-list-cloud.md %}
 
<br />

#### 3. Discover Datasets

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset's schema and the columns it contains.

In the editing panel, specify the datasets that Soda Cloud should include or exclude from this basic discovery activity. The default syntax in the editing panel indicates that Soda Cloud will collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.

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

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel indicates that Soda will profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character.

Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. 

```yaml
profile columns:
  columns:
    - "%.%"    # Includes all your datasets
    - "prod%"  # Includes all datasets that begin with 'prod'
```

<br />

#### 5. Check Datasets

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly score]({% link soda-cl/anomaly-score.md %}) and [schema]({% link soda-cl/schema.md %}) checks, respectively.

In the editing panel, specify the datasets that Soda Cloud should include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.

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


## Use a file reference for a Big Query data source connection

If you already store information about your data source in a JSON file in a secure location, you can configure your BigQuery data source connection details in Soda Cloud to refer to the JSON file for service account information. To do so, you must add two elements:
* the `configMap` parameters in the `values.yml` file that your Soda Agent helm chart uses
* the `account_info_json_path` in your data source connection configuration 

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deplouyment and redployment in your Kubernetes cluster. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy-gke.md %}#deploy-using-a-values-yaml-file) for details.
```yaml
soda:
  scanlauncher:
    volumeMounts:
      - name: gcloud-credentials
        mountPath: /opt/soda/etc
    volumes:
      - name: gcloud-credentials
        configMap:
          name: gcloud-credentials
          items:
            - key: serviceaccount.json
              path: serviceaccount.json
```

Run the following command to restart of the Soda Agent in your cluster so that the scan launcher can access the file for service account information.
```shell
kubectl create configmap -n <soda-agent-namespace> gcloud-credentials --from-file=serviceaccount.json=<local path to the serviceccount.json>
```

Adjust the data source connection configuration to include the `account_info_json_path` configuration, as per the following example. 
```yaml
my_datasource_name:
  type: bigquery
  connection:
    account_info_json_path: /opt/soda/etc/serviceaccount.json
    auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
    project_id: ***
    dataset: sodacore
```


## Go further

* Next step: Create a new [agreement]({% link soda-cloud/agreements.md %}).
* Consider completing the [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}