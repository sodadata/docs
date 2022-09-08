---
layout: default
title: Decommission a Soda Agent
description: Access instructions on how to remove a Soda Agent and deccommission a cluster.
parent: Soda Agent
---

# Decommission a Soda Agent and the EKS cluster ![preview](/assets/images/preview.png){:height="70px" width="70px" align="top"}

{% include banner-preview.md %}

1. Uninstall the Soda Agent in the cluster.
```shell
helm delete soda-agent -n soda-agent
```
2. Remove the Fargate profile.
```shell
eksctl delete fargateprofile --cluster soda-agent --name soda-agent-profile
```
3. Wait for the Fargate profile deletion to complete, then delete the EKS cluster itself.
```shell
eksctl delete cluster --name soda-agent
```
4. (Optional) Access your <a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home" target="_blank"> CloudFormation console</a>, then click **Stacks** to view the status of your decommissioned cluster. <br /> If you do not see your Stack, use the region drop-down menu at upper-right to select the region in which you created the cluster.



## Go further

* Access instructions on how to [redeploy]({% link soda-agent/deploy.md %}#redeploy-an-agent) a Soda Agent on an existing cluster.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}