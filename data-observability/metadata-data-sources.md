# Metadata data sources

### Oracle

* **Historical backfilling:** not possible.
* **Row count:** metadata row counts are calculated via `count(*)`. Soda does not use metadata for this metric in Oracle. It requires an additional package and/or is unreliable based on the schedule of that package.
* **Last modification time:** Soda uses metadata

Note that past data is only available for a limited amount of time, which varies depending on the system. The minimum goes back 120 h.

{% hint style="warning" %}
**Non-UTC timestamps are not recommended** when connecting Soda to Oracle data sources. Soda uses timezone data when available, but assumes UTC when the timezone is not provided by the data source.

Some databases convert timestamps to UTC, but **Oracle does not do any implicit conversions** and stores timestamps and timezone information as the user inputs them. Because of Oracle Python client limitations, all timezone information is stripped when Soda retrieves it, which means that Soda will read all timestamps as if they were UTC regardless of the original input.
{% endhint %}

***

### Postgres

Metadata is supported, but it requires some additional setup on Postgres's side.

* **Historical backfilling:** not possible.
* **Row count:** enabled out-of-the-box.
* **Last modification time:** `track_commit_timestamp` must be enabled: https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-TRACK-COMMIT-TIMESTAMP
  * If `track_commit_timestamp` is not enabled, Soda will return a warning.

***

### BigQuery

Metadata metrics are available and supported in BigQuery.

* **Historical backfilling:** possible.
* **Partition column:** can be suggested based on metadata available in BigQuery.
  * Soda will prioritize user-suggested columns.
  * If there are no user-suggested columns, Soda will try a metadata approach to find the partition column automatically.
  * If there are no columns found in the metadata of BigQuery, Soda will fall back on its own heuristic.

{% hint style="info" %}
**Partition column availability in BigQuery:**

If the user has configured a partitioning column on BigQuery's side, Soda will use it (given that it is a date/timestamp column).

Otherwise, Soda will fall back on a standard sampling method to detect the partition column.
{% endhint %}

***

### Redshift

* **Historical backfilling** is supported on Redshift and it is limited to 7 days for the metadata.
* **Modification time** does not include schema changes. Only
  * inserts
  * updates
  * deletes

***

### Synapse

Synapse does not provide metadata history tables.

* **Historical backfilling:** not possible.
* **Last modification time:** not possible.
* **Row count:** current row counts are calculated via `count(*)`.\
  Soda does not use metadata for this metric in Synapse.
* **Quartile metrics** (Q1, median, Q3): not possible.\
  Synapse does not support quartile metrics.
