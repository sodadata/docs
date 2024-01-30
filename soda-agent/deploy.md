---
layout: default
title: Deploy a Soda Agent in a Kubernetes cluster
description: Learn how to deploy a Soda Agent in a Kubernetes cluster.
parent: Get started
redirect_from: 
- /soda-agent/test-deploy.html
- /soda-agent/delete.html
- /soda-agent/overview.html
- /soda-agent/deploy-aws.html
- /soda-agent/deploy-azure.html
- /soda-agent/deploy-google.html
- /soda-agent/helpful-commands.html
- /soda-agent/private-link.html
- /soda-cloud/add-datasource.html
---

# Deploy a Soda Agent
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster, then use Helm to deploy a self-hosted Soda Agent in the cluster.

This setup enables Soda Cloud users to securely connect to data sources (BigQuery, Snowflake, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own no-code checks and agreements to check for data quality in the new data source. Alternatively, if you use a BigQuery, MySQL, PostgreSQL, or Snowflake data source, you can use a secure, out-of-the-box [Soda-hosted agent]({% link soda-agent/managed-agent.md %}) made available for every Soda Cloud organization.

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [self-hosted agent deployment model]({% link soda/setup-guide.md %}#self-hosted-agent).

#### Get started roadmap

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. **Set up Soda: self-hosted agent** 📍 You are here! <br />
&nbsp;&nbsp;&nbsp;&nbsp; a. [Create a Soda Cloud account](#create-a-soda-cloud-account)<br />
&nbsp;&nbsp;&nbsp;&nbsp; b. [Deploy a Soda Agent in a Kubernetes cluster](#deploy-a-soda-agent-in-a-kubernetes-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp; c. [Add a new data source](#add-a-new-data-source)<br />
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate


## Create a Soda Cloud account

{% include agent-api-keys.md %}


## Deploy a Soda Agent in a Kubernetes cluster

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <input class="radio" id="three" name="group" type="radio">
  <input class="radio" id="four" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Kubernetes cluster</label>
  <label class="tab" id="two-tab" for="two">Amazon EKS </label>
  <label class="tab" id="three-tab" for="three">Azure AKS </label>
  <label class="tab" id="four-tab" for="four">Google GKE</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">
These deployment instructions offer generic guidance for deploying a Soda Agent in a Kubernetes cluster. 

[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Deploy an agent](#deploy-an-agent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only](#deploy-using-cli-only)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file)<br />
[About the `helm install` command](#about-the-helm-install-command)<br />
[Decommission the Soda Agent and cluster](#decomission-the-soda-agent-and-cluster)<br />
[Troubleshoot deployment](#troubleshoot-deployment)<br />
<br />


### Deployment overview

{% include agent-deploy-overview.md %}


### Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

### Prerequisites

* You can create, or have access to an existing Kubernetes cluster into which you can deploy a Soda Agent.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 

<!--
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
-->

### Deploy an agent

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only](#deploy-using-cli-only) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Soda Agent extras]({% link soda-agent/secrets.md %}).|

<br />

#### Deploy using CLI only

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish. 
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  <br />
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.name=myuniqueagent \
    --set soda.polling.interval=5 \
    # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
    --set soda.cloud.endpoint=https://cloud.soda.io \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.scanlauncher.idle.enabled=true \
    --set soda.scanlauncher.idle.replicas=1 \
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
4. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/><br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud. 
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```
<br/>

#### Deploy using a values YAML file

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}).
2. Using a code editor, create a new YAML file called `values.yml`.
3. In that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `name` with a custom name for your agent, if you wish.
* Specify the value for `endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  <br />
```yaml
soda:
        apikey:
          id: "***"
          secret: "***"
        agent:
          name: "myuniqueagent"
          pollingIntervall: 5
        scanlauncher:
          idle:
            enabled: true
            replicas: 1
        cloud:
          # Use https://cloud.us.soda.io for US region
          # Use https://cloud.soda.io for EU region
          endpoint: "https://cloud.soda.io"
```
4. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
5. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
minikube kubectl -- describe pods
```
6. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

If you use private key authentication with a Soda Agent, refer to [Soda Agent extras]({% link soda-agent/secrets.md %}#use-a-values-file-to-store-private-key-authentication-values).

<br />

### About the `helm install` command

{% include agent-helm-command.md %}

### Decomission the Soda Agent and cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm uninstall soda-agent -n soda-agent
```
2. Delete the cluster.
```shell
minikube delete
```
```shell
💀  Removed all traces of the "minikube" cluster.
```

### Troubleshoot deployment

{% include agent-troubleshoot.md %}


  </div>
  <div class="panel" id="two-panel" markdown="1">

These deployment instructions offer guidance for setting up an Amazon Elastic Kubernetes Service (EKS) cluster and deploying a Soda Agent in it.


[Deployment overview](#deployment-overview-1)<br />
[Compatibility](#compatibility-1)<br />
[Prerequisites](#prerequisites-1)<br />
[Deploy an agent](#deploy-an-agent-1)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only](#deploy-using-cli-only-1)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file-1)<br />
[(Optional) Connect via AWS PrivateLink](#optional-connect-via-aws-privatelink)<br />
[About the `helm install` command](#about-the-helm-install-command-1)<br />
[Decommission the Soda Agent and the EKS cluster](#decommission-the-soda-agent-and-the-eks-cluster)<br />
[Troubleshoot deployment](#troubleshoot-deployment-1)<br />
<br />



### Deployment overview

{% include agent-deploy-overview.md %}


### Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

### Prerequisites

* You have an AWS account and the necessary permissions to enable you to create, or gain access to an EKS cluster in your region.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 

<!--
## Create an EKS Fargate cluster

The following offers instructions to create a <a href="https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html" target="_blank">Fargate (serverless) cluster</a> to deploy a Soda Agent, but you can create and use a <a href="https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html" target="_blank">regular EKS cluster</a> if you wish.

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}).
2. (Optional) If you wish, you can establish an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to provide private connectivity with Soda Cloud. Refer to Connect to Soda Cloud via AWS PrivateLink before deploying an agent.
2. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to <a href="https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration" target="_blank">Use existing VPC</a>.
3. From the command-line, execute the following command to create a new EKS Fargate cluster in your AWS account.  <br/>Replace the value of `--region` with one that is appropriate for your location. 
```shell
eksctl create cluster --name soda-agent --region eu-central-1 --fargate
```
* If you are not sure which region to use, execute the following command to find your region:
```shell
aws configure get region
```
* The activity to create a cluster may take awhile, printing messages in the console that read `waiting for CloudFormation stack "eksctl-soda-agent-cluster"`. Be patient! Access <a href="https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-stack-stuck-progress/" target="_blank">AWS CloudFormation troubleshooting documentation</a> for help. 
4. To connect to the newly-created cluster and create a namespace, use the following command.
```shell
kubectl create namespace soda-agent
```
5. Create a namespace and a Fargate profile for EKS Fargate serverless deployment. <br />
When you deploy a Soda Agent on EKS Fargate, AWS matches the Fargate Profile using annotation labels in the Soda Agent Helm chart. Without the profile, the Helm chart cannot successfully deploy. <br />
Refer to [Troubleshoot deployment](#troubleshoot-deployment) below if you encounter errors.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region eu-central-1 --namespace soda-agent
```
6. Run the following command to change the context to associate the current namespace to `soda-agent`. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
7. Run the following command to verify that the cluster kubectl recognizes `soda-agent` as the current namespace.
```shell
kubectl config get-contexts
```
```shell
CURRENT   NAME               CLUSTER          AUTHINFO          NAMESPACE
*         testing@soda...    soda-agent.eu..  testing@soda...   soda-agent
```
-->

### Deploy an agent

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only](#deploy-using-cli-only-1) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file-1) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Soda Agent extras]({% link soda-agent/secrets.md %}).|


#### Deploy using CLI only

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}).
2. (Optional) If you wish, you can establish an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to provide private connectivity with Soda Cloud. Refer to [Connect via AWS PrivateLink](#optional-connect-via-aws-privatelink) before deploying an agent.
3. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to <a href="https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration" target="_blank">Use existing VPC</a>.
4. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
5. Use the following command to install the Helm chart which deploys a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. {% include k8-secrets.md %}
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  
* Read more [about the `helm install` command](#about-the-helm-install-command-1).
```shell
helm install soda-agent soda-agent/soda-agent \
    --set provider.aws.eks.fargate.enabled=true \
    --set soda.agent.name=myuniqueagent \
    --set soda.polling.interval=5 \
    # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
    --set soda.cloud.endpoint=https://cloud.soda.io \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.scanlauncher.idle.enabled=true \
    --set soda.scanlauncher.idle.replicas=1 \
    --namespace soda-agent
```
The command-line produces output like the following message:
```shell
NAME: soda-agent
LAST DEPLOYED: Thu Jun 16 10:12:47 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
6. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
7. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br />

#### Deploy using a values YAML file

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}).
2. (Optional) If you wish, you can establish an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to provide private connectivity with Soda Cloud. Refer to [Connect via AWS PrivateLink](#optional-connect-via-aws-privatelink) before deploying an agent.
3. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to <a href="https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration" target="_blank">Use existing VPC</a>.
4. Using a code editor, create a new YAML file called `values.yml`.
5. To that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `name` with a custom name for your agent, if you wish.
* Specify the value for `endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions. 
```yaml
soda:
        apikey:
          id: "***"
          secret: "***"
        agent:
          name: "myuniqueagent"
          pollingIntervall: 5
        scanlauncher:
          idle: 
            enabled: true
            replicas: 1
        cloud:
          # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
          endpoint: "https://cloud.soda.io"
```
6. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
7. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods -n soda-agent
```
8. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step four to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br />

### (Optional) Connect via AWS PrivateLink

If you use AWS services for your infrastructure and you have deployed or will deploy a Soda Agent in an EKS cluster, you can use an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to provide private connectivity with Soda Cloud. <br />

1. Log in to your AWS console and navigate to your **VPC dashboard**.  
2. Follow the AWS documentation to <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html" target="_blank">Connect to an endpoint service as the service customer</a>. <br />For security reasons, Soda does not publish its **Service name**. Email <a href="mailto:support@soda.io">support@soda.io</a> with your **AWS account ID** to request the PrivateLink service name. Refer to <a href="https://docs.aws.amazon.com/signin/latest/userguide/console_account-alias.html" target="_blank"> AWS documentation</a> for instructions on how to obtain your account ID.
3. After creating the endpoint, return to the **VPC dashboard**. When the status of the endpoint becomes **Available**, the PrivateLink is ready to use. Be aware that this make take more than 10 minutes.
4. Deploy a Soda Agent to your AWS EKS cluster, or, if you have already deployed one, restart your Soda Agent to begin sending data to Soda Cloud via the PrivateLink.
```shell
kubectl -n soda-agent rollout restart deploy
```
5. After you have started the agent and validated that it is running, log into your Soda Cloud account, then navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```


### About the `helm install` command

{% include agent-helm-command.md %}


### Decommission the Soda Agent and the EKS cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm uninstall soda-agent -n soda-agent
```
2. Remove the Fargate profile.
```shell
eksctl delete fargateprofile --cluster soda-agent --name soda-agent-profile
```
3. Wait for the Fargate profile deletion to complete, then delete the EKS cluster itself.
```shell
eksctl delete cluster --name soda-agent
```
4. (Optional) Access your <a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home" target="_blank"> CloudFormation console</a>, then click **Stacks** to view the status of your decommissioned cluster. <br /> If you do not see your Stack, use the region drop-down menu at upper-right to select the region in which you created the cluster.


### Troubleshoot deployment

{% include agent-troubleshoot.md %}

<br />

**Problem:** `UnauthorizedOperation: You are not authorized to perform this operation.`

**Solution:** This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the appropriate permissions.

<br />

**Problem:** `ResourceNotFoundException: No cluster found for name: soda-agent.` 

**Solution:**  If you get an error like this when you attempt to create a Fargate profile, it may be a question of region. 
1. Access your <a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home" target="_blank">AWS CloudFormation console</a>, then click **Stacks** to find the eksctl-soda-agent-cluster that you created. If you do not see the stack, adjust the region of your CloudFormation console (top nav bar, next to your username).
2. Try running the command: `aws eks list-clusters`. It likely returns the following.
```
{
    "clusters": []
}
```
2. Try running the command: `aws cloudformation list-stacks --region eu-central-1` replacing the value of `--region` with the value you used for `region` when you created the EKS Fargate cluster. 
3. If that command returns information about the cluster you just created, add the `--region` option to the command to create a Fargate profile.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region eu-central-1 --namespace soda-agent
```

  </div>
  <div class="panel" id="three-panel" markdown="1">

These deployment instructions offer guidance for setting up an Azure Kubernetes Service (AKS) cluster and deploying a Soda Agent in it.

[Deployment overview](#deployment-overview-2)<br />
[Compatibility](#compatibility-2)<br />
[Prerequisites](#prerequisites-2)<br />
[Deploy an agent](#deploy-an-agent-2)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - regular cluster](#deploy-using-cli-only---regular-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file-2)<br />
[About the `helm install` command](#about-the-helm-install-command-2)<br />
[Decommission the Soda Agent and the AKS cluster](#decommission-the-soda-agent-and-the-aks-cluster)<br />
[Troubleshoot deployment](#troubleshoot-deployment-2)<br />
<br />


### Deployment overview

{% include agent-deploy-overview.md %}


### Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

### Prerequisites

* You have an Azure account and the necessary permissions to enable you to create, or gain access to an existing AKS cluster in your region. Consult the <a href="https://learn.microsoft.com/en-us/azure/role-based-access-control/overview" target="_blank">Azure access control documentation</a> for details.
* You have installed the <a href="https://learn.microsoft.com/en-us/cli/azure/install-azure-cli" target="_blank">Azure CLI tool</a>. This is the command-line tool you need to access your Azure account from the command-line. Run `az --version` to check the version of an existing install. Consult the <a href="https://learn.microsoft.com/en-us/cli/azure/" target="_blank"> Azure Command-Line Interface documentation</a> for details.
* You have logged in to your Azure account. Run `az login` to open a browser and log in to your account.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have already installed the Azure CLI tool, you can install kubectl using the following command: `az aks install-cli`. <br /> 
Run `kubectl version --output=yaml` to check the version of an existing install. 
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 

<!--
## Create an AKS cluster


The following procedures use Azure CLI to create a resource group and cluster. Alternatively, you tackle the same tasks using <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-powershell" target="_blank">PowerShell</a> or the <a href="https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli" target="_blank">Azure portal</a>, if you prefer.

There are two ways to create a cluster:
* [create a regular AKS cluster](#create-a-regular-cluster)<br />
OR
* [create a virtual nodes-based cluster](#create-a-virtual-cluster) which permits Azure to automatically schedule pods as Azure Container Instances (ACIs) in the background; <a href="https://learn.microsoft.com/en-us/azure/aks/virtual-nodes-cli" target="_blank">read more</a>


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

Use Azure's ACI (Azure Container Instances) to create Kubernetes pods for a serverless approach. The virtual nodes make use of a virtual network allowing the pods in the cluster to communicate. Only AKS clusters configured with advanced networking can use virtual nodes. <a href="https://learn.microsoft.com/en-us/azure/aks/virtual-nodes-cli" target="_blank">Read more</a>.

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
6. Use the following command to create a virtual network. You will use this network and a subnet (see next steps) to set up virtual nodes.
```shell
az network vnet create \
  --resource-group SodaAgent \
  --name SodaAgentVnet \
  --address-prefixes 10.100.0.0/16 \
  --subnet-name SodaAgentSubnet \
  --subnet-prefix 10.100.100.0/24
```
7. Note the ID of the subnet which you just created, or use the following command to find it and store it in a variable. When you wish to [decommission the agent and its cluster](#decommission-a-soda-agent-and-the-aks-cluster), you need the subnet and vnet IDs.
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
9. Use the following command to create the cluster. Note that the node count is set to `1`, which represents the number of nodes the control plane parts of the AKS cluster use, meaning the cluster is not entirely serverless.  For production deployments, best practice dictates that you use two or three nodes.<br />
Be patient as the command can take several minutes to complete.
```shell
az aks create \
  --resource-group SodaAgent \
  --name SodaAgentCluster \
  --node-count 1 \
  --network-plugin azure \
  --vnet-subnet-id $subnetid
``` 
10. Use the following command to list the enabled add-ons for the cluster.
```shell
az aks addon list --resource-group SodaAgent --name SodaAgentCluster
```
11. Activate the virtual nodes add-on.
```shell
az aks enable-addons \
    --resource-group SodaAgent \
    --name SodaAgentCluster \
    --addons virtual-node \
    --subnet-name SodaAgentVirtualNodeSubnet
```
12. Add the cluster credentials to your kubectl configuration so you can run kubectl and helm commands against this cluster.
```shell
az aks get-credentials \
  --resource-group SodaAgent \
  --name SodaAgentCluster
```
13. Your default kubectl configuration now points to the newly-added cluster context. Run the following command to check the nodes in the cluster.
```shell
kubectl get nodes
```
```shell
NAME                                STATUS   ROLES   AGE   VERSION
aks-nodepool1-15273607-vmss000000   Ready    agent   40m   v1.23.12
```
14. Create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
15. Run the following command to change the context to associate the current namespace to `soda-agent`. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
16. Run the following command to verify that the cluster kubectl recognizes `soda-agent` as the current namespace.
```shell
kubectl config get-contexts
```
Output:
```shell
CURRENT   NAME                CLUSTER              AUTHINFO                                 NAMESPACE
*         SodaAgentCluster    SodaAgentCluster     clusterUser_SodaAgent_SodaAgentCluster   soda-agent
```
-->

### Deploy an agent

The following table outlines the ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only - regular cluster](#deploy-using-cli-only---regular-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster. | 
| [CLI only - virtual cluster](#deploy-using-cli-only---virtual-cluster) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a virtual cluster. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file-2) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file  or in an external secrets manager<br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Soda Agent extras]({% link soda-agent/secrets.md %}).|


#### Deploy using CLI only - regular cluster

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Use the following command to install the Helm chart which deploys a Soda Agent in your cluster. (Learn more about the [`helm install` command](#about-the-helm-install-command-2).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. {% include k8-secrets.md %}
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add the `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions. <br />
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.name=myuniqueagent \
    --set soda.polling.interval=5 \
    # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
    --set soda.cloud.endpoint=https://cloud.soda.io \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.scanlauncher.idle.enabled=true \
    --set soda.scanlauncher.idle.replicas=1 \
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
5. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br /> 

#### Deploy using CLI only - virtual cluster

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
```shell
namespace/soda-agent created
```
4. Use the following command to install the Helm chart which deploys a Soda Agent in your cluster. (Learn more about the [`helm install` command](#about-the-helm-install-command-2).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. {% include k8-secrets.md %}
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions. 
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.target=azure-aks-virtualnodes \ 
    --set soda.agent.name=myuniqueagent \
    --set soda.polling.interval=5 \
    # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
    --set soda.cloud.endpoint=https://cloud.soda.io \
    --set soda.apikey.id=*** \
    --set soda.apikey.secret=**** \
    --set soda.scanlauncher.idle.enabled=true \
    --set soda.scanlauncher.idle.replicas=1 \
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
5. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl get pods -n soda-agent
```
```shell
NAME                                     READY   STATUS    RESTARTS   AGE
soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
```
6. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br /> 

#### Deploy using a values YAML file

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Using a code editor, create a new YAML file called `values.yml`.
4. To that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `name` with a custom name for your agent, if you wish.
* Specify the value for `endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  
```yaml
soda:
        apikey:
          id: "***"
          secret: "***"
        agent:
          name: "myuniqueagent"
          pollingIntervall: 5
        scanlauncher:
          idle:
            enabled: true
            replicas: 1
        cloud:
          # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
          endpoint: "https://cloud.soda.io"
```
5. Save the file. Then, create a namespace for the agent.
```shell
kubectl create ns soda-agent
```
```shell
namespace/soda-agent created
```
6. In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
7. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods -n soda-agent
```
8. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br /> 

## About the `helm install` command

{% include agent-helm-command.md %}


## Decommission the Soda Agent and the AKS cluster

1. Delete everything in the namespace which you created for the Soda Agent.
```shell
kubectl delete ns soda-agent
```
2. Delete the cluster. Be patient; this task may take some time to complete.
```shell
az aks delete --resource-group SodaAgent --name soda-agent-cli-test --yes
```
3. If you created an additional subnet for virtual nodes, delete the subnet. The `subnet` and `vnet` values must match the names you used during deployment.
```shell
az network vnet subnet delete \
  --resource-group SodaAgent \
  --name SodaAgentVirtualNodeSubnet \
  --vnet-name SodaAgentVnet
```

<br />

## Troubleshoot deployment 

{% include agent-troubleshoot.md %}

<br />

**Problem:** When you attempt to create a cluster, you get an error that reads, `An RSA key file or key value must be supplied to SSH Key Value. You can use --generate-ssh-keys to let CLI generate one for you`. 

**Solution:** Run the same command to create a cluster but include an extra line at the end to generate RSA keys.
```shell
az aks create \
>   --resource-group SodaAgent \
>   --name SodaAgentCluster \
>   --node-count 1 \
>   --generate-ssh-keys
```

  </div>
  <div class="panel" id="four-panel" markdown="1">

These deployment instructions offer guidance for setting up a Google Kubernetes Engine (GKE) cluster and deploying a Soda Agent in it. 

[Deployment overview](#deployment-overview-3)<br />
[Compatibility](#compatibility-3)<br />
[Prerequisites](#prerequisites-3)<br />
[Deploy an agent](#deploy-an-agent-3)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only](#deploy-using-cli-only-2)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file-3)<br />
[About the `helm install` command](#about-the-helm-install-command-3)<br />
[Decommission the Soda Agent and cluster](#decommission-the-soda-agent-and-cluster)<br />
[Troubleshoot deployment](#troubleshoot-deployment-3)<br />
<br />


### Deployment overview

{% include agent-deploy-overview.md %}


### Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

{% include compatible-cloud-datasources.md %}

### Prerequisites

* You have a Google Cloud Platform (GCP) account and the necessary permissions to enable you to create, or gain access to an existing Google Kubernetes Engine (GKE) cluster in Autopilot mode in your region.
* You have installed the <a href="https://cloud.google.com/sdk/docs/install" target="_blank"> gcloud CLI tool</a>. Use the command `glcoud version` to verify the version of an existing install. 
  * If you have already installed the gcloud CLI, use the following commands to login and verify your configuration settings, respectively: `gcloud auth login` `gcloud config list`
  * If you are installing the gcloud CLI for the first time, be sure to complete <a href="https://cloud.google.com/sdk/docs/install" target="_blank"> all the steps</a> in the installation to properly install and configure the setup.
  * Consider using the following command to learn a few basic glcoud commands: `gcloud cheat-sheet`.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 

<!--
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
-->

### Deploy an Agent

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only](#deploy-using-cli-only-3) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file-3) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Soda Agent extras]({% link soda-agent/secrets.md %}).|


#### Deploy using CLI only

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Use the following command to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command-3).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  <br />
```shell
helm install soda-agent soda-agent/soda-agent \
>   --set soda.agent.name=myuniqueagent \
    --set soda.polling.interval=5 \
    # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
>   --set soda.cloud.endpoint=https://cloud.soda.io \
>   --set soda.apikey.id=*** \
>   --set soda.apikey.secret=*** \
>   --set soda.scanlauncher.idle.enabled=true \
>   --set soda.scanlauncher.idle.replicas=1 \ 
>   --namespace soda-agent 
```
The command-line produces output like the following message:
```shell
NAME: soda-agent
LAST DEPLOYED: Wed Dec 14 11:45:13 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
4. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
5. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/><br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step three to check the status of the deployment. When `Status: Running`, then you can refresh and see the agent in Soda Cloud.
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br />

#### Deploy using a values YAML file

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Using a code editor, create a new YAML file called `values.yml`.
3. In that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. {% include k8-secrets.md %}
* Replace the value of `name` with a custom name for your agent, if you wish.
* Specify the value for `endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  <br />
```yaml
soda:
        apikey:
          id: "***"
          secret: "***"
        agent:
          name: "myuniqueagent"
          pollingIntervall: 5
        scanlauncher:
          idle:
            enabled: true
            replicas: 1
        cloud:
          # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
          endpoint: "https://cloud.soda.io"
```
4. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
5. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
6. In your Soda Cloud account, navigate to **your avatar** > **Data Sources** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
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

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.
```shell
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

<br /> 

## About the `helm install` command

{% include agent-helm-command.md %}

## Decommission the Soda Agent and cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm uninstall soda-agent -n soda-agent
```
2. Delete the cluster.
```shell
gcloud container clusters delete soda-agent-gke
```

Refer to <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster" target="_blank">Google Kubernetes Engine documentation</a> for details.

## Troubleshoot deployment

{% include agent-troubleshoot.md %}

  </div>

  </div>
</div>


## Add a new data source

In your Soda Cloud account, navigate to **your avatar** > **Data Sources**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps. 

#### 1. Attributes

| Field or Label | Guidance |
| -----------------------   | ---------- |
| Data Source Label | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.|
| Default Scan Schedule Label | Provide a name for the default scan schedule for this data sources. The scan schedule indicates which Soda Agent to use to execute the scan, and when.  |
| Default Scan Schedule Agent | Select the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Schedule Definition | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression. |
| Starting At | Select the time of day to run the scan. The default value is midnight. |
| Time Zone | Select a timezone. The default value is UTC. |
| Cron Expression | (Optional) Write your own <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a> to define the schedule Soda Cloud uses to run scans. |

<br />

#### 2. Connect the Data Source

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials. 

To more securely provide sensitive values such as usernames and passwords, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials]({% link soda-agent/secrets.md %}#use-environment-variables-to-store-data-source-connection-credentials) for details.

Access the data source-specific connection configurations listed below to copy+paste the connection syntax into the editing panel, then adjust the values to correspond with your data source's details. Access connection configuration details in [Data source reference]({% link soda/connect-athena.md %}) section of Soda documentation.

See also: [Use a file reference for a BigQuery data source connection](#use-a-file-reference-for-a-bigquery-data-source-connection)
 
<br />

#### 3. Discover Datasets

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset names and the columns each contains.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character. See [Add dataset discovery]({% link soda-cl/profile.md %}l#add-dataset-discovery) for more detail on profiling syntax.

*Known issue:* SodaCL does not support using variables in column profiling and dataset discovery configurations. <!--SAS-1642-->

{% include code-header.html %}
```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

<br />

#### 4. Profile datasets

To gather more detailed profile information about datasets in your data source, you can configure Soda Cloud to profile the columns in datasets. 

Column profile information includes details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`.  The `%` is a wildcard character. See [Add column profiling]({% link soda-cl/profile.md %}#add-column-profiling) for more detail on profiling syntax.

Column profiling can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations]({% link soda-cl/profile.md %}#compute-consumption-and-cost-considerations) for more detail.
{% include code-header.html %}
```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

<br />

#### 5. Check Datasets

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly score]({% link soda-cl/anomaly-score.md %}) and [schema]({% link soda-cl/schema.md %}) checks, respectively.

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source *except* those with names that begin with `test_`.  The `%` is a wildcard character.
{% include code-header.html %}
```yaml
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

#### 6. Assign Owner

| Field or Label | Guidance | 
|----------------|----------|
| Data Source Owner | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Schedule. |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Roles and Rights in Soda Cloud]({% link soda-cloud/roles-and-rights.md %}) to learn how to adjust the Dataset Owner of individual datasets.|

<br />

### Use a file reference for a BigQuery data source connection

If you already store information about your data source in a JSON file in a secure location, you can configure your BigQuery data source connection details in Soda Cloud to refer to the JSON file for service account information. To do so, you must add two elements:
* `volumes` and `volumeMounts` parameters in the `values.yml` file that your Soda Agent helm chart uses
* the `account_info_json_path` in your data source connection configuration 

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deployment and redployment in your Kubernetes cluster. Refer to Google GKE instruction above.
{% include code-header.html %}
```yaml
soda:
  scanlauncher:
    volumeMounts:
      - name: gcloud-credentials
        mountPath: /opt/soda/etc
    volumes:
      - name: gcloud-credentials
        secret:
          secretName: gcloud-credentials
          items:
            - key: serviceaccount.json
              path: serviceaccount.json
```

Use the following command to add the service account information to a Kubernetes secret that the Soda Agent consumes according to the configuration above.
```shell
kubectl create secret -n <soda-agent-namespace> gcloud-credentials --from-file=serviceaccount.json=<local path to the serviceccount.json>
```

After you make both of these changes, you must redeploy the Soda Agent.   

Adjust the data source connection configuration to include the `account_info_json_path` configuration, as per the following example.
{% include code-header.html %} 
```yaml
my_datasource_name:
  type: bigquery
  account_info_json_path: /opt/soda/etc/serviceaccount.json
  auth_scopes:
  - https://www.googleapis.com/auth/bigquery
  - https://www.googleapis.com/auth/cloud-platform
  - https://www.googleapis.com/auth/drive
  project_id: ***
  dataset: sodacore
```



## Next

1. <s><font color="#777777"> Choose a flavor of Soda </font></s>
2. <s><font color="#777777">Set up Soda: self-hosted agent</font></s> 
3. **[Write SodaCL checks]({% link soda-cl/soda-cl-overview.md %})**
4. Run scans and review results
5. Organize, alert, investigate

Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
