---
layout: default
title: Connect Soda Core to Soda Cloud
description: To use all the features that Soda Cloud has to offer, you can install and configure the Soda Core CLI tool, then connect it to your Soda Cloud account.
parent: Soda Core
---

# Connect Soda Core to Soda Cloud 

To use all the [features and functionality]({% link soda/product-matrix.md %}) that **Soda Cloud** and **Soda Core** have to offer, you can install and configure the Soda Core command-line tool, then connect it to your Soda Cloud account.

Soda Core uses an API to connect to Soda Cloud. To use the API, you must generate API keys in your Soda Cloud account, then add them to the configuration YAML file that Soda Core uses to connect to your data sources. Note that the API keys you create do not expire. 

[Prerequisites](#prerequisites)<br />
[Connect](#connect)<br />
[Connect Soda Core for SparkDF to Soda Cloud](#connect-soda-core-for-sparkdf-to-soda-cloud)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites

* You have [installed]({% link soda-core/installation.md %}) and [configured]({% link soda-core/configuration.md %}) Soda Core and run at least one scan of your data.<br /> OR 
* You followed steps in the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) to set up Soda Core and run at least one scan of your data.

## Connect

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. Open your `configuration.yml` file in a text editor, then add the following to the file. Be sure to add the syntax for `soda_cloud` at the root level of the YAML file, *not* nested under any other `data_source` syntax.
```yaml
soda_cloud:
  host: cloud.soda.io
  api_key_id:
  api_key_secret:
```
3. In your Soda Cloud account, navigate to **your avatar** > **Profile** > **API Keys**, then click the plus icon to generate new API keys.
  * Copy the **API Key ID**, then paste it into the `configuration.yml` as the value for `api_key_id`.
  * Copy the **API Key Secret**, then paste it into the `configuration.yml` as the value for `api_key_secret`.
4. Save the changes to the `configuration.yml` file. Close the **Create API Key** dialog box in Soda Cloud.
5. From the command-line, use Soda Core to scan the datasets in your data source again.
```shell
soda scan -d your_datasource_name -c configuration.yml checks.yml
```
6. Navigate to your Soda Cloud account in your browser review the results of your latest scan in **Check Results**.

## Connect Soda Core for SparkDF to Soda Cloud

Unlike other data sources, Soda Core does _not_ require a configuration YAML file to run scans against Spark DataFrames. It is for use with [programmatic Soda scans]({% link soda-core/programmatic-scans.md %}), only.

Therefore, to connect to Soda Cloud, include the Soda Cloud API keys (see step 3, above) in your programmatic scan using either `add_configuration_yaml_file(file_path)` or `scan.add_configuration_yaml_str(config_string)` as in the example below.

```shell
from pyspark.sql import SparkSession, types
from soda.scan import Scan

spark_session = SparkSession.builder.master("local").appName("test").getOrCreate()
df = spark_session.createDataFrame(
    data=[{"id": "1", "name": "John Doe"}],
    schema=types.StructType(
        [types.StructField("id", types.StringType()), types.StructField("name", types.StringType())]
    ),
)
df.createOrReplaceTempView("users")

scan = Scan()
scan.set_verbose(True)
scan.set_scan_definition_name("YOUR_SCHEDULE_NAME")
scan.set_data_source_name("spark_df")
scan.add_configuration_yaml_file(file_path="sodacl_spark_df/configuration.yml")
scan.add_configuration_yaml_str(
    """
soda_cloud:
  api_key_id: "[key]"
  api_key_secret: "[secret]"
  host: cloud.soda.io
"""
)
scan.add_spark_session(spark_session)
scan.add_sodacl_yaml_file(file_path="sodacl_spark_df/checks.yml")
# ... all other scan methods in the standard programmatic scan ...
scan.execute()

# print(scan.get_all_checks_text())
print(scan.get_logs_text())
# scan.assert_no_checks_fail()
```

Refer to <a href="https://github.com/sodadata/soda-core/blob/main/soda/core/tests/examples/example_python_api.py" target="_blank">the soda-core repo in GitHub</a> for details.

## Go further

* Learn more about using [SodaCL]({% link soda-cl/soda-cl-overview.md %}) to write checks for data quality.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
