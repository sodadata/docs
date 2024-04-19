---
layout: default
title: Verify a data contract
description: Use a Python API to verify data contract checks programmatically with Soda.
parent: Create a data contract
---

# Verify a data contract
<br />![experimental](/assets/images/experimental.png){:height="150px" width="150px"} <br />
*Last modified on {% last_modified_at %}*

To verify a **Soda data contract** is to scan the data in a warehouse to execute the data contract checks you defined in a contracts YAML file. Available as a Python library, you run the scan programmatically, invoking Soda data contracts in a CI/CD workflow when you create a new pull request, or in a data pipeline after importing or transforming new data. 

When deciding when to verify a data contract, consider that contract verification works best on new data as soon as it is produced so as to limit its exposure to other systems or users who might access it. The earlier in a pipeline or workflow, the better!  Further, best practice suggests that you store batches of new data in a temporary table, verify a contract on the batches, then append the data to a larger table.

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core 3.3.2 or greater</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>

## Prerequisites
* Python 3.8 or greater
* a code or text editor
* your warehouse connection credentials and details
* a `soda-core-contracts` package and a `soda-core[package]` [installed]({% link soda/data-contracts.md %}) in a virtual environment. Refer to the list of warehouse-specific <a href="https://github.com/sodadata/soda-core/blob/main/docs/installation.md" target="_blank">Soda Core pacakges</a> available to use.
* a Soda data contracts YAML file; see [Write a data contract]({% link soda/data-contracts-write.md %})

## Verify a data contract via API
1. In your code or text editor, create a new file name `warehouse.yml` accessible from within your working directory in your virtual environment.
2. To that file, add a warehouse configuration for Soda to connect to your warehouse and access the data within it to verify the contract. The example that follows is for a PostgreSQL warehouse; See below for more [warehouse configuration](#warehouse-configurations). <br />Best practice dictates that you store sensitive credential values as environment variables using uppercase and underscores for the variables. 
    ```yaml
    name: local_postgres
    type: postgres
    connection:
      host: localhost
      database: yourdatabase
      username: ${POSTGRES_USERNAME}
      password: ${POSTGRES_PASSWORD}
    ``` 
    Alternatively, you can use a YAML string or dict to define connection details; use one of the `with_warehouse_...(...)` methods.
3. Add the following block to your Python working environment. Replace the values of the file paths with your own warehouse YAML file and contract YAML file respectively.
    ```python
    from soda.contracts.contract_verification import ContractVerification, ContractVerificationResult

    contract_verification_result: ContractVerificationResult = (
        ContractVerification.builder()
        .with_contract_yaml_file('soda/local_postgres/public/customers.yml')
        .with_warehouse_yaml_file('soda/local_postgres/warehouse.yml')
        .execute()
    )

    logging.debug(str(contract_verification_result))
    ```
4. At runtime, Soda connects with your warehouse and verifies the contract by executing the data contract checks in your file. Use `${SCHEMA}` syntax to provide any environment variable values in a contract YAML file. Soda returns results of the verification as pass or fail check results, or indicate errors if any exist; see below.

### Contract verification result

The contract verification result makes a distinction between two types of problems: 

| Output           | Meaning                                                                                                                                                                                                                                              | Action                                                            | Method            |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------------|
| Check failures   | A check failure indicates that a data contract check for a dataset resulted in a value that is outside the parameters of the thresholds you set and failed.                                                                                          | Review the data at source to determine the cause of the failure.  | `.has_failures()` |
| Execution errors | An execution error means that Soda could not evaluate one or more checks in the data contract. Incorrect inputs such as missing files, invalid files, connection issues, or invalid contract format, or query execution exceptions can cause errors. | Use the error logs to investigate the root cause of the issue.    | `.has_errors()`   |

When Soda surfaces a check failure to indicate an issue with data quality in your pipeline, or if there are execution errors indicating something goes wrong during contract verification, you may wish to stop the pipeline from further processing the data. With that use case in mind, the Soda data contracts API has two options:
* Append `.assert_ok()` at the end on the contract verification result.  That will cause a SodaException in case of check failures or execution errors.  The exception message includes a full report.
* Test for the result with `if not contract_verification_result.is_ok():`  In this case, you can use `str(contract_verification_result)` to get a report.

## Warehouse configurations

Data contracts are used to verify data stored in a warehouse. This means data can stay where it is and Soda uses 
a connection to performs queries to verify that the schema and data quality checks in the data contract pass.

Best practice dictates that you store sensitive credential values as environment variables using uppercase and 
underscores for the variables.  For example `password: ${WAREHOUSE_PASSWORD}`.  Environment variables are used 
by default and you can pass in extra variables via the API using `.with_variables({"WAREHOUSE_PASSWORD": "***"})`

If in the API, you only provide a single warehouse in the contract verification, that single warehouse will be 
for verifying the contracts.  

## Contract API with Spark

When using Spark, you have a Spark session that potentially include data frames that live in memory.  To verify 
a data contract in data frames without persisting and reloading, you can pass a spark session into the 
contract verification API.

Use `with_warehouse_spark_session` to pass your Spark session into the contract verification.

```python
spark_session: SparkSession = ...

contract_verification: ContractVerification = (
    ContractVerification.builder()
    .with_contract_yaml_str(contract_yaml_str)
    .with_warehouse_spark_session(spark_session=spark_session, warehouse_name="spark_ds")
    .execute()
)
```

## Verifying contract files without executing

When you want to verify if the syntax and semantics of a data contract are ok without actually executing the 
contract verification, use `build` instead of the `execute` method on the contract verification builder:

```python
contract_verification: ContractVerification = (
  ContractVerification.builder()
  .with_contract_yaml_file('soda/local_postgres/public/customers.yml')
  .build()
)

if contract_verification.logs.has_errors():
  logging.error(f"The contract has syntax or semantic errors: \n{contract_verification.logs}")
```

## Skipping checks

During a contract verification, checks can be skipped.  This example shows how to skip the 
schema check:

```python
contract_verification: ContractVerification = (
    ContractVerification.builder()
    .with_warehouse_yaml_file('soda/local_postgres/warehouse.yml')
    .with_contract_yaml_file('soda/local_postgres/public/customers.yml')
    .build()
)

contract = contract_verification.contracts[0]
for check in contract.checks:
    if check.type != "schema":
        check.skip = True

contract_verification_result: ContractVerificationResult = contract_verification.execute()
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
