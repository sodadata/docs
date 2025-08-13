# MS Teams

Configure Soda Cloud to connect your account to MS Teams so that you can:

* Send [notifications.md](../manage-issues/notifications.md "mention")for failed or warning check results to MS Teams channel
* Start conversations to track and resolve data quality [incidents.md](../manage-issues/incidents.md "mention")with MS Teams

## Configure an MS Teams integration <a href="#configure-an-ms-teams-integration" id="configure-an-ms-teams-integration"></a>

{% hint style="warning" %}
Only users with the **Manage Notification Rules** permission can create or edit rules. All users can view rules. Read about [global-and-dataset-roles.md](../organization-and-admin-settings/global-and-dataset-roles.md "mention")
{% endhint %}

1. As a user with permission to do so, log in to your Soda Cloud account, navigate to **your avatar** > **Organization Settings**, then select the **Integrations** tab.
2. In the **Add Integration** dialog box, select **Microsoft Teams**.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.03.35 PM (1).png" alt=""><figcaption></figcaption></figure>

3. In the first step of the guided integration workflow, follow the instructions to navigate to your MS Teams account to create a Workflow; see Microsoft’s documentation for [Creating a workflow from a channel in Teams](https://support.microsoft.com/en-us/office/creating-a-workflow-from-a-channel-in-teams-242eb8f2-f328-45be-b81f-9817b51a5f0e). Use the Workflow template to **Post to a channel when a webhook request is received**.
4.  In the last step of the guided Workflow creation, copy the URL created after successfully adding the workflow.\


    <figure><img src="https://docs.soda.io/assets/images/workflow-url.png" alt=""><figcaption></figcaption></figure>
5. Returning to Soda Cloud with the URL for Workflow, continue to follow the guided steps to complete the integration. Reference the following tables for guidance on the values to input in the guided steps.

**Configuration** tab:  Provide the following information

| Field or Label | Guidance                                                  |
| -------------- | --------------------------------------------------------- |
| Name           | Provide a unique name for your integration in Soda Cloud. |
| URL            | Input the Workflow URL you obtained from MS Teams.        |

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.04.17 PM.png" alt=""><figcaption></figcaption></figure>



**Scope** tab: select the Soda features (alert notifications and/or incidents) that can access the Slack integration.

| Field or Label                                                                         | Guidance                                                                                                                                                                           |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enable to send notifications to Microsoft Teams when a check result triggers an alert. | Check to allow users to select MS Teams as a destination for alert notifications when check results warn or fail.  [notifications.md](../manage-issues/notifications.md "mention") |
| Use Microsoft Teams to track and resolve incidents in Soda Cloud.                      | Check to automatically send incident information to an MS Teams channel.                                                                                                           |
| Channel URL                                                                            | Provide a channel identifier to which Soda Cloud sends all incident events.                                                                                                        |

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.04.48 PM.png" alt=""><figcaption></figcaption></figure>



### About integration scopes <a href="#about-integration-scopes" id="about-integration-scopes"></a>

#### Integration for alert notifications <a href="#integration-for-soda-cloud-alert-notifications" id="integration-for-soda-cloud-alert-notifications"></a>

Use the **Alert Notification** scope to enable Soda Cloud to send alert notifications to an MS Teams channel to notify your team of warn and fail check results. With such an integration, Soda Cloud enables users to select MS Teams as the destination for an alert notification of an individual check or checks that form a part of an agreement, or multiple checks. To send notifications that apply to multiple checks, see [notifications.md](../manage-issues/notifications.md "mention").

#### Integration for Soda Cloud incident <a href="#integration-for-soda-cloud-incidents" id="integration-for-soda-cloud-incidents"></a>

Use the **Incident** scope to notify your team when a new incident has been created in Soda Cloud. With such a scope, Soda Cloud displays an external link to the MS Teams channel in the **Incident Details**. Soda Cloud sends all incident events to only one channel in MS Teams. As such, you must provide a separate link in the **Channel URL** field in the **Define Scope** tab. For example, `https://teams.microsoft.com/mychannel`. To obtain the channel link in MS Teams, right-click on the channel name in the overview sidebar. Refer to [incidents.md](../manage-issues/incidents.md "mention") for more details about using incidents in Soda Cloud.

## Troubleshoot <a href="#troubleshoot" id="troubleshoot"></a>

**Problem:** You encounter an error that reads, “Error encountered while rendering this message.”

**Solution:** A fix is [documented](https://www.anyviewer.com/kb/microsoft-teams-error-encountered-while-rendering-this-message-2996-ac.html), the short version of which is as follows.

1. Restart MS Teams.
2. Clear your cache and cookies.
3. If you have not already done so, update to the latest version of MS Teams.

\
