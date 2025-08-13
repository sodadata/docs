---
description: >-
  Generate API keys to securely connect Soda Library or a Soda Agent to Soda
  Cloud, or to access Soda Cloud via API.
---

# Generate API keys

Soda Cloud uses API keys to securely communicate with other entities such as Soda Library and self-hosted Soda Agents, and to provide secure access to Soda Cloud via API.

There are two sets of API keys that you can generate and use with Soda Cloud:

* API keys for communicating with **Soda Library**, the **Soda Cloud API** or **Soda Cloud Reporting API**, and the Soda Library Docker image that the **GitHub Action for Soda** uses
* API keys for communicating with a self-hosted **Soda Agent**

Note that you can use other authentication methods to access Soda Cloud metadata via the Reporting API such as HTTPBasic authentication with username and password, or authentication using tokens; use API keys to authenticate access if your organization employs Single Sign On (SSO) to access Soda Cloud.

## Generate API keys for use with Soda Library or a Soda Cloud API

1. In your Soda Cloud account, navigate to **your avatar** > **Profile**, then navigate to the **API Keys** tab. Click the plus icon to generate new API keys.
2. Copy the syntax for the `soda_cloud` configuration, including the values **API Key ID** and **API Key Secret**, then apply the keys according to how you intend to use them:
   * for use in a `configuration.yml` file: follow [Configure Soda](../quick-start-sip/install.md#configure-soda)
   * for use with the Reporting API if your organization uses Single Sign On (SSO) to access Soda Cloud: follow [Reporting API authentication](broken-reference)

## Generate API keys for use with a Soda Agent

1. In your Soda Cloud account, navigate to **your avatar** > **Data Sources**, then navigate to the **Agents** tab. Click **New Soda Agent**.
2. Copy the values of the **API Key ID** and **API Key Secret** to a secure location, then apply the keys according to the instructions in the [Deploy a Soda Agent](../quick-start-sip/deploy.md#deploy-an-agent) documentation.

## Go further

* Learn more about integrating with third-party tools via a [webhook](../integrate-soda/integrate-webhooks.md).
* Access a list of [all integrations](https://www.soda.io/integrations) that Soda Cloud supports.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
