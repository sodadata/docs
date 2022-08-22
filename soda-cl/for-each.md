---
layout: default
title: For each checks
description: Use a SodaCL for each check to specify a list of checks you wish to execute on a multiple datasets. 
parent: SodaCL
---

# For each 

Use a for each configuration to execute checks against multiple datasets during a scan.

```yaml
for each dataset T:
  datasets:
    - dim_products%
    - fact%
    - exclude fact_survey_response
  checks:
    - row_count > 0
```

[Define a for each configuration](#define-a-for-each-configuration)<br />
[Limitations and specifics](#limitations-and-specifics)<br />
[Optional check configurations](#optional-check-configurations) <br />
[For each results in Soda Cloud](#for-each-results-in-soda-cloud)<br />
[Go further](#go-further)<br />
<br />


## Define a for each configuration

{% include foreach-config.md %}

## Optional check configurations

| Supported | Configuration | Documentation |
| :-: | ------------|---------------|
| ✓ | Define a name for a for each check; see [example](#example-with-check-name). | [Customize check names]({% link soda-cl/optional-config.md %}#customize-check-names)|
| ✓ | Define alert configurations to specify warn and fail alert conditions; see [example](#example-with-alert-configuration).| [Add alert configurations]({% link soda-cl/optional-config.md %}#add-alert-configurations). |
| ✓ | Apply an in-check filter to return results for a specific portion of the data in your dataset; see [example](#example-with-in-check-filer).|  |
| ✓ | Use quotes when identifying dataset or column names; see [example](#example-with-quotes) .| [Use quotes in a check]({% link soda-cl/optional-config.md %}#use-quotes-in-a-check) |
| ✓ | Use wildcard characters ({% raw %} % {% endraw %} in values in the for each configuration; see [example](#example-with-wildcard). | - |
|   | Apply a dataset filter to partition data during a scan. | - |


#### Example with check name

```yaml
for each dataset T:
  datasets:
    - dim_employee

  checks:
    - max(vacation_hours) < 80:
        name: Too many vacation hours for US Sales
```

#### Example with alert configuration

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

```yaml
for each dataset T:
  datasets:
    - dim_employee

  checks:
    - max(vacation_hours) < 80:
        filter: sales_territory_key = 11
```

#### Example with quotes

```yaml
for each dataset T:
  datasets:
    - dim_employee
    - "dim_customer"

  checks:
    - row_count > 1
```

#### Example with wildcard

```yaml
for each dataset T:
  datasets:
    - dim_%

  checks:
    - row_count > 1
```


## For each results in Soda Cloud

If you have connected Soda Core to a Soda Cloud account, Soda Core pushes the check results for each dataset to Soda Cloud as individual rows in the **Check Results** table. Filter the results by dataset to review dataset-specific results.

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

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
