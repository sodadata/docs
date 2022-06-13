---
layout: default
title: Run a Soda Core scan
description:  Soda Core uses the input in the checks and configuration YAML file to prepare a scan that it runs against the data in a dataset.
parent: Soda Core
---

# Run a Soda Core scan ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

A **scan** is a command that executes checks to extract information about data in a dataset. A **check** is a test that Soda Core performs when it scans a dataset in your data source. Soda Core uses the checks you define in the **checks YAML** file to prepare SQL queries that it runs against the data in a table. Soda Core can execute multiple checks against one or more datasets in a single scan. 

[Anatomy of a scan command](#anatomy-of-a-scan-command)<br />
[Scan output](#scan-output)<br />
[Go further](#go-further) <br />
<br />

## Anatomy of a scan command

Each scan requires the following as input:

* the name of the data source that contains the dataset you wish to scan, identified using the `-d` option
* a `configuration.yml` file, which contains details about how Soda Core can connect to your data source, identified using the `-c` option
* a `checks.yml` file which contains the checks you write using SodaCL

Scan command:
```shell
soda scan -d postgres_retail -c configuration.yml checks.yml
```
<br />

Include the filepath of each YAML file if you stored them in a directory other than the one in which you installed Soda Core.
```shell
soda scan -d postgres_retail -c other-directory/configuration.yml other-directory/checks.yml
```

<br />
Use the soda `soda scan --help` command to review options you can include to customize the scan.

<!--
## Variables

To test specific portions of data, such as data pertaining to a specific date, you can apply dynamic variables when you scan data in your warehouse. See [Use variables in Soda Core]({% link soda-core/variables.md %}) for detailed instructions. 

Variables are a set of key-value pairs, both of which are strings. In SodaCL, you can refer to variables as `${VAR}`.

Soda checks YAML file:
```yaml
variables:
  hello: world
  sometime_later: ${now}
```
Scan command:
```shell
soda scan -d postgres_retail -v TODAY=2022-03-11 checks.yml
```
-->

## Scan output

{% include core-scan-output.md %}

Example output with a check that triggered a warning:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check WARNED: 
    CUSTOMERS in postgres_retail
      schema [WARNED]
        missing_column_names = [sombrero]
        schema_measured = [geography_key, customer_alternate_key, title, first_name, last_name ...]
Only 1 warning. 0 failure. 0 errors. 0 pass.
```

Example output with a check that failed:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check FAILED: 
    CUSTOMERS in postgres_retail
      freshness using full_date_alternate_key < 3d [FAILED]
        max_column_timestamp: 2020-06-24 00:04:10+00:00
        max_column_timestamp_utc: 2020-06-24 00:04:10+00:00
        now_variable_name: NOW
        now_timestamp: 2022-03-10T16:30:12.608845
        now_timestamp_utc: 2022-03-10 16:30:12.608845+00:00
        freshness: 624 days, 16:26:02.608845
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.

```

## Go further

* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write more checks for data quality.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}