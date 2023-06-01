---
layout: default
title: Connect Soda to a local file using Dask
description: Set up Soda to programmatically scan the contents of a local file using Dask.
parent: Connect a data source
---

# Connect Soda to a local file using Dask
*Last modified on {% last_modified_at %}*

For use with [programmatic Soda scans]({% link soda-library/programmatic.md %}), only. <br />Refer to [Connect Soda to Dask and Pandas (Experimental)]({% link soda/connect-dask.md %}).

[Define a programmatic scan]({% link soda-library/programmatic.md %}) to use Soda to scan a local file for data quality. Refer to the following example that executes a simple check for row count of the dataset.
{% include code-header.html %}
```python
import dask.datasets as dd
from soda.scan import Scan

# Create Soda Core Scan object and set a few required properties
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

<br />
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}