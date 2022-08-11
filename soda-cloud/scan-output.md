---
layout: default
title: Scan output in Soda Cloud
description: Learn how to access Soda Core scan results in Soda Core.
parent: Soda Cloud
---

# Scan output in Soda Cloud

When you define checks in a [checks YAML file]({% link soda-core/how-core-works.md %}) and use Soda Core to run a scan, the check results manifest in the **Checks Results** table in Soda Cloud. Log in to view the **Checks** dashboard; each row in the **Checks Results** table represents the result of a check, and the icon indicates whether the test passed, warned, or failed.

![check-results](/assets/images/check-results.png){:height="700px" width="700px"}

<br />

Check results indicate whether check passed, warned, or failed during the scan. However, if a scan itself failed to complete successfully, Soda Cloud displays a warning message in the **Datasets** dashboard under the dataset for which scans have failed. Soda Cloud does not send an email or Slack notification when a scan fails, only when checks fail.

![scan-failed](/assets/images/scan-failed.png){:height="550px" width="550px"}

<br />

Soda Core use a secure API to connect to Soda Cloud. When it completes a scan, Soda Core:
1. securely gains access to Soda Cloud
2. pushes the results of any checks you configured in the checks YAML file to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}

## Overwrite scan output in Soda Cloud

When you use Soda Core to run a scan, Soda Core sends the test reults to Soda Cloud where they manifest as rows in the Check Results table. If you wish to overwrite a check result, you can do so by running the scan again and overwriting the timestamp.

In Soda Core, use the `-t` or `--data-timestamp` option in your `soda scan` command and provide a timestamp date in ISO8601 format, as in the following example.

```shell
soda scan -d adventureworks -t 2021-04-28T09:00:00+02:00 -c configuration.yml tables/orders.yml
```

See [Add scan options]({% link soda-core/scan-core.md %}#add-scan-options) for more scan options.


## Go further

* Learn more about [Soda products in general]({% link soda/product-overview.md %}) and how the work together to establish and maintain data reliability.
* Learn [How Soda Core works]({% link soda-core/how-core-works.md %}).
* Questions? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}