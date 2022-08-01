---
layout: default
title: Run your first scan
description: Soda Core is a free, open-source, CLI tool that enables you to discover bad data. Use this tutorial for a hands-on learning experience with Soda Core.
sidebar: core
parent: Soda Core 
---

# Run your first scan 

**Soda Core** is a free, open-source, command-line tool that enables you to use the **Soda Checks Language (SodaCL)** to turn user-defined input into aggregated SQL queries. When it runs a scan on a dataset, Soda Core executes the checks to find invalid, missing, or unexpected data. When your **Soda Checks** fail, they surface the data that you defined as "bad".

Connect Soda Core to your data source (Snowflake, Postgres, etc.) using a [configuration YAML file](#the-configuration-yaml-file), then define your Soda Checks for data quality in a [checks YAML file](#the-checks-yaml-file), and use Soda Core to [run scans](#run-a-scan) of your data to execute the checks. 

```shell
soda scan -d your_datasource_name checks.yml
```


## The configuration YAML file

The configuration YAML file stores connection details for your data source. The following is an example of the connection details Soda Core requires to connect to a PostgreSQL data source. 
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

In your own local environment, you create and store your configuration YAML as a hidden file in `~/.soda/configuration.yml`. Follow the [detailed instructions]({% link soda-core/configure.md %}) to create and populate the configuration YAML file with the values specific to your data source.

During a scan, Soda Core uses the following path and filename by default: `~/.soda/configuration.yml`  If you wish, you can explicitly identify the configuration YAML file to Soda Core by including a `-c` option in the scan command.
`soda scan -d your_datasource_name  -c ~/.soda/configuration.yml checks.yml`


## The checks YAML file

A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using the Soda Checks Language (SodaCL). 

The following checks YAML file example uses SodaCL to make sure that the `CUSTOMERS` table contains no fewer than 20 and no more than 100 rows. In this example, `row_count` is the metric, and `between 20 and 100` is the threshold. 

```yaml
checks for CUSTOMERS:
  - row_count between 20 and 100
```

In your own local environment, you create and store your checks YAML file anywhere you wish, then identify its name and filepath in the scan command. In fact, you can name the file whatever you like, as long as it is a `.yml` file and it contains checks using the SodaCL syntax.

You write Soda Checks using SodaCL’s built-in metrics, though you can go beyond the built-in metrics and write your own SQL queries, if you wish. The example above is one of the simplest checks you can run on a single dataset, but SodaCL offers a wealth of [built-in metrics]({% link soda-cl/soda-cl-overview.md %}) that enable you to define checks for more complex situations.

## Run a scan

During a scan, all checks return a status of pass, fail, warn, or error.

* If a check passes, you know your data is sound.
* If a check fails, it means the scan discovered data that falls outside the expected or acceptable parameters you defined in your check.
* If a check triggers a warning, it means the data falls within the parameters you defined as “worthy of a warning” in your check.
* If a check returns an error, it means there is a problem with the check itself, such as a syntax error.

Scan command:
```shell
soda scan -d your_datasource_name checks.yml
```
Output:
```shell
Soda Core 3.0.xx
Scan summary:
1/1 check PASSED: 
    CUSTOMERS in postgres_retail
      row_count between 20 and 100 [PASSED]
All is good. No failures. No warnings. No errors.
```

See [Scan reference]({% link soda-core/scan-reference.md %}) for further details.


#### Examples of SodaCL checks

Check that values in one column in a table are present in another table's column:
```yaml
checks for CUSTOMERS:
  - values in employee_key must exist in SALES_QUOTA employee_key
```

Issue a warning if expected columns in a table are missing:
```yaml
checks for CUSTOMERS:
  - schema:
      warn:
        when required column missing: [last_name, email_address]
```

Check for valid values in a column in a table:
```yaml
checks for PRODUCT:
  - invalid_percent(color) < 1%:
      valid values:
        - red
        - green
        - blue
```


---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-core-footer.md %}
