---
layout: default
title: Examine failed rows samples
description: To offer more insight into the data that failed a test during a scan, Soda Cloud can display failed rows in a check's history.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/failed-rows.html
---

# Examine failed rows samples
*Last modified on {% last_modified_at %}*

When a Soda scan results in a failed check, Soda Cloud displays details of the scan results in each check's **Check History** view. To offer more insight into the data that failed a check during a scan, Soda Cloud can display **failed rows samples** in a check's history. 

From the **Checks Results** dashboard, navigate to an indivdual check result history page, then click the **Failed rows** tab (pictured below) to see the failed rows samples associated with a failed check result. 

![failed-rows](/assets/images/failed-rows.png){:height="600px" width="600px"}

## Implicitly send failed rows samples

Implicitly, Soda automatically collects 100 failed row samples for the following checks:
* [reference check]({% link soda-cl/reference.md %}#failed-row-samples) 
* checks that use a [missing metric]({% link soda-cl/missing-metrics.md %}#failed-row-samples)
* checks that use a [validity metric]({% link soda-cl/validity-metrics.md %}#failed-row-samples)
* checks that use a [duplicate_count or duplicate_percent metric]({% link soda-cl/numeric-metrics.md %}#failed-row-samples)

<br />

#### Troubleshoot

{% include troubleshoot-failed-rows.md %}

<br />

## Explicitly send failed rows samples

Define a [failed rows check]({% link soda-cl/failed-rows-checks.md %}) to explicitly send samples of rows that failed a check to Soda Cloud.

## Disable failed row samples

Where your datasets contain sensitive or private information, you may *not* want to send failed row samples from your data source to Soda Cloud. In such a circumstance, you can disable the feature completely in Soda Cloud.

{% include disable-all-samples.md %}

See also: [Set a sample limit for a data source]({% link soda-cl/failed-rows-checks.md %}(#set-a-sample-limit))

<br />

### Disable sampling for specific columns

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can add a configuration to your data source connection details to prevent Soda from collecting failed rows samples from specific columns that contain sensitive data. 

Refer to [Disable failed rows sampling for specific columns]({% link soda-cl/failed-rows-checks.md %}#disable-failed-rows-sampling-for-specific-columns).

<br />

### Disable failed row samples for individual checks

For checks which implicitly or explcitly collect [failed rows samples]({% link soda-cl/failed-rows-checks.md %}#about-failed-row-samples), you can set the `samples limit` to `0` to prevent Soda from collecting and sending failed rows samples for an individual check, as in the following example.

```yaml
checks for dim_customer:
  - missing_percent(email_address) < 50:
      samples limit: 0
```
<br />


## Go further

* <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
* Learn more about [scans in Soda Cloud]({% link soda-cloud/scan-output.md %}).
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}