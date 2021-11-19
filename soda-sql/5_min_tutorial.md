---
layout: default
title: Quick start for Soda SQL
parent: Soda SQL
redirect_from: /soda-sql/getting-started/5_min_tutorial.html
---

# Quick start tutorial for Soda SQL

Use your command-line interface to **connect** Soda SQL to your database, prepare default **tests** that will surface "bad" data, then run your first **scan** in a few minutes. 
<br />
<br />

![tutorial-happy-path](/assets/images/tutorial-happy-path.png){:height="600px" width="600px"}


## Create a sample warehouse (optional)

In the context of Soda SQL, a warehouse is a type of data source that represents a SQL engine or database such as Snowflake, Amazon Redshift, or PostgreSQL. 

If you do not have access to a warehouse on your system, you can clone a GitHub repository and use Docker to build a sample PostgreSQL warehouse that contains <a href="https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm" target="_blank">NYC School Bus Breakdowns and Delays</a> data so that you can set up your Soda SQL CLI tool and see it in action.

All the instructions in this tutorial reference this sample warehouse in the commands.

1. Clone the <a href="https://github.com/sodadata/tutorial-demo-project" target="_blank">tutorial-demo-project</a> GitHub repo to your local environment.
2. In the command-line, navigate into the tutorial project.
```shell
cd tutorial-demo-project
```
3. Use the following command to build the Docker containers. The `-d` flag means "detached" which means that you do not need to keep the terminal running for the docker containers to continue to run.)
```shell
docker-compose up -d
``` 
4. Validate that the setup is complete. 
```shell
docker ps -a | grep soda
``` 
This command yields output like the following.
```shell
CONTAINER ID   IMAGE                                    COMMAND                  CREATED       STATUS         PORTS                                       NAMES
90b555b29ccd   tutorial-demo-project_soda_sql_project   "/bin/bash"              3 hours ago   Exited (2) 3 seconds ago   0.0.0.0:8001->5432/tcp, :::8001->5432/tcp   tutorial-demo-project_soda_sql_project_1
d7950300de7a   postgres                                 "docker-entrypoint.s…"   3 hours ago   Up 3 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   tutorial-demo-project_soda_sql_tutorial_db_1
```
5. To run Soda commands and test your dataset, you need to access the container's shell. From the project's root dir where the `docker-compose.yml` file exists, run the following command.
```shell
docker-compose run --rm soda_sql_project "cd /workspace && /bin/bash"
```
This command yields a prompt like the following.
```shell
root@90461262c35e:/workspace# 
```


## Connect Soda SQL to the warehouse

