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

| Parameter key      | Parameter value, description   |
|-----------------|--------------------------------|
| `--set soda.agent.target` | The cluster the command targets. May be `minikube`, `aws-eks`, or `azure-aks-virtualnodes`. |
| `--set soda.agent.name`   | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud account. |
| `--set soda.apikey.id`    | With the apikey.secret, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the cluster instead of exposing it here.|
| `--set soda.apikey.secret`    | With the apikey.id, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a [values.yml file](#deploy-using-a-values-yaml-file) to pass this value to the cluster instead of exposing it here.|
| `--namespace soda-agent` | Use the namespace value to identify the namespace in which to deploy the agent. 

<br />