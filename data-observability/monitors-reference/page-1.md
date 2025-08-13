# Page 1

* **What is a Metric Monitor**
  * High-level description: “a time-series record of X that flags anomalies” [beta.docs.soda.io](https://beta.docs.soda.io/data-observability/metric-monitoring-dashboard?utm_source=chatgpt.com).
* **Types of Monitors**
  * **Dataset Monitors**: metadata-based (row count changes, schema updates) [beta.docs.soda.io](https://beta.docs.soda.io/data-observability/metric-monitoring-dashboard/dataset-monitors?utm_source=chatgpt.com)
  * **Column Monitors**: partitioned by timestamp column, per-column metrics (missing%, avg, etc.) [beta.docs.soda.io](https://beta.docs.soda.io/data-observability/metric-monitoring-dashboard/column-monitors?utm_source=chatgpt.com)
* **How It Works**
  * Partitioning logic (daily/hourly slices)
  * Baselining & anomaly-detection algorithm
* **Configuring & Fine-Tuning**
  * Threshold strategy toggles (upper/lower bounds) [beta.docs.soda.io](https://beta.docs.soda.io/data-observability/metric-monitor-page?utm_source=chatgpt.com)
  * Training mode & retraining on new partitions [beta.docs.soda.io](https://beta.docs.soda.io/data-observability/metric-monitoring-dashboard/dataset-monitors?utm_source=chatgpt.com)
* **UI Walkthrough**
  * Screenshots of the Metric Monitors tab, how anomalies are surfaced.
* **YAML / SodaCL Examples**
  * Show a snippet of how to include or exclude datasets, pick metrics.
* **Linking Back to Metrics**
  * For each monitor entry, link to its metric’s reference page.
