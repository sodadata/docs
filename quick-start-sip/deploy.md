---
description: Learn how to deploy a Soda Agent in a Kubernetes cluster.
---

# Deploy a Soda Agent

{% hint style="warning" %}
The Soda environment has been updated since this tutorial.

> Refer to [v4 documentation](https://app.gitbook.com/s/A2PmHkO5cBgeRPdiPPOG/quickstart) for updated tutorials.
{% endhint %}

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster, then use Helm to deploy a self-hosted Soda Agent in the cluster.

This setup enables Soda Cloud users to securely connect to data sources (BigQuery, Snowflake, etc.) from within the Soda Cloud web application. Any user in your Soda Cloud account can add a new data source via the agent, then write their own no-code checks and agreements to check for data quality in the new data source. Alternatively, if you use a BigQuery, Databricks SQL, MS SQL Server, MySQL, PostgreSQL, Redshift, or Snowflake data source, you can use a secure, out-of-the-box [Soda-hosted agent](managed-agent.md) made available for every Soda Cloud organization.

As a step in the **Get started roadmap**, this guide offers instructions to set up, install, and configure Soda in a [self-hosted agent deployment model](setup-guide.md#self-hosted-agent).

**Get started roadmap**

1. ~~Choose a flavor of Soda~~
2. **Set up Soda: self-hosted agent** 📍 You are here!\
   &#x20;    a. [Create a Soda Cloud account](deploy.md#create-a-soda-cloud-account)\
   &#x20;    b. [Deploy a Soda Agent in a Kubernetes cluster](deploy.md#deploy-a-soda-agent-in-a-kubernetes-cluster)\
   &#x20;    c. [Add a new data source](deploy.md#add-a-new-data-source)
3. Write SodaCL checks
4. Run scans and review results
5. Organize, alert, investigate

## Create a Soda Cloud account

The Soda Agent communicates with your Soda Cloud account using API public and private keys. Note that the keys a Soda Agent uses are _different_ from the API keys Soda Library uses to connect to Soda Cloud.

1. If you have not already done so, create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup?utm_source=docs). If you already have a Soda account, log in.
2. In your Soda Cloud account, navigate to **your avatar** > **Data Sources**, then navigate to the **Agents** tab. Click **New Soda Agent**.
3. The dialog box that appears offers abridged instructions to set up a new Soda Agent from the command-line; more thorough instructions exist in this documentation, below.\
   \
   For now, copy and paste the values for both the **API Key ID** and **API Key Secret** to a temporary, secure place in your local environment. You will need these values when you deploy the agent in your Kubernetes cluster.

<figure><img src="https://docs.soda.io/assets/images/deploy-agent.png" alt=""><figcaption></figcaption></figure>

4. You can keep the dialog box open in Soda Cloud, or close it.

## Deploy a Soda Agent in a Kubernetes cluster

What follows are detailed deployment instructions according to the type of environment in which you create a cluster to deploy an agent. The high-level steps to complete the deployment remain the same regardless of environment.

1. (Optional) Familiarize yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Install, or confirm the installation of, a few required command-line tools.
3. Create a new Kubernetes cluster in your environment, or identify an existing cluster you can use to deploye a Soda Agent.
4. Deploy the Soda Agent in the cluster.
5. Verify the existence of your new Soda Agent in your Soda Cloud account.

### Compatibility

Soda supports Kubernetes cluster version 1.21 or greater.

You can deploy a Soda Agent to connect with the following data sources:

|                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li>Amazon Athena</li></ul><ul><li>Amazon Redshift</li></ul><ul><li>Azure Synapse</li></ul><ul><li>ClickHouse</li></ul><ul><li>Databricks SQL</li></ul><ul><li>Denodo</li></ul><ul><li>Dremio</li></ul><ul><li>DuckDB</li></ul><ul><li>GCP BigQuery</li></ul><ul><li>Google CloudSQL</li><li>IBM DB2</li></ul> | <ul><li>MotherDuck</li></ul><ul><li>MS SQL Server<sup>1</sup></li><li>MS Fabric<sup>1</sup></li><li>MySQL</li><li>OracleDB</li><li>PostgreSQL</li><li>Presto</li><li>Snowflake</li><li>Trino</li><li>Vertica</li></ul> |

<sup>1</sup> MS SQL Server/MS Fabric with Windows Authentication does not work with Soda Agent out-of-the-box.

{% tabs %}
{% tab title="Kubernetes cluster" %}
These deployment instructions offer generic guidance for deploying a Soda Agent in a Kubernetes cluster.

[Prerequisites](deploy.md#prerequisites)\
[System requirements](deploy.md#system-requirements)\
[Deploy an agent](deploy.md#deploy-an-agent)\
&#x20;   [Deploy using CLI only](deploy.md#deploy-using-cli-only)\
&#x20;   [Deploy using a values YAML file](deploy.md#deploy-using-a-values-yaml-file)\
[About the `helm install` command](deploy.md#about-the-helm-install-command)\
[Decommission the Soda Agent and cluster](deploy.md#decomission-the-soda-agent-and-cluster)\
[Troubleshoot deployment](deploy.md#troubleshoot-deployment)

***

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have created, or have access to an existing Kubernetes cluster into which you can deploy a Soda Agent.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

### System requirements <a href="#system-requirements" id="system-requirements"></a>

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

### Deploy an agent <a href="#deploy-an-agent" id="deploy-an-agent"></a>

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                              | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CLI only](deploy.md#deploy-using-cli-only)                         | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment.                                                                                                                                                                                                                                                                                                                                       |
| [Use a values YAML file](deploy.md#deploy-using-a-values-yaml-file) | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file<br>- store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: <a href="extras.md">Soda Agent extras</a>.</p> |

#### **Deploy using CLI only**

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2.  Add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent https://helm.soda.io/soda-agent/
    ```
3. Use the following comand to install the Helm chart to deploy a Soda Agent in your custer. Learn more about the [`helm install` command](deploy.md#about-the-helm-install-command).
   * Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
   * Replace the value of `soda.agent.name` with a custom name for you agent, if you wish.
   * Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
   * (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format.
   *   (Optional) Specify the level of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.

       ```
       helm install soda-agent soda-agent/soda-agent \
        --set soda.agent.name=myuniqueagent \
        # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
        --set soda.cloud.endpoint=https://cloud.soda.io \
        --set soda.apikey.id=*** \
        --set soda.apikey.secret=**** \
        --set soda.agent.logFormat=raw \
        --set soda.agent.loglevel=ERROR \
        --namespace soda-agent
       ```

       The command-line produces output like the following message:

       ```
       NAME: soda-agent
       LAST DEPLOYED: Thu Jun 16 15:03:10 2022
       NAMESPACE: soda-agent
       STATUS: deployed
       REVISION: 1
       ```
4.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    minikube kubectl -- describe pods
    ```
5.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.

    ```
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

<figure><img src="../.gitbook/assets/https___docs.soda.io_assets_images_agent-deployed (4).avif" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

#### **Deploy using a values YAML file**

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3. Using a code editor, create a new YAML file called `values.yml`.
4. In that file, copy+paste the content below, replacing the following values:
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
            # Use https://cloud.us.soda.io for US region
            # Use https://cloud.soda.io for EU region
            endpoint: "https://cloud.soda.io"
       ```
5.  Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
6.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    minikube kubectl -- describe pods
    ```
7.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step three to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.

    ```
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

<figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

If you use private key authentication with a Soda Agent, refer to [Soda Agent extras](extras.md).

### About the `helm install` command <a href="#about-the-helm-install-command" id="about-the-helm-install-command"></a>

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

### Decomission the Soda Agent and cluster <a href="#decomission-the-soda-agent-and-cluster" id="decomission-the-soda-agent-and-cluster"></a>

1.  Uninstall the Soda Agent in the cluster.

    ```
    helm uninstall soda-agent -n soda-agent
    ```
2.  Delete the cluster.

    ```
    minikube delete
    ```

    ```
    💀  Removed all traces of the "minikube" cluster.
    ```

### Troubleshoot deployment <a href="#troubleshoot-deployment" id="troubleshoot-deployment"></a>

**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else



**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR
* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND
* `collect.soda.io`
{% endtab %}

{% tab title="Amazon EKS" %}
These deployment instructions offer guidance for setting up an Amazon Elastic Kubernetes Service (EKS) cluster and deploying a Soda Agent in it.

[Prerequisites](deploy.md#prerequisites-1)\
[System requirements](deploy.md#system-requirements-1)\
[Deploy an agent](deploy.md#deploy-an-agent-1)\
&#x20;   [Deploy using CLI only](deploy.md#deploy-using-cli-only-1)\
&#x20;   [Deploy using a values YAML file](deploy.md#deploy-using-a-values-yaml-file-1)\
[(Optional) Connect via AWS PrivateLink](deploy.md#optional-connect-via-aws-privatelink)\
[About the `helm install` command](deploy.md#about-the-helm-install-command-1)\
[Decommission the Soda Agent and the EKS cluster](deploy.md#decommission-the-soda-agent-and-the-eks-cluster)\
[Troubleshoot deployment](deploy.md#troubleshoot-deployment-1)

***

### Prerequisites <a href="#prerequisites-1" id="prerequisites-1"></a>

* You have an AWS account and the necessary permissions to enable you to create, or gain access to an EKS cluster in your region.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

### System requirements <a href="#system-requirements-1" id="system-requirements-1"></a>

Kubernetes cluster size and capacity: 2 CPU and 2GB of RAM. In general, this is sufficient to run up to six scans in parallel.

Scan performance may vary according to the workload, or the number of scans running in parallel. To improve performance for larger workloads, consider:

* fine-tuning the cluster size using the `resources` parameter for the `agent-orchestrator` and `soda.scanlauncher.resources` for the `scan-launcher`. Adding more resources to the `scan-launcher` can improve scan times by as much as 30%.
* adding more nodes to the node group; see AWS documentation for [Scaling Managed Nodegroups](https://eksctl.io/usage/nodegroup-managed/#scaling-managed-nodegroups).
* adding a cluster auto-scaler to your Kubernetes cluster; see AWS documentation for [Autoscaling](https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html)

Be aware, however, that allocating too many resources may be costly relative to the small benefit of improved scan times.

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

### Deploy an agent <a href="#deploy-an-agent-1" id="deploy-an-agent-1"></a>

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                                | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CLI only](deploy.md#deploy-using-cli-only-1)                         | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster.                                                                                                                                                                                                                                                                                                                                                                        |
| [Use a values YAML file](deploy.md#deploy-using-a-values-yaml-file-1) | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file<br>- store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: <a href="extras.md">Soda Agent extras</a>.</p> |

#### **Deploy using CLI only**

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. (Optional) If you wish, you can establish an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud. Refer to [Connect via AWS PrivateLink](deploy.md#optional-connect-via-aws-privatelink) before deploying an agent.
3. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to [Use existing VPC](https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration).
4. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart. Best practices advises [creating a managed node group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html) into which you can deploy the agent.
5.  Use Helm to add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent https://helm.soda.io/soda-agent/
    ```
6. Use the following command to install the Helm chart which deploys a Soda Agent in your custer.
   * Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
   * Replace the value of `soda.agent.name` with a custom name for your agent, if you wish.
   * Specify the value for `soda.cloud.endpoint` according to your local region: `https://cloud.us.soda.io` for the United States, or `https://cloud.soda.io` for all else.
   * (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format.
   * (Optional) Specify the level of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.
   *   Read more [about the `helm install` command](https://docs.soda.io/soda-agent/deploy.html#about-the-helm-install-command-1).

       ```
       helm install soda-agent soda-agent/soda-agent \
        --set soda.agent.name=myuniqueagent \
        # Use https://cloud.us.soda.io for US region; use https://cloud.soda.io for EU region
        --set soda.cloud.endpoint=https://cloud.soda.io \
        --set soda.apikey.id=*** \
        --set soda.apikey.secret=**** \
        --set soda.agent.logFormat=raw \
        --set soda.agent.loglevel=ERROR \
        --namespace soda-agent
       ```

       The command-line produces output like the following message:

       ```
       NAME: soda-agent
       LAST DEPLOYED: Thu Jun 16 10:12:47 2022
       NAMESPACE: soda-agent
       STATUS: deployed
       REVISION: 1
       ```
7.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods
    ```
8.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step 3 to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.

    ```
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

<figure><img src="../.gitbook/assets/https___docs.soda.io_assets_images_agent-deployed (6).avif" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

#### **Deploy using a values YAML file**

1. (Optional) You have familarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. (Optional) If you wish, you can establish an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud. Refer to [Connect via AWS PrivateLink](deploy.md#optional-connect-via-aws-privatelink) before deploying an agent.
3. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to [Use existing VPC](https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration).
4. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart. Best practices advises [creating a managed node group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html) into which you can deploy the agent.
5. Using a code editor, create a new YAML file called `values.yml`.
6. To that file, copy+paste the content below, replacing the following values:
   * `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
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
7.  Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
8.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods -n soda-agent
    ```
9.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
    \
    Be aware that this may take several minutes to appear in your list of Soda Agents. Use the `describe pods` command in step four to check the status of the deployment. When `State: Running` and `Ready: True`, then you can refresh and see the agent in Soda Cloud.

    ```
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

<figure><img src="../.gitbook/assets/https___docs.soda.io_assets_images_agent-deployed (5).avif" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

### (Optional) Connect via AWS PrivateLink <a href="#optional-connect-via-aws-privatelink" id="optional-connect-via-aws-privatelink"></a>

If you use AWS services for your infrastructure and you have deployed or will deploy a Soda Agent in an EKS cluster, you can use an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud.

1. Log in to your AWS console and navigate to your **VPC dashboard**.
2. Follow the AWS documentation to [Connect to an endpoint service as the service customer](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html).\
   For security reasons, Soda does not publish its **Service name**. Email [support@soda.io](mailto:support@soda.io) with your **AWS account ID** to request the PrivateLink service name. Refer to [AWS documentation](https://docs.aws.amazon.com/signin/latest/userguide/console_account-alias.html) for instructions on how to obtain your account ID.
3. After creating the endpoint, return to the **VPC dashboard**. When the status of the endpoint becomes **Available**, the PrivateLink is ready to use. Be aware that this make take more than 10 minutes.
4.  Deploy a Soda Agent to your AWS EKS cluster, or, if you have already deployed one, restart your Soda Agent to begin sending data to Soda Cloud via the PrivateLink.

    ```
    kubectl -n soda-agent rollout restart deploy
    ```
5. After you have started the agent and validated that it is running, log into your Soda Cloud account, then navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.

<figure><img src="https://docs.soda.io/assets/images/agent-deployed.png" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

### About the `helm install` command <a href="#about-the-helm-install-command-1" id="about-the-helm-install-command-1"></a>

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

### Decommission the Soda Agent and the EKS cluster <a href="#decommission-the-soda-agent-and-the-eks-cluster" id="decommission-the-soda-agent-and-the-eks-cluster"></a>

1.  Uninstall the Soda Agent in the cluster.

    ```
    helm uninstall soda-agent -n soda-agent
    ```
2.  Delete the EKS cluster itself.

    ```
    eksctl delete cluster --name soda-agent
    ```
3. (Optional) Access your [CloudFormation console](https://eu-central-1.console.aws.amazon.com/cloudformation/home), then click **Stacks** to view the status of your decommissioned cluster.\
   If you do not see your Stack, use the region drop-down menu at upper-right to select the region in which you created the cluster.

### Troubleshoot deployment <a href="#troubleshoot-deployment-1" id="troubleshoot-deployment-1"></a>

**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else



**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR
* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND
* `collect.soda.io`

\


**Problem:** `UnauthorizedOperation: You are not authorized to perform this operation.`

**Solution:** This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the appropriate permissions.
{% endtab %}

{% tab title="Azure AKS" %}
These deployment instructions offer guidance for setting up an Azure Kubernetes Service (AKS) cluster and deploying a Soda Agent in it.

[Prerequisites](deploy.md#prerequisites-2)\
[System requirements](deploy.md#system-requirements-2)\
[Deploy an agent](deploy.md#deploy-an-agent-2)\
&#x20;   [Deploy using CLI only](deploy.md#deploy-using-cli-only-2)\
&#x20;   [Deploy using a values YAML file](deploy.md#deploy-using-a-values-yaml-file-2)\
[About the `helm install` command](deploy.md#about-the-helm-install-command-2)\
[Decommission the Soda Agent and the AKS cluster](deploy.md#decommission-the-soda-agent-and-the-aks-cluster)\
[Troubleshoot deployment](deploy.md#troubleshoot-deployment-2)

***

### Prerequisites <a href="#prerequisites-2" id="prerequisites-2"></a>

* You have an Azure account and the necessary permissions to enable you to create, or gain access to an existing AKS cluster in your region. Consult the [Azure access control documentation](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) for details.
* You have installed the [Azure CLI tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli). This is the command-line tool you need to access your Azure account from the command-line. Run `az --version` to check the version of an existing install. Consult the [Azure Command-Line Interface documentation](https://learn.microsoft.com/en-us/cli/azure/) for details.
* You have logged in to your Azure account. Run `az login` to open a browser and log in to your account.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have already installed the Azure CLI tool, you can install kubectl using the following command: `az aks install-cli`.\
  Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

### System requirements <a href="#system-requirements-2" id="system-requirements-2"></a>

Kubernetes cluster size and capacity: 2 CPU and 2GB of RAM. In general, this is sufficient to run up to six scans in parallel.

Scan performance may vary according to the workload, or the number of scans running in parallel. To improve performance for larger workloads, consider fine-tuning the cluster size using the `resources` parameter for the `agent-orchestrator` and `soda.scanlauncher.resources` for the `scan-launcher`. Adding more resources to the `scan-launcher` can improve scan times by as much as 30%. Be aware that allocating too many resources may be costly relative to the small benefit of improved scan times.

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

### Deploy an agent <a href="#deploy-an-agent-2" id="deploy-an-agent-2"></a>

The following table outlines the ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                                | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CLI only - regular cluster](deploy.md#deploy-using-cli-only-2)       | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster.                                                                                                                                                                                                                                                                                                                                                                        |
| [Use a values YAML file](deploy.md#deploy-using-a-values-yaml-file-2) | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file or in an external secrets manager<br>- store data source login credentials as environment variables in this local file; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: <a href="extras.md">Soda Agent extras</a>.</p> |

#### **Deploy using CLI only**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3.  Use Helm to add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent https://helm.soda.io/soda-agent/
    ```
4. Use the following command to install the Helm chart which deploys a Soda Agent in your cluster. (Learn more about the [`helm install` command](deploy.md#about-the-helm-install-command-2).)
   * Replace the values of `soda.apikey.id` and `soda-apikey.secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
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
        --set soda.apikey.secret=**** \
        --set soda.agent.logFormat=raw \
        --set soda.agent.loglevel=ERROR \    
        --namespace soda-agent
       ```

       The command-line produces output like the following message:

       ```
       NAME: soda-agent
       LAST DEPLOYED: Mon Nov 21 16:29:38 2022
       NAMESPACE: soda-agent
       STATUS: deployed
       REVISION: 1
       ```
5.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl get pods -n soda-agent
    ```

    ```
    NAME                                     READY   STATUS    RESTARTS   AGE
    soda-agent-orchestrator-ffd74c76-5g7tl   1/1     Running   0          32s
    ```
6. In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
   \
   Be aware that this may take several minutes to appear in your list of Soda Agents.

<figure><img src="https://docs.soda.io/assets/images/agent-deployed.png" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

#### **Deploy using a values YAML file**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3.  Use Helm to add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent https://helm.soda.io/soda-agent/
    ```
4. Using a code editor, create a new YAML file called `values.yml`.
5. To that file, copy+paste the content below, replacing the following values:
   * `id` and `secret` with the values you copy+pasted from the New Soda Agent dialog box in your Soda Cloud account. By default, Soda uses [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as part of the Soda Agent deployment. The agent automatically converts any sensitive values you add to a values YAML file, or directly via the CLI, into Kubernetes Secrets.
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
6.  Save the file. Then, create a namespace for the agent.

    ```
    kubectl create ns soda-agent
    ```

    ```
    namespace/soda-agent created
    ```
7.  In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
8.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods -n soda-agent
    ```
9. In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.

<figure><img src="https://docs.soda.io/assets/images/agent-deployed.png" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

### About the `helm install` command <a href="#about-the-helm-install-command-2" id="about-the-helm-install-command-2"></a>

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

\


### Decommission the Soda Agent and the AKS cluster <a href="#decommission-the-soda-agent-and-the-aks-cluster" id="decommission-the-soda-agent-and-the-aks-cluster"></a>

1.  Delete everything in the namespace which you created for the Soda Agent.

    ```
    kubectl delete ns soda-agent
    ```
2.  Delete the cluster. Be patient; this task may take some time to complete.

    ```
    az aks delete --resource-group SodaAgent --name soda-agent-cli-test --yes
    ```

### Troubleshoot deployment <a href="#troubleshoot-deployment-2" id="troubleshoot-deployment-2"></a>

**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else

**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR
* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND
* `collect.soda.io`



**Problem:** When you attempt to create a cluster, you get an error that reads, `An RSA key file or key value must be supplied to SSH Key Value. You can use --generate-ssh-keys to let CLI generate one for you`.

**Solution:** Run the same command to create a cluster but include an extra line at the end to generate RSA keys.

```
az aks create \
>   --resource-group SodaAgent \
>   --name SodaAgentCluster \
>   --node-count 1 \
>   --generate-ssh-keys
```
{% endtab %}

{% tab title="Google GKE" %}
These deployment instructions offer guidance for setting up a Google Kubernetes Engine (GKE) cluster and deploying a Soda Agent in it.

[Prerequisites](deploy.md#prerequisites-3)\
[System requirements](deploy.md#system-requirements-3)\
[Deploy an agent](deploy.md#deploy-an-agent-3)\
&#x20;   [Deploy using CLI only](deploy.md#deploy-using-cli-only-3)\
&#x20;   [Deploy using a values YAML file](deploy.md#deploy-using-a-values-yaml-file-3)\
[About the `helm install` command](deploy.md#about-the-helm-install-command-3)\
[Decommission the Soda Agent and cluster](deploy.md#decomission-the-soda-agent-and-cluster)\
[Troubleshoot deployment](deploy.md#troubleshoot-deployment-3)

***

### Prerequisites <a href="#prerequisites-3" id="prerequisites-3"></a>

* You have a Google Cloud Platform (GCP) account and the necessary permissions to enable you to create, or gain access to an existing Google Kubernetes Engine (GKE) cluster in your region.
* You have installed the [gcloud CLI tool](https://cloud.google.com/sdk/docs/install). Use the command `glcoud version` to verify the version of an existing install.
  * If you have already installed the gcloud CLI, use the following commands to login and verify your configuration settings, respectively: `gcloud auth login` `gcloud config list`
  * If you are installing the gcloud CLI for the first time, be sure to complete [all the steps](https://cloud.google.com/sdk/docs/install) in the installation to properly install and configure the setup.
  * Consider using the following command to learn a few basic glcoud commands: `gcloud cheat-sheet`.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. With Docker running, use the command `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

### System requirements <a href="#system-requirements-3" id="system-requirements-3"></a>

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

### Deploy an Agent <a href="#deploy-an-agent-3" id="deploy-an-agent-3"></a>

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                                | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CLI only](deploy.md#deploy-using-cli-only-3)                         | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster in a secure or local environment.                                                                                                                                                                                                                                                                                                                                       |
| [Use a values YAML file](deploy.md#deploy-using-a-values-yaml-file-3) | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file<br>- store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your data. See: <a href="extras.md">Soda Agent extras</a>.</p> |

#### **Deploy using CLI only**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3.  Add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent https://helm.soda.io/soda-agent/
    ```
4. Use the following command to install the Helm chart to deploy a Soda Agent in your custer. (Learn more about the [`helm install` command](deploy.md#about-the-helm-install-command-3).)
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

<figure><img src="../.gitbook/assets/https___docs.soda.io_assets_images_agent-deployed.avif" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

#### **Deploy using a values YAML file**

1. (Optional) You have familiarized yourself with [basic Soda, Kubernetes, and Helm concepts](../learning-resources/basics.md).
2. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart.
3. Using a code editor, create a new YAML file called `values.yml`.
4. In that file, copy+paste the content below, replacing the following values:
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
5.  Save the file. Then, in the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

    ```
    helm install soda-agent soda-agent/soda-agent \
      --values values.yml \
      --namespace soda-agent
    ```
6.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods
    ```
7.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
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

<figure><img src="../.gitbook/assets/https___docs.soda.io_assets_images_agent-deployed (1).avif" alt=""><figcaption></figcaption></figure>

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

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

### Decommission the Soda Agent and cluster <a href="#decommission-the-soda-agent-and-cluster" id="decommission-the-soda-agent-and-cluster"></a>

1.  Uninstall the Soda Agent in the cluster.

    ```
    helm uninstall soda-agent -n soda-agent
    ```
2.  Delete the cluster.

    ```
    gcloud container clusters delete soda-agent-gke
    ```

Refer to [Google Kubernetes Engine documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster) for details.

### Troubleshoot deployment <a href="#troubleshoot-deployment-3" id="troubleshoot-deployment-3"></a>

**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else



**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR
* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND
* `collect.soda.io`
{% endtab %}
{% endtabs %}

## Add a new data source <a href="#add-a-new-data-source" id="add-a-new-data-source"></a>

In your Soda Cloud account, navigate to **your avatar** > **Data Sources**. Click **New Data Source**, then follow the guided steps to create a new data source. Refer to the sections below for insight into the values to enter in the fields and editing panels in the guided steps.

### **1. Attributes**

| Field or Label                                                                 | Guidance                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data Source Label                                                              | Provide a unique identifier for the data source. Soda Cloud uses the label you provide to define the immutable name of the data source against which it runs the Default Scan.                                  |
| Default Scan Agent                                                             | Select the Soda-hosted agent, or the name of a Soda Agent that you have previously set up in your secure environment. This identifies the Soda Agent to which Soda Cloud must connect in order to run its scan. |
| Check Schedule                                                                 | Provide the scan frequency details Soda Cloud uses to execute scans according to your needs. If you wish, you can define the schedule as a cron expression.                                                     |
| Starting At                                                                    | Select the time of day to run the scan. The default value is midnight.                                                                                                                                          |
| Cron Expression                                                                | (Optional) Write your own [cron expression](https://en.wikipedia.org/wiki/Cron) to define the schedule Soda Cloud uses to run scans.                                                                            |
| <p>Anomaly Dashboard Scan Schedule<br>(<strong>Available in 2025</strong>)</p> | Provide the scan frequency details Soda Cloud uses to execute a daily scan to automatically detect anomalies for the anomaly dashboard.                                                                         |

### 2. Connect

In the editing panel, provide the connection configurations Soda Cloud needs to be able to access the data in the data source. Connection configurations are data source-specific and include values for things such as a database's host and access credentials.

To more securely provide sensitive values such as usernames and passwords, use environment variables in a `values.yml` file when you deploy the Soda Agent. See [Use environment variables for data source connection credentials](extras.md#use-environment-variables-to-store-data-source-connection-credentials) for details.

Access the data source-specific connection configurations listed below to copy+paste the connection syntax into the editing panel, then adjust the values to correspond with your data source's details. Access connection configuration details in \[[Data source reference](../data-source-reference/) section of Soda documentation.

See also: [Use a file reference for a BigQuery data source connection](deploy.md#use-a-file-reference-for-a-bigquery-data-source-connection)

### 3. Discover

During its initial scan of your datasource, Soda Cloud discovers all the datasets the data source contains. It captures basic information about each dataset, including a dataset names and the columns each contains.

In the editing panel, specify the datasets that Soda Cloud must include or exclude from this basic discovery activity. The default syntax in the editing panel instructs Soda to collect basic dataset information from all datasets in the data source _except_ those with names that begin with `test_`. The `%` is a wildcard character. See [Add dataset discovery](../soda-cl-overview/profile.md#add-dataset-discovery) for more detail on profiling syntax.

{% hint style="warning" %}
_Known issue:_ SodaCL does not support using variables in column profiling and dataset discovery configurations.
{% endhint %}

```yaml
discover datasets:
  datasets:
    - include %
    - exclude test_%
```

### 4. Profile

To gather more detailed profile information about datasets in your data source and automatically build an **anomaly dashboard** for data quality observability (preview, only), you can configure Soda Cloud to profile the columns in datasets.

Profiling a dataset produces two tabs' worth of data in a dataset page:

* In the **Columns** tab, you can see column profile information including details such as the calculated mean value of data in a column, the maximum and minimum values in a column, and the number of rows with missing data.

<figure><img src="../.gitbook/assets/profile-columns2.png" alt=""><figcaption></figcaption></figure>

* In the **Anomalies** tab, you can access an out-of-the-box anomaly dashboard that uses the column profile information to automatically begin detecting anomalies in your data relative to the patterns the machine learning algorithm learns over the course of approximately five days. [Learn more](../collaborate/anomaly-dashboard.md) (**available in 2025**)

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

In the editing panel, provide details that Soda Cloud uses to determine which datasets to include or exclude when it profiles the columns in a dataset. The default syntax in the editing panel instructs Soda to profile every column of every dataset in this data source, and, superfluously, all datasets with names that begin with `prod`. The `%` is a wildcard character. See [Add column profiling](../soda-cl-overview/profile.md#add-column-profiling) for more detail on profiling syntax.

Column profiling and automated anomaly detection can be resource-heavy, so carefully consider the datasets for which you truly need column profile information. Refer to [Compute consumption and cost considerations](../soda-cl-overview/profile.md#compute-consumption-and-cost-considerations) for more detail.

```yaml
profile columns:
  columns:
    - "%.%"  # Includes all your datasets
    - prod%  # Includes all datasets that begin with 'prod'
```

### **5. Check**

When Soda Cloud automatically discovers the datasets in a data source, it prepares automated monitoring checks for each dataset. These checks detect anomalies and monitor schema evolution, corresponding to the SodaCL [anomaly detection](../sodacl-reference/anomaly-detection.md) and [schema](../sodacl-reference/schema.md) checks, respectively.

(Note that if you have signed up for early access to [anomaly dashboards](../collaborate/anomaly-dashboard.md) for datasets, this **Check** tab is unavailable as Soda performs all automated monitoring automatically in the dashboards.)

In the editing panel, specify the datasets that Soda Cloud must include or exclude when preparing automated monitoring checks. The default syntax in the editing panel indicates that Soda will add automated monitoring to all datasets in the data source _except_ those with names that begin with `test_`. The `%` is a wildcard character.

```
automated monitoring:
  datasets:
    - include %
    - exclude test_%
```

### **(5) 6. Assign Owner**

This tab is the fifth step in the guided workflow if the **5. Check** tab is absent because you requested access to the anomaly dashboards feature.

| Field or Label        | Guidance                                                                                                                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data Source Owner     | The Data Source Owner maintains the connection details and settings for this data source and its Default Scan Definition.                                                                                                                                            |
| Default Dataset Owner | The Datasets Owner is the user who, by default, becomes the owner of each dataset the Default Scan discovers. Refer to [Manage roles and permissions in Soda Cloud](../collaborate/roles-global.md) to learn how to adjust the Dataset Owner of individual datasets. |

## Use a file reference for a BigQuery data source connection

If you already store information about your data source in a JSON file in a secure location, you can configure your BigQuery data source connection details in Soda Cloud to refer to the JSON file for service account information. To do so, you must add two elements:

* `volumes` and `volumeMounts` parameters in the `values.yml` file that your Soda Agent helm chart uses
* the `account_info_json_path` in your data source connection configuration

You, or an IT Admin in your organization, can add the following `scanlauncher` parameters to the existing `values.yml` that your Soda Agent uses for deployment and redployment in your Kubernetes cluster. Refer to Google GKE instruction above.

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

1. ~~Choose a flavor of Soda~~
2. ~~Set up Soda: self-hosted agent~~
3. [Write SodaCL checks](../soda-cl-overview/)
4. Run scans and review results
5. Organize, alert, investigate

> Need help? Join the [Soda community on Slack](https://community.soda.io/slack).
