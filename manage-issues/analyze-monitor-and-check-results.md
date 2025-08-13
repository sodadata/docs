# Analyze monitor and check results

When you access a **monitor** (from Metric Monitoring) or a **check** (from the Contract), Soda Cloud provides a **time series view** that shows how the monitored metric or check result evolves. This helps you explore the history of data quality issues, spot trends, and understand changes in your data.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-29 at 9.38.00 PM.png" alt=""><figcaption></figcaption></figure>

## Diagnostics

For certain types of checks and monitors, **additional diagnostic information** is also available for each monitor or check results to help you investigate issues in more detail.

For example:

* **Schema Checks**: View a side-by-side comparison of the **actual vs. expected schema** to identify differences.
* **Missing, Duplicate, or Invalid Checks**: See the **percentage of failed rows vs. passing rows** to understand the scale and impact of the issue.

This view helps you drill down into specific data issues, explore context, and take informed action.

## Failed rows _(coming soon)_

In the future, you will also be able to **review a sample of failed rows** directly in Soda Cloud, helping you pinpoint specific records that contribute to check failures. This capability will provide even more context to accelerate root cause analysis and resolution.
