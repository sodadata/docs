---
layout: default
title: Integrate Soda with MS Teams
description: Integrate MS Teams in your Soda Cloud account so that Soda sends alert notifications and incident events to your MS Teams conversation.
parent: Integrate Soda
---

# Integrate Soda with Microsoft Teams 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Configure Soda Cloud to connect your account to MS Teams so that you can:

* send [alert notifications]({% link soda-cloud/notif-rules.md %}) for failed or warning check results to MS Teams channel
* start conversations to track and resolve data quality [incidents]({% link soda-cloud/incidents.md %}) with MS Teams


## Configure an MS Teams integration

<div class="info">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  Microsoft has announced that they are <strong><a href="https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/">retiring Office 365 connectors</a></strong> within Microsoft Teams effective August 15, 2024. <br /><br />
  If you have previously set up a Soda integration with an Office 365 connector, follow the instructions for <a href="https://support.microsoft.com/en-us/office/creating-a-workflow-from-a-channel-in-teams-242eb8f2-f328-45be-b81f-9817b51a5f0e" target="_blank">Creating a workflow from a channel in Teams</a>, then update the integration URL in your existing Soda <> MS Teams integration in Soda Cloud.   
</div>

1. As a user with permission to do so, log in to your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
2. Click the **+** at the upper right of the table of integrations to add a new integration. 
3. In the **Add Integration** dialog box, select **Microsoft Teams**.
4. In the first step of the guided integration workflow, follow the instructions to navigate to your MS Teams account to create a Workflow; see Microsoft's documentation for <a href="https://support.microsoft.com/en-us/office/creating-a-workflow-from-a-channel-in-teams-242eb8f2-f328-45be-b81f-9817b51a5f0e" target="_blank">Creating a workflow from a channel in Teams</a>. Use the Workflow template to **Post to a channel when a webhook request is received**.
5. In the last step of the guided Workflow creation, copy the URL created after successfully adding the workflow. <br />
![workflow-url](/assets/images/workflow-url.png){:width="500px"}
6. Returning to Soda Cloud with the URL for Workflow, continue to follow the guided steps to complete the integration. Reference the following tables for guidance on the values to input in the guided steps. <br /> 

| Field or Label  |  Guidance |
| --------------- |  -------- |
| Name | Provide a unique name for your integration in Soda Cloud.|
| URL | Input the Workflow URL you obtained from MS Teams.|
| Enable to send notifications to Microsoft Teams when a check result triggers an alert. | Check to allow users to select MS Teams as a destination for alert notifications when check results warn or fail. |  
| Use Microsoft Teams to track and resolve incidents in Soda Cloud. | Check to automatically send incident information to an MS Teams channel.|
| Channel URL | Provide a channel identifier to which Soda Cloud sends all incident events. |
| Use Microsoft Teams to track discussions in Soda Cloud. | Check to automatically send notifications to an MS Teams channel when a user creates or modifies a discussion in Soda Cloud. |  
| Channel URL | Provide a channel identifier to which Soda Cloud sends all discussion events. |

<br />


### About integration scopes

Use the **Alert Notification** scope to enable Soda Cloud to send alert notifications to an MS Teams channel to notify your team of warn and fail check results. With such an integration, Soda Cloud enables users to select MS Teams as the destination for an alert notification of an individual check or checks that form a part of an agreement, or multiple checks. To send notifications that apply to multiple checks, see [Set notification rules]({% link soda-cloud/notif-rules.md %}). 

Use the **Incident** scope to notify your team when a new incident has been created in Soda Cloud. With such a scope, Soda Cloud displays an external link to the MS Teams channel in the **Incident Details**. Soda Cloud sends all incident events to only one channel in MS Teams. As such, you must provide a separate link in the **Channel URL** field in the **Define Scope** tab. For example, `https://teams.microsoft.com/mychannel`. To obtain the channel link in MS Teams, right-click on the channel name in the overview sidebar. Refer to [Incidents]({% link soda-cloud/incidents.md %}) for more details about using incidents in Soda Cloud.

Use the **Discussions** scope to post to a channel when a user creates or modifies a Soda Cloud discussion. Soda Cloud sends all incident events to only one channel in MS Teams. As such, you must provide a separate link in the **Channel URL** field in the **Define Scope** tab. For example, `https://teams.microsoft.com/mychannel`. To obtain the channel link in MS Teams, right-click on the channel name in the overview sidebar. Refer to [Begin a discussion and propose checks]({% link soda/quick-start-end-user.md %}#begin-a-discussion-and-propose-checks) for more details about using incidents in Soda Cloud.

### Troubleshoot

**Problem:** You encounter an error that reads, "Error encountered while rendering this message."

**Solution:** A fix is <a href="https://www.anyviewer.com/kb/microsoft-teams-error-encountered-while-rendering-this-message-2996-ac.html" target="_blank">documented</a>, the short version of which is as follows. 
1. Restart MS Teams.
2. Clear your cache and cookies.
3. If you have not already done so, update to the latest version of MS Teams.

<br />

## Go further

* Learn more about general [webhooks]({% link soda/integrate-webhooks.md %}) to integrate Soda Cloud with other third-party service providers.
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. 
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
