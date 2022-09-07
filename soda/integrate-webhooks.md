---
layout: default
title: Integrate using webhooks
description: Configure webhooks to connect Soda Cloud to any number of third-party service providers.
parent: Integrate
---

# Integrate webhooks with Soda Cloud

Configure a webhook in Soda Cloud to connect your account to a third-party service provider such as Jira, ServiceNow, PagerDuty, and more.

Use a webhook to:
* send [alert notifications]({% link soda-cloud/edit-checks.md %}) for failed or warning check results to a third-party, such as ServiceNow
* create and track data quality [incidents]({% link soda-cloud/incidents.md %}) with a third-party, such as Jira

![webhook-example](/assets/images/webhook-example.png){:height="700px" width="700px"} 

[Prerequisites](#prerequisites)<br />
[Configure a webhook](#configure-a-webhook) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Webhooks for Soda Cloud alert notifications](#webhooks-for-soda-cloud-alert-notifications)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Webhooks for Soda Cloud incident integrations](#webhooks-for-soda-cloud-incident-integrations)<br />
[Example webhook with Jira for Soda Cloud incidents](#example-webhook-with-jira-for-soda-cloud-incidents)<br />
[Event payloads](#event-payloads) <br />
[Go further](#go-further)<br />
<br />


## Prerequisites

* You have a Soda Cloud account with [Admin permissions]({% link soda-cloud/roles-and-rights.md %}).
* You have [connected your Soda Cloud account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core and run at least one scan so as to produce one or more check results.<br /> OR<br /> You have [added a datasource]({% link soda-cloud/add-datasource.md %}) via a [Soda Agent]({% link soda-agent/deploy.md %}) and are ready to create an [agreement]({% link soda-cloud/agreements.md %})![preview](/assets/images/preview.png){:height="60px" width="60px"}.


## Configure a webhook

1. Confirm that the third-party can provide an incoming webhook URL that meets the following technical specifications:
* can return an HTTP status code between 200 and 400
* can reply to a request within 10 seconds (otherwise the request from Soda Cloud times out)
* provides an SSL-secured endpoint (`https://`) of TLS 1.2 or greater
2. In your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
3. Click the **+** at the upper right of the table of integrations to add a new integration. 
4. In the **Add Integration** dialog box, select **Webhook** then follow the guided steps to configure the integration. Reference the following tables for guidance on the values to input in the guided steps. <br /> Add as many HTTP headers as you wish, but be sure to add the required `Content type:` header.

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Name | Provide a unique name for your webhook in Soda Cloud. |
| URL | Input the incoming webhook URL provided by your service provider. See sections below for details. <br />[alert notifications](#webhooks-for-soda-cloud-alert-notifications) <br />[incidents](#webhooks-for-soda-cloud-incident-integrations) |
| HTTP Headers, Name |  **Required** Enter `Content type:` |
| HTTP Headers, Value |  **Required** Enter `application/json` |
| Enable to send notifications to this webhook when a check result triggers an alert. | Check to allow users to select this webhook as a destination for alert notifications when check results warn or fail. |
| Use this webhook as the default notification channel for all check result alerts. | Check to automatically configure check results alert notifications to this webhook by default. <br />Users can deselect the webhook as the notification destination, but it is the prepopulated destination by default.   |
| Enable to use this webhook to track and resolve incidents in Soda Cloud. | Check to allow users to send incident information to a destination. <br />For example, a user creating a new incident can choose to use this webhook to create a new issue in Jira.  |

<br />

### Webhooks for Soda Cloud alert notifications

You can use a webhook to enable Soda Cloud to send alert notifications to a third-party provider, such as OpsGenie, to notify your team of warn and fail check results. With such an integration, Soda Cloud enables users to select the webhook as the destination for an alert notification. See [Edit checks in Soda Cloud]({% link soda-cloud/edit-checks.md %}).

Soda Cloud incident integrations make use of the following events:
* [`validate`](#validate)
* [`checkEvaluation`](#checkevaluation)

Access a third-party service provider's documentation for details on how to set up an incoming webhook or API call, and obtain a URL to input into the Soda webhook configuration in step 4, above. The following links may be helpful starting points.

* <a href="https://developer.pagerduty.com/api-reference/a7d81b0e9200f-create-an-incident" target="_blank">PagerDuty</a>
* <a href="https://docs.opsgenie.com/docs/alert-api#create-alert" target="_blank">OpsGenie</a>

<br />

### Webhooks for Soda Cloud incident integrations

You can use a webhook to integrate with a third-party service provider, such as Jira, to track incidents. With such an integration, Soda Cloud displays an external link for the integration in the **Incident Details**. See [image below](#example-webhook-with-jira-for-soda-cloud-incidents) for an example. 

Soda Cloud incident integrations make use of the following events:
* [`validate`](#validate)
* [`incidentCreated`](#incidentcreated)
* [`incidentUpdated`](#incidentupdated)

When Soda Cloud sends an `incidentCreated` event to a webhook endpoint, the third-party service provider can respond with a link message. In such a case, Soda Cloud adds the link to the incident. The following is an example of the response payload.

```json
// > POST [webhook URL]
{
  "event": "incidentCreated",
  // ...
}
// < 200 OK
{
  "link": {
    "url": "https://sodadata.atlassian.net/browse/SODA-69",
    "text": "[SODA-69] Notification & Incident Webhook"
  }
}
```

<br />

For incident integrations with third-party service providers that *do not* provide a response, you can use a callback URL. In such a case, when Soda Cloud sends an `incidentCreated` event to the third-party, the third-party response can include an `incidentLinkCallbackUrl` property. 

Configure the third-party response to make a POST request to this callback URL, including the text and url in the body of the JSON payload. Soda Cloud adds the callback URL as an integration link in the incident details. 

 The following is an example of the response payload with a callback URL.

```json
// > POST [webhook URL]
{
  "event": "incidentCreated",
  "incident": { ... },
  "incidentLinkCallbackUrl": "https://dev.sodadata.io/integrations/webhook/8224bbc2-2c80-4c6d-a002-16907465484e/incident-link/510fad8c-dc43-419a-a122-712a23f27197/uLYosxWNwVGHSdR-_noJjlNAA--WyQwe1ygqGBgZclD9Kr6rvMcIrQ"
}
// < 200 OK
{ }
Followed by a POST request to incidentLinkCallbackUrl:
// > POST https://dev.sodadata.io/integrations/webhook/8224bbc2-2c80-4c6d-a002-16907465484e/incident-link/510fad8c-dc43-419a-a122-712a23f27197/uLYosxWNwVGHSdR-_noJjlNAA--WyQwe1ygqGBgZclD9Kr6rvMcIrQ
{
  "url": "https://sodadata.atlassian.net/browse/SODA-69",
  "text": "[SODA-69] Notification & Incident Webhook"
}
```

<br />

## Example webhook with Jira for Soda Cloud incidents

In Jira, you can set up an Automation Rule that enables you to define what you want an incoming webhook to do, then provides you with a URL that you use in the URL field in the Soda Cloud integration setup. 

This example offers guidance on how to set up a webhook to generate an external link to which Soda Cloud displays in the **Incident Details**.

![webhook-incident](/assets/images/webhook-incident.png){:height="700px" width="700px"} 

In Jira, start by navigating to **Project settings** > **Automation**, then click **Create rule** and, for the type of **New trigger**, select **Incoming webhook**. Reference the Jira documentation for details on how to create an <a href="https://confluence.atlassian.com/automation070/triggers-1014664599.html" target="_blank">Incoming webhook</a>. 

The images below offer an example of an Automation Rule in Jira to set up an incoming webhook that processes incident events from Soda Cloud. 

In the first image, note the value for the **Webhook URL** that Jira provides for the automation; input this URL into the Soda Cloud URL field for the webhook. 

![webhook-jira1](/assets/images/webhook-jira1.png){:height="700px" width="700px"} 

<br />

In the second image, note the **Web request URL** that Jira sends back to Soda Cloud for the incident. This example uses `incidentLinkCallbackUrl` to sent a POST request back to Soda Cloud.

![webhook-jira2](/assets/images/webhook-jira2.png){:height="700px" width="700px"} 

<br />

## Event payloads 

The following list of event payloads outlines the information that Soda Cloud sends when an action triggers a webhook.

### validate

Soda Cloud sends this event payload to validate that the integration with the third-party service provider works. Soda Cloud sends this event during the guided workflow to set up an integration.


```json
{
  "event": "validate",
  "sentAt": "2022-10-01T09:12:10.042323Z" 
}
```

### checkEvaluation

Soda Cloud sends this event payload when it receives new check results. If the check is part of an agreement, the payload includes the agreement identifier. 

```json
{
  "event": "checkEvaluation",
  "checkResults": [
    {
      "id": "39d706c3-5a48-4f4b***",
      "sodaCloudUrl": "https://cloud.soda.io/checks/39d706c3-5a48-b",
      "definition": "checks for SODATEST_Customers_6f90f4ad:\ncount same as SODATEST_RAWCUSTOMERS_7275c02c in postgres2",
      "datasets": [
        {
          "id": "e8f1fe55-ae3c-44bd-",
          "sodaCloudUrl": "https://cloud.soda.io/datasets/e8f1fe55-ae3c",
          "name": "bnm_orders",
          "label": "bnm_orders",
          "tags": [],
          "owner": {
            "id": "31781df5-93cf-***",
            "email": "person@soda.io"
          },
          "datasource": {
            "id": "5a152025-26f6-",
            "name": "sodaspark",
            "label": "sodaspark"
          },
          "attributes": [
            {
              "id": "f0cd7b0f-4ac6-42a1-",
              "label": "Data Domain",
              "name": "data_domain",
              "value": "Product"
            },
            {
              "id": "32986775-3c7a-4a81-bfdb-5f9853746c39",
              "label": "Origin",
              "name": "origin",
              "value": "Pipeline"
            }
          ]
        }
      ],
      "column": "columnName",
      // pass, warn or fail
      "outcome": "pass",
      "dataTimestamp": "2022-01-04T09:49:48.060897Z",
      "diagnostics": {
        "value": 0.0,
      },
      // included when a check belongs to an agreement
      "agreement": {
        "id": "AGREEMENT-001-0000-0000-0",
        "sodaCloudUrl": "https://cloud.soda.io/agreements/AGREEMEN-T001-0000-0000-0",
        "label": "My new agreement pending",
        "approvalState": "pending",
        "evaluationResult": "warning"
      }
    }
  ]
}
```

### incidentCreated

Soda Cloud sends this event payload when you create a new incident.

```json
{
  "event": "incidentCreated",
  "incident": {
    "id": "e1f399a3-09ea-***",
    "sodaCloudUrl": "https://cloud.soda.io/incidents/e1f399a3-******-1992d2744ef6",
    "number": 196,
    "title": "Invalid customer ids",
    "description": "Invalid customer ids",
    "severity": "major",
    "status": "opened",
    "createdTimestamp": "2022-05-18T06:07:34Z",
    "lastUpdatedTimestamp": "2022-05-18T06:08:23Z",
    "resolutionNotes": "Stan is fixing the issue",
    "resolutionTimestamp": "2022-05-18T06:08:22.620196441Z",
    "links": [
      {
        "integrationType": "slack",
        "name": "soda-inc-196-2022-05-18-invalid-customer-ids",
        "url": "https://example.slack.com/channels/C03FU9GR7P7"
      }
    ],
    "lead": {
      "id": "31781df5-93cf-***",
      "email": "personn@soda.io"
    },
    "reporter": {
      "id": "31781df5-***",
      "email": "person@soda.io"
    },
    "checkResults": [
      // Contains the same payload as 
      // event checkEvaluation
    ]
  },
  "incidentLinkCallbackUrl": "https://cloud.soda.io/integrations/webhook/8224bbc2-******-16907465484e/incident-link/510fad8c-******-712a23f27197/uL******Kr6rvMcIrQ*"
}
```

### incidentUpdated

Soda Cloud sends this event payload when an incident has been updated with, for example, a status change, when a new Lead has been assigned, or when check results  have been added to the incident.

```json
{
  "event": "incidentUpdated",
  "incident": {
    // Contains the same payload as 
    // event incidentCreated
  }
}
```


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