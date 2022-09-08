---
layout: default
title: Create and track incidents
description: If you have integrated Soda Cloud with Slack, you can use an Incident’s built-in ability to create a channel that your team can use to investigate an issue.
parent: Soda Cloud
---

# Create and track incidents

When you create checks in Soda Core and you have connected Soda Core to a Soda Cloud account, Soda Core pushes all checks results from each scan to Soda Cloud. For a check that failed or triggered a warning, you have the option of creating an **Incident** for that check result in Soda Cloud to track your team's investigation and resolution of a data quality issue. 

If you have integrated your Soda Cloud account with a Slack workspace, you can use an Incident's built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation. When you resolve or close the incident, Soda archives the channel for future troubleshooting reference.

![incidents](/assets/images/incidents.png){:height="700px" width="700px"}

## Prerequisites
* You have [installed Soda Core]({% link soda-core/installation.md %}) in your environment.
* You have a Soda Cloud account and you have [connected the account]({% link soda-core/connect-core-to-cloud.md %}) to Soda Core.
* (Optional) You have [integrated a Slack workspace]({% link soda-cloud/collaborate.md %}#integrate-with-slack) with your Soda Cloud account. 

## Create Incidents

1. Log in to your Soda Cloud account, then navigate to the **Checks** dashboard. 
2. For the check result you wish to investigate, click the stacked dots at right, then select **Create Incident**. Provide a **Title**, **Severity**, and **Description** of your new incident, then save. 
3. In the **Incident** column of the check result, click the Incident link to access the Incident page where you can record the following details:
* **Severity**: Minor, Major, or Critical
* **Status**: Reported, Investigating, Fixing, Resolved
* **Lead**: a list of team members from whom you can assign the Lead Investigator role
4. (Optional) Click **View Slack Channel** to connect directly to a newly-created channel in your Slack workspace that is dedicated to the investigation and resolution of the Incident. Invite team members to the channel to collaborate on resolving the data quality issue. 

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
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}