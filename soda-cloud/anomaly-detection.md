---
layout: default
title: Detect anomalies
description: Soda Cloud automatically creates a monitor that uses a machine learning algorithm to detect anomalies in your time-series data.
parent: Soda Cloud
redirect_from: /soda-sql/documentation/anomaly-detection.html
---

# Detect anomalies

In Soda Cloud, you can create a monitor that automatically detects anomalies in your time-series data. 

<div class="warpper">
  <input class="radio" id="one" name="group" type="radio" checked>
  <input class="radio" id="two" name="group" type="radio">
  <div class="tabs">
  <label class="tab" id="one-tab" for="one">Soda Cloud with Soda Core (Beta)</label>
  <label class="tab" id="two-tab" for="two">Soda Cloud with Soda SQL</label>
    </div>
  <div class="panels">
  <div class="panel" id="one-panel" markdown="1">


In Soda Cloud, you can only create new anomaly detection monitors for datasets connected to an instance of Soda SQL; you cannot create schema evolution monitors for datasets connected to Soda Core (Beta), yet. 

Instead, you can use SodaCL (Beta) to write [anomaly score checks]({% link soda-cl/anomaly-score.md %}) in a [checks YAML file]({% link soda-core/configuration.md %}) for Soda Core to execute during a scan. You can [connect]({% link soda-core/connect-core-to-cloud.md %}) Soda Core to your Soda Cloud account to see the check results after each scan. 

[Soda Core documentation]({% link soda-core/overview-main.md %})<br />
[SodaCL documentation]({% link soda-cl/soda-cl-overview.md %})


  </div>
  <div class="panel" id="two-panel" markdown="1">

{% include banner-sql.md %}

**Anomaly detection** is a [monitor]({% link soda/glossary.md %}#monitor) **Evaluation Type** powered by a machine learning algorithm that works with [measurements]({% link soda/glossary.md %}#measurement) that occur over time. The algorithm learns the patterns of your data – its trends and seasonality – to identify and flag anomalous measurements in time-series data. Seasonality is a term that describes a common pattern of time-series data and means "something cyclical, irrespecitve of the general direction of the data". For example, the number of orders that occur on your platform might show a clear drop during the weekend, or peak during the holiday season, irrespecitve of whether your platform is growing or not.

![anomaly-detection](/assets/images/anomaly-detection.png){:height="700px" width="700px"}

The algorithm automatically adapts to your data. It learns how your data generally behaves over time to build a model of data patterns, then compares actual measurements to that model. If the two disagree, the algorithm identifies the actual measurement as an anomaly and calculates:<br />

a. the certainty of the algorithm's mental model, or how well it knows your data, and <br />
b. the size of the anomaly, or how far the measurement deviates from the expected value.

Soda Cloud uses the certainty and size calculations to derive the thresholds for triggering alerts: 
* a large, certain anomaly triggers a **critical alert** 
* a small, less certain anomaly triggers a **warning**

As long as the [test]({% link soda/glossary.md %}#test) that a [Soda scan]({% link soda-sql/scan.md %}#run-a-scan-in-soda-sql) executes results in a numerical measurement that regularly changes over time, you can use anomaly detection in a monitor. 

For example, if the test you define in your monitor measures the row count of one of your datasets every hour as part of your transformation pipeline, you can use anomaly detection to discover unexpected volumes of entries in the dataset. If the test you define measures the price of an asset at the end of each day, you can use anomaly detection to get an alert if the price jumps wildly high or unexpectedly low. 

## Use anomaly detection

To use anomaly detection, you must be an Admin of the organization, or have a Manager or Editor role for the monitor's dataset. See [Roles and rights]({% link soda-cloud/roles-and-rights.md %}) for details.

Note that when Soda SQL first pushes scan results to your [connected Soda Cloud account]({% link soda-sql/connect_to_cloud.md %}), Soda Cloud automtically creates an anomaly detection monitor for each dataset that contains time-series data. 

To manually add an anomaly detection monitor, follow the steps to [create a new monitor]({% link soda-cloud/monitors.md %}) and select **Anomaly Detection** as the **Evaluation Type** in step two of the creation flow. Beyond that, you do not need to specify any other details about your data; Soda Cloud automatically begins learning about your data and triggering alerts when Soda scans reveal anomalies.

When you access the **Monitors** dashboard to review the monitor's test results, the chart that displays the time-series data and its anomalies gives you the opportunity to manually provide feedback on an anomalous measurement. Your feedback on the accuracy of the calculated anomaly helps the algorithm to adapt its recognition of exceptions and deviations, and refine its thresholds for triggering alerts.

<!--
## Machine learning details

Currently, Soda's time-series anomaly detection uses the <a href=""https://facebook.github.io/prophet/docs/quick_start.html target="_blank"> Facebook Prophet Python library</a> to learn about time-series data with strong seasonality patterns. Prophet learns and predicts the shape of the data and outputs confidence-bounds between which it thinks 99% of the data should fall.
-->

  </div>
  </div>
</div>

## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a Soda Cloud account.
- Learn how to [Create monitors and alerts]({% link soda-cloud/monitors.md %}).
- Learn more about examining [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
{% include docs-footer.md %}