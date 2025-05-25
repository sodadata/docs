---
layout: default
title: Metric Monitoring
description: Metric Monitoring
parent: Data Observability
nav_order: 3
---
# Metric Monitoring

Soda’s Metrics Monitoring feature lets you automatically track key dataset and column-level statistics over time, detect deviations, and get alerted before data issues impact downstream analytics. While quality checks also keep track of measurements over time, metric monitors use that history of measurements to learn from it and automatically adjust thresholds to inform about expected values or alert about anomalies.

## Metric Monitoring Dashboard

As soon as a data source is connected, the metric monitoring dashboard is available and will have historical information. Soda establishes a statistical baseline for each metric and continually compares new scan results against that baseline, flagging anomalies according to the sensitivity, exclusions, and threshold strategy you’ve configured.

When you open the **Metric Monitors** tab on a dataset, you’ll see:

### Dataset-level Monitors (based on metadata/data)

A dataset-level Monitor in Soda is a configuration that tracks one or more key metadata metrics for an entire dataset at each scan, helping you catch unexpected changes in overall data health and learn from previous trends.

The dashboard provides a **health table** summarizing the latest metric values vs. expected values, the status (✅ healthy / ⚠️ violated), and a trend sparkline.

Each of these is clickable and links to the Anomaly History page of the metric.

[VISUAL: screenshot of dashboard table]

Within each metric, the Anomaly History shows an **interactive time-series plot**, showing the historical values, expected range, and any detected anomalies, both in recent scans and in past periods before connecting to the datasource.

[VISUAL: screen recording of dashboard table>anomaly history - interacting]

| **Dataset Monitor Type**           | **Monitor**               | **Description**                                                                                                                                                    |
|------------------------------------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Based on metadata                  | Total row count           | The total number of rows in the dataset at scan time.                                                                                                             |
|                                    | Total row count change    | Change in total row count compared to the previous scan.                                                                                                          |
|                                    | Last insertion time       | Most recent time the data was changed relative to the last scan.                                                                                                  |
|                                    | Schema changes            | Changes in the schema compared to the previous scan — any change is automatically flagged as an anomaly.                                                         |
| Based on time partition column     | Partition row count       | The number of rows in the last partition at scan time.                                                                                                            |
|                                    | Most recent timestamp     | Time difference between scan time and the maximum timestamp in the partition column (at scan time).                                                              |



> Monitors based on time partition columns look at data in the most recent partition based on a timestamp. If data is altered > in an old partition, it will not be evaluated.
>
> For example, data inserted today with timestamp of 2 days ago will not be evaluated if the partition interval is 1 day.

### Column-level Monitors
A column monitor in Soda is a configuration that tracks one or more statistical metrics for specific columns over time, helping you catch unexpected changes in that column’s behavior.

For each dataset, you’ll see a scrollable list that includes:

- Result status
- Metric name (e.g. Missing values percentage, Average)
- Column being tracked
- Latest value
- Trend sparkline

The column monitors list can be filtered and is indexed by column name or metric. From this view, you can add or remove column monitors and opt-in/out of notifications.

[VISUAL: screenshot of column monitors list]

| Metric                  | Description                                                                                                                   |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| Missing values percentage | Number of missing values relative to the number of rows in the partition, expressed as percentage                              |
| Average                 | Average of all values in the partition, only supported in numeric columns                                                     |
| Most recent timestamp   | Time difference between scan time and the maximum timestamp in the column (within the partition), only supported for date, datetime, and time columns |

## How to Configure Monitors

### Configure Dataset Monitors

Use the **Configure Dataset Monitors** panel to pick which built-in metadata and partition-based metrics you want Soda to track at the dataset level.

1. **Open the panel** → From any dataset’s **Metric Monitors** dashboard, click **Configure Dataset Monitors**.
2. **Enable or disable →** Toggle metrics on/off directly from here. If the data source doesn't support a given metric, it will be automatically off.
3. **Modify the monitor**
4. **Auto-apply** → Changes take effect immediately for the next scan. Simply close the panel when you’re done.

### Add Column Monitors

Column monitors let you track per-column statistics (e.g. missing-value %, average, distinct count) across one or more columns in bulk, as long as their data type is compatible with the monitor created.

1. **Open the panel**In the **Metric Monitors** dashboard, click **Add Column Monitors**.
2. **Select columns**
- **Column Selection**:
    - Search or scroll your table’s columns.
    - Check one or many boxes to select columns in bulk.

**Columns monitors are typed**: only numeric columns will appear under numeric metrics, timestamp columns under time-based metrics, etc.

1. **Pick metrics**
- **Enabled Monitors**:
    - Search or expand existing metrics:
        - Toggle to enable it for all selected columns
        - **Valid Range →** Define **MIN** and **MAX** values the metric can take (defaults to –∞/∞ or 0–∞ for time-based metrics).
        - **Threshold Strategy →** Choose whether to alert on the **Upper range**, the **Lower range**, or both.
        - **Exclusion Values →** Specify literal values or ranges to ignore when marking anomalies.
1. **Add monitors**
- Once you’ve selected your columns and toggled the desired metrics on, click **Add Monitors**.
- A confirmation pop-up will prompt you to **run a Historical Metric Collection Scan**.

