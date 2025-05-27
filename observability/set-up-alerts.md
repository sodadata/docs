---
layout: default
title: Set up alerts
description: Set up alerts
parent: Metric Monitors
nav_order: 564
---

# Set alert notification rules

Ascribing to a "no noise" policy, Soda enables you to define rules to customize the alert notifications you receive when scan results warn or fail. For example, you can define a notification rule to instruct Soda Cloud to send an alert to your #sales-engineering Slack channel whenever an anomaly on the snowflake_sales data is detected.

In Soda Cloud, navigate to your **Metric Monitors** dashboard, then click the **bell** icon for the metric monitor you want to set up an alert for.


![with-library](/assets/images/add-notification-rule-bell.png){:height="350"}

Follow the guided steps to complete the new rule.

![with-library](/assets/images/add-notification-rule-popup.png){:height="350"}

Check out the integration guides to learn how to receive alerts on [Slack]({% link soda/integrate-slack.md %}) and [MS Teams]({% link soda/integrate-msteams.md %}).


## What's Next?

- [Explore how to update any of the the Metric Monitors settings]({% link observability/update-settings.md %})