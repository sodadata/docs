---
layout: default
title: Add Soda to a Databricks notebook
description: 
parent: Use case guides
---

# Add Soda to a Databricks notebook
*Last modified on {% last_modified_at %}*

Use this guide to install and set up Soda in a Databricks notebook so you can run data quality tests on data in a Spark data source.

(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)

[About this guide](#about-this-guide)<br />
[Sign up for Soda Cloud](#prepare-for-data-migration)<br />
[Install and set up Soda](#install-and-set-up-soda)<br />
[Go further](#go-further)<br />
<br />

## About this guide

The instructions below offer Data Engineers an example of how to write Python in a Databricks notebook to set up Soda, then write and execute scans for data quality in Spark.

This example uses a programmatic deployment model which invokes the Soda Python library, and uses Soda Cloud to validate a commercial usage license and display visualized data quality test results. See: [Choose a flavor of Soda]({% link soda/setup-guide.md %}).

## Sign up for Soda Cloud

To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <a href="https://docs.soda.io/soda/about.html">Learn more</a>

1. In a browser, navigate to <a href="https://cloud.soda.io/signup" target="_blank">cloud.soda.io/signup</a> to create a new Soda account, which is free for a 45-day trial. If you already have a Soda account, log in.
2. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. 
3. Copy+paste the API key values to a temporary, secure place in your local environment.

## Install and set up Soda

Soda Library has the following requirements:
* Python 3.8 or greater
* Pip 21.0 or greater

{% include code-header.html %}
```python
# Install a Soda Library package with Apache Spark DataFrame
pip install -i https://pypi.cloud.soda.io soda-spark-df

# Import Scan from Soda Library
# A scan is a command that executes checks to extract information about data in a dataset. 
from soda.scan import Scan

# Create a Spark DataFrame, or use the Spark API to read data and create a DataFrame
# A Spark DataFrame is a distributed collection of data organized into named columns which provides a structured and tabular representation of data within the Apache Spark framework. 
df = spark.table("delta.`/databricks-datasets/nyctaxi/tables/adventureworks`")

# Create a view that Soda uses as a dataset
df.createOrReplaceTempView("NYC_Taxi_Data")

# Create a scan object
scan = Scan()

# Set a scan definition
# Use a scan definition to configure how to execute the scan, which data to scan.
scan.set_scan_definition_name("Databricks Notebook")
scan.set_data_source_name("spark_df")

### Attach a Spark session

scan.add_spark_session(spark)

### Define checks for datasets

# TODO: Extend checks for demo purposes
checks = """
checks for NYC_Taxi_Data:
  - row_count > 0:
      name: Row Count Not Zero
sample datasets:
  datasets:
    - include NYC_Taxi_Data
"""

#### If you defined checks in a file accessible via Spark, you can use the scan.add_sodacl_yaml_file method to retrieve the checks.

scan.add_sodacl_yaml_str(checks)

### Optionally, add a configuration file with Soda Cloud credentials

config ="""
soda_cloud:
  host: demo.soda.io
  api_key_id: 399b27f5-f51a-4463-9992-3ce241ab53c9
  api_key_secret: hNSg7Fu4NngGVX--95RmdwIkpVpjVGrhr0cvVxpUPSQ4PD77xD_W1Q
"""
scan.add_configuration_yaml_str(config)

### Execute a scan

scan.execute()

### Check the Scan object for methods to inspect the scan result

The following prints all logs to the console

print(scan.get_logs_text()) 

### Use the additional scan methods to insert circuit breakers into your processes, e.g. scan.assert_no_checks_fail

```

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}