The instructions below reference the sample warehouse in the commands. There are many [install packages for Soda SQL]({% link soda-sql/installation.md %}#install) that correspond to different warehouse types; this tutorial uses PostgreSQL. Customize the example commands to use your own PostgreSQL warehouse connection details, if you like.  

1. From your command-line interface, verify your [installation]({% link soda-sql/installation.md %}) of Soda SQL using the `soda` command. 
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
  | Soda CLI version ...
  | Creating warehouse YAML file warehouse.yml ...
  | Creating /Users/tom/.soda/env_vars.yml with example env vars in section soda_sql_tutorial
  | Review warehouse.yml by running command
  |   cat warehouse.yml
  | Review section soda_sql_tutorial in ~/.soda/env_vars.yml by running command
  |   cat ~/.soda/env_vars.yml
  | Then run the soda analyze command
```
4. Optionally, use the following commands  to review the contents of the two YAML files you created. You do not need to adjust any contents as Soda SQL has already configured the warehouse connection details.
* `cat ./warehouse.yml`
* `cat ~/.soda/env_vars.yml`


## Prepare default tests

1. Use the `soda analyze` command to get Soda SQL to sift through the contents of your warehouse and automatically prepare a scan YAML file for each table. Soda SQL puts the YAML files in a new `/tables` directory in the warehouse directory you created. Read more about [scan YAML]({% link soda-sql/scan-yaml.md %}) files.<br />
<br />
Command:
```shell
soda analyze
```
Output:
```
  | Analyzing warehouse.yml ...
  | Querying warehouse for tables
  | Creating tables directory tables
  | Executing SQL query:
SELECT table_name
FROM information_schema.tables
WHERE lower(table_schema)='public'
  | SQL took 0:00:00.007998
  | Creating tables/demodata.yml ...
  | Executing SQL query:
...
  | SQL took 0:00:00.000647
  | Next run 'soda scan warehouse.yml tables/demodata.yml' to calculate measurements and run tests
```
2. Use the following command to review the contents of the new scan YAML file that Soda SQL created and named `demodata.yml`.<br />

Command:

```shell
cat ./tables/demodata.yml
```
<br />
Output:

```yaml
table_name: demodata
metrics:
  - row_count
  - missing_count
  - missing_percentage
  - values_count
  - values_percentage
  - invalid_count
  - invalid_percentage
  - min_length
  - max_length
  - avg_length
  - min
  - max
  - avg
  - sum
  - variance
  - stddev
tests:
  - row_count > 0
columns:
  id:
    valid_format: uuid
    tests:
      - invalid_percentage == 0
  feepct:
    valid_format: number_percentage
    tests:
      - invalide_percentage == 0
```

Note the three tests that Soda SQL configured in `demodata.yml`. When it created this file, Soda SQL pre-populated it with the `test` and `metric` configurations it deemed useful based on the data in the table it analyzed. Read more about the [Anatomy of the scan YAML file]({% link soda-sql/scan-yaml.md %}#anatomy-of-the-scan-yaml-file).

#### Troubleshoot

If, when you run `soda analyze` you get an an authentication error, check to see if you have another instance of postgres already running on port 5432. If so, try stopping or uninstalling the postgres instance, then run `soda analyze` again. 

## Run a scan

1. Use the `soda scan` command to run tests against the data in the demodata warehouse. As input, the command requires the name of the warehouse to scan, and the filepath and name of the table in the warehouse. <br />
<br />
Command:
```shell
soda scan warehouse.yml tables/demodata.yml
```
2. Examine the output of the command, in particular the lines at the bottom that indicate the results of the tests Soda SQL ran against your data. In this example, all the tests passed which indicates that there are no issues with the data.<br />
<br />
Output:
```shell
  | Soda CLI version ...
  | Scanning demodata in ./soda_sql_tutorial ...
  | Environment variable POSTGRES_PASSWORD is not set
  | Executing SQL query:
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE lower(table_name) = 'demodata'
  AND table_catalog = 'sodasql'
  AND table_schema = 'public'
  | SQL took 0:00:00.029199
  | 6 columns:
  |   id character varying
  |   name character varying
  |   size integer
  |   date date
  |   feepct character varying
  |   country character varying
  | Query measurement: schema = id character varying, name character varying, size integer, date date, feepct character varying, country character varying
  | Executing SQL query:
SELECT
  COUNT(*),
  COUNT(id),
  MIN(LENGTH(id)),
  MAX(LENGTH(id)),
  COUNT(name),
  MIN(LENGTH(name)),
  MAX(LENGTH(name)),
  COUNT(size),
...
  | missing_count(country) = 0
  | values_percentage(country) = 100.0
  | All good. 38 measurements computed. No tests failed.
```
3. If you used Docker to create a sample PostgreSQL warehouse for this tutorial, be sure to execute the following commands to stop the container.
```shell
$ docker stop soda_sql_tutorial_db
$ docker volume rm soda_sql_tutorial_postgres
```

## Go further

* Consult [Configure Soda SQL]({% link soda-sql/configure.md %}) for details on setting up a non-PostgreSQL version of Soda SQL.
* Learn more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
* Learn more about the [scan YAML file]({% link soda-sql/scan-yaml.md %}) and how to [run scans]({% link soda/scan.md %}#run-a-scan-in-soda-sql).
* (Experimental) Access [historic measurements]({% link soda/metrics.md %}#historic-metrics-experimental) from the Cloud Metric Store in tests you define in your scan YAML file.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.