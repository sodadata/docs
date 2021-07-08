---
layout: default
title: Collaborate on data quality
parent: Soda Cloud
redirect_from: 
  - /soda-sql/documentation/integrate-slack.html
  - /soda-clouse/integrate-slack.html
---

# Collaborate on data quality

One of the main benefits of using Soda Cloud is the ability to collaborate with your teammates on the work to monitor and maintain data quality. Including multiple perspectives yields a more robust interpretation of "good quality data".

## Invite your team members

Invite the members of your team to join you in your work to monitor data quality in your organization. 

In Soda Cloud, navigate to **your avatar** > **Invite Team Members** and fill in the blanks. 

When your team members receive the invitation email, they can click the link in the email to create their own accounts and access your Soda Cloud datasets, monitors, and monitor results directly. They can also create new monitors in your account. <!--Be aware that anyone with access to the invitation link in the email can create a Soda Cloud acccount and access your information.-->

## Share data test results

Collaborating as a team on Soda Cloud means you can quickly share the lastest test results for a dataset with others. 

1. In Soda Cloud, navigate to the **Datasets** dashboard, then select the dataset you wish to share.  
2. Copy the URL of the dataset, then paste it into a message to the teammates who have accepted your invitation and created a Soda Cloud account. 

![share dataset](/assets/images/share-dataset.png){:height="500px" width="500px"}

## Integrate with Slack

Integrate your Slack workspace in your **Soda Cloud** account so that Soda Cloud can send Slack notifications to your team when a data issue triggers an [alert]({% link soda/glossary.md %}#alert).

1. In Soda Cloud, navigate to **your avatar** > **Organization Settings** > **Integrations**, then follow the guided steps to authorize Soda Cloud to connect to your Slack workspace.
2. Select the all Slack channels to which you might send notifications when Soda finds an issue with your data, then **Save**.

## Go further

* [Connect]({% link soda-cloud/connect_to_cloud.md %}) Soda SQL to your Soda Cloud account.
* [Create an alert]({% link soda-cloud/monitors.md %}) to send Slack notifications when a scan surfaces a data issue.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.