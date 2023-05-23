---
layout: default
title: Enable end users to test data quality
description: Follow this guide to enable Soda platform end users to write their SodaCL checks for data quality for the data that matters to them the most.
parent: Get started
redirect_from:
- /soda/quick-start-sodacloud.html
---

# Enable end users to test data quality
*Last modified on {% last_modified_at %}*

Use this guide to set up the Soda platform to enable users across your organization to serve themselves when it comes to testing data quality. 

Deploy a Soda Agent in a Kubernetes cluster to connect to both a data source and the Soda platform, then invite your Data Analyst and Scientist colleagues to join the platform to create agreements and begin writing their own SodaCL checks for data quality. 

![end-user-start](/assets/images/end-user-start.png){:width="500px"}

**[01](#soda-basics)** Learn the basics of Soda<br />
**[02](#about-this-guide)** Get context for this guide<br />
**[03](#deploy-a-soda-agent)** Deploy a Soda Agent in a Kubernetes cluster<br />
**[04](#connect-a-data-source)** Connect a data source to the Soda platform<br />
**[05](#set-up-slack-integration-and-notification-rules)** Set up Slack integration and notification rules<br />
**[06](#invite-your-colleagues)** Invite your colleagues to begin writing agreements<br />
<br />


## Soda basics

Soda works by taking data quality checks that you prepare and using them to run a scan of datasets in a data source. A scan is a CLI command which instructs Soda to prepare optimized SQL queries that execute data quality checks on your data source to find invalid, missing, or unexpected data. When checks fail, they surface bad-quality data and present check results that help you investigate and address quality issues. 

To enable your colleagues to test data quality, you install Soda as an **Agent** in your own network infrastructure, and sign up for a **Soda platform account** so that you can complete the following tasks:

* **Connect to your data source.** <br />To connect to a data source such as Snowflake, Amazon Athena, or Big Query, you add a new data source in the Soda platform which stores access details for your data source such as host, port, and data source login credentials. 
* **Define checks to surface “bad” data.** <br />To define the data quality checks that Soda runs against a dataset, you use an Agreement, a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. These agreements contain checks, which are tests that Soda performs when it scans a dataset in your data source. The agreement stores the checks you write using the Soda Checks Language (SodaCL), a domain-specific language for data quality testing.
* **Run a scan to execute your data quality checks.** <br />During a scheduled scan, Soda does not ingest your data, it only scans it for quality metrics, then uses the metadata to prepare scan results<sup>1</sup>. After a scan, each check results in one of three default states:
    * pass: the values in the dataset match or fall within the thresholds you specified
    * fail: the values in the dataset do not match or fall within the thresholds you specified
    * error: the syntax of the check is invalid
    * A fourth state, warn, is something you can explicitly configure for individual checks. 
* **Review scan results and investigate issues.** <br />You can review the scan output in your Soda platform account which offers access to visualized scan results, trends in data quality over time, and the ability to integrate with the messaging, ticketing, and data cataloging tools you already use, like Slack, Jira, and Alation.

<sup>1</sup> An exception to this rule is when Soda collects failed row samples that it presents in scan output to aid issue investigation, a feature you can [disable]({% link soda-cloud/failed-rows.md %}#disable-failed-row-samples).

Learn more about [How Soda works]({% link soda-core/how-core-works.md %}).<br />
Learn more about [running Soda scans]({% link soda-core/scan-core.md %}).<br />
Learn more about [SodaCL Metrics and checks]({% link soda-cl/metrics-and-checks.md %}).<br />
Access the [Glossary]({% link soda/glossary.md %}) for a full list of Soda terminology. 

## About this guide

The instructions below offer Data Engineers an example of how to set up the Soda platform to enable colleagues to prepare their own data quality tests. After all, data quality testing is a team sport!

For context, the example assumes that you have the appropriate access to a cloud services provider environment such as Azure, AWS, or Google Cloud that allows you to create and deploy applications to a cluster. Further, it assumes that you, or someone on your team, has access to the login credentials that Soda needs to be able to access a data source such as MS SQL, Big Query, or Athena so that Soda can run scans of the data.

Once you have completed the set-up, you can direct your colleagues to log in to the Soda platform and begin [creating Agreements]({% link soda-cloud/agreements.md %}). An agreement is a contract between stakeholders that stipulates the expected and agreed-upon state of data quality in a data source. It contains data quality checks that run according to the schedule you defined for the data source. 

When checks fail during data quality scans, you and your colleagues get alerts via Slack which enable you to address issues before they have a downstream impact on the users or systems that depend upon the data.

(Not quite ready for this big gulp of Soda? ![SodaCan@0.5x](/assets/images/SodaCan@0.5x.png){:width="12px"}Try [taking a sip]({% link soda/quick-start-sip.md %}), first.)
<br />

## Deploy a Soda Agent

The Soda Agent is a tool that empowers Soda platform users to securely access data sources to scan for data quality. Create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a Soda Agent in the cluster.

Access the exhaustive deployment instructions for the cloud services provider you use.
* [Amazon Elastic Kubernetes Service (EKS)]({% link soda-agent/deploy-aws.md %})
* [Microsoft Azure Kubernetes Service (AKS)]({% link soda-agent/deploy-azure.md %})
* [Google Kubernetes Engine (GKE)]({% link soda-agent/deploy-google.md %})
* [Cloud services provider-agnostic instructions]({% link soda-agent/deploy.md %})

## Connect a data source

1. Log in to your Soda platform account, then navigate to **your avatar** > **Scans & Data**.
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

After testing and saving the new data source, invite your colleagues to your Soda platform account so they can begin creating new agreements. 

Navigate to **your avatar** > **Invite Team Members**, then complete the form to send invitations to your colleagues. Provide them with the following links to help them get started:
* [Create a Soda agreement]({% link soda-cloud/agreements.md %})
* [SodaCL tutorial]({% link soda/quick-start-sodacl.md %})

<br />
✨Well done!✨ You've taken the first step towards a future in which you and your colleagues can collaborate on defining and maintaining good-quality data. Huzzah!

## Now what?
<div class="docs-html-content">
    <section class="docs-section" style="padding-top:0">
        <div class="docs-section-row">
            <div class="docs-grid-3cols">
                <div>
                    <img src="/assets/images/icons/icon-pacman@2x.png" width="54" height="40">
                    <h2>Experiment</h2>
                    <a href="/soda/quick-start-sodacl.html">SodaCL tutorial</a>                    
                    <a href="/soda-cl/metrics-and-checks.html">Study metrics and checks</a>
                    <a href="/soda-cl/compare.html">Compare data</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-new@2x.png" width="54" height="40">
                    <h2>Sip more Soda</h2>
                    <a href="/soda/integrate-webhooks.html" target="_blank">Integrate with your tools</a>
                    <a href="/soda-cl/check-attributes.html">Add check attributes</a>
                    <a href="/soda-cloud/failed-rows.html">Examine failed row samples</a>
                </div>
                <div>
                    <img src="/assets/images/icons/icon-dev-tools@2x.png" width="54" height="40">
                    <h2>Choose your adventure</h2>
                    <a href="/soda/quick-start-dev.html">Test data during development</a>
                    <a href="/soda/quick-start-prod.html">Test data in a pipeline</a>
                </div>
            </div>
        </div>
    </section>
</div>



## Need help?

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