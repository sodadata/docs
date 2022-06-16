---
layout: default
title: Deploy a Soda Agent
description: 
parent: Soda Agent
---

# Deploy a Soda Agent

The **Soda Agent** is a tool that empowers Soda Cloud users to securely connect to new data sources. It obviates the need to install Soda Core independently to set up configuration YAML files to connect to data sources. Instead, the Soda Agent enables Soda Cloud users to serve themselves when it comes to connecting to new data sources in an organization. 

Create an Amazon Elastic Kubernetes Service (EKS) Fargate cluster, then use Helm to deploy the Soda Agent in the cluster. This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 


## Deployment overview

1. (Optional) Familiarize yourself with basic Soda, Kubernetes, and Helm concepts. 
2. Install, or confirm the installation of, a few required command-line tools.
3. Sign up for a Soda Cloud account and create new API keys.
4. Use the command-line to create an EKS Fargate cluster.
5. Deploy the Soda Agent in the new cluster.
6. Create a new data source, including a scan schedule, in Soda Cloud via the Soda Agent.
7. (Optional) Securely store data source login credentials using values-local YAML file.  

## Basic concepts

What follows is an extremely abridged introduction to a few basic elements involved in the deployment and setup of a Soda Agent.

**Soda Core** is an open-source, command-line tool that essentially serves as the backbone of Soda technology. It is the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality. You can connect Soda Core to a **Soda Cloud** account where you and your team can use the web application to collaborate on data quality monitoring. 

Both Soda Core and Soda Cloud make use of **Soda Checks Language (SodaCL)** to write checks for data quality. The checks are tests that Soda Core executes when it runs a scan of your data. Read [more]({% link soda/product-overview.md %}). 

**Kubernetes** is a system for orchestrating containerized applications; a **Kubernetes cluster** is a set of resources that support an application environment. You need a Kubernetes cluster in which to deploy the containerized applications that make up the **Soda Agent**.

**Amazon Elastic Kubernetes Service (EKS)** is *where* you create your Kubernetes cluster; **Fargate** is a type of EKS node that operates as a serverless, pay-as-you-go compute engine, so that you can pay for the compute power your cluster uses. The Kubernetes cluster is where you store **Kubernetes secrets**, such as login credentials, which Kubernetes creates independently on the pods that use them. (Pods are a basic workload unit in Kubernetes, usually an instance of one containtr.) Learn more about <a href="https://www.youtube.com/watch?v=BOj1sgWVXko" target="_blank" >Kubernetes</a> concepts.

**Helm** is a pacakage manager for Kubernetes which bundles YAML files together for storage in a public or private repository. This bundle of YAML files is referred to as a **Helm chart**. The Soda Agent is a Helm chart. Anyone with access to the Helm chart's repo can deploy the chart to make use of YAML files in it. Learn more about <a href="https://www.youtube.com/watch?v=-ykwb1d0DXU" target="_blank" >Helm</a> concepts. 

The Soda Agent Helm chart is stored on a public respository on <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>. Anyone can use Helm to find and deploy the Soda Agent Helm chart in their Kubernetes cluster. Deploying the agent also installs two other things in your Kubernetes cluster:
* a **Soda Agent Orchestrator** which creates Kubernetes Jobs and cron jobs to trigger scheduled scans of data
* a **Soda Agent Scan Launcher** which wraps around Soda Core, the tool which performs the scan itself and pushes scan results to Soda Cloud 

To learn more about the Soda Agent in greater detail, read [How a Soda Agent works]({% link soda-agent/how-it-works.md %}). 


## Prererequisites

* You have installed <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a>. This is the command-line tool you need to access your AWS account from the commnd-line.
* You have installed <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart.
* You have installed <a href="https://eksctl.io/introduction/#installation" target="_blank">eksctl</a>. This is the command-line tool for Amazon EKS that you use to create and manage Kubernetes clusters on EKS. 
* You have an AWS account and the necessary permissions to enable you to create an EKS Fargate cluster.

## Create a Soda Cloud account and API keys


## Deploy an agent

1. From the command-line, execute the following command to create a new EKS Fargate cluster in your AWS account.  <br/>Replace the value of `--region` with one that is appropriate for your location. 
```shell
eksctl create cluster --name soda-agent --region eu-central-1 --fargate
```
2. To connect to the newly created cluster and create a namespace, use the following command.
```shell
kubectl create namespace soda-agent
```
3. Create a namespace and a Fargate profile for EKS Fargate serverless deployment in the namespace you just created. When you deploy a Soda Agent on EKS Fargate, AWS matches the Fargate Profile using annotation labels in the Soda Agent Helm chart. Without the profile, the Helm chart cannot successfully deploy.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --namespace soda-agent
```
4. Run the following command to verify which cluster kubectl regcognizes as the current one. 
```shell
kubectl config get-contexts
```
The namespace must be `soda-agent`. If it is not, use the following command to change contexts. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
5. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
6. Install the Helm chart to deploy a Soda Agent in your custer. Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values for API PUBLIC and API PRIVATE keys you created in your Soda Cloud account.
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=aws-eks \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=f** \
  --set soda.apikey.secret=6TR** \
  --namespace soda-agent
```


## Review logs

## Redeploy the agent


## Add a new datasource


## Environment variables for warehouse connections


## Decommision an EKS cluster


## Go further

* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}