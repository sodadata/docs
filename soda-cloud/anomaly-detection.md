---
layout: default
title: Detect anomalies
parent: Soda Cloud
redirect_from: /soda-sql/documentation/anomaly-detection.html
---

# Detect anomalies

In Soda Cloud, you can create a monitor that automatically detects anomalies in your time-series data. 

**Anomaly detection** is a [monitor]({% link soda/glossary.md %}#monitor) **Evaluation Type** powered by a machine learning algorithm that works with [measurements]({% link soda/glossary.md %}#measurement) that occur over time. The algorithm learns the patterns of your data – its trends and seasonality – to identify and flag anomalous measurements in time-series data. ("Seasonality" is a common pattern of time-series data and translates as "something cyclical irrespecitve of the general direction of the data --the trend. For example, the number of orders that occur on your platform might show a clear drop during the weekend or peak during the holiday season, irrespecitve of whether your platform is growing or not).

![anomaly-detection](/assets/images/anomaly-detection.png){:height="600px" width="600px"}

The algorithm automatically adapts to your data. It learns how your data generally behaves over time to build a mental model of data patterns, then compares actual measurements to that model. If the two disagree, the algorithm identifies the actual measurement as an anomaly and calculates:<br />

a. the certainty of the algorithm's mental model, or how well it knows your data, and <br />
b. the size of the anomaly, or how far the measurement deviates from the expected value.

Soda Cloud uses the certainty and size calculations to derive the thresholds for triggering alerts: 
* a large, certain anomaly triggers a **critical alert** 
* a small, less certain anomaly triggers a **warning**

As long as the [test]({% link soda/glossary.md %}#test) that a [Soda scan]({% link soda/scan.md %}#run-a-scan) executes results in a numerical measurement that regularly changes over time, you can use anomaly detection in a monitor. 

For example, if the test you define in your monitor measures the row count of one of your datasets every hour as part of your transformation pipeline, you can use anomaly detection to discover unexpected volumes of entries in the dataset. If the test you define measures the price of an asset at the end of each day, you can use anomaly detection to get an alert if the price jumps wildly high or unexpectedly low. 

## Use anomaly detection

To use anomaly detection, follow the steps to [create a new monitor]({% link soda-cloud/monitors.md %}) and select **Anomaly Detection** as the **Evaluation Type** in step two of the create flow. Otherwise, you do not need to specify any other details about your data; Soda Cloud automatically begins learning about your data and triggering alerts when Soda scans reveal anomalies.

When you access Soda Cloud to review the monitor's test results, the chart that displays the time-series data and its anomalies gives you the opportunity to manually provide feedback on an anomalous measurement. Your feedback on the accuracy of the calculated anomaly helps the algorithm to adapt its recognition of exceptions and deviations, and refine its thresholds for triggering alerts.

<!--
## Machine learning details

Currently, Soda's time-series anomaly detection uses the <a href=""https://facebook.github.io/prophet/docs/quick_start.html target="_blank"> Facebook Prophet Python library</a> to learn about time-series data with strong seasonality patterns. Prophet learns and predicts the shape of the data and outputs confidence-bounds between which it thinks 99% of the data should fall.
-->

## Go further

- <a href="https://cloud.soda.io/signup" target="_blank"> Sign up</a> for a free Soda Cloud account and [connect your account to Soda SQL]({% link soda-cloud/connect_to_cloud.md %}).
- Learn how to [Create monitors and alerts]({% link soda-cloud/monitors.md %}).
- Learn more about viewing [failed rows]({% link soda-cloud/failed-rows.md %}) in Soda Cloud.
- Read more about [How Soda SQL works]({% link soda-sql/concepts.md %}).
- Need help? Join the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.

<br />

---
*Last modified on {% last_modified_at %}*

Was this documentation helpful? <br /> Give us your feedback in the **#soda-docs** channel in the <a href="http://community.soda.io/slack" target="_blank"> Soda community on Slack</a>.