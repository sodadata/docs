# Deploy a Soda Agent in a Google GKE cluster

{% hint style="warning" %}
Soda-hosted agents are included in all Free, Team, and Enterprise plans at no additional cost. However, self-hosted agents require an Enterprise plan.

If you wish to use self-hosted agents, please contact us at [https://www.soda.io/contact](https://www.soda.io/contact)  to discuss Enterprise plan options or via the support portal for existing customers.
{% endhint %}

## Prerequisites <a href="#prerequisites-3" id="prerequisites-3"></a>

* You have a Google Cloud Platform (GCP) account and the necessary permissions to enable you to create, or gain access to an existing Google Kubernetes Engine (GKE) cluster in your region.
* You have installed the [gcloud CLI tool](https://cloud.google.com/sdk/docs/install). Use the command `glcoud version` to verify the version of an existing install.
  * If you have already installed the gcloud CLI, use the following commands to login and verify your configuration settings, respectively: `gcloud auth login` `gcloud config list`
  * If you are installing the gcloud CLI for the first time, be sure to complete [all the steps](https://cloud.google.com/sdk/docs/install) in the installation to properly install and configure the setup.
  * Consider using the following command to learn a few basic glcoud commands: `gcloud cheat-sheet`.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

## System requirements <a href="#system-requirements-3" id="system-requirements-3"></a>

Kubernetes cluster size and capacity: 2 CPU and 2GB of RAM. In general, this is sufficient to run up to six scans in parallel.

Scan performance may vary according to the workload, or the number of scans running in parallel. To improve performance for larger workloads, consider fine-tuning the cluster size using the `resources` parameter for the `agent-orchestrator` and `soda.scanlauncher.resources` for the `scan-launcher`. Adding more resources to the `scan-launcher` can improve scan times by as much as 30%. Be aware, however, that allocating too many resources may be costly relative to the small benefit of improved scan times.

To specify resources, add the following parameters to your `values.yml` file during deployment. Refer to Kubernetes documentation for [Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for information on values to supply for `x`.

```
soda:
  agent:
    resources:
      limits:
        cpu: x
        memory: x
      requests:
        cpu: x
        memory: x
  scanlauncher:
    resources:
      limits:
        cpu: x
        memory: x
      requests:
        cpu: x
        memory: x
```

For reference, a Soda-hosted agent specifies resources as follows:

```
soda:
  agent:
    resources:
      limits:
        cpu: 250m
        memory: 375Mi
      requests:
        cpu: 250m
        memory: 375Mi
```

## Deploy an Agent <a href="#deploy-an-agent-3" id="deploy-an-agent-3"></a>

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                                                                                       | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#deploy-using-cli-only](deploy-a-soda-agent-in-a-google-gke-cluster.md#deploy-using-cli-only "mention")                     | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment.                                                                                                                                                                                                                                                                                                                                                               |
| [#deploy-using-a-values-yaml-file](deploy-a-soda-agent-in-a-google-gke-cluster.md#deploy-using-a-values-yaml-file "mention") | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file<br>- store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: <a data-mention href="soda-agent-extra.md">soda-agent-extra.md</a></p> |

### **Deploy using CLI only**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](https://docs.soda.io/soda-agent/basics.html).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3.  Add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent [REPOSITORY_URL_PROVIDED]
    ```
4. Use the following command to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](https://docs.soda.io/soda-agent/deploy.html#about-the-helm-install-command-3).)
   * Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
   * Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
   * Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
   * (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format.
   *   (Optional) Specify the level of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.

       ```
       helm install soda-agent soda-agent/soda-agent \
       --set soda.agent.name=myuniqueagent \
       # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
       --set soda.cloud.endpoint=https://cloud.soda.io \
       --set soda.apikey.id=*** \
       --set soda.apikey.secret=*** \
       --set soda.agent.logFormat=raw \
        --set soda.agent.loglevel=ERROR \
       --namespace soda-agent 
       ```

       The command-line produces output like the following message:

       ```
       NAME: soda-agent
       LAST DEPLOYED: Wed Dec 14 11:45:13 2022
       NAMESPACE: soda-agent
       STATUS: deployed
       REVISION: 1
       ```
5.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods
    ```
6.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step three to check the status of the deployment. When `Status: Running`, then you can refresh and see the agent in Soda Cloud.

    ```
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

    ![agent-deployed](https://docs.soda.io/assets/images/agent-deployed.png)

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

\


### **Deploy using a values YAML file**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](https://docs.soda.io/soda-agent/basics.html).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3.  Add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent [REPOSITORY_URL_PROVIDED]
    ```
4. Using a code editor, create a new YAML file called `values.yml`.
5. In that file, copy+paste the content below, replacing the following values:
   * `id` and `secret` with the values you copy+pasted from the **New Soda Agent** dialog box in your Soda Cloud account. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
   * Replace the value of `name` with a custom name for your agent, if you wish.
   * Specify the value for `endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
   * (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format.
   *   (Optional) Specify the level of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.

       ```
       soda:
          apikey:
            id: "***"
            secret: "***"
          agent:
            name: "myuniqueagent"
            logformat: "raw"
            loglevel: "ERROR"
          cloud:
            # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
            endpoint: "https://cloud.soda.io"
       ```
6.  Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
7.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods
    ```
8.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step four to check the status of the deployment. When `Status: Running`, then you can refresh and see the agent in Soda Cloud.

    ```
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

    ![agent-deployed](https://docs.soda.io/assets/images/agent-deployed.png)

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

\


### About the `helm install` command <a href="#about-the-helm-install-command-3" id="about-the-helm-install-command-3"></a>

```
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
  --namespace soda-agent
```

| Command part                  | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `helm install`                | the action helm is to take                        |
| `soda-agent` (the first one)  | a release named soda-agent on your cluster        |
| `soda-agent` (the second one) | the name of the helm repo you installed           |
| `soda-agent` (the third one)  | the name of the helm chart that is the Soda Agent |

The `--set` options either override or set some of the values defined in and used by the Helm chart. You can override these values with the `--set` files as this command does, or you can specify the override values using a values.yml file.

| Parameter key                | Parameter value, description                                                                                                                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--set soda.agent.name`      | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud account.                                                                                                                                                  |
| `--set soda.apikey.id`       | With the apikey.secret, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a values.yml file to pass this value to the cluster instead of exposing it here. |
| `--set soda.apikey.secret`   | With the apikey.id, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a values.yml file to pass this value to the cluster instead of exposing it here.     |
| `--set soda.agent.logFormat` | (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format.                                                                                                                                                                    |
| `--set soda.agent.loglevel`  | (Optional) Specify the leve of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.                                                                                                                            |
| `--namespace soda-agent`     | Use the namespace value to identify the namespace in which to deploy the agent.                                                                                                                                                                                   |

\


## Decommission the Soda Agent and cluster <a href="#decommission-the-soda-agent-and-cluster" id="decommission-the-soda-agent-and-cluster"></a>

1.  Uninstall the Soda Agent in the cluster.

    ```
    helm uninstall soda-agent -n soda-agent
    ```
2.  Delete the cluster.

    ```
    gcloud container clusters delete soda-agent-gke
    ```

Refer to [Google Kubernetes Engine documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster) for details.

## Troubleshoot deployment <a href="#troubleshoot-deployment-3" id="troubleshoot-deployment-3"></a>

**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else

\


**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR\

* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND\

* `collect.soda.io`

\
