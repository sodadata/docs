Use this integration to enable Soda to send alert notifications to a Slack channel to notify your team of warn and fail check results. If your team does not use Slack, you can skip this step and Soda sends alert notifications via email.

1. Log in to your Soda Cloud account and navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Follow the guided steps to authorize Soda to connect to your Slack workspace. If necessary, contact your organization's Slack Administrator to approve the integration with Soda. 
* **Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.
* **Scope** tab: select the Soda features, both alert notifications and incidents, which can access the Slack integration. 
3. To dictate where Soda must send alert notifications for checks that fail, create a new notification rule. Navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule directly Soda to send check results that fail to a specific channel in your Slack workspace.

Learn more about [Integrating with Slack]({% link soda/integrate-slack.md %}).<br />
Learn more about [Setting notification rules]({% link soda-cloud/notif-rules.md %}).