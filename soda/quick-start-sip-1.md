---
layout: default
title: Take a sip of Soda
description: Follow this tutorial to set up and run a simple Soda scan for data quality using example data.
parent: Get started
redirect_from:
- /soda/core-interactive-demo.html
- /soda/quick-start-soda-core.html
---

# Take a sip of Soda
*Last modified on {% last_modified_at %}*

Is Soda the data quality testing solution you've been looking for? 🥤Take a sip and see! <br />
Use the example data in this tutorial to set up and run a simple Soda scan for data quality.

[![sip-1](/assets/images/sip-1.png){:height="425px" width="425px"}](#soda-basics)<br />
[![sip-2](/assets/images/sip-2.png){:height="425px" width="425px"}](#tutorial-prerequisites)<br />
[![sip-3](/assets/images/sip-3.png){:height="425px" width="425px"}](#install-soda-from-the-command-line)<br />
[![sip-4](/assets/images/sip-4.png){:height="425px" width="425px"}](#build-an-example-data-source)<br />
[![sip-5](/assets/images/sip-5.png){:height="425px" width="425px"}](#connect-soda-to-the-data-source-and-a-platform-account)<br />
[![sip-6](/assets/images/sip-6.png){:height="425px" width="425px"}](#write-some-checks-and-run-a-scan)<br />
<br />

## Soda basics

{% include about-soda.md %}

## Tutorial prerequisites
<!--Linked to UI, access Shlink-->

To see Soda up and running locally in a few minutes, you need a few tools.

* You have installed <a href="https://www.python.org/downloads/" target="_blank">Python 3.8</a> or greater. 
* You have installed Pip 21.0 or greater.
* You have installed <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> and have access to <a href="https://github.com/" target="_blaak">GitHub </a> (to set up an example data source).

## Install Soda from the command line
<!--Linked to UI, access Shlink-->

This tutorial references a MacOS environment.

1. In your command-line interface, create a Soda project directory in your local environment, then navigate to the directory.
```shell
mkdir soda_sip
cd soda_sip
```
2. Best practice dictates that you install the Soda using a virtual environment. In your command-line interface, create a virtual environment in the `.venv` directory. 
```shell
python3 -m venv .venv
```
2. Activate the virtual environment, then update the version of pip.
```shell
source .venv/bin/activate
```
```shell
pip install --upgrade pip
```
3. Execute the following command to install the Soda package for PostgreSQL in your virtual environment. The example data is in a PostgreSQL data source, but there are 15+ data sources with which you can connect your own data beyond this tutorial.
```shell
pip install soda-core-postgres
```
4. Validate the installation using the `soda` command. The command-line output is similar to the following.
    ```shell
    Usage: soda [OPTIONS] COMMAND [ARGS]...

      Soda Core CLI version 3.0.XX

    Options:
      --version  Show the version and exit.
      --help     Show this message and exit.

    Commands:
      ingest           Ingests test results from a different tool
      scan             Runs a scan
      test-connection  Tests a connection
      update-dro       Updates contents of a distribution reference file
    ```

To exit the virtual environment when you are done with this tutorial, use the command `deactivate`.


## Build an example data source

To enable you to take a first sip of Soda, you can use Docker to quickly build an example PostgreSQL data source against which you can run scans for data quality. The example data source contains data for AdventureWorks, an imaginary online e-commerce organization. 

Access a quick view of the <a href="/assets/adventureworks_schema.png" target="_blank">AdventureWorks schema</a>.

1. Use GitHub to clone the <a href="https://github.com/sodadata/sip-of-soda" target="_blank">`sodadata/sip-of-soda`</a> repo locally. Use Terminal to navigate to the newly-cloned repo in your local environment.
2. If it is not already running in your local environment, start Docker.
3. In Terminal, run the following command to set up the prepared example data source.
```shell
docker-compose up
```
4. When the output reads `data system is ready to accept connections`, your data source is set up and you are ready to proceed.

<details>
  <summary style="color:#00BC7E">Troubleshoot</summary>
  <strong>Problem:</strong> When you run <code>docker-compose up</code> you get an error that reads <code>[17168] Failed to execute script docker-compose</code>.<br />
  <strong>Solution:</strong> Start Docker Desktop running.
  <br /><br />
  <strong>Problem:</strong> When you run <code>docker-compose up</code> you get an error that reads <code>Cannot start service soda-adventureworks: Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use</code>.<br />
  <strong>Solution:</strong> 
  <ol>
  <li>Execute the command <code>lsof -i tcp:5432</code> to print a list of PIDs using the port. </li>
  <li>Use the PID value to run the following command to free up the port: <code>kill -9 your_PID_value</code>. You many need to prepend the commands with <code>sudo </code>. </li>
  <li>Run <code>docker-compose up</code> again.</li>
  </ol>
</details>


## Connect Soda to the data source and a platform account
<!--Linked to UI, access Shlink-->

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This tutorial also instructs you to connect to a Soda platform account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, your Soda platform account gives you access to visualized scan results, tracks trends in data quality over time, lets you set alert notifications, and much more.

1. Create a new file called `configuration.yml` in your `soda_sip` directory. 
2. Open the `configuration.yml` file in a code editor, then copy and paste the following connection details into the file. These configuration details connect Soda to the example AdventureWorks data source you set up using Docker.
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
3. Next, add the following configuration that connects Soda to your platform account, leaving the values for the keys blank for a moment. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under the `data_source` syntax.
```yaml
soda_cloud:
  host: 
  api_key_id:
  api_key_secret:
```
3. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
4. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
  * Enter the value for `host` according to the region your Soda platform account uses: `cloud.soda.io` for EU region; `cloud.us.soda.io` for USA region.
5. Save the `configuration.yml` file and close the API modal in your Soda account.
6. In Terminal, run the following command to test Soda's connection to the data source.<br />
Command:
```shell
soda test-connection -d adventureworks -c configuration.yml
```
Output:
```shell
Soda Core 3.0.xx
Successfully connected to 'adventureworks'.
Connection 'adventureworks' is valid.
```


## Write some checks and run a scan

1. Create another file in the `soda_sip` directory called `checks.yml`. A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). 
2. Open the `checks.yml` file in your code editor, then copy and paste the following checks into the file. 
```yaml
checks for dim_customer:
  - invalid_count(email_address) = 0:
      valid format: email
      name: Ensure values are formatted as email addresses
  - missing_count(last_name) = 0:
      name: Ensure there are no null values in the Last Name column
  - duplicate_count(phone) = 0:
      name: No duplicate phone numbers
  - schema:
      warn:
        when schema changes: any
      name: Columns have not been added, removed, or changed
  - freshness(date_first_purchase) < 7d:
      name: Data in this dataset is less than 7 days old
```
    <details>
        <summary style="color:#00BC7E">What do these checks do?</summary>
        <ul>
          <li><strong>Ensure values are formatted as email addresses</strong> checks that all entries in the <code>email_address</code> column are formatted as <code>name@domain.extension</code>. See <a href="https://docs.soda.io/soda-cl/validity-metrics.html" target="_blank">Validity metrics</a>.</li>
          <li><strong>Ensure there are no null values in the Last Name column</strong> automatically checks for NULL values in the <code>last_name</code> column. See <a href="https://docs.soda.io/soda-cl/missing-metrics.html" target="_blank">Missing metrics</a>.</li>
          <li><strong>No duplicate phone numbers</strong> validates that each value in the <code>phone</code> column in unique. See <a href="https://docs.soda.io/soda-cl/numeric-metrics.html#list-of-numeric-metrics" target="_blank">Numeric metrics</a>.</li>
          <li><strong>Columns have not been added, removed, or changed</strong> compares the schema of the dataset to the last scan result to determine if any columns were added, deleted, changed data type, or changed index. The first time this check executes, the results show <code>[NOT EVALUATED]</code> because there are no previous values to which to compare current results. In other words, this check requires a minimum of two scans to evaluate properly. See <a href="https://docs.soda.io/soda-cl/schema.html" target="_blank">Schema checks</a>.</li>
          <li><strong>Data in this dataset is less than 7 days old</strong> confirms that the data in the dataset is less than seven days old. See <a href="https://docs.soda.io/soda-cl/freshness.html" target="_blank">Freshness checks</a>.</li>
        </ul>
    </details><br />
3. Save the changes to the `checks.yml` file, then, in Terminal, use the following command to run a scan. A scan is a CLI command which instructs Soda to prepare SQL queries that execute data quality checks on your data source. As input, the command requires:
* `-d` the name of the data source to scan
* `-c` the filepath and name of the `configuration.yml` file 
* the filepath and name of the `checks.yml` file<br /><br />
Command:
```shell
soda scan -d adventureworks -c configuration.yml checks.yml
```
Output:
```shell
Soda Core 3.0.xx
Sending failed row samples to Soda Cloud
Scan summary:
3/5 checks PASSED: 
    dim_customer in adventureworks
      No changes to schema [PASSED]
      Emails formatted correctly [PASSED]
      No null values for last name [PASSED]
2/5 checks FAILED: 
    dim_customer in adventureworks
      No duplicate phone numbers [FAILED]
        check_value: 715
      Data is fresh [FAILED]
        max_column_timestamp: 2014-01-28 23:59:59.999999
        max_column_timestamp_utc: 2014-01-28 23:59:59.999999+00:00
        now_variable_name: NOW
        now_timestamp: 2023-04-24T21:02:15.900007+00:00
        now_timestamp_utc: 2023-04-24 21:02:15.900007+00:00
        freshness: 3372 days, 21:02:15.900008
Oops! 2 failures. 0 warnings. 0 errors. 3 pass.
Sending results to Soda Cloud
Soda Cloud Trace: 4417******32502
```
4. As you can see from the output, some checks failed and Soda sent the results to your platform account. To access visualized check results and further examine the failed checks, return to your Soda account in your browser and click **Checks**. <br /> <br />
![quick-sip-results](/assets/images/quick-sip-results.png)<br /> <br />
5. In the table of check results Soda displays, you can click the line item for one of the checks that failed to examine the visualized results in a line graph, and to access the failed row samples that Soda automatically collected when it ran the scan and executed the checks.<br /><br />
Use the failed row samples, as in the example below, to determine what caused a data quality check to fail.
![quick-sip-results](/assets/images/quick-sip-failed-rows.png)<br /><br />

✨Well done!✨ You've taken the first step towards a future in which you and your colleagues can trust the quality and reliability of your data. Huzzah!

## Now what?
<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Experiment</h2>
                    <a href="/soda/quick-start-sodacl.html">SodaCL tutorial</a>                    
                    <a href="/soda-cl/metrics-and-checks.html">Study metrics and checks</a>
                    <a href="/soda-cl/compare.html">Compare data</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-new@2x.png" width="54" height="40">
                    <h2>Sip more Soda</h2>
                    <a href="/soda/integrate-slack.html" target="_blank">Integrate with Slack</a>
                    <a href="/soda-cloud/notif-rules.html">Add alert notification rules</a>
                    <a href="/soda/integrate-dbt.html">Integrate with dbt</a>
                    <a href="/api-docs/reporting-api-v1.html">Report on data health</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Choose your adventure</h2>
                    <a href="/soda/quick-start-dev.html">Test data during development</a>
                    <a href="/soda/quick-start-prod.html">Test data in your pipeline</a>
                    <a href="/soda/quick-start-end-user.html">Enable end-user testing</a>
                </div>
            </div>
        </div>
    </section>
</div>

If you are done with the example data, you can delete it from your account to start fresh with your own data.
1. Navigate to **your avatar** > **Scans & Data**.
2. In the **Data Sources** tab, click the stacked dots to the right of the `adventureworks` data source, then select **Delete Data Source**.
3. Follow the steps to confirm deletion. 
4. Connect to your own data by [configuring your data source connections]({% link soda-core/configuration.md %}) in your existing `configuration.yml` file.
5. Adjust your `checks.yml` to point to your own dataset in your data source, then adjust the checks to apply to your own data. Go ahead and run a scan!

## Need help?

* <a href="https://www.soda.io/schedule-a-demo" target="_blank">Request a demo</a>. Hey, what can Soda do for you?
* Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}


