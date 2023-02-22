---
layout: default
title: Deploy a Soda Agent in Google GKE
description: Learn how to deploy a Soda Agent in a Google Kubernetes Engine cluster.
parent: Soda Agent
redirect_from: /soda-agent/deploy-gke.html
---

# Deploy a Soda Agent in Google GKE 
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a **Google Kubernetes Engine (GKE)** cluster, then use Helm to deploy a Soda Agent in the cluster. 

This setup enables Soda Cloud users to securely connect to data sources (BigQuery, Snowflake, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 

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
[Decommission the Soda Agent and cluster](#decommission-the-soda-agent-and-cluster)<br />
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
* You have a Google Cloud Platform (GCP) account and the necessary permissions to enable you to create a Google Kubernetes Engine (GKE) cluster in Autopilot mode in your region.
* You have installed the <a href="https://cloud.google.com/sdk/docs/install" target="_blank"> gcloud CLI tool</a>. Use the command `glcoud version` to verify the version of an existing install. 
  * If you have already installed the gcloud CLI, use the following commands to login and verify your configuration settings, respectively: `gcloud auth login` `gcloud config list`
  * If you are installing the gcloud CLI for the first time, be sure to complete <a href="https://cloud.google.com/sdk/docs/install" target="_blank"> all the steps</a> in the installation to properly install and configure the setup.
  * Consider using the following command to learn a few basic glcoud commands: `gcloud cheat-sheet`.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}

## Create a GKE Autopilot cluster

To deploy a Soda Agent in a Kubernetes cluster, you must first create a network and a cluster. 

GKE offers several types of clusters and modes you can use; refer to <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters" target="_blank">GKE documentation</a> for details. The instructions below detail the steps to deploy a cluster using <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster" target="_blank">GKE Autopilot</a>, in a single zone, as a private cluster with outbound internet access.

1. Use the following command to create a network. Pick a name for the network that is unique in your environment.
```shell
gcloud compute networks create soda-agent-net-2 \
    --subnet-mode custom
```
Output:
```shell
Created [https://www.googleapis.com/compute/v1/projects/test-gke/global/networks/soda-agent-net-2].
NAME              SUBNET_MODE  BGP_ROUTING_MODE  IPV4_RANGE  GATEWAY_IPV4 
soda-agent-net-2  CUSTOM       REGIONAL
...
```
2. In the newly-created network, create a subnet with two secondary ranges, to be used for the pods and services in the cluster.
```shell
gcloud compute networks subnets create soda-agent-subnet-2 \
    --network soda-agent-net-2 \
    --range 192.168.0.0/20 \
    --secondary-range agent-pods=10.4.0.0/14,agent-services=10.0.32.0/20 \
    --enable-private-ip-google-access
```
Output:
```shell
Created [https://www.googleapis.com/compute/v1/projects/test-gke/regions/us-west1/subnetworks/soda-agent-subnet-2].
NAME                 REGION    NETWORK           RANGE           STACK_TYPE  IPV6_ACCESS_TYPE  INTERNAL_IPV6_PREFIX  EXTERNAL_IPV6_PREFIX
soda-agent-subnet-2  us-west1  soda-agent-net-2  xxx.xxx.x.x/20  IPV4_ONLY
```
3. Use the following command to create a cluster in your network, providing a unique name for the cluster. Replace the values for `region` and`master-authorized-networks` with your own region and IP address, respectively. <br />
Read more about the `create-auto` command and its flags in <a href="https://cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto" target="_blank">Google documentation</a>.
```shell
gcloud container clusters create-auto soda-agent-gke \
--region us-west1 \
--enable-private-nodes \
--network soda-agent-net-2 \
--subnetwork soda-agent-subnet-2 \
--cluster-secondary-range-name agent-pods \
--services-secondary-range-name agent-services \
--enable-master-authorized-networks \
--master-authorized-networks xxx.xxx.x.x/20 
```
Output:
```shell
...
kubeconfig entry generated for soda-agent-gke.
NAME                  LOCATION  MASTER_VERSION  MASTER_IP     MACHINE_TYPE  NODE_VERSION    NUM_NODES  STATUS
soda-agent-gke  us-west1  1.24.5-gke.600  xx.xxx.xx.xx  e2-medium     1.24.5-gke.600  3          RUNNING
```
4. Because the cluster is private, it cannot reach public IP addresses directly. Use the following command to add a network address translation (NAT) router to your network to route outbound network requests towards public IP addresses, such as `cloud.soda.io` or `cloud.us.soda.io`, through a virtual NAT.
```shell
gcloud compute routers create agent-nat-router-1 \
    --network soda-agent-net-2 \
    --region=us-west1
```
Output:
```shell
Creating router [agent-nat-router-1]...done.                                                                                                        
NAME                REGION    NETWORK
agent-nat-router-1  us-west1  soda-agent-net-2
```
5. Use the following command to add configurations to the router.
```shell
gcloud compute routers nats create nat-config \
    --router agent-nat-router-1 \
    --nat-all-subnet-ip-ranges \
    --auto-allocate-nat-external-ips
```
6. Use the following command to add configuration to connect the new cluster to your local kubectl configuration.
```shell
gcloud container clusters get-credentials soda-agent-gke \
  --region us-west1
```
7. (Optional) To enable other machines or networks to connect to the cluster, use the following command to add broader IP ranges. Replace the value for `Z.Z.Z.Z/29` with your own IP range.
```shell
gcloud container clusters update soda-agent-gke \
    --enable-master-authorized-networks \
    --master-authorized-networks Z.Z.Z.Z/29
```
8. Use the following command to create a new namespace in your cluster. 
```shell
kubectl create ns soda-agent
```
9. Run the following command to change the context to associate the current namespace to `soda-agent`. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
10. Run the following command to verify that the cluster kubectl recognizes `soda-agent` as the current namespace.
```shell
kubectl config get-contexts
```
Output:
```shell
CURRENT   NAME                             CLUSTER                          AUTHINFO                        NAMESPACE
*         gke_soda-agent-gke_us-west1...   gke_soda-agent-gke_us-west1...   gke_soda-agent-gke_us-west1***  soda-agent
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
2. Use the following command to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account.
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions. <br />
```shell
helm install soda-agent soda-agent/soda-agent \
>   --set soda.agent.name=myuniqueagent \
>   --set soda.apikey.id=*** \
>   --set soda.apikey.secret=*** \
>   --namespace soda-agent \
>   --set soda.core.idle=true \
>   --set soda.core.replicas=1
```
The command-line produces output like the following message:
```shell
NAME: soda-agent
LAST DEPLOYED: Wed Dec 14 11:45:13 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
3. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/><br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step three to check the status of the deployment. When `Status: Running`, then you can refresh and see the agent in Soda Cloud.
```shell
Name:             soda-agent-orchestrator-66-snip
Namespace:        soda-agent
Priority:         0
Service Account:  soda-agent
Node:             <none>
Labels:           agent.soda.io/component=orchestrator
                  agent.soda.io/service=queue
                  app.kubernetes.io/instance=soda-agent
                  app.kubernetes.io/name=soda-agent
                  pod-template-hash=669snip
Annotations:      seccomp.security.alpha.kubernetes.io/pod: runtime/default
Status:           Running
...
```
![agent-deployed](/assets/images/agent-deployed.png){:height="600px" width="600px"}
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


### Deploy using a values YAML file

1. Using a code editor, create a new YAML file called `values.yml`.
2. In that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. 
* Replace the value of `name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions. <br />
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
3. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
4. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
5. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step four to check the status of the deployment. When `Status: Running`, then you can refresh and see the agent in Soda Cloud.
```shell
Name:             soda-agent-orchestrator-66-snip
Namespace:        soda-agent
Priority:         0
Service Account:  soda-agent
Node:             <none>
Labels:           agent.soda.io/component=orchestrator
                  agent.soda.io/service=queue
                  app.kubernetes.io/instance=soda-agent
                  app.kubernetes.io/name=soda-agent
                  pod-template-hash=669snip
Annotations:      seccomp.security.alpha.kubernetes.io/pod: runtime/default
Status:           Running
...
```
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.
 

## (Optional) Create a practice data source

{% include agent-practice-datasource.md %}

## About the `helm install` command

{% include agent-helm-command.md %}

## Decommission the Soda Agent and cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm delete soda-agent -n soda-agent
```
2. Delete the cluster.
```shell
gcloud container clusters delete soda-agent-gke
```

Refer to <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster" target="_blank">Google Kubernetes Engine documentation</a> for details.

## Troubleshoot deployment

Refer to [Helpful kubectl commands]({% link soda-agent/helpful-commands.md %}) for instructions on accessing logs and investigating issues.
<br /><br />

{% include agent-troubleshoot.md %}

<br />


## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Access a list of [helpful `kubectl` commands]({% link soda-agent/helpful-commands.md %}) for running commands on your Kubernetes cluster.
* [Learn more]({% link soda-agent/secrets.md %}) about securely storing and accessing API keys and data source login credentials.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
