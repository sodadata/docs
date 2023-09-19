---
layout: default
title: Organize results, set alerts, investigate issues
description: Data quality is a team sport! Integrate with Slack so Soda Cloud can send alerts to your team. Invite your team to join your Soda Cloud account.
parent: Organize, alert, investigate
redirect_from:
  - /soda-sql/documentation/integrate-slack.html
  - /soda-cloud/integrate-slack.html
---

# Organize results, set alerts, investigate issues
*Last modified on {% last_modified_at %}*

After you have set up Soda, there are several recommended steps to take to customize your implementation and maximize your team's efficiency in monitoring data quality. Though recommended, these customizations are optional.

As the last step in the **Get started roadmap**, this guide offers instructions to organize your check results, customize alert notifications, open incidents to investigate issues, and more.

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777"> Set up Soda: install, deploy, or invoke</font></s>
3. <s><font color="#777777"> Write SodaCL checks</font></s>
4. <s><font color="#777777"> Run scans and review results</font></s>
5. **Organize, alert, investigate** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Integrate with Slack](#integrate-with-slack)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Invite your team membrs](#invite-your-team-members)<br />
&nbsp;&nbsp;&nbsp;&nbsp; c. [Add check attributes](#add-check-attributes)<br />
&nbsp;&nbsp;&nbsp;&nbsp; d. [Set alert notification rules](#set-alert-notification-rules)<br />
&nbsp;&nbsp;&nbsp;&nbsp; e. [Build collections](#build-collections)<br />
&nbsp;&nbsp;&nbsp;&nbsp; f. [Create incidents](#create-incidents)<br />
&nbsp;&nbsp;&nbsp;&nbsp; g. [Add dataset attributes](#add-dataset-attributes)<br />
&nbsp;&nbsp;&nbsp;&nbsp; h. [Integrate with a data catalog](#integrate-with-a-data-catalog)<br />
<br />


## Integrate with Slack

{% include integrate-slack-steps.md %}

Alternatively, you can integrate Soda with [MS Teams]({% link soda/integrate-msteams.md %}) or another third-party ticketing or messaging tool using a [webhook]({% link soda/integrate-webhooks.md %}).

## Invite your team members

Invite the members of your team to join you in your work to monitor data quality in your organization.

In your Soda Cloud account, navigate to **your avatar** > **Invite Team Members** and fill in the blanks.

When your team members receive the invitation email, they can click the link in the email to create their own login credentials to access your Soda Cloud account directly. Refer to [Default roles and groups]({% link soda-cloud/roles-and-rights.md %}#default-roles-and-groups) to learn more about the default access rights Soda Cloud assigns to new users.

Note that if your organization uses a single sign-on (SSO) identity provider to access Soda Cloud, you cannot invite team members in Soda Cloud. Instead, contact your IT Admin to request access to Soda Cloud using your SSO. See also, [Single Sign-on with Soda Cloud]({% link soda-cloud/sso.md %}).

## Add check attributes

Define check attributes that your team can apply to checks to filter check results and customie alert notifications.
* Apply attributes to checks to label and sort them by department, priority, location, etc.
* Add a check attribute to identify, for example, checks that execute against personally identifiable information (PII).
* Define rules to route alert notifications according to check attributes. <br />

1. You must define check attributes first, before a user can apply the attribute to new or existing checks. In your Soda Cloud account, navigate to **your avatar** > **Attributes** > **New Attribute**.
2. Follow the guided steps to create and save a new attribute. [Learn more]({% link soda-cl/check-attributes.md %})
3. Apply the new attribute to SodaCL checks using key:value pairs, as in the following example which applies five attributes to a new `row_count` check. 
{% include code-header.html %}
```yaml
checks for dim_product:
  - row_count = 10:
      attributes:
        department: Marketing
        priority: 1
        tags: [event_campaign, webinar]
        pii: true
        best_before: 2022-02-20
```

## Set alert notification rules

Ascribing to a "No noise" policy, Soda enables you define rules to customize the alert notifications you receive when check results warn or fail.  For example, you can define a notification rule to instruct Soda Cloud to send an alert to your `#sales-engineering` Slack channel whenever a data quality check on the `snowflake_sales` data source fails.

In Soda Cloud, navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule** and follow the guided steps to complete the new rule. [Learn more]({% link soda-cloud/notif-rules.md %})

![alert-rule](/assets/images/alert-rule.png){:height="500px" width="600px"}

## Build check collections

If there are checks which you wish to review frequently, consider building a **Collection**. 

1. In your Soda Cloud account, navigate to the **Checks** dashboard.
2. Use a combination of Soda Cloud filters to display your ideal set of data quality checks, then click **Save Collection** to name the custom filtered view. 
3. In the future, use the dropdown in the **Checks** dashboard to quickly access your collection again.


## Create incidents

When a check fails, you can create an incident in Soda Cloud to track your team's investigation and resolution of a data quality issue. [Read more]({% link soda-cloud/incidents.md %})

{% include create-incidents.md %}

If you have integrated your Soda Cloud account with a Slack workspace, you can use an incident's built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation. 

![incident-slack](/assets/images/incident-slack.png){:height="700px" width="700px"}


## Add dataset attributes

With dozens, or even hundreds of datasets in your Soda Cloud account, it may be difficult to find the data quality information you’re looking for. To facilitate your search for specific data quality status, consider defining your own **Attributes** and **Tags** for datasets, then use filters to narrow your search.  

Use dataset attributes to:
* identify datasets that are associated with a particular marketing campaign
* identify datasets that are relevant for a particular customer account
* identify datasets whose quality is critical to business operations, or to categorize datasets according to their criticality in general, such as “high”, “medium”, and “low”.
* identify datasets that populate a particular report or dashboard

1. You must define attributes first, before applying them to datasets. In your Soda Cloud account, navigate to **your avatar** > **Attributes** > **New Attribute**.
2. Follow the guided steps to create the new attribute. [Learn more]({% link soda-cloud/organize-datasets.md %})
3. Navigate to the **Datasets** dashboard, click the stacked dots next to a dataset, then select **Edit Dataset**. Use the attributes fields to apply the appropriate attributes to the dataset, and add any tags you wish as futher dataset identifiers.
4. After saving your changes and applying tags and attributes to multiple datasets, use the **Filters** in the **Datasets** dashboard to display the datasets that help narrow your study of data quality.


## Integrate with a data catalog

If your team uses a data catalog such as Alation, Atlan, or Metaphor, consider integrating it with Soda to access details about the quality of your data directly within the data catalog.

* Run data quality checks using Soda and visualize quality metrics and rules within the context of a data source, dataset, or column in Alation.
* Use Soda Cloud to flag poor-quality data in lineage diagrams and during live querying.
* Give your Alation users the confidence of knowing that the data they are using is sound.

Use the links below to access catalog-specific integration instructions. <br />
[Integrate with Alation]({% link soda/integrate-alation.md %})<br />
[Integrate with Atlan]({% link soda/integrate-atlan.md %})<br />
[Integrate with Metaphor]({% link soda/integrate-metaphor.md %})<br />

## Go further

🌟 Well done! You've complete the roadmap! 🌟

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777"> Set up Soda: install, deploy, or invoke</font></s>
3. <s><font color="#777777"> Write SodaCL checks</font></s>
4. <s><font color="#777777"> Run scans and review results</font></s>
5. <s><font color="#777777">Organize, alert, investigate</font></s> <br />

#### What's next? 
* Use the [Reporting API]({% link api-docs/reporting-api-v1.md %}) to access metadata about your Soda Cloud account.
* Are you a dbt user? Consider [ingesting dbt tests]({% link soda/integrate-dbt.md %}) into Soda Cloud for a single-pane-of-glass view of your data quality tests.
* Access the [Use case guides]({% link soda/setup-examples.md %}) for example implementations of Soda.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}