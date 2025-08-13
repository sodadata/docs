---
description: >-
  Soda treats BigQuery sharded tables as independent datasets. Learn how to
  handle BQ sharded tables in Soda.
hidden: true
---

# BigQuery sharded tables

### Current Behavior

Soda Cloud treats each date-sharded table in BigQuery as an independent dataset. In practice, tables named with date suffixes (for example, `events_20240617`, `events_20240618`) will:

* **Count separately** in the UI, appearing as distinct entries in the Datasets list.
* **Count separately** toward Soda pricing, since each shard is billed as its own dataset.
* **Maintain independent schemas**, so any structural differences between shards must be managed manually (for example, by aligning column names and types before onboarding).

There is no built-in metadata or grouping mechanism in Soda Cloud to unify shards under a “main” logical table.

### Recommended Migration to Native Partitions

BigQuery now recommends using **time-partitioned tables** instead of legacy sharding. Partitioned tables offer better performance, lower cost, and a single logical table for both queries and metadata. To migrate:

1. Follow BigQuery’s guide to [convert date-sharded tables into a partitioned table](https://cloud.google.com/bigquery/docs/creating-partitioned-tables#convert-date-sharded-tables).
2. In Soda Cloud, onboard the new partitioned table once. Soda will treat it as a single dataset.

### Short-Term Workarounds

If migration to partitioned tables is not yet feasible for you:

* **Table-name patterns:** Onboard your shards as separate datasets, but use consistent naming conventions and Dashboard filters to group them visually.
* **External catalog consolidation:** If you use a metadata layer, such as Atlan, to virtualize shards into a single logical asset, you can point Soda at that consolidated view. Keep in mind Soda will still count it as one dataset only if it surfaces as a single table name in BigQuery.

