---
description: Set up Soda to programmatically scan the contents of a local file using Dask.
---

# Connect Soda to a local file using Dask

For use with [programmatic Soda scans](../quick-start-sip/programmatic.md), only.\
Refer to [Connect Soda to Dask and Pandas](connect-dask.md).

[Define a programmatic scan](../quick-start-sip/programmatic.md) to use Soda to scan a local file for data quality. Refer to the following example that executes a simple check for row count of the dataset.

```python
import dask.dataframe as dd
from soda.scan import Scan

# Create Soda Library Scan object and set a few required properties
scan = Scan()
scan.set_scan_definition_name("test")
scan.set_data_source_name("dask")

# Read a `cities` CSV file with columns 'city', 'population'
ddf = dd.read_csv('cities.csv')

scan.add_dask_dataframe(dataset_name="cities", dask_df=ddf)

# Define checks using SodaCL

checks = """
checks for cities:
    - row_count > 0
"""

# Add the checks to the scan and set output to verbose
scan.add_sodacl_yaml_str(checks)

scan.set_verbose(True)

# Execute the scan
scan.execute()

# Inspect the scan object to review scan results
scan.get_scan_results()
```
