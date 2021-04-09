---
layout: default
title: Install Soda SQL
parent: Get Started
nav_order: 2
---

# Install Soda SQL

Soda SQL is a command-line interface (CLI) tool that enables you to scan the data in your database to surface invalid, missing, or unexpected data.
<br />

**[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Troubleshoot](#troubleshoot)<br />
[Go further](#go-further)<br />**

## Compatibility

{% include compatible-warehouses.md %}


## Requirements

To use Soda SQL, you must have installed the following on your system:
- **Python 3.7** or greater. To check your existing version, use the CLI command: `python --version`
- **Pip 21.0** or greater. To check your existing version, use the CLI command: `pip --version`

For Linux users only, install the following:
- On Debian Buster: `apt-get install g++ unixodbc-dev python3-dev libssl-dev libffi-dev`
- On CentOS 8: `yum install gcc-c++ unixODBC-devel python38-devel libffi-devel openssl-devel`

For MSSQL Server users only, install the following:
- [SQLServer Driver](https://docs.microsoft.com/en-us/sql/connect/odbc/microsoft-odbc-driver-for-sql-server?view=sql-server-ver15)


## Install

From your command-line interface tool, execute the following command, using the install package that matches the type of warehouse you use to store data.

```
$ pip install soda-sql-yourdatawarehouse
```

| Data warehouse | Install package |
| -------------- | --------------- |
| Amazon Athena  | soda-sql-athena |
| Amazon Redshift | soda-sql-redshift |
| Apache Hive    | soda-sql-hive     |
| GCP BigQuery   | soda-sql-bigquery |
| MS SQL Server  | soda-sql-sqlserver |
| PostgreSQL     | soda-sql-postgresql |
| Snowflake      | soda-sql-snowflake |


Optionally, you can install Soda SQL in a virtual environment. Execute the following commands one by one:

```
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install soda-sql-yourdatawarehouse
```


## Upgrade

To upgrade your existing Soda SQL tool to the latest version, use the following command:
```shell
pip install soda-sql-yourdatawarehouse -U
```

## Troubleshoot

{% include troubleshoot-install.md %}

## Go further

* [Configure Soda SQL]({% link soda-sql/getting-started/5_min_tutorial.md %}).
* [Run your first scan]({% link soda-sql/documentation/scan.md %}#run-a-scan).
* Learn [How Soda SQL works]({% link soda-sql/documentation/concepts.md %}).