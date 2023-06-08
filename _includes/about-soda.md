Soda enables Data Engineers to test data for quality where and when they need to. 

Is your data fresh? Is it complete or missing values? Are there unexpected duplicate values? Did something go wrong during transformation? Are all the data values valid? These are the questions that Soda answers for Data Engineers.

* Use Soda with GitHub Actions to test data quality during CI/CD development.
* Use it with Airflow to test data quality after ingestion and transformation in your pipeline.
* Import your dbt tests into Soda to facilitate issue investigation and track dataset health over time.
* Integrate Soda with your data catalog to gauge dataset health from within the catalog.

### How it works

Soda works by taking the data quality checks that you prepare and using them to run a scan of datasets in a data source. A scan is a CLI command which instructs Soda to prepare optimized SQL queries that execute data quality checks on your data source to find invalid, missing, or unexpected data. When checks fail, they surface bad-quality data and present check results that help you investigate and address quality issues. 

To test your data quality, you install the **Soda CLI tool** and sign up for a **Soda Cloud account** so that you can complete the following tasks:

* **Connect to your data source.** <br />To connect to a data source such as Snowflake, Amazon Athena, or Big Query, you use a `configuration.yml` file which stores access details for your data source such as host, port, and data source login credentials. 
* **Define checks to surface “bad” data.** <br />To define the data quality checks that Soda runs against a dataset, you use a `checks.yml` file. A Soda Check is a test that Soda performs when it scans a dataset in your data source. The checks YAML file stores the checks you write using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.
* **Run a scan to execute your data quality checks.** <br />During a scan, Soda does not ingest your data, it only scans it for quality metrics, then uses the metadata to prepare scan results<sup>1</sup>. After a scan, each check results in one of three default states:
    * pass: the values in the dataset match or fall within the thresholds you specified
    * fail: the values in the dataset do not match or fall within the thresholds you specified
    * error: the syntax of the check is invalid, or there are runtime or credential errors
    * A fourth state, warn, is something you can explicitly configure for individual checks. 
* **Review scan results and investigate issues.** <br />You can review the scan output in the command-line and in your Soda Cloud account. Add API keys to the same `configuration.yml` file to push check results to your account so you can access visualized scan results, set alert notifications, track trends in data quality over time, and integrate with the messaging, ticketing, and data cataloging tools you already use, like Slack, Jira, and Alation.

<sup>1</sup> An exception to this rule is when Soda collects failed row samples that it presents in scan output to aid with issue investigation, a feature you can [disable]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

Learn more about [How Soda works]({% link soda-library/how-library-works.md %}).<br />
Learn more about [running Soda scans]({% link soda-library/run-a-scan.md %}).<br />
Learn more about [SodaCL]({% link soda-cl/metrics-and-checks.md %}).<br />
Access the [Glossary]({% link soda/glossary.md %}) for a full list of Soda terminology. 