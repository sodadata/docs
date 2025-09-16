---
description: >-
  Access configuration details to connect Soda to a Google Cloud BigQuery data
  source.
---

# BigQuery

### Connection configuration reference

Install the following package:

```bash
pip install -i https://pypi.dev.sodadata.io/simple -U soda-bigquery
```

#### Data source YAML

```yaml
type: bigquery
name: my_bigquery
connection:
  account_info_json: '{
    "type": "service_account",
    "project_id": "dbt-quickstart-44203",
    "private_key_id": "fe0a60e9cb7d4369f73f7b5691ce397d1e",
    "private_key": "-----BEGIN PRIVATE KEY-----<insert-private-key>-----END PRIVATE KEY-----\n",
    "client_email": "dbt-user@dbt-quickstart-448203.iam.gserviceaccount.com",
    "client_id": "114963712293161062",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dbt-user%40dbt-quickstart-44803.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }' # example service account JSON string, exported from BQ; SEE NOTE
  dataset: ${env.BQ_DATASET_NAME}
  # optional
  account_info_json_path: /path/to/service-account.json  # SEE NOTE
  auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
  project_id: ${env.BQ_PROJECT_ID}  # Defaults to the one embedded in the account JSON
  storage_project_id: ${env.BQ_STORAGE_PROJECT_ID}
  location: ${env.BQ_LOCATION}  # Defaults to the specified project's location
  client_options: <options-dict-for-bq-client>
  labels: <labels-dict-for-bq-client>
  impersonation_account: <name-of-impersonation-account>
  delegates: <list-of-delegates-names>
  use_context_auth: false     # whether to use Application Default Credentials
```

{% hint style="info" %}
**Note:** Set `use_context_auth=True` to use application default credentials, in which case `account_info_json` or `account_info_json_path` are not necessary.
{% endhint %}

{% hint style="info" %}
**Note:** Google uses the term "dataset"  differently than Soda:

* In the context of Soda, a [dataset](https://app.gitbook.com/s/oV0A6Eua8LUIyWgHxsjf/learning-resources/glossary#dataset) is a representation of a tabular data structure with rows and columns, such as a table, view, or data frame.&#x20;
* In the context of BigQuery, a [dataset](https://cloud.google.com/bigquery/docs/datasets-intro) is “a top-level container that is used to organize and control access to your tables and views. A table or view must belong to a dataset…”

Instances of "dataset" in Soda documentation always reference the former.
{% endhint %}

> * See [Google BigQuery Integration parameters](https://cloud.google.com/chronicle/docs/soar/marketplace-integrations/google-big-query#integration_parameters)
> * See[ BigQuery's locations documentation](https://cloud.google.com/bigquery/docs/locations) to learn more about `location`.

#### Connection test

Test the data source connection:

```bash
soda data-source test -ds ds.yml
```
