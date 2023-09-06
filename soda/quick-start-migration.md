---
layout: default
title: Test data for migration
description: 
parent: Use case setup guides
---

# Test data for migration
*Last modified on {% last_modified_at %}*

Identify your source & target
E.g. on-prem database & cloud data warehouse
Setup data migration process (e.g. in Airflow)
Setup staging environment to enable the prevention of bad quality data getting into your target
Install Soda Library
Verify the data quality of your source databaseb by creating a checks.yml file
Null checks
Validity checks
…
Execute on top of your source
Migrate your source data into your staging environment
Run reconciliation checks to verify the completeness and accuracy of your data
Run metric comparisons
Run record comparisons
If = passing
Migrate data to your target
Good quality target state 🎉



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