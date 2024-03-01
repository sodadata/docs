---
layout: default
title: For each checks
description: Use a SodaCL for each check to specify a list of checks you wish to execute on a multiple datasets. 
parent: SodaCL reference
---

# For each 
*Last modified on {% last_modified_at %}*

Use a for each configuration to execute checks against multiple datasets during a scan.
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_products%
    - fact%
    - exclude fact_survey_response
  checks:
    - row_count > 0
```
<small>✖️ &nbsp;&nbsp; Requires Soda Core Scientific (included in a Soda Agent)</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Core</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Library + Soda Cloud</small><br />
<small>✔️ &nbsp;&nbsp; Supported in Soda Cloud Agreements + Soda Agent</small><br />
<small>✖️ &nbsp;&nbsp; Supported by SodaGPT</small><br />
<small>✖️ &nbsp;&nbsp; Available as a no-code check</small>
<br />

[Define a for each configuration](#define-a-for-each-configuration)<br />
[Limitations and specifics](#limitations-and-specifics)<br />
[Optional check configurations](#optional-check-configurations) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Add a dynamic name to for each checks](#add-a-dynamic-name-to-for-each-checks)<br />
[For each results in Soda Cloud](#for-each-results-in-soda-cloud)<br />
[Go further](#go-further)<br />
<br />


## Define a for each configuration

{% include foreach-config.md %}

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a for each check; see [example](#example-with-check-name). | [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names)|
| ✓ | Add an identity to a check. | [Add a check identity]({% link soda-cl/optional-config.md %}#add-a-check-identity) |
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration).| [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations). |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-in-check-filter).| [Add an in-check filter]({% link soda-cl/optional-config.md %}#add-a-filter-to-a-check). |
|   | Use quotes when identifying dataset or column names. | - |
| ✓ | Use wildcard characters ({% raw %} % {% endraw %}) in values in the for each configuration; see [example](#example-with-wildcard). | - |
|   | Apply a dataset filter to partition data during a scan. | - |


#### Example with check name
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_employee

  checks:
    - max(vacation_hours) < 80:
        name: Too many vacation hours for US Sales
```

#### Example with alert configuration
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_employee
    - dim_customer

  checks:
    - row_count:
        fail:
          when < 5
        warn:
          when > 10
```

#### Example with in-check filter
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_employee

  checks:
    - max(vacation_hours) < 80:
        filter: sales_territory_key = 11
```

#### Example with wildcard
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_%

  checks:
    - row_count > 1
```

### Add a dynamic name to for each checks

To keep your for each check results organized in Soda Cloud, you may wish to dynamically add a name to each check so that you can easily identify to which dataset the check result applies. 

For example, if you use for each to execute an anomaly detection check on many datasets, you can use a variable in the syntax of the check name so that Soda dynamically adds a dataset name to each check result.
{% include code-header.html %}
```yaml
for each dataset R:
  datasets:
    - retail%
  checks:
    - anomaly detection for row_count:
        name: Row count anomaly for ${R}
```

## For each results in Soda Cloud

Soda pushes the check results for each dataset to Soda Cloud where each check appears in the **Checks** dashboard, with an icon indicating their latest scan result. Filter the results by dataset to review dataset-specific results.
{% include code-header.html %}
```yaml
for each dataset T:
  datasets:
    - dim_employee
    - dim_customer

  checks:
    - row_count > 1
```

![foreach-cloud](/assets/images/foreach-cloud.png){:height="700px" width="700px"} 

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
