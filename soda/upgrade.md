---
layout: default
title: Upgrade, redploy, or uninstall Soda
description: Learn how to upgrade or uninstall Soda Library, or redploy a Soda Agent.
parent: Get started
redirect_from:
- /soda-agent/redeploy.html
- /soda-agent/upgrade.html
---

# Upgrade, redeploy, or uninstall Soda
*Last modified on {% last_modified_at %}*

[Redeploy a Soda Agent](#redeploy-a-soda-agent)<br />
[Upgrade a Soda Agent](#upgrade-a-soda-agent)<br />
[Upgrade Soda Library](#upgrade-soda-library)<br />
[Uninstall Soda Library](#uninstall-soda-library)<br />
[Migrate from Soda Core](#migrate-from-soda-core)<br />

## Redeploy a Soda Agent

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

## Upgrade a Soda Agent 

The **Soda Agent** is a Helm chart that you deploy on a Kubernetes cluster and connect to your Soda Cloud account using API keys.

To take advantage of new or improved features and functionality in the Soda Agent, including new features in the Soda Library, you can upgrade your agent when a new version becomes available in <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>.

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
* API keys - the values Soda Cloud created which you used to run the agent application in the cluster<br />
Access the first three values by running the following command.
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

## Upgrade Soda Library

To upgrade your existing Soda Library tool to the latest version, use the following command, replacing `redshift` with the install package that matches the type of data source you are using.
```shell
pip install -i https://pypi.cloud.soda.io soda-redshift -U
```


## Uninstall Soda Library

1. (Optional) From the command-line, run the following command to determine which Soda packages exist in your environment.
```shell
pip freeze | grep soda
```
2. (Optional) Run the following command to uninstall a specific Soda package from your environment.
```shell
pip uninstall soda-postgres
```
3. Run the following command to uninstall all Soda packages from your environment, completely.
```shell
pip freeze | grep soda | xargs pip uninstall -y
```


## Migrate from Soda Core

Soda Core, the free, open-source Python library and CLI tool upon which Soda Library is built, continues to exist as an OSS project in <a href="https://github.com/sodadata/soda-core" target="_blank">GitHub</a>. To migrate from an existing Soda Core installation to Soda Library, simply uninstall the old and install the new from the command-line. 

1. Uninstall your existing Soda Core packages using the following command.
```shell
pip freeze | grep soda | xargs pip uninstall -y
```
2. Install a Soda Library package that corresponds to your data source. Your new package automatically comes with a 45-day free trial. Our Soda team will contact you with licensing options after the trial period.
```shell
pip install -i https://pypi.cloud.soda.io soda-postgres
```
3. If you had connected Soda Core to Soda Cloud, you do not need to change anything for Soda Library to work with your Soda Cloud account. <br /> If you had not connected Soda Core to Soda Cloud, you need to connect Soda Library to Soda Cloud. Soda Library requires API keys to validate licensing or trial status and run scans for data quality. See [Configure Soda]({% link soda-library/install.md %}#configure-soda) for instructions.
4. You *do not need* to adjust your existing `configuration.yml` or `checks.yml` files which will continue to work as before.


## Go further

* Learn more about the ways you can use Soda in [Use case guides]({% link soda/use-case-guides.md %}).
* Write [custom SQL checks]({% link soda-cl/user-defined.md %}) for your own use cases.
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}