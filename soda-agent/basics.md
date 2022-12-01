---
layout: default
title: Soda Agent basic concepts
description: Establish a baseline understanding of the concepts involved in deploying a Soda Agent.
parent: Soda Agent
redirect_from: /soda-agent/
---

# Soda Agent basic concepts 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a Soda Agent in the cluster. 

This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 

What follows is an extremely abridged introduction to a few basic elements involved in the deployment and setup of a Soda Agent.

![agent-diagram](/assets/images/agent-diagram.png){:height="700px" width="700px"}

**Soda Core** is an open-source, command-line tool that serves as the backbone of Soda technology. It is the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality in a data source. You can connect Soda Core to a **Soda Cloud** account where you and your team can use the web application to collaborate on data quality monitoring. 

Both Soda Core and Soda Cloud make use of **Soda Checks Language (SodaCL)** to write checks for data quality. The checks are tests that Soda Core executes when it runs a scan of your data. Read [more]({% link soda/product-overview.md %}). 

**Soda Agent** is essentially Soda Core functionality that you deploy in a Kubernetes cluster in your own cloud services provider environment. When you deploy an agent, you also deploy two types of workloads in your Kubernetes cluster from a Docker image:
* a **Soda Agent Orchestrator** which creates Kubernetes Jobs and CronJobs to trigger scheduled scans of data
* a **Soda Agent Scan Launcher** which wraps around Soda Core, the tool which performs the scan itself 

**Kubernetes** is a system for orchestrating containerized applications; a **Kubernetes cluster** is a set of resources that supports an application deployment. 

You need a Kubernetes cluster in which to deploy the containerized applications that make up the **Soda Agent**. Kubernetes uses the concept of **Secrets** that the Soda Agent Helm chart employs to store connection secrets that you specify as values during the Helm release of the Soda Agent. Depending on your cloud provider, you can arrange to store these Secrets in a specialized storage such as <a href="https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts" target="_blank">Azure Key Vault</a> or <a href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html" target="_blank">AWS Key Management Service (KMS)</a>. The Jobs and CronJobs that the agent creates access these Secrets when they execute. Learn more about <a href="https://www.youtube.com/watch?v=BOj1sgWVXko" target="_blank" >Kubernetes concepts</a>.

Within a cloud services provider environment is *where* you create your Kubernetes cluster. You can deploy a Soda Agent in any environment in which you can create Kubernetes clusters such as:

* Amazon Elastic Kubernetes Service (EKS)
* Microsoft Azure Kubernetes Service (AKS)
<!--Google Kubernetes Engine (GKE) -->
* Any Kubernetes cluster  version 1.21 or greater which uses standard Kubernetes
* Locally, for testing purposes, using tools like <a href="https://minikube.sigs.k8s.io/docs/" target="_blank">Minikube</a>, <a href="https://microk8s.io/docs" target="_blank">microk8s</a>, <a href="https://kind.sigs.k8s.io/" target="_blank">kind</a>, <a href="https://docs.k3s.io/" target="_blank">k3s</a>, or <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> with Kubernetes support.

**Helm** is a package manager for Kubernetes which bundles YAML files together for storage in a public or private repository. This bundle of YAML files is referred to as a **Helm chart**. The Soda Agent is a Helm chart. Anyone with access to the Helm chart's repo can deploy the chart to make use of YAML files in it. Learn more about <a href="https://www.youtube.com/watch?v=-ykwb1d0DXU" target="_blank" >Helm concepts</a>. 

The Soda Agent Helm chart is stored on a <a href="https://helm.soda.io/soda-agent/" target="_blank">public repository</a> and published on <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>. Anyone can use Helm to find and deploy the Soda Agent Helm chart in their Kubernetes cluster.



## Go further

* Next: [Deploy a Soda Agent in a Kubernetes cluster]({% link soda-agent/deploy.md %})
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}