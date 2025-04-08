**Metrics monitors** are the foundation of data observability in Soda. Soda collects metrics from datasets—such as row count, null values, min/max, and value distribution—and tracks how those metrics evolve over time.

Soda then uses a [proprietary anomaly detection algorithm]({% link observability/metric-monitors.md %}#what-makes-sodas-anomaly-detection-the-most-accurate-and-fastest) to identify when metrics deviate from expected patterns. These deviations are surfaced in the **Metric Monitors** tab for each dataset.

You can use metric monitoring to:
- Spot problems without writing checks
- Establish baselines for normal behavior
- Alert data owners when something unusual happens
- Provide insight to business users without requiring code