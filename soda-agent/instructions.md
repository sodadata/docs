---
layout: default
title: Deploy a Soda Agent in a Kubernetes cluster
description: Learn how to deploy a Soda Agent in a Kubernetes cluster.
parent: Get started
---

# Instructions for IT Admin

You're here because a colleague asked you to set up Soda for them. Great!<br />
Here is what you need:
* **Connection configuration details** for the data source in your organization that contains the data your colleague wants to test for data quality. 
* A new or existing **Kubernetes cluster** in which you can deploy a containerized Soda Agent application.
* A **Soda Cloud account**, which you can create via an emailed invitation from your colleague.

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
` ``shell
helm repo add soda-agent https://helm.soda.io/soda-agent/
```
3. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](#about-the-helm-install-command).)
* Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account.
* Replace the value of `soda.agent.name` with a custom name for you agent, if you wish.
* Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
* Optionally, add `soda.scanlauncher` settings to configure idle workers in the cluster. Launch an idle worker so that at scan time, the agent passes instructions to an already-running idle Scan Launcher and avoids the time-consuming task of starting the pod from scratch. This helps your Soda Cloud test scans run faster. If you wish, you can configure multiple idle scan launchers waiting for instructions.  <br />
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.name=myuniqueagent \
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
4. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/><br/>Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.
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

<br />

#### Deploy using a values YAML file

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts]({% link soda-agent/basics.md %}). 1. 
2. Using a code editor, create a new YAML file called `values.yml`.
3. In that file, copy+paste the content below, replacing the following values:
* `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. 
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
6. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. <br/> <br/> 
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

If you use private key authentication with a Soda Agent, refer to [Soda Agent extras]({% link soda-agent/secrets.md %}#use-a-values-file-to-store-private-key-authentication-values).

<br />

### About the `helm install` command

{% include agent-helm-command.md %}

### Decomission the Soda Agent and cluster

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

### Troubleshoot deployment

{% include agent-troubleshoot.md %}
---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}