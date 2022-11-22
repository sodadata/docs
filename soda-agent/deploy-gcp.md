---
layout: default
title: Deploy a Soda Agent in GKE
description:  Deploy a Soda Agent in Google Kubernetes Engine.
parent: Soda Agent
---

# Deploy a Soda Agent 

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Google Kubernetes Engine (GKE) cluster, then use Helm to deploy the Soda Agent in the cluster. 

This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 


[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys) <br />
[Create a GKE cluster] <br />
[Deploy an agent to the cluster](#deploy-an-agent-to-the-cluster) <br />
&nbsp;&nbsp;&nbsp;&nbsp; [About the `helm install` command](#about-the-helm-install-command) <br />
&nbsp;&nbsp;&nbsp;&nbsp; [Troubleshoot deployment](#troubleshoot-deployment)<br />
&nbsp;&nbsp;&nbsp;&nbsp; [Deploy using a values YAML file](#deploy-using-a-values-yaml-file) <br />
[Use environment variables for data source connection credentials](#use-environment-variables-for-data-source-connection-credentials) <br />
[Redeploy an agent](#redeploy-an-agent)<br />
[Review Soda Agent logs](#review-soda-agent-logs) <br />
<br />


## Deployment overview

{% include agent-deploy-overview.md %}


## Compatibility

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

## Prerequisites

* (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
* customized for GKE...

## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}


## Create a GKE cluster

Customize some content here to help someone with a few basic steps, but mainly point to Google docs. 

We're not here to provide instructions for someone else's software.

## Remaining sections...

Reuse whatever is possible between environments and customize parts as necessary.

Mimic the structure of the deployment doc so as to facilitate content reuse.

## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Consider completing the [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source and creating a new agreement.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}