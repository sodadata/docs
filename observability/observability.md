---
layout: default
title: Data Observability
description: What is observability?
nav_order: 500
---

# Observability

*Last modified on {% last_modified_at %}*

{% include banner-upgrade.md %}

Use observability to monitor data quality at scale across all your datasets.
Observability helps you catch unexpected issues without needing to define every rule up front.

Where data testing focuses on known expectations, observability helps you detect the unknown unknowns—like late-arriving records, schema changes, or sudden spikes in missing values. It offers broad, low-effort coverage and requires little configuration, making it easy to share data quality responsibilities across technical and non-technical teams.

## What is data observability?

**Data observability** is the practice of continuously monitoring your data for unexpected changes, anomalies, and structural issues. It involves collecting and analyzing metrics about your datasets to understand their health over time.

Instead of writing checks manually for each dataset, observability uses profiling and metrics to automatically detect problems such as:
- A spike in null values
- A drop in row counts
- Unusual value distributions

**Data Observability helps you:**
- Detect incidents faster
- Scale coverage across more data
- Reduce time spent on manual testing
- Empower more team members to spot and act on issues


## What is metrics monitoring?

**Metrics monitoring** is the foundation of data observability in Soda. Soda collects metrics from datasets—such as row count, null values, min/max, and value distribution—and tracks how those metrics evolve over time.

Soda then uses built-in anomaly detection to identify when metrics deviate from expected patterns. These deviations are surfaced in the **Metric Monitors** tab for each dataset.

You can use metric monitoring to:
- Spot problems without writing checks
- Establish baselines for normal behavior
- Alert data owners when something unusual happens
- Provide insight to business users without requiring code

## What's Next?
To get started with Soda observability, follow one of these guides:

- [Data observability quickstart]({% link observability/quickstart.md %}): Set up monitoring to detect anomalies in your datasets.
- [Data observability guide]({% link observability/observability-guide.md %}): Learn how to get the most out of Soda’s data observability platform.