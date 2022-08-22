---
layout: default
title: Create a data source
description: Connect a data source to your Soda Cloud account to begin scanning for data quality.
parent: Soda Cloud
---

# Create a data source ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

To run [scans]({% link soda/glossary.md %}#scan) for data quality in your [data source]({% link soda/glossary.md %}#data-source) such as PostgreSQL or GCP BigQuery, you must first connect Soda Cloud to a data source. 

In setting up a data source, you provide details such as database access credentials, details about the frequency with which Soda Cloud runs scans on this data source, and how much profile information Soda Cloud fetches about the datasets in your data source. 

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

Use the following data source configuration details to copy+paste the content associated with the type of data source you are using into the editing panel. 
 

**Amazon Athena**

 ```yaml
data_source athena:
  type: athena
  connection:
    access_key_id: 
    secret_access_key: 
    region_name: eu-west-1
    staging_dir: 
    database: 
```

**Amazon Redshift**

```yaml
data_source my_database_name:
  type: redshift
  connection:
    host: db
    username:
    password:
    database: soda_test
    access_key_id:
    secret_access_key:
    role_arn:
    region: eu-west-1
  schema: public
```

**GCP BigQuery**

{% include gcp-datasets.md %}

```yaml
data_source my_database_name:
  type: bigquery
  connection:
    account_info_json: '{
        "type": "service_account",
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "...@project.iam.gserviceaccount.com",
        "client_id": "...",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}'
    auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
    project_id: "..."
    dataset: sodacore
```

**PostgreSQL**

```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: db
    port: "5432"
    username:
    password:
    database: postgres
  schema: public
```

**Snowflake**

```yaml
data_source orders:
  type: snowflake
  connection:
    username: "SODATESTING"
    password: "abc123"
    account: sodadatapartner.eu-central-1
    database: SNOWFLAKE_SAMPLE_DATA
    warehouse:
    connection_timeout:
    role: PUBLIC
    client_session_keep_alive:
    session_parameters:
      QUERY_TAG: soda-queries
      QUOTED_IDENTIFIERS_IGNORE_CASE: false
  schema: public
```

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
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Schedule. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Roles and Rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) to learn how to adjust the Dataset Owner of individual datasets.|



## Go further

* Next step: Create a new [agreement]({% link soda-cloud/agreements.md %}).
* Consider completing the [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}