---
description: >-
  Use Soda Cloud to set alert notification rules for multiple checks across
  datasets in your account.
---

# Set notification rules

In Soda Cloud, you can define where and when to send alert notifications when check results warn or fail. You can define these parameters for:

* **agreements** as you create or edit them; see [Define SodaCL checks](../soda-cl-overview/#define-sodacl-checks) for Use an agreement.
* **no-code checks** after you have created them; see [Define SodaCL checks](../soda-cl-overview/#define-sodacl-checks) for Use a no-code check.
* **multiple checks** by defining notification rules; read on!

For example, you can define a notification rule to instruct Soda Cloud to send an alert to your #sales-engineering Slack channel whenever a data quality check on the `snowflake_sales` data source fails.

## Default rules

By default, Soda Cloud establishes two notification rules on your Soda Cloud account by default. You can [edit or delete](notif-rules.md#edit-or-delete-rules) these rules if you wish.

|                                            |                                                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Send all check alerts to the Check Owner   | Soda Cloud sends all check results that fail or warn to the Soda Cloud user who created or owns an individual check.                            |
| Send all check alerts to the Dataset Owner | Soda Cloud sends all check results that fail or warn to the Soda Cloud user who created or owns the dataset to which the checks are associated. |

Refer to [Data source, dataset, agreement, and check owners](roles-global.md) for details on resource ownership.

## Set new rules

For a new rule, you define conditions for sending notifications including the severity of a check result and whom to notify when bad data triggers an alert.

In Soda Cloud, navigate to **your avatar** > **Notification Rules**, then click **New Notification Rule**. Follow the guided steps to complete the new rule. Use the table below for insight into the values to enter in the fields and editing panels.

| Field or Label   | Guidance                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name             | Provide a unique identifier for your notification.                                                                                                                                                                                                                 |
| For              | Select **All Checks**, or select **Selected Checks** to use conditions to identify specific checks to which you want the rule to apply. You can identify checks according to several attributes such as **Data Source Name**, **Dataset Name**, or **Check Name**. |
| Notify Recipient | Select the destination to which this rule sends its notifications. For example, you can send the rule’s notifications to a channel in Slack.                                                                                                                       |
| Notify About     | Identify the notifications this rule sends based on the severity of the check result: warn, fail, or both.                                                                                                                                                         |

## Edit or delete rules

Navigate to **your avatar** > **Notification Rules**, then click the stacked dots at the right of a check and select **Edit Notification Rule** or **Delete Notification Rule**.

## Go further

* Learn more about SodaCL [metrics and checks](../sodacl-reference/metrics-and-checks.md).
* Integrate your Soda Cloud account with your [Slack workspace](../integrate-soda/integrate-slack.md).
* Integrate your Soda Cloud account with a third-party tool using a [webhook](../integrate-soda/integrate-webhooks.md).

{% include "../.gitbook/includes/need-help-join-the-soda-co....md" %}
