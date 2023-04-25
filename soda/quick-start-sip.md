---
layout: default
title: Take a sip of Soda
description: 
parent: Get started
redirect_from:
- /soda/core-interactive-demo.html
- /soda/quick-start-soda-core.html
---

# Take a sip of Soda
*Last modified on {% last_modified_at %}*

Is Soda the data quality testing solution you've been looking for? <br />
Take a sip and see!

1. Learn the basics of Soda in [two minutes](#learn-about-soda).
2. Make sure you have the [tools](#tutorial-prerequisites) you need to complete this tutorial.
3. [Install Soda from the command-line](#install-soda-from-the-command-line).
4. Use Docker to [build an example data source](#build-an-example-data-source) against which to run data quality scans.
5. [Connect Soda to the data source and a platform account](#connect-soda-to-the-data-source-and-a-platform-account).
6. [Write some checks](#write-some-checks-and-run-a-scan) that surface “bad” data in a dataset, then run your first scan. Examine the scan results in the command-line output and in the visualized check results in your Soda account. 

<br />
<br />

## Learn about Soda

{% include about-soda.md %}

## Tutorial prerequisites

To see Soda up and running locally in a few minutes, you need a few tool.

* You have installed <a href="https://www.python.org/downloads/" target="_blank">Python 3.8</a> or greater. 
* You have install Pip 21.0 or greater.
* You have installed <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> in your local environment.
* You have a <a href="https://github.com/" target="_blaak">GitHub account</a>.
* You have intsalled a code editor such as <a href="https://www.sublimetext.com/" target="_blank">Sublime</a> or <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> in your local environment.

## Install Soda from the command line

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
3. Execute the following command to install Soda in your virtual environment. 
```shell
pip install soda-core-postgres
```
4. Validate the installation using the `soda` command. The command-line output is similar to the following.
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...
  Soda Core CLI version 3.0.xx
Options:
  --version  Show the version and exit.
  --help     Show this message and exit.
Commands:
  ingest           Ingests test results from a different tool
  scan             Runs a scan
  test-connection  Tests a connection
  update-dro       Updates contents of a distribution reference file
```


## Build an example data source

To enable you to take a first sip of Soda, you can use Docker to quickly build an example PostgreSQL data source against which you can run scans for data quality. The example data source contains  data for AdventureWorks, an imaginary online e-commerce organization. 

Access a quick view of the <a href="/assets/adventureworks_schema.png" target="_blank">AdventureWorks schema</a>.

1. Log in to your GitHub account, then clone the Sip of Soda repo locally. Use Terminal to navigate to the newly-cloned repo in your local environment.
2. If it is not already running in your local environment, start Docker.
3. In Terminal, run the following command to set up the prepared example data source.
```shell
docker-compose up
```
4. When the output reads `data system is ready to accept connections`, you are ready to proceed.



## Connect Soda to the data source and a platform account

To connect to a data source such as Snowflake, PostgreSQL, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source. To connect to your Soda account, you create API keys and add them to the same `configuration.yml` file.

1. Create a new file called `configuration.yml` in your `soda_sip` directory. 
2. Open the `configuration.yml` file in a code editor, then copy and paste the following connection details into the file. These configuration details connect Soda to the example AdventureWorks data source you set up using Docker.
```yaml
data_source adventureworks:
  type: postgres
  connection:
    host: localhost
    username: 
    password: 
  database: postgres
  schema: public
```
3. Next, add the following configuration that connects Soda to your new platform account, leaving the values blank for a moment. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under the `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
3. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. This trial account is available for free for 45 days. 
4. In your new account, navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
5. Save the `configuration.yml` file and close the API modal in your Soda account.


## Write some checks and run a scan

1. Using Finder or Terminal, create another file in the `soda_sip` directory called `checks.yml`. A check is a test that Soda executes when it scans a dataset in your data source. The `checks.yml` file stores the checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). 
2. Open the `checks.yml` file in your code editor, then copy and paste the following checks into the file. 
```yaml
checks for dim_customer:
  - invalid_count(email_address) = 0:
      valid format: email
      name: Emails formatted correctly
  - missing_count(last_name) = 0:
      name: No null values for last name
  - duplicate_count(phone) = 0:
      name: No duplicate phone numbers
  - schema:
      warn:
        when schema changes: any
      name: No changes to schema
  - freshness(date_first_purchase) < 7d:
      name: Data is fresh
```
     <details>
        <summary style="color:#00BC7E">What do these checks do?</summary>
        TO DO: explain checks in plain language
    </details>
3. Save the changes to the `checks.yml` file, then, in Terminal, use the following command to run a scan. As input, the command requires:
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
5. In the table of check results Soda displays, you can click the line item for one of the checks that failed to examine the visualized results in a line graph, and to access the failed row samples that Soda automatically collected when it ran the scan and executed the checks.<br />
Use the failed row samples to figure out what caused a data quality check to fail.
6. (Optional) Adjust or add more checks to the `checks.yml` file to further explore the things that [SodaCL]({% link soda/quick-start-sodacl.md %}) can do.
7. To exit the virtual environment in your command-line interface, type `deactivate` then press enter.

## Go further

* Explore the built-in [metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use with SodaCL.
* Learn how to [test data quality during CI/CD development]({% link soda/quick-start-dev.md %}).
* Learn how to [test data quality in a data pipeline]({% link soda/quick-start-prod.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
