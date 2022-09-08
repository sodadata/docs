---
layout: default
title: Quick start for Soda Core and Soda Cloud
description: Follow the quick start tutorial to get started with Soda Core and Soda Cloud with a PostgreSQL database.
parent: Get started
---

# Quick start for Soda Core and Soda Cloud
<br />

![soda-core-logo](/assets/images/soda-core-logo.png){:height="120px" width="120px"} <br />
Use your command-line interface to connect Soda Core to a data source, create and examine the checks that surface “bad” data in a dataset, then run your first scan in a few minutes. 

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="123px" width="123px"} <br />
After you run your scan from the command-line, consider going further by signing up for a free trial account in Soda Cloud, the web application that offers data quality visualizations and much more. 

[Tutorial prerequisites](#tutorial-prerequisites-1) <br />
[Install Soda Core](#install-soda-core)<br />
[Connect Soda Core to a data source](#connect-soda-core-to-a-data-source)<br />
[Write a check and run a scan](#write-a-check-and-run-a-scan) <br />
[Connect Soda Core to Soda Cloud (Optional)](#connect-soda-core-to-soda-cloud) <br />
<br />



## Tutorial prerequisites

This tutorial references a MacOS development environment with a PostgreSQL data source.

* Python 3.8 or greater 
* Pip 21.0 or greater
* access details and credentials for a PostgreSQL database
* a code editor such as Sublime or Visual Studio Code

## Install Soda Core

1. Best practice dictates that you install the Soda Core CLI using a virtual environment. In your command-line interface, create a virtual environment in the `.venv` directory, then activate it and update the version of pip.
```shell
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```
2. Execute the following command to install Soda Core in your virtual environment.
```shell
pip install soda-core-postgres
```
3. Validate the installation using the `soda` command. The command-line output is similar to the following.
```shell
Usage: soda [OPTIONS] COMMAND [ARGS]...
  Soda Core CLI version 3.0.bx
Options:
  --help  Show this message and exit.
Commands:
  scan    runs a scan
  update-dro  updates a distribution reference file
```

## Connect Soda Core to a data source

There are several other [install packages for Soda Core]({% link soda-core/installation.md %}#install) that correspond to different data sources. This tutorial references a MacOS development environment with a PostgreSQL data source. 

1. In your command-line interface, create a Soda tutorial project directory in your local environment, then navigate to the directory.
```shell
mkdir soda_tutorial
cd soda_tutorial
```
2. Create a new file called `confguration.yml`. 
3. Open the `configuration.yml` file in a code editor, then copy and paste the following connection details into the file. Replace the values for each of the fields with your own database-specific details, then save the file.

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

* Replace `my_database_name` with the name of your PostgreSQL database. 
* Note that `connection:` is a header, not a field. 
* All values are required.
* Consider using system variables to securely store the values of your username and password. Refer to [Configure Soda Core]({% link soda-core/configuration.md %}#provide-credentials-as-system-variables) for details. 


## Write a check and run a scan

1. Using Finder or Terminal, create another file in the `soda-tutorial` directory called `checks.yml`. A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. The `checks.yml` file stores the Soda Checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). 
2. Open the `checks.yml` file in a code editor, then copy and paste the following Soda Check into the file. Replace the value for `my_dataset` with the name of a dataset in your data source. <br />
This simple check validates that the dataset contains more than zero rows, which is to say, that it is not empty.
```yaml
checks for my_dataset:
- row_count > 0 
```
3. Save the changes to the `checks.yml` file, then, in Terminal, use the following command to run a scan. As input, the command requires:
* the name of the data source to scan; replace the value for `my_database_name` with the name of your PostgreSQL database
* the filepath and name of the `configuration.yml` file 
* the filepath and name of the `checks.yml` file<br />
<br />
Command:
```shell
soda scan -d my_database_name -c configuration.yml checks.yml
```
Output:
```shell
Soda Core 3.0.xx
Scan summary:
1/1 check PASSED: 
    my_dataset in my_database_name
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```
4. The CLI output indicates that the check passed, confirming that the dataset is not empty. (Optional) To witness an example of scan output with a failed check, open the `checks.yml` file and change the check to read: `row_count < 5`, then save the file.
5. (Optional) Run the same scan command to see a different scan results in the CLI.<br />
Command:
```shell
soda scan -d my_database_name -c configuration.yml checks.yml
```
Output:
```
Soda Core 3.0.xx
Scan summary:
1/1 check FAILED: 
    my_dataset in my_database_name
      row_count < 5 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```
6. (Optional) To see more detail in the scan results output in the CLI, add the `-V` option to the scan command to return a verbose version of the output.<br />
<br />
Command:
```shell
soda scan -d my_database_name -c configuration.yml -V checks.yml
```
Output:
```shell
Soda Core 3.0.xx
Reading configuration file "/Users/username/.soda/configuration.yml"
Reading SodaCL file "checks.yml"
Scan execution starts
Query aws_postgres_retail.orders.aggregation[0]:
SELECT 
  COUNT(*) 
FROM orders
Scan summary:
1/1 query OK
  my_database_name.my_dataset.aggregation[0] [OK] 0:00:00.285771
1/1 check FAILED: 
    my_dataset in my_database_name
      row_count < 5 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```
7. (Optional) If you like, adjust or add more checks to the `checks.yml` file to further explore the things that [SodaCL]({% link soda-cl/soda-cl-overview.md %}) can do. 
8. To exit the virtual environment in your command-line interface, type `deactivate` then press enter.<br />
OR <br />
Continue to the next section to connect Soda Core to a Soda Cloud account.

## Connect Soda Core to Soda Cloud 

Though you can use Soda Core as a standalone CLI tool to monitor data quality, you may wish to connect to the Soda Cloud web application that vastly enriches the data quality monitoring experience. 

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, and view samples of the rows that failed a test during a scan. Integrate Soda Cloud with your Slack workspace to collaborate with your team on data monitoring.

Soda Core uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the configuration YAML file. When it runs a scan, Soda Core pushes the test results to Soda Cloud. 


1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In a code editor, open your `configuration.yml` file, then add the `soda_cloud` syntax to the file, as in the example below. 
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
  api_key_id: 
  api_key_secret: 
```
3. Save the `configuration.yml` file.
4. In Soda Cloud, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
    * Copy the **API Key ID**, then paste it into the `configuration.yml` file as the value for `api_key_id`.
    * Copy the **API Key Secret**, then paste it into the `configuration.yml` file as the value for `api_key_secret`.
<br />You may wish to securely store the values for the API keys as [system variables]({% link soda-core/configuration.md %}#provide-credentials-as-system-variables). 
5. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in your Soda Cloud account. 
6. From the command-line, in your `soda_tutorial` directory, use Soda Core to scan the datasets in your data source again.<br />
Command:
```shell
soda scan -d my_database_name -c configuration.yml checks.yml
```
Output:
```shell
Soda Core 3.0.xx
Scan summary:
1/1 check FAILED: 
    my_dataset in my_database_name
      row_count > 0 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
```
7. Go to your Soda Cloud account in your browser and navigate to the **Checks** dashboard. Review the results of your scan in **Check Results**. 
<br />
<br />
![cloud-tutorial-results](/assets/images/cloud-tutorial-results-1.png){:height="700px" width="700px"}
9. Navigate to the **Datasets** dashboard, then click to select the name of your dataset to review statistics and metadata about the dataset.
<br />
<br />
![dataset-metadata-1](/assets/images/dataset-metadata-1.png){:height="700px" width="700px"}
10. Explore Soda Cloud!
* [integrate your Slack workspace]({% link soda/integrate-slack.md %}) to receive notifications of failed checks and collaborate on data quality investigations
* set up or modify notifications for the checks in your account (**Check** > **Check Results** > **stacked dots** > **Edit Check**)
* open and track [data quality incidents]({% link soda-cloud/incidents.md %}) and collaborate to resolve them with your team in Slack


To exit the virtual environment in your command-line interface, type `deactivate` then press enter.<br />

## Go further

* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}).
* Explore the built-in [metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use with SodaCL.
* Set up [programmatic scans]({% link soda-core/programmatic.md %}) to automate data quality monitoring.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}