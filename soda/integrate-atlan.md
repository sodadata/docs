---
layout: default
title: Integrate Soda with Atlan
description: Integrate Soda with Atlan to access details about the quality of your data from right within your data catalog.
parent: Integrate Soda
---

# Integrate Soda with Atlan
*Last modified on {% last_modified_at %}*

Integrate Soda with Atlan to access details about the quality of your data from within the data catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a data source, dataset, or column in Atlan.
* Use Soda Cloud to flag poor-quality data in lineage diagrams and during live querying.
* Give your Atlan users the confidence of knowing that the data they are using is sound.


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}), [connected]({% link soda-library/configure.md %}) to an instance of Soda Library.
* You have [configured Soda Library]({% link soda-library/configure.md %}) to access the data source on which you want to run quality checks.
* You have completed at least one [Soda scan]({% link soda-library/run-a-scan.md %}) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have an Atlan account with the privileges necessary to allow you to set up a Connection in your Atlan workspace.


## Set up the integration

Follow <a href="https://ask.atlan.com/hc/en-us/articles/7241035988113-Supported-sources#business-intelligence-tools-0-2" target="_blank">Atlan's documentation</a> to set up the Connection to Soda in your Atlan workspace.

Follow the instructions to [Generate API keys]({% link soda-cloud/api-keys.md %}) in Soda to use for authentication in your Atlan connection.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />
* Access a list of <a href="https://www.soda.io/integrations" target="_blank">all integrations</a> that Soda Cloud supports.
* Use a [webhook]({% link soda/integrate-webhooks.md %}) to integrate with Jira, ServiceNow, and other tools your team already uses.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}