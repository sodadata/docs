---
layout: default
title: Soda Cloud architecture
description: Soda SQL connects to data sources and performs scans of datasets. If you connect Soda SQL to a Soda Cloud account, it pushes scan results to Soda Cloud.
parent: Soda Cloud
---

# Soda Cloud architecture

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda Core (Beta)</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda SQL</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">

![soda-cloud-arch-core](/assets/images/soda-cloud-arch-core.png){:height="700px" width="700px"}

**Soda Core** connects to data sources and performs scans of each dataset in a data source. If you connect Soda Core to a **Soda Cloud** account, it pushes scan results to Soda Cloud where users in your organization can view monitor results, access Cloud Metric Store data, create anomaly detection and schema evolution monitors, and integrate with Slack to investigate data quality Incidents.

First, you must [connect your Soda Cloud account]({% link soda-core/configure.md %}#connect-soda-core-to-soda-cloud) to your configured instance of Soda Core.  When Soda Core completes a scan, it uses a secure API to push the results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda Core pushes metadata to Soda Cloud; by default all your data (barring any [sample data]({% link soda-cloud/display-samples.md %}) you explicity instruct Soda Core to send to Soda Cloud) stays inside your private network. See [Data security and privacy]({% link soda/data-privacy.md %})

When you create a [monitor]({% link soda/glossary.md %}#monitor) in Soda Cloud's web application, Soda Core uses the monitor settings to add new [tests]({% link soda/glossary.md %}#test) when it runs a scan on data in a specific warehouse; see image below. A monitor is essentially a way to create Soda Core checks using the web application instead of adjusting the checks YAML file contents directly in your Soda project directory.

![scan-with-cloud](/assets/images/scan-with-cloud.png){:height="350px" width="350px"}

You can use monitors to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) and [changes to a dataset's schema]({% link soda-cloud/schema-evolution.md %}), view samples of data that [failed a check]({% link soda-cloud/failed-rows.md %}), and track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed checks in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.

  </div>
  <div class="panel" id="two-panel" markdown="1">
{% include banner-sql.md %}

![soda-cloud-arch](/assets/images/soda-cloud-arch.png){:height="700px" width="700px"}

**Soda SQL** connects to data sources and performs scans of each dataset in a data source. If you connect Soda SQL to a **Soda Cloud** account, it pushes scan results to Soda Cloud where users in your organization can view monitor results, access Cloud Metric Store data, create anomaly detection and schema evolution monitors, and integrate with Slack to investigate data quality Incidents.

First, you must [connect your Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}) to your configured instance of Soda SQL.  When Soda SQL completes a scan, it uses a secure API to push the results to your Soda Cloud account where you can log in and examine the details in the web application. Notably, Soda SQL pushes metadata to Soda Cloud; by default all your data (barring any [sample data]({% link soda-sql/samples.md %}) you explicity instruct Soda SQL to send to Soda Cloud) stays inside your private network. See [Data security and privacy]({% link soda/data-privacy.md %})

When you create a [monitor]({% link soda/glossary.md %}#monitor) in Soda Cloud's web application, Soda SQL uses the monitor settings to add new [tests]({% link soda/glossary.md %}#test) when it runs a scan on data in a specific warehouse; see image below. A monitor is essentially a way to create Soda SQL tests using the web application instead of adjusting [scan YAML file]({% link soda/glossary.md %}#scan-yaml) contents directly in your Soda project directory.

![scan-with-cloud-sql](/assets/images/scan-with-cloud-sql.png){:height="350px" width="350px"}

You can use monitors to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) and [changes to a dataset's schema]({% link soda-cloud/schema-evolution.md %}), view samples of data that [failed a test]({% link soda-cloud/failed-rows.md %}), and track data quality over time. Soda Cloud stores your scan results and prepares charts that represent the volume of failed tests in each scan. These visualizations of your scan results enable you to see where your data quality is improving or deteriorating over time.


  </div>
  </div>
</div>


## Go further

* Create a Soda Cloud account at [cloud.soda.io](https://cloud.soda.io/signup).
* Learn more about what happens during a [scan]({% link soda-sql/scan.md %}#scan-output-in-soda-cloud).
* Learn more about [monitors and alerts]({% link soda-cloud/monitors.md %}).
* Get Soda Cloud to automatically [detect anomalies]({% link soda-cloud/anomaly-detection.md %}) in your data.
* Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
* Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}