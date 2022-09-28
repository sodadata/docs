---
layout: default
title: Install Soda Core
description: From your command-line interface, execute a pip install command to install Soda Core.
parent: Soda Core
redirect_from: 
- /soda-core/install-scientific.html
- /soda-core/get-started.html
---

# Install Soda Core 

Soda Core is a command-line interface (CLI) tool that enables you to scan the data in your data source to surface invalid, missing, or unexpected data.
<br />

[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Use Docker to run Soda Core](#use-docker-to-run-soda-core)<br />
[Install Soda Core Scientific](#install-soda-core-scientific)<br />
[Go further](#go-further)<br />

## Compatibility

Use Soda Core to scan a variety of data sources.<br />

{% include compatible-datasources.md %}

## Requirements

To use Soda Core, you must have installed the following on your system.

* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`

## Install

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">MacOS, Linux</label>
  <label class="tab" id="two-tab" for="two">Windows</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

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
| Apache Spark DataFrame <br /> (For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.) | soda-core-spark-df |
| Apache Spark for Databricks SQL  | soda-core-spark[databricks] |
| GCP Big Query | soda-core-bigquery | 
| IBM DB2 | soda-core-db2 |
| MS SQL Server | soda-core-sqlserver |
| MySQL | soda-core-mysql |
| PostgreSQL | soda-core-postgres |
| Snowflake | soda-core-snowflake | 
| Trino | soda-core-trino |


To deactivate the virtual environment, use the following command:
```shell
deactivate
```


  </div>
  <div class="panel" id="two-panel" markdown="1">

1. Best practice dictates that you install the Soda Core CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command. Reference the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.
```shell
python -m venv .venv
.venv\Scripts\activate
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
| Apache Spark DataFrame <br /> (For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.) | soda-core-spark-df |
| Apache Spark for Databricks SQL  | soda-core-spark[databricks] |
| GCP Big Query | soda-core-bigquery | 
| IBM DB2 | soda-core-db2 |
| MS SQL Server | soda-core-sqlserver |
| MySQL | soda-core-mysql |
| PostgreSQL | soda-core-postgres |
| Snowflake | soda-core-snowflake | 
| Trino | soda-core-trino |


To deactivate the virtual environment, use the following command:
```shell
deactivate
```

Reference the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.

  </div>
  </div>
</div>

<br />

## Upgrade

{% include upgrade-core.md %}

## Use Docker to run Soda Core

{% include docker-soda-core.md %}

## Install Soda Core Scientific

Install Soda Core Scientific to be able to use SodaCL [distribution checks]({% link soda-cl/distribution.md %}) or [anomaly score checks]({% link soda-cl/anomaly-score.md %}).

You have three installation options to choose from:
* [Install Soda Core Scientific in a virtual environment (Recommended)](#install-soda-core-scientific-in-a-virtual-environment-recommended)
* [Use Docker to run Soda Core with Soda Scientific](#use-docker-to-run-soda-core-scientific)
* [Install Soda Core Scientific locally](#install-soda-core-scientific-locally)

## Install Soda Core Scientific in a virtual environment (Recommended)

{% include install-soda-core-scientific.md %}

## Use Docker to run Soda Core Scientific

{% include docker-soda-core.md %}

## Install Soda Core Scientific locally

{% include install-local-soda-core-scientific.md %}


## Go further

* Next: [Configure]({% link soda-core/configuration.md %}) your newly-installed Soda Core to connect to your data source.
* Consider completing the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) for a tutorial-style setup experience.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}