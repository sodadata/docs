---
layout: default
title: Connect Soda to GCP BigQuery
description: Access configuration details to connect Soda to a BigQuery data source.
parent: Data source reference
---

# Connect Soda to GCP Big Query
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

[Connection configuration](#connection-configuration)<br />
[Authentication methods](#authentication-methods)<br />
[Test the datasource connection](#test-the-data-source-connection)<br />
[Supported data types](#supported-data-types)<br />
[Use a file reference for a Big Query data source connection](#use-a-file-reference-for-a-big-query-data-source-connection)<br />
[Troubleshoot](#troubleshoot)<br />
<br />


A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do. 
* In the context of Soda, a [dataset]({% link soda/glossary.md %}#dataset) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, or a DataFrame in a Spark application. 
* In the context of BigQuery, a <a href="https://cloud.google.com/bigquery/docs/datasets-intro" target="_blank"> dataset</a> is "a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset..."

Instances of "dataset" in Soda documentation always reference the former.

## Connection configuration reference

Install package: `soda-bigquery`

{% include code-header.html %}
```yaml
# Service Account Key authentication method
# See Authentication methods below for more config options
data_source my_datasource_name:
  type: bigquery
  account_info_json: '{
      "type": "service_account",
      "project_id": "gold-platform-67883",
      "private_key_id": "d0121d000000870xxx",
      "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
      "client_email": "abc333@project.iam.gserviceaccount.com",
      "client_id": "XXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
    }'
  auth_scopes:
  - https://www.googleapis.com/auth/bigquery
  - https://www.googleapis.com/auth/cloud-platform
  - https://www.googleapis.com/auth/drive
  project_id: "platinum-platform-67883"
  dataset: sodacore
```

| Property   | Required | Notes <br />(See <a href="https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-big-query#integration_parameters" target="_blank">Google BigQuery Integration parameters</a>)|
| --------------------------------------- | -------- | ----- |
| type                                    | required | Identify the type of data source for Soda.  |
| account_info_json                       | required | The integration parameters for account info are listed below. If you do not provide values for the properties, Soda uses the Google application default values. |
| type                        | required | This the type of BigQuery account.  Default: `service_account` |
| project_id                  | required | This is the unique identifier for the project in your console. See <a href="https://support.google.com/googleapi/answer/7014113?hl=en" target="_blank"> Locate the project ID</a>.  |
| private_key_id              | required | A unique identifier that you generate in your console. See <a href="https://cloud.google.com/docs/authentication/api-keys?sjid=11146678289001295316-NC" target="_blank">Create an API key</a>. |
| private_key                 | required | A unique identifier that you generate in your console. See <a href="https://cloud.google.com/docs/authentication/api-keys?sjid=11146678289001295316-NC" target="_blank">Create an API key</a>.        |
| client_email                | required | Also known as the service account ID, find this value in the IAM & Admin > Service Accounts > Details tab in your Google Cloud Console. |
| client_id                   | required | Your unique ID, find this value in the IAM & Admin > Service Accounts > Details tab in your Google Cloud Console.       |
| auth_uri                    | required | BigQuery's authentication URI to which you send auth credentials. Default: `https://accounts.google.com/o/oauth2/auth`|
| token_uri                   | required | BigQuery's token URI to which you send access tokens. Default: `https://oauth2.googleapis.com/ token` |
| auth_provider_x509_cert_url | required | BigQuery's public x509 certificate URL that it uses to verify the JWT signed by the authentication provider. Default: `https://www.googleapis.com/ oauth2/v1/certs`  |
| client_x509_cert_url        | required | BigQuery's public x509 certificate URL that it uses to verify the JWT signed by the client. |
| auth_scopes                             | optional | Soda applies three <a href="https://developers.google.com/identity/protocols/oauth2/scopes" target="_blank">OAuth 2.0 scopes</a>: <br /> • `https://www.googleapis.com/auth/bigquery` to view and manage your data in BigQuery<br /> • `https://www.googleapis.com/auth/cloud-platform` to view, configure, and delete your Google Cloud data<br /> •  `https://www.googleapis.com/auth/drive` to view and add to the record of file activity in your Google Drive |
| project_id                              | optional | Add an identifier to override the `project_id` from the `account_info_json` |
| storage_project_id                      | optional | Add an identifier to use a separate BigQuery project for compute and storage.|
| dataset                                 | required | The identifier for your BigQuery dataset, the top-level container that is used to organize and control access to your tables and views.  |


## Authentication methods

Using GCP BigQuery, you have the option of using one of several methods to authenticate the connection.

1. Application Default Credentials
2. Application Default Credentials with Service Account impersonation
3. Service Account Key (see [connection configuration](#connection-configuration-reference) above)
4. Service Account Key with Service Account Impersonation

<br />

#### Application Default Credentials

Add the `use_context_auth` property to your connection configuration, as per the following example.
{% include code-header.html %}
```yaml
data_source my_datasource:
  type: bigquery
  ...
  use_context_auth: True
```

<br />

#### Application Default Credentials with Service Account impersonation

Add the `use_context_auth` and `impersonation_account` properties to your connection configuration, as per the following example.
{% include code-header.html %}
```yaml
data_source my_datasource:
  type: bigquery
  ...
  use_context_auth: True
  impersonation_account: <SA_EMAIL>
```

<br />

#### Service Account Key with Service Account impersonation

Add the `impersonation_account` property to your connection configuration, as per the following example.
{% include code-header.html %}
```yaml
data_source my_database_name:
  type: bigquery
  ...
  account_info_json: '{
      "type": "service_account",
      "project_id": "...",
      "private_key_id": "...",
    ...}'
  impersonation_account: <SA_EMAIL>
```

<br />

{% include test-connection.md %}

## Supported data types

| Category | Data type                                      |
| -------- | ---------------------------------------------- |
| text     | STRING                                         |
| number   | INT64, DECIMAL, BINUMERIC, BIGDECIMAL, FLOAT64 |
| time     | DATE, DATETIME, TIME, TIMESTAMP                |

## Use a file reference for a Big Query data source connection

If you already store information about your data source in a JSON file in a secure location, you can configure your BigQuery data source connection details in Soda Cloud to refer to the JSON file for service account information. To do so, you must add two elements:
* `volumes` and `volumeMounts` parameters in the `values.yml` file that your Soda Agent helm chart uses
* the `account_info_json_path` in your data source connection configuration 

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deployment and redployment in your Kubernetes cluster. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy.md %}) for details.
{% include code-header.html %}
```yaml
soda:
  scanlauncher:
    volumeMounts:
      - name: gcloud-credentials
        mountPath: /opt/soda/etc
    volumes:
      - name: gcloud-credentials
        secret:
          secretName: gcloud-credentials
          items:
            - key: serviceaccount.json
              path: serviceaccount.json
```

Use the following command to add the service account information to a Kubernetes secret that the Soda Agent consumes according to the configuration above; replace the angle brackets and the values in them with your own values.
```shell
kubectl create secret generic -n <soda-agent-namespace> gcloud-credentials --from-file=serviceaccount.json=<local path to the serviceccount.json>
```

After you make both of these changes, you must redeploy the Soda Agent. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy.md %}) for details.   

Adjust the data source connection configuration to include the `account_info_json_path` configuration, as per the following example. 
{% include code-header.html %}
```yaml
my_datasource_name:
  type: bigquery
  account_info_json_path: /opt/soda/etc/serviceaccount.json
  auth_scopes:
  - https://www.googleapis.com/auth/bigquery
  - https://www.googleapis.com/auth/cloud-platform
  - https://www.googleapis.com/auth/drive
  project_id: ***
  dataset: sodalibrary
```

<br />
<br />

## Troubleshoot

**Problem:** When running a scan, you encounter an error that reads, `400 Cannot query over table 'event_logs' without a filter over column(s) 'serverTimestamp' that can be used for partition elimination`.

**Workaround:** 
The error occurs because the table in BigQuery is configured to require partitioning. 
* If the error occurs when you are [profiling]({% link soda-cl/profile.md %}) your data with Soda, you must disable profiling. 
* If the error occurs when the scan is executing regular SodaCL checks, be sure you always apply a filter on `serverTimestamp`. See [Dataset filters]({% link soda-cl/filters.md %}#configure-dataset-filters)

<br />
---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
