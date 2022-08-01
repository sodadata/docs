---
layout: default
title: Soda Agent test deployment
description: 
parent: Soda Agent
---

# Soda Agent test deployment ![preview](/assets/images/preview.png){:height="70px" width="70px"}

{% include banner-preview.md %}

If you are curious about how the Soda Agent works but are not yet ready to deploy to an Amazon Elastic Kubernetes Service (EKS) cluster, you can deploy an agent locally and connect it to your Soda Cloud account.

Access [Deploy a Soda Agent]({% link soda-agent/deploy.md %}) for full deployment details.

[Prerequisites](#prerequisites)<br />
[Create a Soda Cloud account and API keys](#create-a-soda-cloud-account-and-api-keys)<br />
[Deploy a Soda Agent locally](#deploy-a-soda-agent-locally)<br />
[Create a practice data source](#create-a-practice-data-source)<br />
[Deccomission the local cluster and Soda Agent](#deccomission-the-local-cluster-and-soda-agent)<br />
<br />

## Prerequisites

* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 
* You have installed <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a> in your local environment.

## Create a Soda Cloud account and API keys

The Soda Agent communicates with your Soda Cloud account using API public and private keys. Note that the keys a Soda Agent uses are different than the API keys Soda Cloud uses to connect to Soda Core. 

1. If you have not already done so, create a Soda Cloud account at <a href="https://cloud.soda.io/signup" target="_blank"> cloud.soda.io</a>.
2. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > the **Agents** tab, then click the **New Soda Agent**.
3. The dialog box that appears offers abridged instructions to set up a new Soda Agent from the command-line; more thorough instructions exist in this documentation, below. <br />
For now, copy and paste the values for both the **soda.apikey.id** and **soda.apikey.secret** to a temporary, secure place in your local environment. You will need these values in the next section when you deploy the agent in your Kubernetes cluster.<br />
![deploy-agent](/assets/images/deploy-agent.png){:height="600px" width="600px"}
4. You can keep the dialog box open in Soda Cloud, or close it.

## Deploy a Soda Agent locally

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
4. Run the following command to verify which cluster kubectl regcognizes as the current one. 
```shell
minikube kubectl -- config get-contexts
```
The namespace associated with `CURRENT` must be `soda-agent`. If it is not, use the following command to change contexts. 
```shell
minikube kubectl -- config set-context --current --namespace=soda-agent
```
```shell
CURRENT   NAME               CLUSTER          AUTHINFO          NAMESPACE
*         minikube           minikube         minikube          soda-agent
``` 
5. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
6. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. 
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=minikube \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
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
7. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
minikube kubectl -- describe pods
```
8. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 7 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
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
9. If you wish, you can [create a practice data source](#create-a-practice-data-source) so you can try adding a data source in Soda Cloud using the Soda Agent you just deployed.


## Create a practice data source

If you wish to try creating a new data source in Soda Cloud using the agent you created locally, you can use the following command to create a PostgreSQL warehouse containing data from the <a href="https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm" target="_blank">NYC Bus Breakdowns and Delay Dataset</a>.

1. From the command-line, create the data source as a pod on your local cluster.
```shell
cat <<EOF | kubectl apply -n soda-agent -f -
apiVersion: v1
kind: Pod
metadata:
  name: nybusbreakdowns
  labels:
       app: nycbusbreakdowns
       eks.amazonaws.com/fargate-profile: soda-agent-profile
spec:
  containers:
  - image: sodadata/nybusbreakdowns
       imagePullPolicy: IfNotPresent
       name: nybusbreakdowns
  restartPolicy: Always
EOF
```
2. Once the pod is running, you can use the following configuration details when you add a data source in Soda Cloud, in step 2, **Connect the Data Source**.
```yaml 
data_source local_postgres_test:
  type: postgres
  connection:
        host: nybusbreakdowns
        port: 5432
        username: sodacore
        password: sodacore
        database: sodacore
        schema: new_york
```

## Deccomission the local cluster and Soda Agent

When you are satisfied with testing the deployment of a Soda Agent, you can decomission the local cluster you set up for deployment.

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

## Go further

* [Deploy a Soda Agent]({% link soda-agent/deploy.md %}) for real!
* 
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}