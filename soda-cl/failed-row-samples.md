---
layout: default
title: Manage failed row samples
description: 
parent: SodaCL reference
redirect_from:
- /soda-sql/documentation/failed-rows.html
- /soda-cloud/failed-rows.html
---

# Manage failed row samples
*Last modified on {% last_modified_at %}*

When a Soda scan results in a failed check, Soda Cloud displays details of the scan results in each check's **Check History** page. To offer more insight into the data that failed a check during a scan, you can enable Soda Cloud to display **failed rows samples** in a check's history. 

After a scan has completed, from the **Checks** dashboard, select an indivdual check to access its **Check History** page, then click the **Failed Rows Analysis** tab (pictured below) to see the failed rows samples associated with a failed check result. 

![failed-rows](/assets/images/failed-rows.png){:height="700px" width="700px"}

[About failed row samples](#about-failed-row-samples)<br />
[Set a sample limit](#set-a-sample-limit)<br />
[Collect failed row samples for specific columns](#collect-failed-row-samples-for-specific-columns)<br />
[Disable all failed row samples](#disable-all-failed-row-samples)<br />
[Disable failed row samples for individual checks](#disable-failed-row-samples-for-individual-checks)<br />
[Disable failed row samples for specific solumns](#disable-failed-row-samples-for-specific-columns)<br />
[Disable failed row samples for specific datasets](#disable-failed-row-samples-for-specific-datasets)<br />
[Reroute failed row samples](#reroute-failed-row-samples)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configure an HTTP sampler](#configure-an-http-sampler)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configure a Python custom sampler](#configure-a-python-custom-sampler)<br />
[About failed row sampling queries](#about-failed-rows-sampling-queries)<br />
[Go further](#go-further)<br />
<br />


## About failed row samples

There are two ways Soda collects and displays failed row samples in your Soda Cloud account.

* **Implicitly:** Soda automatically collects 100 failed row samples for the following checks:
    * [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
    * checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
    * checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
    * checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)

* **Explicitly:** Soda collects 100 failed row samples for the following explicitly-configured checks:
    * [failed rows check]({% link soda-cl/failed-rows-checks.md %}) 
    * the type of metric or record [reconciliation check]({% link soda-cl/recon.md %}#metric-reconciliation-checks) that borrows from failed rows check syntax


Whether you use checks to implicitly or explicitly collect and display failed row samples in Soda Cloud, you must enable sample collection in Soda Cloud.
1. As a Soda Cloud Admin, navigate to **your avatar** > **Organization Settings**.
2. Check the box to **Allow Soda to collect sample data and failed row samples for all datasets**. 
3. (Optional) *Soda Library 1.6.1 or Soda Agent 1.1.27 or greater* Check the nested box to **Allow Soda to collect sample data and failed row samples only for datasets and checks with the explicit configuration to do so** to limit both dataset sampling and implicit failed row collection to only those checks which have configured sample columns, or to datasets explicitly configured to collect failed row samples in the **Dataset Settings**. This setting does not apply to [failed row checks]({% link soda-cl/failed-rows-checks.md %}). See: [Collect failed row samples for specific columns](#collect-failed-row-samples-for-specific-columns).
4. **Save** the settings.

Beyond the default behaviour of collecting and sending 100 failed row samples to Soda Cloud when a check fails, you can:
* customize the sample size
* customize columns from which to collect samples
* disable failed row collection
* reroute failed row samples to a non-Soda Cloud destination, such as an S3 bucket. 

Read on!


## Set a sample limit

<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Library</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Available in a no-code check</small>

By default, Soda collects 100 failed row samples. You can limit the number of sample rows that Soda sends using the `samples limit` key:value pair configuration, as in the following failed row check example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      fail condition: total_children = '2' and number_cars_owned >= 3
      samples limit: 50
```

<br />

By default, the maximum number of failed row samples that Soda collects does not exceed 1000. If you wish to collect a larger volume of failed row checks, you can set the limit to a larger number. Be aware, however, that collecting large volumes of failed row samples comes with the compute cost that requires enough memory for Soda Library or a Soda Agent to process the request; see: [About failed row sampling queries](#about-failed-rows-sampling-queries).
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 99999
```

<br />

If you wish to set a limit on the samples that Soda collects for an entire data source, you can do so by adjusting the configuration YAML file, or editing the **Data Source** connection details in Soda Cloud, as per the following syntax.
{% include code-header.html %}
```yaml
data_source soda_test:
  type: postgres
  host: xyz.xya.com
  port: 5432
  ...
  sampler:
    samples_limit: 99
```

<br />

## Collect failed row samples for specific columns

Use a `samples columns` configuration to an individual check to specify the columns for which Soda *implicitly* collects failed row sample values. The configurations and settings described below correspond with the optional Soda Cloud setting in **Organization Settings** which limits failed row sample collection to only those checks which implicitly collect failed row samples and which include the `samples columns` configuration, or to datasets explicitly configured to collect failed row samples in the **Dataset Settings**.. See [About failed row samples](#about-failed-row-samples).

At the check level, Soda only collects the check's failed row samples for the columns you specify in the list, as in the `duplicate_count` example below. The comma-separated list of samples columns supports wildcard characters (`%` or `*`). This configuration applies only to checks defined in an agreement or in a checks YAML file.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - duplicate_count(email_address) < 50:
      samples columns: [last_name, first_name]
```

<br />

Alternatively, you can specify the columns from which Soda must draw failed row samples using a dataset-level configuration, as in the following example. This configuration applies only to checks defined in an agreement or in a checks YAML file.
{% include code-header.html %}
```yaml
configurations for dim_product:
    samples columns: [product_line]
  
checks for dim_product:
  - duplicate_count(product_line) = 0
  - missing_percent(standard_cost) < 3%
```

<br />

Alternatively, you can adjust a dataset's settings in Soda Cloud so that it collects failed row samples only for specific columns. The setting applies to checks defined as no-code checks, in an agreement, or in a checks YAML file.
1. As an Admin, Manager, or Editor of a dataset, log in to Soda Cloud, then navigate to the **Dataset** for which you never want Soda to collect failed row samples.
2. Click the stacked dots at the upper-right, then select **Edit Dataset**.
3. In the **Failed Rows** tab, use the dropdown to select **Specific Columns**, futher selecting the columns from which to gather failed row samples. <br />
![dataset-settings](/assets/images/dataset-settings.png){:height="450px" width="450px"}
4. **Save** your settings.

<br />


## Disable all failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send any failed row samples from your data source to Soda Cloud, whatsoever. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

<br />

## Disable failed row samples for individual checks

<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Library</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Available in a no-code check</small>

If you wish to prevent Soda from collecting and sending failed row samples to Soda Cloud for an individual check, you can set the `samples limit` to `0`. Alternatively, you can disable all samples for all your data; see [Disable samples in Soda Cloud]({% link soda-cl/sample-datasets.md %}#disable-samples-in-soda-cloud).

This configuration applies only to checks defined in an agreement or in a checks YAML file.

{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 0
```

<br />


## Disable failed row samples for specific columns

For checks which *implicitly* or *explicitly* collect failed rows samples, you can add a configuration to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. For example, you may wish to exclude a column that contains personal identifiable information (PII) such as credit card numbers from the Soda query that collects samples.

To do so, add the `sampler` configuration to your data source connection configuration to specify the columns you wish to exclude, as per the following examples. This configuration applies to checks defined as no-code checks, in an agreement, or in a checks YAML file.

Note that the dataset names and the lists of samples columns support wildcard characters (`%` or `*`).

{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: postgres
  host: localhost
  port: '5432'
  username: ***
  password: ***
  database: postgres
  schema: public
  sampler:
    exclude_columns:
      dataset_sales:
        - commission_percent
        - salary
      customer_%:
        - birthdate
        - credit%
```
OR
{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: postgres
  ...
  sampler:
    exclude_columns:
      dataset_sales: [commission_percent, salary]
      customer_%: [birthdate, credit%]
```
<br />


## Disable failed row samples for specific datasets

For checks which *implicitly* or *explicitly* collect failed rows samples, you can add a configuration to prevent Soda from collecting failed rows samples from specific datasets that contain sensitive data. To do so, add the `sampler` configuration to your data source connection configuration to specify exclusion of *all* the columns in datasets you list, as per the following example. The setting applies to checks defined as no-code checks, in an agreement, or in a checks YAML file.
{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: postgres
  ...
  sampler:
    exclude_columns:
      customer_info: ['*']
      payment_methods: ['*']
```

<br />

Optionally, you can use wildcard characters in the `sampler` configuration to design the sampling exclusion you wish.
{% include code-header.html %}
```yaml
# disable all failed rows samples on all datasets
sampler:
  exclude_columns:
    '*': ['*']

# disable failed rows samples on all columns named "password" in all datasets
sampler:
  exclude_columns:
    '*': [password]

# disable failed rows samples on the "last_name" column and all columns that begin with "pii_" from all datasets that begin with "customer_"
sampler:
  exclude_columns:
    customer_*: [last_name, pii_*]
```

<br />

Alternatively, you can adjust a dataset's settings in Soda Cloud so that it collects no failed row samples. The setting applies to checks defined as no-code checks, in an agreement, or in a checks YAML file.
1. As an Admin, Manager, or Editor of a dataset, log in to Soda Cloud, then navigate to the **Dataset** for which you never want Soda to collect failed row samples.
2. Click the stacked dots at the upper-right, then select **Edit Dataset**.
3. In the **Failed Rows** tab, use the dropdown to select **No Columns**.
4. **Save** your settings.


### Sampler configuration details

* Soda executes the `exclude_columns` values cumulatively. For example, for the following configuration, Soda excludes the columns `password`, `last_name` and any columns that begin with `pii_` from the `retail_customers` dataset.
{% include code-header.html %}
```yaml
sampler:
  exclude_columns:
    retail_*: [password]
    retail_customers: [last_name, pii_*]
```
* The `exclude_columns` configuration also applies to any custom, user-defined failed rows sampler.
* The `exclude_columns` configuration does *not* apply to [sample data collection]({% link soda-cl/sample-datasets.md %}).
* Checks in which you provide a complete SQL query, such as failed rows checks that use a `fail query`, do not honor the `exclude_column` configuration. Instead, a gatekeeper component parses all queries that Soda runs to collect samples and ensures that none of columns listed in an `exclude_column` configuration slip through when generating the sample queries. In such a case, the Soda Library CLI provides a message to indicate the gatekeeper's behavior:
```shell
Skipping samples from query 'retail_orders.last_name.failed_rows[missing_count]'. Excluded column(s) present: ['*'].
```

<br />

## Reroute failed row samples
<!--Linked to UI, access Shlink-->

If the data you are checking contains sensitive information, you may wish to send any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. 

To do so, you have two options:
1. **HTTP sampler**: Create a function, such as a lambda function, available at a specific URL within your environment that Soda can invoke for every check result in a data source that fails and includes failed row samples. Use the function to perform any necessary parsing from JSON to your desired format (CSV, Parquet, etc.) and store the failed row samples in a location of your choice.
2. **Python CustomSampler**: If you run programmatic Soda scans of your data, add a custom sampler to your Python script to collect samples of rows with a `fail` check result. Once collected, you can prints the failed row samples in the CLI, for example, or save them to an alternate destination.

| Characteristic | HTTP sampler | Python CustomSampler |
| -------------- | :----------: | :------------------: |
| Only usable with a programmatic Soda scan |  | ![done](/assets/images/done.png){:width="20px"} |
| Displays failed row sample storage location in a message in Soda Cloud | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| Can pass a DataFrame into the scan to store the failed row samples, then access failed row samples after scan completion | ![done](/assets/images/done.png){:width="20px"} | ![done](/assets/images/done.png){:width="20px"} |
| Requires corresponding configuration in the datasource connection configuration | ![done](/assets/images/done.png){:width="20px"} |  |

### Configure an HTTP sampler

Soda sends the failed rows samples as a JSON event payload and includes the following, as in the example below.
* data source name
* dataset name
* scan definition name
* check name

{% include code-header.html %}
```json
{
    "check_name": "String",
    "count": "Integer",
    "dataset": "String",
    "datasource": "String",
    "rows": [
        {
            "column1": "String|Number|Boolean",
            "column2": "String|Number|Boolean"
            ...
        }
    ],
    "schema": [
        {
            "name": "String",
            "type": "String"
        }
    ]
}
```

1. Configure an HTTP failed row sampler; see [example](#example-custom-failed-row-sampler) below.
2. In Soda Cloud, in the **Data Sources** tab, select the data source for which you wish to reroute failed rows samples, then navigate to its **Connect the Data Source** tab. If you use a `configuration.yml` file to store data source connection congifuration details, open the file.
3. To the connection configuration, add the `sampler` and `storage` configuration as outlined below, then save.
  ```yaml
  data_source my_datasource_name:
    type: postgres
    host: localhost
    port: '5432'
    username: ***
    password: ***
    database: postgres
    schema: public
    sampler:
      storage:
        type: http
        url: http://failedrows.example.com
        message: Failed rows have been sent to
        link: https://www.example-S3.url
        link_text: S3
  ```

| Parameter  | Value      | Description |
| ---------- | ---------- | ----------- |
| `type`     | `http`     | Provide an HTTP endpoint such as a Lambda function, or a custom Python HTTP service. |
| `url`      |  any URL   | Provide a valid URL that accepts JSON payloads.|
| `message ` | any string | (Optional) Provide a customized message that Soda Cloud displays in the failed rows tab, prepended to the sampler response, to instruct your fellow Soda Cloud users how to find where the failed rows samples are stored in your environment. <br />For example, if you wish the complete message to read: "Failed rows have been sent to dir/file.json", configure the syntax as in the example above and return the file location path in the sampler's response.|
| `link`     | any URL    | (Optional) Provide a link to a web application through which users can access the stored sample. |
| `link_text`| any string | (Optional) Provide text for the `link` button. For example, "View Failed Samples".|

<br />

#### Example: HTTP failed row sampler

The following is an example of a custom failed row sampler that gets the failed rows from the Soda event object (JSON payload, see example below) and prints the failed rows in CSV format. 

Borrow from this example to create your own custom sampler that you can use to reroute failed row samples.

{% include code-header.html %}
```python
import csv
import io

# Function to put failed row samples in a AWS Lambda function / Azure function / Google Cloud function
def lambda_handler(event):
    check_name = event['check_name']
    count = event['count']
    dataset = event['dataset']
    datasource = event['datasource']
    rows = event['rows']
    schema = event['schema']

    csv_buffer = io.StringIO()

    # Write data to CSV buffer
    csv_writer = csv.writer(csv_buffer)

    # Write row header
    header_row = [column['name'] for column in schema]
    csv_writer.writerow(header_row)

    # Write each row of data
    for row in rows:
        csv_writer.writerow(row)

    # Move to the beginning of the buffer
    csv_buffer.seek(0)

    # Read the content of the buffer
    csv_content = csv_buffer.getvalue()

    # Print the content
    print(csv_content) 
```

Example CSV output:

```shell
column_1_name,column_2_name
row_1_column_1_value,row_1_column_2_value
row_2_column_1_value,row_2_column_2_value
```

<br />


### Configure a Python custom sampler

If you are running Soda scans programmatically, you can add a custom sampler to collect samples of rows with a `fail` check result. 

💡 Copy+paste and run an [example script]({% link soda/route-failed-rows.md %}) locally to print failed row samples in the CLI scan output.

<br />

#### Example 1
The first simple example prints the failed rows samples in the CLI. If you prefer to send the output of the failed row sampler to a destination other than Soda Cloud, you can do so by customizing the sampler as above, then using the Python API to save the rows to a JSON file. Refer to Python docs for <a href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" target="_blank">Reading and writing files</a> for details.

{% include code-header.html %}
```python
from soda.scan import Scan
from soda.sampler.sampler import Sampler
from soda.sampler.sample_context import SampleContext


# Create a custom sampler by extending the Sampler class
class CustomSampler(Sampler):
    def store_sample(self, sample_context: SampleContext):
        # Retrieve the rows from the sample for a check.
        rows = sample_context.sample.get_rows()
        # Check SampleContext for more details that you can extract.
        # This example simply prints the failed row samples.
        print(sample_context.query)
        print(sample_context.sample.get_schema())
        print(rows)


if __name__ == '__main__':
    # Create Scan object.
    s = Scan()
    # Configure an instance of custom sampler.
    s.sampler = CustomSampler()

    s.set_scan_definition_name("test_scan")
    s.set_data_source_name("aa_vk")
    s.add_configuration_yaml_str(f"""
    data_source test:
      type: postgres
      schema: public
      host: localhost
      port: 5433
      username: postgres
      password: secret
      database: postgres
    """)

    s.add_sodacl_yaml_str(f"""
    checks for dim_account:
        - invalid_percent(account_type) = 0:
            valid format: email

    """)
    s.execute()
    print(s.get_logs_text())
```

#### Example 2

This second example uses a `scan context` to read data from, or write data to a scan. This enables users to build some data structure in the custom sampler, then use it after scan execution. 

For example, you can use `scan context` to build a DataFrame that contains unique failed row samples (as opposed to standard failed row samples Soda collects per check and which can contain the same sample rows in different checks). You can also use `scan context` to pass data to a scan and make it available during execution so as to provide additional context that helps to build a meaningful results using filters, for example.

```python
from soda.scan import Scan
from soda.sampler.sampler import Sampler
from soda.sampler.sample_context import SampleContext
import pandas as pd


class CustomSampler(Sampler):
    def store_sample(self, sample_context: SampleContext):
        # Read data from scan context and use it in the sampler.
        # This example uses a list of unique ids from the scan context to filter the failed row sample DataFrame by ID.
        unique_ids = sample_context.scan_context_get("unique_ids")

        rows = sample_context.sample.get_rows()

        filtered_rows = [row for row in rows if row[0] in unique_ids]

        columns = [col.name for col in sample_context.sample.get_schema().columns]

        df = pd.DataFrame(filtered_rows, columns=columns)

        # scan_context_set takes both a string and a list of strings to set a nested value
        # This example stores the sample DataFrame in the scan_context in a nested dictionary "samples.soda_demo.public.dim_employee.duplicate_count(gender) = 0": df
        sample_context.scan_context_set(
            [
                "samples",
                sample_context.data_source.data_source_name,
                sample_context.data_source.schema,
                sample_context.partition.table.table_name,
                sample_context.check_name,
            ],
            df,
        )


if __name__ == "__main__":
    s = Scan()
    s.sampler = CustomSampler()

    s.set_scan_definition_name("test_scan")
    s.set_verbose(True)
    s.set_data_source_name("soda_demo")

    s.scan_context_set("unique_ids", [1, 2, 3, 4, 5])

    s.add_configuration_yaml_str(
        f"""
    data_source soda_demo:
        type: postgres
        schema: public
        host: localhost
        username: ******
        password: ******
        database: postgres
    """
    )

    s.add_sodacl_yaml_str(
        f"""
    checks for dim_employee:
        - missing_count(status) = 0
        - failed rows:
            fail condition: employee_key = 1
        # The following check does not collect failed rows samples; it does not invoke the CustomSampler.
        - duplicate_count(gender) = 0:
            samples limit: 0
    """
    )
    s.execute()

    # DataFrames created in CustomSampler are available in the scan context.
    print(s.scan_context["samples"])
    # Prints:
    # {
    #     'soda_demo': {
    #         'public': {
    #             'dim_employee': {
    #                 'missing_count(status) = 0': [df]
    #                 'failed rows': [df]

    #             }
    #         }
    #     }
    # }

    # This simple example collects all queries that end with ".failing_sql", which you can use to execute failed rows queries manually.
    failed_rows_queries = [
        query["sql"] for query in s.scan_results["queries"] if query["name"].endswith(".failing_sql")
    ]
    print(failed_rows_queries)
    # Prints two queries:
    # [
    #     'SELECT * FROM public.dim_employee \n WHERE (status IS NULL)',
    #     '\nWITH frequencies AS (\n    SELECT gender\n    FROM public.dim_employee\n    WHERE gender IS NOT NULL\n    GROUP BY gender\n    HAVING COUNT(*) > 1)\nSELECT main.*\nFROM public.dim_employee main\nJOIN frequencies ON main.gender = frequencies.gender\n'
    # ]
```



## About failed rows sampling queries

For the most part, when you exclude a column from failed rows sampling, Soda does not include the column in its query to collect samples. In other words, it does not collect the samples *then* prevent them from sending to Soda Cloud, Soda does not query the column for samples, period. (There are some edge cases in which this is not the case and for those instances, a gatekeeper component ensures that no excluded columns are included in failed rows samples.)

As an example, imagine a check that looks for NULL values in a column that you included in your `exclude_columns` configuration. (A missing metric in a check implicitly collects failed rows samples.)
```yaml
checks for retail_orders:
  - missing_count(cat) = 0
```

If the `cat` column were *not* an excluded column, Soda would generate two queries:
* a query that executes the check
* another query to collect failed rows samples for checks that failed

```shell
SELECT * FROM dev_m1n0.sodatest_customers_6c2f3574
 WHERE cat IS NULL

Query soda_test.cat.failed_rows[missing_count]:
SELECT * FROM dev_m1n0.sodatest_customers_6c2f3574
 WHERE cat IS NULL
```

But because the `cat` column is excluded, Soda must generate three queries:
* a query that executes the check
* a query to gather the schema of the dataset to identify all columns
* another query to collect failed rows samples for checks that failed, only on columns identified on the list returned by the preceding query

```shell
SELECT
  COUNT(CASE WHEN cat IS NULL THEN 1 END)
FROM sodatest_customers

Query soda_test.get_table_columns_sodatest_customers:
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE lower(table_name) = 'sodatest_customers'
  AND lower(table_catalog) = 'soda'
  AND lower(table_schema) = 'dev_1'
ORDER BY ORDINAL_POSITION

Skipping columns ['cat'] from table 'sodatest_customers' when selecting all columns data.

Query soda_test.cat.failed_rows[missing_count]:
SELECT id, cst_size, cst_size_txt, distance, pct, country, zip, email, date_updated, ts, ts_with_tz FROM sodatest_customers
 WHERE cat IS NULL
```

<br />

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}