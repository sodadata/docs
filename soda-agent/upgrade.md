---
layout: default
title: Upgrade a Soda Agent
description: Learn how to upgrade a Soda Agent to a newer version.
parent: Soda Agent
---

# Upgrade a Soda Agent 
*Last modified on {% last_modified_at %}*

To take advantage of new or improved features and functionality in the Soda Agent, you can upgrade your agent when a new version becomes available <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>.

1. To upgrade the agent, you need to provide the values for the API keys the agent uses to connect to Soda Cloud using flags in the helm upgrade command, or in a values YAML file. Access the values by running the following command, replacing the placeholder values with your own details.
```shell
helm get values -n <namespace> <release name>
```
2. Use the following command to find out which version of the Soda Agent Helm chart you have deployed on your cluster.
```shell
helm list -n soda-agent
```
3. Use the following command to search ArifactHub for the most recent version of the Soda Agent Helm chart.
```shell
helm search hub soda-agent
```
4. Use the following command to upgrade the Helm repository.
```shell
helm repo update
```
5. Upgrade the Soda Agent Helm chart. 
```shell
helm upgrade soda-agent soda-agent/soda-agent \
  --set soda.apikey.id=*** \
  --set soda.apikey.secret=**** \
```
OR
```shell
helm upgrade soda-agent soda-agent/soda-agent \
   --values values-local.yml --namespace soda-agent
```

<br />


## Go further

* Access instructions for how to [deploy a Soda Agent]({% link soda-agent/deploy.md %}).
* Learn the [Soda Agent basics]({% link soda-agent/basics.md %}).
* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}