---
layout: default
title: Soda Set up guide
description: TBD
parent: Get Started
redirect_from: /soda-core/community.html
---

# Soda set up guide
*Last modified on {% last_modified_at %}*

## Quick install

simplest/quickest way to scan results
POC, test things out, see it in action --> Take a sip

## Setup overview

1. Choose a flavour of Soda: AGENT vs. NO AGENT
2. Get a Soda account.
3. Deploy a Soda Agent or install Soda Library (or neither if invoking programmatically)
3. Connect to data sources: DATA SOURCE vs. CONFIGURATION YML
4. Write checks. AGREEMENT vs. CHECKS YML
5. Run a scan.  SCAN DEF vs. MANUAL vs. PROGRAMMATIC

## Choose a flavor of Soda

Guide to right fit installation model for them; 
AGENT vs. AGENT-LESS
include diagrams

Help them with example use cases to decide which model
Matrix this info somehow
* data migration
* data testing in development
* data testing in a pipeline for circuit breaking
* self-serve analytics, or for governance like for a data steward
* data as a product (like HF)
* starting from scratch, need data profiling and monitoring

Reference use case setuo guides 
* Take a sip <-- POC  NO AGENT
* Test in a pipeline  NO AGENT
* Test during development with GH Action  NO AGENT
* Self-serve data quality  AGENT
* Automated data quality monitoring AGENT
* Cloud data migration  EITHER
* Data as a product  AGENT
* Invoke in a Databricks Notebook  NO AGENT

why do I need Soda Cloud?
    <details>
        <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
    To validate your account license or free trial, the Soda Library Docker image that the GitHub Action uses to execute scans must communicate with a Soda Cloud account via API keys. <br />Create <a href="https://go.soda.io/api-keys" target="_blank">new API keys</a> in your Soda Cloud account, then use them to configure the connection between the Soda Library Docker image and your account in step 4 of this procedure. <br /><br />
    </details>

Options:
* set up SSO
* use a a PrivateLink
* invite others, and why
* reporting API


## Set up Soda using a Soda Agent

