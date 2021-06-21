---
layout: default
title: Configure Soda SQL
parent: Soda SQL
redirect_from: /soda-sql/getting-started/configure.html
---

# Configure Soda SQL

After you [install Soda SQL]({% link soda-sql/installation.md %}), you must create files and configure a few settings before you can run a scan.

## Overview of configuration 

1. Create a [warehouse directory]({% link soda/glossary.md %}#warehouse-directory) in which to store your warehouse YAML file and `/tables` directory.
2. Create a [warehouse YAML file]({% link soda/glossary.md %}#warehouse-yaml) and an [env_vars YAML file]({% link soda/glossary.md %}#env_vars-yaml), then adjust the contents of each to input your [warehouse]({% link soda/glossary.md %}#warehouse) connection details.
3. Create a [scan YAML file]({% link soda/glossary.md %}#scan-yaml) for each [table]({% link soda/glossary.md %}#table) that exists in your warehouse. The scan YAML files store the test criteria that Soda SQL uses to prepare SQL queries that [scan]({% link soda/glossary.md %}#scan) your warehouse.
4. Adjust the contents of your new scan YAML files to add the [tests]({% link soda/glossary.md %}#test) you want to run on your data to check for quality.

Consider following the [Quick start tutorial]({% link soda-sql/5_min_tutorial.md %}) that guides you through configuration and scanning.

## Configuration instructions

1. Use your command-line interface to create, then navigate to a new Soda SQL warehouse directory in your environment. The warehouse directory stores your warehouse YAML files and `/tables` directory. The example below creates a directory named `soda_warehouse_directory`.<br />
<br />
```shell
$ mkdir soda_warehouse_directory
$ cd soda_warehouse_directory
```
2. Use the [create command](#create-commands) to create and pre-populate two files that enable you to configure connection details for Soda SQL to access your warehouse:
* a `warehouse.yml` file which stores access details for your warehouse ([read more]({% link soda-sql/warehouse.md %}))
* an `env_vars.yml` file which securely stores warehouse login credentials ([read more]({% link soda-sql/warehouse.md %}#env_vars-yaml-file))<br />
<br />
Use `soda create --help` for a list of all available warehouse types and options.
```shell
$ soda create warehousetype -d yourdbname -u dbusername -w soda_warehouse_directory 
```
3. Use a code editor to open the `warehouse.yml` file that Soda SQL created and put in your warehouse directory. Refer to [Set warehouse configurations]({% link soda/warehouse_types.md %}) to adjust the configuration details and authentication settings according to the type of warehouse you use, then save the file.<br />
<br />
Example warehouse YAML
```shell
name: soda_warehouse_directory
connection:
  type: postgres
  host: localhost
  username: env_var(POSTGRES_USERNAME)
  password: env_var(POSTGRES_PASSWORD)
  database: sodasql
  schema: public
```
4. Use a code editor to open the `env_vars.yml` that Soda SQL created and put in your local user home directory as a hidden file (`~/.soda/env_vars.yml`). Use the command `ls ~/.soda/env_vars.yml` to locate the file. Input your warehouse login credentials then save the file.<br />
<br />
Example env_vars YAML
```shell
soda_warehouse_directory:
  POSTGRES_USERNAME: someusername
  POSTGRES_PASSWORD: somepassword
```
5. In your command-line interface, use the `soda analyze` command to get Soda SQL to sift through the contents of your warehouse and automatically prepare a scan YAML file for each table. Soda SQL uses the name of the table to name each YAML file which it puts a new `/tables` directory in the warehouse directory. <br />
<br />
```shell
soda analyze
```
6. Use a code editor to open one of your new scan YAML files. Soda SQL pre-populated the YAML file with default metrics and tests that it deemed useful for the kind of data in the table. See [scan YAML]({% link soda-sql/scan-yaml.md %}#anatomy-of-the-scan-yaml-file). <br /> Adjust the contents of the YAML file to define the tests that you want Soda SQL to conduct when it runs a scan on this table in your warehouse. Refer to [Metrics]({% link soda-sql/sql_metrics.md %}) and [Tests]({% link soda-sql/tests.md %}) for details. <br />
<br />
Example scan YAML<br />
![configure yaml](/assets/images/configure-yaml.png){:height="275px" width="275px"}
7. With your configuration complete, [run your first scan]({% link soda/scan.md %}#run-a-scan).

## Create commands

Use `soda create --help` for a list of all available warehouse types and options.

|Warehouse type  | Command |
|--------------- | -------------------- |
| Amazon Athena  | soda create athena |
| Amazon Redshift | soda create redshift |
| Apache Hive    | soda create hive     |
| GCP BigQuery   | soda create bigquery |
| MS SQL Server  | soda create sqlserver |
| PostgreSQL     | soda create postgres |
| Snowflake      | soda create snowflake |

## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about the [scan YAML file]({% link soda-sql/scan-yaml.md %}).
* Learn more about configuring [tests]({% link soda-sql/tests.md %}) and [metrics]({% link soda-sql/sql_metrics.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.