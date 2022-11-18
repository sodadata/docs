## Redeploy an agent

When you delete the Soda Agent Helm chart from your cluster, you also delete all the agent resources on your cluster. However, if you wish to redeploy the previously-registered agent (use the same name), you need to specify the agent ID in your override values in your values YAML file.

1. In Soda Cloud, navigate to **your avatar** > **Scans & Data** > **Agents** tab.
2. Click to select the agent you wish to redeploy, then copy the agent ID of the previously-registered agent from the URL.<br />
For example, in the following URL, the agent ID is the long UUID at the end. `https://dev.sodadata.io/agents/842feab3-snip-87eb-06d2813a72c1`.
3. Open your `values.yml` file, then add the `id` key:value pair under `agent`, using the agent ID you copied from the URL as the value.
```yaml
soda:
  apikey:
        id: "<uuid>"
        secret: "<secret>"
  agent:
        id: "842feab3-snip-87eb-06d2813a72c1"
        loglevel: "INFO"
        name: "<YourAgentName>"
```
4. In the same directory in which the `values.yml` file exists, use the following command to install the Soda Agent helm chart.
```shell
helm install soda-agent soda-agent/soda-agent \
  --values values.yml \
  --namespace soda-agent
```
5. (Optional) Validate the Soda Agent deployment by running the following command:
```shell
kubectl describe pods
```
