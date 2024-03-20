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
<small>✔️ &nbsp;&nbsp; Supported in Soda Core 3.3.0 or greater</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>

## Prerequisites
* Python 3.8 or greater
* a code or text editor
* your warehouse connection credentials and details
* a `soda-core-contracts` package and a `soda-core[package]` [installed]({% link soda/data-contracts.md %}) in a virtual environment. Refer to the list of data source-specific <a href="https://github.com/sodadata/soda-core/blob/main/docs/installation.md" target="_blank">Soda Core pacakges</a> available to use.
* a Soda data contracts YAML file; see [Write a data contract]({% link soda/data-contracts-write.md %})

## Verify a data contract via API
1. In your code or text editor, create a new file name `connection.yml` accessible from within your working directory in your virtual environment.
2. To that file, add a connection configuration for Soda to connect to your warehouse and access the data within it to verify the contract. The example that follows is for a PostgreSQL warehouse; other warehouse connection details are coming soon. <br />Best practice dictates that you store sensitive credential values as environment variables using uppercase and underscores for the variables. 
    ```yaml
    type: postgres
    host: localhost
    database: yourdatabase
    username: ${POSTGRES_USERNAME}
    password: ${POSTGRES_PASSWORD}
    ``` 
    Alternatively, you can use a YAML string or dict to define connection details; use one of the `Connection.from_*` methods.
3. Add the following block to your Python working environment. Replace the values of the file names with your own `connection.yml` file and `contract.yml` respectively.
    ```python
    from soda.contracts.connection import Connection, SodaException
    from soda.contracts.contract import Contract, ContractResult

    try:
        with Connection.from_yaml_file("./postgres_localhost_dev.connection.yml") as connection:
            contract: Contract = Contract.from_yaml_file("./dim_customer.contract.yml")
            contract_result: ContractResult = contract.verify(connection)
    except SodaException as e:
        # make the orchestration job fail and report all problems
    ```
4. At runtime, Soda connects with your warehouse and verifies the contract by executing the data contract checks in your file. Use `${SCHEMA}` syntax to provide any environment variable values in a contract YAML file. Soda returns results of the verification as pass or fail check results, or indicate errors if any exist; see below.

### Contract result output

When Soda surfaces an issue with data quality in your pipeline, or if something goes wrong during contract verification, you may wish to stop the pipeline from further processing the data. With that use case in mind, the Soda data contracts API raises a `SodaException` for both outcomes. 

The table that follows offers insight into the differentiation between check failures and contract verification errors.

| Output | Meaning | Action |
| ------ | ------- | ------ |
| Check fail | One or more of the data contract checks for a dataset resulted in a value that is outside the parameters of the thresholds you set.  | Review the data at source to determine the cause of the failure. | 
| Check pass | The checks in your data contract resulted in values that are within the parameters of the thresholds you set. | No action; data quality is good. |
| Error | Soda could not evaluate one or more checks in the data contract. Incorrect inputs such as missing files, invalid files, connection issues, or invalid contract format, or query execution exceptions can cause errors. | Use the error logs to investigate the root cause of the issue. |
| Problem | Either one or more checks in the contract have failed or something has produced an error. | Access the methods related to problems in the `ContractResult`, such as `has_problems` and `assert_no_problems`. |

Note that Soda raises a `SodaException` for both value errors as well as execution exceptions. The base class for all Soda exceptions is `SodaException`, which inherits from `Exception`. 

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
