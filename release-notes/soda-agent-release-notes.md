---
description: >-
  Review release notes for Soda Agent, a Helm chart for deployment on EKS
  clusters.
---

# Soda Agent - Release notes

## v4 initial release - `soda-agent 1.3.0`

<sup>01 September, 2025</sup>

* Introduced automatic partition column detection.
  * Based on warehouse metadata.
  * Based on data patterns.
* Introduced support for metric monitoring (both dataset- and column-level monitors).
  * Group column-level monitor by any column to get insights per segment.
  * Configurable threshold strategy, exclusion values and sensitivity.
  * Support for user feedback to flag anomalies & improve algorithm performance.
  * Support for configurable frequencies.
    * Supported frequencies: hourly, two-hourly, three-hourly, four-hourly, six-hourly, eight-hourly, 12-hourly, daily, weekly.
  * Available on supported data sources:
    * Athena, Bigquery, Databricks, Fabric, Postgres, Redshift, Snowflake, SQL Server, Synapse.
* Introduced sampling strategy for dataset profiling.
  * You can now choose between the top 1,000,000 rows or the last 30 days of data (based on partition column).
* Increased default resource limits to meet increased demand for metric monitoring features.
  * Requests
    * CPU: 250m (unchanged)
    * Memory: 250 MiB → 500 MiB
  * Limits
    * CPU: 250m → 500m
    * Memory: 250 MiB → 750 MiB
* SECURITY: \[CVE-2025-50817] A known vulnerability exists in python-future which is an indirect dependency of soda-agent.  No patched version of python-future is available. It is exploitable only if attackers can write files on the server. Soda's cloud infrastructure is hardened against this attack. Users should ensure servers are hardened to prevent unauthorized file writes.&#x20;
* SECURITY: \[CVE-2025-47907] Race condition in Go’s database/sql package. This item is listed for transparency because it was flagged by our automated scanning. The version of kubectl distributed by Kubernetes and included in soda-agent is built against a Go release that includes the affected code, but kubectl does not use the vulnerable functionality. No advisory has been issued by the Kubernetes project and no patched version of kubectl is currently available. No impact and no action required. \
