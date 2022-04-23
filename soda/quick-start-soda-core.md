---
layout: default
title: Quick start for Soda Core and Soda Cloud
description: Follow the quick start tutorial to get started with Soda Core (Beta) and Soda Cloud with a PostgreSQL database.
parent: Get started
---

# Quick start for Soda Core ![beta](/assets/images/beta.png){:height="50px" width="50px" align="top"} and Soda Cloud
<br />

![soda-core-logo](/assets/images/soda-core-logo.png){:height="120px" width="120px"} ![beta](/assets/images/beta.png){:height="40px" width="40px" align="top"}
Use your command-line interface to connect Soda Core to a data source, create and examine the checks that surface “bad” data in a dataset, then run your first scan in a few minutes. 

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="123px" width="123px"} 
After you run your scan from the command-line, consider going further by signing up for a free trial account in Soda Cloud, the web application that offers data quality visualizations and much more. 

[Tutorial prerequisites](#tutorial-prerequisites-1) <br />
[Install Soda Core](#install-soda-core)<br />
[Connect Soda Core to a data source](#connect-soda-core-to-a-data-source)<br />
[Write a check and run a scan](#write-a-check-and-run-a-scan) <br />
[Connect Soda Core to Soda Cloud (Optional)](#connect-soda-core-to-soda-cloud) <br />
<br />



## Tutorial prerequisites

This tutorial references a MacOS development environment with a PostgreSQL data source.

* Python 3.7 or greater 
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
  update  updates a distribution reference file
```

## Connect Soda Core to a data source

There are several other <a href="https://docs.soda.io/soda-core/get-started.html#install-the-soda-core-cli" target="_blank">install packages for Soda Core</a> that correspond to different data sources. This tutorial references a MacOS development environment with a PostgreSQL data source. 

1. In your local user home directory, create a new hidden folder in which you will store your `configuration.yml` file. This file will contain the connection details that Soda Core needs to access your data source. 
```shell
mkdir .soda
```
2. In your Finder, navigate to your new hidden directory (use Command+Shift+. to display hidden folders), then create a new file called `confguration.yml`. 
3. Open the `configuration.yml` file in a code editor, then copy and paste the following connection details into the file.
```yaml
data_source my_database_name:
  type: postgres
  connection:
    host: 
    port: '5432'
    username:  
    password:  
  database: 
  schema: 
```
4. Add values for each of the fields, all required, then save the file.
* Replace `my_database_name` with the name of your PostgreSQL database. 
* Note that `connection:` is a header, not a field. 
* Consider using environment variables to securely store the values of your username and password. 


## Write a check and run a scan

1. In your command-line interface, create a Soda tutorial project directory in your local environment, then navigate to the directory.
```shell
mkdir soda_tutorial
cd soda_tutorial
```
2. Using Finder or Terminal, create a file in the `soda-tutorial` directory called `checks.yml`. A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. The `checks.yml` file stores the Soda Checks you write using the [Soda Checks Language (SodaCL)]({% link soda-cl/soda-cl-overview.md %}). 
3. Open the `checks.yml` file in a code editor, then copy and paste the following Soda Check into the file. Replace the value for `my_dataset` with the name of a dataset in your data source. <br />
This simple check validates that the dataset contains more than zero rows, which is to say, that it is not empty.
```yaml
checks for my_dataset:
- row_count > 0 
```
4. Save the changes to the `checks.yml` file, then, in Terminal, use the following command to run a scan. As input, the command requires:
* the name of the data source to scan; replace the value for `my_datasource_name` with the name of your PostgreSQL database
* the filepath and name of the `checks.yml` file
* Soda Core automatically finds the `configuration.yml` file in the hidden `.soda` directory in your local user environment to retrieve the information it needs to connect to your data source.<br />
<br />
Command:
```shell
soda scan -d my_datasource_name checks.yml
```
Output:
```
Soda Core 3.0.0bx
Scan summary:
1/1 check PASSED: 
    my_dataset in my_datasource_name
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
```
5. The CLI output indicates that the check passed, confirming that the dataset is not empty. (Optional) To witness an example of scan output with a failed check, open the `checks.yml` file and change the check to read: `row_count < 5`, then save the file.
6. (Optional) Run the same scan command to see a different scan results in the CLI.<br />
Command:
```shell
soda scan -d my_datasource_name checks.yml
```
Output:
```
Soda Core 3.0.0bx
Scan summary:
1/1 check FAILED: 
    my_dataset in my_datasource_name
      row_count < 5 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```
7. (Optional) To see more detail in the scan results output in the CLI, add the `-V` option to the scan command to return a verbose version of the output.<br />
<br />
Command:
```shell
soda scan -d aws_postgres_retail -V checks.yml
```
Output:
```shell
Soda Core 3.0.0bx
Reading configuration file "/Users/username/.soda/configuration.yml"
Reading SodaCL file "checks.yml"
Scan execution starts
Query aws_postgres_retail.orders.aggregation[0]:
SELECT 
  COUNT(*) 
FROM orders
Scan summary:
1/1 query OK
  my_datasource_name.my_dataset.aggregation[0] [OK] 0:00:00.285771
1/1 check FAILED: 
    my_dataset in my_datasource_name
      row_count < 5 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
```
8. (Optional) If you like, adjust or add more hecks to the `checks.yml` file to further explore the things that <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core</a> and [SodaCL]({% link soda-cl/soda-cl-overview.md %}) can do. 

To exit the virtual environment in your command-line interface, type `deactivate` then press enter.<br />
OR <br />
Continue to the next section to connect Soda Core to a Soda Cloud account.

## Connect Soda Core to Soda Cloud 

Though you can use Soda Core as a standalone CLI tool to monitor data quality, you may wish to connect to the Soda Cloud web application that vastly enriches the data quality monitoring experience. 

Beyond increasing the observability of your data, Soda Cloud enables you to automatically detect anomalies, and view samples of the rows that failed a test during a scan. Integrate Soda Cloud with your Slack workspace to collaborate with your team on data monitoring.

Soda Core uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the configuration YAML file. When it runs a scan, Soda Core pushes the test results to Soda Cloud. 


1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In a code editor, open the `configuration.yml` file (in the hidden `.soda` directory in your local home directory), then add the following to the file:
```yaml
soda_account:
  host: cloud.soda.io
  api_key_id: 
  api_key_secret: 
```
3. Save the `configuration.yml` file.
4. In Soda Cloud, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
    * Copy the **API Key ID**, then paste it into the `configuration.yml` file as the value for `api_key_id`.
    * Copy the **API Key Secret**, then paste it into the `configuration.yml` file as the value for `api_key_secret`.
5. You may wish to securely store the values for the API keys as environment variables. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in your Soda Cloud account. 
6. From the command-line, in your `soda_tutorial` directory, use Soda Core to scan the datasets in your data source again.<br />
Command:
```shell
soda scan -d my_datasource_name checks.yml
```
Output:
```shell
Soda Core 3.0.0bx
Scan summary:
1/1 check FAILED: 
    my_dataset in my_datasource_name
      row_count < 5 [FAILED]
        check_value: 1329
Oops! 1 failures. 0 warnings. 0 errors. 0 pass.
Sending results to Soda Cloud
> /api/command (login with API key credentials)
< 200 (login ok, token received)
```
7. Go to your Soda Cloud account in your browser and navigate to the **Monitors** dashboard. Review the results of your scan in **Monitor Results**. 
<br />
<br />
![cloud-tutorial-results](/assets/images/cloud-tutorial-results-1.png){:height="700px" width="700px"}
9. Navigate to the **Datasets** dashboard, then click to select the name of your dataset to review statistics and metadata about the dataset.
<br />
<br />
![dataset-metadata-1](/assets/images/dataset-metadata-1.png){:height="700px" width="700px"}
10. Explore Soda Cloud!
* [integrate your Slack workspace]({% link soda/integrate-slack.md %}) to receive notifications of failed checks and collaborate on data quality investigations
* set up alerts and notifications for the checks in your account (**Monitors** > **Monitor Results** > **stacked dots** > **Edit Monitor**)
* open and track [data quality incidents]({% link soda-cloud/incidents.md %}) and collaborate to resolve them with your team in Slack


To exit the virtual environment in your command-line interface, type `deactivate` then press enter.<br />

## Go further

* Explore the built-in metrics you can use to write checks with [SodaCL]({% link soda-cl/soda-cl-overview.md %}).
* Access the complete set of <a href="https://docs.soda.io/soda-core/overview.html" target="_blank">Soda Core documentation</a>.
* Set up <a href="https://docs.soda.io/soda-core/programmatic-scans.html" target="_blank">programmatic scans</a> to automate data quality monitoring.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}