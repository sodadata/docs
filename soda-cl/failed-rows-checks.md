---
layout: default
title: Failed rows checks
description: Use a SodaCL failed rows check to explicitly send sample failed rows to Soda Cloud. 
parent: SodaCL
---

# Failed rows checks 

Use a failed rows check to explicitly send samples of rows that failed a check to Soda Cloud. You can also use a failed row check to configure Soda Core to group failed check results by one or more categories.

*Requires Soda Cloud*

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
# Failed rows with GROUP BY
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

[Prerequisites](#prerequisites) <br />
[About failed row samples](#about-failed-row-samples) <br />
[Define failed rows checks](#define-failed-rows-checks) <br />
[Set a sample limit](#set-a-sample-limit)<br />
[Group results by category](#group-results-by-category)<br />
[Optional check configurations](#optional-check-configurations)<br />
[Configure a failed row sampler](#configure-a-failed-row-sampler)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites

* To use failed row checks, you must have a **Soda Cloud** account connected to Soda Core. See [Connect Soda Core to Soda Cloud]({% link soda-core/connect-core-to-cloud.md %}) for details. 
* To use failed row checks, samples collection must *not* be [disabled in Soda Cloud]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples).

## About failed row samples

When a scan results in a failed check, the CLI output displays information about the check that failed and why. To offer more insight into the data that failed a check, Soda Cloud displays failed rows in a check result’s history.

There are two ways you can configure a SodaCL check to send failed row samples to your Soda Cloud account:

1. Use a [reference check]({% link soda-cl/reference.md %}), [duplicate_count or duplicate_percent metrics]({% link soda-cl/numeric-metrics.md %}#failed-row-samples), a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples), or a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples) in your check. Checks that use these metrics automatically send 100 failed row samples to your Soda Cloud account.
2. Use failed rows checks in your to explicitly send failed rows to Soda Cloud. Read on!

For security, you can also disable the failed row samples feature entirely; see [Disable failed row samples]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples) for details.


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
checks for dim_customer:
  - failed rows:
      name: Failed rows query test
      fail query: |
        SELECT DISTINCT geography_key
        FROM dim_customer as customer
```
![failed-rows-SQL](/assets/images/failed-rows-SQL.png){:height="700px" width="700px"}

<br />

### Set a sample limit

By default, Soda Core sends 100 failed row samples to Soda Cloud. You can limit the number of sample rows that Soda Core using the `samples limit` configuration key:value pair, as in the following example.

```yaml
checks for dim_customer:
  - failed rows:
      samples limit: 50
      fail condition: total_children = '2' and number_cars_owned >= 3
```

<br />

### Group results by category

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

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a failed rows check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
|   | Define alert configurations to specify warn and fail alert conditions. | - |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓  | Use wildcard characters in the value in the check. | Use wildcard values as you would with CTE or SQL. |
|   | Use for each to apply schema checks to multiple datasets in one scan. | - |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

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

```yaml
coming soon
```

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
