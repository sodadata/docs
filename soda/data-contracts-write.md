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
* a list of data quality `checks` that apply to the entire dataset
* other identifiers for metadata about the contract, such as the dataset's owner

When you programmatically run a scan, the Soda data contracts Python library verifies the contract, executing the checks contained within the contract and producing results which indicate whether the checks passed or failed.

```yaml
dataset: dim_customer

owner: mahalijones@example.com

pii_category: very sensitive

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





## List of configuration keys

| Top-level key	| Value | Required 
| ------------- | ----------- | -------- | 
| `dataset` | Specify the name of the dataset upon which you wish to enforce the contract. | required | 
| `columns` | Provide a list of columns that form part of the data contract. | optional | 
| `checks`  | Define data quality checks that Soda executes against the entire dataset | optional | 

| Column key | Value | Required | 
| ---------- | ----- | -------- | 
| `name` | Specify the name of a column in your dataset. | required | 
| `data_type` | Identify the type of data the column must contain. | optional | 
| `optional` | Indicate that a column in a schema is not required. | optional |
| `checks` | Provide a list of data quality checks that Soda executes against the column. | optional | 

| Checks key | Value | Required |
| ---------- | ----- | -------- |
| `type` | several | optional |











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