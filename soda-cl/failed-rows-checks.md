---
layout: default
title: Failed rows checks
description: Use a SodaCL failed rows check to explicitly send sample failed rows to Soda Cloud.
parent: SodaCL reference
---

# Failed rows checks
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a failed rows check to explicitly send samples of rows that failed a check to Soda Cloud.

You can also use a failed row check to configure Soda Library to execute a CTE or SQL query against your data, or to group failed check results by one or more categories.
{% include code-header.html %}
```yaml
checks for dim_customer:
# Failed rows defined using common table expression
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
```
{% include code-header.html %}
```yaml
checks for dim_customer:
# Failed rows defined using SQL query
  - failed rows:
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```
<small>✔️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />

[Prerequisites](#prerequisites) <br />
[About failed row samples](#about-failed-row-samples) <br />
[Define failed rows checks](#define-failed-rows-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[Set a sample limit](#set-a-sample-limit)<br />
[Disable failed rows sampling for specific columns](#disable-failed-rows-sampling-for-specific-columns)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configure in Soda Cloud](#configure-in-soda-cloud)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Configure in Soda Library](#configure-in-soda-library)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Disabling options and details](#disabling-options-and-details)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[About failed rows sampling queries](#about-failed-rows-sampling-queries)<br />
[Reroute failed rows samples](#reroute-failed-rows-samples)<br />
[Configure a failed row sampler](#configure-a-failed-row-sampler)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites

* To use failed row checks to send failed rows samples to Soda Cloud, samples collection must *not* be [disabled in Soda Cloud]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples).

## About failed row samples

When a scan results in a failed check, the CLI output displays information about the check that failed and why. To offer more insight into the data that failed a check, Soda Cloud displays failed rows in a check result’s history.

There are two ways you can configure a SodaCL check to send failed row samples to your Soda Cloud account:

1. Implicitly: define a [reference check]({% link soda-cl/reference.md %}), or use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples), a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples), or a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples) in your check. Checks that use these metrics automatically send 100 failed row samples to your Soda Cloud account.
2. Explicitly: use failed rows checks to explicitly send failed rows to Soda Cloud. Read on!


## Define failed rows checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), failed row checks are user-defined. This check is limited in its syntax variation, but you can customize your expression or query as much as you like.

The example below uses <a href="https://www.essentialsql.com/introduction-common-table-expressions-ctes/" target="_blank">common table expression (CTE)</a> to define the `fail condition` that any rows in the `dim_customer` dataset must meet in order to qualify as failed rows, during a scan, get sent to Soda Cloud.

In this rather silly example, Soda sends any rows which contain the value 2 in the `total_children` column and which contain a value greater than or equal to 3 in the `number_cars_owned` column to Soda Cloud as failed row samples. The check also uses the `name` configuration key to customize a name for the check so that it displays in a more readable form in Soda Cloud; see image below.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows with CTE
      fail condition: total_children = '2' and number_cars_owned >= 3

# OR

  - failed rows:
      name: Failed rows with CTE
      fail condition: |
        total_children = '2' and number_cars_owned >= 3

```

![failed-rows-CTE](/assets/images/failed-rows-CTE.png){:height="700px" width="700px"}

<br />

If you prefer, you can use a SQL query to define what qualifies as a failed row for Soda to send to Soda Cloud, as in the following simple example. Use this cofiguration to include complete SQL queries in the Soda scan of your data.

```yaml
checks for dim_customer:
  - failed rows:
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```
![failed-rows-SQL](/assets/images/failed-rows-SQL.png){:height="700px" width="700px"}

<br />


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a failed rows check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - |
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓  | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
|   | Use for each to apply failed rows checks to multiple datasets in one scan. | - |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). <br /> *Known issue:* Dataset filters are not compatible with failed rows checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260--> | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```

#### Example with alert
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
      warn: when between 1 and 10
      fail: when > 10
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT "geography_key"
        FROM dim_customer as customer
```

#### Example with dataset filter

*Known issue:* Dataset filters are not compatible with failed rows checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260-->
{% include code-header.html %}
```yaml
filter dim_product [new]:
  where: start_date < TIMESTAMP '2015-01-01'

checks for dim_product [new]:
  - failed rows:
      name: Failed CTE with filter
      fail condition: weight < '200' and reorder_point >= 3
```

<br />


## Set a sample limit

By default, Soda sends 100 failed row samples to Soda Cloud. You can limit the number of sample rows that Soda sends using the `samples limit` configuration key:value pair, as in the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
```

If you wish to prevent Soda from collecting and sending failed row samples to Soda Cloud for an individual check, you can set the `samples limit` to `0`. Alternatively, you can disable all samples for all your data; see [Disable samples in Soda Cloud]({% link soda-cl/sample-datasets.md %}#disable-samples-in-soda-cloud).
{% include code-header.html %}
```yaml
checks for dim_customer:
  - failed rows:
      samples limit: 0
      fail condition: total_children = '2' and number_cars_owned >= 3
```

If you wish to set a limit on the samples that Soda collects for an entire data source, you can do so by adjusting the configuration YAML file, or editing the Data Source connection details in Soda Cloud, as per the following syntax.
{% include code-header.html %}
```yaml
data_source soda_test:
  type: postgres
  host: xyz.xya.com
  ...
  sampler:
    samples_limit: 99
```

Additionally, you can [Disable failed rows sampling for specific columns](#disable-failed-rows-sampling-for-specific-columns).

<br />

## Disable failed rows sampling for specific columns

For checks which implicitly or explicitly collect [failed rows samples](#about-failed-row-samples), you can add a configuration to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data.

See also:
* [Set a sample limit](#set-a-sample-limit) to `0` on an individual check to avoid collecting or sending failed row samples.
* [Set a sample limit](#set-a-sample-limit) for an entire data source.

For example, you may wish to exclude a column that contains personal identifiable information (PII) such as credit card numbers from the Soda query that collects samples.

To do so, add the `sampler` configuration to your data source connection configuration to specify the columns you wish to exclude, as per the following examples.
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
      dataset_name:
        - column_name1
        - column_name2
      dataset_name_other:
        - column_nameA
        - column_nameB
```
OR
{% include code-header.html %}
```yaml
data_source my_datasource_name:
  type: postgres
  ...
  sampler:
    exclude_columns:
      dataset_name: [column_name1, column_name2]
      dataset_name_other: [column_nameA, column_nameB]
```
<br />


#### Configure in Soda Cloud

1. As an Admin user, log in to Soda Cloud, then navigate to an existing data source: **your avatar** > **Data Sources**.
2. In the **Data Sources** tab, click to open the data source that contains the columns in the dataset that you wish to exclude from failed rows sampling, then navigate to the **Connect the Data Source** tab.
3. To the connection configuration, add the `sampler` configuration as outlined above.
4. Save the changes.

Alternatively, you can disable the failed row samples feature entirely in Soda Cloud; see [Disable failed row samples]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples) for details.

<br />

#### Configure in Soda Library

1. Open the configuration YAML file that contains the data source connection configuration for the data source that contains the dataset that contains the columns that you wish to exclude from failed rows sampling.
2. To the connection configuration, add the `sampler` configuration above to specify the columns you wish to exclude, as outlined above.
3. Save the changes to the file.


<br />

### Disabling options and details

Optionally, you can use wildcard characters `*` in the `sampler` configuration, as in the following examples.
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

# disable failed rows samples on the "last_name" column and all columns that begin with "pii_" from all datasets that begin with "soda_"
sampler:
  exclude_columns:
    soda_*: [last_name, pii_*]
```

* Soda executes the `exclude_columns` values cumulatively. For example, for the following configuration, Soda excludes the columns `password`, `last_name` and any columns that begin with `pii_` from the `retail_customers` dataset.
{% include code-header.html %}
```yaml
sampler:
  exclude_columns:
    retail_*: [password]
    retail_customers: [last_name, pii_*]
```

* The `exclude_columns` configuration also applies to any custom, user-defined failed rows sampler.

* The `exclude_columns` configuration does not apply to [sample data collection]({% link soda-cl/sample-datasets.md %}).

* Checks in which you provide a complete SQL query, such as failed rows checks that use a `fail query`, do not honor the `exclude_column` configuration. Instead, a gatekeeper component parses all queries that Soda runs to collect samples and ensures that none of columns listed in an `exclude_column` configuration slip through when generating the sample queries. In such a case, the Soda Library CLI provides a message to indicate the gatekeeper's behavior:
```shell
Skipping samples from query 'retail_orders.last_name.failed_rows[missing_count]'. Excluded column(s) present: ['*'].
```

### About failed rows sampling queries

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

## Reroute failed rows samples
<!--Linked to UI, access Shlink-->

If the data you are checking contains sensitive information, you may wish to send any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. To do so, configure a custom failed row sampler to receive the failed rows, then convert the python object/dict into JSON or whatever the format you need. Then, add the `storage` configuration to your sampler configuration to specify the columns you wish to exclude, as per the following examples.

Soda sends the failed rows samples as a JSON payload and includes:
* data source name
* dataset name
* scan definition name
* check name

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
    storage:
      type: http
      url: http://failedrows.example.com
      message: Failed rows have been sent to
      link: https://www.example.url
      link_text: S3
```

| Parameter  | Value      | Description |
| ---------- | ---------- | ----------- |
| `type`     | `http`     | Provide an HTTP endpoint such as a Lambda function, or a custom Python HTTP service. |
| `url`      |  any URL   | Provide a valid URL that accepts JSON payloads.|
| `message ` | any string | (Optional) Provide a customized message that Soda Cloud displays in the failed rows tab, prepended to the sampler response, to instruct your fellow Soda Cloud users how to find where the failed rows samples are stored in your environment. <br />For example, if you wish the complete message to read: "Failed rows have been sent to dir/file.json", configure the syntax as in the example above and return the file location path in the sampler's response.|
| `link`     | any URL    | (Optional) Provide a link to a web application through which users can access the stored sample. |
| `link_text`| any string | (Optional) Provide text for the `link` button. For example, "View Failed Samples".|

#### Configure in Soda Cloud

1. As an Admin user, log in to Soda Cloud, then navigate to an existing data source: **your avatar** > **Data Sources**.
2. In the **Data Sources** tab, click to open the data source for which you wish to reroute failed rows samples, then navigate to the **Connect the Data Source** tab.
3. To the connection configuration, add the `storage` configuration as outlined above.
4. Save the changes.

<br />

#### Configure in Soda Library

1. Open the configuration YAML file that contains the data source connection configuration for the data source for which you wish to reroute failed rows samples.
2. To the connection configuration, add the `storage` configuration to specify the columns you wish to exclude, as outlined above.
3. Save the changes to the file.

<br />


## Configure a failed row sampler

If you are running Soda scans programmatically, you can add a custom sampler to collect samples of rows with a `fail` check result. Refer to the following example that prints the failed row samples in the CLI.

💡 Copy+paste and run an [example script]({% link soda/route-failed-rows.md %}) locally to print failed row samples in the CLI scan output.

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


### Save failed row samples to alternate desination

If you prefer to send the output of the failed row sampler to a destination other than Soda Cloud, you can do so by customizing the sampler as above, then using the Python API to save the rows to a JSON file. Refer to <a href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" target="_blank">docs.python.org</a> for details.


## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Borrow user-defined check syntax to define a resuable [check template]({% link soda-cl/check-template.md %}).
* Use a [schema check]({% link soda-cl/schema.md %}) to discover missing or forbidden columns in a dataset.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
