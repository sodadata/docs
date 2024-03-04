---
layout: default
title: Write a data contract
description: Write a contract for data quality that stipulates the standards to which all data moving through a pipeline or workflow must adhere.
parent: Create a data contract
---

# Write a data contract
*Last modified on {% last_modified_at %}*

**Soda data contracts** is a Python library that verifies data quality standards as early and often as possible in a data pipeline so as to prevent negative downstream impact.

After completing the Soda data contracts [install requirements]({% link soda/data-contracts.md %}), use a code editor to create a new YAML file name `contracts.yml`. In the `contracts.yml` file, define the data quality standards you want to enforce for your data quality product, as in the example below.  

In general, a data contract consists of:
* an identifier for the `dataset` or view to which the contract applies
* a list of `columns` that represents the dataset's schema, each of which is identified by `name`
* a list of data quality `checks` that apply to each column
* other identifiers for metadata about the contract, such as the dataset's owner

When you programmatically run a scan, the Soda data contracts Python library verifies the contract, executing the checks contained within the contract and producing results which indicate whether the checks passed or failed.

```yaml
dataset: dim_customer

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
```


Optionally, you can use a `checks` configuration key to add SodaCL checks to the same file so that Soda executes both your defined checks, and the data contract standards as checks, during a scan of your data.

The following simple data contract example ensures that the data type of all values in the `last_name` column in the `dim_customer` dataset are `character varying`. Soda translates the contract standards into a SodaCL check. During a scan, Soda executes the SodaCL check it prepared and, if any value in that column is not character varying, the check fails indicating a breach of the data contract standard.

```yaml
dataset: dim_customer

columns: 
  - name: last_name
    data_type: character varying
```

<br />
Even simpler, you can use a data contract to enforce only the schema of a dataset, ensuring that the columns you name exist.

```yaml
dataset: dim_customer

columns: 
  - name: first_name
  - name: last_name
  - name: birthdate
```

<br />
Slightly different than most of the data quality standards is the `reference` configuration. Use a reference standard to validate that column contents match between datasets in the same data source. For example, you may wish to use a reference standard to ensure that all values in a state column are properly entered by comparing the contents to a separate dataset with ISO 3166-2 state name standards.

```yaml
dataset: dim_employee

columns:
  - name: state
    reference: 
      dataset: iso_3166-2
      column: state_code
```

Reference standards automatically collect samples of any values that breach the standard. The default number of samples that Soda collects is 100.

If you wish to limit or broaden the sample size, you can use the `samples_limit` configuration to the reference standard. 
{% include code-header.html %}
```yaml
dataset: dim_employee

columns:
  - name: state
    reference: 
      dataset: iso_3166-2
      column: state_code
      samples_limit: 20
``` 
<br />

### Configuration keys

| Top-level key	| Value | Required | YAML data type |
| ------------- | ----------- | -------- | -------------- |
| `dataset` | Specify the name of the dataset upon which you wish to enforce the contract. | Required | string |
| `columns` | Provide a list of columns that form part of the data contract. | Required | list of objects |
| `checks`  | Define SodaCL checks  that Soda executes during a scan in addition to the data contract standard you define. | Optional | list of SodaCL checks |

| Column key | Value | Required | YAML data type |
| ---------- | ----- | -------- | -------------- |
| `name` | Specify the name of a column in your dataset. | Required | string |
| `data_type` | Identify the type of data the column must contain. | Optional | string |
| `invalid_format` | Define the format of a value that Soda ought to register as invalid. <br />Only works with columns that contain data type TEXT. | Optional | See [List of valid formats]({% link soda-cl/validity-metrics.md %}#list-of-valid-formats).  |
| `invalid_regex` | Specify a regular expression to define your own custom invalid values. | Optional | regex, no forward slash delimiters |
| `invalid_values` | Specify the values that Soda ought to consider invalid. Numeric characters in a `valid values` list must be enclosed in single quotes.| Optional | values in a list |
| `not_null` | Use the value `true` to ensure that there are no NULL values in the column; use `false` to ensure that all values in a column are NULL. | Optional | boolean |
| `missing_regex` | Provide a regular expression that specifies the values that Soda out to consider as missing. | Optional | regex, no forward slash delimiters |
| `missing_values` | Provide a comma-separated list of values to specify the values that Soda ought to consider as missing. | Optional | list of strings or numbers |
| `valid_format` | Define the format of a value that Soda ought to register as valid. <br />Only works with columns that contain data type TEXT. | Optional | See [List of valid formats]({% link soda-cl/validity-metrics.md %}#list-of-valid-formats).  |
| `valid_length` | Specify a valid length for a string. <br />Only works with columns that contain data type TEXT. | Optional | integer |
| `valid_max` | Specify a maximum numerical value for valid values. | Optional | integer or float|
| `valid_max_length` | Specify a valid maximum length for a string. <br />Only works with columns that contain data type TEXT.| Optional | integer |
| `valid_min` | Specify a minimum numerical value for valid values. | Optional | integer or float |
| `valid_min_length` | Specify a valid minimum length for a string. <br />Only works with columns that contain data type TEXT. | Optional | integer |
| `valid_regex` | Specify a regular expression to define your own custom valid values. | Optional | regex, no forward slash delimiters |
| `valid_values` | Specify the values that Soda ought to consider valid. Numeric characters in a `valid values` list must be enclosed in single quotes.| Optional | values in a list |
| `unique` | Use the value `true` to ensure that all values in the column are unique; use `false` to ensure that all values in a column are the same. | Optional | boolean |
| `reference` | This contract standard ensures that values in the named column exist in a column in a different dataset in the same data source. Configure at least two required reference keys to indicate the dataset and column to which Soda ought to compare values in the named column. | Optional | object |

| Reference key | Value | Required | YAML data type |
| ------------- | ----- | -------- | -------------- |
| `dataset` | Provide the name of the dataset that contains the values which must exist in the named column to which the `reference` standard applies. | Required | string | 
| `column` | Provide the name of the column that contains the values which must exist in the named column to which the `reference` standard applies. | Required | string |
| `samples_limit` | Specify the maximum number of failed row samples that Soda collects when this standard is breached. | Optional | number |





### (Optional) Add Soda data contracts YAML code completion in Visual Studio Code

1. If you have not already done so, install the VS Code YAML extension.
2. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local drive that also contains, or will contain, your contract YAML files.
3. Add the following `yaml-language-server` details to the top of your contract YAML file.
    ```yaml
    # yaml-language-server: $schema=./contract_schema.json
    
    dataset: CUSTOMERS
    
    columns:
    
      - name: id
        data_type: VARCHAR
        checks:
          - type: duplicates_count
      ...
    ```

See also: <a href="https://dev.to/brpaz/how-to-create-your-own-auto-completion-for-json-and-yaml-files-on-vs-code-with-the-help-of-json-schema-k1i" target="_blank">How to create your own auto-completion</a>.


### (Optional) Add Soda data contracts YAML code completion in PyCharm

1. From the public soda-core repo, download the `./soda/contracts/soda_data_contract_schema_1_0_0.json` to a local drive that also contains, or will contain, your contract YAML files.
2. In your PyCharm environment, navigate to Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings.
3. Add a mapping between `*.sdc.yml` files and the schema.

See also: <a href="https://www.jetbrains.com/help/pycharm/json.html#ws_json_schema_add_custom" target="_blank">Using custom JSON schemas</a>.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}