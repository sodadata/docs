# Notifications

Soda’s **notification system** helps you stay informed when data issues occur—whether it’s a failed check or an anomaly detected through metric monitoring. Notifications are dynamically dispatched using **notification rules**, allowing you to target alerts based on specific properties, attributes, or datasets.

## How Notification Rules Work

Notification rules define **when** and **to whom** a notification is sent. Rules can be configured to match specific checks or anomalies, ensuring the right people are notified at the right time.

## Creating a Notification Rule

{% hint style="warning" %}
Only users with the **Manage Notification Rules** permission can create or edit rules. All users can view rules. Read about [global-and-dataset-roles.md](../organization-and-admin-settings/global-and-dataset-roles.md "mention")
{% endhint %}

To create a new notification rule:

1. Click on your profile in Soda Cloud and select **Notification Rules** from the menu.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.53.45 PM.png" alt=""><figcaption></figcaption></figure>

2. Click **New Rule**.

<figure><img src="../.gitbook/assets/notification-rules-0 (1).png" alt=""><figcaption></figcaption></figure>

3. Provide a **name** for the rule.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 9.02.10 PM (1).png" alt=""><figcaption></figcaption></figure>

4. Define the Rule Scope

**Checks**:

* **All checks**: The rule applies to every check in your organization.
* **Specific checks**: Build custom rules by filtering on check properties, dataset properties, or attributes.

<figure><img src="../.gitbook/assets/notification-rule-3 (1).png" alt=""><figcaption></figcaption></figure>

* **Anomalies from Metric Monitoring**: Select specific datasets where the rule applies.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 8.56.32 PM.png" alt=""><figcaption></figcaption></figure>

5. Define the **recipients** (users, groups, or integrations like Slack, Teams, or webhooks).

<figure><img src="../.gitbook/assets/notification-rule-4.png" alt=""><figcaption></figcaption></figure>

6. ...and choose the **alert type (only applicable for checks, not anomalies)**:

* **Only failures**
* **Failures and warnings**
* **All statuses**

7. **Save** to create the notification rule

***

## Pausing Notification Rules

You can **pause a notification rule** at any time to temporarily disable alerts without deleting the rule.

<figure><img src="../.gitbook/assets/notification-rules-pause.png" alt=""><figcaption></figcaption></figure>
