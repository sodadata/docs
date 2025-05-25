---
layout: default
title: Data Observability
description: What is observability?
nav_order: 3
---

<!-- temporal white space until we fix parent navegation -->
&nbsp;
&nbsp;

# Data Observability

Use observability to monitor data quality at scale across all your datasets. Observability helps you catch unexpected issues without needing to define every rule up front.

Where data testing focuses on known expectations, observability helps you detect the unknown unknowns—like late-arriving records, schema changes, or sudden spikes in missing values. It offers broad, low-effort coverage and requires little configuration, making it easy to share data quality responsibilities across technical and non-technical teams.

## What is Data Observability?

**Data observability** is the practice of continuously monitoring your datasets for unexpected changes & anomalies to uncover data quality issues. It involves collecting and analyzing metrics about your datasets to understand their health over time.

Instead of writing checks manually for each dataset, with data observability monitors automatically detect anomalies in:

- Row counts
- Insertion times
- Schema changes

**Data Observability helps you:**

- Detect incidents faster
- Scale coverage across more data
- Reduce time spent on manual testing
- Empower more team members to spot and act on issues

## What are Metric Monitors?

**Metrics monitors** are the foundation of data observability in Soda. Soda automatically collects dataset level metrics and tracks how those evolve over time.

![with-library](/assets/images/metric-monitors-dashboard.png){:height="700px" width="700px"}

Soda then uses a proprietary anomaly detection algorithm to identify when metrics deviate from expected patterns. These deviations are surfaced in the **Metric Monitors** tab for each dataset.

![with-library](/assets/images/metric-monitors-row-count-png){:height="700px" width="700px"}

### Type of Metric Monitors

| Metric Name             | Based On  | How It’s Calculated                                                                                                   |
|-------------------------|-----------|----------------------------------------------------------------------------------------------------------------------|
| Total Row Count         | metadata  | The total number of rows in the dataset at scan time obtained from metadata.                                          |
| Total Row Count Change  | metadata  | The total number of rows at the previous scan time deducted from the current total row count obtained from metadata.  |
| Last Insertion Time     | metadata  | The time of last insert at the scan time obtained from metadata and deducted from the scan time.                      |
| Schema Changes          | metadata  | The number of changes in the dataset schema at the scan time compared to the previous scan.                           |
| Partition Row Count     | data      | The number of rows inserted in the last partition.                                                                    |
| Most Recent Timestamp   | data      | The most recent timestamp in the time partition column at scan, deducted from scan time.                              |

For **Schema Changes**, the expected result is always to have no schema changes, regardless of whether there have been frequent schema changes in the past or not.

## The Anomaly Detection Algorithm

What makes Soda’s Anomaly Detection the most accurate and fastest?

**Soda’s Proprietary Anomaly Detection Algorithm**

- All components of the anomaly detection system have been built from the ground up and ensembled internally, without relying on third-party frameworks such as Facebook Prophet, which often impose rigid modeling assumptions and limit interpretability.
- A core strength of our algorithm is the full transparency and control we maintain over the entire modeling stack. This allows us to rigorously evaluate, explain, and improve model behavior, an essential requirement for high-stakes use cases like data quality monitoring.
- The algorithm was developed using a proprietary evaluation framework that tests performance across hundreds of diverse, internally curated datasets containing known data quality issues. The framework supports structured, repeatable experimentation and automatically benchmarks new modeling techniques. During evaluation, metrics that place strong weight on false positives are prioritised to ensure high alert quality and practical reliability in production.
- In benchmarking tests against Facebook Prophet, Soda's algorithm demonstrated a 70% improvement in detecting anomalous data quality metrics. This level of performance is critical in production environments, where missed anomalies and false alarms can undermine trust and introduce operational inefficiencies.
- Soda's anomaly detection model is designed for adaptability, supporting both automatic learning of new patterns and user-in-the-loop feedback for continuous refinement.