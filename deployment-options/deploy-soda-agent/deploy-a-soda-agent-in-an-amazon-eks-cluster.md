# Deploy a Soda Agent in an Amazon EKS cluster

{% hint style="warning" %}
Soda-hosted agents are included in all Free, Team, and Enterprise plans at no additional cost. However, self-hosted agents require an Enterprise plan.

If you wish to use self-hosted agents, please contact us at [https://www.soda.io/contact](https://www.soda.io/contact)  to discuss Enterprise plan options or via the support portal for existing customers.
{% endhint %}

## Prerequisites <a href="#prerequisites-1" id="prerequisites-1"></a>

* You have an AWS account and the necessary permissions to enable you to create, or gain access to an EKS cluster in your region.
* You have installed v1.22 or v1.23 of [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). This is the command-line tool you use to run commands against Kubernetes clusters. If you have installed Docker Desktop, kubectl is included out-of-the-box. Run `kubectl version --output=yaml` to check the version of an existing install.
* You have installed [Helm](https://helm.sh/docs/intro/install/). This is the package manager for Kubernetes which you will use to deploy the Soda Agent Helm chart. Run `helm version` to check the version of an existing install.

## System requirements <a href="#system-requirements-1" id="system-requirements-1"></a>

Kubernetes cluster size and capacity: 2 CPU and 2GB of RAM. In general, this is sufficient to run up to six scans in parallel.

Scan performance may vary according to the workload, or the number of scans running in parallel. To improve performance for larger workloads, consider:

* fine-tuning the cluster size using the `resources` parameter for the `agent-orchestrator` and `soda.scanlauncher.resources` for the `scan-launcher`. Adding more resources to the `scan-launcher` can improve scan times by as much as 30%.
* adding more nodes to the node group; see AWS documentation for [Scaling Managed Nodegroups](https://eksctl.io/usage/nodegroup-managed/#scaling-managed-nodegroups).
* adding a cluster auto-scaler to your Kubernetes cluster; see AWS documentation for [Autoscaling](https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html)(for AWS see )

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

#### Deploy an agent <a href="#deploy-an-agent-1" id="deploy-an-agent-1"></a>

The following table outlines the two ways you can install the Helm chart to deploy a Soda Agent in your cluster.

| Method                                                                                                                        | Description                                                                         | When to use                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#deploy-using-cli-only](deploy-a-soda-agent-in-an-amazon-eks-cluster.md#deploy-using-cli-only "mention")                     | Install the Helm chart via CLI by providing values directly in the install command. | Use this as a straight-forward way of deploying an agent on a cluster.                                                                                                                                                                                                                                                                                                                                                                                              |
| [#deploy-using-a-values-yaml-file](deploy-a-soda-agent-in-an-amazon-eks-cluster.md#deploy-using-a-values-yaml-file "mention") | Install the Helm chart via CLI by providing values in a values YAML file.           | <p>Use this as a way of deploying an agent on a cluster while keeping sensitive values secure.<br>- provide sensitive API key values in this local file<br>- store data source login credentials as environment variables in this local file or in an external secrets manager; Soda needs access to the credentials to be able to connect to your data source to run scans of your dat See: <a data-mention href="soda-agent-extra.md">soda-agent-extra.md</a></p> |

### **Deploy using CLI only**

1. (Optional) If you wish, you can establish an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud. Refer to [#optional-connect-via-aws-privatelink](deploy-a-soda-agent-in-an-amazon-eks-cluster.md#optional-connect-via-aws-privatelink "mention") before deploying an agent.
2. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to [Use existing VPC](https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration).
3. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart. Best practices advises [creating a managed node group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html) into which you can deploy the agent.
4.  Use Helm to add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent [REPOSITORY_URL_PROVIDED]
    ```
5. Use the following command to install the Helm chart which deploys a Soda Agent in your custer.
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
6.  (Optional) Validate the Soda Agent deployment by running the following command:

    ```
    kubectl describe pods
    ```
7.  In your Soda Cloud account, navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents.\
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

    ![agent-deployed](https://docs.soda.io/assets/images/agent-deployed.png)

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

\


### **Deploy using a values YAML file**

1. (Optional) If you wish, you can establish an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud. Refer to [Connect via AWS PrivateLink](https://docs.soda.io/soda-agent/deploy.html#optional-connect-via-aws-privatelink) before deploying an agent.
2. (Optional) If you are deploying to an existing Virtual Private Cloud (VPC), consider supplying public or private subnets with your deployment. Consult the eksctl documentation to [Use existing VPC](https://eksctl.io/usage/vpc-configuration/#use-existing-vpc-other-custom-configuration).
3. Create or navigate to an existing Kubernetes cluster in your environment in which you can deploy the Soda Agent helm chart. Best practices advises [creating a managed node group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html) into which you can deploy the agent.
4.  Use Helm to add the Soda Agent Helm chart repository.

    ```
    helm repo add soda-agent [REPOSITORY_URL_PROVIDED]
    ```
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

    ![agent-deployed](https://docs.soda.io/assets/images/agent-deployed.png)

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

\


### (Optional) Connect via AWS PrivateLink <a href="#optional-connect-via-aws-privatelink" id="optional-connect-via-aws-privatelink"></a>

If you use AWS services for your infrastructure and you have deployed or will deploy a Soda Agent in an EKS cluster, you can use an [AWS PrivateLink](https://aws.amazon.com/privatelink/) to provide private connectivity with Soda Cloud.\


1. Log in to your AWS console and navigate to your **VPC dashboard**.
2. Follow the AWS documentation to [Connect to an endpoint service as the service customer](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html).\
   For security reasons, Soda does not publish its **Service name**. Email [support@soda.io](mailto:support@soda.io) with your **AWS account ID** to request the PrivateLink service name. Refer to [AWS documentation](https://docs.aws.amazon.com/signin/latest/userguide/console_account-alias.html) for instructions on how to obtain your account ID.
3. After creating the endpoint, return to the **VPC dashboard**. When the status of the endpoint becomes **Available**, the PrivateLink is ready to use. Be aware that this make take more than 10 minutes.
4.  Deploy a Soda Agent to your AWS EKS cluster, or, if you have already deployed one, restart your Soda Agent to begin sending data to Soda Cloud via the PrivateLink.

    ```
    kubectl -n soda-agent rollout restart deploy
    ```
5. After you have started the agent and validated that it is running, log into your Soda Cloud account, then navigate to **your avatar** > **Agents**. Refresh the page to verify that you see the agent you just created in the list of Agents. ![agent-deployed](https://docs.soda.io/assets/images/agent-deployed.png)

If you do no see the agent listed in Soda Cloud, use the following command to review status and investigate the logs.

```
kubectl logs -l agent.soda.io/component=orchestrator -n soda-agent -f
```

#### About the `helm install` command <a href="#about-the-helm-install-command-1" id="about-the-helm-install-command-1"></a>

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


## Decommission the Soda Agent and the EKS cluster <a href="#decommission-the-soda-agent-and-the-eks-cluster" id="decommission-the-soda-agent-and-the-eks-cluster"></a>

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

## Troubleshoot deployment <a href="#troubleshoot-deployment-1" id="troubleshoot-deployment-1"></a>



**Problem:** After setting up a cluster and deploying the agent, you are unable to see the agent running in Soda Cloud.

**Solution:** The value you specify for the `soda-cloud-enpoint` must correspond with the region you selected when you signed up for a Soda Cloud account:

* Use`https://cloud.us.soda.io` for the United States
* Use `https://cloud.soda.io` for all else



**Problem:** You need to define the outgoing port and IP address with which a self-hosted Soda Agent can communicate with Soda Cloud. Soda Agent does not require setting any _inbound_ rules as it only polls Soda Cloud looking for instruction, which requires only _outbound_ communication. When Soda Cloud must deliver instructions, the Soda Agent opens a bidirectional channel.

**Solution:** Use port `443` and passlist the fully-qualified domain names for Soda Cloud:

* `cloud.us.soda.io` for Soda Cloud account created in the US region\
  OR\

* `cloud.soda.io` for Soda Cloud account created in the EU region\
  AND\

* `collect.soda.io`



**Problem:** `UnauthorizedOperation: You are not authorized to perform this operation.`

**Solution:** This error indicates that your user profile is not authorized to create the cluster. Contact your AWS Administrator to request the appropriate permissions
