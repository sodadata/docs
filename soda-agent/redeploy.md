---
layout: default
title: Redeploy a Soda Agent
description: Redeploy a Soda Agent in a Kubernetes cluster.
parent: Soda Agent
---

# Redeploy a Soda Agent
*Last modified on {% last_modified_at %}*

The **Soda Agent** is a tool that empowers Soda Cloud users to securely access data sources to scan for data quality. Create a Kubernetes cluster in a cloud services provider environment, then use Helm to deploy a Soda Agent in the cluster. [Read more]({% link soda-agent/basics.md %}).

When you delete the Soda Agent Helm chart from your cluster, you also delete all the agent resources on your cluster. However, if you wish to redeploy the previously-registered agent (use the same name), you need to specify the agent ID in your override values in your values YAML file.

1. In Soda Cloud, navigate to **your avatar** > **Scans & Data** > **Agents** tab.
2. Click to select the agent you wish to redeploy, then copy the agent ID of the previously-registered agent from the URL.<br /><br />
For example, in the following URL, the agent ID is the long UUID at the end. `https://cloud.soda.io/agents/842feab3-snip-87eb-06d2813a72c1`.<br /><br />
Alternatively, if you use the base64 CLI tool, you can run the following command to obtain the agentID.
```shell
 kubectl get secret/soda-agent-id -n soda-agent --template={% raw %}{{.data.SODA_AGENT_ID}}{% endraw %} | base64 --decode
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
kubectl get secret/soda-agent-apikey -n soda-agent --template={% raw %}{{.data.SODA_API_KEY_ID}}{% endraw %} | base64 --decode
```
```shell
kubectl get secret/soda-agent-apikey -n soda-agent --template={% raw %}{{.data.SODA_API_KEY_SECRET}}{% endraw %} | base64 --decode
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


## Go further

* Learn how to [deploy a Soda Agent]({% link soda-agent/deploy.md %}) for the first time.
* Learn more about securely accessing login credentials.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}