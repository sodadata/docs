---
layout: default
title: Integrate Soda Cloud with MS Teams
description: Integrate MS Teams in your Soda Cloud account so that Soda sends alert notifications and incident events to your MS Teams conversation.
parent: Integrate Soda
---

# Integrate Soda Cloud with Microsoft Teams 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Configure Soda Cloud to connect your account to MS Teams so that you can:

* send [alert notifications]({% link soda-cloud/edit-checks.md %}) for failed or warning check results to MS Teams
* start conversations to track and resolve data quality [incidents]({% link soda-cloud/incidents.md %}) with MS Teams


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core and run at least one scan so as to produce one or more check results.<br /> OR<br /> You have [added a datasource]({% link soda-cloud/add-datasource.md %}) via a [Soda Agent]({% link soda-agent/deploy.md %}) and are ready to create an [agreement]({% link soda-cloud/agreements.md %}).


## Configure an MS Teams integration

1. In your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
2. Click the **+** at the upper right of the table of integrations to add a new integration. 
3. In the **Add Integration** dialog box, select **Microsoft Teams**.
4. In the first step of the guided integration workflow, download the <a href="/assets/ms-teams-soda.png" download>Soda logo</a> that you need to set up an incoming webhook with MS Teams. 
5. Navigate to your MS Teams account to set up an incoming webhook; see [detailed instructions](#set-up-incoming-webhook-in-ms-teams) below.
5. Returning to Soda Cloud with the URL for the incoming webhook, continue to follow the guided steps to complete the integration. Reference the following tables for guidance on the values to input in the guided steps. <br /> 

| Field or Label  |  Guidance |
| --------------- |  -------- |
| Name | **Required** <br />Provide a unique name for your integration in Soda Cloud.  |
| URL | **Required** <br />Input the incoming webhook URL you obtained from MS Teams. See [section below](#set-up-incoming-webhook-in-ms-teams) for details.  |
| Enable to send notifications to Microsoft Teams when a check result triggers an alert. | Check to allow users to select MS Teams as a destination for alert notifications when check results warn or fail. |
| Use Microsoft Teams as the default notification channel for all check result alerts. | Check to automatically configure check results alert notifications to MS Teams by default. <br />Users can deselect MS Teams as the notification destination in an individual check, but it is the prepopulated destination by default.   |
| Enable to use use Microsoft Teams to track and resolve incidents in Soda Cloud. | Check to allow users to send incident information to an MS Teams channel.|
| Channel URL | **Required for incident integration** <br />Provide a channel identifier to which Soda Cloud sends all incident events. See [Integration for Soda Cloud incidents](#integration-for-soda-cloud-incidents) below. |

<br />

### Set up incoming webhook in MS Teams

Refer to the Microsoft documentation for creating <a href="https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook" target="_blank">Incoming Webhooks</a>. What follows are instructions for quick reference. 

1. Go to Microsoft Teams and navigate to the team and channel you wish to integrate with Soda Cloud.
2. Open the channel's context menu (three dots) and navigate to Connectors.
3. Search for, then select, Incoming Webhook.
4. Once added, open the Context menu for your channel and navigate to Connectors. Select your new incoming webhook, then click Configure.
5. Provide a name for your webhook, then upload the <a href="/assets/ms-teams-soda.png" download>Soda logo</a>.
6. Click Create, then wait for the fields to display `readonly`.  Copy the incoming webhook URL to input into the guided Soda Cloud integration workflow.

## Integration for Soda Cloud alert notifications

You can use this integration to enable Soda Cloud to send alert notifications to an MS Teams channel to notify your team of warn and fail check results. 

With such an integration, Soda Cloud enables users to select MS Teams as the destination for an alert notification of an individual check or checks that form a part of an agreement. See [Edit checks in Soda Cloud]({% link soda-cloud/edit-checks.md %}) and [agreements]({% link soda-cloud/agreements.md %}).


## Integration for Soda Cloud incidents

You can use this integration to notify your team when a new incident has been created in Soda Cloud. With such an integration, Soda Cloud displays an external link to the MS Teams channel in the **Incident Details**. 

Soda Cloud sends all incident events to only one channel in MS Teams. As such, you must provide a separate integration link in the **Channel URL** field in the **Define Scope** tab. For example, `https://teams.microsoft.com/mychannel`. To obtain the channel link in MS Teams, right-click on the channel name in the overview sidebar.

Refer to [Incidents]({% link soda-cloud/incidents.md %}) for more details about using incidents in Soda Cloud.

## Go further

* [Connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account.
* Learn more about general [webhooks]({% link soda/integrate-webhooks.md %}) to integrate Soda Cloud with other third-party service providers.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}