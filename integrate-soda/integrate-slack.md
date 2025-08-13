---
description: >-
  Integrate your Slack workspace in your Soda Cloud account so that Soda Cloud
  can send Slack notifications to your team when a data issue triggers an alert.
---

# Integrate Soda with Slack

As a user with permission to do so in your Soda Cloud account, you can integrate your Slack workspace in your **Soda Cloud** account so that Soda Cloud can interact with individuals and channels in the workspace. Use the Slack integration to:

* send notifications to Slack when a check result triggers an alert
* create a private channel whenever you open new incident to investigate a failed check result
* track Soda Discussions wherein your fellow Soda users collaborate on data quality checks

1. In Soda Cloud, navigate to **your avatar** > **Organization Settings**, then navigate to the **Integrations** tab and click the **+** icon to add a new integration.
2. Follow the guided steps to authorize Soda Cloud to connect to your Slack workspace. If necessary, contact your organization’s Slack Administrator to approve the integration with Soda Cloud.
   * **Configuration** tab: select the public channels to which Soda can post messages; Soda cannot post to private channels.
   * **Scope** tab: select the Soda features (alert notifications and/or incidents) which can access the Slack integration.

Note that Soda caches the response from the Slack API, refreshing it hourly. If you created a new public channel in Slack to use for your integration with Soda, be aware that the new channel may not appear in the **Configuration** tab in Soda until the hourly Slack API refresh is complete.

## Integration for Soda Cloud alert notifications

You can use this integration to enable Soda Cloud to send alert notifications to a Slack channel to notify your team of warn and fail check results.

With such an integration, Soda Cloud enables users to select a Slack channel as the destination for an alert notification of an individual check or checks that form a part of an agreement, or multiple checks.

To send notifications that apply to multiple checks, see [Set notification rules](../collaborate/notif-rules.md).

## Integration for Soda Cloud incidents

You can use this integration to notify your team when a new incident has been created in Soda Cloud. With such an integration, Soda Cloud displays an external link to an incident-specific Slack channel in the **Incident Details**.

Refer to [Incidents](broken-reference) for more details about using incidents in Soda Cloud.

## Set a default Slack channel for notifications

You can set a default Slack channel that Soda Cloud applies to all alert notifications. If you have not already set the default Slack channel when you initially set up the integration, you can edit it to set the default.

1. In your Soda Cloud account, go to **your avatar** > **Organization Settings**.
2. Go to the **Integrations** tab, then click the stacked dots to the right of the Slack integration. Select **Edit Integration Settings**.
3. In the **Slack Channels** dialog, go to the **Scope** tab.
4. Select a default Slack channel to which sends Soda Cloud notifications for all existing and new checks. **Save** for your changes to take effect.

## Go further

* Set [notification rules](../collaborate/notif-rules.md) that apply to multiple checks in your account.
* Learn more about using Slack to collaborate on resolving [Incidents](broken-reference).
* Access a list of [all integrations](https://www.soda.io/integrations) that Soda Cloud supports.

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
