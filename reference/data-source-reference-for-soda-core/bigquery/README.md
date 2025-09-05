---
description: Access configuration details to connect Soda to a BigQuery data source.
---

# BigQuery

A note about BigQuery datasets: Google uses the term dataset slightly differently than Soda (and many others) do.

* In the context of Soda, a [dataset](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/learning-resources/glossary#dataset) is a representation of a tabular data structure with rows and columns. A dataset can take the form of a table in PostgreSQL or Snowflake, or a DataFrame in a Spark application.
* In the context of BigQuery, a [dataset](https://cloud.google.com/bigquery/docs/datasets-intro) is “a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset…”

Instances of "dataset" in Soda documentation always reference the former.

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-bigquery
```

#### Data source YAML

```yaml
# Option A — Service Account
type: bigquery
name: my_bigquery
connection:
  account_info_json: ${BQ_SERVICE_ACCOUNT_JSON}  # full JSON string. SEE NOTE
  dataset: <your_dataset>
  
  # optional
  auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
  project_id: <your-project-id>  # Defaults to the one embedded in credentials
  storage_project_id: <your-storage-project>
  location: <your-location>  # Defaults to the specified project's location
  client_options: 
  kabels: 
  impersonation_account:
  delegates:
  use_context_auth: False     # if set to True, Application Default Credentials
                              # will be used and other credentials passed in will be ignored
```

```yaml
# Option B — ADC (no key in config)
type: bigquery
name: my_bigquery
connection:
  account_info_json_path: /path/to/service-account.json  # SEE NOTE
  dataset: <your_dataset>
  
  # optional
  auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
  project_id: <your-project-id>  # Defaults to the one embedded in credentials
  storage_project_id: <your-storage-project>
  location: <your-location>  # Defaults to the specified project's location
  client_options: 
  kabels: 
  impersonation_account:
  delegates:
  use_context_auth: False     # if set to True, Application Default Credentials
                              # will be used and other credentials passed in will be ignored
```

{% hint style="info" %}
**Note:** Set `use_context_auth=True` to use application default credentials, in which case `account_info_json` or `account_info_json_path` are not necessary.
{% endhint %}

> * See [Google BigQuery Integration parameters](https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-big-query#integration_parameters)
> * See[ BigQuery's locations documentation](https://cloud.google.com/bigquery/docs/locations) to learn more about `location`.
