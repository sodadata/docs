---
layout: default
title: Collaborate on data monitoring
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

## Share test results

Collaborating as a team on Soda Cloud means you can quickly share the lastest test results for a dataset with others.

1. In Soda Cloud, navigate to the **Datasets** dashboard, then select the dataset you wish to share.
2. Copy the URL of the dataset, then paste it into a message to the teammates who have access to your organization's Soda Cloud account.

![share dataset](/assets/images/share-dataset.png){:height="500px" width="500px"}


## Go further

* [Connect]({% link soda-cloud/connect_to_cloud.md %}) Soda SQL to your Soda Cloud account.
* [Create an alert]({% link soda-cloud/monitors.md %}) to send Slack notifications when a scan surfaces a data issue.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.