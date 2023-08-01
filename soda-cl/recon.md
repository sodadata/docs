---
layout: default
title: Reconciliation check
description: Use SodaCL reconciliation checks to validate target and source data before conducting a data migration in production. 
parent: SodaCL
---

# Reconciliation check
*Last modified on {% last_modified_at %}*

Use a reconciliation check to validate that target data matches source data before migrating between data sources.<br />
*Requires Soda Library* 

For example, if you must migrate data from a MySQL data source to a Snowflake data source, you can use reconciliation checks to make sure the MySQL data appears intact in Snowflake in staging before conducting the migration in production.

{% include code-header.html %}
```yaml
reconciliation Production:
  label: "Reconcile MySQL to Snowflake"
  attributes:
     priority: 3
  datasets:
    source:
      dataset: dim_customer
      datasource: mysql_adventureworks
    target:
      dataset: dim_customer
      datasource: snowflake_retail

  checks:
    - row_count diff = 0
    
    - duplicate_count(last_name):
        fail: when diff > 10%
        warn: when diff < 5%
        
    - avg(total_children) diff < 10

    - name_combo diff = 0:
        name: Name Combo
        source query: |
          SELECT count(*)
          FROM dim_customer
          WHERE first_name = 'Rob' or last_name = 'Walters'
        target query: |
          SELECT count(*)
          FROM dim_customer
          WHERE last_name = 'Walters'
```

