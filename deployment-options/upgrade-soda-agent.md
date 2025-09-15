# Upgrade Soda Agent

The **Soda Agent** is a Helm chart that you deploy on a Kubernetes cluster and connect to your Soda Cloud account using API keys.

To take advantage of new or improved features and functionality in the Soda Agent, including new features in the Soda Library, you can upgrade your agent when a new version becomes available in [ArtifactHub.io](https://artifacthub.io/packages/helm/soda-agent/soda-agent).

Note that there is no downtime associated with the exercise of upgrading a self-hosted Soda Agent. Because Soda does not define the `.spec.strategy` in the deployment manifest of the Soda Agent Helm chart, Kubernetes uses the default `RollingUpdate` to upgrade; refer to [Kubernetes documentation ](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy).

1. If you regularly access multiple clusters, you must ensure that are first accessing the cluster which contains your deployed Soda Agent. Use the following command to determine which cluster you are accessing.

```shell
kubectl config get-contexts
```

If you must switch contexts to access a different cluster, copy the name of cluster you wish to use, then run the following command.

```
kubectl config use-context <name of cluster>
```

2. To upgrade the agent, you must know the values for:

* namespace - the namespace you created, and into which you deployed the Soda Agent
* release - the name of the instance of a helm chart that is running in your Kubernetes cluster
* API keys - the values Soda Cloud created which you used to run the agent application in the cluster\
  Access the first two values by running the following command.

```shell
helm list
```

Output:

```shell
NAME      	NAMESPACE 	REVISION	UPDATED                             	STATUS	  CHART            	APP VERSION     
soda-agent	soda-agent	5       	2023-01-20 11:55:49.387634 -0800 PST	deployed	soda-agent-0.8.26	Soda_Library_1.0.0
```

3. Access the API key values by running the following command, replacing the placeholder values with your own details.

```shell
helm get values -n <namespace> <release name>
```

From the output above, the command to use is:

```shell
helm get values -n soda-agent soda-agent 
```

4. Use the following command to search ArifactHub for the most recent version of the Soda Agent Helm chart.

```shell
helm search hub soda-agent
```

5. Use the following command to upgrade the Helm repository.

```shell
helm repo update
```

6. Upgrade the Soda Agent Helm chart. The value for the chart argument can be a chart reference such as `example/agent`, a path to a chart directory, a packaged chart, or a URL. To upgrade the agent, Soda uses a chart reference: `soda-agent/soda-agent`.

```shell
helm upgrade <release> <chart>
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** 
```

From the output above, the command to use is

```shell
helm upgrade soda-agent soda-agent/soda-agent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** 
```

OR, if you use a values YAML file,

```shell
helm upgrade soda-agent soda-agent/soda-agent \
   --values values-local.yml --namespace soda-agent
```
