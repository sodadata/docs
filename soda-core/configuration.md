---
layout: default
title: Configure Soda Core
description: Configure Soda Core to connect to your data sources and prepare data quality checks to run against your data.
parent: Soda Core
---

# Configure Soda Core ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

After you [install Soda Core]({% link soda-core/installation.md %}), you must create files and configure a few settings before you can run a scan.

* Use a **configuration YAML file** to configure Soda Core to connect your data source (Snowflake, Postgres, etc.).
* Use a **checks YAML file** to define your Soda Checks for data quality.

[Configuration instructions](#configuration-instructions) <br />
[Connect to Amazon Athena](#connect-to-amazon-athena)<br />
[Connect to Amazon Redshift](#connect-to-amazon-redshift)<br />
[Connect to GCP BigQuery](#connect-to-gcp-bigquery)<br />
[Connect to PostgreSQL](#connect-to-postgresql)<br />
[Connect to Snowflake](#connect-to-snowflake)<br />
<br />

## Configuration instructions

Consider following the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) that guides you through the steps to configure Soda Core and run a scan of your data.

1. Create a directory in your environment in which to store your configuration and checks YAML files.
2. In your code editor, create a new YAML file named `configuration.yml` and save it in the directory you just created. 
3. The configuration YAML file stores connection details for your data source. Use the data source-specific sections below to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source's details. <br/> 
The following is an example of the connection details Soda Core requires to connect to a PostgreSQL data source. 
```yaml
data_source postgres_retail:
  type: postgres
  connection:
    host: db
    port: '5432'
    username: postgres
    password: secret
  database: postgres
  schema: public
```
4. Save the `configuration.yml` file, then create another new YAML file named `checks.yml` and save it the directory you created.
5. A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using [SodaCL]({% link soda-cl/soda-cl-overview.md %}). Copy+paste the following basic check syntax in your file, then adjust the value for `dataset_name` to correspond with the name of one of the datasets in your data source.
```yaml
checks for dataset_name:
  - row_count > 0
```
6. Save the changes to the `checks.yml` file. 



{% include core-datasource-config.md %}


## Go further

* Next: [Run a scan]({% link soda-core/scan-core.md %}) of the data in your data source.
* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write more checks for data quality.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}