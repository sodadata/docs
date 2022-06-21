---
layout: default
title: Detect anomalies
description: Soda Cloud automatically creates a monitor that uses a machine learning algorithm to detect anomalies in your time-series data.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/anomaly-detection.html
---

# Detect anomalies

In Soda Cloud, you cannot create anomaly detection monitors for datasets connected to Soda Core, yet. 

Instead, you can use SodaCL to write [anomaly score checks]({% link soda-cl/anomaly-score.md %}) in a [checks YAML file]({% link soda-core/configuration.md %}) for Soda Core to execute during a scan. You can [connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account to see the check results after each scan. 

[Soda Core documentation]({% link soda-core/overview-main.md %})<br />
[SodaCL documentation]({% link soda-cl/soda-cl-overview.md %})


## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
- Learn how to [Create monitors and alerts]({% link soda-cloud/monitors.md %}).
- Learn more about examining [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}