---
layout: default
title: Create monitors and alerts
parent: Documentation
nav_order: 13
---

# Create monitors and alerts

Log in to **Soda Cloud** to create **[monitors]({% link soda-sql/documentation/glossary.md %}#monitor)**, and customize **[alerts]({% link soda-sql/documentation/glossary.md %}#alert)** that send **[notifications]({% link soda-sql/documentation/glossary.md %}#notification)** to your team when a [scan]({% link soda-sql/documentation/glossary.md %}#scan) surfaces data issues.

Further, you can use monitors to track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed tests in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.

**Soda SQL** refers to monitors as **tests**. Refer to [Tests]({% link soda-sql/documentation/tests.md %}) to learn how to define a test using Soda SQL.


## Prerequisites

1. Create a free Soda Cloud account at [cloud.soda.io/signup](https://cloud.soda.io/signup).
2. [Install Soda SQL]({% link soda-sql/getting-started/installation.md %}) in your local or development environment. Soda SQL executes the scans, then pushes the results of its scans to your Soda Cloud account.
3. Use Soda SQL to [analyze]({% link soda-sql/documentation/scan-yaml.md %}#create-a-scan-yaml-file) the tables in your warehouse and [run your first scan]({% link soda-sql/documentation/scan.md %}#run-a-scan).
4. [Connect]({% link soda-sql/documentation/connect_to_cloud.md %}) Soda SQL to your Soda Cloud account.
5. (Optional) [Integrate with Slack]({% link soda-sql/documentation/integrate-slack.md %}) to enable Soda Cloud to send Slack notifications to your team.


## Create a monitor and an alert

1. In Soda Cloud, navigate to the **Monitor Results** table, then click the stacked dots to **Create Monitor**. Select the type `Metric`, then follow the guided steps to complete the setup.
2. Specify the Slack or email notifications you want to send when bad data triggers a **Critical Alert** or **Warning**, add a brief description of what your monitor tests, then **Save** your monitor. Your new monitor appears as a row in the **Monitor Results** table.
3. Access your command-line interface, then use Soda SQL to scan your data again.
``` shell
$ soda scan warehouse.yml tables/yourtablename.yml
```
4. Check your Slack channel or email inbox; when a scan surfaces data that triggers your alert, Soda Cloud sends a notification.
5. Return to **Monitor Results** in Soda Cloud and refresh your browser. Click the monitor to access details that can help you diagnose and solve the data issue.


## Go further

* Learn more about [How Soda SQL works]({% link soda-sql/documentation/concepts.md %})
* Learn more about [Soda Cloud architecture]({% link soda-sql/documentation/soda-cloud-architecture.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.