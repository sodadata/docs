---
layout: default
title: Scan output in Soda Cloud
description: Learn how to access Soda Core scan results in Soda Core.
parent: Soda Cloud
---

# Scan output in Soda Cloud

When you define checks in a [checks YAML file]({% link soda-core/how-core-works.md %}) and use Soda Core to run a scan, the check results manifest as Monitor Results in Soda Cloud. Log in to view the **Monitors** dashboard; each row in the **Monitor Results** table represents the result of a check, and the icon indicates whether the test passed, warned, or failed.

![monitor-results](/assets/images/monitor-results.png){:height="550px" width="550px"}

<br />

Monitor results indicate whether check passed, warned, or failed during the scan. However, if a scan itself failed to complete successfully, Soda Cloud displays a warning message in the **Datasets** dashboard under the dataset for which scans have failed. Soda Cloud does not send an email or Slack notification when a scan fails, only when checks fail.

![scan-failed](/assets/images/scan-failed.png){:height="550px" width="550px"}

<br />

Soda Core use a secure API to connect to Soda Cloud. When it completes a scan, Soda Core:
1. securely gains access to Soda Cloud
2. pushes the results of any checks you configured in the checks YAML file to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}


## Go further

* Learn more about [Soda products in general]({% link soda/product-overview.md %}) and how the work together to establish and maintain data reliability.
* Learn [How Soda Core works]({% link soda-core/how-core-works.md %}).
* Questions? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}