Start with Soda Cloud sign up
short version of Agent install that doesn’t include how to set up a K8s cluster; refer to more extensive agent docs..?
generate API keys
### Add a data source
To run [scans]({% link soda/glossary.md %}#scan) for data quality in your [data source]({% link soda/glossary.md %}#data-source) such as PostgreSQL or GCP BigQuery, you must first connect Soda Cloud to a data source. 

In setting up a data source, you provide details such as database access credentials, details about the frequency with which Soda Cloud runs scans on this data source, and how much profile information Soda Cloud fetches about the datasets in your data source. 

[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Add a new data source](#add-a-new-data-source)<br />
[Use a file reference for a Big Query data source connection](#use-a-file-reference-for-a-big-query-data-source-connection)<br />
[Go further](#go-further)<br />
<br />

## Compatibility

You can connect Soda Cloud with the following data sources via a [Soda Agent]({% link soda-agent/basics.md %}):

{% include compatible-cloud-datasources.md %}

<br />
Soda Cloud can, however, accept scan results from Soda Library for the following data sources:

{% include compatible-datasources.md %}


## Prerequisites
* You have created a <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">Soda Cloud account</a>.
* You, or an IT Administrator in your organization, has deployed a [Soda Agent]({% link soda-agent/deploy.md %}) in an Kubernetes cluster in a cloud services environment and connected it to your Soda Cloud account.


## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Scans & Data**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

#### 1. Attributes

| Field or Label | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the [data source]({% link soda/glossary.md %}#data-source). Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Definition Label | Provide a name for the default scan definition. A collection of [checks YAML]({% link soda/glossary.md %}#checks-yaml) files that contain the checks for data quality you wish to scan at a specific time, including details for which Soda Agent to use to connect to which data source.  |
| Default Scan Definition Agent | Select the name of a Soda Agent that you have previously set up in your secure environment and connected to a specific data source. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Schedule Definition | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At | Select the time of day to run the scan. The default value is midnight. |
| Time Zone | Select a timezone. The default value is UTC. |
| Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |

<br />

#### 2. Connect the Data Source

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

To more securely provide sensitive values such as usernames and passwords, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials]({% link soda-agent/deploy.md %}#use-environment-variables-for-data-source-connection-credentials) for details.

Access the data source-specific connection configurations listed below to copy+paste the connection syntax into the editing panel, then adjust the values to correspond with your data source's details. Access connection configuration details in [Connect a data source]({% link soda/connect-athena.md %}) section of Soda documentation.
 
<br />

#### 3. Discover Datasets

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset's schema and the columns it contains.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. See [Display profile information in Soda Cloud]({% link soda-cl/profile.md %}#limitations-and-known-issues) for more detail on profiling syntax.

*Known issue:* SodaCL does not support using [variables]({% link soda-cl/filters.md %}#configure-variables-in-sodacl) in column profiling and dataset discovery configurations. <!--SAS-1642-->

{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

#### 4. Profile datasets

To gather more detailed profile information about datasets in your data source, you can configure Soda Cloud to profile the columns in datasets. 

Column profile information includes details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character. See [Display profile information in Soda Cloud]({% link soda-cl/profile.md %}#limitations-and-known-issues) for more detail on profiling syntax.

Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

<br />

#### 5. Check Datasets

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly score]({% link soda-cl/anomaly-score.md %}) and [schema]({% link soda-cl/schema.md %}) checks, respectively.

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

#### 6. Assign Owner

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Schedule. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Roles and Rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) to learn how to adjust the Dataset Owner of individual datasets.|


## Use a file reference for a Big Query data source connection

If you already store information about your data source in a JSON file in a secure location, you can configure your BigQuery data source connection details in Soda Cloud to refer to the JSON file for service account information. To do so, you must add two elements:
* `volumes` and `volumeMounts` parameters in the `values.yml` file that your Soda Agent helm chart uses
* the `account_info_json_path` in your data source connection configuration 

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deployment and redployment in your Kubernetes cluster. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy-google.md %}#deploy-using-a-values-yaml-file) for details.
{% include code-header.html %}
```yaml
soda:
  scanlauncher:
    volumeMounts:
      - name: gcloud-credentials
        mountPath: /opt/soda/etc
    volumes:
      - name: gcloud-credentials
        secret:
          secretName: gcloud-credentials
          items:
            - key: serviceaccount.json
              path: serviceaccount.json
```

Use the following command to add the service account information to a Kubernetes secret that the Soda Agent consumes according to the configuration above.
```shell
kubectl create secret -n <soda-agent-namespace> gcloud-credentials --from-file=serviceaccount.json=<local path to the serviceccount.json>
```

After you make both of these changes, you must redeploy the Soda Agent. Refer to [Deploy using a values YAML file]({% link soda-agent/deploy-google.md %}#deploy-using-a-values-yaml-file) for details.   

Adjust the data source connection configuration to include the `account_info_json_path` configuration, as per the following example.
{% include code-header.html %} 
```yaml
my_datasource_name:
  type: bigquery
  connection:
    account_info_json_path: /opt/soda/etc/serviceaccount.json
    auth_scopes:
    - https://www.googleapis.com/auth/bigquery
    - https://www.googleapis.com/auth/cloud-platform
    - https://www.googleapis.com/auth/drive
    project_id: ***
    dataset: sodacore
```


## Set up Soda using Soda Library

Start with Soda Cloud sign up
Soda Library is a Python library and command-line interface (CLI) tool that enables Data Engineers to test the data in a data source to surface invalid, missing, or unexpected data. 

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
pip install -i https://pypi.cloud.soda.io soda-postgres
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
| Google CloudSQL | `soda-postgres` |
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
pip install -i https://pypi.cloud.soda.io soda-postgres
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
| Google CloudSQL | `soda-postgres` |
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

### Upgrade

To upgrade your existing Soda Library tool to the latest version, use the following command, replacing `redshift` with the install package that matches the type of data source you are using.
```shell
pip install -i https://pypi.cloud.soda.io soda-redshift -U
```

### Migrate from Soda Core

Soda Core, the free, open-source Python library and CLI tool upon which Soda Library is built, continues to exist as an OSS project in <a href="https://github.com/sodadata/soda-core" target="_blank">GitHub</a>. To migrate from an existing Soda Core installation to Soda Library, simply uninstall the old and install the new from the command-line. 

1. Uninstall your existing Soda Core packages using the following command.
```shell
pip freeze | grep soda | xargs pip uninstall -y
```
2. Install a Soda Library package that corresponds to your data source. Your new package automatically comes with a 45-day free trial. Our Soda team will contact you with licensing options after the trial period.
```shell
pip install -i https://pypi.cloud.soda.io soda-postgres
```
3. If you had connected Soda Core to Soda Cloud, you do not need to change anything for Soda Library to work with your Soda Cloud account. <br /> If you had not connected Soda Core to Soda Cloud, you need to connect Soda Library to Soda Cloud. Soda Library requires API keys to validate licensing or trial status and run scans for data quality. See [Configure Soda Library]({% link soda-library/configure.md %}) for instructions.
4. You *do not need* to adjust your existing `configuration.yml` or `checks.yml` files which will continue to work as before.

### Install Soda Scientific

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

### Uninstall

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

### Connect to data source via configuration YAML
After you [install Soda Library]({% link soda-library/install.md %}), you must create a `configuration.yml` to provide details for Soda Library to:
* connect your data source (except Apache Spark DataFrames, which does not use a configuration YAML file)
* connect to your Soda Cloud account with API keys; Soda Library requires API keys to validate licensing or trial status and run scans for data quality. 

Alternatively, you can provide data source connection configurations in the context of a [programmatic scan]({% link soda-library/programmatic.md %}), if you wish.

Consider following the [Take a sip of Soda]({% link soda/quick-start-sip.md %}) quick start that guides you through the steps to configure Soda Library and run a scan of sample data.

1. Soda Library connects with Spark DataFrames in a unique way, using programmtic scans.
* If you are using Spark DataFrames, follow the configuration details in [Connect to Apache Spark DataFrames](#connect-to-apache-spark-dataframes).
* If you are *not* using Spark DataFrames, continue to step 2.
2. Create a `configuration.yml` file. This file stores connection details for your data sources and your Soda Cloud account. Use the data source-specific connection configurations [details]({% link soda/connect-athena.md %}) to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source's details, as in the following example for PostgreSQL. <br />You can use [system variables](#provide-credentials-as-system-variables) to pass sensitive values, if you wish.
```yaml
    data_source adventureworks:
      type: postgres
      connection:
        host: localhost
        username: postgres
        password: secret
      database: postgres
      schema: public
```
3. In a browser, navigate to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
4. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. Copy+paste the `soda_cloud` configuration syntax, including the API keys, into the `configuration.yml` file, as in the example below. <br />
* *Do not* nest the `soda_cloud` configuration under the `datasource` configuration.
* For `host`, use `cloud.soda.io` for EU region; use `cloud.us.soda.io` for USA region, according to your selection when you created your Soda Cloud account.
* Optionally, provide a value for the `scheme` property to indicate which scheme to use to initialize the URI instance. If you do not explicitly include a `scheme` property, Soda uses the default `https`.
    ```yaml
        soda_cloud:
          host: cloud.soda.io
          api_key_id: 2e0ba0cb-**7b
          api_key_secret: 5wdx**aGuRg
          scheme:
    ```
5. Save the `configuration.yml` file, then, in the same directory, create another new YAML file named `checks.yml`. 



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
  connection:
    host: soda-temp-demo
    port: '5432'
    username: sodademo
    password: ${POSTGRES_PASSWORD}
    database: postgres
    schema: public
```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to your data source without issue.
```shell
soda scan -d your_datasource -c configuration.yml checks.yml
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
      connection:
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
soda scan -d your_datasource -c configuration.yml checks.yml
```


## Configure the same scan to run in multiple environments

{% include scan-multiple-envs.md %}

## Disable failed rows samples for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your configuration YAML file to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).


## Disable failed row samples for individual checks

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can set the `samples limit` to `0` to prevent Soda from collecting failed rows samples (and sending the samples to Soda Cloud) for an individual check, as in the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 0
```
<br />


Next step options:
- write checks
- what can I do with soda?
- organize datasets with metadata
- start a migration project
- start collaborating with end-users
- and more



---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No" popup_disabled="true"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}