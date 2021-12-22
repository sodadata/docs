---
layout: default
title: Quick start for Soda SQL
parent: Get started
redirect_from: /soda-sql/getting-started/5_min_tutorial.html
---

# Quick start tutorial for Soda SQL

Use your command-line interface to **connect** Soda SQL to a sample data source, create and examine the **tests** that will surface "bad" data in a dataset, then run your first **scan** in a few minutes. 
<br/>
<br />

![tutorial-happy-path](/assets/images/tutorial-happy-path.png){:height="600px" width="600px"}

## Prerequisites
* a recent version of <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a>
* <a href="https://docs.docker.com/compose/install/" target="_blank">Docker Compose</a> that is able to run docker-compose files version 3.9 and later

## Create a sample warehouse

In the context of Soda SQL, a warehouse is a type of data source that represents a SQL engine or database such as Snowflake, Amazon Redshift, or PostgreSQL. 

For this tutorial, use Docker to build a sample PostgreSQL warehouse from a <a href="https://github.com/sodadata/tutorial-demo-project" target="_blank">Soda GitHub repo</a>. The warehouse contains <a href="https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm" target="_blank">NYC School Bus Breakdowns and Delays</a> data that you can use to see the Soda SQL CLI tool in action. If you use this command to spin up the Docker instance, you can use nano or vim to edit YAML files in the command-line later in the tutorial. All the instructions in this tutorial reference this sample warehouse.

