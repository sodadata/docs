---
layout: default
title: Connect Soda to Dask and Pandas
description: Access configuration details to connect Soda to Dask and Pandas.
parent: Data source reference
---

# Connect Soda to Dask and Pandas
*Last modified on {% last_modified_at %}* <br />

[Connect configuration reference](#connection-configuration-reference)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Load CSV file into Dataframe](#load-csv-file-into-dataframe)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Load JSON file into Dataframe](#load-json-file-into-dataframe)<br />
[Add optional parameter for `COUNT`](#add-optional-parameter-for-count)<br />
[Add optional parameter for text data conversion](#add-optional-parameter-for-text-data-conversion)<br />
[Troubleshoot](#troubleshoot)<br />
<br />

## Connection configuration reference

For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only. 

Install package: `soda-pandas-dask`

Define a programmatic scan for the data in the DataFrames. You do not need to configure a connection to a data source, but you must still configure a connection to Soda Cloud using API Keys. Refer to the following example.

<details>
    <summary style="color:#00BC7E">Why do I need a Soda Cloud account?</summary>
To validate your account license or free trial, Soda Library must communicate with a Soda Cloud account via API keys. You create a set of API keys in your Soda Cloud account, then use them to configure the connection to Soda Library. <br /><a href="https://docs.soda.io/soda/get-started-roadmap.html#about-soda">Learn more</a><br /><br />
</details>



### Load CSV file into Dataframe

{% include code-header.html %}
```python
import pandas as pd

import dask
import dask.datasets
from soda.scan import Scan

# Read more info in "Note on new release" section
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


## Add optional parameter for `COUNT`

Prior to `soda-pandas-dask` version 1.6.4, Soda only supported `dask-sql` versions up to `2023.10` in which the `COUNT(*)` clause behaved as `COUNT(1)` by default. With `dask-sql` versions greater than `2023.10`, Dask's behavior changed so that `COUNT(*)` behaves as `COUNT(*)`. Therefore, upgrading your `soda-pandas-dask` package, which supports newer versions of `dask-sql` with the new behavior, might lead to unexpected differences in your check results. 

To mitigate confusion, with `soda-pandas-dask` version 1.6.4 or greater, use the optional `use_dask_count_star_as_count_one` parameter when calling `scan.add_dask_dataframe()` or `scan.add_pandas_dataframe()` to explicitly set the behavior of the `COUNT(*)` clause, as in the following example.

|Parameter setting | behavior |
|----------------- | --------- |
| `use_dask_count_star_as_count_one=True`| `COUNT(*)` behaves as SQL `COUNT(1)` operation |
| `use_dask_count_star_as_count_one=False` | `COUNT(*)` behaves as SQL `COUNT(*)` operation |

If you do not add the parameter, Soda defaults to `use_dask_count_star_as_count_one=True`.

{% include code-header.html %}
```python
import pandas as pd

import dask
import dask.datasets
from soda.scan import Scan

# Create a Soda scan object
scan = Scan()

# Load timeseries data from Dask datasets
df_timeseries = dask.datasets.timeseries().reset_index()
df_timeseries["email"] = "a@soda.io"

# Add Dask Dataframe to scan and assign a dataset name to refer from checks.yaml
# Dask uses SQL COUNT(*) operation, instead of COUNT(1)
scan.add_dask_dataframe(dataset_name="timeseries", dask_df=df_timeseries, data_source_name="orders", use_dask_count_star_as_count_one=False)
```

## Add optional parameter for text data conversion

In `dask>=2023.7.1` and later, if you use `pandas>=2` and `pyarrow>=12`, Dask Dataframe automatically converts text data to `string[pyarrow]` data type. With `soda-pandas-dask` version 1.6.4, Soda's updated codebase uses `dask>=2023.7.1` but it still expects text data to be converted to `object` data type. 

Add the `dask.config.set({"dataframe.convert-string": False})` parameter set to `False`, as in the following example, to avoid `KeyError: string[pyarrow]` errors. Access <a href="https://docs.dask.org/en/stable/changelog.html#v2023-7-1" target="_blank">Dask documentation</a> for further details.

{% include code-header.html %}
```python
import pandas as pd

import dask
import dask.datasets
from soda.scan import Scan

# Avoid string conversion errors
dask.config.set({"dataframe.convert-string": False})

# Create a Soda scan object
scan = Scan()

# Load timeseries data from Dask datasets
df_timeseries = dask.datasets.timeseries().reset_index()
df_timeseries["email"] = "a@soda.io"

# Add Dask Dataframe to scan and assign a dataset name to refer from checks.yaml
scan.add_dask_dataframe(dataset_name="timeseries", dask_df=df_timeseries, data_source_name="orders", use_dask_count_star_as_count_one=False)
```

<br />

## Troubleshoot

**Problem:** You encounter errors when trying to install `soda-pandas-dask` in an environment that uses Python 3.11. This may manifest as an issue with dependencies or as an error that reads, `Pre-scan validation failed, see logs for details.`

**Workaround:** Uninstall the `soda-pandas-dask` package, then downgrade the version of Python your environment uses to Python 3.9. Install the `soda-pandas-dask` package again. 

<br />

**Problem:** The `COUNT(*`) behavior in `dask-sql` is behaving unexpectedly or yielding confusing check results.

**Solution:** Upgrade `soda-pandas-dask` to version 1.6.4 or greater and use the optional `use_dask_count_star_as_count_one=True` parameter when calling `scan.add_dask_dataframe()` or `scan.add_pandas_dataframe()` to persist old `dask-sql` behavior. See [Add optional parameter for `COUNT`](#add-optional-parameter-for-count).

<br />

**Problem:** You encounter an error that reads `KeyError: string[pyarrow]`.

**Solution:** Upgrade `soda-pandas-dask` to version 1.6.4 or greater and use the `dask.config.set({"dataframe.convert-string": False})` parameter set to `False`. See [Add optional parameter text data conversion](#add-optional-parameter-for-text-data-conversion).

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}