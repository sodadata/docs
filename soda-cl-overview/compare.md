---
description: >-
  Learn how to use the Soda Checks Language to compare data across datasets in
  the same, or different, data sources.
---

# Compare data using SodaCL

There are several ways to use SodaCL metrics and checks to compare data across datasets and data sources. The following offers some advice about how and when to use different types of checks to obtain the comparison results you need.

> See also: [Reconciliation checks](../sodacl-reference/recon.md)

Have you got an idea or example of how to compare data that we haven't documented here? [Let us know!](https://github.com/sodadata/docs/issues)

***

## Compare data in the same data source and schema

Use a [cross check](../sodacl-reference/cross-row-checks.md) to conduct a row count comparison between datasets in the same data source.\
If you wish to compare datasets in different data sources, or datasets in the same data source but with different schemas, see [Compare data in different data sources or schemas](compare.md#compare-data-in-the-same-data-source-and-schema).

```yaml
checks for dim_employee:
  - row_count same as dim_department_group
```

Use a [reference check](../sodacl-reference/reference.md) to conduct a row-by-row comparison of values in two datasets _in the same data source_ and return a result that indicates the volume and samples of mismatched rows, as in the following example which ensures that the values in each of the two names columns are identical.\
If you wish to compare datasets in the same data source but with different _schemas_, see [Compare data in different data sources or schemas](compare.md#compare-data-in-the-same-data-source-and-schema).

```yaml
checks for dim_customers_dev:
  - values in (last_name, first_name) must exist in dim_customers_prod (last_name, first_name)
```

Alternatively, you can use a [failed rows check](../sodacl-reference/failed-rows-checks.md) to customize a SQL query that compares the values of datasets.

```yaml
- failed rows:
      name: Validate that the data is the same as retail customers
      fail query: |
                  with table_1_not_in_table_2 as (
                  select
                    *
                  from retail_customers
                  except
                  select
                    *
                  from retail_sfdc_customers
                  )
                  , table_2_not_in_table_1 as (
                  select
                    *
                  from retail_sfdc_customers
                  except
                  select
                    *
                  from retail_customers
                  )
                  select
                  'found in retail_sfdc_customers but missing in retail_customers' as directionality,
                  *
                  from table_1_not_in_table_2
                  union all
                  select
                  'found in retail_customers but missing in retail_sfdc_customers' as directionality,
                  *
                  from table_2_not_in_table_1
```

\


## Compare partitioned data in the same data source but different schemas

If you wish to compare data between datasets in different schemas, but only compare _partitioned_ data from each dataset, you can use dataset filters.

Note that not all data sources fully support the `schema.dataset` format for the dataset identifier in a check, as included in the following example. Some users have reported success using this syntax.

```yaml
filter public.employee_dimension [west]:
where: employee_region = 'West'

# Add a second filter for the dataset
filter online_sales.online_page_dimension [monthly]:
where: page_type = 'monthly'

checks for public.employee_dimension [west]:
  # Add the second filter to the check but without brackets
  - row_count same as online_sales.online_page_dimension monthly: 
```

Output:

```shell
...
DEBUG | Query vertica_local.public.employee_dimension[west].aggregation[0]:
SELECT
COUNT(*)
FROM public.employee_dimension
WHERE employee_region = 'West'
DEBUG | Query vertica_local.online_sales.online_page_dimension[monthly].aggregation[0]:
SELECT
COUNT(*)
FROM online_sales.online_page_dimension
WHERE page_type = 'monthly'
...
```

## Compare data in different data sources or schemas

Use a [cross check](../sodacl-reference/cross-row-checks.md) to conduct a simple row count comparison of datasets in two different data sources, as in the following example that compares the row counts of two datasets in different data sources.\
Note that each data source involved in this check has been connected to data source either in the `configuration.yml` file with Soda Library, or in the **Add Data Source** workflow in Soda Cloud.

```yaml
checks for dim_customer:
  - row_count same as dim_customer in aws_postgres_retail
```

You can use a [reference check](../sodacl-reference/reference.md) to compare the values of different datasets in the _same_ data source (same data source, same schema), but if the datasets are in different schemas, as might happen when you have different environments like production, staging, development, etc., then Soda considers those datasets as _different data sources_. Where that is the case, you have a couple of options.

You can use a cross check to compare the row count of datasets in the same data source, but with different schemas. First, you must add dataset + schema as a separate data source connection in your `configuration.yml`, as in the following example that uses the same connection details but provides different schemas:

```yaml
data_source retail_customers_stage:
  type: postgres
  host: location.eu-west-1.rds.amazonaws.com
  username: ${USER}
  password: ${PASS}
  database: postgres
  schema: staging

data_source retail_customers_prod:
  type: postgres
  host: location.eu-west-1.rds.amazonaws.com
  username: ${USER}
  password: ${PASS}
  database: postgres
  schema: production
```

Then, you can define a cross check that compares values across these data sources.

```yaml
checks for dim_customer:
# Check row count between datasets in different data sources
  - row_count same as retail_customers_stage in retail_customers_prod
```

Alternatively, depending on the type of data source you are using, you can use a [failed rows check](../sodacl-reference/failed-rows-checks.md) to write a custom SQL query that compares contents of datasets that you define by adding the schema before the dataset name, such as `prod.retail_customers` and `staging.retail_customers`.

The following example accesses a single Snowflake data source and compares values between the same datasets but in different databases and schemas: `prod.staging.dmds_scores` and `prod.measurement.post_scores`.

```yaml
- failed rows:
    fail query: |
                WITH src as (
              SELECT src_page_id, src_post_id
                 FROM prod.staging.dmds_scores
              ), tgt as (
              SELECT page_id, post_id, partition_date FROM prod.measurement.post_scores
              )
              SELECT src_page_id, src_post_id
                  FROM src
                  LEFT JOIN tgt
                  ON src.src_page_id = tgt.page_id AND src.src_post_id = tgt.post_id
                  WHERE (src.src_page_id IS NOT NULL AND src.src_post_id IS NOT NULL) 
                  AND (tgt.page_id IS NULL AND tgt.post_id IS NULL)
```

See also: [Configure the same scan to run in multiple environments](../run-a-scan/#configure-the-same-scan-to-run-in-multiple-environments)

## Compare dates in a dataset to validate event sequence

You can use a **user-defined metric** to write a custom SQL query that compares date values in the same dataset.\
Refer to [Custom check templates](custom-check-examples.md).

## Go further

* Read more about [Failed row samples](../run-a-scan/failed-row-samples.md) in Soda Cloud.
* Learn more about [SodaCL metrics and checks](../sodacl-reference/metrics-and-checks.md) in general.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
