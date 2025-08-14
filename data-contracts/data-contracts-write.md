---
description: >-
  Write a contract for data quality that stipulates the standards to which all
  data moving through a pipeline or workflow must adhere.
---

# Write a data contract

{% include "../.gitbook/includes/data-contracts-are-now-avai....md" %}

**Soda data contracts** is a Python library that uses checks to verify data. Contracts enforce data quality standards in a data pipeline so as to prevent negative downstream impact. To verify the data quality standards for a dataset, you prepare a data **contract YAML file**, which is a formal description of the data. In the data contract, you use checks to define your expectations for good-quality data. Using the Python API, you can add data contract verification ideally right after new data has been produced.

Be aware, Soda data contracts checks do not use SodaCL.

In your data pipeline, add a data contract after data has been produced or transformed so that when you programmatically run a scan via the Python API, Soda data contracts verifies the contract, executing the checks contained within the contract and producing results which indicate whether the checks passed or failed.

```yaml
dataset: dim_customer

filter_sql: |
  created > ${FILTER_START_TIME}

owner: zaynabissa@company.com

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
- type: no_duplicate_values
  columns: ['phone', 'email']
```

✖️    Requires Soda Core Scientific\
✔️    Experimentally supported in Soda Core 3.3.3 or greater for PostgreSQL, Snowflake, and Spark\
✖️    Supported in Soda Core CLI\
✖️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check\
\


## Prepare a data contract

1. After completing the Soda data contracts [install requirements](./), use a code or text editor to create a new YAML file name `dim_customer.contract.yml`.
2.  In the `dim_customer.contract.yml` file, define the schema, or list of columns, that a data contract must verify, and any data contract checks you wish to enforce for your dataset. At a minimum, you must include the following required parameters; refer to [List of configuration keys](data-contracts-write.md#list-of-configuration-keys) below.

    ```yaml
     # an identifier for the table or view in the SQL data source
     dataset: dim_customer

     # a list of columns that represents the dataset's schema, 
     # each of which is identified by the name of a column  
     # in the SQL data source
     columns: 
     - name: first_name
     - name: last_name
     - name: birthdate
    ```
3.  Optionally, you can include any of the following parameters in the file. Refer to [Data contracts check reference](data-contracts-checks.md) for a complete list of available checks.

    ```yaml
     dataset: dim_customer

     # a filter to verify a partition of data
     filter_sql: |
       created > ${FILTER_START_TIME}

     columns: 
     - name: first_name
       # an optional parameter to verify the expected type of data in a column
       data_type: character varying
       # an optional parameter to indicate that a column in a schema is not required
       optional: true
     - name: last_name
       # a list of data contract checks that apply to the column, 
       # each of which is identified by a type parameter
       checks:
       - type: no_missing_values
       - type: no_duplicate_values
     - name: birthdate
        
     # a data contract check that applies to the entire dataset
     checks:
     - type: rows_exist
    ```
4. Save the file, then reference it when you add a contract verification step to your programmatic Soda scan; see [Verify a data contract](data-contracts-verify.md).

### Organize your data contracts

Best practice dictates that you structure your data contracts files in a way that resembles the structure of your data source.

1. In your root git repository folder, create a `soda` folder.
2. In the `soda` folder, create one folder per data source, then add a `data source.yml` file in each.
3. In each data source folder, create folders in each schema, then add the contract files in the schema folders.

```shell
+ soda
|  + postgres_local
|  |  + data_source.yml
|  |  + public
|  |  |  + customers.yml
|  |  |  + suppliers.yml
|  + snowflake_sales
|  |  data_source.yml
|  |  + RAW
|  |  |  + opportunities.yml
|  |  |  + contacts.yml
+ README.md 
```

## (Optional) Add YAML code completion in VS Code

1. If you have not already done so, install the Red Hat [VS Code YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local folder that contains, or will contain, your contract YAML files.
3.  Add the following `yaml-language-server` details to the top of your contract YAML file. You can supply a relative file path for the `$schema` which the extension determines according to the YAML file path, not from the workspace root path.

    ```yaml
    # yaml-language-server: $schema=./soda_data_contract_schema_1_0_0.json

    dataset: CUSTOMERS

    owner: zaynabissa@company.com

    columns:
    - name: id
      data_type: VARCHAR
      checks:
      - type: duplicate_count
    ```

Alternatively, access instructions to [create your own auto-completion](https://dev.to/brpaz/how-to-create-your-own-auto-completion-for-json-and-yaml-files-on-vs-code-with-the-help-of-json-schema-k1i).

## (Optional) Add YAML code completion in PyCharm

1. Choose an extension for your contract files. For example `.contract.yml`
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local drive that also contains, or will contain, your contract YAML files.
3. In your PyCharm environment, navigate to Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings.
4. Add a mapping between the extensions you chose in step 1. For example, use `*.contract.yml` files and map to the schema file that you saved on your local file system.

See also: [Using custom JSON schemas](https://www.jetbrains.com/help/pycharm/json.html#ws_json_schema_add_custom).

\


## List of configuration keys

| Top-level key | Value                                                                                                                                                                                                                                    | Required |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| `dataset`     | Specify the name of the dataset upon which you wish to enforce the contract.                                                                                                                                                             | required |
| `owner`       | Specify the name of the dataset owner. Soda validates owner as a YAML object. There is no logic associated with the owner key, but if `owner` is not an object, the contract verification fails.                                         | required |
| `columns`     | Provide a list of columns that form part of the data contract.                                                                                                                                                                           | required |
| any           | Provide a custom key-value pair to record any data contract detail you wish, such as dataset owner, department, created\_at date, etc. See: [Leverage Soda YAML extensibility](data-contracts-write.md#leverage-soda-yaml-extensibility) | optional |
| `filter_sql`  | <p>Write a SQL query to partition the data on which you wish to verify the data contract.<br>Supply the value of any variables in the filter at scan time.</p>                                                                           | optional |
| `checks`      | Define data contract checks that Soda executes against the entire dataset                                                                                                                                                                | optional |

| Column key  | Value                                                                         | Required |
| ----------- | ----------------------------------------------------------------------------- | :------: |
| `name`      | Specify the name of a column in your dataset.                                 | required |
| `data_type` | Identify the type of data the column must contain.                            | optional |
| `optional`  | Indicate that a column in a schema is not required.                           | optional |
| `checks`    | Provide a list of data contract checks that Soda executes against the column. | optional |

| Checks key | Value                                                                  | Required |
| ---------- | ---------------------------------------------------------------------- | :------: |
| `type`     | several; see [Data contract check reference](data-contracts-checks.md) | optional |

\


| Threshold key                      | Expected value    | Example                                 |
| ---------------------------------- | ----------------- | --------------------------------------- |
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

\


When you use `must_be_not_between` threshold keys, Soda includes the boundary values as not acceptable. In the following example, a check result of `0` or `120` each fails.

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

\


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

\


## Leverage Soda YAML extensibility

Because the Soda data contract YAML is extensible, you can add your own custom configuration parameters to a data contract YAML file for other tools in your data stack to use. Soda data contracts ignores these custom keys during verification.

For example, you may wish to include a parameter to identify a dataset's owner, or to identify role-based access that another tool enforces.

```yaml
dataset: dim_product

owner: zaynabissa@company.com

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

* Next: [Verify a data contract](data-contracts-verify.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
