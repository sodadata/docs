---
layout: default
title: Schema checks
description: Use a SodaCL schema check to validate column presence, absence, or position in a table, or the type of data column contains.
parent: SodaCL reference
redirect_from: /soda-cloud/schema-evolution.html
---

# Schema checks 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Use a schema check to validate the presence, absence or position of columns in a dataset, or to validate the type of data column contains. 
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      name: Confirm that required columns are present
      warn:
        when required column missing: [weight_unit_measure_code, product_subcategory_key, made_up_column]
      fail:
        when required column missing:
          - product_key 
          - product_alternate_key
  - schema:
      warn:
        when forbidden column present: [credit_card]
        when wrong column type:
          standard_cost: money
      fail:
        when forbidden column present: [pii*]
        when wrong column type:
          reorder_point: smallint
  - schema:
      name: Columns out of order
      warn:
        when wrong column index:
          style: 1
      fail:
        when wrong column index:
          model_name: 22
  - schema:
      name: Any schema changes
      warn: 
        when schema changes: any
```

[Define schema checks](#define-schema-checks) <br />
[Define schema evolution checks](#define-schema-evolution-checks) <br />
[Optional check configurations](#optional-check-configurations)<br />
[List of validation keys](#list-of-validation-keys) <br />
[Expect one check result](#expect-one-check-result)<br />
[Example: Detect PII](#example-detect-pii)<br />
[Go further](#go-further)<br />
<br />


## Define schema checks
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✔️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />
<br />

In the context of [SodaCL check types]({% link soda-cl/metrics-and-checks.md %}#check-types), schema checks are unique. Schema checks always employ alert configurations -- specifying warn and/or fail alert conditions -- with **validation keys**. Refer to [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) for exhaustive alert configuration details.

The validation key:value pairs in schema checks set the conditions for a warn or a fail check result. See a [List of validation keys](#list-of-validation-keys) below. 

For example, the following check uses the `when required column missing` validation key to validate that specific columns are present in a dataset; if any of columns in the list are absent, the check result is fail.
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      fail:
        when required column missing:
          - standard_cost
          - list_price
          - weight
```

In the example above, the value for the validation key is in a nested list format, but you can use an inline list of comma-separated values inside square brackets instead. The following example yields identical check results to the example above.
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      fail:
        when required column missing: [standard_cost, list_price, weight]

```

You can define a schema check with both warn and fail alert conditions, each with multiple validation keys. Refer to [Configure multiple alerts]({% link soda-cl/optional-config.md %}#configure-multiple-alerts) for details. Be aware, however, that a single schema check only ever produces a *single check result*. See [Expect one check result](#expect-one-check-result) below for details.

The following example is a single check; Soda executes each of its validations during a scan. Note that unlike the nested list of column names in the example above, the nested key:value pairs that form the value for these validation keys are indented, but do not use a `-`.
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      warn:
        when forbidden column present: [standard_cost]
        when wrong column type:
          standard_cost: money
          weight: double precision
      fail:
        when forbidden column present: [sombrero]
        when wrong column type:
          reorder_point: smallint
```

<br />

Add a `schema_name` parameter to a schema check to address a situation in which you need to explicitly identify or override a dataset's schema in the data source.

```yaml
checks for dim_employee:
   - schema:
      schema_name: staff.pr
      name: Required columns present
      warn:
        when required column missing: [last_name, birth_date]
```

<br />

## Define schema evolution checks

{% include banner-upgrade.md %}

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✔️ &nbsp;&nbsp; Available as a no-code check with a self-hosted Soda Agent connected to any <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Soda-supported data source, except Spark, and Dask and Pandas</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</small><br />
<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with a Soda-hosted Agent connected to a BigQuery, Databricks SQL, MS SQL Server,<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL, PostgreSQL, Redshift, or Snowflake data source</small>
<br />
<br />

Rather than specifying exact parameters for column changes, you can use the `when schema changes` validation key to warn or fail when indistinct changes occur in a dataset.

