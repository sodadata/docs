---
layout: default
title: Configure Soda Core
description: Create a configuration YAML file to configure connection details for Soda Core to access your data source.
sidebar: core
parent: Soda Core 
---

# Configure Soda Core 

Create a configuration YAML file to configure connection details for Soda Core to access your data source. Store the `configuration.yml` as a hidden file in your local user home directory: `~/.soda/configuration.yml`. When you execute a scan, Soda Core uses that path and filename by default to find the configuration YAML and use the information within to connect to your data source.

To set the data source configurations, use the following example configurations that correspond to each kind of data source that Soda Core supports.

[Connect to Amazon Athena](#connect-to-amazon-athena)<br />
[Connect to Amazon Redshift](#connect-to-amazon-redshift)<br />
[Connect to Apache Spark DataFrames](#connect-to-apache-spark-dataframes)<br />
[Connect to GCP BigQuery](#connect-to-gcp-bigquery)<br />
[Connect to IBM DB2](#connect-to-ibm-db2)<br />
[Connect to MS SQL Server](#connect-to-ms-sql-server)<br />
[Connect to MySQL](#connect-to-mysql)<br />
[Connect to PostgreSQL](#connect-to-postgresql)<br />
[Connect to Snowflake](#connect-to-snowflake)<br />
[Connect Soda Core to Soda Cloud](#connect-soda-core-to-soda-cloud)<br />
<br />


{% include core-datasource-config.md %}

<!-- This feature does not appear to work, nor exist in the code as either table_prefix or dataset_prefix.

## Add prefixes to datasets

To assist in identifying details when Soda Core scans your data with the verbose option, you can add a prefix to the name of a table with the name of a database or schema. Use the data source property `table_prefix` according to the following example.

```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: db
    username:
    password:
  database: postgres
  schema: public
  table_prefix: "public"
```

If you have configured the `table_prefix` property, a check for `row_count` yields scan output that reveals the table prefix information: `FROM public.CUSTOMERS`.

Checks YAML file:
```yaml
checks for "CUSTOMERS":
  - row_count > 0
```

Soda scan output, with `-V` option for verbose mode:
```shell
soda scan -d adventureworks -V -c configuration.yml checks.yml
```

Soda scan output:

```shell
Soda Core 0.0.x
Reading configuration file "configuration.yml"
Reading SodaCL file "checks.yml"
Scan execution starts
Query adventureworks.CUSTOMERS.aggregation[0]:
SELECT
  COUNT(*)
FROM public.CUSTOMERS
Scan summary:
1/1 query OK
  adventureworks.CUSTOMERS.aggregation[0] [OK] 0:00:00.035515
1/1 check PASSED:
    CUSTOMERS in adventureworks
      row_count > 0 [PASSED]
        check_value: 99
All is good. No failures. No warnings. No errors.
```
-->

## Connect Soda Core to Soda Cloud

1. If you have not already done so, create a free Soda Cloud Developer account at <a href="cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a>.
2. To your `configuration.yml`, add the following syntax. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under any other `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
3. In your Soda Cloud account, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
4. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in Soda Cloud.

The next time you execute a scan in Soda Core, it pushes the scan results to Soda Cloud where you can view the results in the **Checks** dashboard. Refer to [Soda Cloud documentation]({% link soda-cloud/overview.md %}) for more information.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-core-footer.md %}
