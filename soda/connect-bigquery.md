---
layout: default
title: Connect Soda to GCP BigQuery
description: Access configuration details to connect Soda to a BigQuery data source.
parent: Connect a data source
---

# Connect Soda to GCP Big Query
*Last modified on {% last_modified_at %}*

{% include connect-to-intro.md %}

[Connection configuration](#connection-configuration)<br />
[Authentication methods](#authentication-methods)<br />
[Test the datasource connection](#test-the-data-source-connection)<br />
[Supported data types](#supported-data-types)<br />
[Use a file reference for a Big Query data source connection](#use-a-file-reference-for-a-big-query-data-source-connection)<br />
<br />


A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do. 
* In the context of Soda, a [dataset]({% link soda/glossary.md %}#dataset) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, a stream in Kafka, or a DataFrame in a Spark application. 
* In the context of BigQuery, a <a href="https://cloud.google.com/bigquery/docs/datasets-intro" target="_blank"> dataset</a> is "a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset..."

Instances of "dataset" in Soda documentation always reference the former.

## Connection configuration

```yaml
data_source my_datasource_name:
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

| Property                                | Required                                                             |
| --------------------------------------- | -------------------------------------------------------------------- |
| type                                    | required                                                             |
| account_info_json                       | optional; inline properties listed below; if not provided, Soda uses Google Application Default Credentials |
| &ensp;&ensp;type                        | required                                                             |
| &ensp;&ensp;project_id                  | required                                                             |
| &ensp;&ensp;private_key_id              | required                                                             |
| &ensp;&ensp;private_key                 | required                                                             |
| &ensp;&ensp;client_email                | required                                                             |
| &ensp;&ensp;client_id                   | required                                                             |
| &ensp;&ensp;auth_uri                    | required                                                             |
| &ensp;&ensp;token_uri                   | required                                                             |
| &ensp;&ensp;auth_provider_x509_cert_url | required                                                             |
| &ensp;&ensp;client_x509_cert_url        | required                                                             |
| auth_scopes                             | optional; Soda applies the three scopes listed above by default      |
| project_id                              | optional; overrides project_id from account_info_json                |
| storage_project_id                      | optional; enables you to use separate project for compute and storage|
| dataset                                 | required                                                             |


## Authentication methods

Using GCP BigQuery, you have the option of using one of several methods to authenticate the connection.

1. Application Default Credentials
2. Application Default Credentials with Service Account impersonation
3. Service Account Key (see [connection configuration](#connection-configuration) above)
4. Service Account Key with Service Account Impersonation

<br />

#### Application Default Credentials

Add the `use_context_auth` property to your connection configuration, as per the following example.
```yaml
data_source my_datasource:
  type: bigquery
  connection:
    use_context_auth: True
```

<br />

#### Application Default Credentials with Service Account impersonation

Add the `use_context_auth` and `impersonation_account` properties to your connection configuration, as per the following example.
```yaml
data_source my_datasource:
  type: bigquery
  connection:
    use_context_auth: True
    impersonation_account: <SA_EMAIL>
```

<br />

#### Service Account Key with Service Account impersonation

Add the `impersonation_account` property to your connection configuration, as per the following example.

```yaml
data_source my_database_name:
  type: bigquery
  connection:
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

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deployment and redployment in your Kubernetes cluster. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy-google.md %}#deploy-using-a-values-yaml-file) for details.
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

The following command will add the service account information to a Kubernetes secret to be consumed by the Soda Agent according to the above configuration.
```shell
kubectl create secret -n <soda-agent-namespace> gcloud-credentials --from-file=serviceaccount.json=<local path to the serviceccount.json>
```

After both of these changes are made the Soda Agent has to be redeployed. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy-google.md %}#deploy-using-a-values-yaml-file) for details.   

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

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
