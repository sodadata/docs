---
layout: default
title: Get started
description: 
sidebar: core
parent: Soda Core
---

# Get started

Soda Core is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.

## Requirements

To use the Soda Core CLI, you must have installed the following on your system.

* Python 3.7 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version`
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`



## Install the Soda Core CLI

Best practice dictates that you install the Soda Core CLI using a virtual environment.

1. In your command-line interface tool, create a virtual environment in the `.venv` directory.
```shell
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```
2. Execute the following command, replacing `soda-core-postgresql` with the install package that matches the type of data source you use to store data.
```shell
pip install soda-core-postgresql
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Redshift | soda-core-redshift | 
| GCP Big Query | soda-core-bigquery | 
| PostgreSQL | soda-core-postgresql |
| Snowflake | soda-core-snowflake | 

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

## Upgrade the Soda Core CLI

To upgrade your existing Soda Core tool to the latest version, use the following command, replacing `soda-core-redshift` with the install package that matches the type of data source you are using.
```shell
pip install soda-core-redshift -U
```

Next, [run your first scan]({% link soda-core/first-scan.md %}).

---
{% include docs-core-footer.md %}