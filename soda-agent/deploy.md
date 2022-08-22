---
layout: default
title: Deploy a Soda Agent
description: 
parent: Soda Agent
---

# Deploy a Soda Agent ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

{% include soda-agent.md %}

Create an Amazon Elastic Kubernetes Service (EKS) Fargate cluster, then use Helm to deploy the Soda Agent in the cluster. This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. [Read more]({% link soda-agent/basics.md %})

[Deployment overview](#deployment-overview)<br />
[Compatibility](#compatibility)<br />
[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys) <br />
[Create an EKS Fargate cluster](#create-an-eks-fargate-cluster) <br />
[Deploy an agent to the cluster](#deploy-an-agent-to-the-cluster) <br />
&nbsp;&nbsp;&nbsp;&nbsp; [About the `helm install` command](#about-the-helm-install-command) <br />
&nbsp;&nbsp;&nbsp;&nbsp; [Troubleshoot deployment](#troubleshoot-deployment)<br />
&nbsp;&nbsp;&nbsp;&nbsp; [Deploy using a values YAML file](#deploy-using-a-values-yaml-file) <br />
[Use environment variables for data source connection credentials](#use-environment-variables-for-data-source-connection-credentials) <br />
[Redeploy an agent](#redeploy-an-agent)<br />
[Review Soda Agent logs](#review-soda-agent-logs) <br />
<br />


## Deployment overview

1. (Optional) Familiarize yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
2. Install, or confirm the installation of, a few required command-line tools.
3. Sign up for a Soda Cloud account and create new API keys.
4. Use the command-line to create an EKS Fargate cluster.
5. Deploy the Soda Agent in the new cluster.  


## Compatibility

You can deploy a Soda Agent to connect with the following data sources:

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br />  Apache Spark DataFrames<sup>1</sup><br /> GCP Big Query</td>
    <td>IBM DB2<br /> MS SQL Server <br /> PostgreSQL<br /> Snowflake</td>
  </tr>
</table>
<sup>1</sup> For use with [programmatic Soda scans]({% link soda-core/programmatic.md %}), only.

## Prerequisites

* (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 
* You have an AWS account and the necessary permissions to enable you to create an EKS Fargate cluster in your region.
* You have installed <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a>. This is the command-line tool you need to access your AWS account from the command-line. Run `aws --version` to check the version of an existing install.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 
* You have installed <a href="https://eksctl.io/introduction/#installation" target="_blank">eksctl</a>. This is the command-line tool for Amazon EKS that you use to create and manage Kubernetes clusters on EKS. Run `eksctl version` to check the version of an existing install.


## Create a Soda Cloud account and API keys

The Soda Agent communicates with your Soda Cloud account using API public and private keys. Note that the keys a Soda Agent uses are different from the API keys Soda Cloud uses to connect to Soda Core. 

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > the **Agents** tab, then click the **New Soda Agent**.
3. The dialog box that appears offers abridged instructions to set up a new Soda Agent from the command-line; more thorough instructions exist in this documentation, below. <br /><br />
For now, copy and paste the values for both the **soda.apikey.id** and **soda.apikey.secret** to a temporary, secure place in your local environment. You will need these values in the next section when you deploy the agent in your Kubernetes cluster.<br />
![deploy-agent](/assets/images/deploy-agent.png){:height="700px" width="700px"}
4. You can keep the dialog box open in Soda Cloud, or close it.


## Create an EKS Fargate cluster

1. From the command-line, execute the following command to create a new EKS Fargate cluster in your AWS account.  <br/>Replace the value of `--region` with one that is appropriate for your location. 
```shell
eksctl create cluster --name soda-agent --region eu-central-1 --fargate
```
* If you are not sure which region to use, execute the following command to find your region:
```shell
aws configure get region
```
* The activity to create a cluster may take awhile, printing messages in the console that read `waiting for CloudFormation stack "eksctl-soda-agent-cluster"`. Be patient! Access <a href="https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-stack-stuck-progress/" target="_blank">AWS troubleshooting documentation</a> for help. 
2. To connect to the newly created cluster and create a namespace, use the following command.
```shell
kubectl create namespace soda-agent
```
3. Create a namespace and a Fargate profile for EKS Fargate serverless deployment in the namespace you just created. <br />
When you deploy a Soda Agent on EKS Fargate, AWS matches the Fargate Profile using annotation labels in the Soda Agent Helm chart. Without the profile, the Helm chart cannot successfully deploy. <br />
Refer to [Troubleshoot deployment](#troubleshoot-deployment) below if you encounter errors.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region us-west-1 --namespace soda-agent
```
4. Run the following command to verify which cluster kubectl recognizes as the current one. 
```shell
kubectl config get-contexts
```
The namespace associated with `CURRENT` must be `soda-agent`. If it is not, use the following command to change contexts. 
```shell
kubectl config set-context --current --namespace=soda-agent
```
```shell
CURRENT   NAME               CLUSTER          AUTHINFO          NAMESPACE
*         testing@soda...    soda-agent.eu..  testing@soda...   soda-agent
```

## Deploy an agent to the cluster

1. Use Helm to add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following command to install the Helm chart which deploys a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.<br /> Alternatively, you can install the agent using a values.yml file to store all the `--set` values in a local file. See [Deploy using values YAML file](#deploy-using-values-yaml-file).
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
* Read more [about the `helm install` command](#about-the-helm-install-command).
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=aws-eks \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
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
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> 
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
5. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.

### About the `helm install` command

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
| `--set soda.agent.target` | Use `default`, or `aws-eks`. If the latter, there are additional attributes you must set. |
| `--set soda.agent.name`   | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud organization. |
| `--set soda.apikey.id`    | With the apikey.secret, this connects the Soda Agent to your Soda Cloud organization. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the EKS cluster instead of exposing it here.|
| `--set soda.apikey.secret`    | With the apikey.id, this connects the Soda Agent to your Soda Cloud organization. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the EKS cluster instead of exposing it here.|
| `--namespace soda-agent` | Use the namespace value to identify the namespace in which to deploy the agent. 



### Troubleshoot deployment

**Error:** `UnauthorizedOperation: You are not authorized to perform this operation.`

This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the appropriate permissions.


**Error:** `ResourceNotFoundException: No cluster found for name: soda-agent.` 

If you get an error like this when you attempt to create a Fargate profile, it may be a question of region. 
1. Access your <a href="https://us-west-1.console.aws.amazon.com/cloudformation/home" target="_blank">AWS CloudFormation console</a>, then click **Stacks* to find the eksctl-soda-agent-cluster that you created in step 1. If you do not see the stack, adjust the region of your CloudFormation console (top nav bar, next to your username).
2. Try running the command: `aws eks list-clusters`. It likely returns the following.
```
{
    "clusters": []
}
```
2. Try running the command: `aws cloudformation list-stacks --region us-west-1` replacing the value of `--region` with the value you used in step 1 when you created the EKS Fargate cluster. 
3. If that command returns information about the cluster you just created, add the `--region` option to the command to create a Fargate profile.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region us-west-1 --namespace soda-agent
```


### Deploy using a values YAML file

The instructions to [Deploy a Soda Agent](#deploy-a-soda-agent) above use options with the `helm install` command to provide information that Helm needs to properly deploy the Soda Agent. However, you may wish to use a `values.yml` file to provide these details instead, for two reasons:
* You may wish to keep the sensitive API key values in this local file.
* You can also store the [data source login credentials](#use-environment-variables-for-data-source-connection-credentials) you need to provide when connecting to a data source in Soda Cloud as environment variables in this local file.

Therefore, instead of running the command in [step 2](#deploy-an-agent-to-the-cluster) above, take a couple extra steps and use a modified `helm install` command.
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
 3. Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
 ```shell
 helm install soda-agent soda-agent/soda-agent \
   --values values.yml \
   --namespace soda-agent
 ```
 4. Return to the procedure above and continue with step 3.


## Use environment variables for data source connection credentials

When you, or someone in your organization, follows the guided steps to [create a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud, one of the steps involves providing the connection details and credentials Soda needs to connect to the data source to run scans. You can add those details directly in Soda Cloud, but because any user can then access these values, you may wish to store them securely in the values YAML file as environment variables. 

1. In [step 2]({% link soda-cloud/add-datasource.md %}#2-connect-the-data-source) of the create a data source guided steps, add data source connection configuration which look something like the following example for a PostgreSQL data source. Note the environment variable values for username and password.
```yaml
data_source local_postgres_test:
    type: postgres
    connection:
        host: 172.17.0.7
        port: 5432
        username: ${ POSTGRES_USER }
        password: ${ POSTGRES_PASS }
        database: postgres
    schema: new_york
```
2. Create or edit your local values YAML file to include the values for the environment variables you input into the connection configuration. Reference the [section above](#deploy-using-a-values-yaml-file) for details.
```yaml
soda:
    apikey:
      id: "your-agent-api-key-id"
      secret: "your-agent-api-key-secret"
    agent:
      loglevel: "DEBUG"
      name: "your-unique-agent-name"
    env:
      POSTGRES_USER: "sodacore"
      POSTGRES_PASS: "sodacore"
```
3. After adding the environment variables to the values YAML file, update the Soda Agent using the following command:
```shell
helm upgrade soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```


## Redeploy an agent

When you delete the Soda Agent Helm chart from your cluster, you also delete all the agent resources on your cluster. However, if you wish to redeploy the previously-registered agent (use the same name), you need to specify the agent ID in your override values in your values YAML file.

1. In Soda Cloud, navigate to **your avatar** > **Scans & Data** > **Agents** tab.
2. Click to select the agent you wish to redeploy, then copy the agent ID of the previously-registered agent from the URL.<br />
For example, in the following URL, the agent ID is the long UUID at the end. `https://dev.sodadata.io/agents/842feab3-snip-87eb-06d2813a72c1`.
3. Open your `values.yml` file, then add the `id` key:value pair under `agent`, using the agent ID you copied from the URL as the value.
```yaml
soda:
  apikey:
        id: "<uuid>"
        secret: "<secret>"
  agent:
        id: "842feab3-snip-87eb-06d2813a72c1"
        loglevel: "INFO"
        name: "<YourAgentName>"
```


## Review Soda Agent logs

To troubleshoot any issues you might encounter with a Soda Agent running on an EKS cluster, you can access some logs directly.

To get a list of pods running in the Soda Agent's namespace, use the following command.
```shell
kubectl get pods --namespace soda-agent
```

Example output:
```shell
soda-agent-orchestrator-5975ddcd9-5b5qr                         2/2     Running     0          4h6m
```

<br />

To get and tail the logs from the Soda Agent Orchestrator's pod, use the following command.
```shell
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  --namespace soda-agent -f
```

<br />

To retrieve the name of the Orchestrator issuing the command, use the following.
```shell
kubectl get pods --no-headers -o custom-columns=":metadata.name" \
  -l agent.soda.io/component=orchestrator --namespace soda-agent
```

<br />

In the example above, the output displays `2/2` which means that two containers are running in the pod. This indicates that a <a href="https://medium.com/bb-tutorials-and-thoughts/kubernetes-learn-sidecar-container-pattern-6d8c21f873d" target="_blank">sidecar</a> is deployed in the pod, which is the fluent-bit based log reader/forwarder. 

If you wish to get the logs from the sidecar, you can add the `-c` option to the `logs` command to specify the sidecar container in the pod.
```shell
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  -c logging-sidecar \
  -n soda-agent -f
```



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