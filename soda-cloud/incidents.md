---
layout: default
title: Create and track incidents
parent: Soda Cloud
---

# Create and track Incidents

When you [create monitors]({% link soda-cloud/monitors.md %}) in Soda Cloud, you have the option of adding a Warning or Critical alert to notify you when a data quality test fails. You can respond to the notification by creating an **Incident** in Soda Cloud to track your team's investigation and resolution of the data quality issue. 

If you have integrated your Soda Cloud account with a Slack workspace, you can use an Incident's built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation. When you resolve or close the incident, Soda archives the channel for future troubleshooting reference.

## Prerequisites
* You have [installed Soda SQL]({% link soda-sql/installation.md %}) in your environment.
* You have a Soda Cloud account and you have [connected the account]({% link soda-cloud/connect_to_cloud.md %}) to an instance of Soda SQL.
* You have [integrated a Slack workspace]({% link soda-cloud/collaborate.md %}#integrate-with-slack) with your Soda Cloud account. 

## Create Incidents

1. Log in to your Soda Cloud account, then navigate to the **Monitors** dashboard. 
2. For the monitor result you wish to investigate, click the stacked dots at right, then select **Create Incident**. Provide a **Title**, **Severity**, and **Description** of your new incident, then save. 
3. In the **Incident** column of the monitor result, click the Incident link to access the Incident page where you can record the following details:
* **Severity**: Minor, Major, or Critical
* **Status**: Reported, Investigating, Fixing, Resolved
* **Lead**: a list of team members from whom you can assign the Lead Investigator role
4. Click **View Slack Channel** to connect directly to a newly-created channel in your Slack workspace that is dedicated to the investigation and resolution of the Incident. Invite team members to the channel to collaborate on resolving the data quality issue that triggered the alert. 

## Track Incidents

* As your team works through the investigation of an Incident, use the Incident's **Status** field to keep track of your progress. 
* In the **Incidents** dashboard, review all Incidents, their severity and status, and the assigned lead. Sort the list of Incidents by severity.
* From an Incident's page, link other monitor results to the same Incident to expand the investigation landscape.


## Go further

* Learn more about [creating monitors and alerts]({% link soda-cloud/monitors.md %}).
* [Examine failed rows]({% link soda-cloud/failed-rows.md %}) for a monitor result.
* Collaborate with your team using a [Single Sign-on IdP]({% link soda-cloud/sso.md %}).
* Integrate Soda with your [data catalogs]({% link soda/integrate-alation.md %}) or [data pipeline tools]({% link soda/integrate-dbt.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}