---
layout: default
title: Integrate Jira with Soda
description: Configure a webhook to connect Soda to your Jira workspace.
parent: Integrate Soda
---

# Integrate Jira with Soda 
*Last modified on {% last_modified_at %}*

Configure a [webhook]({% link soda/integrate-webhooks.md %}) in Soda Cloud to connect to your Jira workspace.

In this guide, we will show how you can integrate Soda Cloud Incidents with Jira.
After the integration is set up, then creating an incident in Soda will automatically trigger the creation of corresponding bug ticket in Jira.
The Jira ticket will include information related to the incident created in Soda, including:
- The number and title of the Incident
- The description of the Incident
- The severity of the incident
- The status of the incident
- The user who reported the Incident
- A link to the Incident in Soda Cloud
- A link to the associated Check in Soda Cloud

A link to this Jira ticket will be sent back to Soda and displayed on the Incident page in the Integrations box.
Any updates to the status of the Incident in Soda Cloud will trigger corresponding changes to the Status of the Jira ticket.
Any updates to the status of the Jira ticket will trigger corresponding changes to the Status of the Incident in Soda Cloud.

In Jira, you can set up an Automation Rule that enables you to define what you want an incoming webhook to do,
then provides you with a URL that you use in the URL field in the Soda Cloud integration setup. 

This integration is built on two webhook events IncidentCreated and IncidentUpdated (Soda -> Jira; [Event payloads]({% link soda/integrate-webhooks.md %}l#event-payloads)),
as well as the Soda Cloud API endpoint for updating incidents (Jira -> Soda; [API]({% link api-docs/public-cloud-api-v1.md %})). 


![webhook-incident](/assets/images/webhook-incident.png){:height="700px" width="700px"} 

<br />

## Create a Jira project for DQ tickets
In Jira, start by creating a new project dedicated to tracking data quality tickets.
Navigate to the **Project settings** > **Work Items**, and make sure you have a bug type work item with the fields,
as shown in the image below:
- Summary
- Description
- Assignee
- IncidentSeverity
- IncidentID
- IncidentURL
- CheckURL


![jira-work-item](/assets/images/jira-work-item.png){:height="700px" width="700px"} 

From the same page, next click the **Edit Workflow** button, and make sure your workflow includes the following statuses:
- Reported
- Investigating
- Fixing
- Resolved


![jira-workflow](assets/images/jira-workflow.png)

<br />

## Automation Rule (Inbound)
### Initialize the webhook-trigger
Here we will set up the automation in Jira so that when an Incident is created or updated in Soda,
then a bug ticket will automatically be created or updated in Jira.

Navigate to `Project settings` > `Automation`, then click `Create rule` and, for the type of `New trigger`, select `Incoming webhook`.


![jira-incoming-webhook-trigger-start.png](assets/images/jira-incoming-webhook-trigger-start.png)


Under the `When: Incoming webhook trigger`, click `Add a component`, select `IF: Add a condition`, then smart values condition.


![jira-if-block-incidentCreated.png](/assets/images/jira-if-block-incidentCreated.png)


What this means is that, **if** an incoming webhook has the `incidentCreated` event, then we will do something. 

### Automatic creation of the Jira ticket
Next we will add another component: `THEN: Add an action`. 
The action will be to **Create work item** and the **Issue Type** should be `Bug` and the **Project** should be our new project. 


![jira-create-bug.png](/assets/images/jira-create-bug.png)

Next we add some steps to fill out our ticket with extra information obtained from the webhook data.
We start by creating a branch rule to identify our ticket:


![jira-branch-rule.png](/assets/images/jira-branch-rule.png)

Then we Edit the ticket fields:


![jira-edit-work.png](/assets/images/jira-edit-work.png)

Finally, the last step in our incident _creation_ workflow is to send a post request back to Soda with a link to the issue in Jira:


![jira-send-web-request.png](/assets/images/jira-send-web-request.png)


### Automatic updates to the Jira ticket
The remaining parts of this automation rule cover the scenarios where the status of the incident is updated in Soda,
then we will detect this change and make the corresponding updates to the issue in Jira.

When the status changes to `Reported`:
![jira-status-reported.png](/assets/images/jira-status-reported.png)
The same logic is used for other status changes such as `Investigating` and `Fixing`.
In case the status changes to `Resolved`, our rule uses a similar logic,
but with the additional step of adding resolution notes as a comment to the issue in Jira:
![jira-status-resolved.png](/assets/images/jira-status-resolved.png)

Once you save/enable this new rule, then you can access a URL and secret that you will provide to Soda when setting up the new webhook integration.
After saving or enabling the rule, you can view details of the webhook trigger as shown below:
![jira-incoming-webhook-trigger.png](/assets/images/jira-incoming-webhook-trigger.png)

### Define the Webhook integration in Soda
Next, you create a new webhook integration in Soda and provide the details from the webhook trigger above, as shown in the image below.
Paste the Webhook URL from Jira into the URL field in Soda and paste the Secret from Jira into a custom HTTP header called `X-Automation-Webhook-Token`.  
Finally, in the `Define Scope` tab, make sure to select `Incidents - Triggered when users create or update incidents`.
![jira-soda-webhook-integration-settings.png](assets/images/jira-soda-webhook-integration-settings.png)

## Automation Rule (outbound)
Lastly we will set up a second automation rule in Jira so that when
the status of the ticket changes in Jira, these changes are also reflected in Soda.

First, we set up the trigger for this automation to be when a Work item is transitioned:
![jira-outbound-rule.png](assets/images/jira-outbound-rule.png)

Finally, we send a post request to the Soda Cloud API `incidents` endpoint,
using information from our Jira ticket to update the severity and status of the corresponding incident in Soda:
![jira-incident-api.png](assets/images/jira-incident-api.png)
Note that the `Authorization` header value must be formatted like: `Basic <base64_encoded_credentials>`. 
Base64-encoded credentials can be generated using Soda Cloud API keys in Python like so:
```python
import base64
api_key_id = "your_api_key_id"
api_key_secret = "your_api_key_secret"

credentials = f"{api_key_id}:{api_key_secret}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()
print(f"Basic {encoded_credentials}")
```



## Go further

* As a business user, learn more about [writing no-code checks]({% link soda-cl/soda-cl-overview.md %}#define-sodacl-checks) in Soda Cloud.
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. 
* Learn more about creating, tracking, and resolving data quality [Incidents]({% link soda-cloud/incidents.md %}).
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