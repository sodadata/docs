---
layout: default
title: Integrate using webhooks
description: Configure webhooks to connect Soda Cloud to any number of third-party service providers.
parent: Integrate
---

# Integrate webhooks with Soda Cloud

Configure a webhook in Soda Cloud to connect your account to a third-party service provider such as Jira, ServiceNow, PagerDuty, and more.

Use a webhook to:
* send [alert notifications]({% link soda-cloud/edit-checks.md %}) for failed or warning check results to a third-party, such as ServiceNow.
* create and track data quality [incidents]({% link soda-cloud/incidents.md %}) with a third-party, such as Jira

![webhook-example](/assets/images/webhook-example.png){:height="700px" width="700px"} 

[Prerequisites](#prerequisites)<br />
[Configure a webhook](#configure-a-webhook) <br />
[Go further](#go-further)<br />
<br />


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core and run at least one scan.<br /> OR<br /> You have [added a datasource]({% link soda-cloud/add-datasource.md %}) via a [Soda Agent]({% link soda-agent/deploy.md %}) and are ready to create an [agreement]({% link soda-cloud/agreements.md %})![preview](/assets/images/preview.png){:height="60px" width="60px"}.


## Configure a webhook

1. Confirm that the third-party can provide an incoming webhook URL that meets the following technical specifications:
* can return an HTTP status code between 200 and 400
* can reply to a request within 10 seconds (otherwise the request from Soda Cloud times out)
* provides an SSL-secured endpoint (`https://`) of TLS 1.2 or greater
2. In your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
3. Click the **+** at the upper right of the table of integrations to add a new integration. 
4. In the **Add Integration** dialog box, select **Webhook** then follow the guided steps to configure the integration. Reference the following tables for guidance on the values to input. <br /> Add as many HTTP headers as you wish, but be sure to add the required `Content type:` header.

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Name | Provide a unique name for your webhook in Soda Cloud. |
| URL | Input the incoming webhook URL provided by your service provider. [Read more](#incoming-webhook-urls) below. |
| HTTP Headers, Name |  **Required** Enter `Content type:` |
| HTTP Headers, Value |  **Required** Enter `application/json` |

| Checkbox  | Guidance |
| -----------------  | ----------- |
| Enable to send notifications to this webhook when a check result triggers an alert. | Check to allow users to select this webhook as a destination for alert notifications when check results warn or fail. |
| Use this webhook as the default notification channel for all check result alerts. | Check to automatically configure check results alert notifications to this webhook by default. <br />Users can deselect the webhook as the notification destination, but it is the prepopulated destination by default.   |
| Enable to use this webhook to track and resolve incidents in Soda Cloud. | Check to allow users to send incident information to a destination. <br />For example, a user creating a new incident can choose to use this webhook to create a new issue in Jira.  |

### Incoming webhook URLs

Some third-party service providers can provide you with an incoming webhook URL that you can use to integrate with Soda Cloud. 

For example, in Jira, you can set up an Automation Rule that enables you to define what you want a webhook to do in Jira, then provides you with a URL that you use in the URL fields in the Soda Cloud integration setup. Reference the Jira documentation for details on how to create an <a href="https://confluence.atlassian.com/automation070/triggers-1014664599.html" target="_blank">Incoming webhook</a>.

<!--If the third party does not offer incoming webhook URLs, you can ...-->

## Go further

* Learn more about [creating agreements]({% link soda-cloud/agreements.md %}) in Soda Cloud.
* Learn more about creating, tracking, and resolving data quality [Incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}