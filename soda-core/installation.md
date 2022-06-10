---
layout: default
title: Install Soda Core
description: From your command-line interface, execute a pip install command to install Soda Core.
parent: Soda Core
---

# Install Soda Core ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"}

Soda Core is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
<br />

[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Go further](#go-further)<br />

## Compatibility

Use Soda Core to scan a variety of data sources.<br />

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br />  GCP Big Query<br /></td>
    <td>PostgreSQL<br /> Snowflake<br /> </td>
  </tr>
</table>


## Requirements

To use Soda Core, you must have installed the following on your system.

* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environement.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`

## Install

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

## Upgrade

To upgrade your existing Soda Core tool to the latest version, use the following command, replacing `soda-core-redshift` with the install package that matches the type of data source you are using.
```shell
pip install soda-core-redshift -U
```


## Go further

* Next: [Configure]({% link soda-core/configuration.md %}) your newly-installed Soda Core to connect to your data source.
* Consider completing the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) for a tutorial-style setup experience.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}