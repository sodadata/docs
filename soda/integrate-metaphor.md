---
layout: default
title: Integrate Soda Cloud with Metaphor
description: Integrate Soda with Metaphor to access details about the quality of your data from right within the data catalog.
parent: Integrate Soda
---

# Integrate Soda Cloud with Metaphor
*Last modified on {% last_modified_at %}*

Integrate Soda with Metaphor to access details about the quality of your data from within the data catalog. The following video illustrates how to take advantage of the integration.

<div style="padding:min(62.5%, calc(430px)) 0 0 0;position:relative; border:1px solid #333"><iframe src="https://player.vimeo.com/video/656375442?h=a811ec4d0f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Data Catalog + Data Quality Integration - Metaphor"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}), [connected]({% link soda-library/configure.md %}) to an instance of Soda Library.
* You have [configured Soda Library]({% link soda-library/configure.md %}) to access the data source on which you want to run quality checks.
* You have completed at least one [Soda scan]({% link soda-library/run-a-scan.md %}) to validate that the data source’s datasets appear in Soda Cloud as expected.
* You have a Metaphor account with the privileges necessary to allow you to add a data source.
* You have a git repository in which to store the integration project files.


## Set up the integration

1. Sign into your Soda Cloud account and confirm that you see the datasets you expect to see in the data source you wish to test for quality.
2. To connect your Soda Cloud account to your Metaphor account, create an `.env` file in your integration project in your git repo and include details according to the example below. To obtain the values for your Soda API keys, refer to [Configure Soda Library]({% link soda-library/configure.md %}). <br />
    ```yaml
    SODA_HOST=cloud.soda.i
    SODA_API_KEY_ID
    SODA_API_KEY_SECRET
    METAPHOR_ACCESS_KEY_ID
    METAPHOR_SECRET_ACCESS_KEY
    # s3 bucker path without trailing slash
    METAPHOR_S3_PATH
    SODA_LOGGING_LEVEL=INF
    ```


## Run the integration

Contact <a href="mailto:support@soda.io">Soda Support</a> directly to acquire the assets and instructions to run the integration and view Soda Cloud details in your Metaphor catalog.


## Use the integration

Access Soda Cloud to [create agreements]({% link soda-cloud/agreements.md %}) that execute checks against datasets in your data source each time you [run a Soda scan manually]({% link soda-library/run-a-scan.md %}), or [orchestrate a scan]({% link soda-library/orchestrate-scans.md %}) using a data pipeline tool such as Airflow. Soda Cloud pushes data quality scan results to the corresponding data source in Metaphor so that users can review data quality information from within the catalog. 

Refer to video above for details.


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Access a list of <a href="https://www.soda.io/integrations" target="_blank">all integrations</a> that Soda Cloud supports.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}