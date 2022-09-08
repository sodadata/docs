---
layout: default
title: Soda Agent basic concepts
description: Establish a baseline understanding of the concepts involved in deploying a Soda Agent.
parent: Soda Agent
redirect_from: /soda-agent/
---

# Soda Agent basic concepts ![preview](/assets/images/preview.png){:height="70px" width="70px"}

{% include banner-preview.md %}

{% include soda-agent.md %}

What follows is an extremely abridged introduction to a few basic elements involved in the deployment and setup of a Soda Agent.

**Soda Core** is an open-source, command-line tool that serves as the backbone of Soda technology. It is the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality in a data source. You can connect Soda Core to a **Soda Cloud** account where you and your team can use the web application to collaborate on data quality monitoring. 

Both Soda Core and Soda Cloud make use of **Soda Checks Language (SodaCL)** to write checks for data quality. The checks are tests that Soda Core executes when it runs a scan of your data. Read [more]({% link soda/product-overview.md %}). 

**Kubernetes** is a system for orchestrating containerized applications; a **Kubernetes cluster** is a set of resources that support an application environment. You need a Kubernetes cluster in which to deploy the containerized applications that make up the **Soda Agent**.

**Amazon Elastic Kubernetes Service (EKS)** is *where* you create your Kubernetes cluster; **Fargate** is a type of EKS node that operates as a serverless, pay-as-you-go compute engine, so that you can pay for the compute power your cluster uses. The Kubernetes cluster is also where you store **Kubernetes secrets**, such as login credentials, which Kubernetes creates independently on the pods that use them. (Pods are a basic workload unit in Kubernetes, usually an instance of one container.) Learn more about <a href="https://www.youtube.com/watch?v=BOj1sgWVXko" target="_blank" >Kubernetes concepts</a>.

**Helm** is a package manager for Kubernetes which bundles YAML files together for storage in a public or private repository. This bundle of YAML files is referred to as a **Helm chart**. The Soda Agent is a Helm chart. Anyone with access to the Helm chart's repo can deploy the chart to make use of YAML files in it. Learn more about <a href="https://www.youtube.com/watch?v=-ykwb1d0DXU" target="_blank" >Helm concepts</a>. 

The Soda Agent Helm chart is stored on a public respository on <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>. Anyone can use Helm to find and deploy the Soda Agent Helm chart in their Kubernetes cluster. Deploying the agent also installs two other things in your Kubernetes cluster:
* a **Soda Agent Orchestrator** from a Docker image, which creates Kubernetes Jobs and cron jobs to trigger scheduled scans of data
* a **Soda Agent Scan Launcher** which wraps around Soda Core, the tool which performs the scan itself and pushes scan results to Soda Cloud 



## Go further

* Next: [Deploy a Soda Agent]({% link soda-agent/deploy.md %})
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}