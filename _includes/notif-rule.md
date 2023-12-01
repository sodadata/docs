For a new rule, you define conditions for sending notifications including the severity of a check result and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule. Use the table below for insight into the values to enter in the fields and editing panels.

| Field or Label  | Guidance |
| -----------------  | ----------- |
| Name  | Provide a unique identifier for your notification. |
| For | Select **All Checks**, or select **Selected Checks** to use conditions to identify specific checks to which you want the rule to apply. You can identify checks according to several attributes such as **Data Source Name**, **Dataset Name**, or **Check Name**.|
| Notify Recipient | Select the destination to which this rule sends its notifications. For example, you can send the rule's notifications to a channel in Slack. |
| Notify About | Identify the notifications this rule sends based on the severity of the check result: warn, fail, or both.|