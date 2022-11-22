---
layout: default
title: Deploy a Soda Agent in a Kubernetes cluster
description: Learn how to deploy a Soda Agent in a Kubernetes cluster.
parent: Soda Agent
redirect_from: /soda-agent/test-deploy.html
---

# Deploy a Soda Agent in a Kubernetes cluster
<!--Linked to UI, access Shlink-->
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. 

These deployment instructions offer generic guidance for setting up a Kubernetes cluster and deploying a Soda Agent in it. Instead, you may wish to access a cloud service-specific set of instructions for:
* [Amazon Elastic Kubernetes Service (EKS)]({% link soda-agent/deploy-aws.md %})
* [Microsoft Azure Kubernetes Service (AKS)]({% link soda-agent/deploy-azure.md %})
* [Google Kubernetes Engine (GKE)]({% link soda-agent/deploy-gcp.md %})

<br />

[About the Soda Agent](#about-the-soda-agent)<br />
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
[Helpful commands](#helpful-commands)<br />
[(Optional) Decommission the Soda Agent and cluster](#optional-decomission-the-soda-agent-and-cluster)<br />
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
* You have installed <a href="https://docs.docker.com/get-docker/" target="_blank">Docker</a> in your local environment.
* You have installed v1.22 or v1.23 of <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>. This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm</a>. This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install. 


## Create a Soda Cloud account and API keys

{% include agent-api-keys.md %}

## Create a Kubernetes cluster

To deploy a Soda Agent in a Kubernetes cluster, you must first create a cluster. 

Because the procedure to create a cluster varies depending upon your cloud services provider, the instructions below offer a simple way of creating cluster using Minikube on which you can deploy a Soda Agent locally. Refer to <a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/" target="_blank"> Kubernetes documentation</a>.

Minikube is *not* required to fully deploy a Soda Agent in a cluster in a cloud services provider environment; it is a tool to facilitate completion of the following cloud service-agnostic deployment instructions.

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
| [Use values YAML file](#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file. | Use this as a way of deploying an agent on a cluster while keeping sensitive values secure. <br /> - provide sensitive API key values in this local file <br /> - store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data.|


### Deploy using CLI only

1. Add the Soda Agent Helm chart repository.
```shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
2. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
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
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account 
* Replace the value of `soda.agent.name` with a custom name for your agent, if you wish <br />
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

If you wish to try creating a new data source in Soda Cloud using the agent you created locally, you can use the following command to create a PostgreSQL warehouse containing data from the <a href="https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm" target="_blank">NYC Bus Breakdowns and Delay Dataset</a>.

From the command-line, copy+paste and run the following to create the data source as a pod on your local cluster.
```shell
cat <<EOF | kubectl apply -n soda-agent -f -
---
apiVersion: v1
kind: Pod
metadata:
  name: nybusbreakdowns
  labels:
    app: nybusbreakdowns
spec:
  containers:
  - image: sodadata/nybusbreakdowns
    imagePullPolicy: IfNotPresent
    name: nybusbreakdowns
    ports:
    - name: tcp-postgresql
      containerPort: 5432
  restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nybusbreakdowns
  name: nybusbreakdowns
spec:
  ports:
  - name: tcp-postgresql
    port: 5432
    protocol: TCP
    targetPort: tcp-postgresql
  selector:
    app: nybusbreakdowns
  type: ClusterIP
EOF
```


Once the pod of practice data is running, you can use the following configuration details when you add a data source in Soda Cloud, in [step 2]({% link soda-cloud/add-datasource.md %}#2-connect-the-data-source), **Connect the Data Source**.
```yaml 
data_source your_datasource_name:
  type: postgres
  connection:
    host: nybusbreakdowns
    port: 5432
    username: sodacore
    password: sodacore
    database: sodacore
    schema: new_york
```


## About the `helm install` command

```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.target=minikube \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
  --namespace soda-agent
```

| Command part | Description   |
|--------------|---------------|
| helm install | the action helm is to take | 
| `soda-agent` (the first one) | a release named soda-agent on your cluster |
| `soda-agent` (the second one)| the name of the helm repo you installed|
| `soda-agent` (the third one) | the name of the helm chart that is the Soda Agent |

The `--set` options either override or set some of the values defined in and used by the Helm chart. You can override these values with the `--set` files as this command does, or you can specify the override values using a [values.yml](#deploy-using-a-values-yaml-file) file. 

| Option key      | Option value, description   |
|-----------------|--------------------------------|
| `--set soda.agent.target` | Use `minikube`. |
| `--set soda.agent.name`   | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud account. |
| `--set soda.apikey.id`    | With the apikey.secret, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the cluster instead of exposing it here.|
| `--set soda.apikey.secret`    | With the apikey.id, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the cluster instead of exposing it here.|
| `--namespace soda-agent` | Use the namespace value to identify the namespace in which to deploy the agent. 


## Helpful commands

Use `get pods` to retrieve a list of the pods running in your cluster, including some information about each.
```shell
minikube kubectl -- get pods
```

```
NAME                                       READY   STATUS             RESTARTS   AGE
nybusbreakdowns                            1/1     Running            0          10m
sa-job-3637cccd-bvp6p                      0/1     ImagePullBackOff   0          6m2s
soda-agent-orchestrator-5cd47d77b4-7c2jn   1/1     Running            0          42m
```

<br />

Use `describe pods` to examine details about the pods running in your cluster.
```shell
minikube kubectl -- describe pods
```

```
Name:         nybusbreakdowns
Namespace:    soda-agent
Priority:     0
Node:         minikube/192.168.**.**
Start Time:   Thu, 17 Nov 2022 16:53:54 -0800
Labels:       app=nybusbreakdowns
Annotations:  <none>
Status:       Running
IP:           172.17.**.**
...
```

<br />

Use `logs` to examine details of pod activity. Run `minikube kubectl -- logs -h` for a full list of options to use with the `logs` command.

For example, the following command reveals the activity during set up of the practice pod of `nybusbreakdown` data.
```
minikube kubectl -- logs -l app=nybusbreakdowns --all-containers=true
```

```
server stopped

PostgreSQL init process complete; ready for start up.

2022-11-18 00:55:31.058 UTC [1] LOG:  starting PostgreSQL 14.3 (Debian 14.3-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
2022-11-18 00:55:31.062 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2022-11-18 00:55:31.062 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2022-11-18 00:55:31.065 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2022-11-18 00:55:31.091 UTC [168] LOG:  database system was shut down at 2022-11-18 00:55:30 UTC
2022-11-18 00:55:31.129 UTC [1] LOG:  database system is ready to accept connections
```



<br />


## (Optional) Decomission the Soda Agent and cluster

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

**Problem:** During deployment, you run `minikube kubectl -- describe pods` and the following error occurs: `ImagePullBackOff`.
```shell
...
Containers:
  soda-agent-orchestrator:
    Container ID:   
    Image:          sodadata/agent-orchestrator:v1.0.15
    Image ID:       
    Port:           <none>
    Host Port:      <none>
    State:          Waiting
      Reason:       ImagePullBackOff
    Ready:          False
    Restart Count:  0

```

**Solution:**  

<br />

**Problem:** I have deployed the agent in a cluster and it shows as running, but the agent in Soda Cloud shows as "offline". 

**Solution:**

<br />


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}
