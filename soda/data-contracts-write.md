---
layout: default
title: Write a data contract
description: Write a contract for data quality that stipulates the standards to which all data moving through a pipeline or workflow must adhere.
parent: Create a data contract
---

# Write a data contract
<br />![experimental](/assets/images/experimental.png){:height="150px" width="150px"} <br />
*Last modified on {% last_modified_at %}*

**Soda data contracts** is a Python library that uses checks to verify data. Contracts enforce data quality standards in a data pipeline so as to prevent negative downstream impact. To verify the data quality standards for a dataset, you prepare a data **contract YAML file**, which is a formal description of the data. In the data contract, you use checks to define your expectations for good-quality data. Using the Python API, you can add data contract verification ideally right after new data has been produced. 

In your data pipeline, add a data contract after data has been been produced or transformed so that when you programmatically run a scan via the Python API, Soda data contracts verifies the contract, executing the checks contained within the contract and producing results which indicate whether the checks passed or failed.

```yaml
dataset: dim_customer

sql_filter: |
  created > ${FILTER_START_TIME}

columns:
- name: last_name
  data_type: character varying
  checks:
  - type: no_missing_values
  - type: no_duplicate_values
  - type: no_invalid_values
    valid_regex: '^(?:[A-Z])$'

- name: total_children
  data_type: integer
  checks:
  - type: avg
    must_be_between: [2, 10]

- name: country_id
  checks:
  - type: invalid_percent
    valid_values_column:
      dataset: COUNTRIES
      column: id
    must_be_less_than: 5

- name: date_first_purchase
  checks:
  - type: freshness_in_hours
    must_be_less_than: 6

checks:
- type: rows_exist
- type: no_duplicate_count
  columns: ['phone', 'email']
```

