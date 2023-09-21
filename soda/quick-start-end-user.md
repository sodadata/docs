---
layout: default
title: Self-serve data quality
description: Follow this guide to enable Soda Cloud end users to write their SodaCL checks for data quality for the data that matters to them the most.
parent: Use case guides
redirect_from:
- /soda/quick-start-sodacloud.html
---

# Self-serve data quality
*Last modified on {% last_modified_at %}*

Use this guide to set up the Soda Cloud to enable users across your organization to serve themselves when it comes to testing data quality. 

Deploy a Soda Agent in a Kubernetes cluster to connect to both a data source and the Soda Cloud, then invite your Data Analyst and Scientist colleagues to join the account to create agreements and begin writing their own SodaCL checks for data quality. 

(Not quite ready for this big gulp of Soda? 🥤Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)

<br />

![end-user-start](/assets/images/end-user-start.png){:width="500px"}

[About this guide](#about-this-guide)<br />
[Deploy a Soda Agent in a Kubernetes cluster](#deploy-a-soda-agent)<br />
[Connect a data source to Soda Cloud](#connect-a-data-source)<br />
[Set up Slack integration and notification rules](#set-up-slack-integration-and-notification-rules)<br />
[Invite your colleagues to begin writing agreements](#invite-your-colleagues)<br />
[Go further](#go-further)<br />
<br />


## About this guide

The instructions below offer Data Engineers an example of how to set up the Soda Cloud to enable colleagues to prepare their own data quality tests. After all, data quality testing is a team sport!

For context, the example assumes that you have the appropriate access to a cloud services provider environment such as Azure, AWS, or Google Cloud that allows you to create and deploy applications to a cluster. Further, it assumes that you, or someone on your team, has access to the login credentials that Soda needs to be able to access a data source such as MS SQL, Big Query, or Athena so that Soda can run scans of the data.

Once you have completed the set-up, you can direct your colleagues to log in to Soda Cloud and begin [creating Agreements]({% link soda-cloud/agreements.md %}). An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. It contains data quality checks that run according to the schedule you defined for the data source. 

When checks fail during data quality scans, you and your colleagues get alerts via Slack which enable you to address issues before they have a downstream impact on the users or systems that depend upon the data.

## Deploy a Soda Agent

The Soda Agent is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a Soda Agent in the cluster.

Access the exhaustive deployment instructions for the cloud services provider you use.
* [Amazon Elastic Kubernetes Service (EKS)]({% link soda-agent/deploy-aws.md %})
* [Microsoft Azure Kubernetes Service (AKS)]({% link soda-agent/deploy-azure.md %})
* [Google Kubernetes Engine (GKE)]({% link soda-agent/deploy-google.md %})
* [Cloud services provider-agnostic instructions]({% link soda-agent/deploy.md %})

## Connect a data source

1. Log in to your Soda Cloud account, then navigate to **your avatar** > **Scans & Data**.
2. In the **Agents** tab, confirm that you can see the Soda Agent you deployed and that its status is "green" in the **Last Seen** column. If not, refer to the Soda Agent documentation to [troubleshoot]({% link soda-agent/deploy.md %}#troubleshoot-deployment) its status.
![agent-running](/assets/images/agent-running.png){:height="700px" width="700px"}
3. Navigate to the **Data source** tab, then click **New Data Source** and follow the [guided steps]({% link soda-cloud/add-datasource.md %}) to:
* identify the new data source and its default scan schedule
* provide connection configuration details for the data source, and test the connection to the data source
* profile the datasets in the data source to gather basic metadata about the contents of each
* identify the datasets to which you wish to apply automated monitoring for anomalies and schema changes
* assign ownership roles for the data source and its datasets
4. Save the new data source.

## Set up Slack integration and notification rules

{% include quick-start-notifs.md %}

## Invite your colleagues

After testing and saving the new data source, invite your colleagues to your Soda Cloud account so they can begin creating new agreements. 

Navigate to **your avatar** > **Invite Team Members**, then complete the form to send invitations to your colleagues. Provide them with the following links to help them get started:
* [Create a Soda agreement]({% link soda-cloud/agreements.md %})
* [SodaCL tutorial]({% link soda/quick-start-sodacl.md %})

<br />
✨Well done!✨ You've taken the first step towards a future in which you and your colleagues can collaborate on defining and maintaining good-quality data. Huzzah!


## Go further?

* [Get organized]({% link soda-cloud/collaborate.md %}) in Soda!
* <a href="https://www.soda.io/schedule-a-demo" target="_blank">Request a demo</a>. Hey, what can Soda do for you?
* Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}