[Prerequisites](#prerequisites)<br />
[Define reconciliation checks](#define-reconciliation-checks) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Add attributes](#add-attributes) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[List of compatible metrics and checks](#list-of-compatible-metrics-and-checks) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Failed row samples](#failed-row-samples)<br />
[Optional check configurations](#optional-check-configurations)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites
* Python version 3.9.x or greater.
* Soda Libarary version 1.0.6 or greater; one package for each of the source and target data sources involved in your migration. See step 1, below.
* A Soda Cloud account connected to Soda Library via API keys. See 

## Define reconciliation checks

The following outlines the basic steps to configure and execute reconciliation checks.
1. [Install]({% link soda-library/install.md %}) a Soda Library package for both the migration source and target data sources. For the example above, you would install both `soda-mysql` and `soda-snowflake`.  
2. [Configure]({% link soda-library/configure.md %}) both data sources in a configuration YAML file, and add your `soda_cloud` configuration. For the example above, you would add both [MySQL]({% link soda/connect-mysql.md %}) and [Snowflake]({% link soda/connect-snowflake.md %}) connection configuration details to a configuration YAML file.
3. Prepare a **recon YAML** file, and configure the project metatdata; see details below.
4. Define reconciliation checks to compare data between data sources; see details below.
5. [Run a Soda scan]({% link soda-library/run-a-scan.md %}) against either the source or target data source to execute the reconciliation checks and review results in the command-line output and in Soda Cloud. 
{% include code-header.html %}
```shell
soda scan -d mysql_adventureworks -c configuration.yml recon.yml
```

<br />
To define reconciliation checks, best practice dictates that you prepare a **recon YAML** file separate from your checks YAML file which contains regular, non-reconciliation checks for data quality in your data source. Technically, you can use one YAML file to contain all recon and regular checks, but troubleshooting and issue investigation is easier if you use separate files.

In a recon YAML file, you must first provide metadata for the reconciliation checks, as per the configuration in the example and table below.
{% include code-header.html %}
```yaml
reconciliation Production:
  label: "Reconcile MySQL to Snowflake"
  attributes:
     priority: 3
  datasets:
    source:
      dataset: dim_customer
      datasource: mysql_adventureworks
    target:
      dataset: dim_customer
      datasource: snowflake_retail

  checks:
    - row_count diff = 0
```

| `reconciliation my_project_name` | required | An identifier for the reconciliation project. |
| `label` | required | An identifier that prepends check result name identifiers in Soda Cloud. |
| `attributes` | optional | A list of attributes that Soda applies to the reconciliation project's check results in Soda Cloud so that you can filter and find the project's results. <br />See: [Add attributes](#add-attributes) |
| `datasets` | required | A subheading to contain the list of datasets to apply your reconciliation checks. |
| `source` | required | Key-value pairs to identify the `dataset` and `data source` of the source, or origin location of the data to be migrated. Identify only one source.|
| `target` | required | Key-value pairs to identify the `dataset` and `data source` of the target, or destination location of the data to be migrated. Identify only one target.|
| `checks` | required | A subheading to contain the checks that reconcile the data between source and target. |

Use the `checks` subsection of the reconciliation project to identify all the checks that reconcile data between the source and target data sources. The syntax of the checks follows the basic patterns of the [compatible checks and metrics](#list-of-compatible-metrics-and-checks), with the addition of `diff`. 

For example, you define a regular SodaCL check for data quality that checks for duplicate values in a `last_name` column as follows:
{% include code-header.html %}
```yaml
checks for dim_customer:
  - duplicate_count(last_name) = 0
```

For a reconciliation check, you add the word `diff` to indicate that it ought to compare duplicate values between the source dataset and the target dataset to confirm that the delta between those counts is zero. Refer to several examples, below. 

Note that with reconciliation checks, there is no need to identify the dataset as you specified both source and target datasets in the project metadata configuration.
{% include code-header.html %}
```yaml
  checks:  
    - duplicate_count(last_name) diff = 0
        
    - avg(total_children) diff < 10
    
    - row_count:
        warn: when diff > 10%
        fail: when diff > 30%
    
    - missing_percent(middle_name) diff = 0
```

When you [run a scan]({% link soda-library/run-a-scan.md %}) against either the source or target data source, the `Scan summary` in the output indicates the measurement value of each metric or check for both the source and target datasets, along with the diff value and percentage, and the absolute value and percentage.  **NEED NEW OUTPUT**
```shell
Soda Library 1.0.6
Soda Core 3.0.39
By downloading and using Soda Library, you agree to Sodas Terms & Conditions (https://go.soda.io/t&c) and Privacy Policy (https://go.soda.io/privacy). 
Sending failed row samples to Soda Cloud
Sending failed row samples to Soda Cloud
Evaluation of check avg(total_children) diff < 10 failed: unsupported operand type(s) for -: 'float' and 'NoneType'
  | unsupported operand type(s) for -: 'float' and 'NoneType'
  +-> line=1,col=1 in recon3.yml
[13:07:15] Scan summary:
[13:07:15] 3/4 checks FAILED: 
[13:07:15]     dim_customer in aws_postgres_retail
[13:07:15]       Recon Janet: row_count warn when diff > 10% fail when diff > 30% [FAILED]
[13:07:15]         check_value: 100.0
[13:07:15]         source_row_count: 18484
[13:07:15]         target_row_count: 0
[13:07:15]         diff_value: 18484
[13:07:15]         diff_percentage: 100.0%
[13:07:15]         absolute_value: 18484
[13:07:15]         absolute_percentage: 100.0%
[13:07:15]       Recon Janet: duplicate_count(last_name) diff = 0 [FAILED]
[13:07:15]         check_value: 249
[13:07:15]         source_duplicate_count: 249
[13:07:15]         target_duplicate_count: 0
[13:07:15]         diff_value: 249
[13:07:15]         diff_percentage: 100.0%
[13:07:15]         absolute_value: 249
[13:07:15]         absolute_percentage: 100.0%
[13:07:15]       Recon Janet: missing_percent(middle_name) diff = 0 [FAILED]
[13:07:15]         check_value: 42.36
[13:07:15]         source_missing_percent: 42.36
[13:07:15]         target_missing_percent: 0.0
[13:07:15]         diff_value: 42.36
[13:07:15]         diff_percentage: 100.0%
[13:07:15]         absolute_value: 42.36
[13:07:15]         absolute_percentage: 100.0%
```

<br />

To customize your reconciliation checks, you can borrow from the syntax of [failed rows checks]({% link soda-cl/failed-rows-checks.md %}) to execute SQL queries on the source and target datasets. You can also write a [user-defined check]({% link soda-cl/user-defined.md %}) to define a SQL query or common table expressions (CTE) that Soda executes on both datasets to reconcile data; see examples below.
{% include code-header.html %}
```yaml
    - name_combo diff = 0:
        name: Name Combo
        source query: |
          SELECT count(*)
          FROM dim_customer
          WHERE first_name = 'Rob' or last_name = 'Walters'
        target query: |
          SELECT count(*)
          FROM dim_customer
          WHERE last_name = 'Walters'
    
    - average_children diff = 0:
        average_children expression: avg(total_children)
```

### Add attributes

Add attributes to reconciliation checks organize your checks and alert notifications in Soda Cloud. For example, you can apply attributes to checks to label and sort check results by department, priority, location, etc.

You can add custom attributes to reconciliation checks in two ways:
* in bulk, so that Soda adds the attribute to all checks in the reconciliation project
* individually, so that Soda adds the attribute to individual reconciliation checks in the project

After following the instructions to [create a check attribute]({% link soda-cl/check-attributes.md %}) in Soda Cloud, you can add the attribute to a reconciliation project, and/or to individaul checks, as in the following example.

Where attribute values for the project and the individual check conflict or overlap, Soda uses the value for the individual check.
{% include code-header.html %}
```yaml
reconciliation Production:
  label: "Reconcile MySQL to Snowflake"
  # Soda adds this attribute to each check in the reconciliation project
  attributes:
     priority: 3
  datasets:
    source:
      dataset: dim_customer
      datasource: mysql_adventureworks
    target:
      dataset: dim_customer
      datasource: snowflake_retail
  checks:
    - row_count diff = 0:
       # Soda adds this attribute to this check, only.
        attributes:
           department: [Marketing]
```

### List of compatible metrics and checks

| Metric or check | Supported data sources|
| --------------- | --------------------- |
| `avg` | all | 
| `avg_length` | all | 
| `duplicate_count` | all | 
| `duplicate_percent` | all | 
| `failed rows` | all | 
| `freshness` | all | 
| `invalid_count` |Athena <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Redshift <br /> Snowflake <br />  Spark DataFrames |
| `invalid_percent` | Athena <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Redshift <br /> Snowflake <br />  Spark DataFrames |
| `max` | all | 
| `max_length` | all | 
| `min` | all | 
| `min_length` | all | 
| `missing_count` | Athena <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Redshift <br /> Snowflake <br />Spark DataFrames |
| `missing_percent` | Athena <br /> Big Query <br /> DB2 <br /> SQL Server <br /> PostgreSQL <br /> Redshift <br /> Snowflake <br />Spark DataFrames |
| `percentile` | PostgreSQL<br />Snowflake |
| `row_count` | all | 
| `stddev` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |
| `stddev_pop` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |
| `stddev_samp` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |
| `sum` | all | 
| `user-defined` | all | 
| `variance` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |
| `var_pop` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |
| `var_samp` | Athena<br /> BigQuery<br /> PostgreSQL<br /> Redshift<br /> Snowflake |


### Failed row samples

Reconciliation checks that use the following checks and metrics *implicitly* collect samples of any failed rows to display Soda Cloud. The default number of failed row samples that Soda collects and displays is 100. 
* `duplicate_count`
* `duplicate_percent`
* `invalid_count`
* `invalid_percent`
* `missing_count`
* `missing_percent`

Recon checks that borrow from `failed rows` check syntax, such as the `name_combo` check in the example above, *explicitly* collect samples of any failed rows to display in Soda Cloud. Again, the default number of failed row samples that Soda collects and displays is 100.

Read more [About failed row samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples)

<br />
If you wish to limit or broaden the sample size, you can add the `samples limit` configuration to one of the above-listed reconciliation metrics or check.  Read more about [Setting a sample limit]({% link soda-cl/failed-rows-checks.md %}#set-a-sample-limit).
{% include code-header.html %}
```yaml
checks:  
  - duplicate_count(last_name) diff = 0:
      samples limit: 20
``` 
<br />

For security, you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

Alternatively, you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.
{% include code-header.html %}
```yaml
checks:  
  - duplicate_count(last_name) diff = 0:
      samples limit: 0
``` 
<br />

You can also use a `samples columns` configuration to a check to specify the columns for which Soda must implicitly collect failed row sample values, as in the following example. Soda only collects this check's failed row samples for the columns you specify in the list. 

Note that the list of samples columns does not support wildcard characters (%).
```yaml
checks:  
  - duplicate_count(last_name) diff = 0:
      samples columns: [last_name, first_name]
```
<br />

To review the failed rows in Soda Cloud, navigate to the **Checks** dashboard, then click the row for a reference check. Examine failed rows in the **Failed rows** tab; see [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for further details.


## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a reconciliation check. |  [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names) |
|   | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions. | [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations) |
|   | Apply an in-check filter to return results for a specific portion of the data in your dataset.| - | 
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes). <br />Note that the type of quotes you use must match that which your data source uses. For example, BigQuery uses a backtick ({% raw %}`{% endraw %}) as a quotation mark. | [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
|   | Use wildcard characters ({% raw %} % {% endraw %} or {% raw %} * {% endraw %}) in values in the check. | - |
|   | Use for each to apply reconciliation checks to multiple datasets in one scan. | - |
|   | Apply a dataset filter to partition data during a scan. | [Scan a portion of your dataset]({% link soda-cl/optional-config.md %}#scan-a-portion-of-your-dataset) |

#### Example with quotes
{% include code-header.html %}
```yaml
checks for dim_department_group:
  - values in ("department_group_name") must exist in dim_employee ("department_name")
```

<br />

## Go further

* Learn more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Learn more about [Comparing data using SodaCL]({% link soda-cl/compare.md %}).
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
