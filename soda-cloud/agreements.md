---
layout: default
title: Create an agreement
description: Create agreements in Soda Cloud to set expectations for good-quality data.
parent: Soda Cloud
redirect_from: /soda-cloud/monitors.html
---

# Create an agreement 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. 

![agreement-1](/assets/images/agreement-1.png){:height="700px" width="700px"}

Use SodaCL checks to define the state of "good quality" for data in this data source, then identify and get approval from stakeholders in your organization. Define whom Soda Cloud will notify when a check in this Agreement fails, then set a schedule to regularly execute the Soda Checks to uphold the tenets of the agreement.

![agreement-2](/assets/images/agreement-2.png){:height="700px" width="700px"}

[Prerequisites](#prerequisites)<br />
[Create a new agreement](#create-a-new-agreement)<br />
[Run an ad hoc scan](#run-an-ad-hoc-scan)<br />
[Edit an agreement](#edit-an-agreement)<br />
[Go further](#go-further)<br />
<br />


## Prerequisites

* You have created a <a href="https://cloud.soda.io/signup" target="_blank">Soda Cloud account</a>.
* You, or an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, has [deployed a Soda Agent]({% link soda-agent/deploy.md %}) and connected it to your Soda Cloud account.
* You, or an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, has [added a new datasource]({% link soda-cloud/add-datasource.md %}) via the Soda Agent in your Soda Cloud account.
* (Optional) An Admin on your Soda Cloud account has [integrated with Slack]({% link soda/integrate-slack.md %}) or another [third-party service provider]({% link soda/integrate-webhooks.md %}) to enable Soda Cloud to send alert notifications to your team. If you do not integrate with another service-provider, Soda Cloud can send notifications via email.

## Create a new agreement

For a new agreement, you define several details including which data to check, what checks to execute during a scan, and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to the **Agreements** dashboard, then click **New Agreement**. Follow the guided steps to complete the new agreement. Use the sections below for insight into the values to enter in the fields and editing panels in the guided steps.  

#### 1. Select a Data Source

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Agreement Label  | Provide a name for your agreement. |
| Data Source | Select the data source that contains the datasets to which your agreement applies. <br /> If you have no options to select in the dropdown, it is because you have not added a data source via a Soda Agent. You can only create agreements on datasets that are in a data source that has been onboarded into Soda Cloud via a Soda Agent. <br /> See [Create a data source]({% link soda-cloud/add-datasource.md %}).|

<br />

#### 2. Write Checks

Use [SodaCL]({% link soda-cl/soda-cl-overview.md %}) to define the checks that Soda Cloud executes on a regular schedule to uphold the tenets of this agreement. If any of these checks fail during a regularly-scheduled scan, Soda Cloud notifies the stakeholders you specify in the Notifications section.

* For help writing your first checks, consider following the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}), including the [Tips and best practices]({% link soda/quick-start-sodacl.md %}#tips-and-best-practices-for-sodacl) section.
* Avoid applying the same [customized check names]({% link soda-cl/optional-config.md %}#customize-check-names) in multiple agreements. Soda Cloud associates check results with agreements according to name so if you reuse custom names, Soda Cloud may become confused about which agreement to which to link check results.
* Avoid using an [anomaly score check]({% link soda-cl/anomaly-score.md %}) to test the agreements workflow. The ML algorithm that anomaly score checks use requires a minimum of four, regular-frequency scans before it has collected enough historic measurements against which to gauge an anomaly. Consider using checks with [numeric]({% link soda-cl/numeric-metrics.md %}), [missing]({% link soda-cl/missing-metrics.md %}), or [validity]({% link soda-cl/validity-metrics.md %}) metrics, instead.
* Note that any checks you test in the context of this step in the agreements workflow _do not_ appear as "real" check results in the **Check Results** dashboard. 
* Do not use variables to define dynamic values in your checks as you cannot provide scan-time values for those variables with scheduled scans. See [Configuration details and limitations]({% link soda-cl/filters.md %}#configuration-details-and-limitations) for details.

<br />

#### 3. Identify Stakeholders

Add Stakeholders to this agreement who have an interest in maintaining or using the good-quality data in this data source. Consider adding a co-owner to your agreement for redundancy should you, as the agreement author, be absent.

Soda Cloud sends emails to request review and approval from all stakeholders, but does not prevent Soda Cloud from running scans and executing checks in the agreement if not all stakeholders have approved the agreement.

<br />

#### 4. Set Notifications

By default, Soda Cloud includes an out-of-the-box email notification to all the agreement's stakeholders when a check in your agreement fails. You can remove or adjust this notification, or use the search bar to add more. Access [Scan output]({% link soda-cloud/scan-output.md %}#) to learn more about pass, warn, and fail check results.

If you have integrated your Soda Cloud account with [Slack]({% link soda/integrate-slack.md %}) or another third-party service provider via a [webhook]({% link soda/integrate-webhooks.md %}), use the search field to type a channel name to add the channel as a notification recipient. Alternatively, use the field to enter names of individual teammates with whom you collaborate in Soda Cloud.

Note that Soda Cloud does not send a notification when a *scan* fails because of an error, only when *checks* pass, warn, or fail. Refer to [Scan output]({% link soda-cloud/scan-output.md %}#scan-failed) for details.

<br />

#### 5. Set a Scan Schedule

After you have set up a new agreement, Soda Cloud sends approval requests to the stakeholders you identified in step 3. When stakeholders approve or reject your agreement, Soda Cloud sends you an email notification.

Regardless of the approval status of the agreement, however, Soda Cloud begins running scans of your data according to the scan schedule you set. Soda Cloud sends notifications after each scan according to the settings you defined in step 4. 

(Optional) You can create a new [scan definition]({% link soda/glossary.md %}#scan-definition) if you wish to run a scan to execute the checks in this agreement more or less frequently, or a different time of day, relative to the default scan definition for the data source. 

To review existing scan definitions, navigate to **your avatar** > **Scans & Data** > **Scan Definitions** tab. 

<br />

## Run an ad hoc scan

{% include ad-hoc-scan.md %}


## Edit an agreement

1. Navigate to the **Agreements** dashboard, then click the stacked dots at the right of the agreement you wish to edit and select **Edit Agreement**.
2. Navigate the tabs to locate the details you wish to change.  
3. When you **Save**, Soda Cloud sends new approval request emails to all the agreement's stakeholders.  The next scheduled scan applies your changes, regardless of stakeholder approval status.


## Go further

* Consider completing the [Quick start for Soda Cloud]({% link soda/quick-start-sodacloud.md %}) for more context around creating a new agreement.
* Complete the [Quick start for SodaCL]({% link soda/quick-start-sodacl.md %}) to learn how to write a few simple checks for data quality.
* Set [notification rules]({% link soda-cloud/notif-rules.md %}) that apply to multiple checks in your account. s
* Learn more about creating and tracking [Soda Cloud Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}