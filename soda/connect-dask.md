---
layout: default
title: Connect Soda to Dask and Pandas
description: Access configuration details to connect Soda to Dask and Pandas.
parent: Data source reference
---

# Connect Soda to Dask and Pandas
*Last modified on {% last_modified_at %}* <br />

For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only. 

Define a programmatic scan for the data in the DataFrames. You do not need to configure a connection to a data source, but you must still configure a connection to Soda Cloud using API Keys. Refer to the following example.

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <br /><a href="https://docs.soda.io/soda/get-started-roadmap.html#about-soda">Learn more</a><br /><br />
</details>


Install package: `soda-pandas-dask`


### Load CSV file into Dataframe

{% include code-header.html %}
```python
import pandas as pd

import dask
import dask.datasets
from soda.scan import Scan

# Config needed to avoid default string conversion to string[pyarrow] see below more info
dask.config.set({"dataframe.convert-string": False})

# Create a Soda scan object
scan = Scan()

# Load timeseries data from dask datasets
df_timeseries = dask.datasets.timeseries().reset_index()
df_timeseries["email"] = "a@soda.io"

# Create an artificial pandas dataframe
df_employee = pd.DataFrame({"email": ["a@soda.io", "b@soda.io", "c@soda.io"]})

# Either add Dask dataframe to scan and assign a dataset name to refer from checks.yaml
scan.add_dask_dataframe(dataset_name="timeseries", dask_df=df_timeseries, data_source_name="orders")
# OR, add Pandas dataframe to scan and assign a dataset name to refer from checks.yaml
scan.add_pandas_dataframe(dataset_name="employee", pandas_df=df_employee, data_source_name="orders")

# Optionally, add multiple dataframes as unique data sources. Note the change of 
# the data_source_name parameter. 
scan.add_dask_dataframe(dataset_name="inquiries", dask_df=[...], data_source_name="customers")

# Set the scan definition name and default data source to use
scan.set_scan_definition_name("test")
scan.set_data_source_name("orders")

# Add configuration YAML file
# You do not need connection to a data source; you must have a connection to Soda Cloud
# Choose one of the following two options:
# 1) From a file
scan.add_configuration_yaml_file(file_path="~/.soda/configuration.yml")
# 2) Inline in the code
# For host, use cloud.soda.io for EU region; use cloud.us.soda.io for US region
scan.add_configuration_yaml_str(
    """
    soda_cloud:
      host: cloud.soda.io
      api_key_id: 2e0ba0cb-your-api-key-7b
      api_key_secret: 5wd-your-api-key-secret-aGuRg
"""

# Define checks in yaml format
# Alternatively, refer to a yaml file using scan.add_sodacl_yaml_file(<filepath>)
checks = """
for each dataset T:
  datasets:
    - include %
  checks:
    - row_count > 0
profile columns:
  columns:
    - employee.%
checks for employee:
    - values in (email) must exist in timeseries (email) # Error expected
    - row_count same as timeseries # Error expected
checks for timeseries:
  - avg_x_minus_y between -1 and 1:
      avg_x_minus_y expression: AVG(x - y)
  - failed rows:
      samples limit: 50
      fail condition: x >= 3
  - schema:
      name: Confirm that required columns are present
      warn:
        when required column missing: [x]
        when forbidden column present: [email]
        when wrong column type:
          email: varchar
      fail:
        when required column missing:
          - y
  - invalid_count(email) = 0:
      valid format: email
  - valid_count(email) > 0:
      valid format: email
"""

scan.add_sodacl_yaml_str(checks)

scan.set_verbose(True)
scan.execute()
```

The `dask.config.set({"dataframe.convert-string": False})` line is needed due to upgrading `dask>=2023.7.1`.<br /><a href="https://docs.dask.org/en/stable/changelog.html#v2023-7-1">More info here.</a><br /><br />
<br />

### Load JSON file into Dataframe

{% include code-header.html %}
```python
import pandas as pd
from soda.scan import Scan

# Create a Soda scan object
scan = Scan()

# Load JSON file into DataFrame
df = pd.read_json('your_file.json')

...
```
<br />

## Troubleshoot

**Problem:** You encounter errors when trying to install `soda-pandas-dask` in an environment that uses Python 3.11. This may manifest as an issue with dependencies or as an error that reads, `Pre-scan validation failed, see logs for details.`

**Workaround:** Uninstall the `soda-pandas-dask` package, then downgrade the version of Python your environment uses to Python 3.9. Install the `soda-pandas-dask` package again. 

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}