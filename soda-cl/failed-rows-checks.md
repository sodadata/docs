---
layout: default
title: Failed rows checks
description: Use a SodaCL failed rows check to explicitly send sample failed rows to Soda Cloud. 
parent: SodaCL
---

# Failed rows checks 
*Last modified on {% last_modified_at %}*

Use a failed rows check to explicitly send samples of rows that failed a check to Soda Cloud. 

You can also use a failed row check to configure Soda Core to execute a CTE or SQL query against your data, or to group failed check results by one or more categories.

```yaml
checks for dim_customer:
# Failed rows defined using common table expression
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
# Failed rows defined using SQL query
  - failed rows:
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```

[Prerequisites](#prerequisites) <br />
[About failed row samples](#about-failed-row-samples) <br />
[Define failed rows checks](#define-failed-rows-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[Set a sample limit](#set-a-sample-limit)<br />
[Group results by category](#group-results-by-category)<br />
[Disable failed rows sampling for specific columns](#disable-failed-rows-sampling-for-specific-columns)<br />
[Reroute failed rows samples](#reroute-failed-rows-samples)<br />
[Configure a failed row sampler](#configure-a-failed-row-sampler)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites

* To view failed rows that a failed rows check collects, you ideally have a **Soda Cloud** account. It is not necessary to view failed rows samples in Soda Cloud, but easy to view in the context of a check result. 
* To use failed row checks to send failed rows samples to Soda Cloud, samples collection must *not* be [disabled in Soda Cloud]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples).

## About failed row samples

When a scan results in a failed check, the CLI output displays information about the check that failed and why. To offer more insight into the data that failed a check, Soda Cloud displays failed rows in a check result’s history. 

There are two ways you can configure a SodaCL check to send failed row samples to your Soda Cloud account:

1. Implicitly: define a [reference check]({% link soda-cl/reference.md %}), or use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples), a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples), or a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples) in your check. Checks that use these metrics automatically send 100 failed row samples to your Soda Cloud account.
2. Explicitly: use failed rows checks to explicitly send failed rows to Soda Cloud. Read on!


## Define failed rows checks

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), failed row checks are user-defined. This check is limited in its syntax variation, but you can customize your expression or query as much as you like.

The example below uses <a href="https://www.essentialsql.com/introduction-common-table-expressions-ctes/" target="_blank">common table expression (CTE)</a> to define the `fail condition` that any rows in the `dim_customer` dataset must meet in order to qualify as failed rows, during a scan, get sent to Soda Cloud. 

In this rather silly example, Soda Core sends any rows which contain the value 2 in the `total_children` column and which contain a value greater than or equal to 3 in the `number_cars_owned` column to Soda Cloud as failed row samples. The check also uses the `name` key to customize a name for the check so that it displays in a more readable form in Soda Cloud; see image below.

```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows with CTE
      fail condition: total_children = '2' and number_cars_owned >= 3
```

![failed-rows-CTE](/assets/images/failed-rows-CTE.png){:height="700px" width="700px"}

<br />

If you prefer, you can use a SQL query to define what qualifies as a failed row for Soda Core to send to Soda Cloud, as in the following simple example.

```yaml
 
```
![failed-rows-SQL](/assets/images/failed-rows-SQL.png){:height="700px" width="700px"}

<br />


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a failed rows check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
|   | Define alert configurations to specify warn and fail alert conditions. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓  | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
|   | Use for each to apply schema checks to multiple datasets in one scan. | - |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). <br /> *Known issue:* Dataset filters are not compatible with failed rows checks which use a SQL query. With such a check, Soda does not apply the dataset filter at scan time. <!--SODA-1260--> | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with check name 

```yaml
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```

#### Example with quotes

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

By default, Soda Core sends 100 failed row samples to Soda Cloud. You can limit the number of sample rows that Soda Core using the `samples limit` configuration key:value pair, as in the following example.

```yaml
checks for dim_customer:
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
```

<br />


## Group results by category

You can use a SQL query in a failed row check to group failed check results by one or more categories. Use a SQL editor to build and test a SQL query with your data source, then add the query to a failed rows check to execute it during a Soda scan.

The following example illustrates how to build a query that identifies the countries where the average age of people is less than 25.

1. Beginning with a basic query, the output shows the data this example works with.
```sql
SELECT * FROM Customers;
```
![group-by-1](/assets/images/group-by-1.png){:height="600px" width="600px"}
2. Build a query to select groups with the relevant aggregations.
```sql
SELECT country, AVG(age) as avg_age
FROM Customers
GROUP BY country
```
![group-by-2](/assets/images/group-by-2.png){:height="600px" width="600px"}
3. Add a common table expression (CTE) to identify the "bad" group (where the average age is less than 25) from among the grouped results.
```sql
WITH groups AS (
	SELECT country, AVG(age) as avg_age
	FROM Customers
	GROUP BY country
)
SELECT * 
FROM groups
WHERE avg_age < 25
```
![group-by-3](/assets/images/group-by-3.png){:height="600px" width="600px"}
4. Now that the query yields the expected results, add the query to a failed row check, as per the following example.
```yaml
checks for dim_customers:
  - failed rows:
          name: Average age of citizens is less than 25
          fail query: |
            WITH groups AS (
	            SELECT country, AVG(age) as avg_age
	            FROM Customers
	            GROUP BY country
            )
  
            SELECT * 
            FROM groups
            WHERE avg_age < 25
```

<br />

## Disable failed rows sampling for specific columns

For checks which implicitly or explicitly collect [failed rows samples](#about-failed-row-samples), you can add a configuration to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

For example, you may wish to exclude a column that contains personal identifiable information (PII) such as credit card numbers from the Soda query that collects samples. 

To do so, add the `sampler` configuration to your data source connection configuration to specify the columns you wish to exclude, as per the following examples.

```yaml
data_source my_datasource_name: 
  type: postgres
  connection:
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

1. As an Admin user, log in to Soda Cloud, then navigate to an existing data source: **your avatar** > **Scans & Data**.
2. In the **Data Sources** tab, click to open the data source that contains the columns in the dataset that you wish to exclude from failed rows sampling, then navigate to the **Connect the Data Source** tab.
3. To the connection configuration, add the `sampler` configuration as outlined above.
4. Save the changes.

Alternatively, you can disable the failed row samples feature entirely in Soda Cloud; see [Disable failed row samples]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples) for details.

<br />

#### Configure in Soda Core

1. Open the [configuration YAML file]({% link soda-core/configuration.md %}#configuration-instructions) that contains the data source connection configuration for the data source that contains the dataset that contains the columns that you wish to exclude from failed rows sampling.
2. To the connection configuration, add the `sampler` configuration to specify the columns you wish to exclude, as outlined above.
3. Save the changes to the file.


<br />

### Disabling options and details

Optionally, you can use wildcard characters `*` in the `sampler` configuration, as in the following examples.

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
```yaml
sampler:
  exclude_columns:
    retail_*: [password]
    retail_customers: [last_name, pii_*]
```

* The `exclude_columns` configuration also applies to any custom, user-defined failed rows sampler.

* The `exclude_columns` configuration does not apply to [sample data collection]({% link soda-cl/sample-datasets.md %}).

* Checks in which you provide a complete SQL query, such as failed rows checks that use a `fail query`, do not honor the `exclude_column` configuration. Instead, a gatekeeper component parses all queries that Soda runs to collect samples and ensures that none of columns listed in an `exclude_column` configuration slip through when generating the sample queries. In such a case, the Soda Core CLI provides a message to indicate the gatekeeper's behavior:
```shell
Skipping samples from query 'retail_orders.last_name.failed_rows[missing_count]'. Excluded column(s) present: ['*'].
```

### Failed rows sampling queries

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

If the data you are checking contains sensitive information, you may wish to send any failed rows samples that Soda collects to a secure, internal location rather than Soda Cloud. To do so, add the `storage` configuration to your data source connection configuration to specify the columns you wish to exclude, as per the following examples. 

Soda sends the failed rows samples as a JSON payload.

```yaml
data_source my_datasource_name: 
  type: postgres
  connection:
    host: localhost
    port: '5432'
    username: ***
    password: ***
  database: postgres
  schema: public
  storage:
    type: http
    url: http://failedrows.example.com
    message: Failed rows have been sent to failedrows.example.com
```

| Parameter  | Value      | Description |
| ---------- | ---------- | ----------- |
| `type`     | `http`     | Provide an HTTP endpoint such as a Lambda function, or a custom Python HTTP service. |
| `url`      |  any URL   | Provide a valid URL that accepts JSON payloads. |
| `message ` | any string | (Optional) Provide a customized message that Soda Cloud displays in the failed rows tab to direct your fellow Soda Cloud users to the location where the failed rows samples are stored in your environment. |

#### Configure in Soda Cloud

1. As an Admin user, log in to Soda Cloud, then navigate to an existing data source: **your avatar** > **Scans & Data**.
2. In the **Data Sources** tab, click to open the data source for which you wish to reroute failed rows samples, then navigate to the **Connect the Data Source** tab.
3. To the connection configuration, add the `storage` configuration as outlined above.
4. Save the changes.

<br />

#### Configure in Soda Core

1. Open the [configuration YAML file]({% link soda-core/configuration.md %}#configuration-instructions) that contains the data source connection configuration for the data source for which you wish to reroute failed rows samples.
2. To the connection configuration, add the `storage` configuration to specify the columns you wish to exclude, as outlined above.
3. Save the changes to the file.

<br />


## Configure a failed row sampler

If you are running Soda scans [programmatically]({% link soda-core/programmatic.md %}), you can add a custom sampler to collect samples of rows with a `fail` check result. Refer to the following example that prints the failed row samples in the CLI.

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
      connection:
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