**Tip:** add all your column monitors first, then run the historical scan in one go. This will save time and computing costs, and ensures every monitor shares the same look-back window.

## How to Fine-Tune Metric Monitoring

Soda's Observability tools work out of the box with predefined baselines, but you can fine-tune them to your specific needs. Do this by from the page for each specific metric.

### Set Threshold Strategy

By default Soda uses an adaptive statistical method, but you can control which sides of the expected range should trigger an anomaly alert:

1. **Open the panel**Click on "Set Threshold Strategy" button on the metric of your choice
2. **Choose your alert ranges**
- **Upper range**: when checked, Soda will flag any metric value that exceeds the upper bound of its statistical baseline.
- **Lower range**: when checked, Soda will flag any metric value that falls below the lower bound.
1. **Apply your settings**Click **Set Threshold Strategy** to save.

With this simple toggle interface you can, for example, watch only for unexpectedly high values, only for drops below your baseline, or both.

[VISUAL GOES HERE]

### Set Exclusion Values

Exclude values from monitoring to tell Soda which specific values or ranges should be ignored when evaluating anomalies (e.g. test rows, manual overrides). The available inputs depend on the metric type:

1. **Open the panel**Click on "Set Exclusion Values" button on the metric of your choice
2. **Define your exclusions**
- **Numeric metrics** (Total row count, Total row count change, Partition row count):
    - **Type:** **Value** or **Value range**
    - **Value:** enter the exact metric value (e.g. `205`) or, for a range, specify both lower and upper bounds.
- **Time-based metrics** (Last insertion time, Most recent timestamp):
    - **Type:** **Value** or **Value range**
    - **Value:** enter the cutoff you want to ignore (e.g. `0 days, 10 hours, 49 minutes`) or, for a range, specify both lower and upper bounds.
- **Schema changes:** exclusions are **not** supported for schema-drift monitors.

You can stack multiple rules by clicking **+ Add exclusion**.

1. **Apply**Click **Set Exclusion Values** to save your rules.

> ⚠️ This will not retroactively change past results—it only affects future anomaly evaluations.

[VISUAL: when UI is fixed, same as above]

### Set Sensitivity

Soda uses a statistical baseline to define an “expected range” for anomaly detection. You can adapt how tight or loose that range is:

1. **Open the panel**Click on "Set Sensitivity" button on the metric of your choice
2. **Adjust the sensitivity**
- **Provide a z-score**: enter a value between **0.3** and **6** to control the exact width of the expected range OR use the slider to drag between **Narrow** (lower z-score) and **Wide** (higher z-score).
- **Default**: `z = 3`

Preview how changing sensitivity widens or narrows the gray “expected” band in the plot

1. **Apply**Click **Apply sensitivity** to save.

> ⚠️ This will not retroactively change past results—it only affects future scans.
> 

[VISUAL: when UI is fixed, same as above]

### Give Feedback to Improve Detection

Our home-brewed anomaly detection algorithm draws trends from historical data, but it can also learn from your input as you give it feedback.

When a monitor flags an anomaly you can:

1. **Mark as expected**Teach Soda that this deviation is acceptable: future similar variations will no longer trigger alerts.
2. **Mark as anomaly**Explicitly flag a point as an anomaly, even if it fell inside the baseline. This helps refine your alert definitions.
3. **Link to existing incident**Attach this scan to a ticket in your external system (Jira, ServiceNow, PagerDuty, etc.), keeping engineering triage in one place.
4. **Create new incident**Create a ticket in your incident management tool directly from the panel.

All feedback and incident links become part of the scan history, providing an auditable trail for both data engineers and business stakeholders.

[VISUAL: screen recording flagging an anomaly as expected]

### Opt-in Alerts

You can turn any metric monitor into a proactive alert by clicking its **bell icon** on the Metric Monitors dashboard and selecting **Add Notification Rule**. This brings up the **Add Notification Rule** panel:

1. **Name**Enter a descriptive title for your rule (e.g. “Row-Count Alerts – Prod Sales”).
2. **Datasource**Choose the warehouse or connection to scope your rule.Then, search for and check the specific tables (or columns) this rule should cover. The “Matches X datasets” badge updates in real time so you know exactly what you’ll be alerting on.
3. **Applies to**Pick which check type you want to alert on.
4. **Recipients**Select one or more notification targets:
- Email addresses
- Slack channels
- Other integrations

This dialog lets you reuse a single rule for multiple datasets or checks, ensuring your team only gets the notifications they care about.

## Supported data sources

Soda integrates out of the box with the modern data stack:

- **Cloud warehouses & databases:** BigQuery, Snowflake, Redshift, Databricks, PostgreSQL, Spark, Presto, DuckDB, and more.
- **File formats:** CSV, Parquet, JSON, Delta Lake, Iceberg, etc.
- **Orchestration platforms:** Airflow, Dagster, Prefect, dbt, Azure Data Factory
- **Metadata tools:** Atlan, Alation, Collibra, data.world, Zeenea
- **Cloud providers:** AWS, Google Cloud, Azure
- **BI tools:** Looker, Tableau, Power BI
- **Messaging & ticketing:** Slack, Teams, Jira, PagerDuty, ServiceNow, Opsgenie