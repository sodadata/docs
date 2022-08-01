---
layout: default
title: Examine failed rows
description: To offer more insight into the data that failed a test during a scan, Soda Cloud can display failed rows in a check's history.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Examine failed rows

When a Soda Core scan results in a failed check, Soda Cloud displays details of the scan results in each check's **Check History** view. To offer more insight into the data that failed a check during a scan, Soda Cloud can display **failed rows** in a check's history. 

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}

## Use metrics to send failed row samples

Use SodaCL to write a check that uses a [duplicate_count]({% link soda-cl/numeric-metrics.md %}#send-failed-rows-to-soda-cloud), [missing]({% link soda-cl/missing-metrics.md %}#send-failed-rows-to-soda-cloud) or [validity]({% link soda-cl/validity-metrics.md %}#send-failed-rows-to-soda-cloud) metric in a [checks YAML file]({% link soda-core/configuration.md %}) for Soda Core to execute during a scan. You can [connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account to see the check results after each scan. 

If you use one of the above-listed metrics in checks you write using SodaCL, Soda Core automatically sends a sample of the failed rows associated with the failed check to Soda Cloud with the scan results.
<br />

#### Troubleshoot

{% include troubleshoot-failed-rows.md %}



## Use checks to send failed rows 

Define a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) in a checks YAML file to explicitly send samples of rows that failed a check to Soda Cloud.

## Disable failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}


## Go further

* <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
* Learn more about [scans in Soda Cloud]({% link soda-cloud/scan-output.md %}).
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}