From the command-line, run the following command:
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/sodadata/tutorial-demo-project/main/scripts/setup.sh)"
```

This command yields a prompt like the following.
```shell
root@90461262c35e:/workspace# 
```

Alternatively, follow the <a href="https://github.com/sodadata/tutorial-demo-project#set-up-manually" target="_blank">manual instructions</a> to clone the repo and set up the sample warehouse. If you clone the repo locally, you can use a text editor to edit YAML files later in the tutorial.



## Connect Soda SQL to the warehouse

The instructions below reference the sample warehouse in the commands. There are many [install packages for Soda SQL]({% link soda-sql/installation.md %}#install) that correspond to different warehouse types; this tutorial uses PostgreSQL.   

1. From your command-line interface, verify the installation of Soda SQL in the demo environment using the `soda` command. 
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...
```
2. Create, then navigate to a new Soda SQL warehouse directory. The example below creates a directory named `new_york_bus_breakdowns`.
```shell
$ mkdir new_york_bus_breakdowns
$ cd new_york_bus_breakdowns
```
3. Use the `soda create postgres` command to create and pre-populate two files that enable you to configure connection details for Soda SQL to access your warehouse:
* a `warehouse.yml` file which stores access details for your warehouse ([read more]({% link soda-sql/warehouse.md %}))
* an `env_vars.yml` file which securely stores data source login credentials ([read more]({% link soda-sql/warehouse.md %}#env_vars-yaml-file))<br />
<br />
Command:
```shell
soda create postgres
```
Output:
```shell
  | Soda CLI version 2.x.x
  | Creating warehouse YAML file warehouse.yml ...
  | Adding env vars for postgres to /root/.soda/env_vars.yml
  | Review warehouse.yml by running command
  |   cat warehouse.yml
  | Review section postgres in ~/.soda/env_vars.yml by running command
  |   cat ~/.soda/env_vars.yml
  | Then run the soda analyze command
```
4. Optionally, use the following commands to review the contents of the two YAML files Soda SQL created. Soda SQL automatically lists the fields it requires, and pre-populates some of the values. 
<br />
Command:
```shell
cat warehouse.yml
```
Output:
```shell
name: postgres
connection:
  type: postgres
  host: localhost
  port: '5432'
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: your_database
  schema: public
```
Command:
```shell
cat ~/.soda/env_vars.yml
```
Output:
```shell
postgres:
  POSTGRES_USERNAME: Eg johndoe
  POSTGRES_PASSWORD: Eg abc123
```
5. If you were connecting to your own warehouse, you would [follow the detailed instructions]({% link soda-sql/configure.md %}) to edit the `warehouse.yml` and `env_vars.yml` file and provide values specific to your warehouse so that Soda SQL could access it. <br />
<br />
Because this tutorial uses a sample warehouse, you can use the demo `warehouse.yml` and `env_vars.yml` files that connect to our sample NYC School Bus Breakdowns and Delays data. Use the following commands to navigate to the demo directory.
```shell
cd ..
cd new_york_bus_breakdowns_demo
```

## Create and examine tests

1. Use the `soda analyze` command to get Soda SQL to sift through the contents of the warehouse and automatically prepare a scan YAML file for each dataset it discovers. Soda SQL puts the YAML files in a new `/tables` directory in the `new_york_bus_breakdowns_demo` project directory. Read more about [scan YAML]({% link soda-sql/scan-yaml.md %}) files.<br />
<br />
Command:
```shell
soda analyze
```
Output:
```
  | 2.x.xxx
  | Analyzing warehouse.yml ...
  | Querying warehouse for tables
  | Creating tables directory tables
  | Executing SQL query: 
SELECT table_name 
FROM information_schema.tables 
WHERE lower(table_schema)='new_york'
  | SQL took 0:00:00.068775
...
  | SQL took 0:00:00.030745
  | Creating tables/breakdowns.yml ...
  | Next run 'soda scan warehouse.yml tables/breakdowns.yml' to calculate measurements and run tests
```
2. Use the following command to review the contents of the new scan YAML file that Soda SQL created and named `breakdowns.yml`.<br />

Command:
```shell
cat tables/breakdowns.yml
```
<br />
Output:
```yaml
table_name: breakdowns
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - values_percentage
  - invalid_count
  - invalid_percentage
  - valid_count
  - valid_percentage
  - avg_length
  - max_length
  - min_length
  - avg
  - sum
  - max
  - min
  - stddev
  - variance
tests:
  - row_count > 0
columns:
  school_year:
    valid_format: date_inverse
    tests:
      - invalid_percentage == 0
  bus_no:
    valid_format: number_whole
    tests:
      - invalid_percentage <= 20
  schools_serviced:
    valid_format: number_whole
    tests:
      - invalid_percentage <= 15
```

When it created this file, Soda SQL pre-populated it with four tests it deemed useful based on the data in the dataset it analyzed. Read more about [Defining tests]({% link soda-sql/tests.md %}) and the [Anatomy of the scan YAML file]({% link soda-sql/scan-yaml.md %}#anatomy-of-the-scan-yaml-file).

| Test | Applies to | Description |
| ---- | ---------- | ----------- |
| `row_count > 0` | breakdowns dataset | Tests that the dataset contains rows, that it is not empty. |
| `invalid_percentage == 0` | `school_year` column in the breakdowns dataset | Tests that all values in the column adhere to the `date_inverse` format. Read more about [valid format values]({% link soda-sql/sql_metrics.md %}#valid-format-values). |
| `invalid_percentage <= 20` | `bus_no` column in the breakdowns dataset | Tests that at least 80% of the values in the column are whole numbers. |
| `invalid_percentage <= 15` | `schools_serviced` column in the breakdowns dataset | Tests that at least 85% of the values in the column are whole numbers. |


## Run a scan

1. Use the `soda scan` command to run tests against the data in the breakdowns dataset. As input, the command requires the name of the warehouse to scan, and the filepath and name of the dataset in the warehouse. <br />
<br />
Command:
```shell
soda scan warehouse.yml tables/breakdowns.yml
```
2. Examine the output of the command, in particular the **Scan summary** at the bottom that indicates the results of the tests Soda SQL ran against your data. In this example, all the tests passed which indicates that there are no issues with the data.<br />
<br />
Output:
```shell
  | 2.x.xx
  | Scanning tables/breakdowns.yml ...
  | Environment variable POSTGRES_PASSWORD is not set
  | There is no value specified for valid_values for column school_year
  | There is no value specified for valid_min for column school_year
  | There is no value specified for valid_max for column school_year
  | There is no value specified for valid_values for column bus_no
  | There is no value specified for valid_min for column bus_no
  | There is no value specified for valid_max for column bus_no
  | There is no value specified for valid_values for column schools_serviced
  | There is no value specified for valid_min for column schools_serviced
  | There is no value specified for valid_max for column schools_serviced
  | No Soda Cloud account configured
  | Executing SQL query: 
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE lower(table_name) = 'breakdowns' 
  AND table_catalog = 'sodasql_tutorial' 
  AND table_schema = 'new_york'
  | SQL took 0:00:00.062634
  ...
  | Test test(row_count > 0) passed with measurements {"expression_result": 199998, "row_count": 199998}
  | Test column(school_year) test(invalid_percentage == 0) passed with measurements {"expression_result": 0.0, "invalid_percentage": 0.0}
  | Test column(bus_no) test(invalid_percentage <= 20) passed with measurements {"expression_result": 19.99919999199992, "invalid_percentage": 19.99919999199992}
  | Test column(schools_serviced) test(invalid_percentage <= 15) passed with measurements {"expression_result": 12.095620956209562, "invalid_percentage": 12.095620956209562}
  | Executed 2 queries in 0:00:03.291901
  | Scan summary ------
  | 239 measurements computed
  | 4 tests executed
  | All is good. No tests failed.
  | Exiting with code 0
```
3. (Optional) Open the `breakdowns.yml` file in a text editor, then adjust the test for the `school_year` column to `invalid_percentage == 5`, then save the change to the file.
4. (Optional) Run the same scan again to see the output of a failed test.<br />
Command:
```shell
soda scan warehouse.yml tables/breakdowns.yml
```
Output:
```shell
...
  | Test test(row_count > 0) passed with measurements {"expression_result": 199998, "row_count": 199998}
  | Test column(school_year) test(invalid_percentage == 5) failed with measurements {"expression_result": 0.0, "invalid_percentage": 0.0}
  | Test column(bus_no) test(invalid_percentage <= 20) passed with measurements {"expression_result": 19.99919999199992, "invalid_percentage": 19.99919999199992}
  | Test column(schools_serviced) test(invalid_percentage <= 15) passed with measurements {"expression_result": 12.095620956209562, "invalid_percentage": 12.095620956209562}
  | Executed 2 queries in 0:00:02.454419
  | Scan summary ------
  | 239 measurements computed
  | 4 tests executed
  | 1 of 4 tests failed:
  |   Test column(school_year) test(invalid_percentage == 5) failed with measurements {"expression_result": 0.0, "invalid_percentage": 0.0}
  | Exiting with code 1
```
5. If you like, adjust or add more tests to the `breakdowns.yml` file to further explore the things that Soda SQL can do. 
* If you used the single command to spin up the Docker instance, you can use nano or vim to edit YAML files in the command-line.
* If you cloned the tutorial-demo-project repo locally, you can use a text editor to edit YAML files.

To exit the workspace in your command-line interface, type `exit` then press enter. Consult the [Metrics]({% link soda/metrics.md %}), [Define tests]({% link soda-sql/tests.md %}), and [Scans]({% link soda/scan.md %}) documentation for information and information on how to test data quality with Soda SQL.


## Go further

* Consult [Configure Soda SQL]({% link soda-sql/configure.md %}) for details on setting up Soda SQL in your own environment.
* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about the [scan YAML file]({% link soda-sql/scan-yaml.md %}) and how to [run scans]({% link soda/scan.md %}#run-a-scan-in-soda-sql).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}