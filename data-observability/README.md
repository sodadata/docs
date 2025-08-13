---
description: >-
  An overview of Soda's key observability features and how they help catch data
  issues early.
---

# Data Observability

## What is Data Observability?

Data observability is the ongoing process of **monitoring and assessing** the health of your data throughout its lifecycle. It focuses on analyzing metadata, metrics, and logs to detect issues as they arise, helping teams maintain trust in their data.

At the core of data observability are **monitors** that track key data quality metrics over time. When a metric behaves unexpectedly, anomaly detection algorithms analyze historical patterns to determine whether an alert should be triggered.

Typical data quality metrics to monitor are:

* **Schema changes** to surface structural modifications
* **Row counts** to detect unexpected changes in data volume
* **Most recent timestamps** to detect data freshness, missing or delayed data
* **Missing values** to track data completeness
* **Averages** to observe shifts in distributions

<figure><img src="../.gitbook/assets/interactive_plot.gif" alt=""><figcaption></figcaption></figure>

## Soda’s Practical Approach to Data Quality

Soda embraces pragmatism over purity: practical outcomes and effectiveness are more important than ideal, unidimensional approaches. **Effective data quality comes from combining data observability and data testing**. Each serves a different purpose. Observability is about speed and broad coverage. Testing is about precision, enforcement, and prevention.

**Benefits of Data Observability**

* Enables broad coverage quickly, even across large data sources
* Surfaces unknown issues without needing to define every rule
* Requires minimal configuration to get started
* Leverages existing metadata for fast and efficient monitoring
* Provides early signals when something might be wrong

**Limitations of Data Observability**

* Serves only as a signal. An anomaly suggests an issue but doesn’t confirm it
* Can generate false alerts, since detection is driven by algorithms
* Requires further investigation to validate and resolve alerts
* Does not prevent issues. It flags them after they’ve happened
* May result in extra work to follow up and interpret alerts

**Start with Observability, but Rely on Testing**

Observability is a fast and efficient way to get initial coverage. It helps surface unknown issues with minimal setup and delivers immediate value across many datasets. However, for lasting reliability and trust in your data, testing is more important.

Testing requires more effort up front. It involves defining explicit expectations and rules for your data. But that investment pays off. When a test fails, you know there is a real data quality issue, no guesswork, no false alerts. When an anomaly is detected, it doesn't necessarily mean there is an underlying data quality issue and more investigation effort is required.

For long-term reliability, testing is essential. It adds rigor by enforcing defined standards and helps prevent bad data going into production. Start with your most critical datasets, then expand gradually using a collaborative approach, where business users help by proposing checks. This creates a scalable framework that grows with your organization while ensuring lasting data quality.

## What Makes Soda’s Data Observability So Useful

Soda’s data observability allows teams to monitor data health across large environments without manual setup. All anomalies are surfaced in a single, easy-to-navigate dashboard, making it simple to spot issues and investigate patterns. Behind the scenes, a proprietary anomaly detection algorithm ensures high precision by minimizing false positives and focusing on meaningful deviations. Notifications are opt-in and alerts are only triggered when they matter, helping teams stay focused without being overwhelmed by noise.

<figure><img src="../.gitbook/assets/Screenshot 2025-06-05 at 21.22.13.png" alt=""><figcaption><p>Metric Monitoring Dashboard</p></figcaption></figure>

### Effortlessly Monitor Thousands of Tables

Soda enables large-scale observability with ease. Instead of configuring each table manually, monitoring is applied at the data source level and automatically extends to all datasets underneath. This allows teams to activate observability across hundreds or even thousands of tables within minutes.

By leveraging metadata such as row counts, schema evolution, and insert activity, Soda delivers lightweight and efficient monitoring. There is no need to scan entire datasets or write custom logic for each table. You can do that if needed, but it is not required. Observability starts working immediately and is built to handle even the largest data platforms.

### Start Today. Look One Year Back.

Observability is not just about what happens next. With built-in backfilling and backtesting, Soda instantly analyzes historical metadata and metric trends. From the moment observability is enabled, teams gain visibility into past data quality metrics and can detect potential anomalies that may have gone unnoticed.

This historical context is essential. It helps determine whether a current anomaly is truly new or part of an ongoing pattern. It also allows the anomaly detection algorithm to establish baselines immediately, which improves the quality of alerts from the very beginning.

### High Precision Alerts with Fewer False Positives

Soda’s **proprietary anomaly detection algorithm** is specifically designed for data quality monitoring. Every component has been developed entirely in-house without relying on third-party frameworks. This gives Soda full control over the modeling stack and ensures transparency, customization, and explainability. These attributes are especially important in production environments where trust in alerts is essential.

The algorithm is built on a proprietary evaluation framework that rigorously tests its performance using hundreds of internally curated datasets with known data quality issues. This framework enables structured, repeatable experimentation and continuous benchmarking of new techniques. It prioritizes reducing false positives to ensure alerts are accurate, meaningful, and reliable.

In benchmark testing, Soda’s algorithm demonstrated a **70 percent improvement in anomaly detection accuracy compared to Facebook Prophet**. Unlike generic forecasting tools that rely on rigid assumptions, Soda’s model is tailored to the real-world challenges of monitoring data quality at scale.

The system is flexible and adapts to different team needs. It can run autonomously with smart defaults or be fine-tuned through a user-in-the-loop approach. Teams can improve detection by providing feedback and adjusting sensitivity. This flexibility ensures that alerts remain focused, useful, and aligned with the needs of each organization.

## Metric Monitoring

Soda’s **Metric Monitoring feature** is the foundation of Data Observability, allowing users to automatically track key dataset and column-level statistics over time, detect deviations, and get alerted before data issues impact downstream analytics. While quality checks also keep track of measurements over time, metric monitors use that history of measurements to learn from them and automatically adjust thresholds to inform about expected values or alert about anomalies.

### Implement Metric Monitoring at scale

Metric Monitoring is developed to be a hassle-free feature. You can unlock organization‐wide observability through Soda Cloud’s [no-code dataset onboarding](../onboard-datasets-on-soda-cloud/#step-3-enable-metric-monitoring-optional). This instantly provides automated metric monitoring across hundreds of tables by simply selecting all the datasets you care about and defining a shared schedule in one step. No more configuring each table by hand: stay ahead of pipeline failures, data delivery delays, and structural changes with consistent, centralized monitoring that grows as fast as your data.

> Learn more about how roles and permissions affect Metric Monitoring capabilities: [Global and Dataset Roles](../organization-and-admin-settings/global-and-dataset-roles.md).

<figure><img src="../.gitbook/assets/https___files.gitbook.com_v0_b_gitbook-x-prod.appspot.com_o_spaces_2FA2PmHkO5cBgeRPdiPPOG_2Fuploads_2FEhXPuyouj9yvV7ab4M2g_2FScreenshot_202025-05-20_20at_202.54.10_20PM.avif" alt=""><figcaption></figcaption></figure>

