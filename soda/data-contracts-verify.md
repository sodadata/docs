---
layout: default
title: Verify a data contract
description: Use a Python API to verify data contract checks programmatically with Soda.
parent: Create a data contract
---

# Verify a data contract <br />
![experimental](/assets/images/experimental.png){:height="400px" width="400px"} <br />
*Last modified on {% last_modified_at %}*

{% include banner-experimental.md %}

To verify a **Soda data contract** is to scan the data in a data source to execute the data contract checks you defined in a contracts YAML file. Available as a Python library, you run the scan programmatically, invoking Soda data contracts in a CI/CD workflow when you create a new pull request, or in a data pipeline after importing or transforming new data. 

When deciding when to verify a data contract, consider that contract verification works best on new data as soon as it is produced so as to limit its exposure to other systems or users who might access it. The earlier in a pipeline or workflow, the better!  Further, best practice suggests that you store batches of new data in a temporary table, verify a contract on the batches, then append the data to a larger table.

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific</small><br />
<small>✔️ &nbsp;&nbsp; Experimentally supported in Soda Core 3.3.3 or greater for PostgreSQL, Snowflake, and Spark</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core CLI</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />

<small>✖️ &nbsp;&nbsp; Available as a no-code check</small><br />
<br />

[Prerequisites](#prerequisites)<br />
[Verify a data contract via API](#verify-a-data-contract-via-api)<br />
[Review contract verification results](#review-contract-verification-results)<br />
[About data source configurations](#about-data-source-configurations)<br />
[Verify data contracts with Spark](#verify-data-contracts-with-spark)<br />
[Validate data contracts](#validate-data-contracts)<br />
[Add a check identity](#add-a-check-identity)<br />
[Skip checks during contract verification](#skip-checks-during-contract-verification)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites
* Python 3.8 or greater
* a code or text editor
* your data source connection credentials and details
* a `soda-core-contracts` package and a `soda-core[package]` [installed]({% link soda/data-contracts.md %}) in a virtual environment. Refer to the list of data source-specific <a href="https://github.com/sodadata/soda-core/blob/main/docs/installation.md" target="_blank">Soda Core packages</a> available to use.
* a Soda data contracts YAML file; see [Write a data contract]({% link soda/data-contracts-write.md %})

## Verify a data contract via API
1. In your code or text editor, create a new file name `data_source.yml` accessible from within your working directory in your virtual environment.
2. To that file, add a data source configuration for Soda to connect to your data source and access the data within it to verify the contract. The example that follows is for a PostgreSQL data source; see [data source configuration](#about-data-source-configurations) for further details . <br />Best practice dictates that you store sensitive credential values as environment variables using uppercase and underscores for the variables. 
    ```yaml
    name: local_postgres
    type: postgres
    connection:
      host: localhost
      database: yourdatabase
      username: ${POSTGRES_USERNAME}
      password: ${POSTGRES_PASSWORD}
    ``` 
    Alternatively, you can use a YAML string or dict to define connection details; use one of the `with_data_source_...(...)` methods.
3. Add the following block to your Python working environment. Replace the values of the file paths with your own data source YAML file and contract YAML file respectively.
    ```python
    from soda.contracts.contract_verification import ContractVerification, ContractVerificationResult

    contract_verification_result: ContractVerificationResult = (
        ContractVerification.builder()
        .with_contract_yaml_file('soda/local_postgres/public/customers.yml')
        .with_data_source_yaml_file('soda/local_postgres/data_source.yml')
        .execute()
    )

    print(str(contract_verification_result))
    ```
4. At runtime, Soda connects with your data source and verifies the contract by executing the data contract checks in your file. Use `${SCHEMA}` syntax to provide any environment variable values in a contract YAML file. Soda returns results of the verification as pass or fail check results, or indicate errors if any exist; see below.

## Review contract verification results

Contract verification results make a distinction between two types of problems: failed checks, and execution errors.

| Output | Meaning | Action | Method |
|------- |---------|--------|--------|
| Failed checks   | A failed check indicates that the values in the dataset do not match or fall within the thresholds you specified in the check.| Review the data at its source to determine the cause of the failure.  | `.has_failures()` |
| Execution errors | An execution error means that Soda could not evaluate one or more checks in the data contract. Errors include incorrect inputs such as missing files, invalid files, connection issues, or invalid contract format, or query execution exceptions. | Use the error logs to investigate the root cause of the issue.  | `.has_errors()`   |

When Soda surfaces a failed check or an execution error, you may wish to stop the pipeline from processing the data any further. To do so, you can use the Soda data contracts API in one of two ways:
* Append `.assert_ok()` at the end of the contract verification result which produces a SodaException when a check fails or when or execution errors occur.  The exception message includes a full report.
* Test for the result using `if not contract_verification_result.is_ok():`  Use `str(contract_verification_result)` to get a report.

## About data source configurations

Soda data contracts connects to a data source to perform queries, and verify schemas and data quality checks on data stored in a data source. Notably, it does not extract or ingest data, it only scans your data to complete contract verification. If you are using the Contract API, you only need to provide one data source configuration in the contract verification which Soda uses to verify contracts. 

Best practice dictates that you store sensitive credential values as environment variables that use uppercase and underscores, such as `password: ${DATA_SOURCE_PASSWORD}`.  Soda data contracts uses environment variables by default; you can pass extra variables via the API using `.with_variables({"DATA_SOURCE_PASSWORD": "***"})`.
 

## Verify data contracts with Spark

Where you have a Spark session that potentially includes data frames that live in-memory, you can pass a Spark session into the contract verification API to verify 
a data contract in data frames without persisting and reloading.

Use `with_data_source_spark_session` to pass your Spark session into the contract verification, as in the example below.

```python
spark_session: SparkSession = ...

contract_verification: ContractVerification = (
    ContractVerification.builder()
    .with_contract_yaml_str(contract_yaml_str)
    .with_data_source_spark_session(spark_session=spark_session, data_source_name="spark_ds")
    .execute()
)
```

## Validate data contracts

If you wish to validate the syntax of a data contract without actually executing the contract verification, use the `build` method instead of `execute`  on the contract verification builder, as in the following example.

```python
contract_verification: ContractVerification = (
  ContractVerification.builder()
  .with_contract_yaml_file('soda/local_postgres/public/customers.yml')
  .build()
)

if contract_verification.logs.has_errors():
  print(f"The contract has syntax or semantic errors: \n{contract_verification.logs}")
```

## Add a check identity

Add an identity to a check to correlate the check's verification results with a check in Soda Cloud.

In a contract YAML file, every check must have a unique identity.  By default, Soda generates a check identity based on the location of the checks list and two properties: `type` and `name`. This is generally enough information to correlate a data contracts check with a check in Soda Cloud.

However, if the error `Duplicate check identity` appears in the verification output, that indicates that two checks exist with the same type and name, or same type and no name. Where this occurs,  manually change the name of one of the checks or, in the case where neither check has a name, add a name to one of the checks. 

Be aware that if you do change or add a name to a data contract check, Soda Cloud considers this as a new check and discards the previous check result’s history; it would appear as though the original check and its results had disappeared.


## Skip checks during contract verification

During a contract verification, you can arrange skip checks using `check.skip` as in the following example that does not check the schema of the dataset.

```python
contract_verification: ContractVerification = (
    ContractVerification.builder()
    .with_data_source_yaml_file('soda/local_postgres/data_source.yml')
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
