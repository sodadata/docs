---
layout: default
title: Configure Soda Library
description: Configure Soda Library to connect to your data sources and prepare data quality checks to run against your data.
parent: Soda Library
redirect_from:
- /soda-core/configure.html
- /soda-core/configuration.html
- /soda-core/connect-core-to-cloud.html
---

# Configure Soda Library 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*
{% include banner-core.md %}

After you [install Soda Library]({% link soda-library/install.md %}), you must create a `configuration.yml` to provide details for Soda Library to:
* connect your data source (except Apache Spark DataFrames, which does not use a configuration YAML file)
* connect to your Soda Cloud account with API keys; Soda Library requires API keys to validate licensing or trial status and run scans for data quality. 

Alternatively, you can provide data source connection configurations in the context of a [programmatic scan]({% link soda-library/programmatic.md %}), if you wish.

[Configure and run Soda Library](#configure-and-run-soda-library)<br />
[Provide credentials as system variables](#provide-credentials-as-system-variables)<br />
[Configure the same scan to run in multiple environments](#configure-the-same-scan-to-run-in-multiple-environments)<br />
[Disable failed rows samples for specific columns](#disable-failed-rows-samples-for-specific-columns)<br/>
[Disable failed rows samples for individual checks](#disable-failed-row-samples-for-individual-checks)<br />
[Go further](#go-further)<br />
<br />

## Configure and run Soda Library

Consider following the [Take a sip of Soda]({% link soda/quick-start-sip.md %}) quick start that guides you through the steps to configure Soda Library and run a scan of sample data.

1. Soda Library connects with Spark DataFrames in a unique way, using programmtic scans.
* If you are using Spark DataFrames, follow the configuration details in [Connect to Apache Spark DataFrames](#connect-to-apache-spark-dataframes).
* If you are *not* using Spark DataFrames, continue to step 2.
2. Create a `configuration.yml` file. This file stores connection details for your data sources and your Soda Cloud account. Use the data source-specific connection configurations [details]({% link soda/connect-athena.md %}) to copy+paste the connection syntax into your file, then adjust the values to correspond with your data source's details, as in the following example for PostgreSQL. <br />You can use [system variables](#provide-credentials-as-system-variables) to pass sensitive values, if you wish.
```yaml
    data_source adventureworks:
      type: postgres
      host: localhost
      username: postgres
      password: secret
      database: postgres
      schema: public
```
3. In a browser, navigate to <a href="https://cloud.soda.io/signup?utm_source=docs" target="_blank">cloud.soda.io/signup</a> to create a new Soda account. If you already have a Soda account, log in. 
4. Navigate to **your avatar** > **Profile**, then access the **API keys** tab. Click the plus icon to generate new API keys. Copy+paste the `soda_cloud` configuration syntax, including the API keys, into the `configuration.yml` file, as in the example below. <br />
* *Do not* nest the `soda_cloud` configuration under the `datasource` configuration.
* For `host`, use `cloud.soda.io` for EU region; use `cloud.us.soda.io` for USA region, according to your selection when you created your Soda Cloud account.
* Optionally, provide a value for the `scheme` property to indicate which scheme to use to initialize the URI instance. If you do not explicitly include a `scheme` property, Soda uses the default `https`.
    ```yaml
        soda_cloud:
          host: cloud.soda.io
          api_key_id: 2e0ba0cb-**7b
          api_key_secret: 5wdx**aGuRg
          scheme:
    ```
5. Save the `configuration.yml` file, then, in the same directory, create another new YAML file named `checks.yml`. 
6. A Soda Check is a test that Soda Library performs when it scans a dataset in your data source. The checks YAML file stores the Soda Checks you write using [SodaCL]({% link soda-cl/soda-cl-overview.md %}), like the check below that ensures a dataset is not empty. Copy+paste the following basic check syntax in your file, then adjust the value for `dataset_name` to correspond with the name of one of the datasets in your data source.
```yaml
checks for dataset_name:
  - row_count > 0
```
7. Save the changes to the `checks.yml` file.
8. Use the following command to run a scan of the data in your data source. Replace the value for `my_datasource` with the name of the data source you added to your `configuration.yml` file. Read more about [scans]({% link soda-library/run-a-scan.md %}).
```shell
soda scan -d my_datasource -c configuration.yml checks.yml
```
Command-line Output:
```shell
Soda Library 1.0.x
Scan summary:
1/1 check PASSED: 
    dim_customer in adventureworks
      row_count > 0 [PASSED]
All is good. No failures. No warnings. No errors.
Sending results to Soda Cloud
Soda Cloud Trace: 67592***474
```
9. Access your Soda Cloud account in your browser and navigate to **Checks** to review the same scan output that Soda Library printed in the command-line.
![configure-results](/assets/images/configure-results.png){:height="700px" width="700px"}


## Provide credentials as system variables

If you wish, you can provide data source login credentials or any of the properties in the configuration YAML file as system variables instead of storing the values directly in the file. System variables persist only for as long as you have the terminal session open in which you created the variable. For a longer-term solution, consider using permanent environment variables stored in your `~/.bash_profile` or `~/.zprofile` files.

### For connection configuration values

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
  host: soda-temp-demo
  port: '5432'
  username: sodademo
  password: ${POSTGRES_PASSWORD}
  database: postgres
  schema: public
```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to your data source without issue.
```shell
soda scan -d your_datasource -c configuration.yml checks.yml
```

### For API key values

1. From your command-line interface, set a system variable to store the value of a property that the configuration YAML file uses. For example, you can use the following command to define a system variable for your password.
```shell
export API_KEY=1234
```
2. Test that the system retrieves the value that you set by running an `echo` command.
```shell
echo $API_KEY
```
3. In the configuration YAML file, set the value of the property to reference the environment variable, as in the following example.
    ```yaml
    data_source my_database_name:
      type: postgres
      host: soda-temp-demo
      port: '5432'
      username: sodademo
      password: ${POSTGRES_PASSWORD}
      database: postgres
      schema: public
    
    soda_cloud:
      host: cloud.soda.io
      api_key_id: ${API_KEY}
      api_key_secret: ${API_SECRET}
    ```
4. Save the configuration YAML file, then run a scan to confirm that Soda Library connects to Soda Cloud without issue.
```shell
soda scan -d your_datasource -c configuration.yml checks.yml
```


## Configure the same scan to run in multiple environments

{% include scan-multiple-envs.md %}

## Disable failed rows samples for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your configuration YAML file to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).


## Disable failed row samples for individual checks

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can set the `samples limit` to `0` to prevent Soda from collecting failed rows samples (and sending the samples to Soda Cloud) for an individual check, as in the following example.
{% include code-header.html %}
```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 0
```
<br />

## Go further

* Next: [Run a scan]({% link soda-library/run-a-scan.md %}) of the data in your data source.
* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write checks for data quality.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
  <br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
