{% include code-header.html %}
```shell
helm install soda-agent soda-agent/soda-agent \
  --set soda.agent.name=myuniqueagent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
  --namespace soda-agent
```

| Command part | Description   |
|--------------|---------------|
| `helm install` | the action helm is to take | 
| `soda-agent` (the first one) | a release named soda-agent on your cluster |
| `soda-agent` (the second one)| the name of the helm repo you installed|
| `soda-agent` (the third one) | the name of the helm chart that is the Soda Agent |

The `--set` options either override or set some of the values defined in and used by the Helm chart. You can override these values with the `--set` files as this command does, or you can specify the override values using a values.yml file. 

| Parameter key      | Parameter value, description   |
|-----------------|--------------------------------|
| `--set soda.agent.name`   | A unique name for your Soda Agent. Choose any name you wish, as long as it is unique in your Soda Cloud account. |
| `--set soda.apikey.id`    | With the apikey.secret, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a values.yml file to pass this value to the cluster instead of exposing it here.|
| `--set soda.apikey.secret`    | With the apikey.id, this connects the Soda Agent to your Soda Cloud account. Use the value you copied from the dialog box in Soda Cloud when adding a new agent. You can use a values.yml file to pass this value to the cluster instead of exposing it here.|
| `--set soda.agent.logFormat` | (Optional) Specify the format for log output: `raw` for plain text, or `json` for JSON format. |
| `--set soda.agent.loglevel` | (Optional) Specify the leve of log information you wish to see when deploying the agent: `ERROR`, `WARN`, `INFO`, `DEBUG`, or `TRACE`.
| `--namespace soda-agent` | Use the namespace value to identify the namespace in which to deploy the agent. |

<br />
