# Integrations

Soda offers seamless integrations with many tools across your data stack. Whether you're aligning data governance efforts, collaborating across teams, or triggering workflows, you can enhance Soda’s observability capabilities with the following connections:

## Supported integrations

### Messaging and collaboration

* [ms-teams.md](ms-teams.md "mention")
* [slack.md](slack.md "mention")
* [jira.md](jira.md "mention")
* [servicenow.md](servicenow.md "mention")
* [webhook.md](webhook.md "mention")

> For more details on notification rules, see the [Notification rules documentation](../manage-issues/notifications.md).

### Catalogs and governance tools

* [alation.md](alation.md "mention")
* [atlan.md](atlan.md "mention")
* [metaphor.md](metaphor.md "mention")
* [purview.md](purview.md "mention")

### Data transformation and code repositories

* [github.md](github.md "mention")

***

## Create an Integration

To create an integration:

1. Go to the **Integrations** section in **Settings**.
2. Click the **+** button to add a new integration.
3. Select the integration type (**Slack**, **Microsoft Teams**, or **Webhook**).
4. Follow the setup steps for the chosen integration
5. Click **Save** to activate the integration.

***

## Edit an Integration

You can update existing integrations if connection details or configurations change.

To edit an integration:

1. Go to the **Integrations** section in **Settings**.
2. Find the integration you want to update.
3. Click the context menu and select **Edit Integration Settings**.
4. Update the configuration as needed.
5. Click **Save** to apply the changes.

## Pause an Integration

You can temporarily pause an integration if you want to stop sending notifications and incident updates without fully deleting the configuration. The integration will no longer be available in notification rules.

To pause an integration:

1. Go to the **Integrations** section in **Settings**.
2. Locate the integration you want to pause.
3. Change the status to "Paused" in the table
4. Select **Pause**.

While paused, the integration will no longer send any notifications. You can resume it at any time by following the same steps and selecting **Active**.
