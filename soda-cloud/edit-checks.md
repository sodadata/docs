---
layout: default
title: Edit checks
description: 
parent: Soda Cloud
---

# Edit checks in Soda Cloud 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

In Soda Cloud, you can only create new checks as part of an [agreement]({% link soda-cloud/agreements.md %}); you cannot create individual checks independent of an agreement.<sup>1</sup>

However, if you have connected [Soda Core]({% link soda-core/overview-main.md %}) to your Soda Cloud account and run a scan using checks you wrote in a [checks YAML]({% link soda/glossary.md %}#checks-yaml) file, you can see check results **Check Results** table. If you wish, you can edit those existing checks to add or adjust attributes or notifications.

1. In Soda Cloud, navigate to the **Checks** dashboard, then click the stacked dots at the right of the check you wish to edit and select **Edit Check**.
2. Make changes to existing **Notifications**, or use the search bar to add or remove notifications.
3. Navigate to the **Attributes** tab, then change the value for the Check Owner field and add any details to the Description field, then Save.

<br />
<br />
<sup>1</sup> You can still create an individual check for a dataset that you connected to Soda Cloud via Soda SQL, a legacy product. Soda SQL is deprecated and, shortly, the ability to create individual checks in Soda Cloud will also be deprecated.

## Go further

* Integrate your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}), [Jira, and more]({% link soda/integrate-webhooks.md %}) to send alert notifications to a third-party service provider.
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. ![preview](/assets/images/preview.png){:height="70px" width="70px"}
* Complete the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write a few simple checks for data quality.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}