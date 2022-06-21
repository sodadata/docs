---
layout: default
title: Filters
description: Instead of checking whole sets of data, you can use SodaCL  filters to specify a portion of data against which Soda Core executes a check.
parent: SodaCL
redirect_from:
- soda-cl/table-filters.html
- soda-cl/dataset-filters.html
---

# Filters 

Use filters to specify portions of data in your dataset against which Soda Core executes checks during a scan.

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
```

[In-check filters](#configure-in-check-filters)<br />
[Dataset filters](#configure-dataset-filters)<br />
<br />

## Configure in-check filters

{% include in-check-filters.md %}

### List of compatible metrics and checks

* all numeric metrics, *except* `duplicate_count`
* all missing metrics
* all validity metrics

## Configure dataset filters

{% include dataset-filters.md %}


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}
