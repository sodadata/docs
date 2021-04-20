---
layout: default
title: Soda Cloud architecture
parent: Documentation
nav_order: 11
---

# Soda Cloud architecture

![scan-anatomy](/assets/images/soda-cloud-arch.png){:height="550px" width="550px"}

**Soda Cloud** and **Soda SQL** work together to help you monitor your data and alert you when there is a data quality issue.

Installed in your environment, you use the Soda SQL command-line tool to [scan]({% link soda-sql/documentation/glossary.md %}#scan) data in your [warehouses]({% link soda-sql/documentation/glossary.md %}#warehouse). Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda SQL pushes metadata to Soda Cloud; by default all your data stays inside your private network. See [Data security and privacy]({% link soda-sql/documentation/data-privacy.md %})

When you create a [monitor]({% link soda-sql/documentation/glossary.md %}#monitor) in Soda Cloud's web application, Soda SQL uses the monitor settings to add new [tests]({% link soda-sql/documentation/glossary.md %}#test) when it runs a scan on data in a specific warehouse. A monitor is essentially a way to create Soda SQL tests using the web application instead of adjusting [scan YAML file]({% link soda-sql/documentation/glossary.md %}#scan-yaml) contents directly in your Soda project directory.

Beyond creating them, you can use monitors to track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed tests in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.

## Go further

* Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* [Connect Soda SQL to Soda Cloud]({% link soda-sql/documentation/connect_to_cloud.md %}).
* Learn more about [How Soda SQL works]({% link soda-sql/documentation/concepts.md %}).
* Learn more about [Soda SQL scans]({% link soda-sql/documentation/scan.md %}).
* Learn more about [Soda SQL tests]({% link soda-sql/documentation/tests.md %}) and [Soda Cloud monitors and alerts]({% link soda-sql/documentation/monitors.md %}).