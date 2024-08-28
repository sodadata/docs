---
layout: default
title: Add Soda to an Azure Synapse notebook
description: Use this guide to invoke Soda data quality tests from inside a Synapse notebook in an Azure Data Factory pipeline.
parent: Use case guides
---

# Add Soda to an Azure Synapse notebook
*Last modified on {% last_modified_at %}*

Use this guide as an example of how to install and set up Soda in a Synapse notebook and run data quality tests on data from within an Azure Data Factory pipeline.

[About this guide](#about-this-guide)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
[Use Soda to reconcile data](#use-soda-to-reconcile-data)<br />
[Add post-ingestion SodaCL checks](#add-post-ingestion-sodacl-checks)<br />
[Go further](#go-further)<br />

## About this guide

This guide offers an example of how to set up and trigger Soda to run data quality scans from inside an Azure Synapse notebooks in an Azure Data Factory pipeline. The Data Engineer in this example has copied data from a PostgreSQL data source to an Azure SQL Server data source and uses Soda reconciliation checks in a Synapse notebook to validate that data copied from the source to the target is the same. 

Next, they create a second notebook to execute Soda checks to validate the completeness of the ingested data. 

This example uses a programmatic deployment model which invokes the Soda Python library, and uses Soda Cloud to validate a commercial usage license and display visualized data quality test results. 

Read more: [SodaCL reference]({% link soda-cl/metrics-and-checks.md %})<br />
Read more: [Soda reconciliation checks]({% link soda-cl/recon.md %})<br />
Read more: [Choose a flavor of Soda]({% link soda/setup-guide.md %}).

## Prerequisites

The Data Engineer in this example uses the following:
* permission to configure Azure Cloud resources through the user interface
* access to: 
  * an Azure Data Factory pipeline
  * a Synapse workspace
  * a dedicated SQL pool in Synapse
  * a dedicated Apache Spark pool in Synapse
  * an external source SQL database such as PostgreSQL
  * an Azure Data Lake Storage account
  * an Azure Key Vault
* The above-listed resources have permissions to interact with each other; for example the Synapse workspace has permission to fetch secrets from the Key Vault.
* Python 3.8, 3.9, or 3.10
* Pip 21.0 or greater

{% include python-versions.md %}

## Create a Soda Cloud account

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <a href="https://docs.soda.io/soda/about.html">Learn more</a>

1. In a browser, the engineer navigated to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. 
2. They navigated to **your avatar** > **Profile**, then accessed the **API keys** tab and clicked the plus icon to generate new API keys. 
3. They copy+pasted the API key values to the Azure Key Vault.

## Use Soda to reconcile data

This example executes checks that validate that source and target data are matching using Synapse notebooks in an Azure Data Factory (ADF) pipeline. The first notebook contains the Soda connection details, the check definitions, and the script to run a Soda scan for data quality which executes the [reconciliation checks]({% link soda-cl/recon.md %}).

Download the notebook: <a href="/assets/soda-synapse-recon-notebook.ipynb" download>Soda Synapse Recon notebook</a>

1. In the ADF pipeline, the Data Engineer defines a Notebook Activity which runs a Synapse notebook called `Reconciliation Checks` (Settings tab). 
2. They use a linked service (Azure Synapse Analytics (Artifacts) tab) to connect the pipeline to the Synapse workspace in which the notebook itself will reside. 
3. The Spark Pool that runs the notebook must have the Soda Library packages it needs to run scans of the data. Before creating the notebook in the Synapse workspace, they add a `requirement.txt` file to the Spark Pool and include the following contents. Because this example runs scans on both the source (PostgreSQL) and target (SQL server) data sources, it requires two Soda Library packages.
```text
--extra-index-url https://pypi.cloud.soda.io
soda-postgres
soda-sqlserver
```
4. They create a new notebook in their Synapse workspace, then add the following contents that enable Soda to connect with the data sources, and with Soda Cloud. For the sensitive data source login credentials and Soda Cloud API key values, the example fetches the values from an Azure Key Vault. Read more: [Integrate with a secrets manager]({% link soda-agent/secrets.md %}#integrate-with-a-secrets-manager)
    ```python
    from notebookutils import mssparkutils

    config_str = f"""
    data_source postgres_data:
      type: postgres
      host: soda-demo.xxx.eu-west-1.rds.amazonaws.com
      port: 5432
      username: my_user
      password: {mssparkutils.credentials.getSecret('soda-vault' , 'postgres-pw')}
      database: postgres
      schema: soda_demo_data_testing
    data_source azure_sql_data:
      type: sqlserver
      driver: ODBC Driver 18 for SQL Server
      host: soda.sql.azuresynapse.net
      port: xxxx
      username: my_sql_user
      password: {mssparkutils.credentials.getSecret('soda-vault' , 'sql-pw')}
      database: soda_sqlserver
      schema: soda_demo_data_testing
    soda_cloud:
      host: cloud.us.soda.io
      api_key_id: {mssparkutils.credentials.getSecret('soda-vault' , 'soda-api-key-id')}
      api_key_secret: {mssparkutils.credentials.getSecret('soda-vault' , 'soda-api-key-secret')}
    """
    ```
5. They define the SodaCL reconciliation checks inside another YAML string. 
    ```python
    check_str = """reconciliation retail_customers:
      label: 'Reconcile Postgres source and Azure SQL target'
      datasets:
        source:
          dataset: retail_customers
          datasource: postgres_data
        target:
          dataset: retail_customers
          datasource: azure_sql_data

      checks:
        - row_count diff = 0
        - duplicate_count(customer_id):
            fail: when diff > 0
        - missing_count(customer_id):
            fail: when diff > 0
        - missing_count(country_code):
            fail: when diff > 0
    """
    ```
6. Finally, they define the script that runs the Soda scan for data quality, executing the reconcilation checks that validate the matching source and target data. If `scan.assert_no_checks_fail()` returns an `AssertionError` indicating that one or more checks have failed during the scan, then the Azure Data Factory pipeline in which this notebook resides halts.
    ```python
    from soda.scan import Scan
    scan = Scan()
    scan.set_data_source_name('azure_sql_data')
    scan.add_configuration_yaml_str(config_str)
    scan.set_scan_definition_name('reconciliation')
    scan.set_verbose(True)
    scan.add_sodacl_yaml_str(check_str)
    scan.execute()
    scan.assert_no_checks_fail()
    ```

## Add post-ingestion SodaCL checks

Beyond reconciling the copied data, the Data Engineer uses SodaCL checks to gauge the completeness of data. In a new notebook, they follow the same pattern as the reconciliation check notebook in which they configured connections to Soda Cloud and the data source, defined SodaCL checks, then prepared a script to run the scan and execute the checks.

Download the notebook: <a href="/assets/soda-synapse-ingest-notebook.ipynb" download>Soda Synapse Ingest notebook</a>

```python
## Configure connections to the data source and Soda Cloud
config_str = f"""
data_source azure_sql_data:
  type: sqlserver
  driver: ODBC Driver 18 for SQL Server
  host: soda.sql.azuresynapse.net
  port: xxxx
  username: my_sql_user
  password: {mssparkutils.credentials.getSecret('soda-vault' , 'sql-pw')}
  database: soda_sqlserver
  schema: soda_demo_data_testing
soda_cloud:
  host: cloud.us.soda.io
  api_key_id: {mssparkutils.credentials.getSecret('soda-vault' , 'soda-api-key-id')}
  api_key_secret: {mssparkutils.credentials.getSecret('soda-vault' , 'soda-api-key-secret')}
"""
## Define data quality checks using Soda Checks Language (SodaCL)
check_str = """checks for retail_customers:
- missing_percent(customer_id):
    name: check completeness of customer_id
    fail: when > 5%
- duplicate_percent(customer_id):
    name: check uniqueness of customer_id
    fail: when > 5%
- missing_percent(country_code):
    name: check completeness of country_code
    fail: when > 5%
"""
## Run the Soda scan
from soda.scan import Scan
scan = Scan()
scan.set_verbose(True)
scan.set_data_source_name('azure_sql_data')
scan.add_configuration_yaml_str(config_str)
scan.set_scan_definition_name('retail_customers_scan')
scan.add_sodacl_yaml_str(check_str)
scan.execute()
scan.assert_no_checks_fail()
```

## Review check results in Soda Cloud

After running the notebooks, the Data Engineer can access their Soda Cloud account to review the check results. 

In the **Checks** page, apply filters to narrow the results to display only those associated with the Azure SQL Server data source against which Soda ran the data quality scans. Soda displays the results of the most recent scan it ran.

![soda-synapse-results](/assets/images/soda-synapse-results.png){:width="700px"}

<br />

## Review check results in a Unity dashboard

TO DO



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