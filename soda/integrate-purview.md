---
layout: default
title: Integrate Soda with Purview
description: Integrate Soda with Microsoft Purview to access details about the quality of your data from right within your data catalog.
parent: Integrate Soda
---

# Integrate Soda with Purview
*Last modified on {% last_modified_at %}*

Integrate Soda with Microsoft's Purview data catalog to access details about the quality of your data from within the catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a data source, dataset, or column in Purview.
* Give your Purview-using colleagues the confidence of knowing that the data they are using is sound.
* Encourage others to add data quality checks using a link in Purview that connects directly to Soda.

In Purview, you can see all the Soda data quality checks and the value associated with the check's latest measurement, the health score of the dataset, and the timestamp for the most recent update. Each of these checks listed in Purview includes a link that opens a new page in Soda Cloud so you can examine diagnostic and historic information about the check.

![check-in-purview](/assets/images/check-in-purview.png){:height="700px" width="700px"}

Purview displays the latest check results according to the most recent Soda scan for data quality, where color-coded icons indicate the latest result. A gray icon indicates that a check was not evaluated as part of a scan.

![check-fail-purview](/assets/images/check-fail-purview.png){:height="700px" width="700px"}

If Soda is performing no data quality checks on a dataset, the instructions in Purview invite a catalog user to access soda and create new checks.

![add-check-purview](/assets/images/add-check-purview.png){:height="450px" width="450px"}

## Prerequisites

* You have completed at least one [Soda scan]({% link soda-library/run-a-scan.md %}) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have a Purview account with the privileges necessary to collect the information Soda needs to complete the integration.


## Set up the integration

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2. In your Soda Cloud account, navigate to **your avatar** > **Profile**, then navigate to the **API Keys** tab. Click the plus icon to generate new API keys.
3. Copy the the values for **API Key ID** and **API Key Secret** and paste to a temporary secure, local location.
4. Access <a href="https://learn.microsoft.com/en-us/purview/tutorial-using-rest-apis" target="_blank"> Purview tutorial using REST APIs</a> for instructions on how to create `client_id`, `client_secret`, and `tenant_id`, then paste to a temporary secure, local location.
5. Copy the value of your purview endpoint from the URL (https://XXX.purview.azure.com) and paste to a temporary secure, local location.
6. To connect your Soda Cloud account to your Purview Account, contact your Soda Account Executive or email <a href="mailto:support@soda.io">Soda Support</a> with the details you collected in the previous steps to request Purview integration.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}