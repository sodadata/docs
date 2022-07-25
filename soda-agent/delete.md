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
eksctl delete fargateprofile --cluster soda-agent --name soda-agent-profile --namespace soda-agent
```
3. Delete the EKS cluster itself.
```shell
eksctl delete cluster --name soda-agent
```
4. (Optional) Access your <a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home" target="_blank"> CloudFormation console</a>, then click **Stacks** to view the status of your decommissioned cluster.



## Go further

* Access instructions on how to [redeploy]({% link soda-agent/deploy.md %}#redeploy-an-agent) a Soda Agent on an existing cluster.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}