---
layout: default
title: Integrate Soda Cloud with Slack
description: Integrate your Slack workspace in your Soda Cloud account so that Soda Cloud can send Slack notifications to your team when a data issue triggers an alert.
parent: Integrate Soda
---

# Integrate Soda Cloud with Slack
*Last modified on {% last_modified_at %}*

{% include integrate-slack-steps.md %}

## Integration for Soda Cloud alert notifications

You can use this integration to enable Soda Cloud to send alert notifications to a Slack channel to notify your team of warn and fail check results. 

With such an integration, Soda Cloud enables users to select a Slack channel as the destination for an alert notification of an individual check or checks that form a part of an agreement, or multiple checks. 

To send notifications that apply to multiple checks, see [Set notification rules]({% link soda-cloud/notif-rules.md %}). 


## Integration for Soda Cloud incidents

You can use this integration to notify your team when a new incident has been created in Soda Cloud. With such an integration, Soda Cloud displays an external link to an incident-specific Slack channel in the **Incident Details**. 

Refer to [Incidents]({% link soda-cloud/incidents.md %}) for more details about using incidents in Soda Cloud.


## Set a default Slack channel for notifications

You can set a default Slack channel that Soda Cloud applies to all alert notifications. If you have not already set the default Slack channel when you initially set up the integration, you can edit it to set the default.

1. In your Soda Cloud account, go to **your avatar** > **Organization Settings**.
2. Go to the **Integrations** tab, then click the stacked dots to the right of the Slack integration. Select **Edit Integration Settings**.
3. In the **Slack Channels** dialog, go to the **Scope** tab.
4. Select a default Slack channel to which sends Soda Cloud notifications for all existing and new checks. **Save** for your changes to take effect.


## Go further

* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account.
* Learn more about using Slack to collaborate on resolving [Incidents]({% link soda-cloud/incidents.md %}).
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