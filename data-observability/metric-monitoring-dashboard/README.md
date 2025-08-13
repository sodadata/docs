# Metric Monitoring dashboard

<figure><img src="../../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

As soon as a data source is connected, the metric monitoring dashboard is available and will have historical information. Soda establishes a statistical baseline for each metric and continually compares new scan results against that baseline, flagging anomalies according to the sensitivity, exclusions, and threshold strategy you’ve configured.

## What are Metric Monitors?

**Metric monitors** are the foundation of data observability in Soda. Monitors track data quality metrics over time and leverage historical values for analysis. Soda automatically collects these metrics and examines how they evolve over time through a [proprietary anomaly detection algorithm](../#high-precision-alerts-with-fewer-false-positives) to identify when metrics deviate from expected patterns and trigger alerts. These deviations are surfaced and recorded in the **Metric Monitors** tab for each dataset.

### Monitors vs metrics: what's the difference?

The main difference between monitors and metrics is that **monitors are configurable, while metrics are not**.

Monitors build on top of metrics by wrapping their static measurement in a configurable context. Each monitor is customizable, so the user can select **scan time**, **scan frequency**, **thresholds**, and **metric** to be used.

Metrics, on the other hand, are only a part of the monitor. They are built-in, static definitions of data properties; it is not possible to alter how a metric is computed at its source, but it is possible to select which metric to track through a **metric monitor**.

## Types of monitors

Soda offers two main types of monitors to support scalable, layered observability: dataset monitors and column monitors.

1. [**Dataset monitors**](dataset-monitors/) provide instant, no-setup monitoring based on metadata. They track high-level metrics like row count changes, schema updates, and insert activity, making them ideal for catching structural or pipeline-level issues across large numbers of datasets.\

2. [**Column monitors**](column-monitors/) are more granular and customizable. They focus on specific fields, allowing users to monitor things like missing values, averages, or freshness. These monitors are useful for capturing data issues that impact accuracy or business logic at the column level.

Together, they offer broad coverage and targeted insight, helping teams detect both systemic and localized data quality issues.

Each of these sections contains summarized information about the latest scan results for each monitor. From the health tab, you can access each monitor for further investigation and configuration, as well as creating alerts.

## Configure Opt-in Alerts

<figure><img src="../../.gitbook/assets/opt_in_alert (1).gif" alt=""><figcaption></figcaption></figure>

You can turn any metric monitor into a proactive alert by clicking its **bell icon** on the Metric Monitors dashboard and selecting **Add Notification Rule**. This brings up the **Add Notification Rule panel**:

1. **Name**\
   Enter a descriptive title for your rule (e.g. “Row-Count Alerts – Prod Sales”).
2. **Data source**\
   Choose the warehouse or connection to scope your rule.\
   Then, search for and check the specific tables (or columns) this rule should cover. The “Matches X datasets” badge updates in real time so you know exactly what you’ll be alerting on.
3. **Applies to**\
   Pick which check type you want to alert on.
4. **Recipients**\
   Select one or more notification targets:

* Email addresses
* Slack channels
* Other integrations

This dialog lets you reuse a single rule for multiple datasets or checks, ensuring your team only gets the notifications they care about.
