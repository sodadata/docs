---
layout: default
title: Create an agreement
description: 
parent: Soda Cloud
redirect_from: /soda-cloud/monitors.html
---

# Create an agreement in Soda Cloud

An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. 

Use SodaCL checks to define the state of "good quality" for data in this data source, then identify and get approval from stakeholders in your organization. Define whom Soda Cloud will notify when a check in this Agreement fails, then set a schedule to regularly execute the Soda Checks to uphold the tenets of the agreement.

## Prerequisites

* You have created a <a href="https://cloud.soda.io/signup" target="_blank">Soda Cloud account</a>.
* You, or an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, has [added a new datasource]({% link soda-cloud/add-datasource.md %}) in your Soda Cloud account.
* (Optional) An Admin on your Soda Cloud account has [integrated with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack) to enable Soda Cloud to send Slack notifications to your team. If you do not use Slack, Soda Cloud can send notifications via email.

## Create a new agreement

For a new agreement, you define several details including which data to check, what checks to execute during a scan, and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to the **Agreements** dashboard, then click **New Agreement**. Follow the guided steps to complete the new agreement. Use the sections below for insight into the values to enter in the fields and editing panels in the guided steps. .  

#### 1. Select a Data Source

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Agreement Label  | Provide a name for your agreement. |
| Data Source | Select the data source to which your agreement applies. See [Create a data source]({% link soda-cloud/add-datasource.md %}).|

<br />

#### 2. Write Checks

Use [SodaCL]({% link soda-cl/soda-cl-overview.md %}) to define the checks that Soda Cloud executes on a regular schedule to uphold the tenets of this agreement. If any of these checks fail during a regularly-scheduled scan, Soda Cloud notifies the stakeholders you specify in the Notifications section.

For help writing your first checks, consider following the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}).

<br />

#### 3. Identify Stakeholders

| Field or Label  | Guidance |
| -----------------  | ----------- |

<br />

#### 4. Set Notifications

By default, Soda Cloud includes two out-of-the-box email notifications: one for the Dataset Owner and one for the Monitor Owner, which is you. You can remove or adjust these notifications, or use the search bar to add more.

Note that Soda Cloud does not send an email or Slack notification when a scan fails, only when checks fail. 

| Field or Label  | Guidance |
| -----------------  | ----------- |
|                    | If you have integrated your Soda Cloud account with Slack, use this field to type a channel name to add to the notification list of people included by default. Alternatively, use the field to enter names of teammates with whom you collaborate in Soda Cloud. |

<br />

#### 5. Set a Scan Schedule

| Field or Label  | Guidance |
| -----------------  | ----------- |



After you have set up a new agreement, Soda Cloud sends approval requests to the stakeholders you identified in step 3. when stakeholders approve or reject your agreement, Soda Cloud sends you an email notification.

Regardless of the approval status of the agreement, however, Soda Cloud begins running scans of your data according to the scan schedule you set. Soda Cloud sends notifications after each scan according to the settings you defined in step 4. 


## Edit an agreement


## Go further

* Complete the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write a few simple checks for data quality.
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}