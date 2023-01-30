---
layout: default
title: Deploy a Soda Agent in Azure AKS (Preview)
description: Deploy a Soda Agent in a Microsoft Azure Kubernetes Service cluster.
parent: Soda Agent
---

# Deploy a Soda Agent in Azure AKS ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create, or access an existing **Azure Kubernetes Service (AKS)** cluster, then use Helm to deploy a Soda Agent in the cluster. 

This setup enables Soda Cloud users to securely connect to data sources (Snowflake, MS SQL Server, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 

[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys) <br />
[Create a Kubernetes cluster](#create-a-kubernetes-cluster) <br />
[Deploy a Soda Agent](#deploy-a-soda-agent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - regular cluster](#deploy-using-cli-only---regular-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file)<br />
[(Optional) Create a practice data source](#optional-create-a-practice-data-source)<br />
[About the `helm install` command](#about-the-helm-install-command)<br />
[Decommission the Soda Agent](#decommission-the-soda-agent)<br />
[Troubleshoot deployment](#troubleshoot-deployment)<br />
[Go further](#go-further)<br />
<br />


## Deployment overview

{% include agent-deploy-overview.md %}


## Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

## Prerequisites

* (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
* You have an Azure account and the necessary permissions to enable you to create an AKS cluster in your region. Consult the <a href="https://learn.microsoft.com/en-us/azure/role-based-access-control/overview" target="_blank">Azure access control documentation</a> for details.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. Run `kubectl version --output=yaml` to check the version of an existing install. 
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}


## Create a Kubernetes cluster

1. Use the Microsoft documentation for one of the following procedures to create a resource group and cluster using the Azure CLI. Alternatively, you tackle the same tasks using <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-powershell" target="_blank">PowerShell</a> or the <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli" target="_blank">Azure portal</a>, if you prefer.<br />
There are two ways to create a cluster:
* create a <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli" target="_blank">regular AKS cluster</a><br />
OR
* create a <a href="https://learn.microsoft.com/en-us/azure/aks/virtual-nodes-cli" target="_blank">virtual nodes-based cluster</a> which permits Azure to automatically schedule pods as Azure Container Instances (ACIs) in the background 
2. To connect to the newly-created cluster and create a namespace, use the following command.
```shell
kubectl create ns soda-agent
```
3. Run the following command to change the context to associate the current namespace to `soda-agent`. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
4. Run the following command to verify that the cluster kubectl recognizes `soda-agent` as the current namespace.
```shell
kubectl config get-contexts
```
Output:
```shell
CURRENT   NAME                CLUSTER              AUTHINFO                                 NAMESPACE
*         SodaAgentCluster    SodaAgentCluster     clusterUser_SodaAgent_SodaAgentCluster   soda-agent
```


## Deploy a Soda Agent

The following table outlines the ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only - regular cluster](#deploy-using-cli-only---regular-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster. | 
| [CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a virtual cluster. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Manage sensitive values]({% link soda-agent/secrets.md %}).|


### Deploy using CLI only - regular cluster

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following command to install the Helm chart which deploys a Soda Agent in your cluster. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions. <br />
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.name=myuniqueagent \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.core.idle=true \
    --set soda.core.replicas=1 \
    --namespace soda-agent
```
The command-line produces output like the following message:
```shell
NAME: soda-agent
LAST DEPLOYED: Mon Nov 21 16:29:38 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
3. Validate the Soda Agent deployment by running the following command.
```shell
kubectl get pods -n soda-agent
```
Be aware that the deployment may take several minutes. Use the `get pods` command to check the status of the deployment.
```shell
NAME                                     READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
```
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
5. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.

### Deploy using CLI only - virtual cluster

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following command to install the Helm chart which deploys a Soda Agent in your cluster. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions.
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.target=azure-aks-virtualnodes \
    --set soda.agent.name=myuniqueagent \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.core.idle=true \
    --set soda.core.replicas=1 \
    --namespace soda-agent
```
The command-line produces output like the following message:
```shell
NAME: soda-agent
LAST DEPLOYED: Mon Nov 21 16:29:38 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
4. Validate the Soda Agent deployment by running the following command.
```shell
kubectl get pods -n soda-agent
```
Be aware that the deployment may take several minutes. Use the `get pods` command to check the status of the deployment.
```shell
NAME                                     READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
```
5. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


### Deploy using a values YAML file

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Using a code editor, create a new YAML file called `values.yml`.
3. To that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account.
* Replace the value of `name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions.  
```yaml
soda:
        apikey:
          id: "***"
          secret: "***"
        agent:
          name: "myuniqueagent"
        core:
          idle: true
          replicas: 1
```
4. Save the file. Then, create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
```shell
namespace/soda-agent created
```
5. In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
6. Validate the Soda Agent deployment by running the following command.
```shell
kubectl get pods -n soda-agent
```
Be aware that the deployment may take several minutes. Use the `get pods` command to check the status of the deployment.
```shell
NAME                                     READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
```
7. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
8. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. 


## (Optional) Create a practice data source

{% include agent-practice-datasource.md %}


## About the `helm install` command

{% include agent-helm-command.md %}


## Decommission the Soda Agent

Use kubstl to delete everything in the namespace which you created for the Soda Agent.
```shell
kubectl delete ns soda-agent
```


## Troubleshoot deployment 

Refer to [Helpful kubectl commands]({% link soda-agent/helpful-commands.md %}) for instructions on accessing logs, etc.

<br />

{% include agent-troubleshoot.md %}



## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Access a list of [helpful `kubectl` commands]({% link soda-agent/helpful-commands.md %}) for running commands on your Kubernetes cluster.
* [Learn more]({% link soda-agent/secrets.md %}) about securely storing and accessing API keys and data source login credentials.
* Consider completing the [Quick start for Soda Cloud]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source and creating a new agreement.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}