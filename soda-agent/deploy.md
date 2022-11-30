---
layout: default
title: Deploy a Soda Agent in a Kubernetes cluster
description: Learn how to deploy a Soda Agent in a Kubernetes cluster.
parent: Soda Agent
redirect_from: 
- /soda-agent/test-deploy.html
- /soda-agent/delete.html
---

# Deploy a Soda Agent in a Kubernetes cluster
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. 

These deployment instructions offer generic guidance for setting up a Kubernetes cluster and deploying a Soda Agent in it. Instead, you may wish to access a cloud service provider-specific set of instructions for:
* [Amazon Elastic Kubernetes Service (EKS)]({% link soda-agent/deploy-aws.md %})
* [Microsoft Azure Kubernetes Service (AKS)]({% link soda-agent/deploy-azure.md %})

<br />

[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys)<br />
[Create a Kubernetes cluster](#create-a-kubernetes-cluster)<br />
[Deploy a Soda Agent](#deploy-a-soda-agent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only](#deploy-using-cli-only)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file)<br />
[(Optional) Create a practice data source](#optional-create-a-practice-data-source)<br />
[About the `helm install` command](#about-the-helm-install-command)<br />
[Decommission the Soda Agent and cluster](#decomission-the-soda-agent-and-cluster)<br />
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

* (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}

## Create a Kubernetes cluster

To deploy a Soda Agent in a Kubernetes cluster, you must first create a cluster. 

To create a cluster for testing purposes, you can use a tool such as <a href="https://minikube.sigs.k8s.io/docs/" target="_blank">Minikube</a>, <a href="https://microk8s.io/docs" target="_blank">microk8s</a>, <a href="https://kind.sigs.k8s.io/" target="_blank">kind</a>, <a href="https://docs.k3s.io/" target="_blank">k3s</a>, or <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> to create a cluster, or use an existing cluster to which you have pointed a working kubectl.

Because the procedure to create a cluster varies depending upon your cloud services provider, the instructions below offer a simple way of creating cluster using Minikube on which you can deploy a Soda Agent locally. Refer to <a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/" target="_blank"> Kubernetes documentation</a>. 

1. Install <a href="https://minikube.sigs.k8s.io/docs/start/" target="_blank">minikube</a> to use to create a Kubernetes cluster running locally.
2. Run the following command to create your local Kubernetes cluster. Be aware that this activity can take awhile. Be patient!
```shell
minikube start --driver=docker
```
```shell
...
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```
3. To connect to the newly created cluster and create a namespace, use the following command.
```shell
minikube kubectl -- create namespace soda-agent
```
4. Run the following command to change the context to associate the current namespace to `soda-agent`.  
```shell
minikube kubectl -- config set-context --current --namespace=soda-agent
```
5. Run the following command to verify that the cluster kubectl regcognizes `soda-agent` as the current namespace. 
```shell
minikube kubectl -- config get-contexts
```
```shell
CURRENT   NAME               CLUSTER          AUTHINFO          NAMESPACE
*         minikube           minikube         minikube          soda-agent
``` 

## Deploy a Soda Agent

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only](#deploy-using-cli-only) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Manage sensitive values]({% link soda-agent/secrets.md %}).|


### Deploy using CLI only

1. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account.
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish.
* Add the `core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. You can have multiple idle scan launchers waiting for instructions. <br />
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=minikube \
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
LAST DEPLOYED: Thu Jun 16 15:03:10 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
3. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
minikube kubectl -- describe pods
```
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
```shell
...
Containers:
  soda-agent-orchestrator:
        Container ID:   docker://081*33a7
        Image:          sodadata/agent-orchestrator:latest
        Image ID:       docker-pullable://sodadata/agent-orchestrator@sha256:394e7c1**b5f
        Port:           <none>
        Host Port:      <none>
        State:          Running
          Started:      Thu, 16 Jun 2022 15:50:28 -0700
        Ready:          True
...
```
![agent-deployed](/assets/images/agent-deployed.png){:height="600px" width="600px"}
5. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


### Deploy using a values YAML file

1. Using a code editor, create a new YAML file called `values.yml`.
2. In that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. 
* Replace the value of `name` with a custom name for your agent, if you wish.
* Add the `core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. You can have multiple idle scan launchers waiting for instructions. <br />
```yaml
soda:
  apikey:
    id: "your-agent-api-key-id"
    secret: "your-agent-api-key-secret"
  agent:
    name: "your-unique-agent-name"
  core:
    idle: true
    replicas: 1
```
3. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
4. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
minikube kubectl -- describe pods
```
5. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step three to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
```shell
...
Containers:
  soda-agent-orchestrator:
    Container ID:   docker://081*33a7
    Image:          sodadata/agent-orchestrator:latest
    Image ID:       docker-pullable://sodadata/agent-orchestrator@sha256:394e7c1**b5f
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Thu, 16 Jun 2022 15:50:28 -0700
    Ready:          True
...
```
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


## (Optional) Create a practice data source

{% include agent-practice-datasource.md %}

## About the `helm install` command

{% include agent-helm-command.md %}

## Decomission the Soda Agent and cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm delete soda-agent -n soda-agent
```
2. Delete the cluster.
```shell
minikube delete
```
```shell
💀  Removed all traces of the "minikube" cluster.
```

## Troubleshoot deployment

Refer to [Helpful kubectl commands]({% link soda-agent/helpful-commands.md %}) for instructions on accessing logs, etc.
<br /><br />

{% include agent-troubleshoot.md %}

<br />


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Access a list of [helpful `kubectl` commands]({% link soda-agent/helpful-commands.md %}) for running commands on your Kubernetes cluster.
* [Learn more]({% link soda-agent/secrets.md %}) about securely storing and accessing API keys and data source login credentials.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
