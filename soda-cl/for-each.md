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

<br />

## Configure for each

{% include foreach-config.md %}



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
