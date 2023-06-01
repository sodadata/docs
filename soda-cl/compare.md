---
layout: default
title: Compare data using SodaCL
description: Learn how to use the Soda Checks Language to compare data across datasets in the same, or different, data sources.
parent: SodaCL
redirect_from: /soda-cl/row-count.html
---

# Compare data using SodaCL  
*Last modified on {% last_modified_at %}*

There are several ways to use SodaCL metrics and checks to compare data across datasets and data sources. The following offers some advice about how and when to use different types of checks to obtain the comparison results you need.

Have you got an idea or example of how to compare data that we haven't documented here? <a href="https://github.com/sodadata/docs/issues" target="_blank">Let us know!</a> 

[Compare data in the same data source and schema](#compare-data-in-the-same-data-source-and-schema)<br />
[Compare data in different data sources or schemas](#compare-data-in-different-data-sources-or-schemas)<br />
[Compare dates in a dataset to validate event sequence](#compare-dates-in-a-dataset-to-validate-event-sequence)<br />
<br />
<br />


## Compare data in the same data source and schema

Use a [cross check]({% link soda-cl/cross-row-checks.md %}) to conduct a row count comparison between datasets in the same data source. <br /> 
If you wish to compare datasets in different data sources, or datasets in the same data source but with different schemas, see [Compare data in different data sources or schemas](#compare-data-in-different-data-sources-or-schemas).
{% include code-header.html %}
```yaml
checks for dim_employee:
  - row_count same as dim_department_group
```

Use a [reference check]({% link soda-cl/reference.md %}) to conduct a row-by-row comparison of values in two datasets _in the same data source_ and return a result that indicates the volume and samples of mismatched rows, as in the following example which ensures that the values in each of the two names columns are identical.<br />
If you wish to compare datasets in the same data source but with different _schemas_, see [Compare data in different data sources or schemas](#compare-data-in-different-data-sources-or-schemas).
{% include code-header.html %}
```yaml
checks for dim_customers_dev:
  - values in (last_name, first_name) must exist in dim_customers_prod (last_name, first_name)
```

Alternatively, you can use a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) to customize a SQL query that compares the values of datasets.
{% include code-header.html %}
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

<br />

## Compare data in different data sources or schemas

Use a [cross check]({% link soda-cl/cross-row-checks.md %}) to conduct a simple row count comparison of datasets in two different data sources, as in the following example that compares the row counts of two datasets in different data sources. <br />
Note that each data source involved in this check has been connected to data source either in the `configuration.yml` file with Soda Core, or in the **Add Data Source** workflow in Soda Cloud.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - row_count same as dim_customer in aws_postgres_retail
```

You can use a [reference check]({% link soda-cl/reference.md %}) to compare the values of different datasets in the _same_ data source (same data source, same schema), but if the datasets are in different schemas, as might happen when you have different environments like production, staging, development, etc., then Soda considers those datasets as _different data sources_. Where that is the case, you have a couple of options.

You can use a cross check to compare the row count of datasets in the same data source, but with different schemas. First, you must add dataset + schema as a separate data source connection in your `configuration.yml`, as in the following example that uses the same connection details but provides different schemas:
{% include code-header.html %}
```yaml
data_source retail_customers_stage:
  type: postgres
  connection:
    host: location.eu-west-1.rds.amazonaws.com
    username: ${USER}
    password: ${PASS}
    database: postgres
  schema: staging

data_source retail_customers_prod:
  type: postgres
  connection:
    host: location.eu-west-1.rds.amazonaws.com
    username: ${USER}
    password: ${PASS}
    database: postgres
  schema: production
```
Then, you can define a cross check that compares values across these data sources.
{% include code-header.html %}
```yaml
checks for dim_customer:
# Check row count between datasets in different data sources
  - row_count same as retail_customers_stage in retail_customers_prod
```

Alternatively, depending on the type of data source you are using, you can use a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) to write a custom SQL query that compares contents of datasets that you define by adding the schema before the dataset name, such as `prod.retail_customers` and `staging.retail_customers`. 

The following example accesses a single Snowflake data source and compares values between the same datasets but in different databases and schemas: `prod.staging.dmds_scores` and `prod.measurement.post_scores`.
{% include code-header.html %}
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

See also: [Configure the same scan to run in multiple environments]({% link soda-library/run-a-scan.md %}#configure-the-same-scan-to-run-in-multiple-environments)


## Compare dates in a dataset to validate event sequence

You can use a **user-defined metric** to write a custom SQL query that compares date values in the same dataset. <br />
Refer to [Custom check templates]({% link soda-cl/check-templates.md %}#compare-dates-to-validate-event-sequence).



## Go further
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Read more about [Failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}