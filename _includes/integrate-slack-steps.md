As an [Admin]({% link soda-cloud/roles-and-rights.md %}) on your Soda Cloud account, integrate your Slack workspace in your **Soda Cloud** account so that Soda Cloud can interact with individuals and channels in the workspace. Use the Slack integration to:

* send notifications to Slack when a check result triggers an alert
* create a private channel whenever you open new incident to investigate a failed check result
* track Soda Discussions wherein your fellow Soda users collaborate on data quality checks

1. In Soda Cloud, navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Follow the guided steps to authorize Soda Cloud to connect to your Slack workspace. If necessary, contact your organization's Slack Administrator to approve the integration with Soda Cloud. 
* **Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.
* **Scope** tab: select the Soda features (alert notifications and/or incidents) which can access the Slack integration. 

Note that Soda caches the response from the Slack API, refreshing it hourly. If you created a new public channel in Slack to use for your integration with Soda, be aware that the new channel may not appear in the **Configuration** tab in Soda until the hourly Slack API refresh is complete.
