# Scan time & scan time strategy

Selecting the right scan time is essential for accurate data monitoring and reliable metric collection. Scans that occur too early may run before the data has been fully loaded into the database, leading to false positives or misleading results. This guide outlines how to determine the best scan time based on your data load patterns and operational needs.

## Key considerations

### Data load completion time

When is the database load expected to be complete?

* Determine when the relevant tables or datasets are expected to be fully loaded.
* Factor in common variances: if a load is expected to complete by `00:00 UTC` but occasionally finishes at `00:10 UTC`, account for the expected, albeit sporadic, delay.

Knowing this helps avoid scanning too early and capturing incomplete data.

### Acceptable load delay tolerance

When is a delayed load considered late or "problematic"?

* If data arriving by `02:30 UTC` is still valid for monitoring purposes, it may be better to delay the scan to reduce false alerts.
* Scanning immediately after the earliest expected load time is not always necessary.

Understanding what qualifies as "late data" helps define the tolerance window for scan timing.

### Response window & team availability

How fast after the load can someone respond to issues flagged by monitors?

* If nobody can take action until `09:00 UTC`, scanning earlier may not be useful unless scans feed downstream processes or dashboards.

Choose a scan time that aligns with both data readiness and team readiness.

{% hint style="success" %}
**Consistency is key**

Running scans at the **same time every day** allows to build up a reliable baseline of expected behavior. This helps surface anomalies clearly when something deviates from the norm.
{% endhint %}

***

## Example scenario

* **Expected load completion:** `00:00 UTC`
* **Occasional load delay:** up to `00:00 UTC`
* **Team available from:** `08:00 UTC`

#### Scan options

<table><thead><tr><th width="183.81668090820312">Strategy</th><th width="100">Scan time</th><th>Rationale</th></tr></thead><tbody><tr><td>Minimal buffer</td><td><code>00:15 UTC</code></td><td>Captures data soon after load with minor delay tolerance.</td></tr><tr><td>Conservative buffer</td><td><code>01:30 UTC</code></td><td>Allows extra time for delayed loads, reduces risk of false positives.</td></tr><tr><td>Operationally aligned</td><td><code>07:30 UTC</code></td><td>Ensures scan results are fresh and complete when the team starts reviewing.</td></tr></tbody></table>

## Scan scheduling at scale

When scanning large volumes of tables:

* It is acceptable to configure scans for the **same scheduled time** (e.g. `00:00 UTC`).
* Scans that are scheduled in large volumes (thousands of tables) may be configured to run at the same logical time, but **the system naturally distributes execution** based on queuing and available resources, so the actual execution will be **staggered**.

***

## Historical scans

* **Historical metric collection scans** (for metric baseline backfilling) run only **once** at configuration time.
* These scans are **not governed** by the scan schedule. They occur once and they are typically the most resource-intensive.

***

## Best practices

* **Consistency is key:** Using the same scan daily establishes a stable baseline for anomaly detection.
* **Early scans should be avoided:** Scheduling scans before the last acceptable load time is not recommended unless business needs require it.
* **Time zones should be centralized:** Aligning scan time with the database time zone is ideal, especially when your time partitioning column is based on the insert/load time in that time zone.
* **Monitoring and adjusting:** If load patterns or SLAs change, scan times should be revisited and adjusted accordingly.
