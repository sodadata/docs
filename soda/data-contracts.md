---
layout: default
title: Create a data contract
description: Use Soda to write data contracts that set data quality standards for data products.
parent: Create data contracts
---

# Create a data contract ![experimental](/assets/images/experimental.png){:height="150px" width="150px"} 
*Last modified on {% last_modified_at %}*

Use data contract YAML-based language to set data quality standards for data products. In a programmatic scans, Soda translates contract standards into Soda Checks Language, then executes the standards as data quality checks during a scan. 
```yaml
dataset: dim_customer

columns:
  - name: id
    data_type: character varying
    unique: true
  - name: cst_size
    data_type: decimal
  - name: cst_size_txt
    valid_values: [1, 2, 3]
  - name: distance
    data_type: integer
  - name: country
    data_type: varchar
    not_null: true
    reference:
      dataset: COUNTRIES
      column: id
  - name: ts

checks: 
  - missing_count(id) = 0
```

## Install data contracts

Data contracts are only available for use in programmatic scans using Soda Core or Soda Library. <br />
Soda Core CLI and Soda Library CLI *do not* support data contracts.

1. Best practice dictates that you install data contracts in a virtual environment. In your command-line interface tool, create a virtual environment.
2. Use the following command to install `soda-core` and `soda-core-contracts`
```shell
pip install soda-core
pip install soda-core-contracts
```
3. Execute the following command, replacing the pacakge naem with the install package that matches the type of data source you use to store data.
```shell
# For Soda Library
pip install -i https://pypi.cloud.soda.io soda-postgres
# For Soda Core
pip install soda-postgres
```

| Data source | Soda Library<br />install package | Soda Core<br />install package |
| ----------- | --------------------------------- | ------------------------------ |
| Amazon Athena | `soda-athena` | `soda-core-athena` |
| Amazon Redshift | `soda-redshift` |  `soda-core-redshift` |
| Apache Spark DataFrames | `soda-spark-df` | `soda-core-spark-df` |
| Azure Synapse  | `soda-sqlserver` | `soda-core-sqlserver` |
| ClickHouse  | `soda-mysql` | `soda-core-mysql` |
| Dask and Pandas   | `soda-pandas-dask` | `soda-core-pandas-dask` |
| Databricks  | `soda-spark[databricks]` |  |
| Denodo  | `soda-denodo` | `soda-core-denodo` |
| Dremio | `soda-dremio` |  `soda-core-dremio` |
| DuckDB   | `soda-duckdb` | `soda-core-duckdb` |
| GCP Big Query | `soda-bigquery` |  `soda-core-bigquery` |
| Google CloudSQL | `soda-postgres` | `soda-core-postgres` |
| IBM DB2 | `soda-db2` | `soda-core-db2` |
| Local file | Use Dask. | Use Dask. |
| MotherDuck | `soda-duckdb` | `soda-core-duckdb` |
| MS SQL Server | `soda-sqlserver` | `soda-core-sqlserver` |
| MySQL | `soda-mysql` | `soda-core-mysql` |
| OracleDB | `soda-oracle` | `soda-core-oracle` |
| PostgreSQL | `soda-postgres` | `soda-core-postgres` |
| Presto | `soda-presto` | `soda-core-presto` |
| Snowflake | `soda-snowflake` |  `soda-core-snowflake` |
| Trino | `soda-trino` | `soda-core-trino` |
| Vertica  | `soda-vertica` | `soda-core-vertica` |


## Define a data contract

Using a code editor, create a new YAML file name `contracts.yml`. In the `contracts.yml` file, define the data quality standards you want to enforce for your data quality product. 

A data contract consists of two required top-level configuration keys for `dataset` and `columns`, one required column key for `name`, and any nummber of optional column keys to define the quality standards for your data that you wish to enforce. 

Optionally, you can use a `checks` configuration key to add SodaCL checks to the same file so that Soda executes both your defined checks, and the data contract standards as checks, during a scan of your data.

The following simple data contract example ensures that the data type of all values in the `last_name` column in the `dim_customer` dataset are `character varying`. Soda translates the contract language into a SodaCL check; see below. During a scan, Soda executes the SodaCL check it prepared and, if any value in that column is not character varying, the check fails indicating a breach of the data contract standard.

```yaml
# Data contract
dataset: dim_customer

columns: 
  - name: last_name
    data_type: character varying
```

```yaml
# Translated into SodaCL
checks for dim_customer:
    - schema
        fail:
          when wrong column type:
            last_name: character varying
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
| `reference` | This contract standard ensure that values in the named column exist in a column in a different dataset in the same data source. Configure at least two required reference keys to indicate indicate the dataset and column to which Soda ought to compare values in the named column. | Optional | object |

| Reference key | Value | Required | YAML data type |
| ------------- | ----- | -------- | -------------- |
| `dataset` | Provide the name of the dataset that contains the values which must exist in the named column to which the `reference` standard applies. | Required | string | 
| `column` | Provide the name of the column that cotains the values which must exist in the named column to which the `reference` standard applies. | Required | string |
| `samples_limit` | Specify the maximum number of failed row samples that Soda collects whem this standard is breached. | Optional | number |


## Enforce a data contract

In a programmatic scans, Soda translates data contract standards into Soda Checks Language, then executes the standards as data quality checks during a scan. To initiate the translation and scan, prepare a programmatic scan using the following example.

```python
from contracts.data_contract_translator import DataContractTranslator
from soda.scan import Scan
import logging

# Read the data contract file as a Python str
with open("dim_customer_data_contract.yml") as f:
    data_contract_yaml_str: str = f.read()

# Translate the data contract standards into SodaCL
data_contract_parser = DataContractTranslator()
sodacl_yaml_str = data_contract_parser.translate_data_contract_yaml_str(data_contract_yaml_str)

# Log or save the SodaCL checks file to help with debugging  
logging.debug(sodacl_yaml_str)

# Execute the translated SodaCL checks in a scan
scan = Scan()
scan.set_data_source_name("SALESDB")
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
scan.add_sodacl_yaml_str(sodacl_yaml_str)
scan.execute()
scan.assert_all_checks_pass()
```

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