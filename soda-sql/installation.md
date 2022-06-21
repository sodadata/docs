---
layout: default
title: Install Soda SQL
description: To use Soda SQL, your system must meet requirements. From your command-line interface, execute a pip install command to install Soda SQL.
sidebar: sql
parent: Soda SQL
redirect_from: /soda-sql/getting-started/installation.html
---

# Install Soda SQL

{% include banner-sql.md %}

Soda SQL is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
<br />

[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Troubleshoot](#troubleshoot)<br />
[Go further](#go-further)<br />

## Compatibility

Use Soda SQL to scan a variety of data sources:<br />

{% include compatible-warehouses.md %}


## Requirements

To use Soda SQL, you must have installed the following on your system.

{% include requirements.md %}


## Install

From your command-line interface tool, execute the following command, replacing `soda-sql-athena` with the install package that matches the type of data source you use to store data.

```
$ pip install soda-sql-athena
```

| Data source                  | Install package    |
| ---------------------------- | ------------------ |
| Amazon Athena                | soda-sql-athena    |
| Amazon Redshift              | soda-sql-redshift  |
| Apache Hive (Experimental)   | soda-sql-hive      |
| Apache Spark                 | soda-sql-spark     |
| GCP Big Query                | soda-sql-bigquery  |
| MS SQL Server (Experimental) | soda-sql-sqlserver |
| MySQL (Experimental)         | soda-sql-mysql     |
| PostgreSQL                   | soda-sql-postgresql|
| Snowflake                    | soda-sql-snowflake |
| Trino (Experimental)         | soda-sql-trino     |


Optionally, you can install Soda SQL in a virtual environment. Execute the following commands one by one:

```shell
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install soda-sql-yourdatasource
```

To deactivate the virtual environment, use the command: `deactivate`.

## Upgrade

To upgrade your existing Soda SQL tool to the latest version, use the following command replacing `soda-sql-athena` with the install package that matches the type of data source you are using.
```shell
pip install soda-sql-athena -U
```

## Troubleshoot

{% include troubleshoot-install.md %}

## Go further

* Next, [configure Soda SQL]({% link soda-sql/quick-start-soda-sql.md %}) to connect to your warehouse.
* Soda collects anonymous Soda SQL usage statistics. Learn more about the [information]({% link soda-sql/global-configuration.md %}) Soda collects.
* Learn [How Soda SQL works]({% link soda-sql/concepts.md %}).


<br />

---
*Last modified on {% last_modified_at %}*