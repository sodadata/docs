---
layout: default
title: Deploy a Soda Agent
description: 
parent: Soda Agent
---

# Deploy a Soda Agent![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

The **Soda Agent** is a tool that empowers Soda Cloud users to securely connect to new data sources. 

The agent obviates the need to install Soda Core independently to set up configuration YAML files to connect to data sources. Instead, it enables Soda Cloud users to serve themselves when it comes to connecting to new data sources in an organization. 

Create an Amazon Elastic Kubernetes Service (EKS) Fargate cluster, then use Helm to deploy the Soda Agent in the cluster. This setup enables Soda Cloud users to securely connect to data sources (Snowflake, Amazon Athena, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own agreements to check for data quality in the new data source. 


## Deployment overview

1. (Optional) Familiarize yourself with basic Soda, Kubernetes, and Helm concepts. 
2. Install, or confirm the installation of, a few required command-line tools.
3. Use the command-line to create an EKS Fargate cluster.
4. Sign up for a Soda Cloud account and create new API keys.
5. Deploy the Soda Agent in the new cluster.  

## Basic concepts

What follows is an extremely abridged introduction to a few basic elements involved in the deployment and setup of a Soda Agent.

**Soda Core** is an open-source, command-line tool that serves as the backbone of Soda technology. It is the software that performs the work of converting user-defined input into SQL queries that execute when you run scans for data quality. You can connect Soda Core to a **Soda Cloud** account where you and your team can use the web application to collaborate on data quality monitoring. 

Both Soda Core and Soda Cloud make use of **Soda Checks Language (SodaCL)** to write checks for data quality. The checks are tests that Soda Core executes when it runs a scan of your data. Read [more]({% link soda/product-overview.md %}). 

**Kubernetes** is a system for orchestrating containerized applications; a **Kubernetes cluster** is a set of resources that support an application environment. You need a Kubernetes cluster in which to deploy the containerized applications that make up the **Soda Agent**.

**Amazon Elastic Kubernetes Service (EKS)** is *where* you create your Kubernetes cluster; **Fargate** is a type of EKS node that operates as a serverless, pay-as-you-go compute engine, so that you can pay for the compute power your cluster uses. The Kubernetes cluster is also where you store **Kubernetes secrets**, such as login credentials, which Kubernetes creates independently on the pods that use them. (Pods are a basic workload unit in Kubernetes, usually an instance of one container.) Learn more about <a href="https://www.youtube.com/watch?v=BOj1sgWVXko" target="_blank" >Kubernetes</a> concepts.

**Helm** is a pacakage manager for Kubernetes which bundles YAML files together for storage in a public or private repository. This bundle of YAML files is referred to as a **Helm chart**. The Soda Agent is a Helm chart. Anyone with access to the Helm chart's repo can deploy the chart to make use of YAML files in it. Learn more about <a href="https://www.youtube.com/watch?v=-ykwb1d0DXU" target="_blank" >Helm</a> concepts. 

The Soda Agent Helm chart is stored on a public respository on <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>. Anyone can use Helm to find and deploy the Soda Agent Helm chart in their Kubernetes cluster. Deploying the agent also installs two other things in your Kubernetes cluster:
* a **Soda Agent Orchestrator** from a Docker image, which creates Kubernetes Jobs and cron jobs to trigger scheduled scans of data
* a **Soda Agent Scan Launcher** which wraps around Soda Core, the tool which performs the scan itself and pushes scan results to Soda Cloud 

To learn more about the Soda Agent in greater detail, read [How a Soda Agent works]({% link soda-agent/how-it-works.md %}). 


## Prererequisites

* You have an AWS account and the necessary permissions to enable you to create an EKS Fargate cluster in your region.
* You have installed <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a>. This is the command-line tool you need to access your AWS account from the commnd-line. Run `aws --version` to check the version of an existing install.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 
* You have installed <a href="https://eksctl.io/introduction/#installation" target="_blank">eksctl</a>. This is the command-line tool for Amazon EKS that you use to create and manage Kubernetes clusters on EKS. Run `eksctl version` to check the version of an existing install.

## Compatability

You can deploy a Soda Agent to connect with the following data sources:

<table>
  <tr>
    <td>Amazon Athena<br /> Amazon Redshift<br />  GCP Big Query</td>
    <td>PostgreSQL<br /> Snowflake</td>
  </tr>
</table>

## Create a Soda Cloud account and API keys

The Soda Agent communicates with your Soda Cloud account using API public and private keys. Note that the keys a Soda Agent uses are different than the API keys Soda Cloud uses to connect to Soda Core. 

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > the **Agents** tab, then click the **New Soda Agent**.
3. The dialog box that appears offers abridged instructions to set up a new Soda Agent from the command-line; more thorough instructions exist in this documentation, below. <br />
For now, copy and paste the values for both the **soda.apikey.id** and **soda.apikey.secret** to a temporary, secure place in your local environment. You will need these values in the next section when you deploy the agent in your Kubernetes cluster.<br />
![deploy-agent](/assets/images/deploy-agent.png){:height="600px" width="600px"}
4. You can keep the dialog box open in Soda Cloud, or close it.


## Deploy an agent

1. From the command-line, execute the following command to create a new EKS Fargate cluster in your AWS account.  <br/>Replace the value of `--region` with one that is appropriate for your location. 
```shell
eksctl create cluster --name soda-agent --region eu-central-1 --fargate
```
* If you are not sure which region to use, execute the following command to find your region:
```shell
aws configure get region
```
* The activity to create a cluster may take awhile, printing messages in the console that read `waiting for CloudFormation stack "eksctl-soda-agent-cluster"`. Be patient! Access <a href="https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-stack-stuck-progress/" target="_blank">AWS troubleshooting documentation</a> if you wish. 
2. To connect to the newly created cluster and create a namespace, use the following command.
```shell
kubectl create namespace soda-agent
```
3. Create a namespace and a Fargate profile for EKS Fargate serverless deployment in the namespace you just created. <br />
When you deploy a Soda Agent on EKS Fargate, AWS matches the Fargate Profile using annotation labels in the Soda Agent Helm chart. Without the profile, the Helm chart cannot successfully deploy. <br />
Refer to [Troubshoot deployment](#troubleshoot-deployment) below if you encounter errors.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --namespace soda-agent
```
4. Run the following command to verify which cluster kubectl regcognizes as the current one. 
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
5. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
6. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. The cluster stores these key values as Kubernetes secrets.<br /> Alternatively, you can install the agent using a values.yml file to store all the `--set` values in a local file. See [Deploy using values YAML file](#deploy-using-values-yaml-file).
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish.
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
7. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
8. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> 
Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 7 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
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
9. Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.

### About the `helm install` command

helm install soda-agent soda-agent/soda-agent: this will install the helm chart (from the helm repo we previously added) as a release named soda-agent on your cluster
the --set flags override or set some values as they are defined and used in the Helm chart. They can be overriden using the --set parameters as shown or by specifying a local values.yaml file which can override defaults as they come with the Helm chart.
soda.agent.target :
can be either "default" or "aws-eks".
If aws-eks is picked, some additional attributes are set to make the Helm chart run successfully against EKS Fargate
soda.agent.name
A unique name for your Soda Agent, you are free to pick a name as long as it is unique in your Soda Cloud organisation
soda.apikey.id
API key to use against Soda Cloud
API key is linked to a service account user, not a real user (on a sidenote)
soda.apikey.secret
Secret for the API key to use against Soda Cloud
--namespace soda-agent
make sure to deploy in the namespace we created before


### Troubleshoot deployment

**`UnauthorizedOperation: You are not authorized to perform this operation.`<br />**
This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the approrpriate permissions.


**`ResourceNotFoundException: No cluster found for name: soda-agent.` <br/>**
If you get an error like this when you attempt to create a Fargate profile, it may be a question of region. 
1. Access your <a href="https://us-west-1.console.aws.amazon.com/cloudformation/home" target="_blank">AWS CloudFormation console</a>, then click **Stacks* to find the eksctl-soda-agent-cluster that you created in step 1. If you do not see the stack, adjust the region of your CloudFormation console (top nav bar, next to your username).
2. Try running the command: `aws eks list-clusters`. It likely returns the following.
```
{
    "clusters": []
}
```
2. Try running the command: `aws cloudformation list-stacks --region us-west-1` replacing the value of `--region` with the value you used in step 1 when you creted the EKS Fargate cluster. 
3. If that command returns information about the cluster you just created, add the `--region` option to the command to create a Fargate profile.
```shell
eksctl create fargateprofile --cluster soda-agent --name soda-agent-profile --region us-west-1 --namespace soda-agent
```


### Deploy using values YAML file

The instructions to [Deploy a Soda Agent](#deploy-a-soda-agent) above use options with the `helm install` command to provide information that Helm needs to properly deploy the Soda Agent. However, you may wish to use a `values.yml` file to provide these details instead, for two reasons:
* you may wish to keep the sensitive API key values in this local file
* eventually, you can store the data source login credentials you need to provide when connecting to a data source in Soda Cloud as environment variables in this local file

Therefore, instead of running the command in step 6, above, take a couple extra steps and use a modified `helm install` command.
1. Using a code editor, create a new YAML file called `values.yml`.
2. To that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account 
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish
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
4. Return to the procedure above and continue with step 7.


## Environment variables for data source connections

You can pass additional environment variables for Soda Core db connections, using the local values.yaml file as well. So if you have this for connection config in Cloud for example:
data_source local_postgres_test:
    type: postgres
    connection:
        host: 172.17.0.7
        port: 5432
        username: ${ POSTGRES_USER }
        password: ${ POSTGRES_PASS }
    database: postgres
    schema: new_york
Then you should pass these values in your local values yaml file as well:
soda:
  apikey:
    id: "your-agent-api-key-id"
    secret: "your-agent-api-key-secret"
  agent:
    loglevel: "DEBUG"
    name: "your-unique-agent-name"
  cloud:
    endpoint: "https://dev.sodadata.io"
  dd:
    key: "<see Bitwarden: DataDog key for Soda Agent>"
    env: "local"
  env:
    POSTGRES_USER: "sodacore"
    POSTGRES_PASS: "sodacore"

## Review logs

Apart from adding a DataDog API key resulting in logs showing up in DataDog, you can also verify logs directly.
To get a list of pods running in the Agent's namespace, you can issue:
kubectl get pods -n soda-agent
Example output:
> kubectl get pods -n soda-agent
soda-agent-orchestrator-5975ddcd9-5b5qr                         2/2     Running     0          4h6m
The Orchestrator's pod name follows the soda-agent-orchestrator-xxxxxxxx-xxxxx naming convention.
Get and tail the logs from this Orchestrator's pod:
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  -n soda-agent -f
On a side note, you can also get the orchestrator name issuing this command as well:
kubectl get pods --no-headers -o custom-columns=":metadata.name" \
  -l agent.soda.io/component=orchestrator -n soda-agent
If a sidecar is deployed in the pod (in the above output you can see 2/2 which means 2 containers int he pod running out of 2 expected) so in that case there is a sidecar running (the fluent-bit based log reader/forwarder).
If you want to get the logs from the sidecar, you can issue and additional -c flag to specify the sidecar container in the pod.
kubectl logs pods/soda-agent-orchestrator-5975ddcd9-5b5qr \
  -c logging-sidecar \
  -n soda-agent -f
By default - if you don't specify the container using that flag, your kubectl client (depending on the version) will fall back on the first container in the pod for the logs (being the Orchestrator container itself).

## Decomission a Soda Agent and the EKS cluster

1. Uninstall the Soda Agent in the cluster.
```shell
helm delete soda-agent -n soda-agent
```
2. Remove the Fargate profile.
```shell
eksctl delete fargateprofile --cluster soda-agent --name soda-agent-profile --namespace soda-agent
```
3. Delete the EKS cluster itself.
```shell
eksctl delete cluster --name soda-agent
```
4. (Optional) Access your <a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home" target="_blank"> CloudFormation console</a>, then click **Stacks** to view the status of your decomissioned cluster.


## Redeploy the agent





## Go further

* Next: [Add a data source]({% link soda-cloud/add-datasource.md %}) in Soda Cloud using the Soda Agent you just deployed.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}