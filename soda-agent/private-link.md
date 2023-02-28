---
layout: default
title: Connect a Soda Agent to Soda Cloud via AWS PrivateLink
description: Learn how to connect a Soda Agent to your Soda Cloud account via AWS PrivateLink, as an alternative to using API keys.
parent: Soda Agent
---

# Connect a Soda Agent to Soda Cloud via AWS PrivateLink
*Last modified on {% last_modified_at %}*

If you use AWS services for your infrastructure and you have deployed or will deploy a Soda Agent in an EKS cluster, you can use an <a href="https://aws.amazon.com/privatelink/" target="_blank">AWS PrivateLink</a> to provide private connectivity with Soda Cloud. <br />


## Create an Endpoint for a PrivateLink

1. Log in to your AWS console and navigate to your **VPC dashboard**.  
2. Follow the AWS documentation to <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html" target="_blank">Connect to an endpoint service as the service customer</a>. <br />For security reasons, Soda does not publish its **Service name**. Email <a href="mailto:support@soda.io">support@soda.io</a> with your **AWS account ID** to request the PrivateLink service name. Refer to <a href="https://docs.aws.amazon.com/signin/latest/userguide/console_account-alias.html" target="_blank"> AWS documentation</a> for instructions on how to obtain your account ID.
3. After creating the endpoint, return to the **VPC dashboard**. When the status of the endpoint becomes **Available**, the PrivateLink is ready to use. Be aware that this make take more than 10 minutes.
4. Deploy a Soda Agent to your AWS EKS cluster, or, if you have already deployed one, restart your Soda Agent to begin sending data to Soda Cloud via the PrivateLink.
```shell
kubectl -n soda-agent rollout restart deploy
```
5. After you have started the agent and validated that it is running, log into your Soda Cloud account, then navigate to **your avatar** > **Scans & Data** > **Agents** tab. Refresh the page to verify that you see the agent you just created in the list of Agents. 
![agent-deployed](/assets/images/agent-deployed.png){:height="700px" width="700px"}


## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
* Learn how to [deploy a Soda Agent in AWS]({% link soda-agent/deploy-aws.md %}).
<br />

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}