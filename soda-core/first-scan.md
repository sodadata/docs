---
layout: default
title: Run your first scan
description: 160 char description
sidebar: core
parent: Soda Core
---

# Run your first scan

**Soda Core** is a free, open-source, command-line tool that enables you to use the **Soda Check Language (SodaCL)** to turn user-defined input into aggregated SQL queries. When it runs a scan on a dataset, Soda Core executes the checks to find invalid, missing, or unexpected data. When your **Soda Checks** fail, they surface the data that you defined as "bad".

Connect Soda Core to your data source (Snowflake, Postgres, etc.) using a **configuration YAML** file, then define your Soda Checks for data quality in a **checks YAML** file, and use Soda Core to run scans of your data to execute the checks. 

For a hands-on learning experience with Soda Core, use the Soda demo database and the tutorial instructions below.

[Prerequisites](#prerequisites)<br />
[Set up the demo database](#set-up-the-demo-database)<br />
[The configuration YAML file](#the-configuration-yaml-file)<br />
[The checks YAML file](#the-checks-yaml-file)<br />
[Run a scan](#run-a-scan)<br />
[Experiment with more checks](#experiment-with-more-checks)<br />
[Scan your own data](#scan-your-own-data)<br />
<br />

## Prerequisites

* Terminal for Window or MacOS 
* a GitHub account
* <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a> installed on your local environment
* <a href="https://docs.docker.com/compose/install/" target="_blank">Docker Compose</a> 
* a code editor

## Set up the demo database

Soda's demo PostgreSQL database contains data from a fictitious, multinational manufacturing company called Adventure Works Cycles. It contains tables for customer information, employee information, sales territories, sales information, product categories, and more.

To examine the contents of the database, refer to the [schema diagram](/assets/adventureworks_schema.png).

1. Clone the <a href="https://github.com/sodadata/sodacl-workshop" target="_blank">`sodacl-workshop`</a> repo in GitHub.
2. Start Docker.
3. In Terminal, navigate to the `sodacl-workshp` directory in your local environment, then run the following command to set up the prepared demo environment.
```shell
docker-compose up
```
4. When the `database system is ready to accept connections`, open a new Terminal tab or window, then run the following command to open a shell with the YAML files. 
```shell
docker-compose exec soda-core /bin/bash 
```
The command results in a prompt similar to the following: ```root@80e6a2167613:/sodacl#```
5. To test that the environment is working properly, run a Soda scan.
```shell
soda scan -d adventureworks -c configuration.yml checks.yml
```
The command output results in the following output:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check PASSED:
    dim_account in adventureworks
      row_count between 20 and 100 [PASSED]
All is good. No failures. No warnings. No errors.
```

## The configuration YAML file

The configuration YAML stores connection details for your data source. Use the following command to review the contents of the `configuration.yml` that the demo environment uses.

Command:
```shell
cat configuration.yml
```
Output:
```shell
data_source adventureworks:
  type: postgres
  connection:
    host: db
    username: postgres
    password: secret
  database: postgres
  schema: public
```

In your own local environment, you create and store your `configuration.yml` as a hidden file. If you were connecting to your own data source, you would follow the [detailed instructions]({% link soda-core/configure.md %}) to create and populate the configuration YAML file with the values specific to your data source so that Soda Core could access it.

During a scan, Soda Core uses the following path and filename by default: `~/.soda/configuration.yml`

## The checks YAML file

A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. Technically, a check is a Python expression that, during a scan, checks metrics to see if they match the parameters you defined for a measurement.

The Soda Check included in the demo environment uses SodaCL to make sure that the `dim_account` table contains rows or, in other words, is not empty. In this example, `row_count` is the metric, `between` is the operand, and `20 and 100` is the measurement. Use the following command to review the contents of the `checks.yml` that the demo environment uses.

Command:
```shell
cat checks.yml
```
Output:
```yaml
checks for dim_account:
  - row_count between 20 and 100
```

You write Soda Checks using SodaCL’s built-in metrics, though you can go beyond the built-in metrics and write your own SQL queries, if you wish. The example above is one of the simplest checks you can run on a single dataset, but SodaCL offers a wealth of [built-in metrics]({% link soda-cl/soda-cl-overview.md %}) that enable you to define checks for more complex situations.

## Run a scan

During a scan, all checks return a status of pass, fail, warn, or error.

* If a check passes, you know your data is sound.
* If a check fails, it means the scan discovered data that falls outside the expected or acceptable parameters you defined in your check.
* If a check triggers a warning, it means the data falls within the parameters you defined as “worthy of a warning” in your check.
* If a check returns an error, it means there is a problem with the check itself, such as a syntax error.

Command:
```shell
soda scan -d adventureworks -c configuration.yml checks.yml
```
Output:
```shell
Soda Core 0.0.x
Scan summary:
1/1 check PASSED:
    dim_account in adventureworks
      row_count between 20 and 100 [PASSED]
All is good. No failures. No warnings. No errors.
```

Note that normally, you do not need to include an explicit reference to the `-c configuration.yml` in your scan command. This demo database requires an explicit filepath for the file. See [Scan reference]({% link soda-core/scan-reference.md %})

## Experiment with more checks

Reference the [schema diagram](/assets/adventureworks_schema.png) for the demo database and the [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}) to experiment with writing your own checks. 

1. Open the `checks.yml` file in your code editor using the following command: 
```shell
open checks.yml
```
2. In your code editor, edit the existing check or add more checks (some examples follow), then save the file. 
3. From your Terminal, run the scan command again to execute the checks and review the check results in the CLI output.

#### Examples

Check that a value is present in another table:
```yaml
checks for dim_employee:
  - values in employee_key must exist in fact_sales_quota employee_key
```

Issue a warning if expected columns in a table are missing:
```yaml
checks for dim_employee:
  - schema:
      warn:
        when required column missing: [last_name, email_address]
```

Check for valid values in a column in a table:
```yaml
checks for dim_product:
  - invalid_percent(color) < 1%:
      valid values:
        - red
        - green
        - blue
```

## Scan your own data

1. [Install the Soda Core CLI]({% link soda-core/get-started.md %}) in your own environment, and complete the [configuration]({% link soda-core/configure.md %}) to connect it to your own data source.
2. Reference the [SodaCL documentation]({% link soda-cl/soda-cl-overview.md %}) to write your own checks in a checks.yml file in your environment.
3. Scan the data in your own data source.

---
{% include docs-core-footer.md %}
