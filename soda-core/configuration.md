---
layout: default
title: Configure Soda Core
description: Configure Soda Core to connect to your data sources and prepare data quality checks to run against your data.
parent: Soda Core
redirect_from: /soda-core/configure.html
---

# Configure Soda Core 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

After you [install Soda Core]({% link soda-core/installation.md %}), you must create a `configuration.yml` to provide details for Soda Core to connect your data source (except Apache Spark DataFrames, which does not use a configuration YAML file).

Alternatively, you can provide data source connection configurations in the context of a [programmatic scan]({% link soda-core/programmatic.md %}), if you wish.

[Configuration instructions](#configuration-instructions)<br />
[Provide credentials as system variables](#provide-credentials-as-system-variables)<br />
[Configure the same scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments)<br />
[Disable failed rows sampling for specific columns](#disable-failed-rows-sampling-for-specific-columns)<br/>
[Go further](#go-further)<br />
<br />

## Configuration instructions

Consider following the [Quick start for Soda Core and Soda Cloud]({% link soda/quick-start-soda-core.md %}) that guides you through the steps to configure Soda Core and run a scan of your data.

1. Soda Core connects with Spark DataFrames in a unique way, using programmtic scans.
* If you are using Spark DataFrames, follow the configuration details in [Connect to Apache Spark DataFrames](#connect-to-apache-spark-dataframes).
* If you are *not* using Spark DataFrames, continue to step 2.
2. Create a `configuration.yml` file. This file stores connection details for your data sources. Use the data source-specific connection configurations listed below to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source's details. You can use [system variables](#provide-credentials-as-system-variables) to pass sensitive values, if you wish.<br/> 
{% include connection-list.md %}
3. Save the `configuration.yml` file, then create another new YAML file named `checks.yml`. 
4. A Soda Check is a test that Soda Core performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using [SodaCL]({% link soda-cl/soda-cl-overview.md %}). Copy+paste the following basic check syntax in your file, then adjust the value for `dataset_name` to correspond with the name of one of the datasets in your data source.
```yaml
checks for dataset_name:
  - row_count > 0
```
5. Save the changes to the `checks.yml` file.
6. Next: [run a scan]({% link soda-core/scan-core.md %}) of the data in your data source.


## Provide credentials as system variables

If you wish, you can provide data source login credentials or any of the properties in the configuration YAML file as system variables instead of storing the values directly in the file. System variables persist only for as long as you have the terminal session open in which you created the variable. For a longer-term solution, consider using permanent environment variables stored in your `~/.bash_profile` or `~/.zprofile` files.

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.
```shell
export POSTGRES_PASSWORD=1234
```
2. Test that the system retrieves the value that you set by running an `echo` command.
```shell
echo $POSTGRES_PASSWORD
```
3. In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.
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
4. Save the configuration YAML file, then run a scan to confirm that Soda Core connects to your data source without issue.
```shell
soda scan -d your_datasource -c configuration.yml checks.yml
```

## Configure the same scan to run in multiple environments

{% include scan-multiple-envs.md %}

## Disable failed rows sampling for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your configuration YAML file to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

## Go further

* Next: [Run a scan]({% link soda-core/scan-core.md %}) of the data in your data source.
* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write more checks for data quality.
* (Optional) [Connect Soda Core to a Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
  <br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