[Prepare a data contract](#prepare-a-data-contract)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[(Optional) Add Soda data contracts YAML code completion in PyCharm](#optional-add-soda-data-contracts-yaml-code-completion-in-pycharm)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[(Optional) Add Soda data contracts YAML code completion in VS Code](#optional-add-soda-data-contracts-yaml-code-completion-in-visual-studio-code)<br />
[List of configuration keys](#list-of-configuration-keys)<br />
[Data contract checks](#data-contract-checks)<br />
[Go further](#go-further)<br />
<br />

## Prepare a data contract

1. After completing the Soda data contracts [install requirements]({% link soda/data-contracts.md %}), use a code or text editor to create a new YAML file name `dim_customer.contract.yml`. 
2. In the `dim_customer.contract.yml` file, define the schema, or list of columns, that a data contract must verify, and any data contract checks you wish to enforce for your dataset.  At a minimum, you must include the following required parameters; refer to [List of configuration keys](#list-of-configuration-keys) below:
    ```yaml
    # an identifier for the table or view in the SQL warehouse
    dataset: dim_customer

    # a list of columns that represents the dataset's schema, 
    # each of which is identified by the name of a column  
    # in the SQL warehouse
    columns: 
    - name: first_name
    - name: last_name
    - name: birthdate
    ```
3. Optionally, you can include any of the following parameters in the file:
    ```yaml
    dataset: dim_customer

    # a filter to verify a partition of data
    sql_filter: |
      created > ${FILTER_START_TIME}

    columns: 
    - name: first_name
      # a data_type parameter to verify the expected type of data in a column
      data_type: character varying
      # an optional parameter to indicate that a column in a schema is not required
      optional: true
    - name: last_name
      # a list of data contract checks that apply to each column, 
      # each of which is identified by a type parameter
      checks:
      - type: no_missing_values
      - type: no_duplicate_values
    - name: birthdate
    
    # a data contract check that applies to the entire dataset
    checks:
    - type: rows_exist
    ```
4. Save the file, then reference it when you add a contract verification step to your programmatic Soda scan; see [Verify a data contract]({% link soda/data-contracts-verify.md %}). 


<br />

### (Optional) Add Soda data contracts YAML code completion in Visual Studio Code

1. If you have not already done so, install the Red Hat <a href="https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml">VS Code YAML extension</a>.
   
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local folder that contains, or will contain, your contract YAML files.
3. Add the following `yaml-language-server` details to the top of your contract YAML file. You can supply a relative file path for the `$schema` which the extension determines according to the YAML file path, not from the workspace root path.
    ```yaml
    # yaml-language-server: $schema=./soda_data_contract_schema_1_0_0.json
    
    dataset: CUSTOMERS
    
    columns:
    - name: id
      data_type: VARCHAR
      checks:
      - type: duplicate_count
    ```

Alternatively, access instructions to <a href="https://dev.to/brpaz/how-to-create-your-own-auto-completion-for-json-and-yaml-files-on-vs-code-with-the-help-of-json-schema-k1i" target="_blank">create your own auto-completion</a>.


### (Optional) Add Soda data contracts YAML code completion in PyCharm

1. Choose an extension for your contract files.  For example `.contract.yml`
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local drive that also contains, or will contain, your contract YAML files.
2. In your PyCharm environment, navigate to Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings.
3. Add a mapping between the extension you chose in step 1. For example, use `*.contract.yml` files and map to the schema file that you saved on your local file system.

See also: <a href="https://www.jetbrains.com/help/pycharm/json.html#ws_json_schema_add_custom" target="_blank">Using custom JSON schemas</a>.

<br />

## List of configuration keys

| Top-level key | Value | Required |
| ------------- | ----------- | :--------: | 
| `dataset` | Specify the name of the dataset upon which you wish to enforce the contract. | required | 
| `columns` | Provide a list of columns that form part of the data contract. | required | 
| any   | Provide a custom key-value pair to record any data contract detail you wish, such as dataset owner, department, created_at date, etc. See: [Leverage Soda YAML extensibility](#leverage-soda-yaml-extensibility)| optional |
| `sql_filter` | Write a SQL query to partition the data on which you wish to verify the data contract. <br /> Supply the value of any variables in the filter at scan time. | optional |
| `checks`  | Define data contract checks that Soda executes against the entire dataset | optional | 

| Column key | Value | Required | 
| ---------- | ----- | :--------: | 
| `name` | Specify the name of a column in your dataset. | required | 
| `data_type` | Identify the type of data the column must contain. | optional | 
| `optional` | Indicate that a column in a schema is not required. | optional |
| `checks` | Provide a list of data contract checks that Soda executes against the column. | optional | 

| Checks key | Value | Required |
| ---------- | ----- | :--------: |
| `type` | several; see [Data contract checks](#data-contract-checks) | optional |

| Threshold key | Expected value | Example |
| -------------- | ------------- | ------- |
| `must_be`                          | number            | `must_be: 0`                            |
| `must_not_be`                      | number            | `must_not_be: 0`                        |
| `must_be_greater_than`             | number            | `must_be_greater_than: 100`             |
| `must_be_greater_than_or_equal_to` | number            | `must_be_greater_than_or_equal_to: 100` |
| `must_be_less_than`                | number            | `must_be_less_than: 100`                |
| `must_be_less_than_or_equal_to`    | number            | `must_be_less_than_or_equal_to: 100`    |
| `must_be_between`                  | list of 2 numbers | `must_be_between: [0, 100]`             |
| `must_be_not_between`              | list of 2 numbers | `must_be_not_between: [0, 100]`         |


#### Threshold boundaries

When you use `must_be_between` threshold keys, Soda includes the boundary values as acceptable. In the following example, a check result of `100` or `120` each passes.

```yaml
dataset: dim_customer

columns:
- name: first_name
- name: middle_name
- name: last_name

checks:
- type: row_count
  must_be_between: [100, 120]
```
<br />

When you use `must_be_between` threshold keys, Soda includes the boundary values as acceptable. In the following example, a check result of `0` or `120` each fails.

```yaml
dataset: dim_customer

columns:
- name: first_name
- name: middle_name
- name: last_name

checks:
- type: row_count
  must_be_not_between: [0, 120]
```

<br />

Use multiple thresholds to adjust the inclusion of boundary values.

```yaml
dataset: dim_customer

columns:
- name: total_children
  # check passes if values are outside the range, inclusive of 20 
  checks:
  - type: avg
    must_be_less_than: 10
    must_be_greater_than_or_equal_to: 20
- name: yearly_income
  # check passes if values are inside the range, inclusive of 100
  checks:
  - type: avg
    must_be_greater_than_or_equal_to: 100
    must_be_less_than: 200
```

<br />

## Data contract checks

What follows is reference documentation and examples of each type of data contract check. <br />
Note that data contracts checks do not follow SodaCL syntax. 

[Duplicate](#duplicate)<br />
[Freshness](#freshness)<br />
[Missing](#missing)<br />
[Row count](#row-count)<br />
[SQL aggregation](#sql-aggregation)<br />
[User-defined SQL checks](#user-defined-sql-checks)<br />
[Validity](#validity)<br />
<br />

### Duplicate

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
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

### Freshness
This check compares the maximum value in the column to the time the scan runs; the check fails if that computed value exceeds the threshold you specified in the check.

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
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

### Missing
If you *do not* use an optional column configuration key to identify the values Soda ought to consider as missing, Soda uses NULL to identify missing values. 

See also: [Combine missing and validity](#combine-missing-and-validity).

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
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


### Row count

| Type of check | Accepts <br /> threshold values | Column config <br />keys: required | Column config <br />keys: optional |
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

### SQL aggregation

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
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

### User-defined SQL checks

Use a SQL expression or SQL query check to customize your data contract check. Apply these checks at the column or dataset level.

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
|---------------- | :-------------: | ------------------------------- | --------------------------------- |
| `sql_expression`   | required  | `metric`<br /> `metric_sql_expression` | `name`  |
| `user_defined_sql`  | required  | `metric`<br /> `sql_query` | `name`  |

{% include code-header.html %}
```yaml
dataset: CUSTOMERS

columns:
- name: country
  checks:
  - type: sql_expression
    # define a name for your custom metric
    metric: us_count
    metric_sql_expression: COUNT(CASE WHEN country = 'US' THEN 1 END)
    must_be_not_between: [100, 120]

checks:
- type: user_defined_sql
  # define a name for your custom metric
  metric: count_america
  sql_query: |
      SELECT COUNT(*)
      FROM {table_name}
      WHERE country = 'US'
  must_be_between: [0, 5]
```


### Validity

| Type of check | Accepts <br /> threshold values| Column config <br />keys: required | Column config <br />keys: optional |
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

#### Valid formats

For a list of the available formats to use with the `valid_formats` column configuration key, see: [List of valid formats]({% link soda-cl/validity-metrics.md %}#list-of-valid-formats)<!-- and [Formats supported with Soda for MS SQL Server]({% link soda-cl/validity-metrics.md %}#formats-supported-with-soda-for-ms-sql-server)--> for SodaCL.

<br />

#### Validity reference

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

#### Combine missing and validity

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

## Leverage Soda YAML extensibility

Because the Soda data contract YAML is extensible, you can add your own custom configuration parameters to a data contract YAML file for other tools in your data stack to use. Soda data contracts ignores these custom keys during verification.

For example, you may wish to include a parameter to identify a dataset's owner, or to identify role-based access that another tool enforces.

{% include code-header.html %}
```yaml
dataset: dim_product

# Soda data contract verification ignores this parameter.
owner: mahalijones@example.com

# Configure parameters for other tools to use.
# Soda data contract verification ignores this parameter.
default_column_view_roles: 
- admin 
- product_mgr

# Soda data contract verification ignores this parameter.
sensitive_column_view_roles: 
- admin 

columns:
- name: discount_percent
  # Soda data contract verification ignores this parameter.
  sensitive: true
```

## Go further

* Next: [Verify a data contract]({% link soda/data-contracts-verify.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
