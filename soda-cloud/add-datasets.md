---
layout: default
title: Add datasets
parent: Soda Cloud
---

# Add datasets in Soda Cloud

When you sign up for a new Soda Cloud account, the first thing to do is to use Soda SQL to scan and onboard a dataset. To do so, you install Soda SQL, a command-line developer tool, and connect it to your Soda Cloud account to add datasets. See [Connect to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}) for details.

![onboarding-add-datasets](/assets/images/onboarding-add-datasets.png){:width="350px"}

## After the first scan

After you complete your first scan of your data, the **Datasets** dashboard will display your new dataset.

By default, Soda Cloud automatically adds the **everyone** group to the new datasets and assigns the group the role of Editor. Effectively, this means that every user in the organization has the rights of an Editor when making changes to the new datasets or adding or editing monitors associated with the datasets. Refer to [Change access to a dataset]({% link soda-cloud/roles-and-rights.md %}#change-access-to-a-dataset) to adjust the roles for the group or individual Users in your organization.

Soda Cloud also automatically creates a **row count anomaly detection monitor** and a **schema evolution monitor** for each dataset. This enables Soda Cloud to start learning row count patterns and identify changes in your source's schema over the course of the next few scans. It will surface anything it recognizes as anomalous.

From the **Datasets** dashboard, click on your newly onboarded dataset to open it, then select the **Monitors** tab to review the monitor that Soda Cloud created for you. Learn more about creating [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) or [schema evolution]({% link soda-cloud/schema-evolution.md %}) monitors.

## Go further

* Next step in Soda Cloud Onboarding: [Integrate with Slack]({% link soda-cloud/collaborate.md %}#integrate-with-slack).
* Start testing your data by [creating a new monitor]({% link soda-cloud/monitors.md %}).
* Use automatated [anomaly detection]({% link soda-cloud/anomaly-detection.md %}) in your monitors.
* Examine [failed rows]({% link soda-cloud/failed-rows.md %}#) for a scan that results in failed tests.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.