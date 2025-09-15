# Redeploy Soda Agent

When you delete the Soda Agent Helm chart from your cluster, you also delete all the agent resources on your cluster. However, if you wish to redeploy the previously-registered agent (using the same name), you need to specify the agent ID in your override values in your values YAML file.

1. In Soda Cloud, navigate to **your avatar** > **Agents**.
2. Click to select the agent you wish to redeploy, then copy the agent ID of the previously-registered agent from the URL.\
   \
   For example, in the following URL, the agent ID is the long UUID at the end. `https://cloud.soda.io/agents/842feab3-snip-87eb-06d2813a72c1`.\
   \
   Alternatively, if you use the base64 CLI tool, you can run the following command to obtain the agentID.

```shell
 kubectl get secret/soda-agent-id -n soda-agent --template={{.data.SODA_AGENT_ID}} | base64 --decode
```

3. Open your `values.yml` file, then add the `id` key:value pair under `agent`, using the agent ID you copied from the URL as the value.

```yaml
soda:
  apikey:
        id: "***"
        secret: "***"
  agent:
        id: "842feab3-snip-87eb-06d2813a72c1"
        name: "myuniqueagent"
```

4. To redeploy the agent, you need to provide the values for the API keys the agent uses to connect to Soda Cloud in the values YAML file. Access the values by running the following command, replacing the `soda-agent` values with your own details, then paste the values into your values YAML file.

```shell
helm get values -n soda-agent soda-agent
```

Alternatively, if you use the base64 CLI tool, you can run the following commands to obtain the API key and API secret, respectively.

```shell
kubectl get secret/soda-agent-apikey -n soda-agent --template={{.data.SODA_API_KEY_ID}} | base64 --decode
```

```shell
kubectl get secret/soda-agent-apikey -n soda-agent --template={{.data.SODA_API_KEY_SECRET}} | base64 --decode
```

5. In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.

```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```

6. Validate the Soda Agent deployment by running the following command:

```shell
kubectl describe pods
```
