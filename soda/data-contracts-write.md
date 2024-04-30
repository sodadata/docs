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

In your data pipeline, add a data contract after data has been produced or transformed so that when you programmatically run a scan via the Python API, Soda data contracts verifies the contract, executing the checks contained within the contract and producing results which indicate whether the checks passed or failed.

```yaml
dataset: dim_customer

filter_sql: |
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
- type: no_duplicate_values
  columns: ['phone', 'email']
```

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core 3.3.3 or greater</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small><br />
<br />

[Prepare a data contract](#prepare-a-data-contract)<br />
[(Optional) Add YAML code completion in VS Code](#optional-add-yaml-code-completion-in-vs-code)<br />
[(Optional) Add YAML code completion in PyCharm](#optional-add-yaml-code-completion-in-vs-code)<br />
[List of contract configuration keys](#list-of-configuration-keys)<br />
[Go further](#go-further)<br />
<br />

## Prepare a data contract

1. After completing the Soda data contracts [install requirements]({% link soda/data-contracts.md %}), use a code or text editor to create a new YAML file name `dim_customer.contract.yml`. 
2. In the `dim_customer.contract.yml` file, define the schema, or list of columns, that a data contract must verify, and any data contract checks you wish to enforce for your dataset.  At a minimum, you must include the following required parameters; refer to [List of configuration keys](#list-of-configuration-keys) below.
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
3. Optionally, you can include any of the following parameters in the file. Refer to [Data contracts check reference]({% link soda/data-contracts-checks.md %}) for a complete list of available checks.
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
4. Save the file, then reference it when you add a contract verification step to your programmatic Soda scan; see [Verify a data contract]({% link soda/data-contracts-verify.md %}). 


### Organize your data contracts

Best practice dictates that you structure your data contracts files in a way that resembles the structure of your warehouse.  
1. In your root git repository folder, create a `soda` folder.
2. In the `soda` folder, create one folder per warehouse, then add a `warehouse.yml` file in each. 
3. In each warehouse folder, create folders in each schema, then add the contract files in the schema folders.

```shell
+ soda
|  + postgres_local
|  |  + warehouse.yml
|  |  + public
|  |  |  + customers.yml
|  |  |  + suppliers.yml
|  + snowflake_sales
|  |  warehouse.yml
|  |  + RAW
|  |  |  + opportunities.yml
|  |  |  + contacts.yml
+ README.md 
```

## (Optional) Add YAML code completion in VS Code

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

## (Optional) Add YAML code completion in PyCharm

1. Choose an extension for your contract files.  For example `.contract.yml`
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local drive that also contains, or will contain, your contract YAML files.
2. In your PyCharm environment, navigate to Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings.
3. Add a mapping between the extensions you chose in step 1. For example, use `*.contract.yml` files and map to the schema file that you saved on your local file system.

See also: <a href="https://www.jetbrains.com/help/pycharm/json.html#ws_json_schema_add_custom" target="_blank">Using custom JSON schemas</a>.

<br />



## List of configuration keys

| Top-level key | Value | Required |
| ------------- | ----------- | :--------: | 
| `dataset` | Specify the name of the dataset upon which you wish to enforce the contract. | required | 
| `columns` | Provide a list of columns that form part of the data contract. | required | 
| any   | Provide a custom key-value pair to record any data contract detail you wish, such as dataset owner, department, created_at date, etc. See: [Leverage Soda YAML extensibility](#leverage-soda-yaml-extensibility)| optional |
| `filter_sql` | Write a SQL query to partition the data on which you wish to verify the data contract. <br /> Supply the value of any variables in the filter at scan time. | optional |
| `checks`  | Define data contract checks that Soda executes against the entire dataset | optional | 

| Column key | Value | Required | 
| ---------- | ----- | :--------: | 
| `name` | Specify the name of a column in your dataset. | required | 
| `data_type` | Identify the type of data the column must contain. | optional | 
| `optional` | Indicate that a column in a schema is not required. | optional |
| `checks` | Provide a list of data contract checks that Soda executes against the column. | optional | 

| Checks key | Value | Required |
| ---------- | ----- | :--------: |
| `type` | several; see [Data contract check reference]({% link soda/data-contracts-checks.md %}) | optional |

{% include contracts-threshold-keys.md %}

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
