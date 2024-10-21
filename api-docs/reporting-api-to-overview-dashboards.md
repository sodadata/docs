---
layout: default
title: Build a customized dashboard
description: This example helps you build a customized data quality reporting dashboard in Sigma using the Soda Cloud API. 
parent: Use case guides
---

# Build a customized dashboard 
*Last modified on {% last_modified_at %}*

This guide offers a comprehensive example for building a customized data quality reporting dashboard in Sigma. Use the [Soda Cloud API]({% link api-docs/public-cloud-api-v1.md %}) to capture metadata from your Soda Cloud account, store it in Snowflake, then access the data in Snowflake to create a Sigma dashboard.

![build-sigma](/assets/images/build-sigma.png){:height="700px" width="700px"}

[Prerequisites](#prerequisites)<br/>
[Set up a Python script](#set-up-a-python-script)<br />
[Capture and store metadata](#capture-and-store-metadata)<br />
[Build a data quality dashboard in Sigma](#build-a-data-quality-dashboard-in-sigma)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites
* Python 3.8, 3.9, or 3.10
* Pip 21.0 or greater
* access to an account in Sigma 
* access to a Snowflake data source
* a Soda Cloud account; see [Get started]({% link soda-agent/managed-agent.md %})
* permission in Soda Cloud to access dataset metadata; see [Manage dataset roles]({% link soda-cloud/roles-dataset.md %})

## Set up a Python script

1. Install an HTTP request library and Snowflake connector.
```shell
pip install pandas requests
pip install snowflake-connector-python
```
2. In a new Python script, configure the following details to integrate with Soda Cloud. See [Generate API keys]({% link soda-cloud/api-keys.md %}) for detailed instructions.
```python
# Use cloud.us.soda.io in the US region; use cloud.soda.io in the EU region
soda_cloud_url = 'https://cloud.us.soda.io'  
soda_apikey = 'xxx' # API key ID from Soda Cloud
soda_apikey_secret = 'xxx' # API key secret from Soda Cloud
```
3. In the same script, define the tables in which to store the Soda dataset information and check results in Snowflake, ensuring they are in uppercase to avoid issues with Snowflake's case sensitivity requirements. 
```python
# Tables to store Soda metadata. Use UPPERCASE.
datasets_table = 'DATASETS_REPORT'
checks_table = 'CHECKS_REPORT'
```
4. In the same script, configure your Snowflake connection details. This configuration enables your script to securely access your Snowflake data source. 
```python
# Snowflake connection details
snowflake_details = snowflake.connector.connect(
    user=user,
    password=password,
    account=account,
    warehouse=warehouse,
    database=database,
    schema=schema,
    )
```
5. In the script, prepare an HTTP `GET` request to the Soda Cloud API to retrieve dataset information. Direct the request to the [Dataset information]({% link api-docs/public-cloud-api-v1.md %}#/operations/GET/api/v1/datasets) endpoint, including the authentication API keys to access the data. This script prints an error if the request is unauthorized.
    ```python
    response_datasets = requests.get(
            soda_cloud_url + '/api/v1/datasets?page=0', 
            auth=(soda_apikey , soda_apikey_secret)
            )

    if response_datasets.status_code == 401 or response_datasets.status_code == 403:
        print("Unauthorized or Forbidden access. Please check your API keys and/or permissions in Soda.")
        sys.exit()
    ```
6. Run the script to ensure that the `GET` request results in HTTP status code `200`, confirming the successful connection to Soda Cloud.

## Capture and store metadata

1. With a functional connection to Soda Cloud, adjust the API call to extract all dataset information from Soda Cloud, iterating over each page of the datasets. Then, create a Pandas Dataframe to contain the retrieved metadata. <br />This adjusted call retrieves information about each dataset's name, its last update, the data source in which it exists, its health status, and the volume of checks and incidents with which it is associated.
    ```python
    # Fetch info about all datasets

    if response_datasets.status_code == 200:
        dataset_pages = response_datasets.json().get('totalPages')

        i = 0
        while i < dataset_pages:
            dq_datasets = requests.get(
            soda_cloud_url + '/api/v1/datasets?page='+str(i), 
            auth=(soda_apikey , soda_apikey_secret))

            if dq_datasets.status_code == 200:
                print("Fetching all datasets on page: "+str(i))
                list = dq_datasets.json().get("content")
                datasets.extend(list)
                i += 1
            elif dq_datasets.status_code == 429:
                print("API Rate Limit reached when fetching datasets on page: " +str(i)+ ". Pausing for 30 seconds.")
                time.sleep(30)
                # Retry fetching the same page
            else:
                print("Error fetching datasets on page "+str(i)+". Status code:", dq_datasets.status_code)

    else:
        print("Error fetching initial datasets. Status code:", response_datasets.status_code)
        sys(exit)

    df_datasets = pd.DataFrame(datasets)
    ```
2. Inspect the information you retrieved with the following Pandas command; see example output below. 
```python
df_datasets.head()
```
![df-output](/assets/images/df-output.png){:height="700px" width="700px"} <br />
3. Following the same logic, extract all the check-related information from Soda Cloud using the [Checks information]({% link api-docs/public-cloud-api-v1.md %}#/operations/GET/api/v1/checks) endpoint. <br />This call retrieves information about the checks in Soda Cloud, including the dataset and column each runs against, the latest check evaluation time and the result -- pass, warn, or fail -- and any attributes associated with the check. 
    ```python
    # Fetch info about all checks

    response_checks = requests.get(
        soda_cloud_url + '/api/v1/checks?size=100', 
        auth=(soda_apikey , soda_apikey_secret))

    if response_checks.status_code == 200:
        check_pages = response_checks.json().get('totalPages')

        i = 0
        while i < check_pages:
            dq_checks = requests.get(
                soda_cloud_url + '/api/v1/checks?size=100&page='+str(i), 
                auth=(soda_apikey , soda_apikey_secret))

            if dq_checks.status_code == 200:
                print("Fetching all checks on page "+str(i))
                check_list = dq_checks.json().get("content")
                checks.extend(check_list)
                i += 1 
            elif dq_checks.status_code == 429:
                print("API Rate Limit reached when fetching checks on page: " +str(i)+ ". Pausing for 30 seconds.")
                time.sleep(30)
                # Retry fetching the same page
            else:
                print("Error fetching checks on page "+str(i)+". Status code:", dq_checks.status_code)

    else:
        print("Error fetching initial checks. Status code:", response_checks.status_code)
        sys(exit)

    df_checks = pd.DataFrame(checks)
    ```
4. Again, inspect the output with a Pandas command.
```python
df_checks.head()
```
![df-checks-output](/assets/images/df-checks-output.png){:height="700px" width="700px"} <br />
5. Finally, move the two sets of metadata into your Snowflake data source. Optionally, if you wish to track updates and changes to dataset and check metadata over time, you can store the metadata to incremental tables and set up a flow to update the values on a regular basis using the latest information retrieved from Soda Cloud.
```python
write_pandas(snowflake_details, df_checks, checks_table, auto_create_table=True)
write_pandas(snowflake_details, df_datasets, datasets_table, auto_create_table=True)
``` 
6. Run the script to populate the tables in Snowflake with the metadata pulled from Soda Cloud.


## Build a data quality dashboard in Sigma

To build a custom dashboard, this example uses <a href="https://www.sigmacomputing.com/product/dashboards" target="_blank">Sigma</a>, a cloud-based analytics and business intelligence platform designed to facilitate data exploration and analysis. You may wish to use a different tool to build a dashboard such as Metabase, Lightdash, Looker, PowerBI, or Tableau. 

This example leverages [check attributes]({% link soda-cl/check-attributes.md %}), an optional configuration that helps categorize or segment check results so you can better filter and organize not only your views in Soda Cloud, but your customized dashboard. Checks in this example use the following attributes:
* Data Quality Dimension: Completeness, Validity, Consistency, Accuracy, Timeliness, Uniqueness
* Data Domain: Customer, Location, Product, Transaction
* Data Team: Data Engineering, Data Science, Sales Operations
* Pipeline stage: Destination, Ingest, Report, Transform
* Weight

The weight attribute, in particular, is very useful in allocating a numerical level of importance to checks which you can use to create a custom data health quality score. 

1. Follow the Sigma documentation to <a href="https://help.sigmacomputing.com/docs/connect-to-snowflake"  target="_blank">Connect to Snowflake</a>. 
2. Follow Sigma documentation to access the metadata you stored in Snowflake, either by <a href="https://help.sigmacomputing.com/docs/create-models" target="_blank">Modeling data from database tables</a>, or <a href="https://help.sigmacomputing.com/docs/create-a-dataset-from-sql#create-a-dataset-by-writing-custom-sql" target="_blank">Creating a dataset by writing custom SQL</a>. 
3. Create a new <a href="https://help.sigmacomputing.com/docs/workbooks-overview" target="_blank">workbook</a> in Sigma where you can create your <a href="https://help.sigmacomputing.com/docs/intro-to-visualizations" target="_blank">visualizations</a>. 


The Sigma dashboard below tracks data quality status within an organization. It includes some basic KPI information including the number of datasets monitored by Soda, as well as the number of checks that it regularly executes. It displays a weighted data quality score based on the custom values provided in the `Weight` attribute for each check (here shown according to data quality dimension) which it compares to previous measurements gathered over time.

![sigma-dash](/assets/images/sigma-dash.png){:height="700px" width="700px"}



## Go further

* Access full [Soda Cloud API]({% link api-docs/public-cloud-api-v1.md %}) and [Soda Cloud Reporting API]({% link api-docs/reporting-api-v1.md %}) documentation.
* Learn more about [check attributes]({% link soda-cl/check-attributes.md %}) and [dataset attributes]({% link soda-cloud/organize-datasets.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
