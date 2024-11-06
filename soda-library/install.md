---
layout: default
title: Install Soda Library
description: From your command-line interface, execute a pip install command to install Soda Library in your environment.
parent: Get started
redirect_from: 
- /soda-core/install-scientific.html
- /soda-core/get-started.html
- /soda-core/installation.hmtl
- /soda-core/migrate.html
- /soda-library/overview.html
- /soda-library/configure.html
---

# Install Soda Library 
*Last modified on {% last_modified_at %}*

Soda Library is a Python library and command-line interface (CLI) tool that enables Data Engineers to test the data in a data source to surface invalid, missing, or unexpected data. 

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [self-operated deployment model]({% link soda/setup-guide.md %}#self-operated).

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda: self-operated** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Review requirements](#requirements)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Install Soda Library](#install-soda-library-1)<br />
&nbsp;&nbsp;&nbsp;&nbsp; c. [Configure Soda](#configure-soda)<br />
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate

💡 **TL;DR:** Follow a [15-min tutorial]({% link soda/quick-start-sip.md %}) to set up and run Soda with example data.

<br />


## Requirements

To use Soda Library, you must have installed the following on your system.

* Python 3.8, 3.9, or 3.10. To check your existing version, use the CLI command: `python --version` or `python3 --version` <br /> 
If you have not already installed Python, consider using <a href="https://github.com/pyenv/pyenv/wiki" target="_blank">pyenv</a> to manage multiple versions of Python in your environment.
* Pip 21.0 or greater. To check your existing version, use the CLI command: `pip --version`
* A Soda Cloud account; see next section.

{% include python-versions.md %}

## Create a Soda Cloud account

1. In a browser, navigate to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in. 
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. 
3. Copy+paste the API key values to a temporary, secure place in your local environment.

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <br /><a href="https://docs.soda.io/soda/get-started-roadmap.html#about-soda">Learn more</a><br /><br />
</details>

## Install Soda Library

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <input class="radio" id="four" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">MacOS, Linux</label>
  <label class="tab" id="two-tab" for="two">Windows</label>
  <label class="tab" id="three-tab" for="three">Docker</label>
  <label class="tab" id="four-tab" for="four">Soda Scientific</label>
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
# For bash interactive shell
pip install -i https://pypi.cloud.soda.io soda-postgres
# For zsh interactive shell
pip install -i https://pypi.cloud.soda.io "soda-postgres"
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | `soda-athena` |
| Amazon Redshift | `soda-redshift` | 
| Apache Spark DataFrames <br /> (For use with programmatic Soda scans, only.) | `soda-spark-df` |
| Azure Synapse  | `soda-sqlserver` |
| ClickHouse  | `soda-mysql` |
| Dask and Pandas   | `soda-pandas-dask` |
| Databricks  | `soda-spark[databricks]` |
| Denodo  | `soda-denodo` |
| Dremio | `soda-dremio` | 
| DuckDB   | `soda-duckdb` |
| GCP BigQuery | `soda-bigquery` | 
| Google CloudSQL | `soda-postgres` |
| IBM DB2 | `soda-db2` |
| Local file | Use Dask. |
| MotherDuck | `soda-duckdb` |
| MS SQL Server | `soda-sqlserver` |
| MySQL | `soda-mysql` |
| OracleDB | `soda-oracle` |
| PostgreSQL | `soda-postgres` |
| Presto | `soda-presto` |
| Snowflake | `soda-snowflake` | 
| Trino | `soda-trino` |
| Vertica  | `soda-vertica` |


To deactivate the virtual environment, use the following command:
```shell
deactivate
```

{% include pydantic-version.md %}

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
pip install -i https://pypi.cloud.soda.io soda-postgres
```

| Data source | Install package | 
| ----------- | --------------- | 
| Amazon Athena | `soda-athena` |
| Amazon Redshift | `soda-redshift` | 
| Apache Spark DataFrame <br /> (For use with programmatic Soda scans, only.) | `soda-spark-df` |
| Azure Synapse  | `soda-sqlserver` |
| ClickHouse  | `soda-mysql` |
| Dask and Pandas   | `soda-pandas-dask` |
| Databricks  | `soda-spark[databricks]` |
| Denodo  | `soda-denodo` |
| Dremio | `soda-dremio` | 
| DuckDB  | `soda-duckdb` |
| GCP BigQuery | `soda-bigquery` | 
| Google CloudSQL | `soda-postgres` |
| IBM DB2 | `soda-db2` |
| MS SQL Server | `soda-sqlserver` |
| MySQL | `soda-mysql` |
| OracleDB | `soda-oracle` |
| PostgreSQL | `soda-postgres` |
| Snowflake | `soda-snowflake` | 
| Trino | `soda-trino` |
| Vertica  | `soda-vertica` |

To deactivate the virtual environment, use the following command:
```shell
deactivate
```

Reference the <a href="https://virtualenv.pypa.io/en/legacy/userguide.html#activate-script" target="_blank">virtualenv documentation</a> for activating a Windows script.

{% include pydantic-version.md %}

  </div>
  <div class="panel" id="three-panel" markdown="1">

{% include docker-soda-library.md %}

  </div>
  <div class="panel" id="four-panel" markdown="1">

Install Soda Scientific to be able to use SodaCL [distribution checks]({% link soda-cl/distribution.md %}) or [anomaly detection checks]({% link soda-cl/anomaly-detection.md %}).

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
 

  </div>

  </div>
</div>

<br />


## Configure Soda

1. Soda Library connects with Spark DataFrames in a unique way, using programmtic scans.
* If you are using Spark DataFrames, follow the configuration details in [Connect to Spark]({% link soda/connect-spark.md %}).
* If you are *not* using Spark DataFrames, continue to step 2.
2. In the same directory and environment in which you installed Soda Library, use a code editor to create a new `configuration.yml` file. This file stores connection details for your data sources and your Soda Cloud account. <br />Use the data source-specific connection configurations (see: [Data source reference]({% link soda/connect-athena.md %})) to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source's details, as in the following example for PostgreSQL. 
* You can use [system variables](#provide-credentials-as-system-variables) to pass sensitive values, if you wish.
* If you want to run scans on multiple schemas in the data source, add one data source config block per schema.
```yaml
    data_source my_datasource:
      type: postgres
      host: localhost
      username: postgres
      password: secret
      database: postgres
      schema: public
```
3. Copy+paste the following `soda_cloud` configuration syntax into the `configuration.yml` file, as in the example below. Input the API key values you created in Soda CLoud.<br />
* *Do not* nest the `soda_cloud` configuration under the `datasource` configuration.
* For `host`, use `cloud.soda.io` for EU region; use `cloud.us.soda.io` for USA region, according to your selection when you created your Soda Cloud account.
* Optionally, provide a value for the `scheme` property to indicate which scheme to use to initialize the URI instance. If you do not explicitly include a `scheme` property, Soda uses the default `https`.
    ```yaml
        soda_cloud:
          # Use cloud.soda.io for EU region
          # Use cloud.us.soda.io for US region
          host: https://cloud.soda.io
          api_key_id: 2e0ba0cb-your-api-key-7b
          api_key_secret: 5wd-your-api-key-secret-aGuRg
          scheme:
    ```
5. Save the `configuration.yml` file. Run the following scan to confirm that Soda can successfully connect with your data source.
```shell
soda test-connection -d my_datasource -c configuration.yml
```


## Provide credentials as system variables

If you wish, you can provide data source login credentials or any of the properties in the configuration YAML file as system variables instead of storing the values directly in the file. System variables persist only for as long as you have the terminal session open in which you created the variable. For a longer-term solution, consider using permanent environment variables stored in your `~/.bash_profile` or `~/.zprofile` files.

### For connection configuration values

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.
```shell
export POSTGRES_PASSWORD=1234
```
2. Test that the system retrieves the value that you set by running an `echo` command.
```shell
echo $POSTGRES_PASSWORD
```
3. In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.
```yaml
data_source my_database_name:
  type: postgres
  host: soda-temp-demo
  port: '5432'
  username: sodademo
  password: ${POSTGRES_PASSWORD}
  database: postgres
  schema: public
```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to your data source without issue.
```shell
soda test-connection -d my_datasource -c configuration.yml
```

### For API key values

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.
```shell
export API_KEY=1234
```
2. Test that the system retrieves the value that you set by running an `echo` command.
```shell
echo $API_KEY
```
3. In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.
    ```yaml
    data_source my_database_name:
      type: postgres
      host: soda-temp-demo
      port: '5432'
      username: sodademo
      password: ${POSTGRES_PASSWORD}
      database: postgres
      schema: public
    
    soda_cloud:
      host: cloud.soda.io
      api_key_id: ${API_KEY}
      api_key_secret: ${API_SECRET}
    ```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to Soda Cloud without issue.
```shell
soda test-connection -d my_datasource -c configuration.yml
```


## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: self-operated</font></s> 
3. **[Write SodaCL checks]({% link soda-cl/soda-cl-overview.md %})**
4. Run scans and review results
5. Organize, alert, investigate


Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

<script>
  var hash = window.location.hash;
  if (hash) {
    document.querySelector("#" + document.querySelector(hash).parentElement.id.split("-")[0]+"-tab").click();
    document.querySelector(hash).scrollIntoView();
  }
</script>

Was this documentation helpful?

{% include like-widget.md %}

{% include docs-footer.md %}
