---
layout: default
title: Create and track incidents
description: If you have integrated Soda Cloud with Slack, you can use an Incident’s built-in ability to create a channel that your team can use to investigate an issue.
parent: Soda Cloud
---

# Create and track incidents 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

When Soda runs a scan to execute the SodaCL checks you defined, Soda Cloud displays the checks and their latest scan results in the **Checks** dashboard. For a check that failed or triggered a warning, you have the option of creating an **Incident** for that check result in Soda Cloud to track your team's investigation and resolution of a data quality issue. 

If you have integrated your Soda Cloud account with a [Slack workspace]({% link soda/integrate-slack.md %}), or [MS Teams channel]({% link soda/integrate-msteams.md %}), or another [third-party messaging or ticketing tool]({% link soda/integrate-webhooks.md %}) that your team uses such as [Jira]({% link soda/integrate-webhooks.md %}#example-webhook-with-jira-for-soda-cloud-incidents) or [ServiceNow]({% link soda/integrate-webhooks.md %}#example-webhook-with-servicenow-for-soda-cloud-incidents), you can use an incident's built-in ability to create an incident-specific link where you and your team can collaborate on the issue investigation. 

![incident-slack](/assets/images/incident-slack.png){:height="700px" width="700px"} 

## Create Incidents

{% include create-incidents.md %}

## Track Incidents

* As your team works through the investigation of an Incident, use the Incident's **Status** field to keep track of your progress. 
* In the **Incidents** dashboard, review all Incidents, their severity and status, and the assigned lead. Sort the list of Incidents by severity.
* From an Incident's page, link other check results to the same Incident to expand the investigation landscape.
* If you opened a Slack channel to investigate the incident, Soda archives the channel when you set the **Status** to Resolved.


## Go further

* [Organize your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud to facilitate your search for the right data.
* [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for a check result.
* Collaborate with your team using a [Single Sign-on IdP]({% link soda-cloud/sso.md %}).
* Integrate Soda with your [data catalogs]({% link soda/integrate-alation.md %}) or [data pipeline tools]({% link soda/integrate-dbt.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}