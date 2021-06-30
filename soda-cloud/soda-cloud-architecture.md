---
layout: default
title: Soda Cloud architecture
parent: Soda Cloud
redirect_from: /soda-sql/documentation/soda-cloud-architecture.html
---

# Soda Cloud architecture

![scan-anatomy](/assets/images/soda-cloud-arch.png){:height="550px" width="550px"}

**Soda Cloud** and **Soda SQL** work together to help you monitor your data and alert you when there is a data quality issue.

Installed in your environment, you use the Soda SQL command-line tool to [scan]({% link soda/glossary.md %}#scan) data in your [warehouses]({% link soda/glossary.md %}#warehouse). Soda SQL uses a secure API to connect to Soda Cloud. When it completes a scan, it pushes the scan results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda SQL pushes metadata to Soda Cloud; by default all your data stays inside your private network. See [Data security and privacy]({% link soda/data-privacy.md %})

When you create a [monitor]({% link soda/glossary.md %}#monitor) in Soda Cloud's web application, Soda SQL uses the monitor settings to add new [tests]({% link soda/glossary.md %}#test) when it runs a scan on data in a specific warehouse. A monitor is essentially a way to create Soda SQL tests using the web application instead of adjusting [scan YAML file]({% link soda/glossary.md %}#scan-yaml) contents directly in your Soda project directory.

Beyond creating them, you can use monitors to track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed tests in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.

## Go further

* Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* [Connect Soda SQL to Soda Cloud]({% link soda-cloud/connect_to_cloud.md %}).
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Learn more about [Soda SQL scans]({% link soda/scan.md %}).
* Learn more about [Soda SQL tests]({% link soda-sql/tests.md %}) and [Soda Cloud monitors and alerts]({% link soda-cloud/monitors.md %}).
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.