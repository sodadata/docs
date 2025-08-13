---
description: >-
  Use Soda to write data contracts that set data quality standards for data
  products.
---

# Set up data contracts

{% include "../.gitbook/includes/data-contracts-are-now-avai....md" %}

Use **Soda data contracts** to set data quality standards for data products. In a programmatic Soda scan, Soda executes the standards as data quality checks.

```yaml
dataset: dim_product

owner: zaynabissa@company.com

columns:
- name: id
  data_type: VARCHAR
  checks:
  - type: duplicate_count
- name: size
  data_type: VARCHAR
  checks:
  - type: invalid_count
    valid_values: ['S', 'M', 'L']
    must_be_greater_than_or_equal: 10
- name: distance
  checks:
  - type: invalid_count
    valid_min: 0
    valid_max: 1000
- name: created
  optional: true

checks:
  - type: row_count
```

✖️    Requires Soda Core Scientific\
✔️    Experimentally supported in Soda Core 3.3.3 or greater for PostgreSQL, Snowflake, and Spark\
✖️    Supported in Soda Core CLI\
✖️    Supported in Soda Library + Soda Cloud\
✖️    Supported in Soda Cloud Agreements + Soda Agent\
✖️    Available as a no-code check

## About data contracts

Soda data contracts is a Python library that verifies data quality standards as early and often as possible in a data pipeline so as to prevent negative downstream impact.

Begin by preparing a contract in a YAML file that stipulates the quality standards to which any newly ingested or transformed data must adhere, such as schema and column data type, freshness, and missing or validity standards. Each time the pipeline accepts or produces new data, Soda executes the checks in the contract; where a check fails, it indicates that new data does not meet the contract's data quality standards and warrants investigation or quarantining.

If you consider a data pipeline as a set of components -- data transformations, and ingestions, etc. -- you can apply a data contract to verify the data interface between these components and measure data quality standards. Doing so frequently and consistently enables you to effectively break apart a dense data pipeline into manageable parts wherein data quality is verified before data moves from one component to the next. Use the same strategy of frequent verification in a CI/CD workflow to make sure that newly-committed code adheres to your stipulated data quality standards.

## Prerequisites

Soda Core 3.3.0 supports the newest, experimental version of `soda-contracts`. The new version introduces changes that may not be compatible with the previous experimental version of `soda-contracts`. To continue using the first version of `soda-contracts` without any adjustments, upgrade to Soda Core 3.2.4 for the latest in bug fixes and updates.

* Python 3.8 or greater
* Pip 21.0 or greater
* a code or text editor
* your PostgreSQL, Spark, or Snowflake data source connection credentials and details
* (optional) a local development environment in which to test data contract execution
* (optional) a git repository to store and control the versions of your data contract YAML files

## Install data contracts

Data contracts are only available for use in programmatic scans using Soda Core.\
Soda Core CLI _does not_ support data contracts.

1. Best practice dictates that you install data contracts in a virtual environment. In your command-line interface tool, create and activate a [Python virtual environment](https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments).
2. Execute the following command, replacing the package name with the install package that matches the type of data source you use to store data; see the [complete list](https://github.com/sodadata/soda-core/blob/main/docs/installation.md) of packages.

```shell
pip install soda-core-postgres
```

3. Use the following command to install `soda-core-contracts`

```shell
pip install soda-core-contracts
```

4. Validate the installation using the following command.

```shell
soda --help
```

To exit the virtual environment, use the command `deactivate`.

## Upgrade data contracts

In the virtual environment in which you originally installed `soda-core-contracts`, use the following command to ugrade to the latest version of the package.

```shell
pip install soda-core-contracts -U
```

## Go further

* Next: [Write a data contract](data-contracts-write.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
