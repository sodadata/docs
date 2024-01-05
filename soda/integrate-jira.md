---
layout: default
title: Integrate Jira with Soda
description: Configure a webhook to connect Soda to your Jira workspace.
parent: Integrate Soda
---

# Integrate Jira with Soda 
*Last modified on {% last_modified_at %}*

Configure a [webhook]({% link soda/integrate-webhooks.md %}) in Soda Cloud to connect to your Jira workspace.

In Jira, you can set up an Automation Rule that enables you to define what you want an incoming webhook to do, then provides you with a URL that you use in the URL field in the Soda Cloud integration setup. 

This example offers guidance on how to set up a webhook to generate an external link to which Soda Cloud displays in the **Incident Details**. When you change the status of a Soda Cloud incident, the webhook also updates the status of the Jira issue that corresponds with the incident. Refer to [Event payloads]({% link soda/integrate-webhooks.md %}l#event-payloads) for details information.

![webhook-incident](/assets/images/webhook-incident.png){:height="700px" width="700px"} 

<br />

In Jira, start by navigating to **Project settings** > **Automation**, then click **Create rule** and, for the type of **New trigger**, select **Incoming webhook**. Reference the Jira documentation for details on how to create an <a href="https://confluence.atlassian.com/automation070/triggers-1014664599.html" target="_blank">Incoming webhook</a>. 

The images below offer details for an example of an Automation Rule in Jira to set up an incoming webhook that processes incident events from Soda Cloud. 

<details>
  <summary style="color:#00BC7E">See full Jira Automation example</summary>
  <img src="/assets/images/webhook-automation.png" width="350">
</details>

<br />

When configuring the **Incoming webhook**, note the value for the **Webhook URL** that Jira provides for the automation; input this URL into the Soda Cloud URL field for the webhook (step 4, [above](#configure-a-webhook)).
{% include code-header.html %}
```shell
# Example Webhook URL
https://automation.atlassian.com/pro/hooks/98fbb...
```
{% include code-header.html %}
```shell
# Example automation rule
curl -X POST -H 'Content-type: application/json' \
https://automation.atlassian.com/pro/hooks/98fbb...
```

![webhook-incoming](/assets/images/webhook-incoming.png){:height="700px" width="700px"} 

![webhook-config](/assets/images/webhook-config.png){:height="450px" width="450px"} 

<br />

When configuring **Send web request**, note the **Web request URL** that Jira sends back to Soda Cloud for the incident. This example uses `incidentLinkCallbackUrl` to send a POST request back to Soda Cloud to display a link to the Jira issue in the **Incident Details** page.
{% include code-header.html %}
```json
# Example Web request URL
{% raw %}{{webhookData.incidentLinkCallbackURL}}{% endraw %}
```
{% include code-header.html %}
```json
# Example Custom data
{% raw %}{
"url": "{{createdIssue.url}}",
"text": "{{createdIssue.key}}"
}{% endraw %}
```

![webhook-send-request](/assets/images/webhook-send-request.png){:height="700px" width="700px"} 

<br />

When configuring a **Branch rule** to update the status of an existing Jira issue, note the value in the **JQL** field that identifies which issue to update when the incident status in Soda Cloud changes.
{% include code-header.html %}
```json
# Example JQL
summary ~ "SODA-{% raw %}{{webhookData.incident.number}}{% endraw %}"
```
![webhook-branch-rule](/assets/images/webhook-branch-rule.png){:height="700px" width="700px"} 

<br />



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