---
layout: default
title: Integrate Soda Cloud with Slack
description: Integrate your Slack workspace in your Soda Cloud account so that Soda Cloud can send Slack notifications to your team when a data issue triggers an alert.
parent: Integrate Soda
---

# Integrate Soda Cloud with Slack

{% include integrate-slack-steps.md %}

## Set a default Slack channel for notifications

If you wish, you can configure a setting in Soda Cloud to set a default Slack channel that Soda Cloud applies to all monitors.

1. In your Soda Cloud account, go to **your avatar** > **Organization Settings**.
2. Go to the **Integrations** tab, then click the stacked dots to the right of the Slack integration. Select **Edit Integration Settings**.
3. In the **Slack Channels** dialog, go to the **Notifications** tab.
4. Select a default Slack channel to which sends Soda Cloud notifications for all existing and new monitors.
5. **Save** for your changes to take effect.


## Go further

* [Connect]({% link soda-cloud/connect_to_cloud.md %}) Soda SQL to your Soda Cloud account.
* [Create an alert]({% link soda-cloud/monitors.md %}) to send Slack notifications when a scan surfaces a data issue.
* Learn more about using Slack to collaborate on resolving [Incidents]({% link soda-cloud/incidents.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.
<br />

---
{% include docs-footer.md %}