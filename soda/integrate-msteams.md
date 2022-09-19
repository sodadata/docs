---
layout: default
title: Integrate Soda Cloud with MS Teams
description: Integrate MS Teams in your Soda Cloud account so that Soda send alert notifications and incident events to your MS Teams conversation.
parent: Integrate Soda
---

# Integrate Soda Cloud with Microsoft Teams

Configure Soda Cloud to connect your account to MS Teams so that you can:

* send [alert notifications]({% link soda-cloud/edit-checks.md %}) for failed or warning check results to MS Teams
* start conversations to track and resolve data quality [incidents]({% link soda-cloud/incidents.md %}) with MS Teams


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core and run at least one scan so as to produce one or more check results.<br /> OR<br /> You have [added a datasource]({% link soda-cloud/add-datasource.md %}) via a [Soda Agent]({% link soda-agent/deploy.md %}) and are ready to create an [agreement]({% link soda-cloud/agreements.md %})![preview](/assets/images/preview.png){:height="60px" width="60px"}.


## Configure an MS Teams integration

1. In your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
2. Click the **+** at the upper right of the table of integrations to add a new integration. 
3. In the **Add Integration** dialog box, select **Microsoft Teams**.
4. In the first step of the guided integration workflow, download the Soda icon that you need to set up an incoming webhook with MS Tems. 
5. Navigate to your MS Teams account to set up an incoming webhook; see detailed instructions below.
5. Returning to Soda Cloud with the URL for the incoming webhook, continue to follow the guided steps to complete the integration. Reference the following tables for guidance on the values to input in the guided steps. <br /> 

| Field or Label  |  Guidance |
| --------------- |  -------- |
| Name | Provide a unique name for your webhook in Soda Cloud. **Required** |
| URL | Input the incoming webhook URL you obtained from MS Teams. See [section below](#set-up-incoming-webhook-in-ms-teams) for details. **Required**  |
| Enable to send notifications to this webhook when a check result triggers an alert. | Check to allow users to select this webhook as a destination for alert notifications when check results warn or fail. |
| Use this webhook as the default notification channel for all check result alerts. | Check to automatically configure check results alert notifications to this webhook by default. <br />Users can deselect the webhook as the notification destination in an individual check, but it is the prepopulated destination by default.   |
| Enable to use this webhook to track and resolve incidents in Soda Cloud. | Check to allow users to send incident information to a destination. <br />For example, a user creating a new incident can choose to use this webhook to create a new issue in Jira.|
| Channel URL |   |

<br />

### Set up incoming webhook in MS Teams


Go to Microsoft Teams and navigate to the Team and Channel to which you want to add Soda Cloud
Open the Channel's Context Menu (*** ) and go to Connectors
Search for "Incoming Webhook" and select "Add"
In the new Modal which opens again press "Add"
Again open the Context Menu of your Channel and click "Connectors"
This time the Incoming Webhook connector will be shown in the top list. Click "Configure" to set it up.
You will be asked to provide a name and image. For name  fill in Soda  and as an image upload <provide soda logo>.
Press "Create" and wait for the fields to turn 'readonly' A "URL" should now be shown. Copy this URL.
Go back to Soda Cloud where the user was adding a MS Teams Integration and provide the required details: Team , Channel , Webhook URL.

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