---
layout: default
title: Get started
description: Install Soda Core (Beta), a CLI tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
sidebar: core
parent: Soda Core (Beta)
---

# Get started ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Soda Core is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.

[Requirements](#requirements)<br />
[Install the Soda Core CLI](#install-the-soda-core-cli)<br />
[Upgrade the Soda Core CLI](#upgrade-the-sore-core-cli)<br />
<br />

## Requirements

To use the Soda Core CLI, you must have installed the following on your system.

* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environement.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`



## Install the Soda Core CLI

1. Best practice dictates that you install the Soda Core CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.
```shell
python -m venv .venv
source .venv/bin/activate
```
2. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
3. Execute the following command, replacing `soda-core-postgres` with the install package that matches the type of data source you use to store data.
```shell
pip install soda-core-postgres
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | soda-core-athena |
| Amazon Redshift | soda-core-redshift | 
| GCP Big Query | soda-core-bigquery | 
| PostgreSQL | soda-core-postgres |
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