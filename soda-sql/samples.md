---
layout: default
title: Send sample data
description: In Soda Cloud, you may find it useful to review sample data from your dataset to help you determine the kinds of tests to run when Soda SQL scans your data.
sidebar: sql
parent: Soda SQL
redirect_from:
- /soda-sql/documentation/samples.html
- /soda-cloud/samples.html
---

# Send sample data to Soda Cloud

{% include banner-sql.md %}

When creating new [monitors]({% link soda/glossary.md %}#monitor) in Soda Cloud, you may find it useful to review sample data from your [dataset]({% link soda/glossary.md %}#dataset) to help you determine the kinds of [tests]({% link soda-sql/tests.md %}) to run when Soda SQL scans your data; see the image below. For this reason, you may wish to configure a `samples` [configuration key]({% link soda-sql/scan-yaml.md %}#scan-yaml-table-configuration-keys) in Soda SQL.

![sample-data](/assets/images/sample-data.png){:height="650px" width="650px"}


## Add a sample configuration key

DO NOT use sample data if your dataset contains sensitive information or personally identifiable information (PII). For security, you can [disable the sample data feature](#disable-sample-data), or [reroute failed sample data](#reroute-sample-data-for-a-dataset) to an alternate location.

{% include add-sample-config-key.md %}

## Disable sample data

Where your datasets contain sensitive or private information, you may *not* want to send sample data from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

Alternatively, you can prevent Soda SQL from sending metadata or samples to Soda Cloud by using one of the following methods:
* To prevent Soda SQL from sending an individual dataset's scan results or samples to Soda Cloud, use the [`--offline` option]({% link soda-sql/scan.md %}#add-scan-options) when you run a scan.
* To prevent Soda SQL from sending specific column scan results or samples, configure an [`excluded_columns` configuration key]({% link soda-sql/scan-yaml.md %}#scan-yaml-table-configuration-keys) in your scan YAML file.

### Reroute sample data for a dataset

Use a `SampleProcessor` to programmatically send a dataset's samples to a secure location within your organization's infrastructure, such as an Amazon S3 bucket or Google Big Query. Note that you can only configure sample data rerouting for individual datasets, and only for those scans that you have [scheduled programmatically]({% link soda-sql/programmatic_scan.md %}). In Soda Cloud, users looking for sample data see the message you define advising them where they can access and review sample data for the dataset.

#### Reroute to Amazon S3

First, configure a `SampleProcessor` according to the following example.

```python
import boto
import json

from soda.scan.SampleProcessor

class S3SampleProcessor(SampleProcessor):
  # Override the process function
  def process(context) → dict:
    file_name = 'sample_rows.json'
    with open(file_name, 'w', encoding='uft-8') as f:
      json.dump(, f)

    s3_client = boto3.client('s3')
    if object_name is None:
      object_name = os.path.basename(file_name)
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return {'message': 'Unable to load sample data into S3'}
    return {'message':
             f'Sample data is stored in S3://{bucket_name}/{file_name}'}
```
Then, configure the sample processor in a scan builder as per the example below.
```python
# scan_builder construction
scan_builder.sample_processor = S3SampleProcessor()
scan_result = scan_builder.build().execute()
```
<br />

#### Reroute to Google Big Query using existing credentials

This configuration uses the Big Query access credentials that Soda SQL uses. These credentials must have the appropriate service account and scopes in Big Query which give Soda SQL write permission on the table.

First, configure a `SampleProcessor` according to the following example. Note that the `client` parameter points to different objects for different warehouses.
```python
import bigquery
from soda.scan.SampleProcessor

class BigQuerySampleProcessor(SampleProcessor):
  # Override process function - conn/context
  # (here only treating it as a bigquery client)
  def process(context) → dict:
    table_id = "your-project.your_dataset.your_table"

    errors = conn.insert_rows_json(
        table_id, rows, row_ids=[None] * len(rows_to_insert)
    )  # Make an API request.
    if errors == []:
        return { 'count': 50,
                'columns': ['id', 'amount']
                 'message': f'Sample data is stored in {table_id}'}
    else:
       return {'message': 'Unable to save sample data to Bigquery'}
```
Then, configure the sample processor in a scan builder as per the example below.
```python
# scan_builder construction
scan_builder.sample_processor = BigQuerySampleProcessor()
scan_result = scan_builder.build().execute()
```
<br />

#### Reroute to Google Big Query using separate credentials

This configuration *does not* use the Big Query access credentials that Soda SQL uses. The separate credentials must have the appropriate service account and scopes in Big Query which give Soda SQL write permission on the table.

First, configure a `SampleProcessor` according to the following example. Note that the `client` parameter points to different objects for different warehouses.
```python
import json
import bigquery
from soda.scan.SampleProcessor

class BigQuerySampleProcessor(SampleProcessor):
  # Override process function
  # context: sql, connection, sample_reference
  def process(context) → dict:

    table_schema = {
     ## Define Schema for the sample dataset.table
    }

    project_id = '<my_project>'
    dataset_id = '<my_dataset>'
    table_id = '<my_table>'

    client  = bigquery.Client(project = project_id)
    dataset  = client.dataset(dataset_id)
    table = dataset.table(table_id)
    try:
        json_object = json.loads(rows)
        job_config = bigquery.LoadJobConfig()
        job_config.source_format = bigquery.SourceFormat.NEWLINE_DELIMITED_JSON
        job_config.schema = format_schema(table_schem
        job = client.load_table_from_json(json_object, table, job_config = job_config)
        job.result()
    except GoogleAPICallError: # or TimeoutError or TypeError
      return {'message': 'Unable to save sample data to Bigquery'}
    return { 'count': 42,
             'columns': ['id', 'amount']
             'message': f'Sample data is stored in {table_id}'}
```
Then, configure the samples processor in a scan builder as per the example below.
```python
# scan_builder construction
scan_builder = ScanBuilder()
scan_builder.sample_processor = BigQuerySampleProcessor()
```


## Go further

- Read more about [failed row]({% link soda-cloud/failed-rows.md %}) samples in Soda Cloud.
- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
- Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*