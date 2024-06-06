---
layout: default
title: GET checks into CSV files
description: Use a Python and the Soda Cloud API to retrieve check and dataset info from a Soda Cloud account and populate CSV files.
parent: Soda Cloud API
---

# GET checks into CSV files
*Last modified on {% last_modified_at %}*

This example Python script uses Pandas and the Soda Cloud API to retrieve information from your Soda Cloud account and prepare two CSV files:
* one file contains information about all the **datasets** in your Soda Cloud account
* one file contains a list of all the **checks** in your Soda Cloud account, including a column attributes you may have added to checks

<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✖️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Library</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud + Soda Agent</small><br />
<br />

## Prerequisites
* You have set up a Soda Cloud account and have connected to a data source via Soda Library or a Soda-hosted or self-hosted Soda Agent. 
* You have prepared at least one data quality check and have run at least one Soda scan in Soda Cloud.
* You have Admin privileges in your Soda Cloud account which gives you permission to access to the account and all its checks and datasets via the API.


## Set up and run

1. Best practice dictates that you use a virtual environment to execute the script. Use the following commands to create and activate a venv, then upgrade pip and install pandas.<br />
MacOS:<br />
```shell
python -m venv .sodaapi 
source .sodaapi/bin/activate 
pip install --upgrade pip  
pip install requests pandas
``` 
Windows:<br />
```shell
python -m venv .sodaapi
source .sodaapi\Scripts\activate
python.exe -m pip install --upgrade pip
python.exe -m pip install requests pandas
```
2. Create a new Python file called `api2csv.py`, then copy the script below into the file. 
3. In the `# Soda Cloud account` section of the file, replace the placeholder values with your own Soda Cloud URL and API key values. See [Generate API keys]({% link soda-cloud/api-keys.md %}) for instructions on how to create new keys.
4. If you wish, change the value of `file_type` in the script to `json` if you prefer that type of output over CSV.
5. Run the script! It saves the new files to the same directory as your `api2csv.py` file.
```shell
python api2csv.py
```
Output:
```shell
Starting collection of all datasets/checks...
Fetching all datasets on page: 0
The following csv file was generated successfully: all_datasets
Fetching all checks on page 0
The following csv file was generated successfully: all_checks
```

<br />

#### API to CSV script

{% include code-header.html %}
```python
import requests
import time
import sys
import pandas as pd
from datetime import datetime

# Soda Cloud account 

soda_cloud_url = 'https://cloud.us.soda.io' # cloud.us.soda.io (US Customers) or cloud.soda.io (EU Customers)
soda_apikey = 'XXX' # Soda Cloud API key ID 
soda_apikey_secret = 'XXX' # Soda Cloud API key secret

# The file names and file type to which you want to save the output (CSV or JSON)

datasets_filename = 'all_datasets'
checks_filename = 'all_checks'
file_type = 'csv'

# ------------------------------------------------------------------------------

if file_type not in ['csv', 'json']:
        print("You must input the correct file_type: csv or json. You input "+file_type)
        sys.exit()

print("Starting collection of all datasets/checks...")

datasets = []
checks = []

response_datasets = requests.get(
        soda_cloud_url + '/api/v1/datasets?page=0', 
        auth=(soda_apikey , soda_apikey_secret)
        )

if response_datasets.status_code == 401 or response_datasets.status_code == 403:
    print("Unauthorized or Forbidden access. Please check your API keys and/or permissions in Soda.")
    sys.exit()

# Collect all datasets

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
current_time = datetime.now().strftime('%Y-%m-%d %I:%M:%S %p')
df_datasets.insert(0, 'record_created', current_time)

# Create datasets file

if file_type == 'csv':
    df_datasets.to_csv(datasets_filename +'.csv', index=False)
if file_type == 'json':
    df_datasets.to_json(datasets_filename +'.json', orient='records', date_format='iso', lines=False)

print(f"The following {file_type} file was generated successfully: {datasets_filename}")


# Fetch all checks

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

# Clean up dataframe

df_checks.insert(0, 'record_created', current_time)
df_checks['dataset_id'] = df_checks['datasets'].apply(lambda x: x[0]['id'] if x else None)
df_checks['dataset_name'] = df_checks['datasets'].apply(lambda x: x[0]['name'] if x else None)
df_checks['dataset_url'] = df_checks['datasets'].apply(lambda x: x[0]['cloudUrl'] if x else None)
df_checks['lastCheckResultValue'] = df_checks['lastCheckResultValue'].apply(lambda x: x.get('value') if isinstance(x, dict) and 'value' in x else (x.get('valueLabel') if isinstance(x, dict) and 'valueLabel' in x else x))
df_checks['attributes'] = df_checks['attributes'].fillna({})
df_checks['check_owner'] = df_checks['owner'].apply(lambda x: x.get('firstName', '') + ' ' + x.get('lastName', '') if isinstance(x, dict) else '')
df_checks['owner_email'] = df_checks['owner'].apply(lambda x: x.get('email', '') if isinstance(x, dict) else '')

# Rename columns

df_checks.rename(columns={'id': 'check_id'}, inplace=True)
df_checks.rename(columns={'name': 'check_name'}, inplace=True)
df_checks.rename(columns={'evaluationStatus': 'check_status'}, inplace=True)
df_checks.rename(columns={'definition': 'check_definition'}, inplace=True)
df_checks.rename(columns={'cloudUrl': 'check_url'}, inplace=True)

# Add attribute names as separate columns with attribute values

for index, row in df_checks.iterrows():
    attributes_dict = row['attributes']
    for key in attributes_dict:
        column_name = key
        column_value = attributes_dict[key]
        df_checks.at[index, column_name] = column_value

# Drop original columns

df_checks = df_checks.drop(columns=['attributes'])
df_checks = df_checks.drop(columns=['datasets'])
df_checks = df_checks.drop(columns=['owner'])

# Create checks file

if file_type == 'json':
    df_checks.to_json(checks_filename +'.json', orient='records', date_format='iso', lines=False)

if file_type == 'csv':
    df_checks.to_csv(checks_filename +'.csv', index=False)

print(f"The following {file_type} file was generated successfully: {checks_filename}")
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