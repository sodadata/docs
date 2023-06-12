---
layout: default
title: Install Soda Library
description: From your command-line interface, execute a pip install command to install Soda Library.
parent: Soda Library
redirect_from: 
- /soda-core/install-scientific.html
- /soda-core/get-started.html
- /soda-core/installation.hmtl
- /soda-core/migrate.html
---

# Install Soda Library 
*Last modified on {% last_modified_at %}*

Soda Library is a Python library and command-line interface (CLI) tool that enables Data Engineers to test the data in a data source to surface invalid, missing, or unexpected data. 

<br />

[Compatibility](#compatibility)<br />
[Requirements](#requirements)<br />
[Install](#install)<br />
[Upgrade](#upgrade)<br />
[Migrate from Soda Core](#migrate-from-soda-core)<br />
[Install Soda Scientific](#install-soda-scientific)<br />
[Uninstall](#uninstall)<br />
[Go further](#go-further)<br />

## Compatibility

Use Soda Library to scan a variety of data sources.<br />

{% include compatible-datasources.md %}

## Requirements

To use Soda Library, you must have installed the following on your system.

* Python 3.8 or greater. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`

## Install

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">MacOS, Linux</label>
  <label class="tab" id="two-tab" for="two">Windows</label>
  <label class="tab" id="three-tab" for="three">Docker</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

1. Best practice dictates that you install the Soda Library CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command.
```shell
python -m venv .venv
source .venv/bin/activate
```
2. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
3. Execute the following command, replacing `soda-postgres` with the install package that matches the type of data source you use to store data.
```shell
pip install -i https://pypi.soda.io soda-postgres
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | `soda-athena` |
| Amazon Redshift | `soda-redshift` | 
| Apache Spark DataFrames <br /> (For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only.) | `soda-spark-df` |
| Azure Synapse (Experimental) | `soda-sqlserver` |
| ClickHouse (Experimental) | `soda-mysql` |
| Dask and Pandas (Experimental)  | `soda-pandas-dask` |
| Databricks  | `soda-spark[databricks]` |
| Denodo (Experimental) | `soda-denodo` |
| Dremio | `soda-dremio` | 
| DuckDB (Experimental)  | `soda-duckdb` |
| GCP Big Query | `soda-bigquery` | 
| IBM DB2 | `soda-db2` |
| Local file | Use Dask. |
| MS SQL Server | `soda-sqlserver` |
| MySQL | `soda-mysql` |
| OracleDB | `soda-oracle` |
| PostgreSQL | `soda-postgres` |
| Snowflake | `soda-snowflake` | 
| Trino | `soda-trino` |
| Vertica (Experimental) | `soda-vertica` |


To deactivate the virtual environment, use the following command:
```shell
deactivate
```


  </div>
  <div class="panel" id="two-panel" markdown="1">

1. Best practice dictates that you install the Soda Library CLI using a virtual environment. In your command-line interface tool, create a virtual environment in the `.venv` directory using the commands below. Depending on your version of Python, you may need to replace `python` with `python3` in the first command. Reference the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.
```shell
python -m venv .venv
.venv\Scripts\activate
```
2. Upgrade pip inside your new virtual environment.
```shell
pip install --upgrade pip
```
3. Execute the following command, replacing `soda-postgres` with the install package that matches the type of data source you use to store data.
```shell
pip install -i https://pypi.soda.io soda-postgres
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | `soda-athena` |
| Amazon Redshift | `soda-redshift` | 
| Apache Spark DataFrame <br /> (For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only.) | `soda-spark-df` |
| Azure Synapse (Experimental) | `soda-sqlserver` |
| ClickHouse (Experimental) | `soda-mysql` |
| Dask and Pandas (Experimental)  | `soda-pandas-dask` |
| Databricks  | `soda-spark[databricks]` |
| Denodo (Experimental) | `soda-denodo` |
| Dremio | `soda-dremio` | 
| DuckDB (Experimental) | `soda-duckdb` |
| GCP Big Query | `soda-bigquery` | 
| IBM DB2 | `soda-db2` |
| MS SQL Server | `soda-sqlserver` |
| MySQL | `soda-mysql` |
| OracleDB | `soda-oracle` |
| PostgreSQL | `soda-postgres` |
| Snowflake | `soda-snowflake` | 
| Trino | `soda-trino` |
| Vertica (Experimental) | `soda-vertica` |

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

Reference the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.


  </div>
  <div class="panel" id="three-panel" markdown="1">

{% include docker-soda-library.md %}

  </div>
  </div>
</div>

<br />

## Upgrade

To upgrade your existing Soda Library tool to the latest version, use the following command, replacing `redshift` with the install package that matches the type of data source you are using.
```shell
pip install -i https://pypi.soda.io soda-redshift -U
```

## Migrate from Soda Core

Soda Core, the free, open-source Python library and CLI tool upon which Soda Library is built, continues to exist as an OSS project in <a href="https://github.com/sodadata/soda-core" target="_blank">GitHub</a>. Going forward, Soda Core does not support connecting to Soda Cloud or any of the checks or features that require Soda Cloud. 

To migrate from an existing Soda Core installation to Soda Library, simply uninstall the old and install the new from the command-line. 

1. Uninstall your existing Soda Core package using the following command; replace `postgres` with the data source-specific package that you use.
```shell
pip uninstall soda-core-postgres
```
2. Install a Soda Library package that corresponds to your data source. Your new package automatically comes with a 45-day free trial. Our Soda team will contact you with licensing options after the trial period.
```shell
pip install -i https://pypi.soda.io soda-postgres
```
3. If you had connected Soda Core to Soda Cloud, you do not need to change anything for Soda Library to work with your Soda Cloud account. <br /> If you had not connected Soda Core to Soda Cloud, you need to connect Soda Library to Soda Cloud. Soda Library requires API keys to validate licensing or trial status and run scans for data quality. See [Configure Soda Library]({% link soda-library/configure.md %}) for instructions.
4. You *do not need* to adjust your existing `configuration.yml` or `checks.yml` files which will continue to work as before.

## Install Soda Scientific

Install Soda Scientific to be able to use SodaCL [distribution checks]({% link soda-cl/distribution.md %}) or [anomaly score checks]({% link soda-cl/anomaly-score.md %}).

You have two installation options to choose from:
* [Install Soda Scientific in a virtual environment (Recommended)](#install-soda-scientific-in-a-virtual-environment-recommended)
* [Use Docker to run Soda Library with Soda Scientific](#use-docker-to-run-soda-scientific)

### Install Soda Scientific in a virtual environment (Recommended)

{% include install-soda-scientific.md %}

<br />

#### Error: Library not loaded

{% include troubleshoot-anomaly-check-tbb.md %}

### Use Docker to run Soda Scientific

{% include docker-soda-library.md %}

## Uninstall

1. (Optional) From the command-line, run the following command to determine which Soda packages exist in your environment.
```shell
pip freeze | grep soda
```
2. (Optional) Run the following command to uninstall a specific Soda package from your environment.
```shell
pip uninstall soda-postgres
```
3. Run the following command to uninstall all Soda packages from your environment, completely.
```shell
pip freeze | grep soda | xargs pip uninstall -y
```

## Go further

* Next: [Configure]({% link soda-library/configure.md %}) your newly-installed Soda Library to connect to your data source and your Soda Cloud account.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
