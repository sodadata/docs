# Slack

Configure Soda Cloud to connect your account to Slack  so that you can:

* Send [notifications.md](../manage-issues/notifications.md "mention")for failed or warning check results to  Slack channels
* Start conversations to track and resolve data quality [incidents.md](../manage-issues/incidents.md "mention")with Slack channels



### Configure a Slack integration <a href="#configure-an-ms-teams-integration" id="configure-an-ms-teams-integration"></a>

{% hint style="warning" %}
Only users with the **Manage Notification Rules** permission can create or edit rules. All users can view rules. Read about [global-and-dataset-roles.md](../organization-and-admin-settings/global-and-dataset-roles.md "mention")
{% endhint %}

1. In Soda Cloud, navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Choose Slack and proceed

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.00.17 PM.png" alt=""><figcaption></figcaption></figure>

3. Follow the guided steps to authorize Soda Cloud to connect to your Slack workspace. If necessary, contact your organization’s Slack Administrator to approve the integration with Soda Cloud.

**Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.

Note that Soda caches the response from the Slack API, refreshing it hourly. If you created a new public channel in Slack to use for your integration with Soda, be aware that the new channel may not appear in the **Configuration** tab in Soda until the hourly Slack API refresh is complete.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.07.04 PM.png" alt=""><figcaption></figcaption></figure>

**Scope** tab: select the Soda features (alert notifications and/or incidents) that can access the Slack integration.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.06.55 PM.png" alt=""><figcaption></figcaption></figure>



### About integration scopes <a href="#about-integration-scopes" id="about-integration-scopes"></a>

#### Integration for alert notifications <a href="#integration-for-soda-cloud-alert-notifications" id="integration-for-soda-cloud-alert-notifications"></a>

You can use this integration to enable Soda Cloud to send alert notifications to a Slack channel to notify your team of warn and fail check results.

With such an integration, Soda Cloud enables users to select a Slack channel as the destination for an alert notification of an individual check or checks that form a part of an agreement, or multiple checks.

To send notifications that apply to multiple checks, see [notifications.md](../manage-issues/notifications.md "mention")

#### Integration for Soda Cloud incidents <a href="#integration-for-soda-cloud-incidents" id="integration-for-soda-cloud-incidents"></a>

You can use this integration to notify your team when a new incident has been created in Soda Cloud. With such an integration, Soda Cloud displays an external link to an incident-specific Slack channel in the **Incident Details**.

