---
layout: default
title: Take a sip of Soda
description: Follow this tutorial to set up and run a simple Soda scan for data quality using example data.
parent: Get started
redirect_from:
- /soda/core-interactive-demo.html
- /soda/quick-start-soda-core.html
---

# Take a sip of Soda ![SodaCan@0.5x](/assets/images/SodaCan@0.5x.png){:width="25px"}
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Is Soda the data quality testing solution you've been looking for? Take a sip and see! <br />
Use the example data in this tutorial to set up and run a simple Soda scan for data quality.

[Set up Soda](#install-soda-from-the-command-line)| 2 minutes<br />
[Build an example data source](#build-an-example-data-source) | 2 minutes<br />
[Connect Soda to the data source](#connect-soda-to-the-data-source-and-a-soda-cloud-account) | 5 minutes<br />
[Write checks and run a scan](#write-some-checks-and-run-a-scan) | 5 minutes<br />
<br />


## Set up Soda
<!--Linked to UI, access Shlink-->

This tutorial references a MacOS environment.

1. Check the following prerequisites:
* You have installed <a href="https://www.python.org/downloads/" target="_blank">Python 3.8</a> or greater. 
* You have installed Pip 21.0 or greater.
* (Optional) You have installed <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> and have access to <a href="https://github.com/" target="_blaak">GitHub </a>, to set up an example data source.
2. Visit <a href="https://cloud.soda.io/signup" target="_blank">https://cloud.soda.io/signup</a> to sign up for a Soda Cloud account which is free for a 45-day trial.<br />
    <details>
        <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
    To validate your account license or free trial, the Soda Library you are about to install must communicate with a Soda Cloud account via API keys. <br />You create these API keys in your Soda Cloud account, then use them to configure the connection between Soda Library and your account later in this tutorial. <a href="https://docs.soda.io/soda/about.html">Learn more</a>.<br /><br />
    </details>
3. In your command-line interface, create a Soda project directory in your local environment, then navigate to the directory.
```shell
mkdir soda_sip
cd soda_sip
```
3. Best practice dictates that you install the Soda using a virtual environment. In your command-line interface, create a virtual environment in the `.venv` directory, then activate the environment. 
```shell
python3 -m venv .venv
source .venv/bin/activate
```
3. Execute the following command to install the Soda package for PostgreSQL in your virtual environment. The example data is in a PostgreSQL data source, but there are 15+ data sources with which you can connect your own data beyond this tutorial.
```shell
pip install -i https://pypi.cloud.soda.io soda-postgres
```
4. Validate the installation.
    ```shell
soda --help
    ```

To exit the virtual environment when you are done with this tutorial, use the command `deactivate`.


## Build an example data source

To enable you to take a first sip of Soda, you can use Docker to quickly build an example PostgreSQL data source against which you can run scans for data quality. The example data source contains data for AdventureWorks, an imaginary online e-commerce organization. 
* (Optional) Access the <a href="https://github.com/sodadata/sip-of-soda" target="_blank">`sodadata/sip-of-soda`</a> repository in GitHub.
* (Optional) Access a quick view of the <a href="/assets/adventureworks_schema.png" target="_blank">AdventureWorks schema</a>.

1. Open a new tab in Terminal. 
2. If it is not already running, start Docker Desktop. 
3. Run the following command in Terminal to set up the prepared example data source.
{% include code-header.html %}
```shell
docker run \
 --name sip-of-soda \
 -p 5432:5432 \
 -e POSTGRES_PASSWORD=secret \
 sodadata/soda-adventureworks
```

When the output reads `data system is ready to accept connections`, your data source is set up and you are ready to proceed. 

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
  <li>Run the <code>docker run</code> command again.</li>
  </ol>
</details>

Alternatively, you can use your own data for this tutorial. To do so:
1. Skip the steps above involving Docker.
2. Install the Soda Library package that corresponds with your data source, such as `soda-bigquery`, `soda-athena`, etc. See full list.
2. Collect your data source's login credentials that you must provide to Soda so that it can scan your data for quality.
3. Move on to [Connect Soda](#connect-soda).


## Connect Soda
<!--Linked to UI, access Shlink-->

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. 

This tutorial also instructs you to connect to a Soda Cloud account using API keys that you create and add to the same `configuration.yml` file. Available for free as a 45-day trial, your Soda Cloud account validates your free trial or license, gives you access to visualized scan results, tracks trends in data quality over time, lets you set alert notifications, and much more.

1. In a code editor such as Sublime or Visual Studio Code, create a new file called `configuration.yml` and save it in your `soda_sip` directory. 
2. Copy and paste the following connection details into the file. The `data_source` configuration details connect Soda to the example AdventureWorks data source you set up using Docker. If you are using your own data, provide the `data_source` values that correspond with your own data source.
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
3. In your Soda account, navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. Copy+paste the `soda_cloud` configuration syntax, including the API keys, into the `configuration.yml` file, as in the example below.
    ```yaml
    data_source adventureworks:
      type: postgres
      connection:
        host: localhost
        ...
      schema: public
    
    soda_cloud:
      host: cloud.soda.io
      api_key_id: 2e0ba0cb-**7b
      api_key_secret: 5wdx**aGuRg
    ```
4. Save the `configuration.yml` file and close the API modal in your Soda account.
5. In Terminal, return to the tab in which the virtual environment is active in the `soda_sip` directory. Run the following command to test Soda's connection to the data source.<br />
Command:
```shell
soda test-connection -d adventureworks -c configuration.yml
```
Output:
```shell
Soda Library 1.x.x
Soda Core 3.x.x
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
  - freshness(date_first_purchase) < 7d:
          name: Data in this dataset is less than 7 days old
  - schema:
          warn:
            when schema changes: any
          name: Columns have not been added, removed, or changed
```
    <details>
        <summary style="color:#00BC7E">What do these checks do?</summary>
        <ul>
          <li><strong>Ensure values are formatted as email addresses</strong> checks that all entries in the <code>email_address</code> column are formatted as <code>name@domain.extension</code>. See <a href="https://docs.soda.io/soda-cl/validity-metrics.html" target="_blank">Validity metrics</a>.</li>
          <li><strong>Ensure there are no null values in the Last Name column</strong> automatically checks for NULL values in the <code>last_name</code> column. See <a href="https://docs.soda.io/soda-cl/missing-metrics.html" target="_blank">Missing metrics</a>.</li>
          <li><strong>No duplicate phone numbers</strong> validates that each value in the <code>phone</code> column is unique. See <a href="https://docs.soda.io/soda-cl/numeric-metrics.html#list-of-numeric-metrics" target="_blank">Numeric metrics</a>.</li>
          <li><strong>Columns have not been added, removed, or changed</strong> compares the schema of the dataset to the last scan result to determine if any columns were added, deleted, changed data type, or changed index. The first time this check executes, the results show <code>[NOT EVALUATED]</code> because there are no previous values to which to compare current results. In other words, this check requires a minimum of two scans to evaluate properly. See <a href="https://docs.soda.io/soda-cl/schema.html" target="_blank">Schema checks</a>.</li>
          <li><strong>Data in this dataset is less than 7 days old</strong> confirms that the data in the dataset is less than seven days old. See <a href="https://docs.soda.io/soda-cl/freshness.html" target="_blank">Freshness checks</a>.</li>
        </ul>
    </details>
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
Soda Library 1.0.x
Soda Core 3.0.x
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
4. As you can see in the Scan Summary in the command-line output, some checks failed and Soda sent the results to your Cloud account. To access visualized check results and further examine the failed checks, return to your Soda account in your browser and click **Checks**. <br /> <br />
![quick-sip-results](/assets/images/quick-sip-results.png)<br /> <br />
5. In the table of checks that Soda displays, you can click the line item for one of the checks that failed to examine the visualized results in a line graph, and to access the failed row samples that Soda automatically collected when it ran the scan and executed the checks.<br /><br />
Use the failed row samples, as in the example below, to determine what caused a data quality check to fail.
![quick-sip-results](/assets/images/quick-sip-failed-rows.png)<br /><br />

✨Well done!✨ You've taken the first step towards a future in which you and your colleagues can trust the quality and reliability of your data. Huzzah!



If you are done with the example data, you can delete it from your account to start fresh with your own data.
1. Navigate to **your avatar** > **Scans & Data**.
2. In the **Data Sources** tab, click the stacked dots to the right of the `adventureworks` data source, then select **Delete Data Source**.
3. Follow the steps to confirm deletion. 
4. Connect to your own data by [configuring your data source connections]({% link soda-library/configure.md %}) in your existing `configuration.yml` file.
5. Adjust your `checks.yml` to point to your own dataset in your data source, then adjust the checks to apply to your own data. Go ahead and run a scan!

## Go further

* Get inspired on how to set up Soda to meet your [use case needs]({% link soda/setup-examples.md %}).
* Use [check suggestions]({% link soda-library/check-suggestions.md %}) or [SodaGPT]({% link soda-cloud/sodagpt.md %}) to quickly get off the ground with basic checks for data quality.
* Learn [how to start]({% link soda/quick-start-sodacl.md %}) writing SodaCL checks.
* Read more about [SodaCL metrics and checks]({% link soda-cl/metrics-and-checks.md %}) in general.
* Learn more about [How Soda works]({% link soda-library/how-library-works.md %}).

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


