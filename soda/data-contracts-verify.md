---
layout: default
title: 
description: 
parent: Create a data contract
---

# Title
*Last modified on {% last_modified_at %}*


## Enforce a data contract

In a programmatic scan, Soda translates data contract standards into Soda Checks Language, then executes the standards as data quality checks during a scan. To initiate the translation and scan, prepare a programmatic scan using the following example.

```python
from soda.contracts.data_contract_translator import DataContractTranslator
from soda.scan import Scan
import logging

# Read the data contract file as a Python str
with open("dim_customer_data_contract.yml") as f:
    data_contract_yaml_str: str = f.read()

# Translate the data contract standards into SodaCL
data_contract_parser = DataContractTranslator()
sodacl_yaml_str = data_contract_parser.translate_data_contract_yaml_str(data_contract_yaml_str)

# Log or save the SodaCL checks file to help with debugging  
logging.debug(sodacl_yaml_str)

# Execute the translated SodaCL checks in a scan
scan = Scan()
scan.set_data_source_name("SALESDB")
scan.add_configuration_yaml_file(file_path="~/.soda/my_local_soda_environment.yml")
scan.add_sodacl_yaml_str(sodacl_yaml_str)
scan.execute()
scan.assert_no_checks_fail()
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