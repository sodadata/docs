---
layout: default
title: Add Soda to a Databricks notebook
description: Use this guide to invoke Soda data quality tests from inside a Databricks notebook.
parent: Use case guides
---

# Add Soda to a Databricks notebook
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda in a Databricks notebook so you can run data quality tests on data in a Spark data source.

🎥 Watch a video that demonstrates how to add Soda to your Databricks pipeline: <a href="https://go.soda.io/soda-databricks-video" target="_blank">https://go.soda.io/soda-databricks-video<a/>

[About this guide](#about-this-guide)<br />
[Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
[Set up Soda](#set-up-soda)<br />
[Go further](#go-further)<br />

## About this guide

The instructions below offer Data Engineers an example of how to write Python in a Databricks notebook to set up Soda, then write and execute scans for data quality in Spark.

This example uses a programmatic deployment model which invokes the Soda Python library, and uses Soda Cloud to validate a commercial usage license and display visualized data quality test results. See: [Choose a flavor of Soda]({% link soda/setup-guide.md %}).

## Create a Soda Cloud account

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <a href="https://docs.soda.io/soda/about.html">Learn more</a>

1. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in.
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. 
3. Copy+paste the API key values to a temporary, secure place in your local environment.

## Set up Soda

Soda Library has the following requirements:
* Python 3.8 or greater
* Pip 21.0 or greater

Download the notebook: <a href="soda-databricks-notebook.ipynb" download>Soda Databricks notebook</a>

{% include code-header.html %}
```python
# Install a Soda Library package with Apache Spark DataFrame
pip install -i https://pypi.cloud.soda.io soda-spark-df

# Import Scan from Soda Library
# A scan is a command that executes checks to extract information about data in a dataset. 
from soda.scan import Scan

# Create a Spark DataFrame, or use the Spark API to read data and create a DataFrame
# A Spark DataFrame is a distributed collection of data organized into named columns which provides a structured and tabular representation of data within the Apache Spark framework. 
df = spark.table("delta.`/databricks-datasets/adventureworks/tables/adventureworks`")

# Create a view that Soda uses as a dataset
df.createOrReplaceTempView("adventureworks")

# Create a scan object
scan = Scan()

# Set a scan definition
# Use a scan definition to configure which data to scan, and when and how to execute the scan.
scan.set_scan_definition_name("Databricks Notebook")
scan.set_data_source_name("spark_df")

# Attach a Spark session
scan.add_spark_session(spark)

# Define checks for datasets
# A Soda Check is a test that Soda Library performs when it scans a dataset in your data source. You can define your checks in-line in the notebook, or define them in a separate checks.yml fail that is accessible by Spark.
checks = """
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
sample datasets:
  datasets:
    - include dim_%
"""

# OR, define checks in a file accessible via Spark, then use the scan.add_sodacl_yaml method to retrieve the checks
scan.add_sodacl_yaml_str(checks)

# Add your Soda Cloud connection configuration using the API Keys you created in Soda Cloud
# Use cloud.soda.io for EU region
# Use cloud.us.soda.io for US region

config ="""
soda_cloud:
  host: cloud.soda.io
  api_key_id: 39**9
  api_key_secret: hN**_W1Q
"""

# OR, configure the connection details in a file accessible via Spark, then use the scan.add_configuration_yaml method to retrieve the config
scan.add_configuration_yaml_str(config)

# Execute a scan
scan.execute()

# Check the Scan object for methods to inspect the scan result
# The following prints all logs to the console
print(scan.get_logs_text()) 
```

## Go further

* Learn more about [SodaCL checks and metrics]({% link soda-cl/metrics-and-checks.md %}).
* Access instructions to [Generate API Keys]({% link soda-cloud/api-keys.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}