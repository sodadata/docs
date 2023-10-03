---
layout: default
title: Integrate webhooks with Soda
description: Configure webhooks to connect Soda to any number of third-party service providers.
parent: Integrate
---

# Integrate webhooks with Soda 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

Configure a webhook in Soda Cloud to connect your account to a third-party service provider such as Jira, ServiceNow, PagerDuty, and more.

Use a webhook to:
* send [alert notifications]({% link soda-cloud/notif-rules.md %}) for failed or warning check results to a third-party, such as ServiceNow
* create and track data quality [incidents]({% link soda-cloud/incidents.md %}) with a third-party, such as Jira
* send a notification to a third-party when a [Soda Agreement]({% link soda-cloud/agreements.md %}) is added, changed, or deleted

![webhook-example](/assets/images/webhook-example.png){:height="700px" width="700px"} 

[Configure a webhook](#configure-a-webhook) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Webhooks for Soda Cloud alert notifications](#webhooks-for-soda-cloud-alert-notifications)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Webhooks for Soda Cloud incident integrations](#webhooks-for-soda-cloud-incident-integrations)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Webhooks for Soda Cloud agreements](#webhooks-for-soda-cloud-agreements)<br />
[Example webhook with Jira for Soda Cloud incidents](#example-webhook-with-jira-for-soda-cloud-incidents)<br />
[Example webhook with ServiceNow for Soda Cloud incidents](#example-webhook-with-servicenow-for-soda-cloud-incidents)<br />
[Event payloads](#event-payloads) <br />
[Go further](#go-further)<br />
<br />


## Configure a webhook

1. Confirm that the third-party can provide an incoming webhook URL that meets the following technical specifications:
* can return an HTTP status code between 200 and 400
* can reply to a request within 10 seconds (otherwise the request from Soda Cloud times out)
* provides an SSL-secured endpoint (`https://`) of TLS 1.2 or greater
2. In your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
3. Click the **+** at the upper right of the table of integrations to add a new integration. 
4. In the **Add Integration** dialog box, select **Webhook** then follow the guided steps to configure the integration. Reference the following tables for guidance on the values to input in the guided steps. <br /> 

| Field or Label  |  Guidance |
| --------------- |  -------- |
| Name | Provide a unique name for your webhook in Soda Cloud. **Required** |
| URL | Input the incoming webhook URL or API endpoint provided by your service provider. See sections below for details. **Required**  <br />[alert notifications](#webhooks-for-soda-cloud-alert-notifications) <br />[incidents](#webhooks-for-soda-cloud-incident-integrations) |
| HTTP Headers, Name | For example, `Authorization:` |
| HTTP Headers, Value | For example, `bearer [token]` |
| Enable to send notifications to this webhook when a check result triggers an alert. | Check to allow users to select this webhook as a destination for alert notifications when check results warn or fail. |
| Use this webhook as the default notification channel for all check result alerts. | Check to automatically configure check results alert notifications to this webhook by default. <br />Users can deselect the webhook as the notification destination in an individual check, but it is the prepopulated destination by default.   |
| Enable to use this webhook to track and resolve incidents in Soda Cloud. | Check to allow users to send incident information to a destination. <br />For example, a user creating a new incident can choose to use this webhook to create a new issue in Jira.|
| Send events to this webhook when an agreement is created, updated, or removed. | Check to automatically send notifications to a third-party service provider whenever a user adds, changes, or removes a [Soda Cloud agreement]({% link soda/glossary.md %}#agreement). |

<br />

### Webhooks for Soda Cloud alert notifications

You can use a webhook to enable Soda Cloud to send alert notifications to a third-party provider, such as OpsGenie, to notify your team of warn and fail check results. With such an integration, Soda Cloud enables users to select the webhook as the destination for an individual check or checks that form a part of an agreement, or multiple checks. 

To send notifications that apply to multiple checks, see [Set notification rules]({% link soda-cloud/notif-rules.md %}). 

Soda Cloud alert notifications make use of the following events:
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

For incident integrations with third-party service providers that *do not* provide a link message in the response, you can use a callback URL. In such a case, when Soda Cloud sends an `incidentCreated` event to the third-party, you can configure the third-party response to include an `incidentLinkCallbackUrl` property. See an [example with Jira](#example-webhook-with-jira-for-soda-cloud-incidents) below.

Configure the third-party response to make a POST request to this callback URL, including the text and url in the body of the JSON payload. Soda Cloud adds the callback URL as an integration link in the incident details. 

The following is an example of the response payload with a callback URL.

```json
// > POST [webhook URL]
{
  "event": "incidentCreated",
  "incident": { ... },
  "incidentLinkCallbackUrl": "https://cloud.soda.io/integrations/webhook/8224bbc2-2c80-4c6d-a*****/incident-link/510fad8c-dc43-419a-a122-712a***/uLYosxWNwVGHSdR-_noJjlNAA--WyQwe1ygqGBg*****Q"
}
// < 200 OK
{ }
Followed by a POST request to incidentLinkCallbackUrl:
// > POST https://cloud.soda.io/integrations/webhook/8224bbc2-2c80-4c6d-a002-16***4e/incident-link/510fad8c-dc43-419a-a122-7***97/uLYosxWNwVGHSdR-_noJjlNAA--WyQwe1ygqGBg****IrQ
{
  "url": "https://sodadata.atlassian.net/browse/SODA-69",
  "text": "[SODA-69] Notification & Incident Webhook"
}
```

<br />

### Webhooks for Soda Cloud agreements

You can use a webhook to enable Soda Cloud to send Soda agreement events to a third-party service provider. By integrating Soda with a third-party service provider for version control, such as GitHub, your team can maintain visibility into agreement changes, additions, and deletions 

Soda Cloud agreement notifications make use of the following events:
* [`validate`](#validate)
* [`agreementCreated`](#agreementcreated)
* [`agreementContentsUpdated`](#agreementcontentsupdated)
* [`agreementDeleted`](#agreementdeleted)

Access a third-party service provider's documentation for details on how to set up an incoming webhook or API call, and obtain a URL to input into the Soda webhook configuration in step 4, above. 

Soda Cloud expects the integration party to return an HTTP status code 200 success response; it ignores the body of the response.

<br />

## Example webhook with Jira for Soda Cloud incidents

In Jira, you can set up an Automation Rule that enables you to define what you want an incoming webhook to do, then provides you with a URL that you use in the URL field in the Soda Cloud integration setup. 

This example offers guidance on how to set up a webhook to generate an external link to which Soda Cloud displays in the **Incident Details**. When you change the status of a Soda Cloud incident, the webhook also updates the status of the Jira issue that corresponds with the incident.

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

![webhook-incoming](/assets/images/webhook-incoming.png){:height="700px" width="700px"} 

![webhook-config](/assets/images/webhook-config.png){:height="450px" width="450px"} 

<br />

When configuring **Send web request**, note the **Web request URL** that Jira sends back to Soda Cloud for the incident. This example uses `incidentLinkCallbackUrl` to send a POST request back to Soda Cloud to display a link to the Jira issue in the **Incident Details** page.

![webhook-send-request](/assets/images/webhook-send-request.png){:height="700px" width="700px"} 

<br />

When configuring a **Branch rule** to update the status of an existing Jira issue, note the value in the **JQL** field that identifies which issue to update when the incident status in Soda Cloud changes.

![webhook-branch-rule](/assets/images/webhook-branch-rule.png){:height="700px" width="700px"} 

<br />

## Example webhook with ServiceNow for Soda Cloud incidents

In ServiceNow, you can create a Scripted REST API that enables you to prepare a resource to work as an incoming webhook. Use the **ServiceNow Resource Path** in the URL field in the Soda Cloud integration setup.

This example offers guidance on how to set up a Scripted REST API Resource to generate an external link which Soda Cloud displays in the **Incident Details**; see image below. When you change the status of a Soda Cloud incident, the webhook also updates the status of the SNOW issue that corresponds with the incident.

![webhook-incident-snow](/assets/images/webhook-incident-snow.png){:height="700px" width="700px"} 

<br />

The following steps offer a brief overview of how to set up a ServiceNow Scripted REST API Resource to integrate with a Soda Cloud webhook. Reference the ServiceNow documentation for details: 
* <a href="https://docs.servicenow.com/en-US/bundle/tokyo-application-development/page/integrate/custom-web-services/task/t_CreateAScriptedRESTService.html" target="_blank">Create a Scripted REST API</a> and <a href="https://docs.servicenow.com/bundle/tokyo-application-development/page/integrate/custom-web-services/task/t_CreateAScriptedRESTAPIResource.html" target="_blank">Create a Scripted REST API Resource</a> 
* <a href="https://developer.servicenow.com/dev.do#!/learn/courses/quebec/app_store_learnv2_rest_quebec_rest_integrations/app_store_learnv2_rest_quebec_scripted_rest_apis/app_store_learnv2_rest_quebec_creating_scripted_rest_apis" target="_blank">ServiceNow Developer: Creating Scripted REST APIs</a>

1. In ServiceNow, start by navigating to the **All** menu, then use the filter to search for and select **Scripted REST APIs**. 
2. Click **New** to create a new scripted REST API. Provide a name and API ID, then click **Submit** to save.
3. In the Scipted Rest APIs list, find and open your newly-created API, then, in the **Resources** tab, click **New** to create a new resource.
4. Provide a **Name** for your resource, then select POST as the **HTTP method**. 
5. In the **Script** field, define a script that creates new tickets when a Soda Cloud incident is opened, and updates existing tickets when a Soda Cloud incident status is updated. Use the example below for reference. You may also need to define Security settings according to your organizations authentication rules.
6. Click **Submit**, then copy the value of the **Resource path** to use in the URL field in the [Soda Cloud integration setup](#configure-a-webhook).

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {


	var businessServiceId = '28***';
	var snowInstanceId = 'dev***';
	
	var requestBody = request.body;
	var requestData = requestBody.data;
	gs.info(requestData.event);
	if (requestData.event == 'incidentCreated'){
		gs.log("*** Incident Created ***");
		var grIncident = new GlideRecord('incident');
		grIncident.initialize();
		grIncident.short_description = requestData.incident.description;

		grIncident.description = requestData.incident.sodaCloudUrl;
		grIncident.correlation_id = requestData.incident.id;
		if(requestData.incident.severity == 'critical'){
			grIncident.impact = 1;
		}else if(requestData.incident.severity == 'major'){
			grIncident.impact = 2;
		}else if(requestData.incident.severity == 'minor'){
			grIncident.impact = 3;
		}
		
		grIncident.business_service = businessServiceId;
		grIncident.insert();
		var incidentNumber = grIncident.number;
		var sysid = grIncident.sys_id;
		var callBackURL = requestData.incidentLinkCallbackUrl;
		var req, rsp;
		
		req = new sn_ws.RESTMessageV2();


		req.setEndpoint(callBackURL.toString());
		req.setHttpMethod("post");
		var sodaUpdate = '{"url":"https://'+ snowInstanceId +'.service-now.com/incident.do?sys_id='+sysid + '", "text":"SNOW Incident '+incidentNumber+'"}';
		req.setRequestBody(sodaUpdate.toString());
		resp = req.execute();
		gs.log(resp.getBody());
		

	}else if(requestData.event == 'incidentUpdated'){
		gs.log("*** Incident Updated ***");
		var target = new GlideRecord('incident');
		target.addQuery('correlation_id', requestData.incident.id);
		target.query();
		target.next();

		if(requestData.incident.status == 'resolved'){
			//Change this according to how SNOW is used.
			target.state = 6;
			target.close_notes = requestData.incident.resolutionNotes;
		}else{
			//Change this according to how SNOW is used.
			target.state = 4;
		}
		target.update();
		
	}


})(request, response);
```
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

### agreementCreated

Soda Cloud sends this event payload when a user creates a new agreement in the Soda Cloud account.

```json
{
  "event": "agreementCreated",
  "agreement": {
    "id": "string",
    "sodaCloudUrl": "string",
    "label": "string",
    "testsFile": {
      "path": "string",
      "contents": "string"
    },
    "createdBy": {
      "email": "julie@company.com"
    }
  }
}
```

### agreementContentsUpdated

Soda Cloud sends this even payload when a user adjusts the contents of an agreement. Soda Cloud *does not* send this event when an agreement's review status has changed.

```json
{
  "event": "agreementContentsUpdated",
  "agreement": {
    "id": "string",
    "sodaCloudUrl": "string",
    "label": "string",
    "testsFile": {
      "path": "string",
      "contents": "string"
    },
    "updatedBy": {
      "email": "julie@company.com"
    }
  }
}
```

### agreementDeleted

Soda Cloud sends this event payload when a user deletes an agreement in the Soda Cloud account.

```json
{
  "event": "agreementDeleted",
  "agreement": {
    "id": "string",
    "label": "string",
    "testsFile": {
      "path": "string",
    },
    "deletedBy": {
      "email": "julie@company.com"
    }
  }
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
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. 
* Learn more about creating, tracking, and resolving data quality [Incidents]({% link soda-cloud/incidents.md %}) in Soda Cloud.
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