---
layout: default
title: Metric Monitors
description: Plot elements and how to understand the results
parent: Observability Guide
nav_order: 550
---

# Metric Monitors

{% include what-are-metrics-monitors.md %}

Below is a table of the Metric Monitors that Soda supports:

| Metric name            | Based on | How it's calculated                                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Total Row Count**        | metadata | The total number of rows in the dataset at scan time obtained from metadata.                                                      |
| **Total Row Count Change** | metadata | The total number of rows at the previous scan time deducted from the current total row count obtained from metadata at scan time. |
| **Last Insertion Time**    | metadata | The time of last insert at the scan time obtained from metadata and deducted from the scan time.                                  |
| **Schema Changes**         | metadata | The number of changes in the dataset schema at the scan time compared to the previous scan.                                       |
| **Partition Row Count**    | data     | The number of rows inserted in the last partition.                                                                                |
| **Most Recent Timestamp**  | data     | The most recent timestamp in the time partition column at scan, deducted from scan time.                                          |

> For **Schema Changes**, the expected result is always to have no schema changes, regardless of whether there have been frequent schema changes in the past or not.

## How does partitioning and profiling work?
When you set up the anomaly dashboard, Soda begins by partitioning your data. To maximize efficiency, Soda does not profile the entire dataset; instead, it partitions your data to profile only a representative sample.

Profiling involves extracting metrics such as the mean, minimum, and maximum values in a column, and counting the number of missing values.

Here's how Soda partitions your data for profiling:

- **With a `TIME` type column:**
  Soda identifies a column containing `TIME` type data and partitions the dataset to include only the last 30 days of data.

- **Without a `TIME` type column:**
  - If the dataset contains fewer than one million rows, Soda profiles the entire dataset.
  - If the dataset contains more than one million rows, Soda randomly selects a sample of one million rows for profiling.


## What makes Soda's Anomaly Detection the most accurate and fastest?

1. All components of the system have been developed from the ground up and ensembled internally, without relying on third-party frameworks such as Facebook Prophet, which tend to impose rigid modeling assumptions and lack interpretability.

2. A key differentiator of our algorithm is the full transparency and control we have over the modeling stack. This enables us to rigorously evaluate, explain, and improve model behavior—crucial for high-stakes use cases like data quality monitoring.

3. The algorithm has been benchmarked against Prophet and demonstrated a 70% improvement in detecting anomalous data quality metrics. This performance gain is essential in production environments where false positives and missed anomalies can significantly erode trust and create operational inefficiencies.

4. The algorithm begins by characterizing the time series based on complexity and the presence of seasonality. A routing mechanism then dynamically selects the optimal modeling path. One of the core modeling strategies involves adaptive exponential smoothing, which allows for robust trend and seasonality capture. 

5. The model supports both automatic learning of new patterns and user-in-the-loop feedback for continuous refinement.

## What's Next?

- [Explore how to adjust the sensitivity of the algorithm]({% link observability/adjust-sensitivity.md %})
- [Explore how to define exclusion value rules]({% link observability/define-exclusion-values.md %})
- [Explore how to give feedback to the model to improve detection]({% link observability/give-feedback.md %})