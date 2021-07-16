---
layout: default
title: Soda Cloud architecture
parent: Soda Cloud
redirect_from: /soda-sql/documentation/soda-cloud-architecture.html
---

# Soda Cloud architecture

![soda-cloud-arch](/assets/images/soda-cloud-arch.png){:height="550px" width="550px"}

**Soda Cloud** uses **Soda SQL** in the background to help you monitor your data and alert you when there is a data quality issue.

In Soda Cloud, you connect your account to your [data source]({% link soda/glossary.md %}#data source) and define a schedule for [scans]({% link soda/scan.md %}) of your data. To actually execute the scan, Soda Cloud connects to a hosted Soda SQL instance via a secure API and Soda SQL runs the scan.  When it completes a scan, it pushes the results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda SQL pushes metadata to Soda Cloud; by default all your data (barring any [sample data]({% link soda-sql/samples.md %}) you explicity instruct Soda SQL to send to Soda Cloud) stays inside your private network. See [Data security and privacy]({% link soda/data-privacy.md %})

When you create a [monitor]({% link soda/glossary.md %}#monitor) in Soda Cloud's web application, Soda SQL uses the monitor settings to add new [tests]({% link soda/glossary.md %}#test) when it runs a scan on data in a specific warehouse. A monitor is essentially a way to create Soda SQL tests using the web application instead of adjusting [scan YAML file]({% link soda/glossary.md %}#scan-yaml) contents directly in your Soda project directory.

You can use monitors to automatically detect anomalies, view samples of data that failed a test, and track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed tests in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.

Follow the Soda Cloud Onboarding path to start monitoring your data.

![soda-cloud-onboarding](/assets/images/soda-cloud-onboarding.png){:height="350px" width="350px"}

## Go further

* Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* Learn more about what happens during a [scan]({% link soda/scan.md %}#scan-output-in-soda-cloud).
* Learn more about [monitors and alerts]({% link soda-cloud/monitors.md %}).
* Get Soda Cloud to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a> or <a href="https://github.com/sodadata/docs/issues/new" target="_blank">open an issue</a> in GitHub.