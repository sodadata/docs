---
layout: default
title: Edit monitors
description: Log in to Soda Cloud to customize the notifications Soda Cloud sends to your team when a Soda Core scan surfaces data issues.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/monitors.html
---

# Edit monitors

A **monitor** is the manifestation of a [SodaCL check]({% link soda/glossary.md %}#check) in Soda Cloud. Log in to **Soda Cloud** to customize the [notifications]({% link soda/glossary.md %}#notification) that Soda Cloud sends to your team when a [scan]({% link soda/glossary.md %}#scan) surfaces data issues.

In Soda Cloud, you cannot create new monitors for datasets connected to Soda Core, yet. 

Instead, you can use SodaCL to write checks in a [checks YAML file]({% link soda-core/configuration.md %}) for Soda Core to execute during a scan. You can [connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account to see the check results in the **Monitors** dashboard after each scan. 

Consider following the [Quick start for Soda Core with Soda Cloud]({% link soda/quick-start-soda-core.md %}) to learn how to do so.

[Soda Core documentation]({% link soda-core/overview-main.md %})<br />
[SodaCL documentation]({% link soda-cl/soda-cl-overview.md %})

## Edit checks in Soda Cloud

If you have connected Soda Core to your Soda Cloud account and run a scan, you can see check results in the list of Monitor Results in the **Monitors** dashboard. If you wish, you can edit the checks to add attributes and adjust notification details.

1. In Soda Cloud, navigate to the **Monitors** dashboard, then click the stacked dots at the right of the check you wish to edit and select **Edit monitor**.
2. In the **Notifications** tab, use the drop-downs to modify existing alerts, or use the search bar to add more notification recipients.
3. Navigate to the **Attributes** tab, then change the value for the **Monitor Owner** field and add any details to the **Description** field, if you wish, then **Save**.



## Go further

* Learn more about [how scans work]({% link soda-cloud/scan-output.md %}) in Soda Cloud.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Learn more about [Soda Cloud architecture]({% link soda-cloud/soda-cloud-architecture.md %}).
* Integrate Soda with your [data catalogs]({% link soda/integrate-alation.md %}) or [data pipeline tools]({% link soda/integrate-dbt.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.


<br />

---
{% include docs-footer.md %}