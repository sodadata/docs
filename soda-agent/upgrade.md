---
layout: default
title: Upgrade a Soda Agent
description: Learn how to upgrade a Soda Agent to a newer version.
parent: Soda Agent
---

# Upgrade a Soda Agent ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

To take advantage of new or improved features and functionality in the Soda Agent, you can upgrade your agent when a new version becomes available <a href="https://artifacthub.io/packages/helm/soda-agent/soda-agent" target="_blank">ArtifactHub.io</a>.

1. Use the following command to find out which version of the Soda Agent Helm chart you have deployed on your EKS cluster.
```shell
helm list -n soda-agent
```
2. Use the following command to search ArifactHub for the most recent version of the Soda Agent Helm chart.
```shell
helm search hub soda-agent
```
3. Use the following command to upgrade the Helm repository.
```shell
helm repo update
```
4. Upgrade the Soda Agent Helm chart.
```shell
helm upgrade soda-agent soda-agent/soda-agent \
   --values values-local.yml --namespace soda-agent
```



## Go further

* Access instructions for how to [deploy a Soda Agent]({% link soda-agent/deploy.md %}).
* Learn the [Soda Agent basics]({% link soda-agent/basics.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}