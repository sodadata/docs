---
layout: default
title: Deploy a Soda Agent in EKS
description: Deploy a Soda Agent in an Amazon Elastic Kubernetes Service cluster.
parent: Soda Agent
---

# Deploy a Soda Agent in Amazon EKS
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create an **Amazon Elastic Kubernetes Service (EKS)** cluster, then use Helm to deploy a Soda Agent in the cluster. 

This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 

[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys) <br />
[Create an EKS Fargate cluster](#create-an-eks-fargate-cluster) <br />
[Deploy a Soda Agent](#deploy-a-soda-agent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using CLI only](#deploy-using-cli-only)<br />
&nbsp;&nbsp;&nbsp;&nbsp;[Deploy using a values YAML file](#deploy-using-a-values-yaml-file)<br />
[(Optional) Create a practice data source](#optional-create-a-practice-data-source)<br />
[About the `helm install` command](#about-the-helm-install-command)<br />
[Decommission the Soda Agent and the EKS cluster](#decommission-the-soda-agent-and-the-eks-cluster)<br />
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
* You have an AWS account and the necessary permissions to enable you to create an EKS cluster in your region.
* You have installed <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a>. This is the command-line tool you need to access your AWS account from the command-line. Run `aws --version` to check the version of an existing install.
* You have installed <a href="https://eksctl.io/introduction/#installation" target="_blank">eksctl</a>. This is the command-line tool for Amazon EKS that you use to create and manage Kubernetes clusters on EKS. Run `eksctl version` to check the version of an existing install.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}


## Create an EKS Fargate cluster

The following offers instructions to create a <a href="https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html" target="_blank">Fargate (serverless) cluster</a> to deploy a Soda Agent, but you can create and use a <a href="https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html" target="_blank">regular EKS cluster</a> if you wish.

1. If you are deploying to an exiting Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to <a href="https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration" target="_blank">Use existing VPC</a>.
2. From the command-line, execute the following command to create a new EKS Fargate cluster in your AWS account.  <br/>Replace the value of `--region` with one that is appropriate for your location. 
```shell
eksctl create cluster --name soda-agent --region eu-central-1 --fargate
```
* If you are not sure which region to use, execute the following command to find your region:
```shell
aws configure get region
```
* The activity to create a cluster may take awhile, printing messages in the console that read `waiting for CloudFormation stack "eksctl-soda-agent-cluster"`. Be patient! Access <a href="https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-stack-stuck-progress/" target="_blank">AWS CloudFormation troubleshooting documentation</a> for help. 
3. To connect to the newly-created cluster and create a namespace, use the following command.
```shell
kubectl create namespace soda-agent
```
4. Create a namespace and a Fargate profile for EKS Fargate serverless deployment in the namespace you just created. <br />
When you deploy a Soda Agent on EKS Fargate, AWS matches the Fargate Profile using annotation labels in the Soda Agent Helm chart. Without the profile, the Helm chart cannot successfully deploy. <br />
Refer to [Troubleshoot deployment](#troubleshoot-deployment) below if you encounter errors.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region us-west-1 --namespace soda-agent
```
5. Run the following command to change the context to associate the current namespace to `soda-agent`. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
6. Run the following command to verify that the cluster kubectl regcognizes `soda-agent` as the current namespace.
```shell
kubectl config get-contexts
```
```shell
CURRENT   NAME               CLUSTER          AUTHINFO          NAMESPACE
*         testing@soda...    soda-agent.eu..  testing@soda...   soda-agent
```

## Deploy a Soda Agent

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method | Description | When to use |
|--------|-------------|-------------|
| [CLI only](#deploy-using-cli-only) | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster. | 
| [Use a values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: [Manage sensitive values]({% link soda-agent/secrets.md %}).|


### Deploy using CLI only

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following command to install the Helm chart which deploys a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Optionally, add the `soda.core` settings to configure idle workers in the cluster. Launch an idle worker so at scan time, the agent can hand over instructions to an already running idle Scan Launcher to avoid the start-from-scratch setup time for a pod. This helps your test scans from Soda Cloud run faster. You can have multiple idle scan launchers waiting for instructions.
* Read more [about the `helm install` command](#about-the-helm-install-command).
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.target=aws-eks \
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
LAST DEPLOYED: Thu Jun 16 10:12:47 2022
NAMESPACE: soda-agent
STATUS: deployed
REVISION: 1
```
3. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
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
5. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.

### Deploy using a values YAML file

1. Using a code editor, create a new YAML file called `values.yml`.
2. To that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. 
* Replace the value of `name` with a custom name for you agent, if you wish.
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
3. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
4. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl -- describe pods
```
5. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
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
6. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed. If you wish, you can [create a practice data source](#optional-create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


## (Optional) Create a practice data source

{% include agent-practice-datasource.md %}


## About the `helm install` command

{% include agent-helm-command.md %}


## Decommission the Soda Agent and the EKS cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm delete soda-agent -n soda-agent
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


## Troubleshoot deployment

Refer to [Helpful kubectl commands]({% link soda-agent/helpful-commands.md %}) for instructions on accessing logs, etc.

<br />

{% include agent-troubleshoot.md %}

<br />

**Problem:** `UnauthorizedOperation: You are not authorized to perform this operation.`

**Solution:** This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the appropriate permissions.

<br />

**Problem:** `ResourceNotFoundException: No cluster found for name: soda-agent.` 

**Solution:**  If you get an error like this when you attempt to create a Fargate profile, it may be a question of region. 
1. Access your <a href="https://us-west-1.console.aws.amazon.com/cloudformation/home" target="_blank">AWS CloudFormation console</a>, then click **Stacks** to find the eksctl-soda-agent-cluster that you created. If you do not see the stack, adjust the region of your CloudFormation console (top nav bar, next to your username).
2. Try running the command: `aws eks list-clusters`. It likely returns the following.
```
{
    "clusters": []
}
```
2. Try running the command: `aws cloudformation list-stacks --region us-west-1` replacing the value of `--region` with the value you used for `region` when you created the EKS Fargate cluster. 
3. If that command returns information about the cluster you just created, add the `--region` option to the command to create a Fargate profile.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region us-west-1 --namespace soda-agent
```



## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Access a list of [helpful `kubectl` commands]({% link soda-agent/helpful-commands.md %}) for running commands on your Kubernetes cluster.
* [Learn more]({% link soda-agent/secrets.md %}) about securely storing and accessing API keys and data source login credentials.
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