---
layout: default
title: For each checks
description: Use a SodaCL  for each check to specify a list of checks you wish to execute on a multiple datasets. 
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

<br />

## Configure for each

{% include foreach-config.md %}



## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}
