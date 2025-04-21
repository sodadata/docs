**Metrics monitors** are the foundation of data observability in Soda. Soda automatically collects dataset level metrics and tracks how those evolve over time.

![with-library](/assets/images/metric-monitors-dashboard.png){:height="350"}

Soda then uses a [proprietary anomaly detection algorithm]({% link observability/metric-monitors.md %}#what-makes-sodas-anomaly-detection-the-most-accurate-and-fastest) to identify when metrics deviate from expected patterns. These deviations are surfaced in the **Metric Monitors** tab for each dataset.

![with-library](/assets/images/metric-monitors-row-count.png){:height="350"}

You can use metric monitoring to:
- Spot problems without writing checks
- Establish baselines for normal behavior
- Use opt-in alerts to notify data owners when something unusual happens
- Provide insight to business users without requiring code

## Key capabilities
- **Built for scale:**
Soda collects dataset-level metrics efficiently by accessing database metadata and leveraging metadata history when available. It calculates all metrics using optimized methods to reduce the computational load on your database and deliver fast results.

- **Get instant insights:**
Soda supports native backfilling and backtesting. You can calculate historical data quality metrics and apply anomaly detection algorithms retroactively. This builds a more complete picture of past data quality and helps surface new issues.

- **Reduce false alerts:**
Soda’s proprietary algorithm is **70% more accurate** at detecting anomalies in data quality metrics than external frameworks such as Facebook Prophet.