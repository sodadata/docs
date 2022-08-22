---
layout: default
title: Quick start for Soda Cloud (Preview)
description: Follow the quick start tutorial to get started with Soda Cloud.
parent: Get started
---

# Quick start for Soda Cloud <br /> ![preview](/assets/images/preview.png){:height="70px" width="70px"}

{% include banner-preview.md %}

![soda-cloud-logo](/assets/images/soda-cloud-logo.png){:height="123px" width="123px"}<br />
Though the features highlighted in this tutorial are still in Preview state in Soda Cloud, you can review the steps that outline how to connect to your data source, set a scan schedule, profile your data, then write an agreement for stakeholder approval. 

When made generally available, these new features will enable users across your organization to serve themselves when it comes to monitoring data quality and collaborating on data reliability.

[Tutorial prerequisites](#tutorial-prerequisites-1) <br />
[Set up a data source and create a new agreement](#set-up-a-data-source-and-create-a-new-agreement)<br />
[Go further](#go-further)<br />
<br />

## Prerequisites
* You have created a <a href="https://cloud.soda.io/signup" target="_blank">Soda Cloud account</a>.
* You have [Administrator rights]({% link soda-cloud/roles-and-rights.md %}) in your Soda Cloud account.
* You, or an IT Administrator in your organization, has deployed a [Soda Agent]({% link soda-agent/deploy.md %}) in a cluster in your organization's cloud environment.

## Set up a data source and create a new agreement ![preview](/assets/images/preview.png){:height="70px" width="70px"}

1. Log in to your Soda Cloud account, then navigate to **your avatar** > **Scans & Data**.
2. In the **Agents** tab, confirm that an Administrator has deployed a Soda Agent and that its status is "green" in the **Last Seen** column. If not, contact the Soda Cloud user in your organization who deployed the agent to troubleshoot its status.
![agent-running](/assets/images/agent-running.png){:height="700px" width="700px"}
3. Navigate to the **Data source** tab, then click **New Data Source** and follow the [guided steps]({% link soda-cloud/add-datasource.md %}) to:
* identify the new data source and its default scan schedule
* provide connection configuration details for the data source, including login credentials
* profile the datasets in the data source to gather basic metadata about the contents of each
* identify the datasets to which you wish to apply automated monitoring for anomalies and schema changes
* assign ownership roles for the data source and its datasets
4. After testing and saving the new data source, navigate to the **Agreements** dashboard, then click **New Agreement**.
5. Follow the [guided steps]({% link soda-cloud/agreements.md %}) to:
* label the agreement and identify the data source to which it applies
* write checks to establish what good-quality data looks like; this forms the core of the agreement's contract between stakeholders
* identify stakeholders in your organization that must approve the agreement you have defined 
* identify whom to notify, and how, when a check in the agreement passes, fails, warns, or produces errors
* select a scan schedule for your agreement
6. After testing and saving your agreement, you can return to the **Agreements** dashboard and select the new agreement you just created, which has a status of "Waiting for approval". Click to select your new agreement to review its details and monitor its approval state amongst stakeholders.
![agreement-done](/assets/images/agreement-done.png){:height="700px" width="700px"}

## Go further

* Consider completing the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}).
* Learn the basics of deploying a [Soda Agent]({% link soda-agent/basics.md %}).
* Explore the built-in [metrics and checks]({% link soda-cl/metrics-and-checks.md %}) you can use with SodaCL.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}