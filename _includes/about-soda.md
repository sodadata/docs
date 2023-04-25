Soda is a platform that enables Data Engineers to test for data quality where and when they need to. 

Is your data fresh? Is it complete or missing values? Are there unexpected duplicate values? Did something go wrong during transformation? Are all the data values valid? These are the questions that Soda answers for Data Engineers.

* Use Soda with GitHub Actions to test data quality during CI/CD development.
* Use it with AirFlow to test data quality after ingestion and transformation in your pipeline.
* Import your dbt tests into your Soda account to facilitate issue investigation and track dataset health over time.
* Integrate Soda with your data catalog to gauge dataset health from within the catalog.

<br />

The Soda platform uses a **CLI tool**, a **platform account**, and **YAML files** to enable you test your data for quality. 

* To scan your dataset amd execute the checks, you use the CLI tool to run a scan manually or programmatically.
* To connect to a data source such as Snowflake, Amazon Athena, or GCP Big Query, you use a `configuration.yml` file which stores access details for your data source, and API key values for your Soda platform account. 
* To define the data quality checks that Soda runs against a dataset, you use a `checks.yml` file. A Soda Check is a test that Soda performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using SodaCL.
* To review scan results and take action to investigate issues, you login to your platform account to see visualized results, tracks trends in data quality over time, and integrate with the messaging, ticketing, and data cataloging tools you already use.

Read more about [How Soda works]({% link soda-core/how-core-works.md %}).<br />
Read more about [SodaCL Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).