Soda Cloud must have at least two measurements to yield a check result. In other words, the first time you run a scan to execute a schema evolution check, Soda returns no results because it has nothing against which to compare; the second scan that executes the check yields a check result.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - schema:
      warn:
        when schema changes: any
      fail:
        when schema changes: 
         - column delete
         - column add
         - column index change
         - column type change
```

The output in Soda Cloud displays the output of all the alert states during the scan.

![schema-results](/assets/images/schema-results.png){:height="700px" width="700px"} 

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a schema check; see [example](#example-with-check-name). |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration). | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|  | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters  ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check; see [example](#example-with-wildcards). | See note in [example](#example-with-wildcards) below. |
| ✓ | Use for each to apply schema checks to multiple datasets in one scan; see [example](#example-with-for-each-checks). | [Apply checks to multiple datasets]({% link soda-cl/optional-config.md %}#apply-checks-to-multiple-datasets) |
| ✓ | Apply a dataset filter to partition data during a scan; see [example](#example-with-dataset-filter). | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |


#### Example with check name
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      name: Confirm that required columns are present
      warn:
        when required column missing: [weight_unit_measure_code, product_subcategory_key]
```

#### Example with alert configuration
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      warn:
        when forbidden column present: [standard_cost]
```

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      warn:
        when wrong column type:
          standard_cost: "money"
```

#### Example with wildcards

You can use `*` or `%` as wildcard characters in a list of column names.  If the column name begins with a wildcard character, add single quotes as per the example below. 
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      fail:
        when forbidden column present:
          - credit_card
          - obsolete_%
          - '%SALARY%'
          - pii*
```

#### Example with for each
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_product_%
  checks:
    - schema:
       warn:
         when schema changes: any
```

#### Example with dataset filter
{% include code-header.html %}
```yaml
filter CUSTOMERS [daily]:
  where: TIMESTAMP '{ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - schema:
      fail:
        when forbidden column present:
          - credit_card
```

<br />


## List of validation keys

| Validation key | Values | 
| -------------- | ------ | 
| `when required column missing` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  
| `when forbidden column present` | one or more column names in an inline <br />list of comma-separated values, or a nested list |  
| `when wrong column type` | nested key:value pair to identify column:expected_data_type |  
| `when wrong column index` | nested key:value pair to identify <br />column:expected_position_in_dataset_index |  
| `when schema changes` | `any` as an inline value<br /> `column add` as a nested list item<br /> `column delete` as a nested list item<br /> `column index change` as a nested list item <br /> `column type change` as a nested list item | 



## Expect one check result

Be aware that a check that contains one or more alert configurations only ever yields a *single* check result; one check yields one check result. If your check triggers both a `warn` and a `fail`, the check result only displays the more severe, failed check result.

Using the following example, Soda Library, during a scan, discovers that the data in the dataset triggers both alerts, but the check result at the bottom is `Oops! 1 failures`. Nonetheless, the results in the `Scan summary` section of the CLI output still display both the warn and fail alerts as having been triggered.
{% include code-header.html %}
```yaml
checks for dim_product:
  - schema:
      name: Required columns all present
      warn:
        when required column missing: [weight_unit_measure_code, product_subcategory_key, made_up_column]
      fail:
        when required column missing: [pretend_column]
```
```shell
Soda Library 1.0.x
Soda Core 3.0.x
Scan summary:
1/1 check FAILED: 
    dim_product in adventureworks
      Required columns all present [FAILED]
        fail_missing_column_names = [pretend_column]
        warn_missing_column_names = [made_up_column]
        schema_measured = [product_key integer, product_alternate_key character varying ...]
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 7845***
```

## Example: Detect PII

To address a common use case, you may wish to use a schema check in combination with a for each configuration and wildcard characters to automatically detect columns that contain personally identifiable information (PII) in your datasets, as in the following example. 
{% include code-header.html %}
```yaml
for each dataset R:
  tables:
    # Apply the check to any dataset that begins with retail.
    - retail%
  checks:
    - schema:
        fail:
          when forbidden column present: ['*name*', '*address*', '*phone*', '*email*']
```

## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Use a [reference check]({% link soda-cl/reference.md %}) to validate matching contents between datasets.
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