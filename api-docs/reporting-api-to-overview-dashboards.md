---
layout: default
title: Build a reporting dashboard
description: This example helps you build a reporting dashboard using the Soda Cloud Reporting API. 
parent: Use case guides
fullwidth: false
---

# Build a reporting dashboard 
*Last modified on {% last_modified_at %}*

This article offers an example for building a data quality reporting dashboard in Sigma using the Soda Cloud API. Such a dashboard enables your team to understand how healthy your data is and how the team is using Soda Cloud. 

This guide provides a comprehensive example of how to extract data from Soda Cloud and store it in Snowflake tables (github repo). Once this is done the information is further used to feed a sigma report that can be fully customizable based on your needs. 


## Set up Python ingestion

To connect to the API endpoints you want to access, use an HTTP request library. This tutorial uses requests and uses the following command to install it.
```shell
pip install pandas requests
```
In addition in this example we use snowflake to store the data so the connector to the datasource is also required. 
```shell
pip install snowflake-connector-python
```
Configure several key variables within your Python script to enable proper integration with Soda Cloud and Snowflake. Start by setting the soda_cloud_url to the appropriate Soda Cloud URL based on your region (US or EU). Next, input your Soda Cloud API key ID and secret into the soda_apikey and soda_apikey_secret variables to authenticate your connection with the Soda Cloud API. Then, define the table names where you intend to store the results in Snowflake, ensuring they are in uppercase to avoid issues with Snowflake's case sensitivity. Lastly, enter your Snowflake connection details, including your username, password, account name, warehouse, database, and schema. This setup will allow your script to securely connect to both Soda Cloud and Snowflake, facilitating the storage of your data in the specified tables.
```yaml
# Soda Cloud Instance

soda_cloud_url = 'https://cloud.us.soda.io' # Your Soda Cloud URL - cloud.us.soda.io (US Customers) cloud.soda.io (EU Customers)
soda_apikey = 'xxx' # User API key ID from Soda Cloud
soda_apikey_secret = 'xxx' # User API key secret from Soda Cloud


# The table NAMES you want to save the results to. Use UPPERCASE to avoid using "" in Snowflake

datasets_table = 'DATASETS_REPORT'
checks_table = 'CHECKS_REPORT'


# Snowflake connection details

user='xxx'
password='xxx'
account='xxx'
warehouse='xxx'
database='xxx'
schema='xxx'

```

You can send an HTTP GET request to the Soda Cloud API to retrieve dataset information. The request is directed to the /api/v1/datasets?page=0 endpoint, with authentication credentials (API key ID and secret) provided to access the data. After making the request, the example checks the response's status code to determine if the request was unauthorized (status code 401) or forbidden (status code 403). If either of these status codes is returned, indicating issues with authentication or permissions, the script prints an error message and exits to prevent further execution.

```python
response_datasets = requests.get(
        soda_cloud_url + '/api/v1/datasets?page=0', 
        auth=(soda_apikey , soda_apikey_secret)
        )

if response_datasets.status_code == 401 or response_datasets.status_code == 403:
    print("Unauthorized or Forbidden access. Please check your API keys and/or permissions in Soda.")
    sys.exit()
```

## Capture data from your Soda Cloud account

Once you make sure that the initial request is successful (HTTP status code 200) you can continue with extracting all the information from the datasets by iteration over each page of the datasets and create a pandas dataframe. 

```python
# Fetch all Datasets

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

You can then use the following pandas command to inspect the information you have retrieved.
```python
df_datasets.head()
```

The output appears similar to the following example.

You are getting information about the datasets name, last update, datasource, health status as well as the number of checks and incidents.

Following the same logic you can extract all the check-related information using the checks endpoint. Below you can find an example code
```python
# Fetch all Checks

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

You can again inspect the results using the pandas head command and the output will look similar to the following example. 

Using the checks endpoint you can get useful details like the check’s name, id, last run, owner, last check value as well as all the user defined attributes which are very important while building the custom dashboard. You can further clean the datasets as well as flatten the columns that contain nested information. 

## Move the captured data into a Snowflake
You can store the results in Snowflake (or any other datasource of your preference) to make them easily and publicly accessible though your organization. 

You can use the following example to create the connection with snowflake. 
```python
snowflake_details = snowflake.connector.connect(
    user=user,
    password=password,
    account=account,
    warehouse=warehouse,
    database=database,
    schema=schema,
    )
```

Afterwards you can move the two sets of data into the data source.
```python
write_pandas(snowflake_details, df_checks, checks_table, auto_create_table=True)
write_pandas(snowflake_details, df_datasets, datasets_table, auto_create_table=True)
```

Tip: If you wish to keep track of the data you can always store it to incremental tables and set up a flow to update them on a regular basis as the Cloud API holds only the latest information. 


## Build a data quality dashboard in Sigma

To build the dashboard this example uses Sigma, a cloud-based analytics and business intelligence platform designed to enable data exploration and analysis. You may wish to use a different solution such as Metabase, Lightdash, Looker, PowerBI or Tableau. 
In this example we leverage the check attributes, an optional configuration for your checks but highly valuable as it allows you to add extra information to your checks as well as act as a filter. 
He have created the following attributes in soda cloud:

Data quality dimension
Data Domain
Data Team
Pipeline stage 
Weight

The reason for this is that we want to segment as much as possible the information and keep track of the status of each one of the specific pieces. On top of that we have added the attributes weight that basically allow us to allocate different importance to the checks and then create our own custom health quality score. 

The first step is to connect Snowflake (which is the datasource where we stored all the metadata) to Sigma as described here. Once this is set up you can create sigma datasets either on top of your snowflake tables or by even writing custom sql queries. 
The next step is to start a new workbook where you can create your visualizations. 
Below you can find an example of a data quality dashboard that keeps track of the status within our organization. Some basic but yet important KPIs include the number of datasets monitored by Soda as well as the number of checks that are performed on a daily basis, coming from the datasets endpoint. We have created a weighted quality score that can be compared to previous days over time and is based on our own custom defined attributes. 
The bar charts below show the status per data quality dimension that is one of our custom attributes and give us an idea of where the major issues are detected. 
Finally, we have barcharts for the Data Domain, Data Team and Pipeline Stage that segment the information and let us keep track of the quality of our data for each one of these attributes. All of the above details come from the checks endpoint. You can define your own attributes to customize your checks and be as dynamic and flexible as possible. 



## Go further

* Access the <a href="https://github.com/sodadata/reporting-api-examples" target="_blank">Reporting API examples repository</a>) in GitHub to get all the code snippets as a Python script that you can run and/or modify. Clone the repo to get started.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Open issues on the [Reporting API examples repository](https://github.com/sodadata/reporting-api-examples) in GitHub.
<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
