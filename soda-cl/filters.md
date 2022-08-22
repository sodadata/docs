---
layout: default
title: Filters and variables
description: Instead of checking whole sets of data, use filters to specify a portion of data against which to execute a check. Use variables to specify values at scan time.
parent: SodaCL
redirect_from:
- soda-cl/table-filters.html
- soda-cl/dataset-filters.html
---

# Filters and variables

Use filters or variables to specify portions of data in your dataset against which Soda Core executes checks during a scan.

```yaml
# In-check filter
checks for dim_employee:
  - max(vacation_hours) < 80:
      name: Too many vacation hours for US Sales
      filter: sales_territory_key = 11

# Dataset filter
filter CUSTOMERS [daily]:
  where: TIMESTAMP '${ts_start}' <= "ts" AND "ts" < TIMESTAMP '${ts_end}'

checks for CUSTOMERS [daily]:
  - row_count = 6
  - missing(cat) = 2

# Variable in a customized check name 
variables:
  name: Customers UK
checks for dim_customer:
  - row_count > 1:
     name: Row count in ${name}
```

[In-check filters](#configure-in-check-filters)<br />
[Dataset filters](#configure-dataset-filters)<br />
[Configure variables](#configure-variables)<br />
[Go further](#go-further)<br />
<br />

## Configure in-check filters

{% include in-check-filters.md %}

### List of compatible metrics and checks

* all numeric metrics, *except* `duplicate_count`
* both missing metrics
* both validity metrics

## Configure dataset filters

{% include dataset-filters.md %}

## Configure variables

{% include variables.md %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Reference [tips and best practices for SodaCL]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl).
* Use a [for each]({% link soda-cl/for-each.md %}) configuration to execute checks on multiple datasets.
* Learn more about [Optional check configurations]({% link soda-cl/optional-config.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
