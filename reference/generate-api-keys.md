# Generate API keys

Soda Cloud uses API keys to securely communicate with other entities such as Soda Core and self-hosted Soda Agents, and to provide secure access to Soda Cloud via API.

There are two sets of API keys that you can generate and use with Soda Cloud:

* API keys for communicating with Soda Core and Soda Cloud API,
* API keys for communicating with a self-hosted Soda Agent

Note that you can use other authentication methods to access Soda Cloud metadata via the Rest API, such as HTTPBasic authentication with username and password, or authentication using tokens; use API keys to authenticate access if your organization employs Single Sign On (SSO) to access Soda Cloud.

### Generate API keys for use with Soda Core or a Soda Cloud API

1. In your Soda Cloud account, navigate to your avatar > Profile and the API Keys tab. Click the plus icon to generate new API keys.
2. Copy the syntax for the `soda_cloud` configuration, including the values API Key ID and API Key Secret, then apply the keys according to how you intend to use them



<figure><img src="../.gitbook/assets/Screenshot 2025-06-05 at 3.30.02 PM.png" alt=""><figcaption></figcaption></figure>

### Generate API keys for use with a Soda Agent

1. In your Soda Cloud account, navigate to your avatar > Data Sources, then navigate to the Agents tab. Click New Soda Agent.
2. Copy the values of the API Key ID and API Key Secret to a secure location, then apply the keys according to the instructions in the [Deploy a Soda Agent](../deployment-options/deploy-soda-agent/) documentation.
