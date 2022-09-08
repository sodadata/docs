---
layout: default
title: Integrate Soda Cloud with Slack
description: Integrate your Slack workspace in your Soda Cloud account so that Soda Cloud can send Slack notifications to your team when a data issue triggers an alert.
parent: Integrate Soda
---

# Integrate Soda Cloud with Slack

{% include integrate-slack-steps.md %}

## Set a default Slack channel for notifications

You can set a default Slack channel that Soda Cloud applies to all alert notifications. If you have not already set the default Slack channel when you initially set up the integration, you can edit it to set the default.

1. In your Soda Cloud account, go to **your avatar** > **Organization Settings**.
2. Go to the **Integrations** tab, then click the stacked dots to the right of the Slack integration. Select **Edit Integration Settings**.
3. In the **Slack Channels** dialog, go to the **Scope** tab.
4. Select a default Slack channel to which sends Soda Cloud notifications for all existing and new checks. **Save** for your changes to take effect.


## Go further

* [Connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account.
* Learn more about using Slack to collaborate on resolving [Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}