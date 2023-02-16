---
layout: default
title: Connect a Soda Agent to Soda Cloud via AWS PrivateLink
description: Learn how to connect a Soda Agent to your Soda Cloud account via AWS PrivateLink, as an alternative to using API keys.
parent: Soda Agent
---

# Connect a Soda Agent to Soda Cloud via AWS PrivateLink
*Last modified on {% last_modified_at %}*

If you use AWS services for your infrastructure have deployed a Soda Agent in an EKS cluster, you can use an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to securely connect it with, and send information to, Soda Cloud. 

Alternatively, you can send information from a Soda Agent to your Soda Cloud account using API keys. Refer to the [Amazon Elastic Kubernetes Service (EKS)]({% link soda-agent/deploy-aws.md %}#create-a-soda-cloud-account-and-api-keys) deployment documentation for details.

## Connect to Soda endpoints

1. Follow the AWS documentation to <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html" target="_blank">Connect to endpoint services as the service customer</a>. Refer to the [table below](#aws-privatelink-setup-details) for guidance on the values to provide during setup.
2. Once configured, follow the steps to [Deploy a Soda Agent]({% link soda-agent/deploy-aws.md %}#deploy-a-soda-agent) using Helm *without* including values for the **API Key ID** and **API Key Secret**, and instead using `soda.agent.TBD`, as in the following example of the helm deploy command.
```shell
helm install soda-agent soda-agent/soda-agent \
    --set soda.agent.target=aws-eks \
    --set soda.agent.name=myuniqueagent \
    --set soda.agnet.tbd=*** \
    --set soda.core.idle=true \
    --set soda.core.replicas=1 \
    --namespace soda-agent
```
3. After you have deployed the agent and validated that it is running, log into your Soda Cloud account, then navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}

### AWS PrivateLink setup details

| Field | Value |
| ----- | ----- |
| Name tag | myuniqueagent |
| Service category | PrivateLink Ready partner services (or Other endpoint services?) |
| Service name | (several, I imagine, just like DataDog with a service name for each endpoint?) |
| VPC | Identify the VPC in your network in which to create the endpoint. |



## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn how to [deploy a Soda Agent in AWS using API keys]({% link soda-agent/deploy-aws.md %}#create-a-soda-cloud-account-and-api-keys) for the first time.
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}