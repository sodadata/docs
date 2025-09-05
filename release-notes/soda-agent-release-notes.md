---
description: >-
  Review release notes for Soda Agent, a Helm chart for deployment on EKS
  clusters.
---

# Soda Agent - Release notes

## v4 initial release

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
* Introduced sampling strategy for dataset profiling.
  * You can now choose between the top 1,000,000 rows or the last 30 days of data (based on partition column).
* Introduced support for primary key detection.
* Introduced support for `Fabric` data source.
* Enhanced quoting of identifiers with special characters.
* Fixed reconciliation checks on large MySQL tables. Previously this would result in `mysql.connector.errors.InternalError: Unread result found`
* Fixed mix-up of group evolution checks. Previously multiple group evolution checks in a single SodaCL file would have their results mixed up.
* Increased default resource limits to meet increased demand for metric monitoring features.
  * Requests
    * CPU: 250m (unchanged)
    * Memory: 250 MiB → 500 MiB
  * Limits
    * CPU: 250m → 500m
    * Memory: 250 MiB → 750 MiB
