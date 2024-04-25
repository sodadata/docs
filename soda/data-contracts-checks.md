---
layout: default
title: Data contract check reference
description: Soda data contract checks enable you to verify data quality early in your data pipeline. You define data contract checks in a contracts YAML file.
parent: Create a data contract
---

# Data contract check reference
<br />![experimental](/assets/images/experimental.png){:height="150px" width="150px"} <br />
*Last modified on {% last_modified_at %}*

Soda data contracts is a Python library that verifies data quality standards as early and often as possible in a data pipeline so as to prevent negative downstream impact. Learn more [About Soda data contracts]({% link soda/data-contracts.md %}#about-data-contracts).

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core 3.3.3 or greater</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small><br />
<br />

What follows is reference documentation and examples of each type of data contract check. <br />
Note that data contracts checks do not follow SodaCL syntax. 

[Duplicate](#duplicate)<br />
[Freshness](#freshness)<br />
[Missing](#missing)<br />
[Row count](#row-count)<br />
[SQL aggregation](#sql-aggregation)<br />
[SQL metric expression](#sql-metric-expression)<br />
[SQL metric query](#sql-metric-query)<br />
[Validity](#validity)<br />
[List of threshold keys](#list-of-threshold-keys)<br />
<br />

## Duplicate

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `no_duplicate_values` | no  | - | `name`<br /> `columns`  |
| `duplicate_count`     | required | - | `name`  |
| `duplicate_percent`   | required | - | `name`  |

{% include code-header.html %}
```yaml
dataset: dim_employee

columns:
- name: id
  checks:
  - type: no_duplicate_values
- name: last_name
  checks:
  - type: duplicate_count
    must_be_less_than: 10
    name: Fewer than 10 duplicate names
- name: address_line1
  checks:
  - type: duplicate_percent
    must_be_less_than: 1

checks:
- type: no_duplicate_values
  columns: ['phone', 'email']
```

## Freshness
This check compares the maximum value in the column to the time the scan runs; the check fails if that computed value exceeds the threshold you specified in the check.

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `freshness_in_days`   | required  | - | `name`  |
| `freshness_in_hours`  | required  | - | `name`  |
| `freshness_in_minutes`| required  | - | `name`  |

{% include code-header.html %}
```yaml
dataset: dim_customer

columns:
- name: date_first_purchase
  checks:
    type: freshness_in_days
    must_be_less_than: 2
    name: New data arrived within the last 2 days
```

## Missing
If you *do not* use an optional column configuration key to identify the values Soda ought to consider as missing, Soda uses NULL to identify missing values. 

See also: [Combine missing and validity](#combine-missing-and-validity)

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | ------------------------------- | --------------------------------- |
| `no_missing_values` | no  | - | `name`<br /> `missing_values`<br /> `missing_sql_regex`<br />  |
| `missing_count`     | required | - | `name`<br /> `missing_values`<br /> `missing_sql_ regex`<br />  |
| `missing_percent`   | required | - | `name`<br /> `missing_values`<br /> `missing_sql_regex`<br />  |

{% include code-header.html %}
```yaml
dataset: dim_customer

columns: 
- name: title
  checks: 
  - type: no_missing_values 
- name: middle_name
  checks: 
  - type: missing_count
    must_be_less_than: 10
    # Soda includes 'NULL' in list of values by default
    missing_values: ['xxx', 'none', 'NA']
- name: last_name
  checks:
  - type: missing_count
    must_be_less_than: 5 
- name: first_name
  checks: 
  - type: missing_percent
    must_be_less_than: 1
    name: No whitespace entries
    # regular expression must match the dialect of your SQL engine
    missing_sql_regex: '[\s]'
```


## Row count

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys) | Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `rows_exist`    | no  | - | `name`  |
| `row_count`     | required | - | `name`  |

{% include code-header.html %}
```yaml
dataset: dim_customer

columns: 
- name: first_name
  checks: 
  - type: row_count
    must_be_between: [100, 120]
    name: Verify row count range

checks: 
- type: rows_exist
```

## SQL aggregation

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `avg`   | required  | - | `name`  |
| `sum`  | required  | - | `name`  |

{% include code-header.html %}
```yaml
dataset: dim_customer

columns:
- name: yearly_income
  checks:
  - type: avg
    must_be_between: [50000, 80000]
    name: Average salary within expected range

- name: total_children
  checks:
  - type: sum
    must_be_less_than: 10
```

<!--## SQL failed rows

TODO: It's on the roadmap to support capturing of failed rows in contracts.-->

## SQL metric expression

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `metric_expression`   | required  | - | `name`  |

Use a SQL metric expression check to monitor a custom metric that you define using a SQL expression. 

You can apply a SQL metric check to one or more columns or to an entire dataset. As Soda data contracts pushes results to Soda Cloud, it associates column checks with the column name in Soda Cloud.

Relative to a [SQL metric query](#sql-metric-query) check, a SQL metric expression check offers slightly better performance during contract verification. In the case where Soda must also compute other metrics during verification, it appends a SQL metric expression to the same query so that it only requires a single pass over the data to compute all the metrics. A SQL metric query executes independently of other queries during verification, essentially requiring a separate pass.

{% include code-header.html %}
```yaml
dataset: CUSTOMERS
columns:
  - name: id
  # SQL metric expression check for a column
  - name: country
    checks:
    - type: metric_expression
      metric: us_count
      expression_sql: COUNT(CASE WHEN country = 'US' THEN 1 END)
      must_be: 0
```


{% include code-header.html %}
```yaml
dataset: CUSTOMERS
columns:
  - name: id
  - name: country
checks:
# SQL metric expression check for a dataset
- type: metric_expression
  metric: us_count
  expression_sql: COUNT(CASE WHEN country = 'US' THEN 1 END)
  must_be: 0
```

<br />

## SQL metric query

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | :-------------------------------: | --------------------------------- |
| `metric_expression`   | required  | - | `name`  |

Use a SQL metric query check to monitor a custom metric that you define using a SQL query.

You can apply a SQL metric check to one or more columns or to an entire dataset. As Soda data contracts pushes results to Soda Cloud, it associates column checks with the column name in Soda Cloud.

{% include code-header.html %}
```yaml
dataset: CUSTOMERS
columns:
  # SQL metric query check for a column
  - name: id
    checks:
    - type: metric_query
      metric: us_count
      query_sql: |
        SELECT COUNT(*)
        FROM {table_name}
        WHERE country = 'US'
      must_be_not_between: [0, 5]
  - name: country
```

{% include code-header.html %}
```yaml
dataset: CUSTOMERS
columns:
  - name: id
checks:
  # SQL metric expression check for a dataset
  - type: metric_query
    metric: us_count
    query_sql: |
      SELECT COUNT(*)
      FROM {table_name}
      WHERE country = 'US'
    must_be_not_between: [0, 5]
```


## Validity

| Type of check | Accepts <br /> [threshold values](#list-of-threshold-keys)| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | --------------------------------- | --------------------------------- |
| `no_invalid_values` | no  | At least one of:<br /> `valid_values`<br /> `valid_format` [Valid formats](#valid-formats)<br /> `valid_sql_regex`<br /> `valid_min`<br /> `valid_max`<br /> `valid_length`<br /> `valid_min_length`<br /> `valid_max_length`<br /> `valid_values_reference_data`<br /> `invalid_values`<br /> `invalid_format`<br /> `invalid_sql_regex`| `name`  |
| `invalid_count`     | required | At least one of:<br />`valid_values`<br /> `valid_format` [Valid formats](#valid-formats)<br /> `valid_sql_regex`<br /> `valid_min`<br /> `valid_max`<br /> `valid_length`<br /> `valid_min_length`<br /> `valid_max_length`<br /> `valid_values_reference_data`<br /> `invalid_values`<br /> `invalid_format`<br /> `invalid_sql_regex` | `name`  |
| `invalid_percent`   | required | At least one of:<br />`valid_values`<br /> `valid_format` [Valid formats](#valid-formats)<br /> `valid_sql_regex`<br /> `valid_min`<br /> `valid_max`<br /> `valid_length`<br /> `valid_min_length`<br /> `valid_max_length`<br /> `valid_values_reference_data`<br /> `invalid_values`<br /> `invalid_format`<br /> `invalid_sql_regex` | `name`  |

{% include code-header.html %}
```yaml
dataset: dim_customer

columns: 
- name: first_name
  data_type: character varying
  checks: 
  - type: no_invalid_values
    valid_min_length: 2
- name: email_address
  checks: 
  - type: invalid_count
    must_be_less_than: 25
    valid_format: email
- name: id
  checks:
  - type: invalid_percent
    must_be_less_than: 5
    valid_sql_regex: '^ID.$'
    name: Less than 5% invalid
- name: total_children
  checks:
  - type: invalid_count
    # With multiple configurations, rows must meet ALL criteria
    valid_min: 0
    valid_max: 12
    must_be_less_than: 10
    name: Acceptable range of offspring count
  - name: comment
    checks:
    - type: no_invalid_values
      valid_min_length: 0
      valid_max_length: 160
```

<br />

### Valid formats

For a list of the available formats to use with the `valid_formats` column configuration key, see: [List of valid formats]({% link soda-cl/validity-metrics.md %}#list-of-valid-formats) and [Formats supported with Soda for MS SQL Server]({% link soda-cl/validity-metrics.md %}#formats-supported-with-soda-for-ms-sql-server) for SodaCL.

<br />

### Validity reference

Also known as a referential integrity or foreign key check, Soda executes a validity check with a `valid_values_reference_data` column configuration key as a separate query, relative to other validity queries. The query counts all values that exist in the named column which also *do not* exist in the column in the referenced dataset. 

The referential dataset must exist in the same warehouse as the dataset identified by the contract.

{% include code-header.html %} 
```yaml
dataset: dim_employee

columns:
- name: country
  checks:
  - type: invalid_percent
    must_be_less_than: 3
    valid_values_reference_data: 
      dataset: countryID
      column: id
```

<br />

### Combine missing and validity

You can combine column configuration keys to include both missing and validity parameters. Soda separately evaluates the parameters to prevent double-counting any rows that fail to meet the specified thresholds so that a row that fails both parameters only counts as one failed row.

```yaml
dataset: dim_product

columns:
- name: size
  checks:
  - type: no_invalid_values
    missing_values: ['N/A']
    valid_values: ['S', 'M', 'L']
```

<br />

If you add both a missing and validity check to a single column, Soda leverages the results of preceding checks when evaluating subsequent ones. 

In the example below, Soda considers any row that failed the `no_missing_values` check as one that will fail the second, `no_invalid_values` check without re-evaluating the row. 

```yaml
dataset: dim_product

columns:
- name: size
  checks:
  - type: no_missing_values
    missing_values: ['N/A']
  - type: no_invalid_values
    valid_values: ['S', 'M', 'L']
```

In the case where you have configured multiple missing checks that specify different missing values, Soda does not merge the results of the check evaluation; it only honors that last set of missing values. Not supported by `valid_values_reference_data`.

<br />

## Check filters

Most check types allow for a `filter_sql` property to be specified:

* all numeric metrics, except `duplicate_count` and `duplicate_percent`
* `no_missing_values`, `missing_count` and `missing_percent`
* `no_invalid_values`, `invalid_count` and `invalid_percent`

The filter will be applied to the check.  For example:

```yaml
dataset: dim_product

columns:
- name: country
- name: currency
  checks:
  - type: no_invalid_values
    valid_values: ['pounds']
    filter_sql: country = 'UK'
```

## List of threshold keys

{% include contracts-threshold-keys.md %}

## Go further

* Learn how to [prepare]({% link soda/data-contracts-write.md %}) a data contract.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
