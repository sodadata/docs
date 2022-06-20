---
layout: default
title: Scan output in Soda Cloud
description: Learn how to access Soda Core scan results in Soda Core.
parent: Soda Cloud
---

# Scan output in Soda Cloud

*This document is in transition as Soda Cloud support for Soda SQL ceases in favor of Soda Core.*

Whether you defined [checks YAML file]({% link soda-core/how-core-works.md %}) for Soda Core, or in a [monitor]({% link soda-cloud/monitors.md %}) in Soda Cloud, in the web user interface, all results manifest as Monitor Results. Log in to view the **Monitors** dashboard; each row in the **Monitor Results** table represents the result of a check or monitor, and the icon indicates whether the test passed, warned, or failed.

![monitor-results](/assets/images/monitor-results.png){:height="550px" width="550px"}

**Monitor Results** indicate whether check, or monitors passed or failed during the scan. However, if a scan itself failed to complete successfully, Soda Cloud displays a warning message in the **Datasets** dashboard under the dataset for which scans have failed. Soda Cloud does not send an email or Slack notification when a scan fails, only when checks or monitors fail.

![scan-failed](/assets/images/scan-failed.png){:height="550px" width="550px"}

Soda Core use a secure API to connect to Soda Cloud. When it completes a scan, Soda Core:
1. pushes the results of any checks you configured in the checks YAML file to Soda Cloud
2. fetches checks associated with any monitors you created in Soda Cloud, then executes the checks and pushes the test results to Soda Cloud

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}


## Go further

* Learn more about [Soda products in general]({% link soda/product-overview.md %}) and how the work together to establish and maintain data reliability.
* Questions? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}