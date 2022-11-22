---
layout: default
title: Deploy a Soda Agent in AKS
description: Deploy a Soda Agent in a Microsoft Azure Kubernetes Service cluster.
parent: Soda Agent
---

# Deploy a Soda Agent in AKS
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. 

Create an Azure Kubernetes Service (AKS) cluster, then use Helm to deploy a Soda Agent in the cluster. This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. [Read more]({% link soda-agent/basics.md %}).

[About the Soda Agent](#about-the-soda-agent)<br />
[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys) <br />
[Create an AKS cluster](#create-an-aks-cluster) <br />
&nbsp;&nbsp;&nbsp;&nbsp;[Create a regular cluster](#create-a-soda-cloud-account-and-api-keys)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Create a virtual cluster](#create-a-virtual-cluster)<br />
[Deploy a Soda Agent](#deploy-a-soda-agent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - regular cluster](#deploy-using-cli-only---regular-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file)<br />
[About the `helm install` command](#about-the-helm-install-command)<br />
[Troubleshoot deployment](#troubleshoot-deployment)<br />
[Go further](#go-further)<br />
<br />

## About the Soda Agent

{% include soda-agent.md %}

## Deployment overview

{% include agent-deploy-overview.md %}


## Compatibility

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

## Prerequisites

* (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
* You have an Azure account and the necessary permissions to enable you to create an AKS cluster in your region. Consult the <a href="https://learn.microsoft.com/en-us/azure/role-based-access-control/overview" target="_blank">Azure access control documentation</a> for details.
* You have installed the <a href="https://learn.microsoft.com/en-us/cli/azure/install-azure-cli" target="_blank">Azure CLI tool</a>. This is the command-line tool you need to access your Azure account from the command-line. Run `az --version` to check the version of an existing install. Consult the <a href="https://learn.microsoft.com/en-us/cli/azure/" target="_blank"> Azure Command-Line Interface documentation</a> for details.
* You have logged in to your Azure account. Run `az login` to open a browser and log in to your account.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have already installed the Azure CLI tool, you can install kubectl using the following command: `az aks install-cli`. <br /> 
Run `kubectl version --output=yaml` to check the version of an existing install. 
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}


## Create an AKS cluster


The following procedures use Azure CLI to create a resource group and cluster. Alternatively, you tackle the same tasks using <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-powershell" target="_blank">PowerShell</a> or the <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli" target="_blank">Azure portal</a>, if you prefer.

There are two ways to create a cluster:
1. [create a regular AKS cluster](#create-a-regular-cluster)
2. [create a virtual, nodes-based cluster](#create-a-virtual-cluster) which permits Azure to automatically schedule pods as Azure Container Instances (ACIs) in the background; <a href="https://learn.microsoft.com/en-us/azure/aks/virtual-nodes-cli" target="_blank">read more</a>


### Create a regular cluster

1. To create a cluster, you must first create a resource group which belongs to a single location. Use the following command to list the available locations for your Azure subscription and record the name of the one that best matches your location.
```shell
az account list-locations -o table
```
```shell
DisplayName               Name                 RegionalDisplayName
------------------------  -------------------  -------------------------------------
East US                   eastus               (US) East US
East US 2                 eastus2              (US) East US 2
South Central US          southcentralus       (US) South Central US
West US 2                 westus2              (US) West US 2
West US 3                 westus3              (US) West US 3
Australia East            australiaeast        (Asia Pacific) Australia East
...
```
2. Use the following command to list the resource groups that already exist. Resource Groups are logical collections of resources that you deploy in Azure. Your role in your Azure environment dictates whether you can use an existing resource group or if you need to create a new one. The instructions that follow assume the latter. 
```shell
az group list --output table
```
3. From the command-line, create a new resource group using the following command, replacing the value of `--location` with your own relevant value:
```shell
az group create --name SodaAgent --location westeurope
```
4. Create an AKS cluster using the following command:
```shell
az aks create \
  --resource-group SodaAgent \
  --name SodaAgentCluster \
  --node-count 1 \
  --generate-ssh-keys
```
5. Add the cluster credentials to your kubectl configuration so you can run kubectl and helm commands against this cluster.
```shell
az aks get-credentials \
  --resource-group SodaAgent \
  --name SodaAgentCluster
```
```shell
Merged "SodaAgentCluster" as current context in /Users/my_name/.kube/config
```
6. Your default kubectl configuration now points to the newly-added cluster context. Run the following command to check the nodes in the cluster.
```shell
kubectl get nodes
```
```shell
NAME                                STATUS   ROLES   AGE   VERSION
aks-nodepool1-15273607-vmss000000   Ready    agent   40m   v1.23.12
```

### Create a virtual cluster

AKS provides an interesting solution using the virtual nodes option, a fairly recent addition to its offering. Through this, Kubernetes pods can be launched using Azure's ACI (Azure Container Instances), which would mean a serverless approach for the cluster and less upfront tweaking of the provisioning baseline. The approach has limitations as well, but it could offer a useful starting point. Switching to a fully managed server at some point afterwards remains an option anyway.
Also, for this approach to work, the virtual nodes make use of a virtual network allowing the pods in the cluster to communicate. Only AKS clusters configured with advanced networking will be able to use virtual nodes. The below mentioned steps and networking parts are also covered in great detail in the Azure documentation.

1. From the command-line, verify if the Azure Container Instances (ACI) provider is enabled for your subscription.
```shell
> az provider list --query "[?contains(namespace,'Microsoft.ContainerInstance')]" -o table
```
```shell
Namespace                    RegistrationState    RegistrationPolicy
---------------------------  -------------------  --------------------
Microsoft.ContainerInstance  Registered           RegistrationRequired
```
2. If the command yields a `NotRegistered` state, use this command to enable the provider, assuming you have sufficient privileges.
```shell
az provider register --namespace Microsoft.ContainerInstance
```
3. Use the following command to list the available locations for your Azure subscription and record the name of the one that best matches your location.
```shell
az account list-locations -o table
```
```shell
DisplayName               Name                 RegionalDisplayName
------------------------  -------------------  -------------------------------------
East US                   eastus               (US) East US
East US 2                 eastus2              (US) East US 2
South Central US          southcentralus       (US) South Central US
West US 2                 westus2              (US) West US 2
West US 3                 westus3              (US) West US 3
Australia East            australiaeast        (Asia Pacific) Australia East
...
```
4. Use the following command to list the resource groups that already exist. Resource Groups are logical collections of resources that you deploy in Azure. Your role in your Azure environment dictates whether you can use an existing resource group or if you need to create a new one. The instructions that follow assume the latter. 
```shell
az group list --output table
```
5. From the command-line, create a new resource group using the following command, replacing the value of `--location` with your own relevant value:
```shell
az group create --name SodaAgent --location westeurope
```
6. Use the following command to create a virtual network.
```shell
az network vnet create \
  --resource-group SodaAgent \
  --name SodaAgentVnet \
  --address-prefixes 10.100.0.0/16 \
  --subnet-name SodaAgentSubnet \
  --subnet-prefix 10.100.100.0/24
```
7. Note of the ID of the subnet which you just created, or use the following command to find it and store it in a variable.
```shell
subnetid=$(az network vnet subnet show \
  --resource-group SodaAgent \
  --vnet-name SodaAgentVnet \
  --name SodaAgentSubnet \
  --query id -o tsv)
```
8. Create an additional subnet for the virtual nodes.
```shell
az network vnet subnet create \
  --resource-group SodaAgent \
  --vnet-name SodaAgentVnet \
  --name SodaAgentVirtualNodeSubnet \
  --address-prefixes 10.100.101.0/24
```

## Deploy a Soda Agent

The following table outlines the ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only - regular cluster](#deploy-using-cli-only---regular-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment. | 
| [CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment. | 
| [Use values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data.|


### Deploy using CLI only - regular cluster

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
```shell
namespace/soda-agent created
```
3. Use one of the following command to install the Helm chart which deploys a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.<br /> Alternatively, you can install the agent using a values.yml file to store all the `--set` values in a local file. See [Deploy using values YAML file](#deploy-using-values-yaml-file).
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Read more [about the `helm install` command](#about-the-helm-install-command).
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
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
4. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl get pods -n soda-agent
```
```shell
NAME                                     READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
```
5. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
5. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.

### Deploy using CLI only - virtual cluster

1. Use the following command to create the cluster. Note that the node count is set to `1`, which represents the number of nodes the control plane parts of the AKS cluster use, meaning the cluster is not entirely serverless.  For production deployments, best practice dictates that you use two or three nodes.
```shell
az aks create \
  --resource-group SodaAgent \
  --name SodaAgentCluster \
  --node-count 1 \
  --network-plugin azure \
  --vnet-subnet-id $subnetid
```
Be patient as the command can take several minutes to complete. 
2. Use the following command to list the enabled add-ons for the cluster.
```shell
az aks addon list --resource-group SodaAgent --name SodaAgentCluster
```
3. Activate the virtual nodes add-on.
```shell
az aks enable-addons \
    --resource-group SodaAgent \
    --name SodaAgentCluster \
    --addons virtual-node \
    --subnet-name SodaAgentVirtualNodeSubnet
```
4. Add the cluster credentials to your kubectl configuration so you can run kubectl and helm commands against this cluster.
```shell
az aks get-credentials \
  --resource-group SodaAgent \
  --name SodaAgentCluster
```
6. Your default kubectl configuration now points to the newly-added cluster context. Run the following command to check the nodes in the cluster.
```shell
kubectl get nodes
```
```shell
NAME                                STATUS   ROLES   AGE   VERSION
aks-nodepool1-15273607-vmss000000   Ready    agent   40m   v1.23.12
```


### Deploy using a values YAML file

1. Using a code editor, create a new YAML file called `values.yml`.
2. To that file, copy+paste the content below, replacing the following values:
 * `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account 
 * Replace the value of `soda.agent.name` with a custom name for you agent, if you wish <br />
```yaml
soda:
 apikey:
           id: "your-agent-api-key-id"
           secret: "your-agent-api-key-secret"
 agent:
           loglevel: "DEBUG"
           name: "myuniqueagent"
```
3. Save the file. Then, create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
```shell
namespace/soda-agent created
```
4. In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
5. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl -- describe pods
```
6. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. 



## About the `helm install` command

```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=aws-eks \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
  --namespace soda-agent
```

| Command part | Description   |
|--------------|---------------|
| helm install | the action helm is to take | 
| `soda-agent` (the first one) | a release named soda-agent on your cluster |
| `soda-agent` (the second one)| the name of the helm repo you added in [step 1](#deploy-an-agent-to-the-cluster)|
| `soda-agent` (the third one) | the name of the helm chart that is the Soda Agent |

The `--set` options either override or set some of the values defined in and used by the Helm chart. You can override these values with the `--set` files as this command does, or you can specify the override values using a [values.yml](#deploy-using-a-values-yaml-file) file. 

| Option key      | Option value, description   |
|-----------------|--------------------------------|
| `--set soda.agent.target` | Use `aws-eks`. |
| `--set soda.agent.name`   | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud organization. |
| `--set soda.apikey.id`    | With the apikey.secret, this connects the Soda Agent to your Soda Cloud organization. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the EKS cluster instead of exposing it here.|
| `--set soda.apikey.secret`    | With the apikey.id, this connects the Soda Agent to your Soda Cloud organization. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the EKS cluster instead of exposing it here.|
| `--namespace soda-agent` | Use the namespace value to identify the namespace in which to deploy the agent. 



### Troubleshoot deployment

**Problem:** When you attempt to create a cluster, you get an error that reads, `An RSA key file or key value must be supplied to SSH Key Value. You can use --generate-ssh-keys to let CLI generate one for you`. 

**Solution:** Run the same command to create a cluster but include an extra line at the end to generate RSA keys.
```shell
az aks create \
>   --resource-group SodaAgent \
>   --name SodaAgentCluster \
>   --node-count 1 \
>   --generate-ssh-keys
```



## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Learn more about securely accessing login credentials.
* Consider completing the [Quick start for Soda Cloud (Preview)]({% link soda/quick-start-sodacloud.md %}) for more context around setting up a new data source and creating a new agreement.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}