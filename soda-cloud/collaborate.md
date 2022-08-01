---
layout: default
title: Collaborate on data monitoring
description: Data quality is a team sport! Integrate with Slack so Soda Cloud can send alerts to your team. Invite your team to join your Soda Cloud account.
parent: Soda Cloud
redirect_from:
  - /soda-sql/documentation/integrate-slack.html
  - /soda-cloud/integrate-slack.html
---

# Collaborate on data monitoring

One of the main benefits of using Soda Cloud is the ability to collaborate with your teammates on the work to monitor and maintain data quality. Including multiple perspectives yields a more robust interpretation of "good quality data".

## Integrate with Slack

{% include integrate-slack-steps.md %}

## Invite your team members

Invite the members of your team to join you in your work to monitor data quality in your organization.

In Soda Cloud, navigate to **your avatar** > **Invite Team Members** and fill in the blanks.

When your team members receive the invitation email, they can click the link in the email to create their own login credentials to access your Soda Cloud account directly. Refer to [Default roles and groups]({% link soda-cloud/roles-and-rights.md %}#default-roles-and-groups) to learn more about the default access rights Soda Cloud assigns to new users.

Note that if your organization uses a single sign-on (SSO) identity provider to access Soda Cloud, you cannot invite team members in Soda Cloud. Instead, contact your IT Admin to request access to Soda Cloud using your SSO. See also, [Single Sign-on with Soda Cloud]({% link soda-cloud/sso.md %}).

## Share test results and filtered views

Collaborating as a team on Soda Cloud means you can quickly share the lastest test results for a dataset with others.

1. In Soda Cloud, navigate to the **Datasets** dashboard, then select the dataset you wish to share.
2. Copy the URL of the dataset, then paste it into a message to the teammates who have access to your organization's Soda Cloud account.

![share dataset](/assets/images/share-dataset.png){:height="700px" width="700px"}

## Create and manage Incidents

[Create an Incident]({% link soda-cloud/incidents.md %}) in Soda Cloud to track your team's investgation and resolution of the data quality issue. 

If you have integrated your Soda Cloud account with a Slack workspace, you can use an Incident's built-in ability to create an incident-specific Slack channel where you and your team can collaborate on the issue investigation. 

![monitor-results-incidents](/assets/images/monitor-results-incidents.png){:height="700px" width="700px"}

## Go further

* Share a [filtered view of your datasets]({% link soda-cloud/organize-datasets.md %}) with colleagues by sharing the URL of your narrowed search. 
* [Connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account.
* [Organize your datasets]({% link soda-cloud/organize-datasets.md %}) in Soda Cloud to facilitate your search for the right data.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}