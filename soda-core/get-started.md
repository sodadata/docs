---
layout: default
title: Get started
description: 
sidebar: core
parent: Soda Core
---

# Get started

## CLI requirements

Soda Core requires Python 3.7+

To check your Python version, run
```shell
$ python --version
Python 3.8.12
```

It might be that in your case, you need to run python3 to get the right version.
In that case, replace python in the instructions below with python3
```shell
$ python3 --version
Python 3.8.12
```

## Install the CLI
We recommend you to install the CLI using a virtual environment.

From your command-line interface tool, execute the following command, replacing `soda-core-postgresql` with the install package that matches the type of data source you use to store data.

Creating a virtual environment in the `.venv` directory
```shell
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

Install the Soda Core package for your data source type:
```shell
pip install soda-core-postgresql
```

To deactivate the virtual environment, use the command:
```shell
deactivate
```

The list of package names for other data source types:

| Data source | Install package | Status |
| ----------- | --------------- | ------ |
| PostgreSQL | soda-core-postgresql | Available |
| Snowflake	| soda-core-snowflake	| Available |
| GCP Big Query	| soda-core-bigquery | Available| 
| Amazon Athena	| soda-core-athena	| Coming soon| 
| Amazon Redshift	| soda-core-redshift	| Coming soon| 
| Apache Spark	| soda-core-spark	| Coming soon| 
| Apache Hive	| soda-core-hive	| Coming soon, Experimental| 
| MS SQL Server	| soda-core-sqlserver	| Coming soon, Experimental| 
| MySQL	| soda-core-mysql	| Coming soon, Experimental| 
| Trino	| soda-core-trino	| Coming soon, Experimental| 

## Upgrade

To upgrade your existing Soda SQL tool to the latest version, use the following command replacing `soda-core-athena` with the install package that matches the type of data source you are using.

```shell
pip install soda-core-athena -U
```

Next, run your first scan.

---
{% include docs-core-footer.md %}