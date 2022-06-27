---
layout: default
title: Soda Cloud architecture
description: Soda Core connects to data sources and performs scans of datasets. If you connect Soda Core to a Soda Cloud account, it pushes scan results to Soda Cloud.
parent: Soda Cloud
---

# Soda Cloud architecture

<br />

![soda-cloud-arch-core](/assets/images/soda-cloud-arch-core.png){:height="700px" width="700px"}

**Soda Core** connects to data sources and performs scans of each dataset in a data source. If you connect Soda Core to a **Soda Cloud** account, it pushes scan results to Soda Cloud where users in your organization can view monitor results, access Cloud Metric Store data, and integrate with Slack to investigate data quality Incidents.

First, you must [connect your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to your configured instance of Soda Core.  When Soda Core completes a scan, it uses a secure API to push the results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda Core pushes metadata to Soda Cloud; by default all your data (barring any failed rows you explicity instruct Soda Core to send to Soda Cloud) stays inside your private network. See [Data security and privacy]({% link soda/data-privacy.md %})

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}

You can use monitors to view samples of data that [failed a check]({% link soda-cloud/failed-rows.md %}), and track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed checks in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.


## Go further

* Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* Learn more about what happens during a [scan]({% link soda-cloud/scan-output.md %}).
* Learn how to configure [alerts]({% link soda-cloud/agreements.md %}) in Soda Cloud.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}