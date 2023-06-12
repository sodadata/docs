---
layout: default
title: Generate API keys
description: Generate API keys to securely connect Soda Core or a Soda Avent to Soda Cloud, or to access Soda Cloud via API.
parent: Soda Cloud
---

# Generate API keys
*Last modified on {% last_modified_at %}*

Soda Cloud uses API keys to securely communicate with other entities such as Soda Core and Soda Agents, and to provide secure access to metadata in Soda Cloud via the Reporting API. 

There are two sets of API keys that you can generage and use with Soda Cloud:
* API keys for communicating with **Soda Core**, and via the **Reporting API**
* API keys for communicating with a **Soda Agent**

Note that you can use other authentication methods to access Soda Cloud metadata via the Reporting API such as HTTPBasic authentication with username and password, or authentication using tokens; use API keys to authenticate access if your organization employs Single Sign On (SSO) to access Soda Cloud.

## Generate API keys for use with Soda Core or the Reporting API

1. In your Soda Cloud account, navigate to **your avatar** > **Profile**, then navigate to the **API Keys** tab. Click the plus icon to generate new API keys.
2. Copy the syntax for the `soda_cloud` configuration, including the values **API Key ID** and **API Key Secret**, then apply the keys according to how you intend to use them:
* for use with Soda Library: follow [Install Soda Library]({% link soda-library/install.md %})
* for use with the Reporting API if your organization uses Single Sign On (SSO) to access Soda Cloud: follow [Reporting API authentication]({% link api-docs/reporting-api-v1.md %}#/#authentication) 


## Generate API keys for use with a Soda Agent

1. In your Soda Cloud account, navigate to **your avatar** > **Scans & Data**, then navigate to the **Agents** tab. Click **New Soda Agent**.
2. Copy the values of the **API Key ID** and **API Key Secret** to a secure location, then apply the keys according to the instructions in the [Deploy a Soda Agent]({% link soda-agent/deploy.md %}#create-a-soda-cloud-account-and-api-keys) documentation.

## Go further

* Need help? Join the <a href="https://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />
* Learn more about integrating with third-party tools via a [webhook]({% link soda/integrate-webhooks.md %}).
* Access a list of <a href="https://www.soda.io/integrations" target="_blank">all integrations</a> that Soda Cloud supports.

---

Was this documentation helpful?

<!-- LikeBtn.com BEGIN -->
<span class="likebtn-wrapper" data-theme="tick" data-i18n_like="Yes" data-ef_voting="grow" data-show_dislike_label="true" data-counter_zero_show="true" data-i18n_dislike="No"></span>
<script>(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");</script>
<!-- LikeBtn.com END -->

{% include docs-footer.md %}